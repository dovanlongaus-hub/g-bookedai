type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroRealEstate({ className, width = 480, height = 360 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Illustration of AI-assisted real estate with house outline, key, and location pin"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hre-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>
        <radialGradient id="hre-pin" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="480" height="360" rx="20" fill="#F1F5F9" />

      {/* Faint street-grid hint */}
      <g stroke="#CBD5E1" strokeWidth="1" opacity="0.35" fill="none">
        <line x1="30" y1="280" x2="450" y2="280" />
        <line x1="30" y1="312" x2="450" y2="312" />
        <line x1="120" y1="240" x2="120" y2="340" />
        <line x1="240" y1="240" x2="240" y2="340" />
        <line x1="360" y1="240" x2="360" y2="340" />
      </g>

      {/* Decorative subtle "$" "%" symbols (low opacity) */}
      <g
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="700"
        fill="#94A3B8"
        opacity="0.28"
      >
        <text x="42" y="64" fontSize="22">$</text>
        <text x="430" y="320" fontSize="20">%</text>
        <text x="408" y="62" fontSize="16">$</text>
        <text x="56" y="320" fontSize="14">%</text>
      </g>

      {/* House */}
      <g>
        {/* Roof */}
        <path
          d="M88 188 L182 116 L276 188 Z"
          fill="url(#hre-roof)"
          stroke="#334155"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Body */}
        <rect
          x="108"
          y="186"
          width="148"
          height="100"
          fill="#FFFFFF"
          stroke="#334155"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Door */}
        <rect x="158" y="226" width="32" height="60" rx="2" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
        <circle cx="184" cy="258" r="2" fill="#334155" />
        {/* Window left */}
        <rect x="124" y="206" width="24" height="22" fill="#E0F2FE" stroke="#334155" strokeWidth="1.8" />
        <line x1="136" y1="206" x2="136" y2="228" stroke="#334155" strokeWidth="1.2" />
        <line x1="124" y1="217" x2="148" y2="217" stroke="#334155" strokeWidth="1.2" />
        {/* Window right */}
        <rect x="216" y="206" width="24" height="22" fill="#E0F2FE" stroke="#334155" strokeWidth="1.8" />
        <line x1="228" y1="206" x2="228" y2="228" stroke="#334155" strokeWidth="1.2" />
        <line x1="216" y1="217" x2="240" y2="217" stroke="#334155" strokeWidth="1.2" />
        {/* Chimney */}
        <rect x="232" y="130" width="14" height="28" fill="#E2E8F0" stroke="#334155" strokeWidth="2" />
        {/* Ground line under house */}
        <line x1="78" y1="286" x2="286" y2="286" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Floating key */}
      <g transform="translate(298 218) rotate(-22)">
        <circle cx="0" cy="0" r="14" fill="#D97706" stroke="#0F172A" strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill="#F1F5F9" />
        <rect x="12" y="-3" width="34" height="6" fill="#D97706" stroke="#0F172A" strokeWidth="1.6" />
        <rect x="36" y="3" width="4" height="8" fill="#D97706" stroke="#0F172A" strokeWidth="1.6" />
        <rect x="44" y="3" width="4" height="6" fill="#D97706" stroke="#0F172A" strokeWidth="1.6" />
      </g>

      {/* Location pin with AI label */}
      <g>
        {/* Shadow */}
        <ellipse cx="384" cy="252" rx="22" ry="5" fill="#0F172A" opacity="0.16" />
        {/* Pin shape */}
        <path
          d="M384 116
             Q420 116 420 154
             Q420 184 384 244
             Q348 184 348 154
             Q348 116 384 116 Z"
          fill="url(#hre-pin)"
          stroke="#0F172A"
          strokeWidth="2"
        />
        {/* Inner circle */}
        <circle cx="384" cy="152" r="20" fill="#FFFFFF" />
        <text
          x="384"
          y="159"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#0369A1"
          letterSpacing="0.5"
        >
          AI
        </text>
      </g>

      {/* Sparkle accents */}
      <g fill="#059669">
        <circle cx="64" cy="160" r="3" />
        <circle cx="320" cy="92" r="3" opacity="0.7" />
        <circle cx="436" cy="200" r="3" />
      </g>
    </svg>
  );
}
