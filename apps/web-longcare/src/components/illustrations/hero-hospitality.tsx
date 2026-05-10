type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroHospitality({ className, width = 480, height = 360 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Illustration of an Australian café using AI for bookings and menus"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hho-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="60%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
        <radialGradient id="hho-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hho-cup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
        <pattern id="hho-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#CBD5E1" opacity="0.35" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="480" height="360" rx="20" fill="#F1F5F9" />
      <rect width="480" height="360" rx="20" fill="url(#hho-dots)" />

      {/* Soft warmth glow */}
      <circle cx="240" cy="200" r="180" fill="url(#hho-glow)" />

      {/* Decorative leaf wreath corner */}
      <g opacity="0.45" stroke="#A7F3D0" strokeWidth="1.5" fill="#A7F3D0">
        <path d="M30 30 Q42 20 54 30 Q42 40 30 30 Z" opacity="0.5" />
        <path d="M28 50 Q40 40 52 50 Q40 60 28 50 Z" opacity="0.4" />
        <path d="M26 70 Q38 60 50 70 Q38 80 26 70 Z" opacity="0.3" />
      </g>
      <g opacity="0.4" stroke="#A7F3D0" strokeWidth="1.5" fill="#A7F3D0">
        <path d="M450 330 Q438 320 426 330 Q438 340 450 330 Z" />
        <path d="M448 312 Q436 302 424 312 Q436 322 448 312 Z" opacity="0.7" />
      </g>

      {/* Steam swirls (amber-600) */}
      <g stroke="#D97706" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M118 130 Q108 116 118 102 Q128 90 118 78" />
        <path d="M148 130 Q138 116 148 102 Q158 90 148 78" />
        <path d="M178 130 Q168 116 178 102 Q188 90 178 78" />
      </g>

      {/* Coffee cup */}
      <g>
        {/* Saucer */}
        <ellipse cx="148" cy="278" rx="98" ry="14" fill="#0F172A" opacity="0.18" />
        <ellipse cx="148" cy="272" rx="96" ry="12" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
        {/* Cup body */}
        <path
          d="M76 158
             L220 158
             L210 254
             Q208 272 188 272
             L108 272
             Q88 272 86 254 Z"
          fill="url(#hho-cup)"
          stroke="#334155"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Cup rim ellipse */}
        <ellipse cx="148" cy="158" rx="72" ry="10" fill="#0369A1" opacity="0.85" stroke="#334155" strokeWidth="2" />
        <ellipse cx="148" cy="156" rx="64" ry="6" fill="#1E293B" opacity="0.85" />
        {/* Handle */}
        <path
          d="M220 178 Q252 178 252 212 Q252 246 220 246"
          stroke="#334155"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Heart latte art */}
        <path
          d="M148 168 Q140 160 134 166 Q130 172 148 184 Q166 172 162 166 Q156 160 148 168 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
      </g>

      {/* Plate + cutlery (mid) */}
      <g>
        <ellipse cx="294" cy="274" rx="44" ry="9" fill="#0F172A" opacity="0.14" />
        <ellipse cx="294" cy="270" rx="42" ry="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        <ellipse cx="294" cy="270" rx="28" ry="5" fill="none" stroke="#CBD5E1" strokeWidth="1.2" />
        {/* Fork */}
        <g stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
          <line x1="262" y1="240" x2="262" y2="268" />
          <line x1="258" y1="240" x2="258" y2="252" />
          <line x1="266" y1="240" x2="266" y2="252" />
        </g>
        {/* Knife */}
        <g stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
          <line x1="328" y1="240" x2="328" y2="268" />
          <path d="M324 240 L332 240 L330 252 L326 252 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
        </g>
      </g>

      {/* AI orb with chat bubble */}
      <g>
        <circle cx="380" cy="160" r="56" fill="url(#hho-orb)" />
        <circle cx="366" cy="146" r="11" fill="#FFFFFF" opacity="0.35" />
        {/* Chat bubble overlay */}
        <g>
          <path
            d="M340 150
               L420 150
               Q428 150 428 158
               L428 178
               Q428 186 420 186
               L388 186
               L378 196
               L380 186
               L340 186
               Q332 186 332 178
               L332 158
               Q332 150 340 150 Z"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="1.5"
          />
          <text
            x="380"
            y="174"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="12"
            fontWeight="700"
            fill="#0369A1"
            letterSpacing="0.4"
          >
            menu
          </text>
        </g>
      </g>

      {/* Sparkle accents */}
      <g fill="#0EA5E9">
        <circle cx="56" cy="180" r="3" />
        <circle cx="436" cy="248" r="3" opacity="0.7" />
        <circle cx="320" cy="86" r="3" fill="#059669" />
      </g>
    </svg>
  );
}
