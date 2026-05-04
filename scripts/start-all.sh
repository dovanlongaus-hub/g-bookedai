#!/bin/bash
# Start all bookedai.au services for production
# Usage: ./scripts/start-all.sh

set -e
cd "$(dirname "$0")/.."
PROJECT_DIR=$(pwd)

echo "=== bookedai.au — Starting all services ==="
echo "Project: $PROJECT_DIR"
echo ""

# Load .env if exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
  echo "Loaded .env"
fi

# Defaults
export PORT_API=${PORT_API:-8090}
export PORT_AGENT=${PORT_AGENT:-8091}
export PORT_WEB_G=${PORT_WEB_G:-3000}
export PORT_LONGCARE=${PORT_LONGCARE:-3001}
export PORT_BOOKING=${PORT_BOOKING:-3002}
export PORT_USER=${PORT_USER:-3003}
export PORT_ADMIN=${PORT_ADMIN:-3004}
export DATABASE_URL=${DATABASE_URL:-postgresql://bookedai:localpass@localhost:5432/longcare}
export NODE_ENV=${NODE_ENV:-production}
export ALLOWED_ORIGINS="https://longcare.au,https://book.longcare.au,https://app.longcare.au,https://admin.longcare.au,https://g.longcare.au,http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004"

# Kill any existing processes on our ports
for port in $PORT_API $PORT_AGENT $PORT_WEB_G $PORT_LONGCARE $PORT_BOOKING $PORT_USER $PORT_ADMIN; do
  lsof -t -i:$port 2>/dev/null | xargs kill -9 2>/dev/null || true
done
sleep 1

echo "Starting services..."

# Backend
PORT=$PORT_API AGENT_SERVICE_URL=http://localhost:$PORT_AGENT \
  npx tsx services/api/src/index.ts &>/tmp/bookedai-api.log &
echo "  API         -> localhost:$PORT_API"

PORT=$PORT_AGENT \
  npx tsx services/agent/src/index.ts &>/tmp/bookedai-agent.log &
echo "  Agent       -> localhost:$PORT_AGENT"

sleep 2

# Frontend
NEXT_PUBLIC_API_URL=https://api.g.longcare.au \
  npx next dev --port $PORT_WEB_G apps/web-g-bookedai &>/tmp/bookedai-web-g.log &
echo "  AI Chat     -> localhost:$PORT_WEB_G  (g.longcare.au)"

NEXT_PUBLIC_API_URL=https://api.g.longcare.au \
  npx next dev --port $PORT_LONGCARE apps/web-longcare &>/tmp/bookedai-longcare.log &
echo "  Landing     -> localhost:$PORT_LONGCARE  (longcare.au)"

NEXT_PUBLIC_API_URL=https://api.g.longcare.au \
  npx next dev --port $PORT_BOOKING apps/booking-web &>/tmp/bookedai-booking.log &
echo "  Booking     -> localhost:$PORT_BOOKING  (book.longcare.au)"

NEXT_PUBLIC_API_URL=https://api.g.longcare.au \
  npx next dev --port $PORT_USER apps/user-app &>/tmp/bookedai-user.log &
echo "  Dashboard   -> localhost:$PORT_USER  (app.longcare.au)"

NEXT_PUBLIC_API_URL=https://api.g.longcare.au \
  npx next dev --port $PORT_ADMIN apps/admin-app &>/tmp/bookedai-admin.log &
echo "  Admin       -> localhost:$PORT_ADMIN  (admin.longcare.au)"

sleep 5
echo ""
echo "=== Status ==="
for port in $PORT_API $PORT_AGENT $PORT_WEB_G $PORT_LONGCARE $PORT_BOOKING $PORT_USER $PORT_ADMIN; do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://localhost:$port 2>/dev/null)
  echo "  Port $port: $code"
done

echo ""
echo "=== Live URLs ==="
echo "  https://g.longcare.au        (AI Chat)"
echo "  https://longcare.au          (Landing)"
echo "  https://book.longcare.au     (Booking)"
echo "  https://app.longcare.au      (Dashboard)"
echo "  https://admin.longcare.au    (Admin)"
echo "  https://api.longcare.au      (API)"
echo ""
echo "Logs: /tmp/bookedai-*.log"
