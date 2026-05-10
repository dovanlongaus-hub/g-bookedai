type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

type CriterionProps = { x: number; y: number; ok: boolean; label: string };

function Criterion({ x, y, ok, label }: CriterionProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="7" fill={ok ? '#059669' : '#DC2626'} />
      {ok ? (
        <path
          d="M-3 0 L-1 3 L4 -2"
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path d="M-3 -3 L3 3 M3 -3 L-3 3" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      )}
      <text x="14" y="4" fill="#0F172A" fontSize="10" fontWeight="600">
        {label}
      </text>
    </g>
  );
}

type BranchProps = {
  x: number;
  title: string;
  accent: string;
  items: { ok: boolean; label: string }[];
};

function Branch({ x, title, accent, items }: BranchProps) {
  return (
    <g>
      <rect x={x} y="200" width="120" height="160" rx="12" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
      <rect x={x} y="200" width="120" height="32" rx="12" fill={accent} />
      <text
        x={x + 60}
        y="222"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill="#FFFFFF"
        letterSpacing="0.4"
      >
        {title}
      </text>
      {items.map((it, i) => (
        <Criterion key={i} x={x + 12} y={250 + i * 24} ok={it.ok} label={it.label} />
      ))}
    </g>
  );
}

export function ThemedDecisionTree({ className, width = 400, height = 400 }: Props) {
  return (
    <svg
      role="img"
      aria-label="AI investment decision tree"
      viewBox="0 0 400 400"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    >
      <defs>
        <radialGradient id="tdt-q" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="400" rx="20" fill="#F1F5F9" />

      {/* Decorative dots */}
      <g fill="#CBD5E1" opacity="0.5">
        <circle cx="40" cy="60" r="2" />
        <circle cx="360" cy="60" r="2" />
        <circle cx="60" cy="380" r="2" />
        <circle cx="340" cy="380" r="2" />
      </g>

      {/* Top question circle */}
      <g>
        <circle cx="200" cy="68" r="46" fill="url(#tdt-q)" stroke="#0F172A" strokeWidth="2" />
        <circle cx="186" cy="56" r="9" fill="#FFFFFF" opacity="0.35" />
        <text x="200" y="64" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFFFFF">
          Mentor /
        </text>
        <text x="200" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFFFFF">
          Course / Tool?
        </text>
      </g>

      {/* Branch lines */}
      <g stroke="#94A3B8" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4 4">
        <path d="M170 108 Q120 152 80 196" />
        <path d="M200 116 L200 196" />
        <path d="M230 108 Q280 152 320 196" />
      </g>

      <Branch
        x={20}
        title="Mentor"
        accent="#0369A1"
        items={[
          { ok: true, label: '1:1 coaching' },
          { ok: true, label: 'Custom roadmap' },
          { ok: true, label: 'Hands-on' },
          { ok: false, label: 'Higher cost' },
          { ok: false, label: 'Slow scale' },
        ]}
      />
      <Branch
        x={140}
        title="Course"
        accent="#D97706"
        items={[
          { ok: true, label: 'Self-paced' },
          { ok: true, label: 'Affordable' },
          { ok: true, label: 'Repeatable' },
          { ok: false, label: 'Generic' },
          { ok: false, label: 'Low support' },
        ]}
      />
      <Branch
        x={260}
        title="Tool"
        accent="#059669"
        items={[
          { ok: true, label: 'Instant ROI' },
          { ok: true, label: 'Scalable' },
          { ok: true, label: 'Automatable' },
          { ok: false, label: 'Setup needed' },
          { ok: false, label: 'Drift risk' },
        ]}
      />

      {/* Sparkles */}
      <g fill="#0EA5E9">
        <circle cx="48" cy="160" r="3" opacity="0.7" />
        <circle cx="352" cy="160" r="3" opacity="0.7" />
      </g>
    </svg>
  );
}
