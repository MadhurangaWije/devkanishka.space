import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { theme } from '../theme';

// Same tiny 2-layer network as the site's Backpropagation lesson (Lesson 40):
// x = [1.0, 2.0], W1 = [[0.5,-0.3],[0.2,0.8]], b1 = [0.1,-0.1]
// a1 = [-0.1, 1.7] -> z1 = relu(a1) = [0, 1.7]  (h1 is a DEAD neuron here)
// W2 = [0.6, -0.4], b2 = 0 -> a2 = yhat = -0.68
// y_true = 1.5 -> loss = 0.5*(yhat-y_true)^2 = 2.338
// Gradients: dL/dyhat=-2.18, dL/dW2=[0,-3.706], dL/db2=-2.18,
//            dL/da1=[0,0.872] (h1 path is exactly zero), dL/dW1=[[0,0],[0.872,1.744]]

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const ease = Easing.bezier(0.33, 1, 0.68, 1);

function seg(frame: number, startSec: number, endSec: number, fps: number) {
  const start = startSec * fps;
  const end = endSec * fps;
  return clamp01((frame - start) / (end - start));
}

const Node: React.FC<{
  x: number;
  y: number;
  r: number;
  label: string;
  value: string;
  active: number; // 0..1 glow intensity
  dead?: boolean;
  color: string;
}> = ({ x, y, r, label, value, active, dead, color }) => {
  const fill = dead ? theme.bgAlt : theme.bgCard;
  const stroke = dead ? theme.textMuted : color;
  const glow = dead ? 0 : active;
  return (
    <g>
      {glow > 0 && (
        <circle cx={x} cy={y} r={r + 10 * glow} fill={color} opacity={0.18 * glow} />
      )}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={2.5 + 2 * glow}
        opacity={dead ? 0.55 : 1}
      />
      <text
        x={x}
        y={y - 6}
        textAnchor="middle"
        fontFamily={theme.fontSans}
        fontSize={13}
        fontWeight={600}
        fill={theme.heading}
      >
        {label}
      </text>
      <text
        x={x}
        y={y + 14}
        textAnchor="middle"
        fontFamily={theme.fontMono}
        fontSize={13}
        fill={dead ? theme.textMuted : theme.textBase}
      >
        {value}
      </text>
    </g>
  );
};

const Edge: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  forwardProgress: number; // 0..1, draws a traveling pulse forward
  backwardProgress: number; // 0..1, draws a traveling pulse backward
  dead?: boolean;
}> = ({ x1, y1, x2, y2, label, forwardProgress, backwardProgress, dead }) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 - 10;
  const pulseColor = forwardProgress > 0 ? theme.blue : theme.amber;
  const t = forwardProgress > 0 ? forwardProgress : backwardProgress;
  // Backward pulse travels from (x2,y2) to (x1,y1)
  const px = forwardProgress > 0 ? x1 + (x2 - x1) * t : x2 + (x1 - x2) * t;
  const py = forwardProgress > 0 ? y1 + (y2 - y1) * t : y2 + (y1 - y2) * t;

  return (
    <g opacity={dead ? 0.35 : 1}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={theme.border} strokeWidth={2} />
      {t > 0 && t < 1 && !dead && (
        <circle cx={px} cy={py} r={7} fill={pulseColor}>
          <animate attributeName="opacity" values="1;0.4;1" dur="0.4s" repeatCount="indefinite" />
        </circle>
      )}
      <text
        x={midX}
        y={midY}
        textAnchor="middle"
        fontFamily={theme.fontMono}
        fontSize={12}
        fill={theme.textMuted}
      >
        {label}
      </text>
    </g>
  );
};

