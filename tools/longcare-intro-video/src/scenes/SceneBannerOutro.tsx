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

// 6s outro = 180 frames @ 30fps.
// Full banner visible (objectFit: contain) on the same brand-gradient backdrop
// as the intro, with the "Visit longcare.au" CTA as the focal point.
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

  // Very subtle settle: 1.02 -> 1.00 (stays inside contain bounds, no crop).
  const scale = interpolate(frame, [0, 180], [1.02, 1.0], {
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

  const bannerSrc = staticFile('longcare_banner.png');

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Brand gradient backdrop fills the pillarbox bars. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary1} 0%, ${COLORS.primary2} 50%, ${COLORS.primary3} 100%)`,
        }}
      />

      {/* Soft blurred banner copy as backdrop texture. */}
      <Img
        src={bannerSrc}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(40px) saturate(1.1)',
          opacity: 0.4,
          transform: 'scale(1.15)',
        }}
      />

      {/* Full banner — contain, no crop. */}
      <Img
        src={bannerSrc}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      />

      {/* Dark scrim so overlay text is legible over the banner. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.78) 100%)',
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 80,
          gap: 24,
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
            textShadow: '0 6px 28px rgba(0,0,0,0.7)',
          }}
        >
          Visit longcare.au
        </h1>

        {/* Prominent gradient URL with chevron */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            opacity: urlOp,
            background: 'rgba(15, 23, 42, 0.72)',
            padding: '20px 52px',
            borderRadius: 999,
            border: '1.5px solid rgba(255,255,255,0.22)',
            boxShadow: '0 18px 50px rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              letterSpacing: -1.5,
              background: `linear-gradient(135deg, #A78BFA 0%, #60A5FA 50%, #38BDF8 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}
          >
            longcare.au
          </span>
        </div>

        <div
          style={{
            marginTop: 18,
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
