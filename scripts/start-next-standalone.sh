#!/usr/bin/env bash
# Generic pm2 entrypoint for a Next.js app built with `output: 'standalone'`.
# Usage: APP_DIR=apps/booking-web PORT=3002 ./start-next-standalone.sh
#
# Loads .env from the monorepo root, then execs the standalone server.js
# from that app's .next/standalone/{APP_DIR}/server.js with the standalone
# bundle root as cwd so its bundled node_modules resolve correctly.
set -u

ROOT=/home/dovanlong/g.bookedai.au
APP_DIR=${APP_DIR:?APP_DIR (e.g. apps/booking-web) required}
PORT=${PORT:?PORT required}

cd "$ROOT"
if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env
  set +a
fi

export PORT
# Bash pre-populates HOSTNAME with the system name, so a `:-` default never
# fires — force the bind address explicitly. nginx connects via 127.0.0.1.
export HOSTNAME=0.0.0.0
export NODE_ENV=${NODE_ENV:-production}
export PATH="$PATH:/home/dovanlong/.nvm/versions/node/v24.15.0/bin"

STANDALONE="$ROOT/$APP_DIR/.next/standalone"

# Sync public/ + .next/static/ into standalone tree if not already linked.
# Next.js standalone output doesn't auto-include these; required for static asset + image serving.
STANDALONE_APP="$STANDALONE/$APP_DIR"
PUBLIC_SRC="$ROOT/$APP_DIR/public"
PUBLIC_DST="$STANDALONE_APP/public"
STATIC_SRC="$ROOT/$APP_DIR/.next/static"
STATIC_DST="$STANDALONE_APP/.next/static"

# Use rsync (idempotent, fast) if available; fallback to cp
if command -v rsync >/dev/null; then
  rsync -a --delete "$PUBLIC_SRC/" "$PUBLIC_DST/" 2>/dev/null || true
  rsync -a --delete "$STATIC_SRC/" "$STATIC_DST/" 2>/dev/null || true
else
  rm -rf "$PUBLIC_DST" "$STATIC_DST" 2>/dev/null
  cp -r "$PUBLIC_SRC" "$PUBLIC_DST" 2>/dev/null || true
  cp -r "$STATIC_SRC" "$STATIC_DST" 2>/dev/null || true
fi

exec /home/dovanlong/.nvm/versions/node/v24.15.0/bin/node "$STANDALONE/$APP_DIR/server.js"
