# Image Strategy — longcare.au

Operational playbook for raster assets in `apps/web-longcare/public/`. Goal:
ship the smallest correct image for every viewport while keeping originals
intact for re-encoding.

## Format priority

`next/image` negotiates the best format per request via the `Accept` header.
As of Sprint 8 we explicitly opt-in to AVIF first in `next.config.ts`:

```ts
images: {
  formats: ['image/avif', 'image/webp'],
}
```

Preference order on disk:

1. **AVIF** — best compression, slowest to encode. Now the default for
   any hero / banner asset and any logo where text edges survive q≥70.
2. **WebP** — universal modern format kept as the second negotiation tier
   so Safari ≤ 16, older Chrome on locked-down devices, and inline email
   clients still get a modern-codec response.
3. **PNG / JPEG** — preserved as the fallback. Older browsers and screen
   readers may still request the original; `next/image` falls back cleanly.
4. **SVG** — always preferred for logos, icons, and illustrations.
   No compression step required.

When `banner-hero.avif`, `banner-hero.webp`, and `banner-hero.png` all exist
on disk, `<Image src="/banner-hero.png" />` serves AVIF → WebP → PNG depending
on the request's `Accept` header. The optimizer can transcode AVIF on the fly
from the source PNG, but pre-encoded siblings save Cloud Run CPU on the cold
hit and keep our LCP P95 stable.

## Audit (current state, top assets)

Monorepo `apps/web-longcare/public/` after Sprint 7 (PNG/WebP) + Sprint 8 (AVIF):

| Asset | Original | PNG re-encode | WebP (q=82) | AVIF (q=55–70) | Saving vs original |
|---|---:|---:|---:|---:|---:|
| banner-hero.png | 2 072 KB | 729 KB | 207 KB | **185 KB** (q=55) | -91.1 % |
| logo.png | 550 KB | 56 KB | 72 KB | **41 KB** (q=70) | -92.5 % |
| longcare-intro-poster.jpg | 14 KB | n/a | n/a | n/a | already optimal |
| og-image.svg | 3.5 KB | n/a | n/a | n/a | vector |

Standalone `/home/longcare.au/public/` (Sprint 7 sweep not yet replicated —
only AVIF was added in Sprint 8):

| Asset | Original PNG / JPG | AVIF (Sprint 8) | Saving |
|---|---:|---:|---:|
| logo.png | 550 KB | **38 KB** (q=70) | -93.1 % |
| longcare.au_banner_10 may_latest.png | 2 122 KB | **140 KB** (q=55) | -93.4 % |
| longcare-intro-poster.jpg | 583 KB | not yet encoded | — |

