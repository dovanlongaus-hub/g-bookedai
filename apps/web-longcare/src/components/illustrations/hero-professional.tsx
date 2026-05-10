type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroProfessional({ className, width = 480, height = 360 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Illustration of AI for accountants and lawyers with briefcase, document, and AI orb"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hpr-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="60%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
        <radialGradient id="hpr-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hpr-case" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="480" height="360" rx="20" fill="#F1F5F9" />

      {/* Faint grid lines (spreadsheet/data) */}
      <g stroke="#CBD5E1" strokeWidth="1" opacity="0.32" fill="none">
        <line x1="30" y1="80" x2="450" y2="80" />
        <line x1="30" y1="120" x2="450" y2="120" />
        <line x1="30" y1="160" x2="450" y2="160" />
        <line x1="30" y1="200" x2="450" y2="200" />
        <line x1="30" y1="240" x2="450" y2="240" />
        <line x1="30" y1="280" x2="450" y2="280" />
        <line x1="30" y1="320" x2="450" y2="320" />
        <line x1="100" y1="40" x2="100" y2="340" />
        <line x1="180" y1="40" x2="180" y2="340" />
        <line x1="260" y1="40" x2="260" y2="340" />
        <line x1="340" y1="40" x2="340" y2="340" />
        <line x1="420" y1="40" x2="420" y2="340" />
      </g>

      {/* Decorative $ % symbols (low opacity) */}
      <g
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="800"
        fill="#94A3B8"
        opacity="0.28"
      >
        <text x="48" y="74" fontSize="22">$</text>
        <text x="430" y="320" fontSize="22">%</text>
        <text x="408" y="64" fontSize="16">$</text>
        <text x="62" y="320" fontSize="16">%</text>
        <text x="46" y="200" fontSize="14">§</text>
      </g>

      {/* Glow behind orb */}
      <circle cx="368" cy="170" r="98" fill="url(#hpr-glow)" />

      {/* Briefcase */}
      <g>
        {/* Shadow */}
        <ellipse cx="156" cy="296" rx="98" ry="9" fill="#0F172A" opacity="0.18" />
        {/* Handle */}
        <path
          d="M124 184 Q124 154 156 154 Q188 154 188 184"
          stroke="#D97706"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Body */}
        <rect
          x="72"
          y="184"
          width="168"
          height="108"
          rx="8"
          fill="url(#hpr-case)"
          stroke="#0F172A"
          strokeWidth="2"
        />
        {/* Top edge highlight */}
        <line x1="72" y1="200" x2="240" y2="200" stroke="#64748B" strokeWidth="1.5" opacity="0.6" />
        {/* Latch */}
        <rect x="146" y="180" width="20" height="10" rx="2" fill="#D97706" stroke="#0F172A" strokeWidth="1.5" />
        <circle cx="156" cy="185" r="2" fill="#0F172A" />
        {/* Center seam */}
        <line x1="156" y1="200" x2="156" y2="292" stroke="#0F172A" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* Floating document with seal */}
      <g transform="translate(252 130) rotate(-8)">
        {/* Document shadow */}
        <rect x="-40" y="-46" width="92" height="116" rx="4" fill="#0F172A" opacity="0.12" />
        {/* Document */}
        <rect x="-44" y="-50" width="92" height="116" rx="4" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.8" />
        {/* Lines */}
        <line x1="-32" y1="-32" x2="32" y2="-32" stroke="#0369A1" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="-32" y1="-18" x2="32" y2="-18" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="-32" y1="-6" x2="20" y2="-6" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="-32" y1="6" x2="32" y2="6" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="-32" y1="18" x2="24" y2="18" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        {/* Seal */}
        <g transform="translate(20 50)">
          <circle cx="0" cy="0" r="14" fill="#0369A1" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="9" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="9"
            fontWeight="800"
            fill="#FFFFFF"
            letterSpacing="0.4"
          >
            ✓
          </text>
        </g>
        {/* Ribbon */}
        <path d="M14 60 L20 68 L26 60 L26 76 L20 72 L14 76 Z" fill="#D97706" stroke="#0F172A" strokeWidth="1.2" />
      </g>

      {/* AI orb with magnifier overlay */}
      <g>
        <circle cx="368" cy="170" r="54" fill="url(#hpr-orb)" />
        <circle cx="354" cy="156" r="11" fill="#FFFFFF" opacity="0.35" />
        {/* Magnifier */}
        <g>
          <circle cx="362" cy="166" r="20" fill="none" stroke="#FFFFFF" strokeWidth="3.5" />
          <circle cx="362" cy="166" r="20" fill="#FFFFFF" opacity="0.18" />
          <line
            x1="378"
            y1="182"
            x2="396"
            y2="200"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Cross-hair "%" inside lens */}
          <text
            x="362"
            y="172"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="14"
            fontWeight="800"
            fill="#FFFFFF"
            letterSpacing="0.4"
          >
            %
          </text>
        </g>
      </g>

      {/* Sparkle accents */}
      <g fill="#0EA5E9">
        <circle cx="416" cy="120" r="3" />
        <circle cx="294" cy="316" r="3" fill="#059669" />
        <circle cx="56" cy="160" r="3" opacity="0.7" />
      </g>
    </svg>
  );
}