export const BackpropFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline (seconds)
  const fwd1 = ease(seg(frame, 1.0, 2.2, fps)); // x -> hidden
  const fwd2 = ease(seg(frame, 2.2, 3.4, fps)); // hidden -> yhat
  const fwd3 = ease(seg(frame, 3.4, 4.4, fps)); // yhat -> loss
  const forwardDone = seg(frame, 4.4, 4.6, fps);

  const bwd1 = ease(seg(frame, 6.5, 7.7, fps)); // loss -> yhat
  const bwd2 = ease(seg(frame, 7.7, 8.9, fps)); // yhat -> hidden
  const bwd3 = ease(seg(frame, 8.9, 10.1, fps)); // hidden -> x

  const titleOpacity = interpolate(frame, [0, 20, 570, 600], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phaseLabel =
    frame < 5.2 * fps ? 'Forward Pass — compute the loss' :
    frame < 6.4 * fps ? 'Loss = 2.338' :
    frame < 11 * fps ? 'Backward Pass — assign blame via the chain rule' :
    'Dead ReLU ⇒ exactly zero gradient down that path';

  const x1y = 260, x2y = 460;
  const h1y = 210, h2y = 500;
  const outY = 355;
  const lossY = 355;

  const nodeActiveX = interpolate(frame, [0.8 * fps, 1.0 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nodeActiveH = interpolate(frame, [2.1 * fps, 2.4 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nodeActiveOut = interpolate(frame, [3.3 * fps, 3.6 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nodeActiveLoss = interpolate(frame, [4.3 * fps, 4.6 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const gradOpacityLoss = interpolate(frame, [6.4 * fps, 6.6 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gradOpacityOut = interpolate(frame, [7.6 * fps, 7.9 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gradOpacityH = interpolate(frame, [8.8 * fps, 9.1 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gradOpacityX = interpolate(frame, [10.0 * fps, 10.3 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bgCard, fontFamily: theme.fontSans }}>
      <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', opacity: titleOpacity }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: theme.heading }}>Backpropagation</div>
        <div style={{ fontSize: 18, color: theme.textMuted, marginTop: 6 }}>{phaseLabel}</div>
      </div>

      <svg width={1280} height={720} viewBox="0 0 1280 720">
        {/* Edges: input -> hidden */}
        <Edge x1={280} y1={x1y} x2={560} y2={h1y} label="w=0.5" forwardProgress={fwd1} backwardProgress={bwd3} dead />
        <Edge x1={280} y1={x1y} x2={560} y2={h2y} label="w=0.2" forwardProgress={fwd1} backwardProgress={bwd3} />
        <Edge x1={280} y1={x2y} x2={560} y2={h1y} label="w=-0.3" forwardProgress={fwd1} backwardProgress={bwd3} dead />
        <Edge x1={280} y1={x2y} x2={560} y2={h2y} label="w=0.8" forwardProgress={fwd1} backwardProgress={bwd3} />

        {/* Edges: hidden -> output */}
        <Edge x1={620} y1={h1y} x2={860} y2={outY} label="w=0.6" forwardProgress={fwd2} backwardProgress={bwd2} dead />
        <Edge x1={620} y1={h2y} x2={860} y2={outY} label="w=-0.4" forwardProgress={fwd2} backwardProgress={bwd2} />

        {/* Edge: output -> loss */}
        <Edge x1={920} y1={outY} x2={1140} y2={lossY} label="" forwardProgress={fwd3} backwardProgress={bwd1} />

        {/* Nodes */}
        <Node x={220} y={x1y} r={40} label="x₁" value="1.0" active={nodeActiveX} color={theme.blue} />
        <Node x={220} y={x2y} r={40} label="x₂" value="2.0" active={nodeActiveX} color={theme.blue} />

        <Node x={590} y={h1y} r={40} label="h₁ (dead)" value="relu=0" active={nodeActiveH} dead color={theme.blue} />
        <Node x={590} y={h2y} r={40} label="h₂" value="1.7" active={nodeActiveH} color={theme.blue} />

        <Node x={890} y={outY} r={40} label="ŷ" value="-0.68" active={nodeActiveOut} color={theme.blue} />

        <Node x={1180} y={lossY} r={44} label="Loss" value="2.338" active={nodeActiveLoss} color={theme.red} />

        {/* Gradient labels, fading in during backward pass */}
        <text x={1180} y={lossY + 70} textAnchor="middle" fontFamily={theme.fontMono} fontSize={14} fill={theme.amber} opacity={gradOpacityLoss}>
          ∂L/∂ŷ = -2.18
        </text>
        <text x={890} y={outY + 70} textAnchor="middle" fontFamily={theme.fontMono} fontSize={14} fill={theme.amber} opacity={gradOpacityOut}>
          ∂L/∂W2 = [0, -3.706]
        </text>
        <text x={590} y={h1y - 60} textAnchor="middle" fontFamily={theme.fontMono} fontSize={13} fill={theme.textMuted} opacity={gradOpacityH}>
          ∂L/∂h₁ = 0
        </text>
        <text x={590} y={h2y + 70} textAnchor="middle" fontFamily={theme.fontMono} fontSize={14} fill={theme.amber} opacity={gradOpacityH}>
          ∂L/∂h₂ = 0.872
        </text>
        <text x={220} y={x2y + 70} textAnchor="middle" fontFamily={theme.fontMono} fontSize={13} fill={theme.amber} opacity={gradOpacityX}>
          ∂L/∂W1 = [[0,0],[0.87,1.74]]
        </text>
      </svg>

      <div style={{
        position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center',
        fontSize: 16, color: theme.textMuted, opacity: interpolate(frame, [11.5 * fps, 12 * fps, 17 * fps, 18 * fps], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        The chain rule multiplies gradients backward through every layer — a zero anywhere zeroes everything upstream of it.
      </div>
    </AbsoluteFill>
  );
};
