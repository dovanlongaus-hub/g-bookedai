'use client';
import { motion, useReducedMotion } from 'motion/react';

type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

/**
 * Animated variant of HeroMentor.
 *  - The AI orb gently floats up/down (8px, 4s)
 *  - "AI" letters pulse subtly
 *  - The three speech-bubble dots fade in/out in sequence (typing indicator)
 *  - Background dots breathe in opacity
 *  - Connection lines draw in once on mount
 */
export function HeroMentorMotion({
  className,
  width = 480,
  height = 360,
}: Props) {
  const reduced = useReducedMotion();

  const orbAnim = reduced
    ? {}
    : {
        animate: { y: [0, -8, 0] },
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  const aiTextAnim = reduced
    ? {}
    : {
        animate: { opacity: [1, 0.65, 1], scale: [1, 1.04, 1] },
        transition: {
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  const bgPulse = reduced
    ? {}
    : {
        animate: { opacity: [0.32, 0.5, 0.32] },
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  const dotAnim = (delay: number) =>
    reduced
      ? {}
      : {
          animate: { opacity: [0.3, 1, 0.3] },
          transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut' as const,
            delay,
          },
        };

  return (
    <motion.svg
      role="img"
      aria-label="Animated illustration of an AI mentor having a conversation with a learner"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <defs>
        <radialGradient id="hmm-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="60%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
        <radialGradient id="hmm-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <pattern id="hmm-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#CBD5E1" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="480" height="360" rx="20" fill="#F8FAFC" />
      <motion.rect
        width="480"
        height="360"
        rx="20"
        fill="url(#hmm-dots)"
        initial={{ opacity: 0.4 }}
        {...bgPulse}
      />

      {/* Soft glow behind orb */}
      <motion.circle
        cx="340"
        cy="170"
        r="110"
        fill="url(#hmm-glow)"
        style={{ originX: '340px', originY: '170px' }}
        initial={{ scale: 1, opacity: 0.9 }}
        animate={
          reduced
            ? undefined
            : { scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }
        }
        transition={
          reduced
            ? undefined
            : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      {/* Person silhouette */}
      <g>
        <circle cx="140" cy="150" r="34" fill="#CBD5E1" />
        <path
          d="M82 260c0-32 26-58 58-58s58 26 58 58v14H82v-14z"
          fill="#CBD5E1"
        />
        <path
          d="M88 274c10-24 32-40 52-40s42 16 52 40H88z"
          fill="#94A3B8"
          opacity="0.35"
        />
      </g>

      {/* Speech bubble */}
      <g>
        <rect
          x="190"
          y="118"
          width="68"
          height="40"
          rx="10"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <path
          d="M198 158 L196 168 L210 158 Z"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <motion.circle cx="208" cy="138" r="3" fill="#64748B" {...dotAnim(0)} />
        <motion.circle cx="222" cy="138" r="3" fill="#64748B" {...dotAnim(0.2)} />
        <motion.circle cx="236" cy="138" r="3" fill="#64748B" {...dotAnim(0.4)} />
      </g>

      {/* Connection lines (draw in once) */}
      <motion.path
        d="M260 175 Q 295 165 320 165"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeDasharray="4 5"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={reduced ? undefined : { duration: 1.2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M260 195 Q 295 200 320 200"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeDasharray="4 5"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={reduced ? undefined : { duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
      />

      {/* Floating AI orb group */}
      <motion.g {...orbAnim}>
        <circle cx="350" cy="180" r="58" fill="url(#hmm-orb)" />
        <circle cx="335" cy="166" r="14" fill="#FFFFFF" opacity="0.35" />
        <motion.text
          x="350"
          y="190"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontWeight="700"
          fontSize="26"
          fill="#FFFFFF"
          letterSpacing="1"
          style={{ originX: '350px', originY: '182px' }}
          {...aiTextAnim}
        >
          AI
        </motion.text>
      </motion.g>

      {/* Pulsing accent dots */}
      <motion.circle
        cx="408"
        cy="138"
        r="5"
        fill="#0369A1"
        animate={reduced ? undefined : { opacity: [0.4, 1, 0.4], scale: [1, 1.25, 1] }}
        transition={reduced ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '408px', originY: '138px' }}
      />
      <motion.circle
        cx="295"
        cy="240"
        r="4"
        fill="#059669"
        animate={reduced ? undefined : { opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
        transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        style={{ originX: '295px', originY: '240px' }}
      />
      <motion.circle
        cx="425"
        cy="220"
        r="4"
        fill="#0EA5E9"
        opacity="0.7"
        animate={reduced ? undefined : { opacity: [0.4, 0.9, 0.4], scale: [1, 1.2, 1] }}
        transition={reduced ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        style={{ originX: '425px', originY: '220px' }}
      />

      {/* Base line */}
      <line x1="40" y1="296" x2="440" y2="296" stroke="#E2E8F0" strokeWidth="2" />
    </motion.svg>
  );
}
