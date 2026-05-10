# LongCare AU — i18n Migration Guide

**Status:** Phase 1 delivered (client-side preview on `/about`). Phase 2 (server-side routing + middleware) deferred until product approval.
**Target locales:** `en-au` (default), `vi` (Vietnamese), `zh-cn` (Simplified Mandarin).
**Library:** [`next-intl`](https://next-intl-docs.vercel.app/) v4 on Next.js 15 App Router.

---

## 0. Phase status (this scaffold)

| Phase | Scope | Status |
|---|---|---|
| **Phase 1** | `next-intl` installed; `/about` rendered with `NextIntlClientProvider` + in-page `LocaleSwitcher`; URL stays `/about` for all locales; SEO metadata + JSON-LD remain English. | **Delivered** — proof of concept, no routing changes, zero risk of regressions. |
| **Phase 2** | Move `src/app/*` → `src/app/[locale]/*`; create `src/i18n/request.ts`; wire `createNextIntlPlugin` into `next.config.ts`; compose `next-intl` middleware with existing CORS/security middleware; localised `<html lang>`; per-locale metadata + hreflang. | **Deferred** — requires moving every page; ship after Phase 1 product validation. |
| **Phase 3** | Full localised SEO: `hreflang` link tags, sitemap × locale matrix, `og:locale:alternate`, schema `inLanguage` per page. | **Deferred** — depends on Phase 2. |
| **Phase 4** | TMS (Crowdin/Lokalise) integration; per-translator workflow; locale-aware notification service + booking flow. | **Deferred** — once volume justifies. |

**Phase 1 scope rationale.** Full server-side i18n routing requires moving the entire `src/app/*` tree into a `[locale]` segment and rewriting middleware — a major, risky refactor that affects every page. To prove the pattern and translation quality first, Phase 1 ships a client-side language preview on `/about` only: the URL never changes, the page hydrates in the user's chosen locale via `NextIntlClientProvider`, and engineers can copy the `about-translated.tsx` recipe to migrate further pages incrementally. Once product validates the translations, Phase 2 promotes the same `messages/*.json` to server-side rendering for SEO + hreflang.

---

## 0.1. Phase 1 migration recipe (use this for the next page)

This is the exact pattern shipped on `/about`. Copy it verbatim for any page you want to migrate to client-side language preview without touching routing or middleware.

**Step 1.** Add a new namespace to all three message files (`src/i18n/messages/{en,vi,zh}.json`). Keep the key shape identical across locales — missing keys throw at runtime.

```json
// en.json
"yourPage": {
  "heroTitle": "...",
  "heroSubtitle": "..."
}
```

**Step 2.** Create `src/app/<route>/<route>-translated.tsx` (client component). Skeleton:

```tsx
'use client';
import { useState } from 'react';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/locale-switcher';
import en from '@/i18n/messages/en.json';
import vi from '@/i18n/messages/vi.json';
import zh from '@/i18n/messages/zh.json';
import { defaultLocale, type Locale } from '@/i18n/config';

const messages: Record<Locale, Record<string, unknown>> = {
  'en-au': en as Record<string, unknown>,
  vi:      vi as Record<string, unknown>,
  'zh-cn': zh as Record<string, unknown>,
};

export function YourPageTranslated() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <div className="flex justify-end" style={{ marginBottom: '1.5rem' }}>
        <LocaleSwitcher current={locale} onChange={setLocale} />
      </div>
      <YourPageContent />
    </NextIntlClientProvider>
  );
}

function YourPageContent() {
  const t = useTranslations('yourPage');
  return <h1>{t('heroTitle')}</h1>;
}
```

**Step 3.** Convert `src/app/<route>/page.tsx` to a server component that keeps `metadata` + JSON-LD English (for SEO continuity) and renders `<YourPageTranslated />` for the body.

**Step 4.** Verify locally — switch language via the in-page picker, confirm all three locales render without "missing key" errors in the console.

**What this pattern does NOT do (intentionally):**

- Does **not** change the URL — `/about?lang=vi` is *not* what you get; locale is component state only.
- Does **not** localise `<html lang>` — server SSR keeps `lang="en"`.
- Does **not** emit `hreflang` tags or per-locale OG metadata.
- Does **not** translate content rendered by `layout.tsx` (Nav, Footer) — that's Phase 2.
- Does **not** support deep-linking to a specific language.

These limitations are deliberate. They keep Phase 1 risk-free (zero routing/middleware changes) while unblocking translation review on real pages. Anything that requires URL-level locale awareness must wait for Phase 2.

---

## 1. Why next-intl

We evaluated `next-intl`, `next-i18next`, and `next-translate`. We chose **next-intl** because:

- **Type-safe**: TypeScript autocompletes message keys; missing keys are compile-time errors.
- **Server Component first-class**: works with both RSC (`getTranslations`) and Client Components (`useTranslations`) without extra plumbing.
- **Native to Next 15 App Router**: ships an official `createNextIntlPlugin` for `next.config.ts` integration.
- **Locale-aware routing built-in**: `<Link>` wrapper handles prefix/no-prefix strategies and 301-redirect-free locale switching.
- **Healthy community**: most starred Next.js i18n library (matches what `apps/web-g-bookedai` already uses, so engineers context-switch cleanly).
- **ICU MessageFormat**: pluralisation, gender, numbers, dates handled out of the box — important for Mandarin (no plural inflection) and Vietnamese (classifier-based numbers).

We rejected `next-i18next` (Pages Router legacy) and `next-translate` (less active, weaker server-component story).

---

## 2. What's pre-built (after Phase 1)

| File | Purpose | Phase |
|---|---|---|
| `src/i18n/config.ts` | Locale list (`en-au`, `vi`, `zh-cn`), default locale, label/flag map. | 0 (scaffold) |
| `src/i18n/messages/en.json` | English baseline (~110 keys including `about`). **Source of truth** — every other locale mirrors this shape. | 0 + 1 |
| `src/i18n/messages/vi.json` | Vietnamese, professional/business register. **Needs native-speaker review** for `about` keys added in Phase 1. | 0 + 1 |
| `src/i18n/messages/zh.json` | Simplified Mandarin, professional register. **Needs native-speaker review** for `about` keys added in Phase 1. | 0 + 1 |
| `src/components/locale-switcher.tsx` | Accessible client component (combobox-style listbox). Now consumed by `about-translated.tsx`; nav-level wiring waits for Phase 2. | 0 |
| `src/app/about/about-translated.tsx` | **Phase 1 reference implementation.** Wraps About content in `NextIntlClientProvider` + in-page `LocaleSwitcher`. Copy this pattern for other pages. | 1 |
| `src/app/about/page.tsx` | Server component: keeps `metadata` + JSON-LD English; renders `<AboutTranslated />` for the body. | 1 |
| `package.json` | `next-intl` dependency added. | 1 |
| `docs/longcare/I18N_GUIDE.md` | This document. | 0 + 1 |

What Phase 1 deliberately does **not** touch:

- `next.config.ts` (no `createNextIntlPlugin` wrapping)
- `src/middleware.ts` (CORS middleware unchanged — composing `next-intl` middleware on top is Phase 2)
- `src/app/layout.tsx` (root layout still server-renders English Nav/Footer)
- Any page outside `src/app/about/`
- No `[locale]` dynamic segment in `src/app/`

Result: the running site is unchanged for English visitors, and `/about` gains a language preview that engineers can extend page-by-page using the recipe in §0.1.

---

## 3. Phase 2 wire-up checklist (server-side routing migration)

These are the steps to promote Phase 1's client-side preview to full server-rendered i18n. Run them in order — each step compiles independently, never skip.

1. **Install package** *(already done in Phase 1)*
   ```bash
   pnpm --filter @bookedai/web-longcare add next-intl
   ```

2. **Wrap `next.config.ts`**
   ```ts
   import createNextIntlPlugin from 'next-intl/plugin';
   const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
   export default withNextIntl(nextConfig);
   ```

3. **Create `src/i18n/request.ts`**
   ```ts
   import { getRequestConfig } from 'next-intl/server';
   import { locales, defaultLocale, type Locale } from './config';

   export default getRequestConfig(async ({ requestLocale }) => {
     const requested = await requestLocale;
     const locale = (locales as readonly string[]).includes(requested ?? '')
       ? (requested as Locale)
       : defaultLocale;
     return {
       locale,
       messages: (await import(`./messages/${locale === 'en-au' ? 'en' : locale === 'zh-cn' ? 'zh' : locale}.json`)).default,
     };
   });
   ```

4. **Move app routes into `[locale]` segment**
   - Move `src/app/*` → `src/app/[locale]/*` (Next 15 dynamic segment).
   - Keep root `src/app/layout.tsx` minimal (HTML shell only); locale-aware logic moves to `src/app/[locale]/layout.tsx`.
   - Update every `import` path that referenced the old structure.

5. **Update middleware**
   - Existing middleware (CORS / security headers) stays.
   - Add next-intl locale detection via composition:
     ```ts
     import createIntlMiddleware from 'next-intl/middleware';
     import { locales, defaultLocale } from '@/i18n/config';

     const intlMiddleware = createIntlMiddleware({
       locales,
       defaultLocale,
       localePrefix: 'as-needed',
     });

     export function middleware(req: NextRequest) {
       const intlResponse = intlMiddleware(req);
       // Apply existing CORS / security header logic on top of intlResponse.
       return intlResponse;
     }
     ```
   - **Risk:** middleware order matters. Intl must run first; security headers layer on top.

6. **Replace hard-coded strings**
   - Server Components: `import { getTranslations } from 'next-intl/server'; const t = await getTranslations('nav');`
   - Client Components: `import { useTranslations } from 'next-intl'; const t = useTranslations('cta');`
   - Use the shape `t('bookConsult')` to render `nav.bookConsult`.

7. **Update `getPageMetadata` helper**
   - Accept `locale` parameter.
   - Return localised `title`, `description`, and `alternates.languages` map for `hreflang` SEO.

8. **Wire `LocaleSwitcher` into `nav.tsx`**
   ```tsx
   import { useLocale } from 'next-intl';
   import { useRouter, usePathname } from 'next-intl/client';
   const locale = useLocale() as Locale;
   const router = useRouter();
   const pathname = usePathname();
   <LocaleSwitcher current={locale} onChange={(l) => router.replace(pathname, { locale: l })} />
   ```

9. **Test all 3 locales**
   - `/services` → English (default, no prefix).
   - `/vi/services` → Vietnamese.
   - `/zh-cn/services` → Mandarin.
   - Check: nav, footer, CTAs, error pages, metadata `<html lang>`, OG tags.

---

## 4. Locale URL strategy

We use **`localePrefix: 'as-needed'`** (next-intl built-in option):

| URL | Locale | Notes |
|---|---|---|
| `/services` | `en-au` | Default — no prefix. Existing inbound links keep working. |
| `/vi/services` | `vi` | Prefix required. |
| `/zh-cn/services` | `zh-cn` | Prefix required. |

Rationale:

- **SEO continuity**: existing English URLs ranked in Google AU don't break. Critical because LongCare has organic traffic on `/services`, `/blog/*`.
- **Cleaner default UX**: Australian visitors don't see `/en-au/` clutter.
- **Hreflang covers discoverability**: `<link rel="alternate" hreflang="vi" href="/vi/services">` tells Google about translated variants.

If we later expand to many locales (e.g. `en-sg`, `en-my` for APAC), revisit `localePrefix: 'always'` for clarity.

---

## 5. Translation workflow

**Phase 4 initial pass** (this scaffold):

1. Engineer edits `messages/en.json` whenever a new UI string ships.
2. Translator receives `en.json` as source.
3. Translator fills `vi.json` and `zh.json` mirroring the same key shape (no missing keys, no extra keys).
4. Native-speaker reviewer signs off (separate from translator — second pair of eyes).
5. PR merged.

**When volume grows** (>500 keys, multiple translators):

- Adopt a TMS: **Crowdin** (best Next.js integration) or **Lokalise** (good API, glossary management).
- Sync `messages/*.json` via TMS CLI in CI.
- Translation memory + glossary prevents drift on repeated terms ("AI Mentoring", "GST-inclusive").

**Glossary anchors** (do not translate inconsistently):

| English | Vietnamese | Mandarin |
|---|---|---|
| AI Mentor | Chuyên gia AI / Cố vấn AI | AI 导师 |
| GST-inclusive | Đã bao gồm GST | 含 GST |
| AI Readiness Assessment | Đánh giá Mức độ Sẵn sàng AI | AI 就绪度评估 |
| Australian SME | Doanh nghiệp vừa và nhỏ Úc | 澳大利亚中小企业 |
| Booking | Đặt lịch | 预约 |
| Consultation | Tư vấn | 咨询 |

---

## 6. Schema.org per locale

Every page emitting JSON-LD must declare language:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "1-Hour AI Mentor Session",
  "inLanguage": "en-AU",
  "availableLanguage": ["en-AU", "vi", "zh-Hans"],
  "provider": { "@type": "Organization", "name": "LongCare AU" }
}
```

**Rules:**

- `inLanguage`: BCP 47 tag for *this* page's content (`en-AU`, `vi`, `zh-Hans`).
- `availableLanguage`: array of *all* localised variants (helps voice assistants and Google Knowledge Graph).
- For `Article`/`BlogPosting`: also set `inLanguage` on each translated post.
- `Course` / `LearningResource`: include `inLanguage` and `teaches` translated.

Update `src/components/schema-markup.tsx` to accept a `locale` prop and emit the correct tag.

---

## 7. SEO impact

When wiring i18n, ship these SEO signals together:

**A. `<link rel="alternate" hreflang>` in `<head>`**

```html
<link rel="alternate" hreflang="en-au" href="https://longcare.au/services" />
<link rel="alternate" hreflang="vi" href="https://longcare.au/vi/services" />
<link rel="alternate" hreflang="zh-cn" href="https://longcare.au/zh-cn/services" />
<link rel="alternate" hreflang="x-default" href="https://longcare.au/services" />
```

`x-default` is mandatory — tells Google what to serve unknown locales.

**B. `og:locale` and `og:locale:alternate`**

```html
<meta property="og:locale" content="en_AU" />
<meta property="og:locale:alternate" content="vi_VN" />
<meta property="og:locale:alternate" content="zh_CN" />
```

(Note: OpenGraph uses underscore, hreflang uses hyphen.)

**C. Sitemap with `xhtml:link` entries**

```xml
<url>
  <loc>https://longcare.au/services</loc>
  <xhtml:link rel="alternate" hreflang="vi" href="https://longcare.au/vi/services" />
  <xhtml:link rel="alternate" hreflang="zh-cn" href="https://longcare.au/zh-cn/services" />
