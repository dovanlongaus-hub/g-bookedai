# Incident Response Playbook — bookedai.au

> **Version:** 1.0 | **Date:** 2026-05-04
> **On-Call:** _________________________ | **Escalation:** _________________________

---

## Severity Levels

| Level | Definition | Response Time | Examples |
|-------|-----------|---------------|----------|
| **SEV-1** | Complete outage, all users affected | Immediate (< 15 min) | All domains down, database unreachable, payment system broken |
| **SEV-2** | Major feature broken, many users affected | < 30 min | Booking flow broken, admin dashboard down, Stripe webhooks failing |
| **SEV-3** | Minor feature broken, workaround exists | < 2 hours | Chat widget not responding, email notifications delayed, one page 500 error |
| **SEV-4** | Cosmetic or low-impact issue | Next business day | Styling glitch, typo, non-critical log warning |

---

## Escalation Matrix

| Role | Contact | Responsibility |
|------|---------|---------------|
| **On-Call Engineer** | [PRIMARY PHONE/EMAIL] | First responder, triage, initial fix |
| **Tech Lead** | [TECH LEAD PHONE/EMAIL] | Architecture decisions, complex debugging |
| **Product Owner** | [PO PHONE/EMAIL] | Business impact assessment, customer communication |
| **Infrastructure** | [INFRA PHONE/EMAIL] | Server, DNS, Cloudflare, GCE access |
| **Stripe Support** | https://support.stripe.com | Payment platform issues |
| **Cloudflare Support** | https://dash.cloudflare.com | DNS and CDN issues |
| **Google Cloud Support** | https://console.cloud.google.com/support | GCE, Firebase, Google APIs |

---

## Incident Response Process

### 1. Detect
- Uptime monitor alerts (email/SMS)
- Customer reports
- Error rate spike in logs
- Stripe webhook failure notifications

### 2. Triage
- Determine severity level (SEV-1 to SEV-4)
- Identify affected services and users
- Begin incident log with timestamp

### 3. Communicate
- SEV-1/SEV-2: Notify all stakeholders immediately
- Post status update to team channel
- If customer-facing: prepare status page message

### 4. Resolve
- Follow relevant runbook below
- Make smallest possible change to restore service
- Verify fix with health checks

### 5. Post-Mortem
- Document timeline, root cause, and resolution
- Identify preventive measures
- Update runbooks if needed

---

## Runbook 1: Site Down (One or More Domains Unreachable)

**Symptoms:** Browser shows connection timeout, ERR_CONNECTION_REFUSED, or 502 Bad Gateway.

### Step 1: Check DNS Resolution
```bash
# Verify DNS resolves to correct IP
dig g.bookedai.au +short
dig api.g.bookedai.au +short
dig booking.g.bookedai.au +short
# Expected: 34.40.164.84 (or Cloudflare IPs for proxied domains)

# If DNS fails → Check Cloudflare dashboard
# Login: https://dash.cloudflare.com
# Verify DNS records exist and are active
```

### Step 2: Check Server Reachability
```bash
# SSH into server
ssh dovanlong@34.40.164.84

# Check if server is responsive
ping -c 3 34.40.164.84

# If unreachable → Check GCE Console
# https://console.cloud.google.com/compute/instances
# Verify VM is running in australia-southeast1
# Check firewall rules allow ports 80, 443, 22
```

### Step 3: Check Nginx
```bash
# Check Nginx status
sudo systemctl status nginx

# If stopped, start it
sudo systemctl start nginx

# If fails to start, check config
sudo nginx -t

# Check Nginx error log
sudo tail -50 /var/log/nginx/error.log

# Common fixes:
# - Config syntax error: fix and reload
# - Port conflict: check what's on port 80/443
sudo lsof -i :80
sudo lsof -i :443

# Reload Nginx after fixes
sudo systemctl reload nginx
```

