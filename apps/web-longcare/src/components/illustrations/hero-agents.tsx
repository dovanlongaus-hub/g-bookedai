type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroAgents({ className, width = 480, height = 360 }: Props) {
  // 6 columns x 4 rows = 24 cells
  const cols = 6;
  const rows = 4;
  const cellW = 56;
  const cellH = 50;
  const gridX = 50;
  const gridY = 80;
  const gap = 8;

  // active agents (highlighted) — 12 of them
  const active = new Set([
    "0,0", "1,0", "3,0",
    "0,1", "2,1", "4,1", "5,1",
    "1,2", "3,2",
    "0,3", "2,3", "5,3",
  ]);

  const cells: Array<{ x: number; y: number; key: string; on: boolean }> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${c},${r}`;
      cells.push({
        x: gridX + c * (cellW + gap),
        y: gridY + r * (cellH + gap),
        key,
        on: active.has(key),
      });
    }
  }

  // connection lines between a few active agents (centers)
  const center = (c: number, r: number) => ({
    cx: gridX + c * (cellW + gap) + cellW / 2,
    cy: gridY + r * (cellH + gap) + cellH / 2,
  });

  const lines: Array<[{ cx: number; cy: number }, { cx: number; cy: number }]> = [
    [center(0, 0), center(1, 0)],
    [center(1, 0), center(2, 1)],
    [center(2, 1), center(3, 2)],
    [center(3, 2), center(4, 1)],
    [center(0, 1), center(0, 3)],
    [center(5, 1), center(5, 3)],
  ];

  return (
    <svg
      role="img"
      aria-label="Illustration of a grid of AI agents with active nodes connected"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ha-cell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
      </defs>

      <rect width="480" height="360" rx="20" fill="#F8FAFC" />

      {/* Title row */}
      <rect x="40" y="36" width="120" height="22" rx="11" fill="#E2E8F0" />
      <rect x="40" y="62" width="80" height="10" rx="5" fill="#CBD5E1" />

      {/* badge top right */}
      <g>
        <rect x="360" y="36" width="84" height="28" rx="14" fill="#0F172A" />
        <circle cx="376" cy="50" r="4" fill="#34D399" />
        <text
          x="386"
          y="55"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="12"
          fontWeight="600"
          fill="#FFFFFF"
        >
          12 agents
        </text>
      </g>

      {/* connection lines (drawn first, behind cells) */}
      {lines.map((pair, i) => (
        <line
          key={`line-${i}`}
          x1={pair[0].cx}
          y1={pair[0].cy}
          x2={pair[1].cx}
          y2={pair[1].cy}
          stroke="#0369A1"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      ))}

      {/* cells */}
      {cells.map((cell) => (
        <g key={cell.key}>
          <rect
            x={cell.x}
            y={cell.y}
            width={cellW}
            height={cellH}
            rx="10"
            fill={cell.on ? "url(#ha-cell)" : "#E2E8F0"}
          />
          {cell.on && (
            <circle cx={cell.x + cellW / 2} cy={cell.y + cellH / 2} r="6" fill="#FFFFFF" />
          )}
          {!cell.on && (
            <rect
              x={cell.x + 16}
              y={cell.y + 22}
              width={cellW - 32}
              height={6}
              rx="3"
              fill="#CBD5E1"
            />
          )}
        </g>
      ))}

      {/* base line */}
      <line x1="40" y1="320" x2="440" y2="320" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="40" y="332" width="160" height="8" rx="4" fill="#E2E8F0" />
    </svg>
  );
}
