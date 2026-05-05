# Production Launch Checklist — bookedai.au

> **Version:** 1.0 | **Date:** 2026-05-04
> **Target Launch:** ____________
> **Launch Owner:** ____________

---

## How to Use

- Work through each section sequentially.
- Check off items as they are verified. Mark items N/A if not applicable.
- All CRITICAL items must be completed before go-live.
- HIGH items should be completed within 24 hours of launch.

---

## 1. DNS and Domain Configuration

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 1.1 | g.bookedai.au DNS resolves to 34.40.164.84 via Cloudflare | CRITICAL | | [ ] |
| 1.2 | admin.g.bookedai.au DNS resolves correctly (DNS-only mode) | CRITICAL | | [ ] |
| 1.3 | booking.g.bookedai.au DNS resolves correctly (DNS-only mode) | CRITICAL | | [ ] |
| 1.4 | app.g.bookedai.au DNS resolves correctly (DNS-only mode) | CRITICAL | | [ ] |
| 1.5 | api.g.bookedai.au DNS resolves correctly (DNS-only mode) | CRITICAL | | [ ] |
| 1.6 | longcare.au DNS resolves correctly via Cloudflare | CRITICAL | | [ ] |
| 1.7 | Cloudflare proxied for g.bookedai.au (DDoS protection) | HIGH | | [ ] |
| 1.8 | Cloudflare subdomains set to DNS-only (Let's Encrypt SSL) | HIGH | | [ ] |
| 1.9 | No dangling DNS records (audit all Cloudflare records) | MEDIUM | | [ ] |
| 1.10 | CAA records set to allow letsencrypt.org | MEDIUM | | [ ] |

---

## 2. SSL/TLS Certificates

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 2.1 | Let's Encrypt certificates valid for all 6 domains | CRITICAL | | [ ] |
| 2.2 | Certificate auto-renewal configured (certbot timer) | CRITICAL | | [ ] |
| 2.3 | SSL Labs test grade A or higher for api.g.bookedai.au | HIGH | | [ ] |
| 2.4 | HSTS header enabled (max-age >= 31536000) | HIGH | | [ ] |
| 2.5 | Cloudflare SSL mode set to "Flexible" for proxied domains | HIGH | | [ ] |
| 2.6 | No mixed content warnings on any page | HIGH | | [ ] |
| 2.7 | Certificate expiry monitoring set up (alert at 14 days) | MEDIUM | | [ ] |

---

## 3. Environment Variables and Secrets

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 3.1 | NODE_ENV=production on all services | CRITICAL | | [ ] |
| 3.2 | DATABASE_URL points to production PostgreSQL | CRITICAL | | [ ] |
| 3.3 | REDIS_URL points to production Redis | CRITICAL | | [ ] |
| 3.4 | STRIPE_SECRET_KEY is live key (sk_live_*) | CRITICAL | | [ ] |
| 3.5 | STRIPE_PUBLISHABLE_KEY is live key (pk_live_*) | CRITICAL | | [ ] |
| 3.6 | STRIPE_WEBHOOK_SECRET configured and verified | CRITICAL | | [ ] |
| 3.7 | FIREBASE_PROJECT_ID set correctly | CRITICAL | | [ ] |
| 3.8 | FIREBASE_SERVICE_ACCOUNT_KEY present and valid | CRITICAL | | [ ] |
| 3.9 | GOOGLE_SERVICE_ACCOUNT_KEY present and valid | HIGH | | [ ] |
| 3.10 | GEMINI_API_KEY set (for AI chat/agent) | HIGH | | [ ] |
| 3.11 | JWT_SECRET is a strong random value (>= 256 bits) | CRITICAL | | [ ] |
| 3.12 | OPENAI_CLIENT_ID and OPENAI_CLIENT_SECRET set | HIGH | | [ ] |
| 3.13 | GA4 Measurement ID configured (G-CKG4YQ57VV) | HIGH | | [ ] |
| 3.14 | GTM Container ID configured (G-2L68DR1GD4) | HIGH | | [ ] |
| 3.15 | No .env files committed to git | CRITICAL | | [ ] |
| 3.16 | All secrets stored securely (not in code or logs) | CRITICAL | | [ ] |
| 3.17 | PM2 ecosystem.config.cjs loads .env correctly | HIGH | | [ ] |

---

## 4. Database

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 4.1 | All 4 migrations applied (001-004) | CRITICAL | | [ ] |
| 4.2 | 16 tables created and verified | CRITICAL | | [ ] |
| 4.3 | Seed data loaded (services, availability slots, tenants) | CRITICAL | | [ ] |
| 4.4 | Database backup configured (daily) | CRITICAL | | [ ] |
| 4.5 | Database backup restoration tested | HIGH | | [ ] |
| 4.6 | Connection pool size appropriate (check max_connections) | HIGH | | [ ] |
| 4.7 | Database user has minimum required privileges | HIGH | | [ ] |
| 4.8 | Indexes exist on frequently queried columns | MEDIUM | | [ ] |
| 4.9 | PostgreSQL 16 version confirmed | MEDIUM | | [ ] |
| 4.10 | Audit log table (audit_logs) capturing events | HIGH | | [ ] |

---

## 5. Stripe and Payments (Live Mode)

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 5.1 | Stripe account activated (not in test mode) | CRITICAL | | [ ] |
| 5.2 | 5 products created in Stripe Live mode | CRITICAL | | [ ] |
| 5.3 | Product prices match PRD ($29/$99/$450/$850/$1500+) | CRITICAL | | [ ] |
| 5.4 | Stripe Checkout redirect URL set to production domain | CRITICAL | | [ ] |
| 5.5 | Stripe webhook endpoint registered: https://api.g.bookedai.au/webhooks/stripe | CRITICAL | | [ ] |
| 5.6 | Webhook events subscribed: checkout.session.completed, payment_intent.succeeded, payment_intent.payment_failed | CRITICAL | | [ ] |
| 5.7 | Webhook signature verification working | CRITICAL | | [ ] |
| 5.8 | Webhook idempotency handling verified (webhook_events table) | HIGH | | [ ] |
| 5.9 | Bank transfer details correct (BSB 062-517, Acc 11404999) | CRITICAL | | [ ] |
| 5.10 | PayID configured and tested | HIGH | | [ ] |
| 5.11 | VietQR (Vietcombank) details correct | HIGH | | [ ] |
| 5.12 | AUD/VND exchange rate API working | MEDIUM | | [ ] |
| 5.13 | GST calculation correct (10%) on all products | CRITICAL | | [ ] |
| 5.14 | Stripe error handling tested (declined card, network error) | HIGH | | [ ] |
| 5.15 | Stripe customer portal URL configured | MEDIUM | | [ ] |

---

## 6. Security

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 6.1 | All API keys rotated from development values | CRITICAL | | [ ] |
| 6.2 | Rate limiting active: 100 req/15min per IP | CRITICAL | | [ ] |
| 6.3 | CORS restricted to known origins only | CRITICAL | | [ ] |
| 6.4 | Helmet security headers enabled | CRITICAL | | [ ] |
| 6.5 | Content-Security-Policy header configured | HIGH | | [ ] |
| 6.6 | X-Frame-Options set to DENY or SAMEORIGIN | HIGH | | [ ] |
| 6.7 | X-Content-Type-Options set to nosniff | HIGH | | [ ] |
| 6.8 | Referrer-Policy header set | MEDIUM | | [ ] |
| 6.9 | Zod validation on all API endpoints | CRITICAL | | [ ] |
| 6.10 | Firebase Auth token verification working | CRITICAL | | [ ] |
| 6.11 | JWT secret is production-grade (not default/weak) | CRITICAL | | [ ] |
| 6.12 | Admin routes require admin/superadmin role | CRITICAL | | [ ] |
| 6.13 | No sensitive data in error responses | HIGH | | [ ] |
| 6.14 | SQL injection protection (parameterized queries) | CRITICAL | | [ ] |
| 6.15 | XSS protection (input sanitization, output encoding) | CRITICAL | | [ ] |
| 6.16 | CSRF protection on OAuth flows | HIGH | | [ ] |
| 6.17 | Server SSH key-only access (no password auth) | HIGH | | [ ] |
| 6.18 | Firewall rules: only 80, 443, 22 open | HIGH | | [ ] |
| 6.19 | No debug/dev endpoints exposed in production | HIGH | | [ ] |
| 6.20 | npm audit shows no critical vulnerabilities | MEDIUM | | [ ] |

---

## 7. Performance

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 7.1 | Landing page load time < 3s (Lighthouse) | HIGH | | [ ] |
| 7.2 | Booking page load time < 3s | HIGH | | [ ] |
| 7.3 | API /health response < 200ms | HIGH | | [ ] |
| 7.4 | API /services response < 500ms | HIGH | | [ ] |
| 7.5 | API /booking/* responses < 500ms | HIGH | | [ ] |
| 7.6 | Lighthouse Performance score >= 80 on all pages | HIGH | | [ ] |
| 7.7 | Images optimized (WebP/AVIF, lazy loading) | MEDIUM | | [ ] |
| 7.8 | Next.js static pages pre-rendered where possible | MEDIUM | | [ ] |
| 7.9 | Gzip/Brotli compression enabled in Nginx | HIGH | | [ ] |
| 7.10 | Redis caching for frequent queries (services, slots) | MEDIUM | | [ ] |
| 7.11 | No memory leaks (PM2 restart count stable) | HIGH | | [ ] |
| 7.12 | Database query times < 100ms (check slow query log) | MEDIUM | | [ ] |
| 7.13 | Bundle size reasonable (< 300KB gzipped per page) | MEDIUM | | [ ] |
| 7.14 | Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1) | HIGH | | [ ] |

---

## 8. SEO

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 8.1 | sitemap.xml accessible on all public domains | HIGH | | [ ] |
| 8.2 | robots.txt configured correctly (allow crawling) | HIGH | | [ ] |
| 8.3 | Meta title and description on every page | HIGH | | [ ] |
| 8.4 | Open Graph tags (og:title, og:description, og:image) on all pages | HIGH | | [ ] |
| 8.5 | Twitter Card meta tags present | MEDIUM | | [ ] |
| 8.6 | OG images generated and correct dimensions (1200x630) | MEDIUM | | [ ] |
| 8.7 | Schema.org LocalBusiness markup on longcare.au | HIGH | | [ ] |
| 8.8 | Schema.org FAQ markup on FAQ pages | HIGH | | [ ] |
| 8.9 | Schema.org Service markup on service pages | MEDIUM | | [ ] |
| 8.10 | Schema.org Article markup on blog posts | MEDIUM | | [ ] |
| 8.11 | Schema.org Breadcrumb markup on subpages | MEDIUM | | [ ] |
| 8.12 | Canonical URLs set on all pages | HIGH | | [ ] |
| 8.13 | No duplicate content issues (www vs non-www) | MEDIUM | | [ ] |
| 8.14 | 404 page returns correct HTTP status code | MEDIUM | | [ ] |
| 8.15 | Google Search Console verified for all domains | HIGH | | [ ] |
| 8.16 | Google Business Profile claimed and linked | MEDIUM | | [ ] |

---

## 9. Analytics and Tracking

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 9.1 | GA4 property created and measurement ID active | HIGH | | [ ] |
| 9.2 | GTM container published and loading on all pages | HIGH | | [ ] |
| 9.3 | Page view tracking verified in GA4 real-time | HIGH | | [ ] |
| 9.4 | Booking started event tracked | HIGH | | [ ] |
| 9.5 | Booking completed event tracked | HIGH | | [ ] |
| 9.6 | Payment succeeded event tracked | HIGH | | [ ] |
| 9.7 | Login event tracked | MEDIUM | | [ ] |
| 9.8 | Chat widget opened event tracked | MEDIUM | | [ ] |
| 9.9 | Language toggle event tracked | LOW | | [ ] |
| 9.10 | UTM parameters captured on marketing campaigns | HIGH | | [ ] |
| 9.11 | Conversion tracking set up (booking = conversion) | HIGH | | [ ] |
| 9.12 | Google Ads conversion tag installed (if running ads) | HIGH | | [ ] |
| 9.13 | BigQuery export configured for GA4 | MEDIUM | | [ ] |
| 9.14 | Looker Studio dashboard connected | MEDIUM | | [ ] |

---

## 10. Monitoring and Observability

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 10.1 | Health check endpoint monitored (uptime service) | CRITICAL | | [ ] |
| 10.2 | Uptime monitoring on all 6 domains | CRITICAL | | [ ] |
| 10.3 | Alert on downtime (email/SMS/Slack within 5 min) | CRITICAL | | [ ] |
| 10.4 | Error tracking service configured (Sentry or Cloud Logging) | HIGH | | [ ] |
| 10.5 | PM2 process monitoring (pm2 monit or pm2 plus) | HIGH | | [ ] |
| 10.6 | Nginx access and error logs rotating | HIGH | | [ ] |
| 10.7 | Database connection monitoring | HIGH | | [ ] |
| 10.8 | Disk space monitoring (alert at 80%) | HIGH | | [ ] |
| 10.9 | Memory usage monitoring (alert at 80%) | HIGH | | [ ] |
| 10.10 | CPU usage monitoring (alert at 90%) | MEDIUM | | [ ] |
| 10.11 | SSL certificate expiry monitoring | HIGH | | [ ] |
| 10.12 | Stripe webhook failure alerting | HIGH | | [ ] |
| 10.13 | Daily automated backup verification | MEDIUM | | [ ] |
| 10.14 | Cloud Logging aggregation configured | MEDIUM | | [ ] |

---

## 11. Legal and Compliance

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 11.1 | Privacy Policy page published and linked from footer | CRITICAL | | [ ] |
| 11.2 | Terms of Service page published and linked from footer | CRITICAL | | [ ] |
| 11.3 | Cookie consent banner implemented | CRITICAL | | [ ] |
| 11.4 | Cookie policy documented | HIGH | | [ ] |
| 11.5 | Australian Privacy Act (APP 1-13) compliance reviewed | CRITICAL | | [ ] |
| 11.6 | Data collection consent at booking form | HIGH | | [ ] |
| 11.7 | ABN displayed on website | HIGH | | [ ] |
| 11.8 | GST-inclusive pricing clearly stated | CRITICAL | | [ ] |
| 11.9 | Refund policy published | HIGH | | [ ] |
| 11.10 | Cancellation policy published | HIGH | | [ ] |
| 11.11 | WCAG 2.2 AA accessibility audit completed | MEDIUM | | [ ] |
| 11.12 | Accessibility statement published | MEDIUM | | [ ] |

---

## 12. Business Readiness

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 12.1 | All 5 Stripe products live with correct pricing | CRITICAL | | [ ] |
| 12.2 | Bank transfer account details verified and tested | CRITICAL | | [ ] |
| 12.3 | Support email configured and monitored | CRITICAL | | [ ] |
| 12.4 | WhatsApp business number active and auto-reply working | HIGH | | [ ] |
| 12.5 | Google Calendar integration tested (creates events) | HIGH | | [ ] |
| 12.6 | Gmail API sending confirmations successfully | HIGH | | [ ] |
| 12.7 | Google Meet links generating for confirmed bookings | HIGH | | [ ] |
| 12.8 | Availability slots seeded for next 30 days | CRITICAL | | [ ] |
| 12.9 | Test booking completed end-to-end (book, pay, confirm, attend) | CRITICAL | | [ ] |
| 12.10 | Staff/mentor trained on admin dashboard | HIGH | | [ ] |
| 12.11 | Escalation contacts documented | HIGH | | [ ] |
| 12.12 | Launch announcement prepared (social media, email) | MEDIUM | | [ ] |
| 12.13 | Google Ads campaign ready to activate | MEDIUM | | [ ] |
| 12.14 | 3 blog posts published | MEDIUM | | [ ] |
| 12.15 | CEO Google Sheets dashboard connected and updating | HIGH | | [ ] |

---

## 13. Rollback Plan

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 13.1 | Previous working Docker images tagged and available | CRITICAL | | [ ] |
| 13.2 | Database rollback scripts tested (down migrations) | CRITICAL | | [ ] |
| 13.3 | DNS TTL set low (300s) before launch for quick rollback | HIGH | | [ ] |
| 13.4 | Rollback procedure documented and rehearsed | HIGH | | [ ] |
| 13.5 | Team knows who can execute rollback | HIGH | | [ ] |

---

## Launch Day Sequence

### T-24 Hours
- [ ] Final UAT test suite passed (158 tests)
- [ ] Database backup taken and verified
- [ ] All team members notified of launch time
- [ ] Monitoring dashboards open and reviewed

### T-1 Hour
- [ ] Final git pull and build on production server
- [ ] PM2 restart all services
- [ ] Verify all 9 PM2 processes are online
- [ ] Health check all 6 domains

### T-0 (Go Live)
- [ ] Confirm all domains accessible
- [ ] Place a test booking end-to-end
- [ ] Verify Stripe payment processes
- [ ] Check email notifications delivered
- [ ] Monitor error logs for 15 minutes
- [ ] Announce launch on social channels

### T+1 Hour
- [ ] Review GA4 real-time for traffic
- [ ] Check error rates in logs
- [ ] Verify no 5xx errors
- [ ] Confirm Stripe webhook processing

### T+24 Hours
- [ ] Review all monitoring alerts
- [ ] Check database growth
- [ ] Review first real bookings
- [ ] Send launch summary to stakeholders

---

## Summary

| Section | Total Items | Critical | Completed |
|---------|-------------|----------|-----------|
| DNS and Domains | 10 | 6 | /10 |
| SSL/TLS | 7 | 2 | /7 |
| Environment Variables | 17 | 8 | /17 |
| Database | 10 | 4 | /10 |
| Stripe and Payments | 15 | 8 | /15 |
| Security | 20 | 9 | /20 |
| Performance | 14 | 0 | /14 |
| SEO | 16 | 0 | /16 |
| Analytics | 14 | 0 | /14 |
| Monitoring | 14 | 3 | /14 |
| Legal | 12 | 4 | /12 |
| Business Readiness | 15 | 4 | /15 |
| Rollback Plan | 5 | 2 | /5 |
| **TOTAL** | **169** | **50** | **/169** |

---

*Generated: 2026-05-04 | bookedai.au Engineering*
