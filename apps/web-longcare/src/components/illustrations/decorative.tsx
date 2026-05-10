type DecorativeProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function DotsPattern({ className, width = 400, height = 400 }: DecorativeProps) {
  // 20 x 20 grid of small dots, slate-200 0.3 opacity
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 400"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dec-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#CBD5E1" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#dec-dots)" />
    </svg>
  );
}

export function WavyLine({ className, width = 240, height = 40 }: DecorativeProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 240 40"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 20 Q 30 4 60 20 T 120 20 T 180 20 T 240 20"
        stroke="#7DD3FC"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Grid({ className, width = 400, height = 400 }: DecorativeProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 400"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dec-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" stroke="#F1F5F9" strokeWidth="1" fill="none" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#dec-grid)" />
    </svg>
  );
}

export function OrbGlow({ className, width = 240, height = 240 }: DecorativeProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 240 240"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="dec-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#7DD3FC" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="120" r="120" fill="url(#dec-orb)" />
    </svg>
  );
}

export function BlobShape({ className, width = 320, height = 320 }: DecorativeProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 320 320"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M160 30
           C220 24 286 70 290 130
           C294 188 264 226 220 250
           C176 274 110 286 70 252
           C30 218 22 156 44 110
           C66 64 100 36 160 30 Z"
        fill="#F1F5F9"
      />
    </svg>
  );
}
