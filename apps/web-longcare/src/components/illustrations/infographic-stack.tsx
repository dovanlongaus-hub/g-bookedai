type Layer = {
  label: string;
  sub?: string;
};

type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
  layers?: Layer[];
};

const DEFAULT_LAYERS: Layer[] = [
  { label: "Infrastructure", sub: "Cloud Run / Cloud SQL" },
  { label: "Storage", sub: "Postgres / Drive" },
  { label: "AI", sub: "Gemini / OpenAI" },
  { label: "Auth", sub: "Firebase / OAuth" },
  { label: "API", sub: "Express / OpenAPI" },
  { label: "UI", sub: "Next.js 15 / Tailwind" },
];

export function InfographicStack({
  className,
  width = 360,
  height = 380,
  layers = DEFAULT_LAYERS,
}: Props) {
  // 6 layers (or however many provided), height ~50px each
  const list = layers.length === 6 ? layers : DEFAULT_LAYERS;
  const layerH = 50;
  const gap = 6;
  const startY = 40;
  const stackW = 320;
  const stackX = 20;

  // colors from slate-100 (bottom) → sky-100 → emerald-100 (top)
  const colors = ["#F1F5F9", "#E2E8F0", "#DBEAFE", "#BAE6FD", "#A7F3D0", "#86EFAC"];
  const strokes = ["#CBD5E1", "#94A3B8", "#93C5FD", "#0EA5E9", "#34D399", "#059669"];
  const textColors = ["#475569", "#334155", "#1E40AF", "#0369A1", "#065F46", "#065F46"];

  // bottom-up rendering. but visually bottom is at largest y.
  return (
    <svg
      role="img"
      aria-label="Layered technology stack from infrastructure at the base to UI at the top"
      viewBox={`0 0 360 380`}
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* title */}
      <text
        x="180"
        y="22"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#0F172A"
      >
        Stack overview
      </text>

      {list.map((layer, i) => {
        // bottom-up: index 0 (Infrastructure) at bottom
        const fromBottomIndex = i; // 0 at bottom
        const y = startY + (list.length - 1 - fromBottomIndex) * (layerH + gap);
        const c = colors[i] ?? "#F1F5F9";
        const s = strokes[i] ?? "#CBD5E1";
        const tc = textColors[i] ?? "#0F172A";
        return (
          <g key={i}>
            <rect
              x={stackX}
              y={y}
              width={stackW}
              height={layerH}
              rx="10"
              fill={c}
              stroke={s}
              strokeWidth="1.5"
            />
            {/* small left badge */}
            <rect x={stackX + 12} y={y + 13} width="24" height="24" rx="6" fill={s} />
            <text
              x={stackX + 24}
              y={y + 30}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
              fontSize="11"
              fontWeight="700"
              fill="#FFFFFF"
            >
              {i + 1}
            </text>
            <text
              x={stackX + 48}
              y={y + 24}
              fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
              fontSize="13"
              fontWeight="700"
              fill={tc}
            >
              {layer.label}
            </text>
            {layer.sub && (
              <text
                x={stackX + 48}
                y={y + 40}
                fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
                fontSize="11"
                fill="#64748B"
              >
                {layer.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
