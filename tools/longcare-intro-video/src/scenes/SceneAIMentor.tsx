import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';

const Bubble: React.FC<{
  side: 'left' | 'right';
  appearAt: number;
  text: string;
  accent?: boolean;
}> = ({ side, appearAt, text, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - appearAt;
  if (local < 0) return null;
  const sp = spring({ frame: local, fps, config: { damping: 14, stiffness: 110 } });
  const opacity = interpolate(local, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        alignSelf: side === 'left' ? 'flex-start' : 'flex-end',
        maxWidth: 760,
        marginBottom: 28,
        padding: '28px 36px',
        borderRadius: 28,
        background: accent
          ? `linear-gradient(135deg, ${COLORS.primary1}, ${COLORS.primary2})`
          : COLORS.white,
        color: accent ? '#fff' : COLORS.textDark,
        boxShadow: '0 12px 40px rgba(15,23,42,0.10)',
        border: accent ? 'none' : `1px solid ${COLORS.border}`,
        fontSize: 30,
        lineHeight: 1.4,
        fontWeight: 500,
        transform: `scale(${sp}) translateY(${(1 - sp) * 20}px)`,
        opacity,
      }}
    >
      {text}
    </div>
  );
};

export const SceneAIMentor: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 25], [-20, 0], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [240, 270], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, #EFF6FF 100%)`,
        opacity: fadeOut,
        padding: '80px 120px',
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 4,
          color: COLORS.primary2,
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
        }}
      >
        AI MENTOR — AVAILABLE 24/7
      </div>
      <h2
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '12px 0 50px',
          letterSpacing: -2,
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          color: COLORS.textDark,
        }}
      >
        Your AI mentor — available 24/7
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        <Bubble
          side="left"
          appearAt={45}
          text="How do I use AI in my business to save time and grow revenue?"
        />
        <Bubble
          side="right"
          appearAt={110}
          accent
          text="Here's a 4-week roadmap: 1) Audit workflows · 2) Pick high-ROI tasks · 3) Automate with Gemini + tools · 4) Measure impact."
        />
        <Bubble
          side="left"
          appearAt={185}
          text="Can we book a 1:1 to walk through it?"
        />
      </div>
    </AbsoluteFill>
  );
};
