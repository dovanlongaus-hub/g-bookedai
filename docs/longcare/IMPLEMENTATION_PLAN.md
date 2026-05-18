# LongCare.au — Implementation Plan

Version: 1.1
Date: 2026-05-12
Owner: dovanlongaus-hub
Source documents: `docs/longcare/VISION.md`, `docs/longcare/IA_BLUEPRINT.md`
Repo path: `apps/web-longcare/`

---

## 0. How to read this document

This plan converts the LongCare.au vision (5-pillar AI enablement ecosystem) into an executable engineering roadmap, layered on top of the current website (Next.js 15, 18 pages, deployed at longcare.au).

It is organised in 5 phases (P0 → P4). **P0 is mandatory** — it unblocks deploy and removes the security/SEO debt found in the audit. **P1–P4** map 1:1 to the four "AI Features Roadmap" phases in the vision (Foundation → Automation → Agents → Ecosystem).

Every phase ships in **2-week sprints** with clear acceptance criteria and a hard "definition of done" checklist. Nothing in a later phase blocks an earlier phase from shipping value.

---

## 1. Executive Summary

| Phase | Theme | Duration | Key Deliverables | Status |
|---|---|---|---|---|
| **P0** | Stabilisation | 2 weeks | Build unblocked, API hardened, SEO fixed, IA cleaned up | ✅ Complete |
| **Phase R** | Revenue & Conversion Recovery | 2 weeks | Booking deep links, lead reliability, HTML-first homepage, sprint offer pages, attribution | 🔴 Must start next |
| **Phase E** | Extraction & Independent Deploy | 1 week | Standalone repo, Docker pipeline, k8s/Cloud Run, independent CI/CD | 🟢 Tooling ready, pending first deploy |
| **P1** | Foundation | 6 weeks | AI Mentor MVP, Learning Portal, AI Readiness Assessment, Onboarding | ⚪ Planned |
| **P2** | Automation Platform | 8 weeks | Workflow builder, SME AI Toolkit (7 tools), Industry templates | ⚪ Planned |
| **P3** | AI Agent Marketplace | 10 weeks | Agent marketplace, deployable AI employees, analytics dashboard | ⚪ Planned |
| **P4** | AI Ecosystem | 8 weeks | API ecosystem, partner marketplace, enterprise governance, APAC | ⚪ Planned |

**Total runway:** ~34 weeks (≈ 8 months) for the full vision.

**Commercial priority update (2026-05-12):** first revenue should not wait until the end of P1. Phase R moves the fastest monetisable path to the front of the roadmap: repair the booking funnel, stop false-positive lead capture, make the homepage sell three simple offers, and launch a fixed-scope AI Automation Sprint for SMEs.

### 1.1 Revenue priorities

| Priority | Offer | Target buyer | Price | Conversion path | Goal |
|---|---|---|---:|---|---|
| R1 | AI Automation Sprint | SME owner/operator with one painful workflow | A$1,500-A$3,000 | Money page → booking deep link → discovery/scope call | Fastest cash |
| R2 | 5-Session SME Workflow Pack | SME operator who wants guided implementation | A$450 | Homepage/service card → booking deep link | Mid-ticket volume |
| R3 | AI Starter Session | Individual, solo operator, beginner | A$29 | Homepage/service card → booking deep link | Low-friction trust |
| R4 | Workshops / partner referrals | Accountants, Xero advisors, chambers, community groups | A$499+ | Partner page → referral form → invoice | Distribution |

### 1.2 Current conversion blockers from 2026-05-12 audit

| # | Blocker | Business impact | Priority | File(s) |
|---|---|---|---|---|
| R-B1 | Booking links pass `?service=...`, but `booking-web` does not preselect the service | Paid users must reselect service; high drop-off | P0 / Critical | `apps/booking-web/src/app/page.tsx`, `apps/web-longcare/src/app/page.tsx` |
| R-B2 | Lead APIs can return success even when upstream `/leads` fails | Lost leads with false success messages | P0 / Critical | `src/app/api/newsletter/route.ts`, `src/app/api/guide-lead/route.ts`, `src/app/api/quiz-lead/route.ts`, `src/app/api/referral/route.ts` |
| R-B3 | Homepage top fold is image-map driven; visible H1/CTA are inside an image | Weak SEO, weak accessibility, fragile mobile clicks | P0 / Critical | `src/app/page.tsx` |
| R-B4 | Booking Terms/Privacy checkbox is not enforced | Compliance and chargeback risk | P0 / Critical | `apps/booking-web/src/app/page.tsx` |
| R-B5 | Booking availability claims "Calendar synced" while slots are pseudo-random/local | Trust risk, double-booking expectation | P1 / High | `apps/booking-web/src/components/availability-calendar.tsx` |
| R-B6 | `booking_start` and `cta_click` analytics events exist but are rarely fired | Cannot measure revenue funnel | P1 / High | `src/lib/analytics.ts`, all booking anchors |
| R-B7 | Trust claims lack provenance (`150+`, `4.9/5`, `$2.4M`, scarcity claims) | Credibility/compliance risk | P1 / High | `src/app/page.tsx`, `src/components/floating-cta-bar.tsx`, `src/components/site-footer.tsx` |
| R-B8 | Brand intent can be confused with aged care/NDIS because of "LongCare" and "Long Term Care" wording | Wrong SEO traffic and confused buyers | P1 / High | `src/app/layout.tsx`, `src/app/page.tsx`, footer/content |

---

## 2. Current State Snapshot (audit findings — 2026-05-09)

### 2.1 Site map (current)

```
/                       homepage (large, mixed marketing + product)
/about                  thin (40 lines)
/mentors                team page (1 mentor + "coming soon" placeholder)
/services               hub
  /ai-starter           $29 session
  /ai-mentor            $99 session
  /packages             5-pack/10-pack
/pricing                ⚠️ duplicates /services
/get-started            ⚠️ duplicates /services
/discovery              free 30-min assessment (long form)
/quiz                   AI readiness quiz (no metadata export)
/guide                  free PDF lead magnet
/courses                static course list
/blog + /blog/[slug]    static array, no CMS
/testimonials           reviews
/how-it-works           process page
/referral               referral form
/faq                    FAQ
/contact                contact form
/search                 site search
/privacy + /terms       legal
/api/{chat,newsletter,review,referral,guide-lead,quiz-lead,og}  6 endpoints
```

### 2.2 Critical issues (must fix in P0)

