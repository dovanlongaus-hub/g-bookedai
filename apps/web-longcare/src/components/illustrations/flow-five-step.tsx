type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
  steps?: string[];
};

const DEFAULT_STEPS = ["Discover", "Spec", "Build", "Pilot", "Production"];

export function FlowFiveStep({
  className,
  width = 800,
  height = 140,
  steps = DEFAULT_STEPS,
}: Props) {
  const labels = steps.length === 5 ? steps : DEFAULT_STEPS;
  const xs = [80, 240, 400, 560, 720];
  const y = 60;

  return (
    <svg
      role="img"
      aria-label={`Five-step delivery flow: ${labels.join(", ")}`}
      viewBox="0 0 800 140"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="f5-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#0369A1" />
        </marker>
        <linearGradient id="f5-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* connecting line behind */}
      <line x1="80" y1={y} x2="720" y2={y} stroke="url(#f5-grad)" strokeWidth="3" />

      {/* arrows between (offset so they don't sit beneath nodes) */}
      {xs.slice(0, -1).map((x, i) => (
        <line
          key={`arr-${i}`}
          x1={x + 22}
          y1={y}
          x2={xs[i + 1] - 22}
          y2={y}
          stroke="#0369A1"
          strokeWidth="2.5"
          markerEnd="url(#f5-arrow)"
        />
      ))}

      {xs.map((x, i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <circle r="20" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2.5" />
          <text
            textAnchor="middle"
            y="5"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="13"
            fontWeight="700"
            fill="#0369A1"
          >
            {i + 1}
          </text>
          <text
            textAnchor="middle"
            y="48"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="13"
            fontWeight="600"
            fill="#0F172A"
          >
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}