### Step 4: Check PM2 Processes
```bash
# List all PM2 processes
pm2 list

# Expected: 9 processes online
# api (8080), agent (8081), web-g-bookedai (3000), web-longcare (3001),
# booking-web (3002), user-app (3003), admin-app (3004), notification (8082),
# drive-sync (8083)

# If processes are stopped/errored:
pm2 restart all

# If specific process keeps crashing:
pm2 logs <process-name> --lines 100

# If ecosystem config issue:
pm2 stop all
pm2 start ecosystem.config.cjs

# Nuclear option (last resort):
pm2 kill
pm2 start ecosystem.config.cjs
```

### Step 5: Check Docker Containers (if using Docker)
```bash
# List running containers
docker compose ps

# If containers are down:
docker compose up -d

# Check container logs:
docker compose logs --tail 100 <service-name>

# Rebuild if needed:
docker compose build <service-name>
docker compose up -d <service-name>
```

**Recovery verification:**
```bash
curl -s https://api.g.bookedai.au/health | jq .
curl -s -o /dev/null -w "%{http_code}" https://g.bookedai.au
curl -s -o /dev/null -w "%{http_code}" https://booking.g.bookedai.au
curl -s -o /dev/null -w "%{http_code}" https://admin.g.bookedai.au
curl -s -o /dev/null -w "%{http_code}" https://app.g.bookedai.au
curl -s -o /dev/null -w "%{http_code}" https://longcare.au
```

---

## Runbook 2: Database Connection Issues

**Symptoms:** API returns 500 errors, /health shows `"db": "disconnected"`, booking/payment operations fail.

### Step 1: Check PostgreSQL Status
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# If stopped:
sudo systemctl start postgresql

# Check PostgreSQL logs
sudo tail -50 /var/log/postgresql/postgresql-16-main.log
```

### Step 2: Check Connection from API
```bash
# Test database connectivity directly
psql -h localhost -U bookedai -d bookedai -c "SELECT 1;"

# If connection refused:
# Check PostgreSQL is listening
sudo ss -tlnp | grep 5432

# Check pg_hba.conf for access rules
sudo cat /etc/postgresql/16/main/pg_hba.conf | grep -v "^#" | grep -v "^$"

# Check postgresql.conf listen_addresses
sudo grep listen_addresses /etc/postgresql/16/main/postgresql.conf
```

### Step 3: Check Connection Pool
```bash
# Check active connections
psql -h localhost -U bookedai -d bookedai -c "SELECT count(*) FROM pg_stat_activity;"

# Check max connections
psql -h localhost -U bookedai -d bookedai -c "SHOW max_connections;"

# If connections are exhausted:
# Kill idle connections
psql -h localhost -U bookedai -d bookedai -c "
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE state = 'idle' 
AND pid <> pg_backend_pid()
AND query_start < now() - interval '10 minutes';
"

# Restart API to reset connection pool
pm2 restart api
```

### Step 4: Check Database Integrity
```bash
# Verify tables exist
psql -h localhost -U bookedai -d bookedai -c "\dt"
# Expected: 16 tables

# Check disk space (PostgreSQL needs space for WAL)
df -h /var/lib/postgresql

# If low on disk:
# 1. Clean old WAL files
# 2. Vacuum database
psql -h localhost -U bookedai -d bookedai -c "VACUUM FULL;"
```

### Step 5: Check Redis
```bash
# Check Redis status
sudo systemctl status redis

# If stopped:
sudo systemctl start redis

# Test Redis connectivity
redis-cli ping
# Expected: PONG

# Check Redis memory
redis-cli info memory | grep used_memory_human
```

**Recovery verification:**
```bash
curl -s https://api.g.bookedai.au/health | jq .
# Expected: { "status": "ok", "db": "connected" }
```

---

## Runbook 3: Payment Failures

**Symptoms:** Customers cannot complete payments, Stripe Checkout fails, webhook events not processing, bookings stuck in PENDING_PAYMENT.

### Step 1: Check Stripe Dashboard
```
1. Login to https://dashboard.stripe.com
2. Check "Developers > Events" for recent failures
3. Check "Developers > Webhooks" for delivery failures
4. Check "Payments" for declined transactions
```

### Step 2: Check Webhook Delivery
```bash
# Check webhook logs in admin dashboard
# https://admin.g.bookedai.au → Webhook Logs

