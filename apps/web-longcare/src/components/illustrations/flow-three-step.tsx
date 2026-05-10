import type { ReactNode } from "react";

type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
  step1Label?: string;
  step2Label?: string;
  step3Label?: string;
  step1Icon?: ReactNode;
  step2Icon?: ReactNode;
  step3Icon?: ReactNode;
  title?: string;
};

const DefaultIcon1 = (
  <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
    <rect x="-9" y="-7" width="18" height="14" rx="2" />
    <path d="M -9 -3 h 18" />
  </g>
);
const DefaultIcon2 = (
  <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
    <path d="M0 -8 l 2 6 l 6 0 l -5 4 l 2 6 l -5 -4 l -5 4 l 2 -6 l -5 -4 l 6 0 z" />
  </g>
);
const DefaultIcon3 = (
  <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
    <path d="M -7 0 l 5 5 l 9 -9" />
  </g>
);

export function FlowThreeStep({
  className,
  width = 720,
  height = 200,
  step1Label = "Input",
  step2Label = "AI process",
  step3Label = "Output",
  step1Icon = DefaultIcon1,
  step2Icon = DefaultIcon2,
  step3Icon = DefaultIcon3,
  title,
}: Props) {
  const positions = [
    { x: 120, y: 100 },
    { x: 360, y: 100 },
    { x: 600, y: 100 },
  ];
  const labels = [step1Label, step2Label, step3Label];
  const icons = [step1Icon, step2Icon, step3Icon];

  return (
    <svg
      role="img"
      aria-label={`Three-step flow: ${labels.join(", ")}`}
      viewBox="0 0 720 200"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && (
        <text
          x="360"
          y="32"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="14"
          fontWeight="600"
          fill="#0F172A"
        >
          {title}
        </text>
      )}

      {/* arrows between */}
      <defs>
        <marker id="ft-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#0369A1" />
        </marker>
      </defs>

      <line x1="166" y1="100" x2="316" y2="100" stroke="#0369A1" strokeWidth="2.5" markerEnd="url(#ft-arrow)" />
      <line x1="406" y1="100" x2="556" y2="100" stroke="#0369A1" strokeWidth="2.5" markerEnd="url(#ft-arrow)" />

      {positions.map((p, i) => (
        <g key={i} transform={`translate(${p.x},${p.y})`}>
          {/* outer halo */}
          <circle r="40" fill="#E0F2FE" />
          {/* main */}
          <circle r="32" fill="#0369A1" />
          {/* number badge */}
          <circle cx="24" cy="-24" r="12" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2" />
          <text
            x="24"
            y="-20"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontSize="13"
            fontWeight="700"
            fill="#0369A1"
          >
            {i + 1}
          </text>
          {/* icon center */}
          {icons[i]}
          {/* label below */}
          <text
            y="68"
            textAnchor="middle"
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
