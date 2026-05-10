import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS } from '../theme';

// 6s outro = 180 frames @ 30fps. Banner full-bleed + "Visit longcare.au" overlay + small CTA pill.
// No LogoOverlay component is used during this scene (banner already brand-rich).
export const SceneBannerOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [155, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(fadeIn, fadeOut);

  // Subtle continued zoom from 1.04 -> 1.00 (anti-Ken-Burns to feel like a settle)
  const scale = interpolate(frame, [0, 180], [1.04, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const headlineOp = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [15, 45], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const urlOp = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const btnSp = spring({
    frame: Math.max(frame - 60, 0),
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const btnOp = interpolate(frame, [60, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', opacity }}>
      <Img
        src={staticFile('longcare_banner.png')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      />
      {/* Dark scrim so overlay text is legible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 80,
          gap: 28,
        }}
      >
        <h1
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: '#fff',
            margin: 0,
            letterSpacing: -3,
            textAlign: 'center',
            opacity: headlineOp,
            transform: `translateY(${headlineY}px)`,
            textShadow: '0 6px 28px rgba(0,0,0,0.65)',
          }}
        >
          Visit longcare.au
        </h1>

        <div
          style={{
            fontSize: 38,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.95)',
            letterSpacing: 8,
            opacity: urlOp,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}
        >
          longcare.au
        </div>

        <div
          style={{
            marginTop: 20,
            opacity: btnOp,
            transform: `scale(${btnSp})`,
            background: '#fff',
            padding: '22px 48px',
            borderRadius: 999,
            boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              background: `linear-gradient(135deg, ${COLORS.primary1}, ${COLORS.primary3})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Start Your AI Journey
          </span>
          <span style={{ fontSize: 32, color: COLORS.primary1 }}>→</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
