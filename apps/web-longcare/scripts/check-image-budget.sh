#!/usr/bin/env bash
# Image budget guardrail — warns if any image in public/ exceeds the byte
# budget. Wire this into CI before `pnpm build` so an oversized asset fails
# the pipeline instead of regressing LCP in production.
#
# Tuning knobs (env vars):
#   THRESHOLD_KB   default 500. Anything over this fails the script.
#   PUBLIC_DIR     default `public`. Resolved relative to the script's parent.
#
# Exit codes:
#   0  — all images under budget (or no public/ dir to scan)
#   1  — at least one image exceeds THRESHOLD_KB
set -euo pipefail

THRESHOLD_KB="${THRESHOLD_KB:-500}"
PUBLIC_DIR="${PUBLIC_DIR:-public}"

# Resolve relative to the script location so the same file works whether
# invoked from the repo root (`bash scripts/check-image-budget.sh`) or from
# inside CI (`bash apps/web-longcare/scripts/check-image-budget.sh`).
cd "$(dirname "$0")/.."

if [[ ! -d "$PUBLIC_DIR" ]]; then
  echo "no $PUBLIC_DIR — skipping image budget check"
  exit 0
fi

# `-printf` is GNU find specific; Ubuntu CI runners ship coreutils so this is
# safe. `%P` is the path relative to the search root, `%s` is the byte size.
# `_original/` holds Sprint 7 safety copies of pre-optimization assets and is
# never served by next/image — skip it so the budget tracks shipped bytes only.
over=$(find "$PUBLIC_DIR" -maxdepth 4 \
  -path "$PUBLIC_DIR/_original" -prune -o \
  \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \
     -o -iname "*.webp" -o -iname "*.avif" -o -iname "*.gif" \) \
  -size +"${THRESHOLD_KB}"k -printf "%P\t%s\n" 2>/dev/null | sort -t$'\t' -k2 -rn)

if [[ -n "$over" ]]; then
  echo "Images exceeding ${THRESHOLD_KB}KB:"
  printf "%s\n" "$over" | while IFS=$'\t' read -r file bytes; do
    printf "  %s — %dKB\n" "$file" "$((bytes/1024))"
  done
  echo
  echo "Hint: re-encode with sharp (AVIF q=55 / WebP q=82) or run cwebp / avifenc."
  echo "      docs/IMAGE_STRATEGY.md has the full pipeline."
  exit 1
fi

echo "All images under ${THRESHOLD_KB}KB budget."
