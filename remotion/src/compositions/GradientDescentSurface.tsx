import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { theme } from '../theme';

// Loss function: an elongated ("ravine") quadratic bowl f(x,y) = a*x^2 + b*y^2.
// b >> a is the classic illustration of why vanilla gradient descent zigzags:
// steep in y, shallow in x, so a single learning rate is a compromise for both.
const A = 1;
const B = 8;
const LR = 0.12;
const N_STEPS = 26;
const START = { x: -4.2, y: 1.1 };

function grad(x: number, y: number) {
  return { dx: 2 * A * x, dy: 2 * B * y };
}
function loss(x: number, y: number) {
  return A * x * x + B * y * y;
}

function simulate() {
  const pts: { x: number; y: number; loss: number }[] = [{ ...START, loss: loss(START.x, START.y) }];
  let { x, y } = START;
  for (let i = 0; i < N_STEPS; i++) {
    const g = grad(x, y);
    x = x - LR * g.dx;
    y = y - LR * g.dy;
    pts.push({ x, y, loss: loss(x, y) });
  }
  return pts;
}
const PATH = simulate();

// Screen mapping
const CX = 480, CY = 380, SCALE = 78;
const toScreen = (x: number, y: number) => ({ sx: CX + x * SCALE, sy: CY + y * SCALE });

export const GradientDescentSurface: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const descentStart = 1.6 * fps;
  const perStepFrames = 0.42 * fps;
  const rawStep = Math.max(0, (frame - descentStart) / perStepFrames);
  const stepIdx = Math.min(Math.floor(rawStep), PATH.length - 2);
  const stepFrac = Math.min(1, rawStep - stepIdx);

  const cur = PATH[stepIdx];
  const next = PATH[Math.min(stepIdx + 1, PATH.length - 1)];
  const curX = cur.x + (next.x - cur.x) * stepFrac;
  const curY = cur.y + (next.y - cur.y) * stepFrac;
  const curLoss = cur.loss + (next.loss - cur.loss) * stepFrac;
  const iterCount = Math.min(stepIdx + (stepFrac > 0.02 ? 1 : 0), PATH.length - 1);

  const ballScreen = toScreen(curX, curY);

  const titleOpacity = interpolate(frame, [0, 20, 530, 540], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Contour ellipses: level sets of A*x^2 + B*y^2 = k
  const levels = [0.3, 1.2, 3, 6, 10, 16, 24, 34];

  // Loss curve mini-chart
  const chartW = 320, chartH = 130, chartX = 900, chartY = 470;
  const maxLoss = PATH[0].loss;
  const visiblePts = PATH.slice(0, Math.min(iterCount + 2, PATH.length));

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bgCard, fontFamily: theme.fontSans }}>
      <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', opacity: titleOpacity }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: theme.heading }}>Gradient Descent</div>
        <div style={{ fontSize: 18, color: theme.textMuted, marginTop: 6 }}>
          Steepest in one direction, gentle in another — a single learning rate has to compromise
        </div>
      </div>

      <svg width={1280} height={720} viewBox="0 0 1280 720">
        {/* Contour lines */}
        {levels.map((k, i) => {
          const rx = Math.sqrt(k / A) * SCALE;
          const ry = Math.sqrt(k / B) * SCALE;
          return (
            <ellipse
              key={i}
              cx={CX}
              cy={CY}
              rx={rx}
              ry={ry}
              fill="none"
              stroke={theme.border}
              strokeWidth={1.5}
              opacity={0.9}
            />
          );
        })}
        {/* Minimum marker */}
        <circle cx={CX} cy={CY} r={6} fill={theme.green} />
        <text x={CX} y={CY - 16} textAnchor="middle" fontFamily={theme.fontMono} fontSize={13} fill={theme.green}>
          minimum
        </text>

        {/* Path trail */}
        {PATH.slice(0, iterCount + 1).map((p, i) => {
          if (i === 0) return null;
          const prev = PATH[i - 1];
          const a = toScreen(prev.x, prev.y);
          const b = toScreen(p.x, p.y);
          return <line key={i} x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy} stroke={theme.blue} strokeWidth={2} opacity={0.6} />;
        })}
        {PATH.slice(0, iterCount + 1).map((p, i) => {
          const s = toScreen(p.x, p.y);
          return <circle key={`dot-${i}`} cx={s.sx} cy={s.sy} r={3} fill={theme.blue} opacity={0.5} />;
        })}

        {/* Current ball */}
        <circle cx={ballScreen.sx} cy={ballScreen.sy} r={11} fill={theme.amber} stroke={theme.heading} strokeWidth={2} />

        {/* Iteration / loss readout */}
        <text x={140} y={640} fontFamily={theme.fontMono} fontSize={18} fill={theme.textBase}>
          iteration {iterCount}
        </text>
        <text x={140} y={670} fontFamily={theme.fontMono} fontSize={18} fill={theme.amber}>
          loss = {curLoss.toFixed(3)}
        </text>

        {/* Mini loss-over-time chart */}
        <rect x={chartX} y={chartY} width={chartW} height={chartH} fill={theme.bgAlt} rx={8} />
        <text x={chartX + chartW / 2} y={chartY - 12} textAnchor="middle" fontFamily={theme.fontSans} fontSize={14} fill={theme.textMuted}>
          Loss over iterations
        </text>
        <polyline
          fill="none"
          stroke={theme.red}
          strokeWidth={2.5}
          points={visiblePts
            .map((p, i) => {
              const px = chartX + (i / (PATH.length - 1)) * chartW;
              const py = chartY + chartH - (p.loss / maxLoss) * (chartH - 10) - 5;
              return `${px},${py}`;
            })
            .join(' ')}
        />
      </svg>

      <div style={{
        position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center',
        fontSize: 16, color: theme.textMuted,
        opacity: interpolate(frame, [15.5 * fps, 16 * fps, 17.3 * fps, 18 * fps], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        This zigzag is exactly why momentum and per-parameter learning rates (Adam) exist.
      </div>
    </AbsoluteFill>
  );
};
