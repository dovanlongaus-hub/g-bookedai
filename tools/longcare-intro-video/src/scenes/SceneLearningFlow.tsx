import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';

const Card: React.FC<{
  appearAt: number;
  step: number;
  title: string;
  desc: string;
  icon: string;
}> = ({ appearAt, step, title, desc, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - appearAt;
  const sp = spring({ frame: Math.max(local, 0), fps, config: { damping: 13, stiffness: 90 } });
  const opacity = interpolate(local, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const translateX = interpolate(sp, [0, 1], [-80, 0]);

  return (
    <div
      style={{
        flex: 1,
        background: COLORS.white,
        borderRadius: 28,
        padding: 44,
        boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
        border: `1px solid ${COLORS.border}`,
        display: 'flex',
        flexDirection: 'column',
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${COLORS.primary1}, ${COLORS.primary2})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 44,
          marginBottom: 24,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: COLORS.primary2,
          letterSpacing: 3,
          marginBottom: 8,
        }}
      >
        STEP {step}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: COLORS.textDark,
          marginBottom: 16,
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 22, color: COLORS.textMuted, lineHeight: 1.5 }}>
        {desc}
      </div>
    </div>
  );
};

export const SceneLearningFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [270, 300], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
        }}
      >
        FROM CONFUSION TO CONFIDENCE
      </div>
      <h2
        style={{
          fontSize: 70,
          fontWeight: 800,
          margin: '12px 0 60px',
          letterSpacing: -2,
          opacity: titleOp,
          color: COLORS.textDark,
        }}
      >
        From confusion to confidence in 4 weeks
      </h2>

      <div style={{ display: 'flex', gap: 32, flex: 1, alignItems: 'stretch' }}>
        <Card
          appearAt={30}
          step={1}
          title="Chat with AI Mentor"
          desc="Ask anything. Get instant, contextual guidance powered by Gemini."
          icon="💬"
        />
        <Card
          appearAt={75}
          step={2}
          title="Get a Personalised Roadmap"
          desc="Tailored 4-week learning plan based on your role and goals."
          icon="🗺️"
        />
        <Card
          appearAt={120}
          step={3}
          title="Book 1:1 Sessions"
          desc="Live mentorship with Aussie AI experts. Confirmed instantly."
          icon="📅"
        />
      </div>
    </AbsoluteFill>
  );
};
