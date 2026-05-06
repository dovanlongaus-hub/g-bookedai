#!/bin/bash
# bookedai.au — System Status Check
cd /home/dovanlong/g.bookedai.au

echo "╔══════════════════════════════════════════╗"
echo "║     bookedai.au — System Status          ║"
echo "║     $(date '+%Y-%m-%d %H:%M:%S AEST')          ║"
echo "╚══════════════════════════════════════════╝"
echo ""

echo "=== Containers ==="
sudo docker compose ps --format "table {{.Name}}\t{{.Status}}" 2>/dev/null
echo ""

echo "=== Health Endpoints ==="
for svc in "API:8180" "Agent:8081" "Drive-Sync:8083"; do
  NAME=$(echo $svc | cut -d: -f1)
  PORT=$(echo $svc | cut -d: -f2)
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 "http://localhost:$PORT/health" 2>/dev/null)
  [ "$CODE" = "200" ] && echo "  ✓ $NAME (:$PORT)" || echo "  ✗ $NAME (:$PORT) → $CODE"
done
echo ""

echo "=== External URLs ==="
for domain in g.bookedai.au admin.g.bookedai.au booking.g.bookedai.au app.g.bookedai.au; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 8 --resolve "$domain:443:34.40.164.84" "https://$domain" 2>/dev/null)
  [ "$CODE" = "200" ] && echo "  ✓ $domain" || echo "  ✗ $domain → $CODE"
done
echo ""

echo "=== Resources ==="
echo "  Disk: $(df -h / | awk 'NR==2{print $5 " used (" $3 "/" $2 ")"}')"
echo "  Memory: $(free -h | awk 'NR==2{print $3 "/" $2 " (" int($3/$2*100) "%)"}')"
echo "  Docker: $(docker system df --format '{{.Size}}' 2>/dev/null | head -1) images"
echo ""

echo "=== Recent Errors (last 1h) ==="
ERROR_COUNT=$(sudo docker compose logs --since 1h 2>/dev/null | grep -ci "error\|fail" 2>/dev/null || echo 0)
echo "  $ERROR_COUNT error/fail mentions in logs"
