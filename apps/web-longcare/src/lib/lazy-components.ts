// Dynamic imports for components that should NOT be in the initial bundle.
//
// Use these helpers instead of static imports when a component is:
//   - below-the-fold (deferred render is invisible to the user)
//   - rarely-rendered (feature-flagged off, or interaction-gated)
//   - heavy (motion/react, recharts, complex framer animations, third-party SDK)
//
// Each entry intentionally targets the *named* export of the source component;
// `dynamic()` requires a default-exported component, so we re-shape via
// `.then(m => ({ default: m.X }))`. Keep this registry the single source of
// truth for which surfaces are code-split — it makes bundle audits trivial.
//
// SSR notes:
//   - `ssr: false` for client-only widgets (chat, popups) so we don't ship
//     their HTML in the server response and skip hydration cost.
//   - `ssr: true` for content sections we still want crawlable for SEO.
//
// File extension is `.ts` (not `.tsx`) deliberately: this module declares
// dynamic-import wrappers, never inline JSX. The reserved-space placeholder
// for the ROI calculator is built via `React.createElement` to keep the
// file JSX-free and cheaper to type-check.

import { createElement } from 'react';
import dynamic from 'next/dynamic';

/**
 * Exit-intent popup — fires on desktop mouse-leave or mobile scroll+time
 * threshold. Pure client UX, never needed for SEO/SSR.
 */
export const LazyExitIntentPopup = dynamic(
  () => import('@/components/exit-intent-popup').then((m) => ({ default: m.ExitIntentPopup })),
  { ssr: false, loading: () => null }
);

/**
 * AI chat widget — Gemini-backed assistant, only rendered after the user
 * clicks the floating button. Pulls in motion-free vanilla styles but the
 * fetch + state machine is still ~6 kB gzip not worth in initial JS.
 */
export const LazyChatWidget = dynamic(
  () => import('@/components/chat-widget').then((m) => ({ default: m.ChatWidget })),
  { ssr: false, loading: () => null }
);

/**
 * ROI calculator — interactive sliders + framer-motion. Useful below-the-fold
 * on conversion pages but never needed at first paint. Reserve vertical space
 * to prevent CLS while the chunk loads. We deliberately over-reserve a touch
 * (600px) — slight over-reservation is preferable to under, since
 * under-reservation causes layout shift when the chunk hydrates.
 */
export const LazyROICalculator = dynamic(
  () => import('@/components/roi-calculator').then((m) => ({ default: m.ROICalculator })),
  {
    ssr: false,
    loading: () =>
      createElement('div', {
        style: { minHeight: 600 },
        'aria-label': 'Loading ROI calculator',
        'aria-busy': 'true',
      }),
  }
);

/**
 * Testimonial carousel — embla-carousel-react + motion. SSR-safe (we want
 * the testimonials in the HTML for SEO snippets) but the controller JS can
 * defer until after first paint.
 */
export const LazyTestimonialCarousel = dynamic(
  () => import('@/components/TestimonialCarousel').then((m) => ({ default: m.TestimonialCarousel })),
  { ssr: true, loading: () => null }
);

/**
 * Membership / pricing comparison section — long table + motion fade-ins,
 * usually mid-to-bottom of pricing pages. Keep SSR for SEO of plan names.
 */
export const LazyMembershipSection = dynamic(
  () => import('@/components/membership-section').then((m) => ({ default: m.MembershipSection })),
  { ssr: true, loading: () => null }
);
