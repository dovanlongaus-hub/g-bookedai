type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
  title?: string;
};

export function InfographicRoiQuadrant({
  className,
  width = 480,
  height = 400,
  title = "AI ROI Quadrant for SMEs",
}: Props) {
  // grid box: x 80..440, y 80..340 — 360 wide, 260 tall
  const left = 80;
  const top = 80;
  const right = 440;
  const bottom = 340;
  const midX = (left + right) / 2; // 260
  const midY = (top + bottom) / 2; // 210

  return (
    <svg
      role="img"
      aria-label="Two-by-two quadrant chart mapping AI use cases by stakes and volume"
      viewBox="0 0 480 400"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* title */}
      <text
        x="240"
        y="36"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="#0F172A"
      >
        {title}
      </text>

      {/* y-axis label "Stakes" */}
      <text
        transform="translate(34,210) rotate(-90)"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="12"
        fontWeight="600"
        fill="#64748B"
      >
        Stakes (low → high)
      </text>

      {/* x-axis label "Volume" */}
      <text
        x="260"
        y="378"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="12"
        fontWeight="600"
        fill="#64748B"
      >
        Volume (low → high)
      </text>

      {/* quadrants */}
      {/* top-left: low volume / high stakes — slate */}
      <rect x={left} y={top} width={midX - left} height={midY - top} rx="10" fill="#E2E8F0" />
      {/* top-right: high volume / high stakes — amber */}
      <rect x={midX} y={top} width={right - midX} height={midY - top} rx="10" fill="#FED7AA" />
      {/* bottom-left: low volume / low stakes — slate light */}
      <rect x={left} y={midY} width={midX - left} height={bottom - midY} rx="10" fill="#F1F5F9" />
      {/* bottom-right: high volume / low stakes — emerald */}
      <rect x={midX} y={midY} width={right - midX} height={bottom - midY} rx="10" fill="#A7F3D0" />

      {/* gap between quadrants */}
      <line x1={midX} y1={top} x2={midX} y2={bottom} stroke="#FFFFFF" strokeWidth="4" />
      <line x1={left} y1={midY} x2={right} y2={midY} stroke="#FFFFFF" strokeWidth="4" />

      {/* labels */}
      {/* top-left */}
      <g transform={`translate(${(left + midX) / 2},${(top + midY) / 2})`}>
        <text
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#334155"
        >
          Human only
        </text>
        <text
          y="20"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="11"
          fill="#475569"
        >
          High stakes, rare
        </text>
      </g>
      {/* top-right */}
      <g transform={`translate(${(midX + right) / 2},${(top + midY) / 2})`}>
        <text
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#9A3412"
        >
          Risky
        </text>
        <text
          y="20"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="11"
          fill="#9A3412"
        >
          High stakes, frequent
        </text>
      </g>
      {/* bottom-left */}
      <g transform={`translate(${(left + midX) / 2},${(midY + bottom) / 2})`}>
        <text
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#475569"
        >
          Maybe
        </text>
        <text
          y="20"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="11"
          fill="#64748B"
        >
          Low value, low risk
        </text>
      </g>
      {/* bottom-right */}
      <g transform={`translate(${(midX + right) / 2},${(midY + bottom) / 2})`}>
        <text
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#065F46"
        >
          Quick wins
        </text>
        <text
          y="20"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="11"
          fill="#065F46"
        >
          High volume, low risk
        </text>
      </g>

      {/* axis arrows */}
      <line x1={left} y1={bottom} x2={right + 6} y2={bottom} stroke="#94A3B8" strokeWidth="1.5" />
      <line x1={left} y1={bottom} x2={left} y2={top - 6} stroke="#94A3B8" strokeWidth="1.5" />
    </svg>
  );
}
