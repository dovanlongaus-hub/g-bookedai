'use client';
import { motion, useReducedMotion } from 'motion/react';

type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

/**
 * Animated variant of HeroAgents.
 *  - Static 6×4 grid background (matches HeroAgents layout)
 *  - 4 active "node" cells gently pulse opacity + a halo ring expands
 *  - Connecting dashed lines fade in/out at staggered offsets
 */
export function HeroAgentsMotion({
  className,
  width = 480,
  height = 360,
}: Props) {
  const reduced = useReducedMotion();

  const cols = 6;
  const rows = 4;
  const cellW = 56;
  const cellH = 50;
  const gridX = 50;
  const gridY = 80;
  const gap = 8;

  const active = new Set([
    '0,0', '1,0', '3,0',
    '0,1', '2,1', '4,1', '5,1',
    '1,2', '3,2',
    '0,3', '2,3', '5,3',
  ]);
  // Cells that pulse (subset of active for subtlety)
  const pulsers = ['1,0', '4,1', '3,2', '5,3'];
  const pulseDelays: Record<string, number> = {
    '1,0': 0,
    '4,1': 0.7,
    '3,2': 1.4,
    '5,3': 2.1,
  };

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
      aria-label="Animated illustration of a grid of AI agents with active nodes connected"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ham-cell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
      </defs>

      <rect width="480" height="360" rx="20" fill="#F8FAFC" />

      {/* Title row */}
      <rect x="40" y="36" width="120" height="22" rx="11" fill="#E2E8F0" />
      <rect x="40" y="62" width="80" height="10" rx="5" fill="#CBD5E1" />

      {/* Badge top right with breathing dot */}
      <g>
        <rect x="360" y="36" width="84" height="28" rx="14" fill="#0F172A" />
        <motion.circle
          cx="376"
          cy="50"
          r="4"
          fill="#34D399"
          animate={
            reduced ? undefined : { opacity: [0.5, 1, 0.5], scale: [1, 1.25, 1] }
          }
          transition={
            reduced
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{ originX: '376px', originY: '50px' }}
        />
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

      {/* Connection lines — fade in/out at staggered intervals */}
      {lines.map((pair, i) => (
        <motion.line
          key={`line-${i}`}
          x1={pair[0].cx}
          y1={pair[0].cy}
          x2={pair[1].cx}
          y2={pair[1].cy}
          stroke="#0369A1"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ opacity: 0.15 }}
          animate={
            reduced ? { opacity: 0.35 } : { opacity: [0.15, 0.55, 0.15] }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.45,
                }
          }
        />
      ))}

      {/* Cells */}
      {cells.map((cell) => {
        const pulse = pulsers.includes(cell.key);
        const delay = pulseDelays[cell.key] ?? 0;
        return (
          <g key={cell.key}>
            <motion.rect
              x={cell.x}
              y={cell.y}
              width={cellW}
              height={cellH}
              rx="10"
              fill={cell.on ? 'url(#ham-cell)' : '#E2E8F0'}
              animate={
                pulse && !reduced ? { opacity: [0.7, 1, 0.7] } : undefined
              }
              transition={
                pulse && !reduced
                  ? {
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay,
                    }
                  : undefined
              }
            />
            {/* Halo ring on pulsers */}
            {pulse && !reduced && (
              <motion.rect
                x={cell.x}
                y={cell.y}
                width={cellW}
                height={cellH}
                rx="10"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
                style={{
                  originX: `${cell.x + cellW / 2}px`,
                  originY: `${cell.y + cellH / 2}px`,
                }}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.6, 0], scale: [1, 1.18, 1] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay,
                }}
              />
            )}
            {cell.on && (
              <circle
                cx={cell.x + cellW / 2}
                cy={cell.y + cellH / 2}
                r="6"
                fill="#FFFFFF"
              />
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
        );
      })}

      {/* Base line */}
      <line x1="40" y1="320" x2="440" y2="320" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="40" y="332" width="160" height="8" rx="4" fill="#E2E8F0" />
    </svg>
  );
}
