#!/bin/bash
# bookedai.au — Deployment Script
# Usage: ./scripts/deploy.sh [service|all]
set -e

SERVICE="${1:-all}"
PROJECT_DIR="/home/dovanlong/g.bookedai.au"
cd "$PROJECT_DIR"

echo "=== bookedai.au Deploy: $SERVICE ==="
echo "Time: $(date)"

# Kill conflicting ports
echo "[1/5] Clearing ports..."
for port in 3000 3001 3002 3003 3004 8180 8081 8082 8083 8084; do
  sudo fuser -k $port/tcp 2>/dev/null || true
done
sleep 2

# Build
echo "[2/5] Building $SERVICE..."
if [ "$SERVICE" = "all" ]; then
  sudo docker compose build 2>&1 | grep -E "Built|ERROR"
else
  sudo docker compose build "$SERVICE" 2>&1 | grep -E "Built|ERROR"
fi

# Deploy
echo "[3/5] Deploying..."
sudo docker compose down 2>/dev/null || true
sleep 2
sudo docker compose up -d 2>&1 | grep -E "Started|Error"

# Wait for health
echo "[4/5] Waiting for health checks..."
sleep 10
HEALTHY=0
for i in $(seq 1 12); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://localhost:8180/health 2>/dev/null)
  if [ "$STATUS" = "200" ]; then
    HEALTHY=1
    break
  fi
  echo "  Waiting... (attempt $i/12)"
  sleep 5
done

if [ $HEALTHY -eq 1 ]; then
  echo "  API healthy!"
else
  echo "  WARNING: API not responding"
fi

# Sync Drive
echo "[5/5] Syncing to Google Drive..."
curl -s --max-time 60 -X POST http://localhost:8083/sync/everything > /dev/null 2>&1 && echo "  Drive sync triggered" || echo "  Drive sync skipped"

# Report
echo ""
echo "=== Deploy Complete ==="
sudo docker compose ps --format "table {{.Name}}\t{{.Status}}" 2>/dev/null
echo ""
echo "Endpoints:"
for url in "http://localhost:8180/health" "http://localhost:3000" "http://localhost:8081/health" "http://localhost:8083/health"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 "$url" 2>/dev/null)
  echo "  [$CODE] $url"
done
