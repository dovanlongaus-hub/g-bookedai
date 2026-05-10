type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

const LABELS = ["Role", "Task", "Context", "Format", "Constraints"];

export function FlowPromptAnatomy({ className, width = 400, height = 400 }: Props) {
  const cx = 200;
  const cy = 210;
  const radius = 130;

  // 5 corners of pentagon, top-aligned
  const points = Array.from({ length: 5 }).map((_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      angle,
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // colors per corner
  const colors = ["#0369A1", "#059669", "#D97706", "#7C3AED", "#0EA5E9"];

  return (
    <svg
      role="img"
      aria-label="Pentagon diagram of the five ingredients of a reliable AI prompt: Role, Task, Context, Format, Constraints"
      viewBox="0 0 400 400"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="fp-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="400" rx="20" fill="#F8FAFC" />
      <circle cx={cx} cy={cy} r="160" fill="url(#fp-glow)" />

      {/* title */}
      <text
        x="200"
        y="34"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="#0F172A"
      >
        Anatomy of a reliable prompt
      </text>

      {/* pentagon outline */}
      <path d={pathD} stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 5" fill="#FFFFFF" fillOpacity="0.4" />

      {/* spokes */}
      {points.map((p, i) => (
        <line
          key={`spoke-${i}`}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />
      ))}

      {/* corner badges */}
      {points.map((p, i) => {
        // anchor based on angle
        const tx = p.x;
        const ty = p.y;
        return (
          <g key={`corner-${i}`}>
            <circle cx={tx} cy={ty} r="28" fill={colors[i]} />
            <circle cx={tx} cy={ty} r="28" fill="#FFFFFF" fillOpacity="0.15" />
            <text
              x={tx}
              y={ty + 5}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
              fontSize="11"
              fontWeight="700"
              fill="#FFFFFF"
            >
              {LABELS[i]}
            </text>
          </g>
        );
      })}

      {/* center hub */}
      <circle cx={cx} cy={cy} r="44" fill="#0F172A" />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#94A3B8"
      >
        Output:
      </text>
      <text
        x={cx}
        y={cy + 13}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#FFFFFF"
      >
        Reliable
      </text>
    </svg>
  );
}
