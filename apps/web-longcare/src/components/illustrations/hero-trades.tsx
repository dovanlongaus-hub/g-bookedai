type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroTrades({ className, width = 480, height = 360 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Illustration of AI-assisted trades workflow with hardhat, tools, and tablet device"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="ht-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="60%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
        <pattern id="ht-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0 L0 0 L0 24" fill="none" stroke="#CBD5E1" strokeWidth="1" opacity="0.35" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="480" height="360" rx="20" fill="#F1F5F9" />
      <rect width="480" height="360" rx="20" fill="url(#ht-grid)" />

      {/* Hardhat */}
      <g>
        {/* Brim */}
        <path
          d="M62 232 L228 232 L228 244 Q228 252 220 252 L70 252 Q62 252 62 244 Z"
          fill="#D97706"
          stroke="#0F172A"
          strokeWidth="2"
        />
        {/* Dome */}
        <path
          d="M76 232 Q76 158 145 158 Q214 158 214 232 Z"
          fill="#D97706"
          stroke="#0F172A"
          strokeWidth="2"
        />
        {/* Center ridge */}
        <path d="M145 158 L145 232" stroke="#0F172A" strokeWidth="2" opacity="0.4" />
        {/* Side ridges */}
        <path d="M108 168 Q104 200 108 232" stroke="#0F172A" strokeWidth="1.5" fill="none" opacity="0.3" />
        <path d="M182 168 Q186 200 182 232" stroke="#0F172A" strokeWidth="1.5" fill="none" opacity="0.3" />
        {/* Highlight */}
        <ellipse cx="120" cy="190" rx="22" ry="9" fill="#FFFFFF" opacity="0.25" />
      </g>

      {/* Crossed tools — spanner + screwdriver */}
      <g transform="translate(216 250) rotate(-30)">
        {/* Spanner */}
        <g stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="#E2E8F0">
          <path d="M-50 0 L36 0" />
          <path
            d="M36 -10 L52 -10 Q62 -10 62 0 Q62 10 52 10 L36 10 Q44 4 44 0 Q44 -4 36 -10 Z"
            fill="#94A3B8"
          />
          <circle cx="-54" cy="0" r="6" fill="#334155" stroke="none" />
        </g>
      </g>
      <g transform="translate(216 250) rotate(30)">
        {/* Screwdriver */}
        <g stroke="#334155" strokeWidth="2" strokeLinejoin="round">
          <rect x="-60" y="-7" width="40" height="14" rx="3" fill="#D97706" />
          <rect x="-20" y="-4" width="10" height="8" fill="#94A3B8" />
          <path d="M-10 -3 L24 -1 L24 1 L-10 3 Z" fill="#CBD5E1" />
        </g>
      </g>

      {/* Tablet device */}
      <g>
        <rect
          x="290"
          y="92"
          width="148"
          height="200"
          rx="14"
          fill="#F1F5F9"
          stroke="#94A3B8"
          strokeWidth="2.5"
        />
        {/* Screen inset */}
        <rect
          x="300"
          y="106"
          width="128"
          height="172"
          rx="6"
          fill="#0F172A"
        />
        {/* Home button */}
        <circle cx="364" cy="285" r="3" fill="#94A3B8" />

        {/* AI orb on screen */}
        <circle cx="364" cy="184" r="38" fill="url(#ht-orb)" />
        <circle cx="354" cy="174" r="9" fill="#FFFFFF" opacity="0.35" />
        <text
          x="364"
          y="192"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="18"
          fontWeight="700"
          fill="#FFFFFF"
          letterSpacing="0.5"
        >
          AI
        </text>

        {/* Status dots / wifi indicator on tablet */}
        <g fill="#0EA5E9">
          <circle cx="316" cy="248" r="3" />
          <circle cx="328" cy="248" r="3" opacity="0.6" />
          <circle cx="340" cy="248" r="3" opacity="0.4" />
        </g>
      </g>

      {/* Wifi/connection lines from tablet to AI orb (left from tablet to hardhat scene) */}
      <g stroke="#0EA5E9" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.65">
        <path d="M280 156 Q252 142 224 156" strokeDasharray="3 5" />
        <path d="M280 184 Q244 184 220 196" strokeDasharray="3 5" />
        <path d="M280 212 Q256 224 230 224" strokeDasharray="3 5" />
      </g>

      {/* Decorative hint dots */}
      <circle cx="40" cy="40" r="4" fill="#D97706" />
      <circle cx="60" cy="58" r="3" fill="#0369A1" opacity="0.6" />
      <circle cx="40" cy="316" r="3" fill="#059669" />
    </svg>
  );
}
