import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { theme } from '../theme';

const IN_SIZE = 8;
const K = 3;
const OUT_SIZE = IN_SIZE - K + 1; // 6, valid padding, stride 1
const CELL = 46;

// A clean vertical edge: left half dark, right half light — the classic
// input a horizontal-gradient kernel is designed to light up.
function inputValue(row: number, col: number): number {
  return col < IN_SIZE / 2 ? 0.15 : 0.9;
}

// Vertical-edge-detecting kernel (Sobel-style horizontal gradient)
const KERNEL = [
  [-1, 0, 1],
  [-1, 0, 1],
  [-1, 0, 1],
];

function convAt(row: number, col: number): number {
  let sum = 0;
  for (let i = 0; i < K; i++) {
    for (let j = 0; j < K; j++) {
      sum += inputValue(row + i, col + j) * KERNEL[i][j];
    }
  }
  return sum;
}

function grayscale(v: number): string {
  const g = Math.round(v * 255);
  return `rgb(${g},${g},${g})`;
}
function outColor(v: number): string {
  // Map roughly [-1.8, 1.8] -> blue(neg) .. dark .. amber(pos)
  const t = Math.max(-1, Math.min(1, v / 1.8));
  if (t >= 0) {
    const amt = t;
    return `rgb(${Math.round(26 + amt * (251 - 26))},${Math.round(29 + amt * (191 - 29))},${Math.round(39 + amt * (36 - 39))})`;
  }
  const amt = -t;
  return `rgb(${Math.round(26 + amt * (124 - 26))},${Math.round(29 + amt * (111 - 29))},${Math.round(39 + amt * (247 - 39))})`;
}

const ease = Easing.bezier(0.45, 0, 0.55, 1);

export const CNNConvolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startFrame = 1.6 * fps;
  const perStep = 0.30 * fps;
  const totalSteps = OUT_SIZE * OUT_SIZE;
  const rawProgress = Math.max(0, (frame - startFrame) / perStep);
  const stepIdx = Math.min(Math.floor(rawProgress), totalSteps - 1);
  const stepFrac = ease(Math.min(1, rawProgress - stepIdx));

  const curRow = Math.floor(stepIdx / OUT_SIZE);
  const curCol = stepIdx % OUT_SIZE;
  const nextIdx = Math.min(stepIdx + 1, totalSteps - 1);
  const nextRow = Math.floor(nextIdx / OUT_SIZE);
  const nextCol = nextIdx % OUT_SIZE;

  const kernelRow = curRow + (nextRow - curRow) * stepFrac;
  const kernelCol = curCol + (nextCol - curCol) * stepFrac;

  const revealedCount = frame >= startFrame ? stepIdx + (stepFrac > 0.55 ? 1 : 0) : 0;

  const inputOriginX = 90, inputOriginY = 210;
  const outputOriginX = 830, outputOriginY = 210 + (IN_SIZE - OUT_SIZE) * CELL / 2;

  const kernelPxX = inputOriginX + kernelCol * CELL;
  const kernelPxY = inputOriginY + kernelRow * CELL;

  const titleOpacity = interpolate(frame, [0, 20, 510, 540], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const curValue = convAt(curRow, curCol);

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bgCard, fontFamily: theme.fontSans }}>
      <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', opacity: titleOpacity }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: theme.heading }}>Convolution</div>
        <div style={{ fontSize: 18, color: theme.textMuted, marginTop: 6 }}>
          A 3×3 kernel slides across the image, one dot product per stop
        </div>
      </div>

      <svg width={1280} height={720} viewBox="0 0 1280 720">
        {/* Input grid */}
        <text x={inputOriginX + (IN_SIZE * CELL) / 2} y={inputOriginY - 24} textAnchor="middle" fontFamily={theme.fontSans} fontSize={15} fill={theme.textMuted}>
          Input (8×8)
        </text>
        {Array.from({ length: IN_SIZE }).map((_, r) =>
          Array.from({ length: IN_SIZE }).map((_, c) => (
            <rect
              key={`in-${r}-${c}`}
              x={inputOriginX + c * CELL}
              y={inputOriginY + r * CELL}
              width={CELL - 2}
              height={CELL - 2}
              fill={grayscale(inputValue(r, c))}
            />
          ))
        )}

        {/* Kernel highlight box */}
        <rect
          x={kernelPxX - 2}
          y={kernelPxY - 2}
          width={K * CELL - 2 + 4}
          height={K * CELL - 2 + 4}
          fill="none"
          stroke={theme.amber}
          strokeWidth={4}
          rx={4}
        />

        {/* Arrow connecting kernel to its output cell */}
        <line
          x1={kernelPxX + (K * CELL) / 2}
          y1={kernelPxY + (K * CELL) / 2}
          x2={outputOriginX + kernelCol * CELL + CELL / 2}
          y2={outputOriginY + kernelRow * CELL + CELL / 2}
          stroke={theme.amber}
          strokeWidth={2}
          strokeDasharray="6 4"
          opacity={0.55}
        />

        {/* Output grid */}
        <text x={outputOriginX + (OUT_SIZE * CELL) / 2} y={outputOriginY - 24} textAnchor="middle" fontFamily={theme.fontSans} fontSize={15} fill={theme.textMuted}>
          Output Feature Map (6×6)
        </text>
        {Array.from({ length: OUT_SIZE }).map((_, r) =>
          Array.from({ length: OUT_SIZE }).map((_, c) => {
            const idx = r * OUT_SIZE + c;
            const revealed = idx < revealedCount;
            const val = convAt(r, c);
            return (
              <rect
                key={`out-${r}-${c}`}
                x={outputOriginX + c * CELL}
                y={outputOriginY + r * CELL}
                width={CELL - 2}
                height={CELL - 2}
                fill={revealed ? outColor(val) : theme.bgAlt}
                stroke={theme.border}
                strokeWidth={1}
              />
            );
          })
        )}

        {/* Current dot-product readout */}
        <g opacity={frame >= startFrame ? 1 : 0}>
          <text x={inputOriginX} y={640} fontFamily={theme.fontMono} fontSize={17} fill={theme.textBase}>
            patch • kernel = {curValue.toFixed(2)}
          </text>
          <text x={inputOriginX} y={670} fontFamily={theme.fontMono} fontSize={14} fill={theme.textMuted}>
            kernel = [[-1,0,1],[-1,0,1],[-1,0,1]]  (vertical edge detector)
          </text>
        </g>
      </svg>

      <div style={{
        position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center',
        fontSize: 16, color: theme.textMuted,
        opacity: interpolate(frame, [15 * fps, 15.5 * fps, 17.3 * fps, 18 * fps], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        The bright output stripe is exactly where the input's brightness changes — that's edge detection, learned as a filter.
      </div>
    </AbsoluteFill>
  );
};
