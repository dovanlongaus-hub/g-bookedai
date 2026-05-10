// Animated illustration variants. All components are client components
// (`'use client'`) because they depend on `motion/react`. They respect
// `prefers-reduced-motion` and degrade to static visuals when set.

export { HeroMentorMotion } from './hero-mentor-motion';
export { HeroAgentsMotion } from './hero-agents-motion';
export { HeroToolkitMotion } from './hero-toolkit-motion';
export { FlowLineDraw } from './flow-line-draw';
export { OrbGlowMotion } from './orb-glow-motion';
export { LoadingPulse } from './loading-pulse';
export { useRespectsMotion, usePrefersReducedMotion } from './use-respects-motion';