| # | Issue | Severity | File |
|---|---|---|---|
| 1 | `motion/react` imported but not in `package.json` → build fails | 🔴 Blocker | `src/app/page.tsx:4` |
| 2 | Twitter OG image `/og-image.png` missing in `/public` | 🔴 High | `src/app/layout.tsx:60` |
| 3 | `/api/chat`, `/newsletter`, `/quiz-lead`, etc. — no rate limit, no Zod validation | 🔴 High | `src/app/api/*/route.ts` |
| 4 | API_URL fallback `http://localhost:8090` silent fail in prod | 🔴 High | `src/app/api/chat/route.ts:3` |
| 5 | `/quiz` missing `export const metadata` — Google won't index | 🟠 Medium | `src/app/quiz/page.tsx:150` |
| 6 | Two Hero implementations (page-inline + unused `HeroSection.tsx`) | 🟠 Medium | `src/components/HeroSection.tsx` |
| 7 | `theme-toggle.tsx` reads localStorage without `typeof window` → hydration mismatch | 🟠 Medium | `src/components/theme-toggle.tsx:9-13` |
| 8 | `ceo@longcare.au` hardcoded in public schema → spam target | 🟠 Medium | `src/components/schema-markup.tsx:9` |
| 9 | Canonical / OpenGraph / Schema.org missing on `/about`, `/testimonials`, `/blog/*` | 🟠 Medium | multiple |
| 10 | `/pricing` and `/get-started` duplicate `/services` content | 🟠 Medium | IA |
| 11 | Forms (discovery, guide, referral) lack ARIA + real-time validation | 🟡 Low | multiple |
| 12 | Social proof toast hardcodes 8 fake bookings | 🟡 Low | `src/components/social-proof-toast.tsx` |
| 13 | Two sticky CTA bars conflict at `md` breakpoint | 🟡 Low | `floating-cta-bar.tsx` |
| 14 | `Dockerfile` uses `--shamefully-hoist` (non-deterministic) | 🟡 Low | `Dockerfile:14` |

### 2.3 What works well (preserve in refactor)
- Next.js 15 App Router + RSC, font tree-shaking (`Inter`, `Poppins` with `display: swap`)
- LocalBusinessSchema + sitemap + robots.ts already in place
- Skip-to-main-content link, semantic HTML, `prefers-reduced-motion` respected
- Good cross-linking inside `/services/*` family
- Existing Stripe/booking integration via `book.longcare.au`

---

## 3. Target State (vision)

The vision document defines **five product pillars**:

1. **AI Learning & Mentorship** (8 learning paths, certifications, practice lab)
2. **SME AI Transformation** (readiness assessment, 7 toolkit apps, workflow automation, industry templates)
3. **AI Agent Marketplace** (12 agents across business ops + industries)
4. **AI Governance & Compliance** (policy templates, RBAC, audit, privacy)
5. **AI Community** (events, workshops, bootcamps, partner programs)

Plus the **Google Cloud-native stack**: Firebase Auth, Firestore, Vertex AI, Gemini API, Vertex AI Search, Cloud Storage, Cloud Run, BigQuery, Pub/Sub, Cloud Logging, Secret Manager.

### 3.1 Target site map (after P4)

```
/                                Hero + 5-pillar overview + AI Readiness CTA
/academy                         hub
  /academy/beginner-ai
  /academy/ai-for-business
  /academy/ai-productivity
  /academy/prompt-engineering
  /academy/ai-automation
  /academy/certifications
  /academy/practice-lab          interactive sandbox
/solutions                       industry hub
  /solutions/healthcare
  /solutions/retail
  /solutions/hospitality
  /solutions/real-estate
  /solutions/trades
  /solutions/education
  /solutions/professional-services
/agents                          AI Agent Marketplace
  /agents/business               (Admin, HR, Sales, Marketing, Scheduling, Support)
  /agents/industry               (Healthcare, Property, Retail, Hospitality, Recruiting, Edu)
  /agents/[slug]                 individual agent detail + deploy CTA
  /agents/automation-packages
/toolkit                         SME AI Toolkit
  /toolkit/email-assistant
  /toolkit/document-generator
  /toolkit/proposal-writer
  /toolkit/meeting-assistant
  /toolkit/customer-support
  /toolkit/social-media
  /toolkit/hr-assistant
/governance                      AI Governance suite
  /governance/policies
  /governance/risk-assessment
  /governance/responsible-ai
/resources                       hub
  /resources/blog
  /resources/guides
  /resources/templates
  /resources/case-studies
  /resources/ai-readiness        (assessment tool)
  /resources/roi-calculator
/community                       hub
  /community/events
  /community/workshops
  /community/bootcamps
  /community/partners
  /community/network
/about                           merged with /mentors → team + mission
/contact, /faq, /privacy, /terms support pages

# auth-gated app at app.longcare.au (separate workspace `apps/user-app`)
/dashboard, /learning, /toolkit, /agents, /billing
```

---

## 4. Gap Analysis (current → target)

| Vision pillar | What exists today | What's missing | Phase |
|---|---|---|---|
| AI Learning | `/courses` static list, `/quiz`, `/guide` | 8 learning paths, lesson progression, certifications, practice lab | P1 |
| AI Mentorship | $99 session booking via `book.longcare.au` | Async AI mentor (Gemini-powered chat with memory), role-based recommendations | P1 |
| AI Readiness Assessment | `/discovery` (manual lead capture), `/quiz` (5-step quiz) | Maturity score → ROI → roadmap → BigQuery analytics | P1 |
| SME AI Toolkit | None | 7 web apps (email, doc, proposal, meeting, support, social, HR) | P2 |
| Workflow Automation | None | Visual builder + Pub/Sub + Cloud Tasks | P2 |
| Industry Templates | None | 7 industry verticals × pre-built workflows | P2 |
| Agent Marketplace | None | 12 agents + deployment service + analytics | P3 |
| Governance | None | Policy templates, audit log, RBAC, privacy framework | P4 |
| Community | None | Events page, workshop registration, partner directory | P4 |
| Auth | OpenAI OAuth + JWT (in `services/api`) | Firebase Auth migration | P1 |
| Storage | PostgreSQL via `packages/db` | Firestore for real-time, BigQuery for analytics | P2 |
| AI runtime | Gemini via `services/agent` | Vertex AI for production workloads, Vertex AI Search for RAG | P2 |

---

## 5. Phase 0 — Stabilisation (2 weeks)

**Goal:** Fix build blockers, harden APIs, clean up IA. **Must complete before any new feature work.**

### 5.1 Sprint 0.1 (Week 1) — Unblock + secure

**Sprint goal:** Site builds, deploys, and is safe to take traffic.

Tasks:

