# LongCare.au — Information Architecture Blueprint

Version: 1.0
Date: 2026-05-09
Companion to: `docs/longcare/VISION.md`, `docs/longcare/IMPLEMENTATION_PLAN.md`

This document maps every existing page to its target state in the new IA, and defines redirects, content owners, and SEO metadata standards.

---

## 1. Page-by-page migration matrix

| Current URL | Action | Target URL | Phase | Notes |
|---|---|---|---|---|
| `/` | **Redesign** | `/` | P0 + P1 | Hero (vision tagline) → AI Readiness CTA → 5-pillar overview → Industries → Testimonials → Partners → Google Cloud stack badge → Community → Contact |
| `/about` | **Expand + merge** | `/about` | P0 | Add founder bio (Dr. Long Do), mission, team section (was `/mentors`), `Organization` schema |
| `/mentors` | **Merge** | `/about#team` (301) | P0 | Drop "Coming Soon" placeholders |
| `/services` | **Reposition** | `/services` (kept as transactional booking hub) OR fold into `/agents` + `/academy` (P3) | P0 (keep) → P3 (fold) | Currently the revenue surface — keep until toolkit/agents replace it |
| `/services/ai-starter` | Keep | `/services/ai-starter` | P0 | Still the $29 entry product |
| `/services/ai-mentor` | Keep | `/services/ai-mentor` | P0 | Still the $99 deep-dive |
| `/services/packages` | Keep | `/services/packages` | P0 | 5/10-pack |
| `/pricing` | **Delete + 301** | `/services` | P0 | Empty wrapper |
| `/get-started` | **Delete + 301** | `/services` | P0 | Duplicates services |
| `/discovery` | **Repurpose** | `/resources/ai-readiness` | P1 | Convert to full assessment tool (12 questions, Vertex AI scoring) |
| `/quiz` | **Merge into assessment** | `/resources/ai-readiness` (with short-form variant `/resources/ai-readiness?quick=1`) | P1 | Same backend, two UX modes |
| `/guide` | **Move** | `/resources/guides` (hub) + `/resources/guides/sme-ai-starter` (current PDF) | P0 | Becomes catalogue, not single page |
| `/courses` | **Expand → hub** | `/academy` | P1 | Hub for all 5 (eventually 8) learning paths |
| `/blog` | Keep + CMS migrate | `/resources/blog` | P0 (rename) → P2 (CMS) | Add `Article` schema, MDX or Sanity |
| `/blog/[slug]` | Keep | `/resources/blog/[slug]` | P0 | 301 from old URLs |
| `/testimonials` | **Move + schema** | `/resources/case-studies` (rename) | P0 | Add `AggregateRating` + `Review` |
| `/how-it-works` | **Merge into homepage** | `/` (section) + `/about/how-it-works` (long-form) | P0 | Reduces standalone page; keeps SEO via deep section |
| `/referral` | Keep | `/referral` | — | No change |
| `/faq` | Keep | `/faq` | P0 | Render `FAQSchema`, add `aria-expanded` |
| `/contact` | Keep | `/contact` | P0 | Add OG image, fix form ARIA |
| `/search` | Keep | `/search` | — | No change |
| `/privacy`, `/terms` | Keep | unchanged | — | Update if APP/legal review changes |

### New pages added in each phase

#### Phase 1 (Foundation)
- `/resources` (hub)
- `/resources/ai-readiness` (assessment tool)
- `/resources/roi-calculator` (rebuild from existing component)
- `/resources/guides` (hub) + `/resources/guides/[slug]`
- `/resources/case-studies` (renamed testimonials) + `/resources/case-studies/[slug]`
- `/academy` (hub)
- `/academy/beginner-ai`
- `/academy/ai-for-business`
- `/academy/ai-productivity`
- `/academy/prompt-engineering`
- `/academy/ai-automation`

Authed app (`app.longcare.au`):
- `/dashboard`
- `/onboarding`
- `/learning`, `/learning/[pathSlug]`, `/learning/[pathSlug]/[lessonSlug]`
- `/mentor`
- `/assessment`

#### Phase 2 (Automation)
- `/toolkit` (hub)
- `/toolkit/email-assistant`
- `/toolkit/document-generator`
- `/toolkit/proposal-writer`
- `/toolkit/meeting-assistant`
- `/toolkit/customer-support`
- `/toolkit/social-media`
- `/toolkit/hr-assistant`
- `/solutions` (industry hub)
- `/solutions/healthcare`
- `/solutions/retail`
- `/solutions/hospitality`
- `/solutions/real-estate`
- `/solutions/trades`
- `/solutions/education`
- `/solutions/professional-services`
- `/academy/certifications`
- `/academy/practice-lab`

