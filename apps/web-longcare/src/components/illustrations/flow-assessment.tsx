type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
  dimensions?: string[];
  tiers?: string[];
};

const DEFAULT_DIMENSIONS = ["Strategy", "Data", "People", "Process"];
const DEFAULT_TIERS = ["Foundations", "Operating", "Scaling"];

export function FlowAssessment({
  className,
  width = 600,
  height = 400,
  dimensions = DEFAULT_DIMENSIONS,
  tiers = DEFAULT_TIERS,
}: Props) {
  const dims = dimensions.length === 4 ? dimensions : DEFAULT_DIMENSIONS;
  const tierLabels = tiers.length === 3 ? tiers : DEFAULT_TIERS;
  const dimXs = [90, 230, 370, 510];
  const dimY = 60;
  const gaugeCx = 300;
  const gaugeCy = 200;
  const tierY = 332;
  const tierXs = [150, 300, 450];

  return (
    <svg
      role="img"
      aria-label="Assessment flow: four dimensions feeding a score gauge then mapping to tiers"
      viewBox="0 0 600 400"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="fa-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#94A3B8" />
        </marker>
        <linearGradient id="fa-gauge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* dimensions row */}
      {dimXs.map((x, i) => (
        <g key={`d-${i}`}>
          <circle cx={x} cy={dimY} r="34" fill="#E0F2FE" stroke="#0369A1" strokeWidth="2" />
          <text
            x={x}
            y={dimY + 5}
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="11"
            fontWeight="700"
            fill="#0369A1"
          >
            {dims[i]}
          </text>
          <line
            x1={x}
            y1={dimY + 36}
            x2={gaugeCx}
            y2={gaugeCy - 60}
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            markerEnd="url(#fa-arrow)"
          />
        </g>
      ))}

      {/* score gauge — half circle */}
      <g>
        <path
          d={`M ${gaugeCx - 80} ${gaugeCy} A 80 80 0 0 1 ${gaugeCx + 80} ${gaugeCy}`}
          stroke="url(#fa-gauge)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        {/* needle */}
        <line
          x1={gaugeCx}
          y1={gaugeCy}
          x2={gaugeCx + 50}
          y2={gaugeCy - 50}
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={gaugeCx} cy={gaugeCy} r="6" fill="#0F172A" />
        <text
          x={gaugeCx}
          y={gaugeCy + 30}
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="13"
          fontWeight="700"
          fill="#0F172A"
        >
          Maturity Score
        </text>
      </g>

      {/* arrow from gauge to tiers */}
      <line
        x1={gaugeCx}
        y1={gaugeCy + 44}
        x2={gaugeCx}
        y2={tierY - 36}
        stroke="#94A3B8"
        strokeWidth="2"
        strokeDasharray="3 4"
        markerEnd="url(#fa-arrow)"
      />

      {/* tier badges */}
      {tierXs.map((x, i) => {
        const tierColors = ["#94A3B8", "#0369A1", "#059669"];
        const fill = tierColors[i];
        return (
          <g key={`t-${i}`}>
            <line
              x1={gaugeCx}
              y1={tierY - 28}
              x2={x}
              y2={tierY - 14}
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            <rect x={x - 60} y={tierY - 14} width="120" height="36" rx="18" fill={fill} />
            <text
              x={x}
              y={tierY + 9}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
              fontSize="13"
              fontWeight="700"
              fill="#FFFFFF"
            >
              {tierLabels[i]}
            </text>
          </g>
        );
      })}

      {/* base label */}
      <text
        x="300"
        y="384"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="11"
        fontWeight="500"
        fill="#64748B"
      >
        Recommendations tailored to your tier
      </text>
    </svg>
  );
}
