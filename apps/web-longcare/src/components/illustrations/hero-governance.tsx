type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroGovernance({ className, width = 480, height = 360 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Illustration of a security shield with a compliance checklist"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hg-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
        <radialGradient id="hg-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="480" height="360" rx="20" fill="#F8FAFC" />
      <circle cx="240" cy="170" r="150" fill="url(#hg-glow)" />

      {/* Shield outline */}
      <path
        d="M240 60
           L350 96
           L350 192
           Q350 256 240 296
           Q130 256 130 192
           L130 96 Z"
        fill="url(#hg-shield)"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Inner shield decorative line */}
      <path
        d="M240 78
           L334 110
           L334 188
           Q334 244 240 278
           Q146 244 146 188
           L146 110 Z"
        stroke="#CBD5E1"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />

      {/* Checklist (3 items) */}
      <g transform="translate(170,128)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0,${i * 36})`}>
            <rect width="140" height="26" rx="6" fill="#F1F5F9" />
            {/* check circle */}
            <circle cx="14" cy="13" r="9" fill="#059669" />
            <path d="M9 13 l3 3 l6 -6" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* label bar */}
            <rect x="30" y="9" width={i === 2 ? 80 : 96} height="8" rx="4" fill="#CBD5E1" />
          </g>
        ))}
      </g>

      {/* Scale of justice icon at base */}
      <g transform="translate(216,242)" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" fill="none">
        <line x1="24" y1="0" x2="24" y2="32" />
        <line x1="6" y1="6" x2="42" y2="6" />
        <path d="M6 6 L1 18 a6 6 0 0 0 10 0 z" fill="#E0F2FE" />
        <path d="M42 6 L37 18 a6 6 0 0 0 10 0 z" fill="#E0F2FE" />
        <rect x="14" y="32" width="20" height="3" rx="1.5" fill="#0369A1" />
      </g>

      {/* Small label */}
      <rect x="180" y="296" width="120" height="24" rx="12" fill="#0F172A" />
      <text
        x="240"
        y="312"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#FFFFFF"
      >
        Australian Privacy Act
      </text>
    </svg>
  );
}
