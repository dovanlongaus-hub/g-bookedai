type Milestone = {
  label: string;
  year?: string;
};

type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
  milestones?: Milestone[];
};

const DEFAULT_MILESTONES: Milestone[] = [
  { year: "Day 0", label: "Discover" },
  { year: "Wk 1", label: "Spec" },
  { year: "Wk 2", label: "Build" },
  { year: "Wk 3", label: "Pilot" },
  { year: "Wk 4", label: "Live" },
];

export function InfographicTimeline({
  className,
  width = 720,
  height = 200,
  milestones = DEFAULT_MILESTONES,
}: Props) {
  const list = milestones.length === 5 ? milestones : DEFAULT_MILESTONES;
  const xs = [80, 220, 360, 500, 640];
  const lineY = 100;
  const colors = ["#0EA5E9", "#0369A1", "#7C3AED", "#D97706", "#059669"];

  return (
    <svg
      role="img"
      aria-label="Horizontal timeline with five milestones"
      viewBox="0 0 720 200"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="it-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* base track */}
      <line x1="60" y1={lineY} x2="660" y2={lineY} stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
      <line x1="60" y1={lineY} x2="660" y2={lineY} stroke="url(#it-line)" strokeWidth="3" strokeLinecap="round" />

      {/* markers */}
      {xs.map((x, i) => (
        <g key={i}>
          {/* year label above */}
          <text
            x={x}
            y={lineY - 36}
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="11"
            fontWeight="600"
            fill="#64748B"
          >
            {list[i].year}
          </text>
          {/* connector line above */}
          <line x1={x} y1={lineY - 28} x2={x} y2={lineY - 14} stroke="#CBD5E1" strokeWidth="1.5" />

          {/* outer halo */}
          <circle cx={x} cy={lineY} r="14" fill="#FFFFFF" stroke={colors[i]} strokeWidth="2.5" />
          <circle cx={x} cy={lineY} r="6" fill={colors[i]} />

          {/* connector line below */}
          <line x1={x} y1={lineY + 14} x2={x} y2={lineY + 28} stroke="#CBD5E1" strokeWidth="1.5" />

          {/* label below */}
          <rect x={x - 36} y={lineY + 28} width="72" height="22" rx="11" fill={colors[i]} />
          <text
            x={x}
            y={lineY + 43}
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="11"
            fontWeight="700"
            fill="#FFFFFF"
          >
            {list[i].label}
          </text>
        </g>
      ))}

      {/* end caps */}
      <circle cx="60" cy={lineY} r="5" fill="#0EA5E9" />
      <circle cx="660" cy={lineY} r="5" fill="#059669" />
    </svg>
  );
}
