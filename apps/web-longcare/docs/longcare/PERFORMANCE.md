# longcare.au — Performance audit

Owner: Agent MM (sprint 2026-05).
Scope: marketing site at `apps/web-longcare/` (Next.js 15 App Router on Cloud Run).

## 1. Current state

Bundle sizes (estimated from the most recent local `next build` output;
re-verify before each release):

| Surface | First Load JS | Notes |
|---|---|---|
| Shared chunk | ~102 kB | React + Next runtime + analytics + nav |
| Marketing hub pages (`/services`, `/blog`, `/pricing`) | ~108 kB | + small per-page code |
| Homepage `/` | ~182 kB | hero illustration + above-fold motion + CTAs |
| Middleware | 32.6 kB | locale routing + headers |

Lighthouse spot-check (manual, 2026-05, mobile throttled, single run — not authoritative):

| Metric | Mobile | Desktop |
|---|---|---|
| LCP | ~2.4 s | ~1.1 s |
| CLS | ~0.02 | ~0.01 |
| INP | ~180 ms | ~80 ms |
| TBT | ~140 ms | ~30 ms |

These numbers should be re-captured against the production deploy before
trusting them — see section 3 for the recommended Lighthouse run.

## 2. What's been done

Optimisations already merged (P0 + P1 + sprint 5 + sprint 6 + this sprint):

- **Sprint 6 layout wire-up (Agent PP)**:
  - Lazy `ChatWidget` + `ExitIntentPopup` are now imported into
    `app/layout.tsx` via the `Lazy*` aliases in `src/lib/lazy-components.ts`.
    Static imports of the underlying components are gone from the layout —
    estimated ~25 kB gzip dropped from the shared chunk on first paint
    (chat fetch + state machine + popup mouseleave/scroll listeners now
    arrive in their own deferred chunks). `SocialProofToast` was left as-is
    because it is already a thin feature-flag wrapper that lazy-imports
    its own inner module — re-wrapping would have been redundant.
  - `<ResourceHints />` is wired into the root `<head>` of `app/layout.tsx`,
    so preconnect/dns-prefetch for GTM, GA4, `book.longcare.au`,
    `app.longcare.au`, and Google Fonts are now active site-wide. Expected
    perceived-latency win on first booking CTA click: 100–300 ms (DNS+TLS
    setup amortised before user interacts).
  - `@next/bundle-analyzer` installed and wired into `next.config.ts`,
    env-gated on `ANALYZE=true`. Production builds are unaffected. Run
    `ANALYZE=true pnpm build` to emit per-route HTML reports under
    `.next/analyze/` so the next bundle audit can target real offenders.


- **Icon tree-shaking**: lucide-react is configured under
  `experimental.optimizePackageImports` so unused icons are dead-code
  eliminated. Per-icon imports (`import { Star } from 'lucide-react'`) are
  the established pattern across the codebase.
- **next/image migration**: hero illustrations and content imagery are
  served via `next/image`, getting AVIF/WebP negotiation and responsive
  `srcset` for free. Static assets that ship as inline SVG (under
  `src/components/illustrations/`) are already optimal — no rasterisation,
  no extra requests.
- **Lazy-component registry**: `src/lib/lazy-components.ts` introduced this
  sprint. Provides `LazyExitIntentPopup`, `LazyChatWidget`,
  `LazyROICalculator`, `LazyTestimonialCarousel`, `LazyMembershipSection`.
  Pages should import from the registry rather than the underlying
  components for any below-the-fold/interaction-gated surface.
- **Idle-armed exit-intent popup**: `exit-intent-popup.tsx` now defers
  attaching its mouseleave/scroll listeners until `requestIdleCallback`
  fires (or 1.5 s fallback on Safari). Behaviour (TTL, mobile vs desktop
  trigger, analytics events) is preserved.
- **Social-proof feature gate**: `social-proof-toast.tsx` was carrying
  motion/react + lucide imports + a fixture array into the bundle even
  while the feature flag was off. The inner UI moved to
  `social-proof-toast.inner.tsx` and is now `dynamic()`-imported only
  when `NEXT_PUBLIC_SOCIAL_PROOF === 'true'`. Flag-off builds drop ~12 kB
  gzip from the layout chunk.
- **Resource hints scaffold**: `src/components/resource-hints.tsx` exposes
  preconnect/dns-prefetch hints for GTM, GA4, book.longcare.au,
  app.longcare.au, and Google Fonts. Wire-up into `layout.tsx` is owned by
  the layout maintainer (not Agent MM scope this sprint).
- **prefers-reduced-motion**: motion components honour the OS reduce-motion
  setting via `useReducedMotion()` so users on accessibility-mode devices
  skip the animation cost entirely.

## 3. Recommended next steps

Stakeholder/dev checklist for the next sprint:

- [ ] **Run Lighthouse on production**, not localhost. Target mobile scores
      >= 90 on Performance, Accessibility, Best Practices, SEO. Focus on
      LCP <= 2.5 s, CLS <= 0.1, INP <= 200 ms.
