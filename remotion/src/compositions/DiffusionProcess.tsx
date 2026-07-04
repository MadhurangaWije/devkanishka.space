import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { theme } from '../theme';

const GRID = 18;
const CELL = 24;
const GRID_PX = GRID * CELL;

// Deterministic pseudo-random noise per cell (stable across frames per cell,
// but different across cells) so the "noise" reads as static, not shimmer.
function noiseFor(i: number, j: number, seedOffset: number) {
  const s = Math.sin(i * 127.1 + j * 311.7 + seedOffset * 74.3) * 43758.5453;
  return s - Math.floor(s);
}

// Simple recognizable pixel-art "face" pattern: 1 = foreground, 0 = background
function facePixel(i: number, j: number): number {
  const cx = GRID / 2 - 0.5;
  const cy = GRID / 2 - 0.5;
  const dx = i - cx;
  const dy = j - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  // Face outline (ring)
  const onOutline = dist > GRID * 0.36 && dist < GRID * 0.44;
  // Eyes
  const leftEye = Math.abs(i - (cx - 3.2)) < 1 && Math.abs(j - (cy - 2.5)) < 1;
  const rightEye = Math.abs(i - (cx + 3.2)) < 1 && Math.abs(j - (cy - 2.5)) < 1;
  // Smile (lower arc)
  const smileDist = Math.sqrt(dx * dx + (dy - 2.2) * (dy - 2.2));
  const onSmile = smileDist > GRID * 0.20 && smileDist < GRID * 0.27 && dy > 1.2;
  return onOutline || leftEye || rightEye || onSmile ? 1 : 0;
}

function cellColor(i: number, j: number): string {
  const isEye =
    (Math.abs(i - (GRID / 2 - 0.5 - 3.2)) < 1 && Math.abs(j - (GRID / 2 - 0.5 - 2.5)) < 1) ||
    (Math.abs(i - (GRID / 2 - 0.5 + 3.2)) < 1 && Math.abs(j - (GRID / 2 - 0.5 - 2.5)) < 1);
  return isEye ? theme.blue : theme.amber;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function lerpColor(a: [number, number, number], b: [number, number, number], t: number) {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}

export const DiffusionProcess: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline: forward (noising) 1.5s - 8.5s, hold noisy 8.5-10s,
  // reverse (denoising) 10s - 17s, hold clean 17-20s
  const forwardT = interpolate(frame, [1.5 * fps, 8.5 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const reverseT = interpolate(frame, [10 * fps, 17 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // noiseLevel: 0 = clean image, 1 = pure noise.
  // Rises during forward pass, then falls during reverse pass.
  const noiseLevel = frame < 9 * fps ? forwardT : 1 - reverseT;

  const isForwardPhase = frame < 9 * fps;
  const phaseLabel = frame < 1.3 * fps
    ? 'A clean image, x₀'
    : isForwardPhase
      ? `Forward process — adding noise (t = ${Math.round(forwardT * 1000)})`
      : frame < 10.3 * fps
        ? 'Pure noise, xₜ — indistinguishable from static'
        : `Reverse process — learned denoising (t = ${Math.round((1 - reverseT) * 1000)})`;

  const bgColor = theme.bgAlt;

  const cells = [];
  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      const isFg = facePixel(i, j);
      const baseColor: [number, number, number] = isFg ? hexToRgb(cellColor(i, j)) : hexToRgb(bgColor);
      const noiseVal = noiseFor(i, j, Math.floor(frame / 6)); // changes every ~0.2s for a static-like flicker
      // Random noise color: grayscale-ish static in theme-consistent tones
      const noiseGray = 40 + noiseVal * 180;
      const noiseColor: [number, number, number] = [noiseGray, noiseGray, noiseGray + 20];
      const color = lerpColor(baseColor, noiseColor, noiseLevel);
      cells.push(
        <rect
          key={`${i}-${j}`}
          x={i * CELL}
          y={j * CELL}
          width={CELL - 2}
          height={CELL - 2}
          fill={color}
        />
      );
    }
  }

  const titleOpacity = interpolate(frame, [0, 20, 590, 600], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bgCard, fontFamily: theme.fontSans }}>
      <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', opacity: titleOpacity }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: theme.heading }}>Diffusion Models</div>
        <div style={{ fontSize: 18, color: theme.textMuted, marginTop: 6 }}>{phaseLabel}</div>
      </div>

      <svg
        width={GRID_PX}
        height={GRID_PX}
        viewBox={`0 0 ${GRID_PX} ${GRID_PX}`}
        x={(1280 - GRID_PX) / 2}
        y={(720 - GRID_PX) / 2 + 10}
      >
        {cells}
      </svg>

      {/* Noise level bar */}
      <div style={{ position: 'absolute', bottom: 90, left: 340, right: 340 }}>
        <div style={{ height: 10, borderRadius: 6, background: theme.bgAlt, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            width: `${noiseLevel * 100}%`,
            background: `linear-gradient(90deg, ${theme.blue}, ${theme.red})`,
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13, color: theme.textMuted, fontFamily: theme.fontMono }}>
          <span>clean</span>
          <span>pure noise</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center',
        fontSize: 16, color: theme.textMuted,
        opacity: interpolate(frame, [17.5 * fps, 18 * fps, 19.3 * fps, 20 * fps], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        The network only ever learns one job: given a noisy image, predict the noise that was added.
      </div>
    </AbsoluteFill>
  );
};
