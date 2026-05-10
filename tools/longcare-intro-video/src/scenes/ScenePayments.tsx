import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';

const Badge: React.FC<{
  appearAt: number;
  label: string;
  sub: string;
  color: string;
  emoji: string;
}> = ({ appearAt, label, sub, color, emoji }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - appearAt;
  const sp = spring({ frame: Math.max(local, 0), fps, config: { damping: 14, stiffness: 110 } });
  const opacity = interpolate(local, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        flex: 1,
        minWidth: 240,
        background: COLORS.white,
        borderRadius: 22,
        padding: '28px 22px',
        boxShadow: '0 14px 40px rgba(15,23,42,0.08)',
        border: `2px solid ${color}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        opacity,
        transform: `scale(${0.7 + sp * 0.3}) translateY(${(1 - sp) * 30}px)`,
      }}
    >
      <div
        style={{
          width: 66,
          height: 66,
          borderRadius: 16,
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 34,
        }}
      >
        {emoji}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.textDark, textAlign: 'center' }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: COLORS.textMuted, textAlign: 'center' }}>{sub}</div>
    </div>
  );
};

export const ScenePayments: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [270, 300], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #FFFFFF 0%, ${COLORS.bg} 100%)`,
        padding: '80px 90px',
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
        FLEXIBLE PAYMENT — AUSSIE FRIENDLY
      </div>
      <h2
        style={{
          fontSize: 64,
          fontWeight: 800,
          margin: '12px 0 16px',
          letterSpacing: -2,
          opacity: titleOp,
          color: COLORS.textDark,
        }}
      >
        Pay your way
      </h2>
      <div
        style={{
          fontSize: 28,
          color: COLORS.textMuted,
          marginBottom: 50,
          opacity: titleOp,
        }}
      >
        Stripe · BNPL · PayID · BPAY · VietQR · Pay on arrival
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
          flex: 1,
          alignContent: 'center',
        }}
      >
        <Badge appearAt={35}  label="Stripe Cards" sub="Visa · Mastercard · Amex" color="#635BFF" emoji="💳" />
        <Badge appearAt={55}  label="BNPL" sub="Afterpay · Klarna" color="#B2FCE4" emoji="🟢" />
        <Badge appearAt={75}  label="PayID" sub="Instant bank transfer" color="#FF6B6B" emoji="🆔" />
        <Badge appearAt={95}  label="BPAY" sub="Australia-wide" color="#0066CC" emoji="🅱️" />
        <Badge appearAt={115} label="VietQR" sub="Vietnamese diaspora" color="#E74C3C" emoji="📱" />
        <Badge appearAt={135} label="Pay on Arrival" sub="In-person · cash/card" color={COLORS.emerald} emoji="✋" />
      </div>
    </AbsoluteFill>
  );
};
