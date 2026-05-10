# longcare.au — Illustration Library

A purpose-built collection of pure-SVG React components used across the
longcare.au marketing site, academy, and hub pages. Every blog post, landing
page, and course module ships with an illustration, icon, flow, or
infographic from this library.

> Library lives at `apps/web-longcare/src/components/illustrations/`.

---

## 1. Why custom SVG (and not stock images)

- **No external image deps.** Zero asset CDN calls; nothing breaks when an
  image host changes URLs.
- **Lightweight.** Each component is ~2-7 KB raw. Total library
  contribution to a page bundle is single-digit KB after gzip.
- **Customisable colours.** Brand colours are baked in but can be overridden
  via `className` (Tailwind text colour tokens) or by re-exporting variants.
- **Scale infinitely.** Pure vector — sharp at any DPR, any viewport size.
- **Performant.** No raster image decoding; no LCP penalty; no
  `next/image` configuration overhead for decorative art.
- **Accessible by default.** Each illustration declares `role="img"` plus
  a meaningful `aria-label`; decorative shapes use `aria-hidden`.

---

## 2. Component catalogue

### 2.1 Hero illustrations (480×360)

| Component | When to use |
|---|---|
| `HeroMentor` | Hero for `/services`, `/academy`, AI-mentor product pages |
| `HeroAgents` | Hero for `/agents`, agent-marketplace landing |
| `HeroToolkit` | Hero for `/toolkit`, productivity bundle pages |
| `HeroSolutions` | Hero for `/solutions`, industry/regional landings |
| `HeroGovernance` | Hero for `/governance`, privacy & compliance pages |
| `HeroCommunity` | Hero for `/community`, alumni / member pages |

### 2.2 Flow diagrams

| Component | Default size | Purpose |
|---|---|---|
| `FlowThreeStep` | 720×200 | Generic Input → AI → Output flow with overridable labels and icons |
| `FlowFiveStep` | 800×140 | Discover → Spec → Build → Pilot → Production delivery flow |
| `FlowAssessment` | 600×400 | Four-dimension intake → score gauge → recommended tier |
| `FlowPromptAnatomy` | 400×400 | Pentagon of the five prompt ingredients |
| `FlowAutomation` | 800×140 | Trigger → AI step → Action → Review → Final automation pipeline |

### 2.3 Infographics

| Component | Default size | Purpose |
|---|---|---|
| `InfographicRoiQuadrant` | 480×400 | Volume × stakes 2×2 mapping for AI use-case ROI |
| `InfographicStack` | 360×380 | Layered stack (Infrastructure → UI), props for layers |
| `InfographicComparison` | 480×400 | Side-by-side feature comparison (5 rows), props for rows |
| `InfographicTimeline` | 720×200 | Horizontal milestones timeline (5 events), props for milestones |

### 2.4 Industry icons (64×64)

`industry-icons.tsx` exports seven reusable icons:

`IndustryHealthcare`, `IndustryRetail`, `IndustryHospitality`,
`IndustryRealEstate`, `IndustryTrades`, `IndustryEducation`,
`IndustryProfessional`.

All accept `className`, `width`, `height` and use the same primary/accent
colour pair, so they look cohesive when displayed in a grid.

### 2.5 Decorative elements

`decorative.tsx` exports background/ornament primitives:

`DotsPattern`, `WavyLine`, `Grid`, `OrbGlow`, `BlobShape`.

All are marked `aria-hidden="true"` because they carry no information.

---

## 3. Usage examples

### 3.1 Drop-in hero on a page

```tsx
import { HeroMentor } from "@/components/illustrations/hero-mentor";

export default function Page() {
  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            An AI mentor that knows your business
          </h1>
          <p className="mt-4 text-slate-600">...</p>
        </div>
        <HeroMentor className="mx-auto h-auto w-full max-w-[480px]" />
      </div>
    </section>
  );
}
```

### 3.2 Custom three-step flow

```tsx
import { FlowThreeStep } from "@/components/illustrations/flow-three-step";

<FlowThreeStep
  title="How weekly automation runs work"
  step1Label="Calendar event"
  step2Label="AI drafts agenda"
  step3Label="Email sent"
/>
```