# Check API logs for webhook errors
pm2 logs api --lines 200 | grep -i "webhook\|stripe\|payment"

# Verify webhook endpoint is reachable
curl -s -o /dev/null -w "%{http_code}" https://api.g.bookedai.au/webhooks/stripe
# Note: POST without valid signature should return 400, not 404 or 500
```

### Step 3: Check Stripe Configuration
```bash
# Verify Stripe keys are set (DO NOT log the actual values)
grep -c "STRIPE_SECRET_KEY" /home/dovanlong/g.bookedai.au/.env
grep -c "STRIPE_WEBHOOK_SECRET" /home/dovanlong/g.bookedai.au/.env
grep -c "STRIPE_PUBLISHABLE_KEY" /home/dovanlong/g.bookedai.au/.env

# Verify keys are LIVE (not test)
grep "STRIPE_SECRET_KEY" /home/dovanlong/g.bookedai.au/.env | grep -c "sk_live"
# Expected: 1
```

### Step 4: Check Webhook Idempotency
```bash
# Check for stuck webhook events
psql -h localhost -U bookedai -d bookedai -c "
SELECT event_id, event_type, status, created_at 
FROM webhook_events 
ORDER BY created_at DESC 
LIMIT 20;
"

# Check for bookings stuck in PENDING_PAYMENT
psql -h localhost -U bookedai -d bookedai -c "
SELECT id, status, created_at, updated_at 
FROM bookings 
WHERE status = 'PENDING_PAYMENT' 
AND created_at < now() - interval '1 hour';
"
```

### Step 5: Manual Payment Confirmation (Emergency)
```bash
# If Stripe confirms payment but webhook failed:
# Manually update booking status
psql -h localhost -U bookedai -d bookedai -c "
UPDATE bookings 
SET status = 'CONFIRMED', updated_at = now() 
WHERE id = '<booking_id>' 
AND status = 'PENDING_PAYMENT';
"

# Then trigger notifications manually via API if needed
```

### Common Stripe Error Codes
| Code | Meaning | Action |
|------|---------|--------|
| card_declined | Customer's card was declined | Customer should try different card |
| expired_card | Card has expired | Customer should update card |
| insufficient_funds | Not enough funds | Customer should use different payment |
| webhook_endpoint_url_invalid | Webhook URL unreachable | Fix API endpoint, check Nginx/SSL |
| signature_verification_failed | Webhook secret mismatch | Rotate STRIPE_WEBHOOK_SECRET |

---

## Runbook 4: High Error Rate

**Symptoms:** Multiple 500 errors in logs, Sentry alerts firing, customers reporting errors.

### Step 1: Identify Error Source
```bash
# Check API error logs
pm2 logs api --lines 200 | grep -i "error\|500\|exception\|uncaught"

# Check Nginx error log
sudo tail -100 /var/log/nginx/error.log

# Check all PM2 process statuses
pm2 list
# Look for processes with high restart counts
```

### Step 2: Check Error Patterns
```bash
# Count errors by type in last hour
pm2 logs api --lines 1000 | grep -i "error" | sort | uniq -c | sort -rn | head 20

# Check if specific route is failing
pm2 logs api --lines 1000 | grep "500" | grep -oP '(GET|POST|PUT|DELETE) [^ ]+' | sort | uniq -c | sort -rn

# Check for memory issues
pm2 monit
# Or:
pm2 describe api | grep -i "memory\|restart\|uptime"
```

### Step 3: Check External Dependencies
```bash
# Test database
curl -s https://api.g.bookedai.au/health | jq .

# Test Redis
redis-cli ping

# Test Gemini API (agent service)
pm2 logs agent --lines 50 | grep -i "error\|timeout\|rate.limit"

# Test Google APIs
pm2 logs drive-sync --lines 50 | grep -i "error"
pm2 logs notification --lines 50 | grep -i "error"
```

### Step 4: Mitigate
```bash
# If a specific service is causing cascading failures:
pm2 restart <service-name>

# If memory is exhausted:
pm2 restart all

