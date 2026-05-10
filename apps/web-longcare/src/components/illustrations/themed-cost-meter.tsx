type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function ThemedCostMeter({ className, width = 400, height = 400 }: Props) {
  return (
    <svg
      role="img"
      aria-label="AI cost meter and breakdown chart"
      viewBox="0 0 400 400"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tcm-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="55%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <radialGradient id="tcm-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="400" rx="20" fill="#F1F5F9" />
      <circle cx="200" cy="160" r="150" fill="url(#tcm-glow)" />

      {/* Gauge ring (slate) */}
      <path
        d="M64 178
           A136 136 0 0 1 336 178"
        stroke="#E2E8F0"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
      />
      {/* Gauge active arc with gradient */}
      <path
        d="M64 178
           A136 136 0 0 1 336 178"
        stroke="url(#tcm-arc)"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
      />

      {/* Tick marks */}
      <g stroke="#0F172A" strokeWidth="2" strokeLinecap="round">
        <line x1="64" y1="178" x2="76" y2="180" />
        <line x1="98" y1="106" x2="106" y2="114" />
        <line x1="166" y1="62" x2="170" y2="74" />
        <line x1="234" y1="62" x2="230" y2="74" />
        <line x1="302" y1="106" x2="294" y2="114" />
        <line x1="336" y1="178" x2="324" y2="180" />
      </g>

      {/* Tick labels */}
      <g
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="10"
        fontWeight="600"
        fill="#475569"
      >
        <text x="56" y="200" textAnchor="middle">$0</text>
        <text x="200" y="50" textAnchor="middle">Target</text>
        <text x="344" y="200" textAnchor="middle">Budget</text>
      </g>

      {/* Needle pointing to ~65% (sky-700) */}
      <g transform="translate(200 178) rotate(63)">
        <line x1="0" y1="0" x2="0" y2="-118" stroke="#0369A1" strokeWidth="4" strokeLinecap="round" />
        <circle cx="0" cy="0" r="10" fill="#0F172A" />
        <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
      </g>

      {/* Center value label */}
      <g
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        textAnchor="middle"
      >
        <text x="200" y="148" fontSize="36" fontWeight="800" fill="#0F172A">65%</text>
        <text x="200" y="166" fontSize="11" fontWeight="600" fill="#64748B" letterSpacing="0.4">
          MONTHLY SPEND
        </text>
      </g>

      {/* Breakdown bar (3 segments: tokens / API / human review) */}
      <g>
        <text
          x="40"
          y="232"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="11"
          fontWeight="700"
          fill="#0F172A"
          letterSpacing="0.3"
        >
          AUD breakdown
        </text>
        <rect x="40" y="240" width="320" height="22" rx="6" fill="#E2E8F0" />
        {/* Tokens (sky-700) ~45% */}
        <rect x="40" y="240" width="144" height="22" rx="6" fill="#0369A1" />
        {/* API (sky-500) ~30% */}
        <rect x="184" y="240" width="96" height="22" fill="#0EA5E9" />
        {/* Human review (amber-600) ~25% */}
        <rect x="280" y="240" width="80" height="22" rx="6" fill="#D97706" />

        {/* Legend */}
        <g
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="10"
          fontWeight="600"
        >
          <rect x="40" y="276" width="10" height="10" rx="2" fill="#0369A1" />
          <text x="56" y="285" fill="#0F172A">Tokens</text>
          <rect x="120" y="276" width="10" height="10" rx="2" fill="#0EA5E9" />
          <text x="136" y="285" fill="#0F172A">API</text>
          <rect x="184" y="276" width="10" height="10" rx="2" fill="#D97706" />
          <text x="200" y="285" fill="#0F172A">Human review</text>
        </g>
      </g>

      {/* Trending-down chart (emerald) */}
      <g transform="translate(40 308)">
        <rect x="0" y="0" width="320" height="76" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <text
          x="12"
          y="18"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="10"
          fontWeight="700"
          fill="#0F172A"
          letterSpacing="0.3"
        >
          90-day cost trend
        </text>
        {/* Axis baseline */}
        <line x1="12" y1="64" x2="308" y2="64" stroke="#CBD5E1" strokeWidth="1" />
        {/* Trending down line (emerald) */}
        <polyline
          points="20,32 60,38 100,34 140,46 180,42 220,52 260,58 300,62"
          fill="none"
          stroke="#059669"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Area under curve */}
        <polygon
          points="20,32 60,38 100,34 140,46 180,42 220,52 260,58 300,62 300,64 20,64"
          fill="#059669"
          opacity="0.16"
        />
        {/* End dot */}
        <circle cx="300" cy="62" r="3.5" fill="#059669" />
        <text
          x="300"
          y="46"
          textAnchor="end"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="10"
          fontWeight="700"
          fill="#059669"
        >
          -42%
        </text>
      </g>
    </svg>
  );
}
