type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroCommunity({ className, width = 480, height = 360 }: Props) {
  const cx = 240;
  const cy = 180;

  // 12 people dots distributed across rings
  const ring1 = 4;
  const ring2 = 8;
  const r1 = 70;
  const r2 = 130;

  const ring1Pts = Array.from({ length: ring1 }).map((_, i) => {
    const a = (-Math.PI / 2) + (i * 2 * Math.PI) / ring1;
    return { x: cx + r1 * Math.cos(a), y: cy + r1 * Math.sin(a) };
  });
  const ring2Pts = Array.from({ length: ring2 }).map((_, i) => {
    const a = (-Math.PI / 2) + ((i + 0.5) * 2 * Math.PI) / ring2;
    return { x: cx + r2 * Math.cos(a), y: cy + r2 * Math.sin(a) };
  });

  // connections (a few)
  const connections: Array<[{ x: number; y: number }, { x: number; y: number }]> = [
    [ring1Pts[0], ring2Pts[0]],
    [ring1Pts[1], ring2Pts[2]],
    [ring1Pts[2], ring2Pts[4]],
    [ring1Pts[3], ring2Pts[6]],
    [ring2Pts[1], ring2Pts[3]],
    [ring2Pts[5], ring2Pts[7]],
  ];

  return (
    <svg
      role="img"
      aria-label="Illustration of a learning community arranged in concentric rings around a central heart"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hc-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FECACA" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FECACA" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hc-heart" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>

      <rect width="480" height="360" rx="20" fill="#F8FAFC" />
      <circle cx={cx} cy={cy} r="160" fill="url(#hc-glow)" />

      {/* concentric rings */}
      <circle cx={cx} cy={cy} r="36" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="2 4" />
      <circle cx={cx} cy={cy} r={r1} stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 5" />
      <circle cx={cx} cy={cy} r={r2} stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 5" />

      {/* connections */}
      {connections.map((c, i) => (
        <line
          key={`c-${i}`}
          x1={c[0].x}
          y1={c[0].y}
          x2={c[1].x}
          y2={c[1].y}
          stroke="#0369A1"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
      ))}

      {/* people dots ring1 */}
      {ring1Pts.map((p, i) => (
        <g key={`r1-${i}`}>
          <circle cx={p.x} cy={p.y} r="11" fill="#0369A1" />
          <circle cx={p.x} cy={p.y - 3} r="4" fill="#FFFFFF" />
          <path d={`M ${p.x - 6} ${p.y + 6} Q ${p.x} ${p.y + 1} ${p.x + 6} ${p.y + 6}`} fill="#FFFFFF" />
        </g>
      ))}

      {/* people dots ring2 — alternating colors */}
      {ring2Pts.map((p, i) => {
        const colors = ["#059669", "#0EA5E9", "#D97706", "#7C3AED"];
        const fill = colors[i % colors.length];
        return (
          <g key={`r2-${i}`}>
            <circle cx={p.x} cy={p.y} r="9" fill={fill} />
            <circle cx={p.x} cy={p.y - 2} r="3" fill="#FFFFFF" />
            <path d={`M ${p.x - 5} ${p.y + 5} Q ${p.x} ${p.y + 1} ${p.x + 5} ${p.y + 5}`} fill="#FFFFFF" />
          </g>
        );
      })}

      {/* center heart */}
      <g transform={`translate(${cx - 16},${cy - 14})`}>
        <path
          d="M16 28
             C16 28 2 18 2 10
             C2 5 6 2 10 2
             C13 2 15 4 16 6
             C17 4 19 2 22 2
             C26 2 30 5 30 10
             C30 18 16 28 16 28 Z"
          fill="url(#hc-heart)"
        />
      </g>
    </svg>
  );
}