# If a specific route is hammered (possible attack):
# Add temporary rate limit in Nginx
sudo nano /etc/nginx/sites-enabled/<domain>
# Add: limit_req zone=one burst=5 nodelay;
sudo nginx -t && sudo systemctl reload nginx

# Check for DDoS
sudo tail -1000 /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head 20
# If single IP is flooding: block in Cloudflare or Nginx
```

### Step 5: Check Sentry/Error Tracking
```
1. Login to error tracking dashboard
2. Check error frequency and stack traces
3. Identify if recent deployment caused regression
4. Check if error is in application code vs infrastructure
```

**Recovery verification:**
```bash
# Monitor error rate for 5 minutes
watch -n 10 'pm2 logs api --lines 5 | grep -c "error"'

# Verify key endpoints
curl -s https://api.g.bookedai.au/health | jq .
curl -s https://api.g.bookedai.au/services | jq '. | length'
```

---

## Runbook 5: SSL Certificate Expired

**Symptoms:** Browser shows "Your connection is not private", ERR_CERT_DATE_INVALID, HTTPS requests fail.

### Step 1: Check Certificate Expiry
```bash
# Check certificate expiry for each domain
echo | openssl s_client -servername g.bookedai.au -connect 34.40.164.84:443 2>/dev/null | openssl x509 -noout -dates
echo | openssl s_client -servername api.g.bookedai.au -connect 34.40.164.84:443 2>/dev/null | openssl x509 -noout -dates
echo | openssl s_client -servername booking.g.bookedai.au -connect 34.40.164.84:443 2>/dev/null | openssl x509 -noout -dates

# Check all certbot certificates
sudo certbot certificates
```

### Step 2: Renew Certificates
```bash
# Attempt automatic renewal
sudo certbot renew

# If automatic renewal fails, try forced renewal
sudo certbot renew --force-renewal

# If specific domain fails:
sudo certbot certonly --nginx -d g.bookedai.au -d api.g.bookedai.au -d booking.g.bookedai.au -d app.g.bookedai.au -d admin.g.bookedai.au

# If DNS validation needed (Cloudflare):
# Temporarily set domain to DNS-only (not proxied) in Cloudflare
# Then run certbot with HTTP challenge
```

### Step 3: Verify and Reload
```bash
# Verify new certificate
sudo certbot certificates

# Reload Nginx to pick up new cert
sudo systemctl reload nginx

# Verify HTTPS works
curl -s -o /dev/null -w "%{http_code}" https://api.g.bookedai.au/health
```

### Step 4: Fix Auto-Renewal
```bash
# Check certbot timer
sudo systemctl status certbot.timer

# If timer is not active:
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test auto-renewal (dry run)
sudo certbot renew --dry-run
```

### Prevention
```bash
# Ensure Cloudflare subdomains are DNS-only (not proxied)
# Proxied domains use Cloudflare edge certificates
# DNS-only domains use Let's Encrypt certificates
# Certbot timer should run twice daily
```

---

## Runbook 6: Service Memory Leak / OOM

**Symptoms:** PM2 shows high restart count, processes consuming excessive memory, server becomes unresponsive.

### Step 1: Identify the Problem Process
```bash
# Check PM2 memory usage
pm2 list
# Look for processes with high memory (> 500MB) or high restart count

# Check system memory
free -h
top -b -n 1 | head 20
```

### Step 2: Restart Affected Process
```bash
# Graceful restart of specific process
pm2 restart <process-name> --update-env

# If process keeps crashing, check logs first
pm2 logs <process-name> --lines 200

# Set memory limit to auto-restart
pm2 start ecosystem.config.cjs --max-memory-restart 512M
```

### Step 3: Emergency Memory Recovery
```bash
# If server is nearly out of memory:
# 1. Restart the largest consumer first
pm2 restart api

# 2. Clear Redis cache if needed
redis-cli FLUSHDB

# 3. If still critical:
pm2 restart all

