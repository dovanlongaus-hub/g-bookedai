import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated gradient bg position
  const bgShift = interpolate(frame, [0, 180], [0, 100]);

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const logoOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

  const titleOpacity = interpolate(frame, [25, 55], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [25, 55], [40, 0], { extrapolateRight: 'clamp' });

  const subOpacity = interpolate(frame, [55, 85], [0, 1], { extrapolateRight: 'clamp' });

  const fadeOut = interpolate(frame, [150, 180], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + bgShift / 4}deg, ${COLORS.primary1} 0%, ${COLORS.primary2} 50%, ${COLORS.primary3} 100%)`,
        opacity: fadeOut,
      }}
    >
      {/* Particle glow */}
      {Array.from({ length: 18 }).map((_, i) => {
        const seed = i * 137.5;
        const x = (Math.sin(seed) * 0.5 + 0.5) * 100;
        const y = ((Math.cos(seed * 1.3) * 0.5) + 0.5) * 100;
        const size = 4 + ((i * 7) % 10);
        const driftY = Math.sin((frame + i * 12) / 30) * 12;
        const flicker = 0.3 + Math.abs(Math.sin((frame + i * 9) / 25)) * 0.5;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.85)',
              boxShadow: '0 0 20px rgba(255,255,255,0.6)',
              opacity: flicker,
              transform: `translateY(${driftY}px)`,
            }}
          />
        );
      })}

      {/* Soft radial highlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 60%)',
        }}
      />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 80 }}>
        {/* Logo monogram */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            width: 180,
            height: 180,
            borderRadius: 40,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.75))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            marginBottom: 50,
          }}
        >
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              background: `linear-gradient(135deg, ${COLORS.primary1}, ${COLORS.primary3})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: -4,
            }}
          >
            L
          </span>
        </div>

        <h1
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: '#fff',
            margin: 0,
            letterSpacing: -3,
            textAlign: 'center',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textShadow: '0 4px 24px rgba(0,0,0,0.25)',
          }}
        >
          Learn AI. Build Faster.
          <br />
          Grow Smarter.
        </h1>

        <div
          style={{
            marginTop: 36,
            fontSize: 42,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.95)',
            letterSpacing: 4,
            opacity: subOpacity,
          }}
        >
          longcare.au
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