Authed app:
- `/workflows`, `/workflows/builder`, `/workflows/[id]`

#### Phase 3 (Agents)
- `/agents` (hub)
- `/agents/business`, `/agents/industry`
- `/agents/[slug]` × 12
- `/agents/automation-packages`
- `/agents/deployment-services`

Authed app:
- `/agents/deploy`, `/agents/[deploymentId]/analytics`, `/agents/[deploymentId]/settings`

#### Phase 4 (Ecosystem)
- `/governance` (hub)
- `/governance/policies`
- `/governance/risk-assessment`
- `/governance/responsible-ai`
- `/community` (hub)
- `/community/events`
- `/community/workshops`
- `/community/bootcamps`
- `/community/partners`
- `/community/network`
- `/api-docs` (public OpenAPI)
- `/partners` (apply form + listing)

---

## 2. Redirect map (next.config.ts `redirects()`)

```ts
// next.config.ts — added in Sprint 0.2
async redirects() {
  return [
    { source: '/pricing', destination: '/services', permanent: true },
    { source: '/get-started', destination: '/services', permanent: true },
    { source: '/mentors', destination: '/about#team', permanent: true },
    { source: '/discovery', destination: '/resources/ai-readiness', permanent: true },
    { source: '/quiz', destination: '/resources/ai-readiness?quick=1', permanent: true },
    { source: '/guide', destination: '/resources/guides', permanent: true },
    { source: '/courses', destination: '/academy', permanent: true },
    { source: '/blog/:slug*', destination: '/resources/blog/:slug*', permanent: true },
    { source: '/testimonials', destination: '/resources/case-studies', permanent: true },
    { source: '/testimonials/:slug*', destination: '/resources/case-studies/:slug*', permanent: true },
    { source: '/how-it-works', destination: '/about/how-it-works', permanent: true },
  ];
}
```

All redirects ship in **Sprint 0.2** with corresponding sitemap update + Google Search Console submit.

---

## 3. Metadata standard (every page must export this shape)

Use a shared helper added in P0:

```ts
// src/lib/metadata.ts
import { Metadata } from 'next';

export type PageMetaInput = {
  title: string;          // ≤ 60 chars
  description: string;    // ≤ 160 chars
  path: string;           // canonical path, e.g. '/services/ai-mentor'
  image?: string;         // optional override; defaults to /api/og?title=...
  noIndex?: boolean;
  type?: 'website' | 'article';
};

export function getPageMetadata(input: PageMetaInput): Metadata {
  const url = `https://longcare.au${input.path}`;
  const image = input.image ?? `/api/og?title=${encodeURIComponent(input.title)}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: 'LongCare AU',
      locale: 'en_AU',
      type: input.type ?? 'website',
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image],
    },
    robots: input.noIndex ? { index: false, follow: false } : undefined,
  };
}
```

Every `page.tsx` MUST `export const metadata = getPageMetadata({ ... })`. Lint rule (custom ESLint or grep CI check) blocks merge if missing.

---

## 4. Schema.org strategy

| Page type | Required schema | Rendered via |
|---|---|---|
| `/` | `LocalBusiness` (existing) + `Organization` + `WebSite` (with `SearchAction`) | `layout.tsx` |
| `/about` | `Organization`, `Person` (founder) | inline JSON-LD in `page.tsx` |
| `/services/*`, `/agents/*`, `/toolkit/*` | `Service` | inline |
| `/academy/*`, `/academy/[lesson]` | `Course`, `LearningResource` | inline |
| `/resources/blog/[slug]` | `BlogPosting` (`Article`) | inline |
| `/resources/case-studies/*` | `Review`, `AggregateRating` (page-level) | inline |
| `/resources/ai-readiness` | `WebApplication`, `Quiz` | inline |
| `/faq` | `FAQPage` | render `FAQSchema` (already defined) in `layout.tsx` |
| `/community/events/*` | `Event` | inline |

