'use client';
import { motion, useReducedMotion } from 'motion/react';

type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

/**
 * Animated variant of HeroToolkit.
 *  - Central "AI" hub with breathing glow
 *  - 7 tool icons orbit around the hub on a slow ~22s rotation,
 *    counter-rotating each icon so glyphs stay upright
 *  - Tools also gently pulse opacity at staggered offsets
 */
export function HeroToolkitMotion({
  className,
  width = 480,
  height = 360,
}: Props) {
  const reduced = useReducedMotion();

  const cx = 240;
  const cy = 180;
  const radius = 120;
  const tools = 7;

  // Initial angles for each icon (radians), evenly distributed.
  const baseAngles = Array.from({ length: tools }).map(
    (_, i) => -Math.PI / 2 + (i * (2 * Math.PI)) / tools,
  );
  const initialPositions = baseAngles.map((angle) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  }));

  // Inline tool glyph — same kinds as HeroToolkit (mail, doc, target, mic, msg, megaphone, users)
  const Glyph = ({ kind }: { kind: number }) => (
    <g
      transform="translate(-14,-14)"
      // The icon will be placed at (0,0); outer wrapper handles positioning + counter-rotation.
    >
      <rect width="28" height="28" rx="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <g
        transform="translate(6,6)"
        stroke="#0369A1"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {kind === 0 && (
          <>
            <rect x="1" y="3" width="14" height="10" rx="1.5" />
            <path d="M1 4 l7 5 l7 -5" />
          </>
        )}
        {kind === 1 && (
          <>
            <path d="M3 1 h7 l3 3 v11 H3 z" />
            <path d="M5 7 h6 M5 10 h6 M5 13 h4" />
          </>
        )}
        {kind === 2 && (
          <>
            <circle cx="8" cy="8" r="6" />
            <circle cx="8" cy="8" r="3" />
            <circle cx="8" cy="8" r="1" fill="#0369A1" />
          </>
        )}
        {kind === 3 && (
          <>
            <rect x="6" y="1" width="4" height="9" rx="2" />
            <path d="M3 8 v1 a5 5 0 0 0 10 0 v-1" />
            <path d="M8 14 v2" />
          </>
        )}
        {kind === 4 && (
          <>
            <path d="M1 3 h14 v9 h-7 l-4 3 v-3 H1 z" />
            <circle cx="5" cy="8" r="0.8" fill="#0369A1" />
            <circle cx="8" cy="8" r="0.8" fill="#0369A1" />
            <circle cx="11" cy="8" r="0.8" fill="#0369A1" />
          </>
        )}
        {kind === 5 && (
          <>
            <path d="M1 6 v4 l9 4 V2 z" />
            <path d="M10 5 l3 -1 v8 l-3 -1" />
          </>
        )}
        {kind === 6 && (
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

  return (
    <svg
      role="img"
      aria-label="Animated illustration of an AI toolkit surrounded by orbiting business tools"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="htm-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="htm-center" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>

      <rect width="480" height="360" rx="20" fill="#F8FAFC" />

      {/* Breathing soft glow */}
      <motion.circle
        cx={cx}
        cy={cy}
        r="150"
        fill="url(#htm-glow)"
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
        initial={{ scale: 1, opacity: 0.9 }}
        animate={reduced ? undefined : { scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={
          reduced
            ? undefined
            : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      {/* Orbit ring */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke="#CBD5E1"
        strokeWidth="1.5"
        strokeDasharray="3 5"
      />

      {/* Center "AI" hub */}
      <rect
        x={cx - 60}
        y={cy - 60}
        width="120"
        height="120"
        rx="22"
        fill="url(#htm-center)"
        stroke="#CBD5E1"
        strokeWidth="2"
      />
      <motion.text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="700"
        fontSize="34"
        fill="#0369A1"
        letterSpacing="1"
        style={{ originX: `${cx}px`, originY: `${cy + 2}px` }}
        animate={
          reduced ? undefined : { scale: [1, 1.04, 1], opacity: [0.92, 1, 0.92] }
        }
        transition={
          reduced
            ? undefined
            : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        AI
      </motion.text>
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

      {/* Orbiting wrapper — rotates the entire ring of tools */}
      <motion.g
        style={{ transformBox: 'fill-box', originX: `${cx}px`, originY: `${cy}px` }}
        initial={{ rotate: 0 }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={
          reduced
            ? undefined
            : { duration: 22, repeat: Infinity, ease: 'linear' }
        }
      >
        {initialPositions.map((p, i) => (
          // Counter-rotate each icon so glyphs stay upright while ring spins.
          <motion.g
            key={`htm-tool-${i}`}
            transform={`translate(${p.x},${p.y})`}
            style={{ transformBox: 'fill-box', originX: '0px', originY: '0px' }}
            initial={{ rotate: 0 }}
            animate={reduced ? undefined : { rotate: -360 }}
            transition={
              reduced
                ? undefined
                : { duration: 22, repeat: Infinity, ease: 'linear' }
            }
          >
            <motion.g
              animate={
                reduced
                  ? undefined
                  : { opacity: [0.85, 1, 0.85], scale: [1, 1.06, 1] }
              }
              transition={
                reduced
                  ? undefined
                  : {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: (i / tools) * 1.5,
                    }
              }
              style={{ transformBox: 'fill-box', originX: '0px', originY: '0px' }}
            >
              <Glyph kind={i} />
            </motion.g>
          </motion.g>
        ))}
      </motion.g>
    </svg>
  );
}
