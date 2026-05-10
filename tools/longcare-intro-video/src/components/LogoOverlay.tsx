import React from 'react';
import { Img, staticFile } from 'remotion';

// Small logo pinned top-left. Rendered inside a <Sequence> so visibility is controlled by parent.
export const LogoOverlay: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 28,
        left: 32,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <Img
        src={staticFile('longcare_logo_latest.png')}
        style={{
          width: 120,
          height: 'auto',
          filter:
            'drop-shadow(0 4px 12px rgba(0,0,0,0.35)) drop-shadow(0 1px 2px rgba(0,0,0,0.25))',
        }}
      />
    </div>
  );
};
