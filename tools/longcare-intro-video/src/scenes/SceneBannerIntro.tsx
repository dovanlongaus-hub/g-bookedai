import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { COLORS } from '../theme';

// 5s intro = 150 frames @ 30fps.
// Full banner visible (objectFit: contain) on a brand-gradient backdrop with a
// subtle blurred copy of the banner behind it. Bottom-center "longcare.au" CTA.
export const SceneBannerIntro: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [125, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(fadeIn, fadeOut);

  // Very subtle Ken Burns: zoom 1.00 -> 1.02 (stays inside contain bounds).
  const scale = interpolate(frame, [0, 150], [1.0, 1.02], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // URL fades in at frame 30, holds to end of scene.
  const urlOp = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const urlY = interpolate(frame, [30, 60], [24, 0], {
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
          opacity: 0.45,
          transform: 'scale(1.15)',
        }}
      />

      {/* Subtle dark veil so the gradient stays cohesive. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.25) 100%)',
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

      {/* Bottom-center URL CTA */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 70,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            opacity: urlOp,
            transform: `translateY(${urlY}px)`,
          }}
        >
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.78)',
              padding: '18px 44px',
              borderRadius: 999,
              border: '1.5px solid rgba(255,255,255,0.18)',
              boxShadow: '0 18px 50px rgba(0,0,0,0.45)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span
              style={{
                fontSize: 68,
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
              fontSize: 22,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.92)',
              letterSpacing: 4,
              textTransform: 'uppercase',
              textShadow: '0 2px 10px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ fontSize: 26 }}>→</span>
            Visit our site
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
