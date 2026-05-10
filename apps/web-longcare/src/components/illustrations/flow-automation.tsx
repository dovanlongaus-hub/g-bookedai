type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
  steps?: string[];
};

const DEFAULT_STEPS = ["Trigger", "AI step", "Action", "Review", "Final"];

export function FlowAutomation({
  className,
  width = 800,
  height = 140,
  steps = DEFAULT_STEPS,
}: Props) {
  const labels = steps.length === 5 ? steps : DEFAULT_STEPS;
  const xs = [80, 240, 400, 560, 720];
  const y = 56;

  // icon renderer per step
  const renderIcon = (i: number) => {
    return (
      <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {i === 0 && (
          // bell trigger
          <>
            <path d="M -8 0 v -4 a 8 8 0 0 1 16 0 v 4 l 3 4 h -22 z" />
            <path d="M -2 8 h 4" />
          </>
        )}
        {i === 1 && (
          // sparkles
          <>
            <path d="M 0 -8 l 2 5 l 5 2 l -5 2 l -2 5 l -2 -5 l -5 -2 l 5 -2 z" />
            <path d="M 7 6 l 1 2 l 2 1 l -2 1 l -1 2 l -1 -2 l -2 -1 l 2 -1 z" />
          </>
        )}
        {i === 2 && (
          // gear
          <>
            <circle r="5" />
            <path d="M 0 -10 v 3 M 0 10 v -3 M -10 0 h 3 M 10 0 h -3 M -7 -7 l 2 2 M 7 7 l -2 -2 M -7 7 l 2 -2 M 7 -7 l -2 2" />
          </>
        )}
        {i === 3 && (
          // eye review
          <>
            <path d="M -10 0 q 10 -8 20 0 q -10 8 -20 0 z" />
            <circle r="3" fill="#FFFFFF" stroke="none" />
          </>
        )}
        {i === 4 && (
          // check final
          <>
            <circle r="9" />
            <path d="M -4 0 l 3 3 l 6 -6" />
          </>
        )}
      </g>
    );
  };

  // colors per step
  const colors = ["#D97706", "#0369A1", "#7C3AED", "#0EA5E9", "#059669"];

  return (
    <svg
      role="img"
      aria-label={`Automation flow with steps: ${labels.join(", ")}`}
      viewBox="0 0 800 140"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="fau-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#94A3B8" />
        </marker>
      </defs>

      {/* arrows behind */}
      {xs.slice(0, -1).map((x, i) => (
        <line
          key={`a-${i}`}
          x1={x + 24}
          y1={y}
          x2={xs[i + 1] - 24}
          y2={y}
          stroke="#94A3B8"
          strokeWidth="2"
          markerEnd="url(#fau-arrow)"
        />
      ))}

      {xs.map((x, i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <circle r="22" fill={colors[i]} />
          {renderIcon(i)}
          {/* number small */}
          <circle cx="18" cy="-18" r="9" fill="#FFFFFF" stroke={colors[i]} strokeWidth="1.5" />
          <text
            x="18"
            y="-15"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="10"
            fontWeight="700"
            fill={colors[i]}
          >
            {i + 1}
          </text>
          {/* label */}
          <text
            y="48"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="12"
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