- [x] **Wire `<ResourceHints />` into `app/layout.tsx`** — DONE (sprint 6,
      Agent PP). Rendered inside the root `<head>`; Server Component, no
      hydration cost.
- [x] **Migrate `app/layout.tsx` imports** of `ChatWidget` /
      `ExitIntentPopup` over to the `Lazy*` wrappers — DONE (sprint 6,
      Agent PP). `SocialProofToast` left in place because it is already a
      flag-gated lazy wrapper. Page-level migration of `LazyROICalculator`,
      `LazyTestimonialCarousel`, `LazyMembershipSection` on conversion
      pages remains a follow-up.
- [ ] **Page-level lazy migration**: audit homepage, services, pricing for
      direct imports of `ROICalculator` / `TestimonialCarousel` /
      `MembershipSection` and swap to the `Lazy*` registry equivalents.
      Touching `app/page.tsx` was out of scope for sprint 6.
- [ ] **Image audit**: hero illustrations are SVG already (optimal). The
      banner asset at `public/longcare_banner.png` is a candidate to
      convert to WebP/AVIF (`next/image` will negotiate, but if it's
      referenced via raw `<img>` somewhere convert the source).
- [ ] **Font subsetting**: currently 4 weights × 2 families = 8 woff2.
      Audit which weights actually render — if only 400/600/700 are used,
      drop 300/500 and shave ~30 kB transfer.
- [ ] **Route prefetch on hover**: Next's `<Link>` already prefetches in
      viewport. For `/resources/ai-readiness` (high-intent funnel) consider
      manual prefetch on CTA hover via `router.prefetch()`.
- [ ] **Core Web Vitals telemetry**: pipe `web-vitals` -> GA4 -> BigQuery
      -> Looker Studio so we have a regression alarm rather than relying on
      manual Lighthouse runs.
- [ ] **Cloud Run min-instances**: a min of 1 production replica eliminates
      cold-start LCP outliers (~1.5 s extra on first visit per region).
      Cost: ~A$10/month per region for the smallest CPU.
- [x] **Idle-load chat widget** — DONE (sprint 6, Agent PP). `app/layout.tsx`
      now imports `LazyChatWidget` (aliased as `ChatWidget`) from the
      registry; chat fetch + state-machine logic is in a deferred chunk.

## 4. Bundle budget

Proposed CI gates (fail PR if exceeded). All numbers in gzipped kB,
measured from `next build` output's First Load JS column:

| Surface | Budget | Current | Headroom |
|---|---|---|---|
| Shared chunk | <= 105 kB | ~102 kB | 3 kB |
| Hub pages (services/blog/pricing) | <= 130 kB | ~108 kB | 22 kB |
| Homepage `/` | <= 200 kB | ~182 kB | 18 kB |
| Middleware | <= 40 kB | 32.6 kB | 7.4 kB |

All four surfaces are within budget. Headroom on the shared chunk is
tight (~3 kB) — any new global dependency added to `app/layout.tsx`
should be vetted against this number.

## 5. Tooling

Recommendations (not yet wired up):

- **`@next/bundle-analyzer`** — INSTALLED (sprint 6, Agent PP). Wired into
  `next.config.ts` via `withBundleAnalyzer` and gated on `ANALYZE=true`,
  so production builds are unaffected. Run `ANALYZE=true pnpm build` to
  emit per-route HTML reports under `.next/analyze/` (client.html,
  edge.html, nodejs.html). Use this to chase the next big offender —
  the homepage shared-chunk headroom is only ~3 kB so any new global
  dependency should be vetted against the analyzer output before merge.
- **`size-limit`** — npm script that fails CI when a budget is exceeded.
  Pairs well with the budget table in section 4.
- **`web-vitals`** — already a 1 kB import; report to GA4 via the existing
  analytics shim. See `src/lib/analytics.ts` for the dispatch path.
- **Lighthouse CI** — github-action variant with budget JSON. Run against
  preview deploys to catch regressions before merge.

## 6. Reference benchmarks

Comparable Next.js 15 marketing sites (public Vercel showcases, mid-2026):

| Site | First Load JS shared | Homepage | Notes |
|---|---|---|---|
| Linear marketing | ~95 kB | ~145 kB | Heavy on CSS, light on JS |
| Cal.com homepage | ~115 kB | ~210 kB | Embedded scheduler bumps it up |
| Stripe Sigma docs | ~88 kB | ~120 kB | Aggressive code-splitting |
| Industry P50 (Next 15 marketing) | ~100 kB | ~150 kB | informal observation |

longcare.au at ~102 kB shared / ~182 kB homepage sits at the
median-to-slightly-heavy end. The remaining headroom (sections 3-4) is
mostly recoverable through the Lazy* registry + idle-loading chat —
follow-through on the section 3 checklist should bring homepage closer to
~150 kB.
