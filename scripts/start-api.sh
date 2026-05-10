#!/usr/bin/env bash
# pm2 entrypoint for the API service. Loads .env into the process environment
# and runs tsx via its absolute path so that pm2's restricted shell PATH
# doesn't drop the binary lookup. Don't `set -e` — the caller (pm2) handles
# crashes via the auto-restart policy.
set -u

cd /home/dovanlong/g.bookedai.au

# Source .env, tolerating values with spaces by quoting where needed in the
# file itself. `set -a` auto-exports every assignment.
if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env
  set +a
fi

export PORT="${PORT:-8090}"
export PATH="$PATH:/home/dovanlong/g.bookedai.au/services/api/node_modules/.bin:/home/dovanlong/.nvm/versions/node/v24.15.0/bin"

exec /home/dovanlong/g.bookedai.au/services/api/node_modules/.bin/tsx services/api/src/index.ts
