'use client';
import { motion, useReducedMotion } from 'motion/react';

type Node = {
  x: number;
  y: number;
  label?: string;
};

type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
  /** Defaults to "0 0 480 160". */
  viewBox?: string;
  /** Ordered list of nodes connected sequentially with arrowed lines. */
  nodes?: Node[];
  /** Total time for all lines to finish drawing, in seconds. */
  duration?: number;
  /** Accessible label for the flow. */
  ariaLabel?: string;
};

const DEFAULT_NODES: Node[] = [
  { x: 60, y: 80, label: 'Discover' },
  { x: 180, y: 80, label: 'Configure' },
  { x: 300, y: 80, label: 'Connect' },
  { x: 420, y: 80, label: 'Deploy' },
];

/**
 * Reusable flow diagram with progressive line-drawing entrance.
 * Nodes render statically; the connecting arrowed paths use
 * `pathLength` to draw in over `duration` seconds when scrolled into view.
 */
export function FlowLineDraw({
  className,
  width = 480,
  height = 160,
  viewBox = '0 0 480 160',
  nodes = DEFAULT_NODES,
  duration = 2,
  ariaLabel = 'Animated process flow',
}: Props) {
  const reduced = useReducedMotion();
  const segments: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    segments.push({
      x1: nodes[i].x + 22,
      y1: nodes[i].y,
      x2: nodes[i + 1].x - 22,
      y2: nodes[i + 1].y,
    });
  }
  const segDuration = segments.length > 0 ? duration / segments.length : duration;

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={viewBox}
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="fld-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="#0369A1" />
        </marker>
      </defs>

      {/* Connecting lines (animated draw) */}
      {segments.map((s, i) => (
        <motion.line
          key={`fld-seg-${i}`}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke="#0369A1"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd="url(#fld-arrow)"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: segDuration,
                  delay: i * segDuration,
                  ease: 'easeInOut',
                }
          }
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.g
          key={`fld-node-${i}`}
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.4, delay: i * segDuration }
          }
          style={{ originX: `${n.x}px`, originY: `${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r="20" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="2" />
          <circle cx={n.x} cy={n.y} r="6" fill="#0369A1" />
          {n.label ? (
            <text
              x={n.x}
              y={n.y + 42}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
              fontSize="12"
              fontWeight="600"
              fill="#0F172A"
            >
              {n.label}
            </text>
          ) : null}
        </motion.g>
      ))}
    </svg>
  );
}
