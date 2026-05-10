type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroToolkit({ className, width = 480, height = 360 }: Props) {
  // 7 tool icons arranged in orbit around a central rounded square
  const cx = 240;
  const cy = 180;
  const radius = 120;
  const tools = 7;

  const toolPositions = Array.from({ length: tools }).map((_, i) => {
    const angle = (-Math.PI / 2) + (i * (2 * Math.PI)) / tools;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  // simple inline-icon renderers (24x24 viewbox content centered around given x,y)
  const Icon = ({ x, y, kind }: { x: number; y: number; kind: number }) => {
    const tx = x - 14;
    const ty = y - 14;
    return (
      <g transform={`translate(${tx},${ty})`}>
        <rect width="28" height="28" rx="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <g transform="translate(6,6)" stroke="#0369A1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {kind === 0 && (
            // mail
            <>
              <rect x="1" y="3" width="14" height="10" rx="1.5" />
              <path d="M1 4 l7 5 l7 -5" />
            </>
          )}
          {kind === 1 && (
            // doc
            <>
              <path d="M3 1 h7 l3 3 v11 H3 z" />
              <path d="M5 7 h6 M5 10 h6 M5 13 h4" />
            </>
          )}
          {kind === 2 && (
            // target
            <>
              <circle cx="8" cy="8" r="6" />
              <circle cx="8" cy="8" r="3" />
              <circle cx="8" cy="8" r="1" fill="#0369A1" />
            </>
          )}
          {kind === 3 && (
            // mic
            <>
              <rect x="6" y="1" width="4" height="9" rx="2" />
              <path d="M3 8 v1 a5 5 0 0 0 10 0 v-1" />
              <path d="M8 14 v2" />
            </>
          )}
          {kind === 4 && (
            // message
            <>
              <path d="M1 3 h14 v9 h-7 l-4 3 v-3 H1 z" />
              <circle cx="5" cy="8" r="0.8" fill="#0369A1" />
              <circle cx="8" cy="8" r="0.8" fill="#0369A1" />
              <circle cx="11" cy="8" r="0.8" fill="#0369A1" />
            </>
          )}
          {kind === 5 && (
            // megaphone
            <>
              <path d="M1 6 v4 l9 4 V2 z" />
              <path d="M10 5 l3 -1 v8 l-3 -1" />
            </>
          )}
          {kind === 6 && (
            // users
            <>
              <circle cx="6" cy="6" r="2.5" />
              <circle cx="12" cy="7" r="2" />
              <path d="M1 14 c0 -3 2 -5 5 -5 s5 2 5 5" />
              <path d="M11 14 c0 -2 1.5 -4 4 -4" />
            </>
          )}
        </g>
      </g>
    );
  };

  return (
    <svg
      role="img"
      aria-label="Illustration of an AI toolkit surrounded by orbiting business tools"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="ht-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ht-center" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>

      <rect width="480" height="360" rx="20" fill="#F8FAFC" />
      <circle cx={cx} cy={cy} r="150" fill="url(#ht-glow)" />

      {/* orbit ring */}
      <circle cx={cx} cy={cy} r={radius} stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 5" />

      {/* center square */}
      <rect x={cx - 60} y={cy - 60} width="120" height="120" rx="22" fill="url(#ht-center)" stroke="#CBD5E1" strokeWidth="2" />
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="700"
        fontSize="34"
        fill="#0369A1"
        letterSpacing="1"
      >
        AI
      </text>
      <text
        x={cx}
        y={cy + 32}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="500"
        fontSize="11"
        fill="#64748B"
      >
        Toolkit
      </text>

      {/* orbiting tools */}
      {toolPositions.map((p, i) => (
        <Icon key={`t-${i}`} x={p.x} y={p.y} kind={i} />
      ))}
    </svg>
  );
}
