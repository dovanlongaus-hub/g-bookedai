type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroEducation({ className, width = 480, height = 360 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Illustration of AI-assisted education with open book, graduation cap, and AI orb"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hed-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="60%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
        <radialGradient id="hed-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hed-cover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>
        <pattern id="hed-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#CBD5E1" opacity="0.45" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="480" height="360" rx="20" fill="#F1F5F9" />
      <rect width="480" height="360" rx="20" fill="url(#hed-grid)" />

      {/* Decorative ABC letters scattered */}
      <g
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="800"
        fill="#94A3B8"
        opacity="0.25"
      >
        <text x="40" y="68" fontSize="22">A</text>
        <text x="64" y="92" fontSize="18">B</text>
        <text x="36" y="116" fontSize="16">C</text>
        <text x="430" y="320" fontSize="22">A</text>
        <text x="412" y="298" fontSize="16">B</text>
        <text x="436" y="272" fontSize="14">C</text>
        <text x="416" y="74" fontSize="18">π</text>
        <text x="56" y="304" fontSize="18">∑</text>
      </g>

      {/* Glow behind orb */}
      <circle cx="368" cy="170" r="98" fill="url(#hed-glow)" />

      {/* Open book */}
      <g>
        {/* Shadow */}
        <ellipse cx="170" cy="294" rx="116" ry="10" fill="#0F172A" opacity="0.16" />
        {/* Cover (left) */}
        <path
          d="M64 188 L172 168 L172 280 L64 296 Z"
          fill="url(#hed-cover)"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Cover (right) */}
        <path
          d="M172 168 L280 188 L280 296 L172 280 Z"
          fill="url(#hed-cover)"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Page left */}
        <path
          d="M76 178 L172 162 L172 268 L76 282 Z"
          fill="#FFFFFF"
          stroke="#334155"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Page right */}
        <path
          d="M172 162 L268 178 L268 282 L172 268 Z"
          fill="#FFFFFF"
          stroke="#334155"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Spine */}
        <line x1="172" y1="162" x2="172" y2="268" stroke="#0F172A" strokeWidth="1.2" />
        {/* Text lines left */}
        <line x1="90" y1="194" x2="160" y2="184" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
        <line x1="90" y1="208" x2="160" y2="198" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="90" y1="222" x2="148" y2="214" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="90" y1="236" x2="160" y2="226" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        <line x1="90" y1="250" x2="152" y2="242" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        {/* Text lines right */}
        <line x1="184" y1="184" x2="254" y2="194" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
        <line x1="184" y1="198" x2="254" y2="208" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="184" y1="212" x2="246" y2="220" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="184" y1="226" x2="254" y2="236" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="184" y1="240" x2="240" y2="248" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Floating graduation cap */}
      <g transform="translate(232 100) rotate(-10)">
        {/* Mortar board */}
        <path d="M-44 0 L0 -16 L44 0 L0 16 Z" fill="#0F172A" stroke="#0F172A" strokeWidth="1.5" />
        {/* Cap base */}
        <path d="M-26 4 L-26 20 Q-26 28 0 28 Q26 28 26 20 L26 4 L0 14 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
        {/* Tassel */}
        <line x1="0" y1="0" x2="32" y2="22" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="24" r="4" fill="#D97706" />
      </g>

      {/* AI orb with lightbulb idea */}
      <g>
        <circle cx="368" cy="170" r="54" fill="url(#hed-orb)" />
        <circle cx="354" cy="156" r="11" fill="#FFFFFF" opacity="0.35" />
        {/* Lightbulb overlay */}
        <g>
          <path
            d="M368 144
               Q352 144 352 160
               Q352 170 360 176
               L360 184
               Q360 188 364 188
               L372 188
               Q376 188 376 184
               L376 176
               Q384 170 384 160
               Q384 144 368 144 Z"
            fill="#FDE68A"
            stroke="#0F172A"
            strokeWidth="1.6"
          />
          {/* Filament */}
          <path d="M362 160 Q368 154 374 160" stroke="#D97706" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          {/* Base */}
          <line x1="362" y1="192" x2="374" y2="192" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <line x1="364" y1="196" x2="372" y2="196" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          {/* Sparks */}
          <circle cx="344" cy="142" r="2" fill="#FDE68A" />
          <circle cx="392" cy="146" r="2" fill="#FDE68A" />
          <circle cx="396" cy="170" r="2" fill="#FDE68A" />
        </g>
      </g>

      {/* Pencil accent */}
      <g transform="translate(294 252) rotate(28)">
        <rect x="-30" y="-4" width="48" height="8" fill="#D97706" stroke="#0F172A" strokeWidth="1.4" />
        <path d="M18 -4 L26 0 L18 4 Z" fill="#F1F5F9" stroke="#0F172A" strokeWidth="1.4" />
        <path d="M22 -1 L26 0 L22 1 Z" fill="#0F172A" />
      </g>

      {/* Sparkle accents */}
      <g fill="#0EA5E9">
        <circle cx="416" cy="120" r="3" />
        <circle cx="298" cy="318" r="3" fill="#059669" />
        <circle cx="56" cy="220" r="3" opacity="0.7" />
      </g>
    </svg>
  );
}
