'use client';

import dynamic from 'next/dynamic';

// Feature-flagged OFF by default until a real bookings API replaces the
// hardcoded fixtures. The static "8 recent bookings" data is fake-risk
// (could be perceived as misleading social proof) — re-enable only when
// process.env.NEXT_PUBLIC_SOCIAL_PROOF === 'true' AND data is sourced from
// a verified booking feed (planned for sprint P0-23).
//
// Bundle behaviour:
//   - Flag OFF (default): this module exports a tiny stub that returns null.
//     The motion/react carousel, lucide icons, and fixture array all live
//     in `./social-proof-toast.inner` and are NEVER imported on this code
//     path, because `dynamic(() => import('...'))` is only invoked inside
//     the truthy branch of `SOCIAL_PROOF_ENABLED`. Webpack/Next's tree
//     shaker eliminates the import() call entirely when the build-time
//     constant resolves to `false`.
//   - Flag ON: the inner chunk is fetched on the client (ssr: false) after
//     first paint, keeping critical-path JS untouched.
const SOCIAL_PROOF_ENABLED = process.env.NEXT_PUBLIC_SOCIAL_PROOF === 'true';

// Conditional dynamic import: in flag-off builds, `SocialProofToastInnerLazy`
// is `null` and the import() call is dead code. In flag-on builds, Next
// emits a separate chunk for the inner component.
const SocialProofToastInnerLazy = SOCIAL_PROOF_ENABLED
  ? dynamic(
      () =>
        import('./social-proof-toast.inner').then((m) => ({
          default: m.SocialProofToastInner,
        })),
      { ssr: false, loading: () => null }
    )
  : null;

export function SocialProofToast() {
  // Feature flag gate — render nothing until verified data + flag are on.
  // The flag is a build-time constant (process.env.NEXT_PUBLIC_*) so the
  // early return is stable across renders and does not violate Rules of
  // Hooks (no hooks are called above this point).
  if (!SOCIAL_PROOF_ENABLED || !SocialProofToastInnerLazy) return null;
  return <SocialProofToastInnerLazy />;
}