Test all schema with [Schema Markup Validator](https://validator.schema.org/) before merge.

---

## 5. Breadcrumb standard

All non-homepage pages render the existing `Breadcrumbs` component with structured-data emit:

```
Home > Resources > AI Readiness Assessment
Home > Academy > AI for Business > Lesson 3
Home > Solutions > Healthcare
```

Breadcrumb component must emit `BreadcrumbList` JSON-LD.

---

## 6. URL conventions

- Lowercase, hyphenated: `/resources/ai-readiness`, not `/Resources/AIReadiness`
- No trailing slashes (Next.js default)
- No file extensions
- Pluralised nouns for hubs: `/services`, `/agents`, `/resources`, `/community`
- `/[slug]` patterns use slugs from CMS / database; max 60 chars
- UTM parameters honoured in canonicals (canonical strips them)
- Locale prefix reserved for future i18n: `/en-au/`, `/vi/`, `/zh/` (P4)

---

## 7. Sitemap structure (`src/app/sitemap.ts`)

Sitemap must dynamically include:
- All static pages (filtered by `noIndex: false`)
- All blog/case-study slugs (read from CMS at build time)
- All academy lesson slugs (read from DB)
- All `/agents/[slug]` and `/toolkit/[slug]` routes (P2/P3)
- `lastModified` from git history or DB updated_at
- `changeFrequency`: `weekly` for blog, `monthly` for product pages, `yearly` for legal

---

## 8. Internal linking rules

To prevent the "siloed pages" issue found in audit:

| From | Must link to |
|---|---|
| `/` | `/services`, `/academy`, `/agents` (P3+), `/resources/ai-readiness`, `/about` |
| `/services/[product]` | sibling services + `/resources/case-studies` (relevant) + `/academy` (relevant path) |
| `/academy/[path]/[lesson]` | next + previous lesson, related toolkit app, related blog post |
| `/resources/blog/[slug]` | author bio, 3 related posts, primary CTA (assessment or service) |
| `/resources/case-studies/[slug]` | service used, industry solution page, "Book same outcome" CTA |
| `/solutions/[industry]` | industry agents, industry templates, relevant case studies |
| Every page | global footer (Services, Academy, Resources, Community, About) |

CI lint: every `page.tsx` must have ≥ 3 internal `<Link>`s (excluding nav/footer). Custom check.

---

## 9. Content ownership matrix

| Section | Content owner | Update cadence |
|---|---|---|
| `/` hero | Founder | Quarterly |
| `/services/*` | Founder + Designer | When prices change |
| `/academy/*` | Content writer + Learning lead | Per new lesson (target: 1/week from P1) |
| `/agents/[slug]` | PM per agent | When agent capability changes |
| `/toolkit/*` | PM | Per release |
| `/solutions/*` | Content writer + industry SME interview | Quarterly refresh |
| `/resources/blog` | Content writer | 2 posts / week from P1 |
| `/resources/case-studies` | Customer success + Founder | 1 / month from P1 |
| `/community/events` | Marketing | Real-time |
| `/about`, `/contact`, `/privacy`, `/terms` | Founder + Legal | As required |

---

## 10. SEO targets per cluster

| Cluster | Primary keywords (Australia-targeted) | Target rank within 6 months |
|---|---|---|
| `/services` | "AI mentor Australia", "1-on-1 AI training Sydney/Melbourne", "AI consulting SME" | Top 5 |
| `/academy` | "learn AI online Australia", "ChatGPT course Australian English", "prompt engineering certification AU" | Top 10 |
| `/solutions/healthcare` | "AI for medical practices Australia", "AI clinic automation" | Top 10 |
| `/solutions/retail` | "AI for small retail Australia", "Shopify AI agent" | Top 10 |
| `/solutions/real-estate` | "AI for real estate agents Australia", "PropertyTree AI" | Top 10 |
| `/agents` | "AI agent for SME", "deploy AI employee Australia" | Top 10 (P3) |
| `/toolkit` | "AI proposal writer", "AI email assistant Australia" | Top 20 (P2) |
| `/governance` | "responsible AI policy SME", "AI compliance Australia" | Top 10 (P4) |

Track in Google Search Console + ahrefs (added P1).

---

## 11. Acceptance checklist (for any new page in any phase)

A new page can ship only if **all** of:

- [ ] Uses `getPageMetadata()` with unique title + description
- [ ] Has canonical, OG image, Twitter card
- [ ] Renders breadcrumbs (if not `/`)
- [ ] Emits relevant Schema.org JSON-LD
- [ ] Has ≥ 3 internal `<Link>` to non-nav pages
- [ ] Has visible primary CTA above the fold
- [ ] Mobile Lighthouse Performance ≥ 85
- [ ] axe-core: 0 critical issues
- [ ] All forms have `aria-required`, `aria-invalid`, `role="alert"` error region
- [ ] All images use `next/image` with `alt` (or `alt=""` if decorative)
- [ ] Australian English spell-check passes
- [ ] Added to `sitemap.ts` (or excluded with `noIndex: true` + reason in PR)
