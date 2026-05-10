type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroSolutions({ className, width = 480, height = 360 }: Props) {
  // simplified Australia outline (stylised), drawn within a 480x360 viewbox
  // 7 cities as colored dots
  const cities: Array<{ name: string; x: number; y: number; color: string }> = [
    { name: "Sydney", x: 358, y: 232, color: "#0369A1" },
    { name: "Melbourne", x: 326, y: 270, color: "#059669" },
    { name: "Brisbane", x: 372, y: 178, color: "#D97706" },
    { name: "Perth", x: 132, y: 224, color: "#0EA5E9" },
    { name: "Adelaide", x: 268, y: 248, color: "#7C3AED" },
    { name: "Hobart", x: 332, y: 314, color: "#DC2626" },
    { name: "Darwin", x: 244, y: 92, color: "#F59E0B" },
  ];

  return (
    <svg
      role="img"
      aria-label="Illustration of Australia map with industry hubs across major cities"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hs-au" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>

      <rect width="480" height="360" rx="20" fill="#F8FAFC" />

      {/* Stylised Australia outline */}
      <path
        d="M 122 174
           Q 110 198 116 232
           Q 122 268 152 282
           Q 184 296 218 290
           Q 248 286 272 282
           Q 296 280 320 290
           Q 342 296 360 286
           Q 386 270 396 248
           Q 408 222 396 192
           Q 386 168 382 152
           Q 380 130 366 118
           Q 348 100 318 96
           Q 286 92 256 92
           Q 226 92 206 96
           Q 184 102 168 116
           Q 148 134 138 152
           Q 130 164 122 174 Z"
        fill="url(#hs-au)"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Tasmania */}
      <ellipse cx="332" cy="314" rx="22" ry="14" fill="url(#hs-au)" stroke="#94A3B8" strokeWidth="1.5" />

      {/* City dots + labels */}
      {cities.map((c) => (
        <g key={c.name}>
          <circle cx={c.x} cy={c.y} r="9" fill={c.color} opacity="0.18" />
          <circle cx={c.x} cy={c.y} r="5" fill={c.color} stroke="#FFFFFF" strokeWidth="2" />
          <line x1={c.x} y1={c.y - 8} x2={c.x} y2={c.y - 18} stroke={c.color} strokeWidth="1.5" />
          <rect
            x={c.x - 30}
            y={c.y - 36}
            width="60"
            height="18"
            rx="9"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <text
            x={c.x}
            y={c.y - 23}
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="10"
            fontWeight="600"
            fill="#0F172A"
          >
            {c.name}
          </text>
        </g>
      ))}

      {/* small caption strip */}
      <rect x="40" y="36" width="160" height="22" rx="11" fill="#0F172A" />
      <text
        x="120"
        y="51"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#FFFFFF"
      >
        Australia-wide solutions
      </text>
    </svg>
  );
}