Sprint 7 originals are preserved in `apps/web-longcare/public/_original/` for
safe rollback. The standalone repo carries its own originals untouched on
disk (no `_original/` mirror yet — Agent AE's domain).

### Why AVIF q=55 for the banner?

A quality sweep on `banner-hero.png` against the WebP baseline (207 KB at
q=82):

| AVIF quality | Size | vs WebP |
|---:|---:|---:|
| 50 | 134 KB | -36 % |
| **55** | **185 KB** | **-11 %** |
| 60 | 234 KB | +13 % |
| 65 | 281 KB | +36 % |

q=55 was picked as the lowest-cost quality that still beats WebP at the
same visual band; q=50 introduces visible blocking on the gradient sky in
the hero. `effort: 6` (sharp default) keeps encode time under 25 s per
file on Cloud Run build hosts.

## When to compress

- **Always**: hero / banner images > 500 KB, product photography,
  testimonials, course thumbnails.
- **Usually**: any PNG > 200 KB that is not a logo/icon.
- **Sometimes**: PNGs in the 50–200 KB range — measure first, palette
  quantization can halve them.
- **Never** (skip):
  - SVGs (already vector — run SVGO once if hand-authored, then stop).
  - Logos under 50 KB once palette-optimized.
  - Files served by a third party (Stripe, Firebase, Google avatars).
  - PNGs with hard alpha gradients where WebP would visibly band.

## Tools

| Tool | Use | Install |
|---|---|---|
| `sharp` (libvips) | Programmatic WebP / AVIF / PNG re-encode | `pnpm add -D sharp` (already in monorepo via Next 15) |
| `pngquant` | Lossy PNG palette quantization | `apt install pngquant` |
| `cwebp` | One-shot CLI WebP | `apt install webp` |
| `avifenc` | One-shot CLI AVIF | `apt install libavif-bin` |
| `oxipng` | Lossless PNG re-compression | `cargo install oxipng` |

This sweep used `sharp@0.34.5` (resolved through the monorepo's pnpm
store) because `pngquant`, `cwebp`, and `avifenc` are not installed on
the build host.

### Recipe (sharp, Node)

```js
const sharp = require('sharp');
await sharp('public/banner-hero.png')
  .webp({ quality: 82 })
  .toFile('public/banner-hero.webp');
```

For lossless PNG re-encode (works well on flat UI art like logos):

```js
await sharp(src).png({
  compressionLevel: 9,
  adaptiveFiltering: true,
  palette: true,         // index-color quantization
  effort: 10,
}).toFile(tmp);
```

Only swap the original if `tmp` is smaller — the script in this sweep
falls back to the source when it is not.

### AVIF conversion pipeline (Sprint 8)

```js
const sharp = require('sharp');

// Hero / banner photography — push quality low; AVIF holds up at q=55.
await sharp('public/banner-hero.png')
  .avif({ quality: 55, effort: 6 })
  .toFile('public/banner-hero.avif');

// Logo / icon raster — bump quality so text edges stay sharp.
await sharp('public/logo.png')
  .avif({ quality: 70, effort: 6 })
  .toFile('public/logo.avif');
```

Encode-time notes:

- `effort: 6` is sharp's max for AVIF and roughly doubles encode CPU over
  `effort: 4`; on a 2 MB banner expect ~25 s on Cloud Run build nodes.
- AVIF in sharp routes through libheif + AOMedia AV1 (`aom`). Confirm with
  `node -e "console.log(require('sharp').versions)"` — `aom` and `heif`
  must be present (they are in `sharp@0.34.5+`, libvips 8.17.3+).
- No external `avifenc`/`libavif-bin` install required. The whole pipeline
  is JS-only and works on the same toolchain that builds `next/image`.

### Decision matrix: which formats to ship per asset

| Asset class | PNG | WebP | AVIF | Notes |
|---|:-:|:-:|:-:|---|
| Hero / banner photography | yes (fallback) | yes | yes | All three siblings for max coverage |
| Logo (raster, < 100 KB source) | yes (fallback) | optional | yes | Skip WebP if AVIF is < PNG |
| Icon / illustration | SVG only | — | — | Vector beats both |
| OG / social card | PNG (canonical) | optional | optional | Crawlers often skip non-PNG |
| User upload avatar | original | yes (auto) | yes (auto) | Next optimizer handles transcoding |

## Asset naming conventions

- **kebab-case**, lowercase: `banner-hero.webp`, not `Banner_Hero.WEBP`.
- **No spaces**, no version suffixes (`logo-v2.png` is forbidden — use git).
- **Co-locate variants**: `banner-hero.png` + `banner-hero.webp` +
  `banner-hero.avif` share the same stem so the Next optimizer can find
  them.
- **Descriptive stem**: prefer `course-physio-thumb.webp` over `img-3.webp`.
- **No upload timestamps in filenames** (breaks `next/image` cache keys).

## `next/image` best practices

- Always pass explicit `width` and `height` (or `fill` with a sized parent)
  to prevent Cumulative Layout Shift.
- `priority` is for above-the-fold hero only — at most **one per page**.
  Every other `Image` should lazy-load (the default).
- Use `placeholder="blur"` with a `blurDataURL` for hero images > 200 KB
  so the LCP element looks instant.
- For decorative images set `alt=""` — screen readers will skip them.
- For static raster imports (`import hero from './hero.png'`), Next emits
  the blur placeholder automatically.
- Avoid `unoptimized={true}` unless the asset is already an SVG or an
  external CDN URL.

## next.config.ts

As of Sprint 8 the `images` block opts in to AVIF first:

```ts
images: {
  formats: ['image/avif', 'image/webp'],
}
```

Both repos (`apps/web-longcare` and the standalone `longcare.au`) carry the
same configuration so behaviour matches between the monorepo dev loop and
the production deploy. We deliberately did **not** set `minimumCacheTTL`
yet — leaving it at the Next default keeps cache invalidation predictable
while the audit is still active.

## CI guardrail (`scripts/check-image-budget.sh`)

The Sprint 8 image-budget script fails CI when any shipped asset under
`public/` exceeds the LCP byte budget (default 500 KB):

```bash
bash scripts/check-image-budget.sh           # 500 KB default
THRESHOLD_KB=300 bash scripts/check-image-budget.sh
```

Wiring:

- **Monorepo** — script lives at
  `apps/web-longcare/scripts/check-image-budget.sh`. Not yet registered in
  `package.json` scripts (Agent AE owns that file in Sprint 8); run via
  `bash` for now.
- **Standalone repo** — `scripts/check-image-budget.sh` plus a CI step in
  `.github/workflows/ci.yml` between *Lint* and *Build*.

Design choices:

- `_original/` is pruned from the scan — those are deliberate Sprint 7
  archive copies, never served by `next/image`.
- The script is intentionally strict (RC=1 on overage). The standalone
  repo currently fails the check on `logo.png` (550 KB) and
  `longcare.au_banner_10 may_latest.png` (2 072 KB); replicating Sprint 7
  PNG re-encodes there will land them under budget.
- For future ad-hoc allowances, prefer raising the file's per-build
  threshold via `THRESHOLD_KB=` on the failing CI step rather than
  branching the script. Keep the script's defaults aligned to real LCP
  budgets, not to historical state.

### Pre-commit alternative

If you also want a local gate before CI runs:

```bash
# .githooks/pre-commit
files=$(git diff --cached --name-only --diff-filter=A | \
  grep -E '\.(png|jpe?g)$' || true)
for f in $files; do
  size=$(stat -c %s "$f")
  if [ "$size" -gt 307200 ]; then
    echo "Image $f is $((size/1024))KB > 300KB. Run sharp/cwebp first." >&2
    exit 1
  fi
done
```

## Rollback

If a re-encoded PNG looks wrong in production, restore from the safety
copy:

```bash
cp apps/web-longcare/public/_original/banner-hero.png \
   apps/web-longcare/public/banner-hero.png
```

The `_original/` folder is intentionally not git-ignored so reviewers can
diff bit-for-bit if needed.
