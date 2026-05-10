type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function ThemedRoadmap({ className, width = 480, height = 280 }: Props) {
  return (
    <svg
      role="img"
      aria-label="90-day AI readiness roadmap"
      viewBox="0 0 480 280"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="trm-road" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="50%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <radialGradient id="trm-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="480" height="280" rx="20" fill="#F1F5F9" />
      <ellipse cx="240" cy="140" rx="220" ry="80" fill="url(#trm-glow)" />

      {/* Decorative dots */}
      <g fill="#CBD5E1" opacity="0.5">
        <circle cx="40" cy="40" r="2" />
        <circle cx="440" cy="40" r="2" />
        <circle cx="60" cy="252" r="2" />
        <circle cx="420" cy="252" r="2" />
      </g>

      {/* Road shadow */}
      <path
        d="M44 144
           Q120 124 200 144
           Q280 164 360 138
           Q420 120 444 134"
        stroke="#0F172A"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        opacity="0.08"
        transform="translate(0 6)"
      />

      {/* Road line */}
      <path
        d="M44 144
           Q120 124 200 144
           Q280 164 360 138
           Q420 120 444 134"
        stroke="url(#trm-road)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      {/* Road dashed center line */}
      <path
        d="M44 144
           Q120 124 200 144
           Q280 164 360 138
           Q420 120 444 134"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 8"
        fill="none"
        opacity="0.85"
      />

      {/* Milestone labels (top) and markers */}
      <g fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif">
        {/* Day 1 */}
        <g transform="translate(64 138)">
          <circle r="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
          <circle r="6" fill="#0369A1" />
          <text x="0" y="-26" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0F172A">Day 1</text>
          <text x="0" y="-12" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748B">START</text>
        </g>
        {/* Day 30 */}
        <g transform="translate(186 142)">
          <circle r="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
          <circle r="6" fill="#0EA5E9" />
          <text x="0" y="-26" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0F172A">Day 30</text>
          <text x="0" y="-12" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748B">PILOT</text>
        </g>
        {/* Day 60 */}
        <g transform="translate(326 146)">
          <circle r="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
          <circle r="6" fill="#D97706" />
          <text x="0" y="-26" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0F172A">Day 60</text>
          <text x="0" y="-12" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748B">TRAIN</text>
        </g>
        {/* Day 90 */}
        <g transform="translate(434 132)">
          <circle r="16" fill="#059669" stroke="#0F172A" strokeWidth="2.5" />
          <path
            d="M-6 0 L-2 5 L7 -5"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="0" y="-28" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0F172A">Day 90</text>
          <text x="0" y="-14" textAnchor="middle" fontSize="9" fontWeight="700" fill="#059669">SCALE</text>
        </g>
      </g>

      {/* Activity icons below road */}
      <g
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="#475569"
        letterSpacing="0.3"
      >
        {/* Audit */}
        <g transform="translate(64 200)">
          <rect x="-22" y="-14" width="44" height="28" rx="6" fill="#FFFFFF" stroke="#0369A1" strokeWidth="1.6" />
          <g transform="translate(-8 -3)" stroke="#0369A1" strokeWidth="1.6" fill="none" strokeLinecap="round">
            <circle cx="3" cy="-2" r="4" />
            <line x1="6" y1="2" x2="11" y2="7" />
          </g>
          <text x="0" y="32" textAnchor="middle">AUDIT</text>
        </g>
        {/* Pilot */}
        <g transform="translate(186 200)">
          <rect x="-22" y="-14" width="44" height="28" rx="6" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="1.6" />
          <g transform="translate(-7 -2)" fill="#0EA5E9">
            <path d="M0 4 L0 -4 L8 0 Z" />
          </g>
          <text x="0" y="32" textAnchor="middle">PILOT</text>
        </g>
        {/* Train */}
        <g transform="translate(326 200)">
          <rect x="-22" y="-14" width="44" height="28" rx="6" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.6" />
          <g transform="translate(-8 -2)" stroke="#D97706" strokeWidth="1.6" fill="none" strokeLinecap="round">
            <path d="M0 4 L0 -2 L8 -2 L8 4" />
            <path d="M-3 -2 L11 -2" />
            <path d="M2 -2 L2 -6 L6 -6 L6 -2" />
          </g>
          <text x="0" y="32" textAnchor="middle">TRAIN</text>
        </g>
        {/* Scale */}
        <g transform="translate(434 200)">
          <rect x="-22" y="-14" width="44" height="28" rx="6" fill="#FFFFFF" stroke="#059669" strokeWidth="1.6" />
          <g transform="translate(-8 -2)" stroke="#059669" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="0,4 4,0 8,2 14,-4" />
            <polyline points="11,-4 14,-4 14,-1" />
          </g>
          <text x="0" y="32" textAnchor="middle">SCALE</text>
        </g>
      </g>

      {/* Sparkles */}
      <g fill="#0EA5E9">
        <circle cx="40" cy="80" r="2.5" opacity="0.6" />
        <circle cx="240" cy="50" r="2.5" opacity="0.6" />
        <circle cx="448" cy="74" r="2.5" opacity="0.6" />
      </g>
    </svg>
  );
}