| # | Task | File(s) | Effort | Owner |
|---|---|---|---|---|
| P0-1 | Add `motion` (renamed from `framer-motion` v11+) to deps; verify all `motion/react` imports resolve | `package.json` | S | FE |
| P0-2 | Generate static OG fallback `/public/og-image.png` (1200×630, brand-consistent); verify `/api/og` route works | `public/og-image.png`, `src/app/api/og/route.tsx` | S | FE |
| P0-3 | Delete unused `HeroSection.tsx`; consolidate to inline `Hero()` in `page.tsx` | `src/components/HeroSection.tsx`, `src/app/page.tsx` | S | FE |
| P0-4 | Add `export const metadata` to `/quiz`, `/get-started`, `/discovery` (full title/desc/canonical/OG) | `src/app/{quiz,get-started,discovery}/page.tsx` | S | FE |
| P0-5 | Wrap `theme-toggle.tsx` localStorage read in `useEffect` + add `suppressHydrationWarning` to `<html>` | `src/components/theme-toggle.tsx`, `src/app/layout.tsx` | S | FE |
| P0-6 | Move `ceo@longcare.au` to `process.env.NEXT_PUBLIC_CONTACT_EMAIL`; obfuscate in schema markup | `src/components/schema-markup.tsx`, `.env.example` | S | FE |
| P0-7 | Add Zod schemas + 10 req/min/IP rate limit (`@upstash/ratelimit` + Vercel KV or Cloud Memorystore) on all 6 API routes | `src/app/api/*/route.ts`, `src/lib/rate-limit.ts` (new) | M | BE |
| P0-8 | Remove `localhost:8090` fallback; throw at boot if `API_URL` env missing; document in `.env.example` | `src/app/api/chat/route.ts`, `src/app/api/newsletter/route.ts` | S | BE |
| P0-9 | Add CORS allow-list (`longcare.au`, `book.longcare.au`, `app.longcare.au`) to API routes | `src/middleware.ts` (new) | S | BE |
| P0-10 | XSS sanitise `/api/og` query params (escape HTML in `title`, `subtitle`) | `src/app/api/og/route.tsx` | S | BE |

**Definition of done:**
- `pnpm build` exits 0
- All API routes return 429 after 11 rapid calls from same IP
- Lighthouse SEO score ≥ 95 on `/`, `/services`, `/quiz`
- No console errors in prod build
- Twitter card validator passes for `/`, `/services/ai-mentor`

### 5.2 Sprint 0.2 (Week 2) — IA cleanup + SEO polish

| # | Task | File(s) | Effort | Owner |
|---|---|---|---|---|
| P0-11 | 301 redirect `/pricing` → `/services` (next.config.ts `redirects()`); delete `pricing/page.tsx` | `next.config.ts`, `src/app/pricing/` | S | FE |
| P0-12 | 301 redirect `/get-started` → `/services` (or merge into `/services` hub) | `next.config.ts`, `src/app/get-started/` | S | FE |
| P0-13 | Merge `/mentors` into `/about` (single `/about` page with team section); 301 `/mentors` → `/about#team` | `src/app/about/page.tsx`, `next.config.ts` | M | FE |
| P0-14 | Add canonical, OpenGraph (image, type, locale `en_AU`), Twitter card to every page (use shared `getPageMetadata()` helper) | `src/lib/metadata.ts` (new), all `page.tsx` | M | FE |
| P0-15 | Render `FAQSchema` in `layout.tsx` (already defined in `schema-markup.tsx` but unused) | `src/app/layout.tsx`, `src/components/schema-markup.tsx` | S | FE |
| P0-16 | Add `Organization` schema (founder, sameAs, areaServed, contactPoint) to `/about` | `src/app/about/page.tsx` | S | FE |
| P0-17 | Add `AggregateRating` + `Review` schema to `/testimonials` | `src/app/testimonials/page.tsx` | S | FE |
| P0-18 | Add `Article` schema + `BlogPosting` to `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | S | FE |
| P0-19 | Replace `<img>` with `next/image` (logo, hero illustrations, testimonial avatars); add blur placeholders | `nav.tsx`, `page.tsx`, `TestimonialCarousel.tsx` | M | FE |
| P0-20 | Tree-shake unused lucide-react icons (audit imports vs usage); enable `optimizePackageImports: ['lucide-react']` in `next.config.ts` | `next.config.ts`, `src/app/page.tsx` | S | FE |
| P0-21 | Fix dual sticky CTA conflict at `md` breakpoint (single CTA bar with responsive content) | `src/components/floating-cta-bar.tsx` | S | FE |
| P0-22 | Convert exit-intent popup `sessionStorage` → `localStorage` with 7-day TTL | `src/components/exit-intent-popup.tsx` | S | FE |
| P0-23 | Replace hardcoded social proof toast data with API endpoint (or feature-flag off until real data) | `src/components/social-proof-toast.tsx`, `src/app/api/recent-bookings/route.ts` (new) | M | FE+BE |
| P0-24 | Pin `Dockerfile` to `pnpm install --frozen-lockfile` (drop `--shamefully-hoist`) | `Dockerfile` | S | DevOps |
| P0-25 | Add ARIA: `role="radio"`+`aria-checked` to quiz options, `aria-expanded` to FAQ details, `aria-required`/`aria-invalid` to all forms | quiz, faq, discovery, guide, referral | M | FE |
| P0-26 | Add `role="alert" aria-live="polite"` regions for form submission errors | discovery, guide, referral, newsletter | S | FE |

**Definition of done:**
- `pnpm build` produces 0 lint errors, 0 TS errors
- Sitemap reflects new IA (no `/pricing`, no `/get-started`, no `/mentors`)
- All pages have unique `<title>`, `<meta description>`, `og:image`, `<link rel=canonical>`
- axe-core scan returns 0 critical issues on `/`, `/services`, `/quiz`, `/discovery`
- Lighthouse Performance ≥ 90 mobile on `/`

**Phase 0 success metrics:**
- Build success rate: 100%
- API error rate (prod): < 0.5%
- Lighthouse SEO ≥ 95, Performance ≥ 90, Accessibility ≥ 95
- 0 critical Sentry errors in 7-day window
- 0 P1 security findings (rate limit + validation in place)

---

## 5.3 Phase R — Revenue & Conversion Recovery (2 weeks)

**Goal:** Convert current traffic into paid bookings and qualified SME leads before building deeper platform features.

**Principle:** sell the smallest valuable outcome first. The long-term ecosystem remains the vision, but the next 14 days focus on three monetisable offers:

1. **AI Starter Session** — A$29, 30 minutes, beginner-friendly.
2. **5-Session SME Workflow Pack** — A$450, guided path to ship one workflow.
3. **AI Automation Sprint** — A$1,500-A$3,000 fixed-scope SME implementation.

### 5.3.1 Priority scale

| Priority | Meaning | SLA |
|---|---|---|
| P0 / Critical | Blocks revenue, creates false success, or creates compliance risk | Fix before campaign traffic |
| P1 / High | Increases conversion, attribution, trust, or SEO quality | Fix within Phase R |
| P2 / Medium | Improves scale or operational quality | Schedule after first sales loop |
| P3 / Low | Nice-to-have polish | Defer unless bundled with nearby work |

### 5.3.2 Sprint R.1 (Days 1-5) — Stop revenue leakage

| # | Priority | Task | Detail | File(s) | Effort | Owner | Acceptance criteria |
|---|---|---|---|---|---|---|---|
| R1-1 | P0 | Booking deep link preselect | Read `service`, `ref`, `utm_*`, `source_page` from query params in `booking-web`; preselect matching service and move user to schedule step when valid | `apps/booking-web/src/app/page.tsx` | M | FE | `https://book.longcare.au?service=ai-starter` opens with AI Starter selected; invalid service falls back gracefully |
| R1-2 | P0 | Canonical service slug map | Define one source of truth for booking slugs: `ai-starter`, `mentor-1h`, `package-5`, `package-10`, `automation-sprint`, `discovery` | `apps/booking-web`, `apps/web-longcare/src/data/sku-catalog.ts` | S | FE | All CTA URLs use supported slugs; no orphan booking service ids |
| R1-3 | P0 | Enforce Terms/Privacy | Include `agreedTerms` in contact/payment validation; disable confirm/payment action until accepted; show inline error | `apps/booking-web/src/app/page.tsx` | S | FE | User cannot proceed to payment/confirmation without ticking Terms/Privacy |
| R1-4 | P0 | Lead API success semantics | Check upstream `res.ok`; use timeout; log status/body excerpt without PII; return 502/503 when lead is not durably accepted | `src/app/api/newsletter/route.ts`, `src/app/api/guide-lead/route.ts`, `src/app/api/quiz-lead/route.ts`, `src/app/api/referral/route.ts` | M | BE | Frontend never shows success when upstream rejects/fails |
| R1-5 | P0 | Client lead form error handling | Only track conversion after confirmed `res.ok`; show retryable error; keep form data on failure | `src/components/newsletter-form.tsx`, `src/app/resources/ai-readiness/assessment-client.tsx`, `src/components/review-section.tsx`, `src/app/community/newsletter-client.tsx` | M | FE | Failed lead endpoint displays clear error and no conversion event fires |
| R1-6 | P1 | Booking attribution wrapper | Add `BookingLink` component or `/book` redirect route that appends `source_page`, `section`, `service`, `utm_*` and fires `booking_start` | `src/components`, `src/lib/analytics.ts` | M | FE | All primary booking CTAs emit `booking_start` and preserve attribution |
| R1-7 | P1 | Fix misleading availability copy | Replace "Calendar synced" with "Indicative availability; final confirmation by email" until real calendar sync exists | `apps/booking-web/src/components/availability-calendar.tsx` | S | FE | No UI claims live sync unless a real calendar API backs it |

