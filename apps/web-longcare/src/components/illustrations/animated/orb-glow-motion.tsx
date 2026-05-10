'use client';
import { motion, useReducedMotion } from 'motion/react';

type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
  /** 0–1 base opacity. Pulse swings ±0.15 around it. */
  intensity?: number;
  /** Tailwind/CSS color name has no meaning here — pass any CSS color. */
  color?: string;
};

/**
 * Animated variant of OrbGlow. Soft radial-gradient orb that "breathes"
 * by pulsing opacity and scale on a slow 3s cycle. Decorative only.
 */
export function OrbGlowMotion({
  className,
  width = 240,
  height = 240,
  intensity = 0.5,
  color = '#7DD3FC',
}: Props) {
  const reduced = useReducedMotion();
  const lo = Math.max(0, intensity - 0.15);
  const hi = Math.min(1, intensity + 0.15);

  const pulse = reduced
    ? {}
    : {
        animate: { opacity: [lo, hi, lo], scale: [1, 1.04, 1] },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 240 240"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="orb-motion-grad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="60%" stopColor={color} stopOpacity="0.36" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.circle
        cx="120"
        cy="120"
        r="120"
        fill="url(#orb-motion-grad)"
        style={{ originX: '120px', originY: '120px' }}
        initial={{ opacity: intensity, scale: 1 }}
        {...pulse}
      />
    </svg>
  );
}
