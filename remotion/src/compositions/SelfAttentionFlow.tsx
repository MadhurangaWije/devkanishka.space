import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { theme } from '../theme';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const ease = Easing.bezier(0.33, 1, 0.68, 1);
function seg(frame: number, startSec: number, endSec: number, fps: number) {
  return clamp01((frame - startSec * fps) / ((endSec - startSec) * fps));
}

const TOKENS = ['The', 'cat', 'sat', 'down'];
const TARGET_IDX = 2; // "sat" is the query token attending to the others
// Illustrative attention weights: "sat" (a verb) attends most to "cat" (its subject)
const WEIGHTS = [0.08, 0.62, 0.18, 0.12];
const TOKEN_COLOR = [theme.blue, theme.violet, theme.amber, theme.teal];

function mixColor(weights: number[], colors: string[]) {
  const rgb = colors.map((c) => {
    const h = c.replace('#', '');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  });
  const out = [0, 0, 0];
  weights.forEach((w, i) => {
    out[0] += rgb[i][0] * w;
    out[1] += rgb[i][1] * w;
    out[2] += rgb[i][2] * w;
  });
  return `rgb(${Math.round(out[0])},${Math.round(out[1])},${Math.round(out[2])})`;
}

export const SelfAttentionFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tokensIn = ease(seg(frame, 0.3, 1.5, fps));
  const qkvIn = ease(seg(frame, 2.0, 4.0, fps));
  const targetHighlight = ease(seg(frame, 4.8, 5.6, fps));
  const linesIn = ease(seg(frame, 6.0, 9.5, fps));
  const weightsTextIn = interpolate(frame, [9.5 * fps, 10.2 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const blendIn = ease(seg(frame, 11.5, 15.5, fps));

  const tokenX = (i: number) => 260 + i * 260;
  const tokenY = 180;
  const qkvY = 320;
  const outputX = tokenX(TARGET_IDX);
  const outputY = 560;

  const titleOpacity = interpolate(frame, [0, 20, 590, 600], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phaseLabel =
    frame < 4.6 * fps ? 'Every token computes a Query, Key, and Value vector' :
    frame < 9.6 * fps ? '"sat" (the query) scores itself against every Key' :
    frame < 11.4 * fps ? 'Softmax turns scores into weights that sum to 1' :
    'The output is a weighted blend of every Value vector';

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bgCard, fontFamily: theme.fontSans }}>
      <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', opacity: titleOpacity }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: theme.heading }}>Self-Attention</div>
        <div style={{ fontSize: 18, color: theme.textMuted, marginTop: 6 }}>{phaseLabel}</div>
      </div>

      <svg width={1280} height={720} viewBox="0 0 1280 720">
        {/* Attention lines from every source token to the target's output */}
        {TOKENS.map((_, i) => {
          const w = WEIGHTS[i];
          const opacity = linesIn * (0.25 + w * 1.3);
          const strokeWidth = 1.5 + w * 14 * linesIn;
          return (
            <line
              key={`line-${i}`}
              x1={tokenX(i)}
              y1={qkvY + 60}
              x2={outputX}
              y2={outputY - 20}
              stroke={TOKEN_COLOR[i]}
              strokeWidth={strokeWidth}
              opacity={opacity}
            />
          );
        })}

        {/* Tokens */}
        {TOKENS.map((tok, i) => {
          const isTarget = i === TARGET_IDX;
          const scale = isTarget ? 1 + 0.12 * targetHighlight : 1;
          return (
            <g key={tok} opacity={tokensIn} transform={`translate(${tokenX(i)}, ${tokenY}) scale(${scale})`}>
              <rect x={-55} y={-30} width={110} height={60} rx={12}
                fill={theme.bgAlt}
                stroke={isTarget ? theme.heading : TOKEN_COLOR[i]}
                strokeWidth={isTarget ? 3 : 2} />
              <text x={0} y={7} textAnchor="middle" fontFamily={theme.fontSans} fontSize={20} fontWeight={600} fill={theme.heading}>
                {tok}
              </text>
            </g>
          );
        })}

        {/* Q, K, V mini-vectors under each token */}
        {TOKENS.map((_, i) => (
          <g key={`qkv-${i}`} opacity={qkvIn}>
            {['Q', 'K', 'V'].map((label, j) => {
              const colors = [theme.blue, theme.violet, theme.green];
              return (
                <g key={label} transform={`translate(${tokenX(i) - 36 + j * 36}, ${qkvY})`}>
                  <rect x={-14} y={-14} width={28} height={28} rx={6} fill={colors[j]} opacity={0.85} />
                  <text x={0} y={5} textAnchor="middle" fontFamily={theme.fontMono} fontSize={13} fontWeight={700} fill={theme.bgCard}>
                    {label}
                  </text>
                </g>
              );
            })}
          </g>
        ))}

        {/* Attention weight readout */}
        {TOKENS.map((tok, i) => (
          <text
            key={`w-${i}`}
            x={tokenX(i)}
            y={qkvY + 95}
            textAnchor="middle"
            fontFamily={theme.fontMono}
            fontSize={16}
            fontWeight={700}
            fill={TOKEN_COLOR[i]}
            opacity={weightsTextIn}
          >
            {(WEIGHTS[i] * 100).toFixed(0)}%
          </text>
        ))}

        {/* Output blended vector */}
        <g opacity={blendIn}>
          <circle
            cx={outputX}
            cy={outputY}
            r={46}
            fill={mixColor(WEIGHTS, TOKEN_COLOR)}
            stroke={theme.heading}
            strokeWidth={2}
          />
          <text x={outputX} y={outputY - 8} textAnchor="middle" fontFamily={theme.fontSans} fontSize={14} fontWeight={700} fill={theme.bgCard}>
            Output
          </text>
          <text x={outputX} y={outputY + 12} textAnchor="middle" fontFamily={theme.fontSans} fontSize={12} fill={theme.bgCard}>
            for "sat"
          </text>
        </g>
      </svg>

      <div style={{
        position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center',
        fontSize: 16, color: theme.textMuted,
        opacity: interpolate(frame, [16 * fps, 16.5 * fps, 19 * fps, 20 * fps], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        Every output is a weighted mixture of every input — the weights are what "attention" means.
      </div>
    </AbsoluteFill>
  );
};