**Sprint R.1 definition of done:**
- Paid CTA from homepage/service page can land directly on the right booking service.
- Failed upstream lead submission cannot produce a false success state.
- Booking cannot complete without Terms/Privacy acceptance.
- GA4/GTM can distinguish `booking_start` by `service` and `source_page`.

### 5.3.3 Sprint R.2 (Days 6-10) — Make the site sell clearly

| # | Priority | Task | Detail | File(s) | Effort | Owner | Acceptance criteria |
|---|---|---|---|---|---|---|---|
| R2-1 | P0 | HTML-first homepage top fold | Replace image-map-first hero with visible H1, subcopy, two CTAs, and real service cards; keep banner as supporting visual only | `src/app/page.tsx` | L | FE/Design | H1/CTA are visible HTML; keyboard users can reach all CTAs; mobile tap targets are normal buttons/cards |
| R2-2 | P0 | Three-offer homepage section | Add cards for AI Starter, 5-Session Pack, AI Automation Sprint with price, outcome, timeline, and CTA | `src/app/page.tsx`, `src/data/sku-catalog.ts` | M | FE/GTM | A first-time visitor can understand the three buying options in under 10 seconds |
| R2-3 | P1 | AI Automation Sprint money page | Create dedicated page for fixed-scope SME automation: pains, deliverables, examples, process, price range, FAQ, CTA | `src/app/services/automation-sprint/page.tsx` or `src/app/ai-automation-sprint/page.tsx` | L | FE/Content | Page has unique metadata, Service schema, FAQ, and booking CTA with `service=automation-sprint` |
| R2-4 | P1 | Services page repair | Include Starter, Mentor, Packages, Automation Sprint, Discovery; fix `/services/ai-agentic` non-existent schema URL | `src/app/services/page.tsx` | M | FE/SEO | No schema points to missing routes; all cards have learn-more and book CTAs |
| R2-5 | P1 | Trust claim audit | Remove, soften, or source claims: `150+`, `4.9/5`, `$2.4M`, scarcity slots, "APP compliant", "WCAG 2.2 AA" | `src/app/page.tsx`, `src/components/floating-cta-bar.tsx`, `src/components/site-footer.tsx`, `src/components/schema-markup.tsx` | M | Content/Legal | Every numeric/compliance claim has a source link or is rewritten as non-claim copy |
| R2-6 | P1 | CTA copy consistency | Standardise entry offer naming: "Free 20-min AI Fit Call" OR "AI Readiness Assessment"; remove conflicting 20/30/free assessment labels | Global copy | M | Content | Primary CTA copy is consistent across homepage, nav, sticky CTA, services, FAQ |
| R2-7 | P1 | Schema scope cleanup | Render global `WebSite`/`Organization`; render FAQ/Service/Article schema only on matching pages | `src/app/layout.tsx`, `src/components/schema-markup.tsx`, page files | M | SEO/FE | Structured data represents visible page content |

**Sprint R.2 definition of done:**
- Homepage top fold works without relying on image text or invisible hotspots.
- Automation Sprint has a dedicated conversion page.
- Trust claims are defensible.
- Service discovery leads to a clear offer and a measurable booking action.

### 5.3.4 Sprint R.3 (Days 11-14) — Launch first sales loop

| # | Priority | Task | Detail | File(s) | Effort | Owner | Acceptance criteria |
|---|---|---|---|---|---|---|---|
| R3-1 | P1 | LinkedIn launch pack | Prepare 30 short posts: one SME workflow/use case per day, CTA to Automation Sprint or Readiness Assessment | `docs/longcare/gtm/` | M | Founder/Content | 30 post drafts ready; first 7 scheduled |
| R3-2 | P1 | Partner referral page | Create page for accountants, Xero advisors, chambers, community groups; define commission/referral benefit if applicable | `src/app/partners` or `src/app/community/partners` | M | FE/GTM | Partner can submit referral and understand offer in one page |
| R3-3 | P1 | Case study/proof blocks | Add 3 real case studies if available; otherwise label as "example workflow" and avoid fake client proof | `src/data/case-studies.ts`, homepage/money page | M | Content | No fictional proof is presented as real customer evidence |
| R3-4 | P1 | Sales qualification form | Add optional fields: company, role, workflow pain, tools used, budget range, urgency; pass to upstream as `metadata` | Lead routes/forms | M | FE/BE | Sales lead includes qualification metadata; no fields are silently stripped by Zod |
| R3-5 | P2 | Outreach list template | Create CSV/schema for target accounts: company, owner, industry, pain hypothesis, contact, status, next action | `docs/longcare/gtm/outreach-template.csv` | S | GTM | First 100 target prospects can be tracked |
| R3-6 | P2 | Funnel dashboard spec | Define GA4/BigQuery funnel: page_view → cta_click → booking_start → booking_complete/lead_submit | `docs/longcare/analytics/FUNNEL_SPEC.md` | S | Analytics | Event names, params, and dashboard questions documented |

