type Row = {
  feature: string;
  a: string | boolean;
  b: string | boolean;
};

type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
  titleA?: string;
  titleB?: string;
  rows?: Row[];
};

const DEFAULT_ROWS: Row[] = [
  { feature: "Setup time", a: "Hours", b: "Weeks" },
  { feature: "Australian compliance", a: true, b: false },
  { feature: "Tailored to SMEs", a: true, b: false },
  { feature: "Local mentor support", a: true, b: false },
  { feature: "Locked-in contract", a: false, b: true },
];

export function InfographicComparison({
  className,
  width = 480,
  height = 400,
  titleA = "longcare.au",
  titleB = "Generic AI tools",
  rows = DEFAULT_ROWS,
}: Props) {
  const list = rows.length === 5 ? rows : DEFAULT_ROWS;
  const headerY = 70;
  const startY = 110;
  const rowH = 50;
  const colAX = 220;
  const colBX = 360;
  const labelX = 30;

  const renderCell = (val: string | boolean, isA: boolean) => {
    if (typeof val === "boolean") {
      const color = val ? (isA ? "#059669" : "#0369A1") : "#94A3B8";
      return (
        <g>
          <circle cx="0" cy="0" r="14" fill={color} fillOpacity="0.15" />
          {val ? (
            <path d="M -6 0 l 4 4 l 8 -8" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          ) : (
            <path d="M -6 -6 l 12 12 M -6 6 l 12 -12" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          )}
        </g>
      );
    }
    return (
      <text
        textAnchor="middle"
        y="4"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="12"
        fontWeight="600"
        fill={isA ? "#0369A1" : "#64748B"}
      >
        {val}
      </text>
    );
  };

  return (
    <svg
      role="img"
      aria-label={`Side-by-side comparison of ${titleA} versus ${titleB}`}
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
        y="32"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="#0F172A"
      >
        How we compare
      </text>

      {/* container */}
      <rect x="20" y="46" width="440" height="338" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* header row backgrounds */}
      <rect x="170" y={headerY - 22} width="140" height="34" rx="8" fill="#0369A1" />
      <rect x="320" y={headerY - 22} width="140" height="34" rx="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />

      <text
        x={colAX}
        y={headerY}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#FFFFFF"
      >
        {titleA}
      </text>
      <text
        x={colBX}
        y={headerY}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#475569"
      >
        {titleB}
      </text>

      {/* rows */}
      {list.map((row, i) => {
        const y = startY + i * rowH;
        return (
          <g key={i}>
            {/* zebra background */}
            {i % 2 === 0 && (
              <rect x="30" y={y - 16} width="420" height={rowH - 6} rx="6" fill="#F8FAFC" />
            )}
            <text
              x={labelX + 6}
              y={y + 4}
              fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
              fontSize="12"
              fontWeight="600"
              fill="#0F172A"
            >
              {row.feature}
            </text>
            <g transform={`translate(${colAX},${y})`}>{renderCell(row.a, true)}</g>
            <g transform={`translate(${colBX},${y})`}>{renderCell(row.b, false)}</g>
          </g>
        );
      })}
    </svg>
  );
}
