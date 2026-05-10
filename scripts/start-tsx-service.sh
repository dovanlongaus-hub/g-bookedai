#!/usr/bin/env bash
# Generic pm2 entrypoint for a tsx-run TypeScript service in this monorepo.
# Usage: SERVICE_DIR=services/agent ./start-tsx-service.sh
#
# Sources .env from the monorepo root, then execs tsx via the service's local
# devDependency path (avoids the `sh: tsx not found` failure that pm2 hits
# when it spawns a restricted shell that can't resolve `npx tsx`).
set -u

ROOT=/home/dovanlong/g.bookedai.au
SERVICE_DIR=${SERVICE_DIR:?SERVICE_DIR (e.g. services/agent) required}
ENTRY=${ENTRY:-src/index.ts}

cd "$ROOT"
if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env
  set +a
fi

export NODE_ENV=${NODE_ENV:-production}
export PATH="$PATH:/home/dovanlong/.nvm/versions/node/v24.15.0/bin"

TSX_BIN="$ROOT/$SERVICE_DIR/node_modules/.bin/tsx"
if [[ ! -x "$TSX_BIN" ]]; then
  echo "FATAL: tsx not found at $TSX_BIN. Run \`pnpm add -D tsx --filter ./$SERVICE_DIR\` first." >&2
  exit 1
fi

exec "$TSX_BIN" "$SERVICE_DIR/$ENTRY"