**Sprint R.3 definition of done:**
- First outbound/referral campaign can start.
- Sales leads carry enough context to qualify quickly.
- Founder can measure which offer, page, and channel produces bookings.

### 5.3.5 Phase R success metrics

| Metric | Target by day 14 |
|---|---:|
| Booking deep-link success rate | 100% for known service slugs |
| False-positive lead success | 0 known cases |
| Homepage primary CTA click-through | Baseline + 30% |
| Visitor → booking_start | ≥ 2.5% from homepage traffic |
| Booking_start → submitted/paid booking | ≥ 20% |
| Qualified SME leads | ≥ 10 |
| Paid bookings or sprint deposits | ≥ 3 |
| Automation Sprint discovery calls | ≥ 5 |

### 5.3.6 Phase R implementation order

1. **Fix booking deep links** (`R1-1`, `R1-2`) before sending any traffic.
2. **Fix lead API truthfulness** (`R1-4`, `R1-5`) before promoting lead magnets.
3. **Fix booking compliance** (`R1-3`) before accepting paid bookings.
4. **Add booking attribution** (`R1-6`) before homepage rewrite goes live.
5. **Rewrite homepage top fold** (`R2-1`, `R2-2`) before GTM campaign.
6. **Launch Automation Sprint page** (`R2-3`) before outreach.
7. **Clean trust/schema/copy** (`R2-5`, `R2-6`, `R2-7`) before paid ads or partner referrals.
8. **Launch outbound/referral loop** (`R3-1` to `R3-6`) only after the funnel can be measured.

### 5.3.7 Go-to-market notes

- Positioning: **"Ship one useful AI workflow for your SME in 2 weeks."**
- Avoid selling "AI transformation" as the first ask; sell a concrete workflow outcome.
- Best initial verticals: accountants/bookkeepers, mortgage brokers, migration agents, allied health clinics, tradies with admin load, hospitality groups with booking/review workflows.
- Best channels: founder LinkedIn, accountant/Xero advisor referrals, local business chambers, direct outreach to admin-heavy SMEs.
- Proof rule: real case studies must be labelled as real; synthetic examples must be labelled as examples.

---

## 5.5 Phase E — Extraction & Independent Deploy *(insert before P1 backend kick-off)*

**Goal:** Split `apps/web-longcare` from the monorepo into a standalone `/home/longcare.au/` repo with its own CI/CD, Docker pipeline, and container orchestration. Run it independently *before* backend services are wired so frontend velocity is decoupled from GCP rollout.

### 5.5.1 Why this comes first

- **Decouple frontend velocity from backend GCP rollout.** P1 needs Vertex AI + Firebase creds; the frontend can iterate solo while creds are being approved.
- **Clean stack for Cloud Run / Kubernetes scale-out experiments.** Single-app image is easier to right-size than a 9-service monorepo.
- **Faster CI** — no monorepo overhead. A 9-min pipeline becomes < 5 min.
- **Independent semver enables marketing-led releases.** Marketing can ship daily; backend services follow GCP windows.
- **Reduces blast radius.** Backend deploys can no longer break the public marketing site.

### 5.5.2 Deliverables

1. ✅ New repo at `/home/longcare.au/` (extracted source — zero `@bookedai/shared` dep)
2. ✅ Standalone `Dockerfile` (multi-stage, Node 22-slim, non-root, healthcheck, < 250 MB image)
3. ✅ `docker-compose.yml` for local dev parity
4. ✅ Kubernetes manifests under `k8s/` (Deployment, Service, Ingress, HPA, Kustomization with dev/staging/prod overlays)
5. ✅ Cloud Run config under `infrastructure/`
6. ✅ Terraform for Cloud Run + Artifact Registry
7. ✅ GitHub Actions CI (lint/type-check/build) + 4 deploy workflows (Cloud Run, GKE, security, preview)
8. ✅ Google Cloud Build pipeline (`cloudbuild.yaml`) as alternative
9. ✅ Operator scripts: `init-repo.sh`, `deploy.sh`, `local-dev.sh`, `lint-fix.sh`
10. ✅ Independent docs: `README.md`, `EXTRACTION_GUIDE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/OPERATIONS.md`, `docs/CONTENT_AUTHORING.md`

### 5.5.3 Sprint plan (1 week)