### 3.3 Industry grid

```tsx
import {
  IndustryHealthcare,
  IndustryRetail,
  IndustryHospitality,
  IndustryTrades,
} from "@/components/illustrations/industry-icons";

const industries = [
  { Icon: IndustryHealthcare, label: "Healthcare" },
  { Icon: IndustryRetail, label: "Retail" },
  { Icon: IndustryHospitality, label: "Hospitality" },
  { Icon: IndustryTrades, label: "Trades" },
];

<ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
  {industries.map(({ Icon, label }) => (
    <li key={label} className="text-center">
      <Icon className="mx-auto" width={72} height={72} />
      <span className="mt-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
    </li>
  ))}
</ul>
```

---

## 4. Adding new illustrations — checklist

1. Create the file under `src/components/illustrations/` with a
   kebab-cased filename (e.g. `hero-newsroom.tsx`).
2. Export a named React function component (PascalCase).
3. Component props must include at minimum: `className`,
   `width = <default>`, `height = <default>`.
4. Set a fixed `viewBox` — props only override `width`/`height`. This
   preserves aspect ratio and lets parents resize freely.
5. Root `<svg>` must declare `xmlns="http://www.w3.org/2000/svg"` and
   `fill="none"`. Apply fills per element.
6. Add `role="img"` plus a descriptive `aria-label` for informational
   illustrations. Use `aria-hidden="true"` for purely decorative ones.
7. Use only the brand colour tokens (see §5).
8. **Do not import raster assets.** No `<image href="...">` or
   `data:image/png` URLs.
9. Keep the raw component file ≤ 8 KB.
10. Subtle animations are fine, but wrap them in
    `prefers-reduced-motion` queries if you do.
11. Add the new component to the catalogue in §2 of this doc.

---

## 5. Colour tokens

| Token | Hex | Usage |
|---|---|---|
| Brand navy | `#0F172A` | Primary text, dark backgrounds |
| Sky-700 | `#0369A1` | CTAs, primary accent strokes |
| Sky-500 | `#0EA5E9` | Bright accent / gradient stop |
| Emerald-600 | `#059669` | Success, positive state |
| Amber-600 | `#D97706` | Warm accent, warnings |
| Slate-100 | `#F1F5F9` | Subtle background fills |
| Slate-300 | `#CBD5E1` | Borders, dashed connectors |
| Slate-500 | `#64748B` | Secondary text |
| White | `#FFFFFF` | Reserved for foreground on coloured fills |

All illustrations are designed to sit on `bg-[#F8FAFC]` (slate-50) or
white. Avoid pure black — use the brand navy.

---

## 6. Accessibility

- **Informational illustration** — must have `role="img"` and a clear,
  human-readable `aria-label`. Example: *"Illustration of an AI mentor
  having a conversation with a learner"*.
- **Decorative illustration** — must use `aria-hidden="true"` and
  `focusable="false"` so screen readers skip it.
- **Colour contrast** — text inside SVGs always uses navy or white on a
  coloured fill, never light grey on white.
- **Motion** — long-running animations must respect
  `@media (prefers-reduced-motion: reduce)`.
- **Focus** — illustrations are not interactive. If you ever wrap one in
  a link, the link is what receives focus — not the SVG.

---

## 7. Performance

| Metric | Estimate |
|---|---|
| Components in library | 18+ named exports |
| Avg raw component size | ~3.5 KB |
| Library raw total | ~60-80 KB across all files |
| Per-page impact (typical hero + 1 flow) | ~6-10 KB raw, ~2-3 KB gzipped |
| Network requests | 0 (inlined into the JS bundle that imports them) |
| LCP impact | None (no image decode, no CDN round trip) |
| Re-render cost | Constant — pure functional components, no state |

Because every component is a tree-shakeable named export, only the
illustrations actually imported by a page end up in the bundle for that
route.

---

*Owner:* longcare.au design system. Update this document whenever a new
illustration is added — see §4.
