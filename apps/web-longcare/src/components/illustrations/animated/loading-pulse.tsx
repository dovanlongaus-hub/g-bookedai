'use client';
import { motion, useReducedMotion } from 'motion/react';

type Props = {
  className?: string;
  /** Number of dots in the wave. Defaults to 3. */
  count?: number;
  /** Diameter of each dot in px. */
  size?: number;
  /** Dot color (CSS). */
  color?: string;
  /** Accessible label override. */
  label?: string;
};

/**
 * Lottie-esque loading skeleton — a row of dots bouncing in a wave.
 * Use as a lightweight placeholder while content is fetching.
 */
export function LoadingPulse({
  className,
  count = 3,
  size = 10,
  color = '#0EA5E9',
  label = 'Loading',
}: Props) {
  const reduced = useReducedMotion();
  const gap = Math.max(4, Math.round(size * 0.6));
  const dots = Array.from({ length: count });

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${gap}px`,
      }}
    >
      {dots.map((_, i) => {
        const delay = (i / count) * 0.6;
        const anim = reduced
          ? { opacity: 0.6 }
          : {
              y: [0, -size * 0.6, 0],
              opacity: [0.4, 1, 0.4],
            };

        return (
          <motion.span
            key={i}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: color,
            }}
            initial={{ y: 0, opacity: 0.4 }}
            animate={anim}
            transition={
              reduced
                ? undefined
                : {
                    duration: 1.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay,
                  }
            }
          />
        );
      })}
      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {label}
      </span>
    </span>
  );
}