| Day | Action |
|---|---|
| 1 | Source migration + standalone `package.json` + `tsconfig.json` + `next.config.ts` (Agent SS) |
| 1 | Container artifacts (`Dockerfile`, `k8s/`, `infrastructure/`) (Agent TT) |
| 1 | CI/CD + scripts (`.github/workflows/`, `cloudbuild.yaml`, `scripts/`) (Agent UU) |
| 1 | Documentation (Agent VV) |
| 2 | `pnpm install` + `pnpm build` independently — must pass clean |
| 2 | `git init`, first commit, push to new GitHub repo `longcare-au/web` |
| 3 | First Docker build: `docker build -t longcare-au .` (verify image runs) |
| 3 | Push to Artifact Registry under `longcare-prod` project (or `auschain` temporarily) |
| 4 | Deploy preview revision to Cloud Run with `--no-traffic --tag=preview` |
| 5 | Switch traffic 10% → 50% → 100% with verification gates between each step |
| 5 | Map custom domain (`longcare.au`) to standalone Cloud Run service |
| 5 | Park monorepo PM2 process (don't kill — keep as fallback for 14 days) |
| 6 | Customer interview round (10 users) on the independent site |
| 7 | Retrospective + flip "DNS source-of-truth" flag in stakeholder doc |
| 8+ | Begin P1 backend (Firebase Auth, Vertex AI) on the independent stack |

### 5.5.4 Success metrics

- Independent site serves 200 OK on all 154+ URLs
- Lighthouse SEO ≥ 95, Performance ≥ 90 (parity with monorepo deploy)
- CI build runs < 5 minutes on cold cache
- Docker image size < 250 MB (multi-stage, standalone Next.js output)
- 0 deploy regressions during traffic switch
- 0 customer-visible incidents during the 14-day rollback window

### 5.5.5 Risks + mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| DNS propagation delay during traffic switch | Medium | Schedule switch during low-traffic window (Tue/Wed 10:00–14:00 AEST). Lower TTL to 60 s 24 h before. |
| Sub-processor changes (Cloud Run vs PM2 VM) trigger customer compliance review | Low–Medium | Notify customers of infra change in next status update; update sub-processor list at `/trust` |
| Forgotten env var on first prod deploy | Medium | Exhaustive `.env.example`; first deploy uses `--no-traffic` so issues surface before traffic flow |
| Build flakiness from version drift | Low | Pin Node 22 + pnpm 10.33.2 in `package.json`, `Dockerfile`, and `.nvmrc` |
| Monorepo contributors push to deprecated `apps/web-longcare/` after extraction | Medium | Add `DEPRECATED.md` + CODEOWNERS gate in monorepo immediately after extraction |

### 5.5.6 Rollback plan

- **Keep monorepo `apps/web-longcare` PM2 process running for 14 days** as a hot fallback
- Cloud DNS allows quick re-point to monorepo VM if standalone has issues (TTL 60 s, propagation ≤ 10 min globally)
- After 14 days clean: deprecate monorepo path, point both deployments at the standalone repo, delete `apps/web-longcare/` from monorepo in a single PR
- See `/home/longcare.au/EXTRACTION_GUIDE.md` for the detailed rollback runbook

### 5.5.7 Definition of done

- [ ] All deliverables (5.5.2) shipped and merged to standalone repo `main`
- [ ] First Cloud Run revision deployed with `--no-traffic`
- [ ] Custom domain `longcare.au` mapped to standalone service
- [ ] All gates in `EXTRACTION_GUIDE.md` "Migration verification checklist" pass
- [ ] Traffic at 100% on standalone for ≥ 24 h with error rate < 0.5%
- [ ] Monorepo PM2 process parked but warm; rollback plan exercised once in dry-run

Once these are green, `IMPLEMENTATION_PROGRESS.md` Phase E section flips to ✅ and P1 backend wiring begins.

---

## 6. Phase 1 — Foundation (6 weeks)

**Goal:** Ship the AI Mentor MVP, AI Learning Portal v1, and AI Readiness Assessment that maps to a roadmap. End of P1 = first paying SME customer onboarded through the new funnel.

> **Prerequisite:** Phase E (Extraction & Independent Deploy) is done. P1 backend integration happens in the standalone repo, not in the monorepo `apps/web-longcare/`.

### 6.1 Scope

| Feature | Where it lives | Backend | Data |
|---|---|---|---|
| AI Mentor MVP (chat with memory) | `app.longcare.au/mentor` | `services/agent` (Gemini 2.0 Flash + Vertex AI Search RAG) | Firestore (sessions), Cloud Storage (uploads) |
| AI Learning Portal | `longcare.au/academy/*`, `app.longcare.au/learning` | `services/api` (`/courses`, `/lessons`, `/progress`) | Cloud SQL (migration 006 already exists) + Firestore (real-time progress) |
| AI Readiness Assessment | `longcare.au/resources/ai-readiness` (lead) + `app.longcare.au/assessment` (full) | `services/agent` (scoring) | Cloud SQL + BigQuery export |
| Onboarding system | `app.longcare.au/onboarding` | `services/api` (`/users/onboarding`) | Cloud SQL |
| Firebase Auth migration | All apps | `services/api` middleware update | Migration 009 (firebase_uid column) |

### 6.2 Sprint plan

#### Sprint 1.1 — Auth & data foundation (Week 3)
- Migrate from JWT-only to Firebase Auth (Google Sign-In primary, OpenAI OAuth fallback)
- Add Firebase Admin SDK to `services/api`; verify ID tokens server-side
- Migration 009: `users.firebase_uid`, `users.signup_source`, `users.onboarding_completed_at`
- Update all booking/payment endpoints to accept Firebase ID tokens
- Firestore project setup + security rules (read own user data only)
- Cloud Storage bucket for assessment uploads
- Acceptance: existing booking flow works with Firebase login; OpenAI fallback intact.

#### Sprint 1.2 — AI Readiness Assessment (Week 4)
- Web form on `/resources/ai-readiness` (replaces current `/discovery` + `/quiz` overlap)
- 12-question assessment across 4 dimensions: data readiness, team capability, process maturity, AI use cases
- Backend scoring service (Vertex AI categorisation): outputs maturity tier (Explore / Adopt / Scale) + 3 prioritised use cases + ROI estimate
- Email PDF report (Gmail API via `services/notification`)
- BigQuery export for analytics
- Acceptance: anonymous user completes assessment in < 6 min, receives email + on-screen results.

#### Sprint 1.3 — Learning Portal v1 (Week 5)
- `/academy` hub page with 5 learning paths (start with: Beginner AI, AI for Business, AI Productivity, Prompt Engineering, AI Automation)
- Each path = sequence of lessons (already in migration 006: `courses`, `lessons`, `enrollments`, `quiz_results`, `certificates`)
- Lesson page: video (YouTube embed) + transcript + quiz + "next lesson" CTA
- Progress tracking (Firestore real-time)
- Free tier (first lesson of each path) + paid tier (full course) — link to existing Stripe via `services/payment`
- Acceptance: user enrols, completes lesson 1 of "Beginner AI", progress saved across devices.

#### Sprint 1.4 — AI Mentor MVP (Week 6)
- Chat UI at `app.longcare.au/mentor` (extend `chat-widget.tsx` pattern)
- Gemini 2.0 Flash backend with system prompt: "You are an AI mentor for Australian SMEs"
- Memory: Firestore conversation history (last 20 turns) + Vertex AI Search RAG over LongCare's content (blog, guides, courses)
- Role-based prompting: pulls user's assessment results to personalise answers
- Rate limit: 50 messages/day for free tier, unlimited for paid
- Streaming responses (SSE)
- Acceptance: paid user gets contextual answer ("Based on your assessment showing low data maturity, start with…"); free user hits 50-msg limit and sees upgrade CTA.

#### Sprint 1.5 — Onboarding + analytics (Week 7)
- Post-signup onboarding wizard (4 steps: business profile → goals → preferred industry → first action)
- Personalised dashboard at `app.longcare.au/dashboard`: assessment score, recommended lesson, mentor CTA, upcoming session
- GA4 event tracking on every conversion step (lead, signup, assessment_complete, lesson_complete, mentor_first_msg, upgrade)
- BigQuery dashboard (Looker Studio) for funnel
- Acceptance: 1 cohort of 10 beta users completes onboarding → assessment → 1 lesson → 1 mentor msg.

#### Sprint 1.6 — Hardening & launch (Week 8)
- Bug fixes from beta cohort
- Performance: Vertex AI Search latency < 1s p95; mentor chat first-token < 2s p95
- Security review (Firebase rules, IAM, Secret Manager for all keys)
- Launch checklist: GA4 verified, BigQuery verified, Sentry alerts, status page (Cloud Monitoring uptime check)
- Public launch + announcement

### 6.3 P1 success metrics

- 100 assessment completions in first 30 days
- 30 paid signups (conversion ≥ 30% from assessment to signup)
- 70% of paid users complete ≥ 1 lesson
- 50% of paid users send ≥ 5 mentor messages in first 14 days
- NPS ≥ 40 from first 30 beta users
- Stripe MRR ≥ A$3,000 by end of week 8

---

## 7. Phase 2 — Automation Platform (8 weeks)

**Goal:** Ship the SME AI Toolkit (7 mini-apps) and a visual workflow builder. Position LongCare as the "build-once, deploy-many" automation platform.

### 7.1 Scope

| Feature | Pages | Backend | Data |
|---|---|---|---|
| AI Toolkit (7 apps) | `/toolkit/{email-assistant, document-generator, proposal-writer, meeting-assistant, customer-support, social-media, hr-assistant}` | `services/agent` (per-app prompt templates) | Firestore (drafts), Cloud Storage (outputs) |
| Workflow Builder | `app.longcare.au/workflows` | New `services/workflow` (Express + BullMQ + Pub/Sub) | Cloud SQL (workflow definitions), Pub/Sub (triggers), Cloud Tasks (delayed steps) |
| Industry Templates | `/solutions/{healthcare, retail, hospitality, real-estate, trades, education, professional-services}` + template gallery | `services/workflow` (template seed) | Static + Firestore |
| Chatbot deployment | Embed widget for SME websites | `services/agent` (multi-tenant Gemini) | Firestore per-tenant config |

### 7.2 Sprint plan

| Sprint | Weeks | Deliverable |
|---|---|---|
| 2.1 | 9–10 | Toolkit shell + first 2 apps (Email Assistant, Document Generator); shared "AI form → output" component pattern |
| 2.2 | 11–12 | Toolkit apps 3–5 (Proposal Writer, Meeting Assistant, Customer Support); Stripe metered billing for token usage |
| 2.3 | 13–14 | Toolkit apps 6–7 (Social Media, HR Assistant); admin analytics on most-used tools |
| 2.4 | 15–16 | Workflow Builder MVP (drag-drop nodes: trigger → AI step → action); first 3 industry templates seeded |
| 2.5 | 17–18 | Industry Solutions pages (7 vertical landing pages); template marketplace UX; embeddable chatbot widget |

### 7.3 P2 success metrics

- 200 paid users using ≥ 1 toolkit app weekly
- 30 SMEs publish ≥ 1 workflow
- A$15K MRR
- 3 paying enterprise pilots (custom workflow deployment, A$2K+ each)

---

## 8. Phase 3 — AI Agent Marketplace (10 weeks)

**Goal:** Ship the AI Agent marketplace with 12 agents (6 business ops + 6 industry). Each agent is a multi-step, memory-enabled workflow that runs on triggers.

### 8.1 Scope

| Feature | Description |
|---|---|
| Agent runtime | New `services/agent-runtime` — long-running workers (Cloud Run jobs + Cloud Tasks) executing agent steps with Gemini + tool calling |
| 6 Business agents | Admin, HR, Customer Service, Sales, Scheduling, Marketing |
| 6 Industry agents | Healthcare, Property, Retail, Hospitality, Recruitment, Education |
| Marketplace UX | `/agents` listing, `/agents/[slug]` detail, "Deploy" flow (configure → connect tools → activate) |
| Multi-channel deployment | Web embed, WhatsApp Business, email, SMS (Twilio), Slack |
| Agent analytics dashboard | Usage, success rate, cost per run, ROI estimation |

### 8.2 Sprint plan

| Sprint | Weeks | Deliverable |
|---|---|---|
| 3.1 | 19–20 | Agent runtime architecture; tool-calling registry (calendar, email, CRM); first agent (Scheduling AI) |
| 3.2 | 21–22 | Sales AI + Customer Service AI (with website chat embed) |
| 3.3 | 23–24 | Admin AI + HR AI + Marketing AI |
| 3.4 | 25–26 | Healthcare AI + Property Management AI (deeper integrations: Cliniko, PropertyTree) |
| 3.5 | 27–28 | Retail AI + Hospitality AI |
| 3.6 | 29–30 | Recruitment AI + Education AI; analytics dashboard; multi-channel WhatsApp/SMS deployment |

### 8.3 P3 success metrics

- 50 active agent deployments
- 25 agents handling > 100 messages/day each
- A$50K MRR
- 1st enterprise contract A$50K+ ARR

---

## 9. Phase 4 — AI Ecosystem (8 weeks)

**Goal:** Open the platform — public API, partner marketplace, enterprise governance suite, APAC expansion.

### 9.1 Scope

| Feature | Description |
|---|---|
| Public API | OpenAPI 3.1 spec (already partial in `services/api`); API keys, usage metering, billing |
| Partner marketplace | Third parties publish agents/templates with revenue share |
| Enterprise integrations | SSO (SAML/OIDC), SCIM, audit log export, VPC connector |
| AI Governance suite | Policy templates, risk assessment tool, audit dashboard, responsible-AI checklist generator |
| APAC localisation | i18n already in `apps/web-g-bookedai` (en/vi/zh) — extend to LongCare; AUD/SGD/MYR pricing |

### 9.2 Sprint plan

| Sprint | Weeks | Deliverable |
|---|---|---|
| 4.1 | 31–32 | Public API: keys, rate limits, OpenAPI docs (Scalar UI), webhooks |
| 4.2 | 33–34 | Partner marketplace UX + revenue share + payout (Stripe Connect) |
| 4.3 | 35–36 | Governance suite: `/governance/*` pages + audit dashboard |
| 4.4 | 37–38 | Enterprise SSO/SCIM/VPC; APAC i18n + multi-currency |

### 9.3 P4 success metrics

- 10 partners publishing agents
- 3 enterprise contracts ≥ A$100K ARR
- A$200K MRR
- 200 SMEs across AU + SG + MY

---

## 10. Tech Architecture Migration

### 10.1 Service inventory (target)

| Service | Runtime | Purpose | New in phase |
|---|---|---|---|
| `apps/web-longcare` | Next.js 15 / Cloud Run | Marketing site | exists |
| `apps/user-app` | Next.js 15 / Cloud Run | Authed app (mentor, learning, toolkit) | exists, expand P1+ |
| `apps/admin-app` | Next.js 15 / Cloud Run | Admin console | exists |
| `services/api` | Express 5 / Cloud Run | Booking, payment, courses | exists |
| `services/agent` | Express 5 / Cloud Run | Mentor, toolkit prompts, RAG | exists, expand P1 |
| `services/agent-runtime` | Express 5 + Cloud Run jobs | Multi-step agent execution | **new P3** |
| `services/workflow` | Express 5 + BullMQ | Workflow builder backend | **new P2** |
| `services/notification` | Express 5 / Cloud Run | Gmail/Twilio/FCM | exists |
| `services/accounting-sync` | Express 5 / Cloud Run | Xero | exists |
| `services/learning-agent` | Express 5 / Cloud Run | Lesson summarisation, quiz grading | exists, expand P1 |
| `services/marketing-agent` | Express 5 / Cloud Run | 8-channel content gen | exists |
| `services/governance` | Express 5 / Cloud Run | Audit log, policy gen | **new P4** |

### 10.2 Data migrations roadmap

| Migration | Phase | Adds |
|---|---|---|
| 009_firebase_auth | P1 | `users.firebase_uid`, `users.onboarding_completed_at`, `users.signup_source` |
| 010_assessments | P1 | `assessments`, `assessment_responses`, `assessment_recommendations` |
| 011_learning_progress | P1 | `lesson_progress`, `learning_paths`, `path_enrollments` |
| 012_mentor_sessions | P1 | `mentor_sessions`, `mentor_messages` (PII-safe — content in Firestore, metadata in SQL) |
| 013_toolkit_usage | P2 | `toolkit_runs`, `toolkit_credits`, `toolkit_outputs` |
| 014_workflows | P2 | `workflows`, `workflow_runs`, `workflow_step_logs` |
| 015_agents | P3 | `agent_definitions`, `agent_deployments`, `agent_runs`, `agent_tools` |
| 016_partners | P4 | `partners`, `partner_listings`, `partner_payouts` |
| 017_governance | P4 | `governance_policies`, `governance_audits`, `governance_risks` |

### 10.3 Google Cloud rollout sequence

| GCP service | First used in | Notes |
|---|---|---|
| Firebase Auth | P1 | Replace JWT-only |
| Firestore | P1 | Mentor sessions, learning progress |
| Cloud Storage | P1 | Assessment uploads, toolkit outputs |
| Vertex AI | P1 | Production AI workloads (replace direct Gemini API where rate-limit matters) |
| Vertex AI Search | P1 | RAG over LongCare content for mentor |
| BigQuery | P1 | GA4 export, assessment analytics, funnel analysis |
| Pub/Sub | P2 | Workflow triggers |
| Cloud Tasks | P2 | Delayed/scheduled workflow steps |
| Cloud Run jobs | P3 | Long-running agent executions |
| Secret Manager | P0 | All API keys + service account JSON (replace `.env` for prod) |
| Cloud Logging | P0 | Already wired via Express logger; structured logs |
| IAM custom roles | P4 | Per-tenant data isolation for enterprise |

---

## 11. Resourcing & timeline

### 11.1 Team shape (target)

| Role | FTE | When |
|---|---|---|
| Tech lead / FE | 1 | P0–P4 |
| Backend / AI engineer | 1 | P0–P4 |
| Full-stack engineer | 1 | from P1 |
| Designer (part-time) | 0.5 | P0–P4 |
| Content writer (Australian English) | 0.5 | from P1 |
| QA / customer support | 0.5 | from P1 |
| Founder (GTM, sales) | 1 | P1–P4 |

### 11.2 Total elapsed timeline

```
P0  ████                                         (2 wk, May 2026)
P1       ████████████                            (6 wk, Jun–Jul 2026)
P2                  ████████████████             (8 wk, Aug–Sep 2026)
P3                                  ████████████████████  (10 wk, Oct–Dec 2026)
P4                                                  ████████████████  (8 wk, Jan–Feb 2027)
```

End-to-end: ~ 9 months from kick-off (P0 starts 2026-05-12).

---

## 12. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Vertex AI quota limits during P1 | Medium | High | Apply for quota uplift via Google Cloud for Startups in P0 |
| Firebase Auth migration breaks existing OpenAI OAuth users | Medium | High | Dual-stack auth in P1; deprecate OpenAI OAuth only at end of P2 with email migration |
| Toolkit token cost > revenue per user | Medium | Medium | Stripe metered billing in P2.2; cap free tier at 100K tokens/month |
| Agent runtime cost overruns at scale | Medium | High | Per-agent cost monitoring in BigQuery from day 1 P3 |
| Australian Privacy Act / APP compliance gap | Medium | High | Privacy review before P1 launch (consult legal); data residency in `australia-southeast1` |
| Content velocity for 8 learning paths | High | Medium | Hire content writer in P1; reuse existing blog content |
| Competitor (e.g. local AI consultancy) launches similar SME platform | Medium | Medium | Speed to first paying SME is the moat — beta cohort by week 4 |
| Single founder dependency (key-person risk) | High | High | Document all GCP credentials in 1Password vault shared with co-founder; weekly architecture decision logs |

---

## 13. Definition of "Done" per phase

A phase is done when **all** of:
- Acceptance criteria for every sprint pass
- Phase success metrics are met or exceeded
- Documentation updated: `README.md`, `docs/longcare/IMPLEMENTATION_PROGRESS.md`, OpenAPI spec
- 0 P1 bugs in Sentry from prior 14 days
- Customer interview round (≥ 10 users) summarised in `docs/longcare/feedback/PHASE_X_INTERVIEWS.md`

---

## 14. Immediate next steps (this week)

1. **Today:** approve Version 1.1 and start **Phase R** before new platform work.
2. **Day 1:** implement booking deep-link preselect in `apps/booking-web` for `?service=ai-starter`, `mentor-1h`, `package-5`, `package-10`, `automation-sprint`, `discovery`.
3. **Day 1:** enforce Terms/Privacy acceptance in the booking flow before payment/confirmation.
4. **Day 2:** fix lead API success semantics: check upstream `res.ok`, add timeout, return 502/503 on durable failure, and update clients to show retryable errors.
5. **Day 2:** add booking attribution (`booking_start`, `service`, `source_page`, `section`, `utm_*`) via a shared `BookingLink` or `/book` redirect route.
6. **Day 3-4:** replace homepage image-map-first top fold with HTML-first H1, copy, CTA buttons, and three offer cards.
7. **Day 4-5:** create the AI Automation Sprint money page with price range, scope, examples, process, FAQ, schema, and booking CTA.
8. **Day 5:** audit trust claims and standardise CTA language before sending outbound/referral traffic.
9. **Day 6-7:** prepare LinkedIn launch pack, partner referral page/update, and first 100-prospect outreach tracker.

**Deliverables tracked in:**
- Code: `apps/web-longcare`, `services/agent`, `services/api`
- Docs: `docs/longcare/{VISION.md, IMPLEMENTATION_PLAN.md, IA_BLUEPRINT.md, IMPLEMENTATION_PROGRESS.md}`
- Project board: GitHub Projects (one column per phase, swimlanes per sprint)

---

## 15. Open questions for stakeholder decision

1. **Auth strategy:** keep dual Firebase + OpenAI OAuth long-term, or sunset OpenAI OAuth at end of P2?
2. **Pricing:** retain existing $29/$99/packages, or rebuild around subscription tiers (Beginner / SME / Enterprise) at end of P1?
3. **Brand split:** is LongCare.au standalone or always co-branded "LongCare on bookedai.au"? Affects OG, Schema.org, footer.
4. **Data residency:** must we guarantee `australia-southeast1` for all customer data, or is multi-region acceptable for non-PII?
5. **Mobile apps (Flutter / React Native in vision §8):** required in P3 or deferred to post-P4?
6. **Content language:** English-only at launch, or Vietnamese + Mandarin parity from P1 (matches `g.bookedai.au` i18n)?

Pending answers are captured as `TODO(stakeholder)` markers in the relevant sprint tasks.
