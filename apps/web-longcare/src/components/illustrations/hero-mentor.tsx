type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroMentor({ className, width = 480, height = 360 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Illustration of an AI mentor having a conversation with a learner"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hm-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="60%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
        <radialGradient id="hm-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <pattern id="hm-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#CBD5E1" opacity="0.45" />
        </pattern>
      </defs>

      {/* background */}
      <rect width="480" height="360" rx="20" fill="#F8FAFC" />
      <rect width="480" height="360" rx="20" fill="url(#hm-dots)" />

      {/* Soft glow behind orb */}
      <circle cx="340" cy="170" r="110" fill="url(#hm-glow)" />

      {/* Person silhouette (left) */}
      <g>
        <circle cx="140" cy="150" r="34" fill="#CBD5E1" />
        <path
          d="M82 260c0-32 26-58 58-58s58 26 58 58v14H82v-14z"
          fill="#CBD5E1"
        />
        {/* shoulder shadow */}
        <path
          d="M88 274c10-24 32-40 52-40s42 16 52 40H88z"
          fill="#94A3B8"
          opacity="0.35"
        />
      </g>

      {/* Speech bubble from person */}
      <g>
        <rect x="190" y="118" width="68" height="40" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M198 158 L196 168 L210 158 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        <circle cx="208" cy="138" r="3" fill="#64748B" />
        <circle cx="222" cy="138" r="3" fill="#64748B" />
        <circle cx="236" cy="138" r="3" fill="#64748B" />
      </g>

      {/* Connection lines (dashed) */}
      <path
        d="M260 175 Q 295 165 320 165"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeDasharray="4 5"
      />
      <path
        d="M260 195 Q 295 200 320 200"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeDasharray="4 5"
      />

      {/* AI orb */}
      <circle cx="350" cy="180" r="58" fill="url(#hm-orb)" />
      <circle cx="335" cy="166" r="14" fill="#FFFFFF" opacity="0.35" />
      <text
        x="350"
        y="190"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="700"
        fontSize="26"
        fill="#FFFFFF"
        letterSpacing="1"
      >
        AI
      </text>

      {/* small orbiting dots */}
      <circle cx="408" cy="138" r="5" fill="#0369A1" />
      <circle cx="295" cy="240" r="4" fill="#059669" />
      <circle cx="425" cy="220" r="4" fill="#0EA5E9" opacity="0.6" />

      {/* base line subtle */}
      <line x1="40" y1="296" x2="440" y2="296" stroke="#E2E8F0" strokeWidth="2" />
    </svg>
  );
}