</url>
```

Update `src/app/sitemap.ts` to emit one entry per URL × locale pair.

**D. `<html lang>` per page** — set from current locale in `[locale]/layout.tsx`.

---

## 8. Estimated effort

| Phase | Scope | Effort |
|---|---|---|
| Initial wire-up | Install, configure, move to `[locale]`, middleware composition, wire LocaleSwitcher | **4–6 dev days** |
| Per-page migration | Replace hard-coded strings, update metadata helpers | **30–60 min per page** (~50 routes = 25–50 dev days, parallelisable) |
| Translation review | Native-speaker validation per language | **2–4 days per language** |
| QA / regression | Visual diff across 3 locales, e2e booking flow, schema validation | **3–5 days** |
| **Total** | | **~6–8 weeks elapsed for full migration** |

Smaller scope alternatives:

- **Hub pages only** (homepage + 6 service hubs + nav/footer): ~2 weeks elapsed. Good for initial APAC marketing splash.
- **Marketing surfaces only** (no booking flow / no academy quiz): ~3 weeks. Booking flow stays English while we learn locale demand.

---

## 9. Risks

1. **Middleware composition** — next-intl middleware and existing CORS/security middleware must compose cleanly. Rewriting middleware is the highest-risk step. Mitigation: write tests for both rewrite + header-injection paths before merging.
2. **Hard-coded strings deep in components** — `lib/`, error boundaries, toast messages may have English literals. Mitigation: ESLint rule (`react/jsx-no-literals` configured for warning) during migration sprint.
3. **Date/number formatting** — `Date.toLocaleString()` calls across the app must accept locale. Vietnamese uses `dd/MM/yyyy`; Mandarin uses `yyyy年MM月dd日`. Currency stays AUD ($) but mention "AUD" explicitly in non-AU locales.
4. **Pluralisation** — Vietnamese has no grammatical plural; Mandarin has no plural inflection. ICU MessageFormat handles both correctly — don't manually concatenate.
5. **CMS bilingual posts** — Blog/MDX content needs a translation strategy: separate `posts/en/*.mdx`, `posts/vi/*.mdx`, `posts/zh-cn/*.mdx`. Author can mark a post "EN-only" — sitemap omits hreflang for that slug.
6. **Booking confirmation emails** — notification service must accept `locale` per booking. Out of scope here, but track in `services/notification`.
7. **Form validation messages** — Zod error messages need locale context. Use `zod-i18n-map` package.
8. **Search engine indexing lag** — expect 4–8 weeks for Google to fully index new `/vi/*` and `/zh-cn/*` URLs. Submit sitemap manually via Search Console on launch day.

---

## 10. Out of scope for this scaffold

The following are **not** addressed and need separate planning if/when relevant:

- **RTL languages** (Arabic, Hebrew). Tailwind RTL plugin + `dir="rtl"` plumbing not configured.
- **Currency conversion** — only AUD displayed. SGD/MYR/USD multi-currency requires a pricing service, FX rate cache, and tax-rule engine per region. Defer until APAC demand justifies it.
- **Region-specific compliance copy** — Vietnamese visitors viewing AU pricing still see "GST-inclusive · APP 1-13"; we don't yet say "for purchases from Australia" disclaimers.
- **Voice / accessibility translations** — screen reader announcements and `aria-label`s in `vi.json` / `zh.json` only cover the LocaleSwitcher; other components need a sweep.
- **Marketing campaigns** — UTM-tagged campaign landing pages are tenant-specific and translated separately by the marketing-agent service.
- **Booking flow on `book.longcare.au`** — separate Next.js app at port 3002. Has its own i18n scaffold need; out of scope here.
- **Email / SMS templates** — `services/notification` currently English-only. Tracked separately.
- **Academy course content** — videos, transcripts, quizzes need localisation pipeline (subtitle files, dubbed audio, translated quiz banks). Massive content effort, separate roadmap.
