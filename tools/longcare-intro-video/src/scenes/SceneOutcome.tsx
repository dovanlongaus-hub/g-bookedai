import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';

const Counter: React.FC<{
  appearAt: number;
  countTo: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}> = ({ appearAt, countTo, prefix = '', suffix = '', label, decimals = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - appearAt;
  const sp = spring({ frame: Math.max(local, 0), fps, config: { damping: 18, stiffness: 70 } });
  const opacity = interpolate(local, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Count animation
  const countProgress = interpolate(local, [0, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const value = countTo * countProgress;
  const displayValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <div
      style={{
        flex: 1,
        background: COLORS.white,
        borderRadius: 24,
        padding: 40,
        boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
        border: `1px solid ${COLORS.border}`,
        textAlign: 'center',
        opacity,
        transform: `scale(${0.8 + sp * 0.2})`,
      }}
    >
      <div
        style={{
          fontSize: 84,
          fontWeight: 900,
          background: `linear-gradient(135deg, ${COLORS.primary1}, ${COLORS.primary3})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: -3,
          lineHeight: 1,
        }}
      >
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: 22,
          color: COLORS.textMuted,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const SceneOutcome: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [180, 210], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        padding: '90px 100px',
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 4,
          color: COLORS.primary2,
          opacity: titleOp,
          textAlign: 'center',
        }}
      >
        REAL RESULTS · REAL AUSTRALIANS
      </div>
      <h2
        style={{
          fontSize: 70,
          fontWeight: 800,
          margin: '12px 0 60px',
          letterSpacing: -2,
          opacity: titleOp,
          color: COLORS.textDark,
          textAlign: 'center',
        }}
      >
        Built by Aussies. Backed by results.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 28,
          flex: 1,
          alignContent: 'center',
        }}
      >
        <Counter appearAt={30} countTo={150} suffix="+" label="SMEs trained" />
        <Counter appearAt={55} countTo={4.9} suffix="/5" label="Average rating" decimals={1} />
        <Counter appearAt={80} countTo={60}  suffix="%"  label="Time saved" />
        <Counter appearAt={105} countTo={2.4} prefix="$" suffix="M" label="Revenue impact" decimals={1} />
      </div>
    </AbsoluteFill>
  );
};
