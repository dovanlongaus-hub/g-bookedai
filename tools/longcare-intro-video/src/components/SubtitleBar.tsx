import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface SubtitleBarProps {
  text: string;
  // duration controls fade-in/out timing relative to the parent <Sequence>
  fadeFrames?: number;
  totalFrames: number;
}

// Bottom-center white text on a semi-transparent black pill. Fades in/out.
export const SubtitleBar: React.FC<SubtitleBarProps> = ({
  text,
  fadeFrames = 12,
  totalFrames,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, fadeFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(
    frame,
    [Math.max(0, totalFrames - fadeFrames), totalFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 64,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 40,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: '78%',
          background: 'rgba(0,0,0,0.7)',
          color: '#ffffff',
          padding: '14px 28px',
          borderRadius: 12,
          fontSize: 26,
          fontWeight: 600,
          lineHeight: 1.35,
          textAlign: 'center',
          letterSpacing: 0.3,
          opacity,
          boxShadow: '0 6px 24px rgba(0,0,0,0.45)',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        }}
      >
        {text}
      </div>
    </div>
  );
};