# 4. Nuclear option:
sudo sync
sudo sysctl -w vm.drop_caches=3
```

---

## Runbook 7: Google API Failures

**Symptoms:** Calendar events not created, Gmail notifications not sending, Drive sync failing.

### Step 1: Check Service Account
```bash
# Verify service account key exists
ls -la /home/dovanlong/g.bookedai.au/service-account*.json 2>/dev/null

# Check if Google API errors in logs
pm2 logs api --lines 100 | grep -i "google\|calendar\|gmail\|drive"
pm2 logs drive-sync --lines 100 | grep -i "error"
pm2 logs notification --lines 100 | grep -i "error"
```

### Step 2: Check API Quotas
```
1. Go to https://console.cloud.google.com/apis/dashboard
2. Check quota usage for Calendar, Gmail, Drive APIs
3. If quota exceeded: wait for reset or request increase
```

### Step 3: Check OAuth Consent
```
1. Go to https://console.cloud.google.com/apis/credentials/consent
2. Verify OAuth consent screen is approved (not in testing mode)
3. If in testing, only test users can authenticate
```

### Step 4: Test APIs Manually
```bash
# Test from the server
cd /home/dovanlong/g.bookedai.au
node -e "
const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: './service-account-key.json',
  scopes: ['https://www.googleapis.com/auth/calendar']
});
auth.getClient().then(c => console.log('Auth OK')).catch(e => console.error('Auth FAILED:', e.message));
"
```

---

## Post-Incident Template

Copy and fill out after every SEV-1 or SEV-2 incident:

```markdown
## Incident Report

**Date:** YYYY-MM-DD
**Duration:** HH:MM start → HH:MM resolved (X minutes)
**Severity:** SEV-X
**On-Call:** [Name]

### Summary
[1-2 sentence description of what happened]

### Impact
- Users affected: [number/percentage]
- Revenue impact: [estimated]
- Services affected: [list]

### Timeline
| Time (AEST) | Event |
|-------------|-------|
| HH:MM | [First alert/detection] |
| HH:MM | [Triage started] |
| HH:MM | [Root cause identified] |
| HH:MM | [Fix applied] |
| HH:MM | [Service restored] |
| HH:MM | [All clear confirmed] |

### Root Cause
[Detailed technical explanation]

### Resolution
[What was done to fix it]

### Prevention
- [ ] [Action item 1 — Owner — Due date]
- [ ] [Action item 2 — Owner — Due date]
- [ ] [Action item 3 — Owner — Due date]

### Lessons Learned
[What we learned and what we would do differently]
```

---

## Quick Reference Commands

### Health Checks
```bash
# All-in-one health check
for domain in g.bookedai.au api.g.bookedai.au booking.g.bookedai.au app.g.bookedai.au admin.g.bookedai.au longcare.au; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://$domain")
  echo "$domain: $status"
done
```

### Service Status
```bash
pm2 list                           # All processes
pm2 logs --lines 50                # Recent logs (all)
pm2 logs api --lines 100           # API logs
sudo systemctl status nginx        # Nginx
sudo systemctl status postgresql   # PostgreSQL
sudo systemctl status redis        # Redis
```

### Quick Restarts
```bash
pm2 restart api                    # Restart API only
pm2 restart all                    # Restart all services
sudo systemctl restart nginx       # Restart Nginx
sudo systemctl restart postgresql  # Restart PostgreSQL (caution: drops connections)
```

### Disk and Memory
```bash
df -h                              # Disk usage
free -h                            # Memory usage
du -sh /var/lib/postgresql         # Database size
du -sh /home/dovanlong/g.bookedai.au/node_modules  # Node modules size
```

### Database Quick Queries
```bash
# Active connections
psql -h localhost -U bookedai -d bookedai -c "SELECT count(*) FROM pg_stat_activity;"

# Recent bookings
psql -h localhost -U bookedai -d bookedai -c "SELECT id, status, created_at FROM bookings ORDER BY created_at DESC LIMIT 10;"

# Recent payments
psql -h localhost -U bookedai -d bookedai -c "SELECT id, amount, status, created_at FROM payments ORDER BY created_at DESC LIMIT 10;"
```

---

*Generated: 2026-05-04 | bookedai.au Engineering*
