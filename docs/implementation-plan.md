# BookedAI - Implementation Plan & Phases

> **Objective:** Launch production MVP in 14 days — Turn customer intent into revenue automatically
> **Target Revenue:** 5-20 bookings / $500-$2,000 initial revenue
> **Status Date:** 2026-05-04

---

## Progress Overview

```
Phase 1 (Foundation)    ████████████████████░  95% DONE
Phase 2 (Core Product)  ████████████████░░░░░  80% DONE
Phase 3 (Delivery)      ██████████████░░░░░░░  70% DONE
Phase 4 (Growth)        ████████░░░░░░░░░░░░░  40% PARTIAL
Phase 5 (Operations)    ████░░░░░░░░░░░░░░░░░  20% PLANNED
Phase 6 (Scale)         ██░░░░░░░░░░░░░░░░░░░  10% PLANNED
```

---

## PHASE 1: Foundation & Infrastructure (Day 1-2)

**Status: 95% COMPLETE**

| # | Task | Status | Details |
|---|------|--------|---------|
| 1.1 | Domain & DNS setup | ✅ DONE | Cloudflare configured, cf-subdomain script, all subdomains created |
| 1.2 | Google Cloud project | ✅ DONE | longcare-prod project active |
| 1.3 | Monorepo structure | ✅ DONE | pnpm workspace, turbo, 5 apps + 7 services + 3 packages |
| 1.4 | Docker Compose | ✅ DONE | All services containerized, multi-stage builds |
| 1.5 | Nginx + SSL | ✅ DONE | Reverse proxy, Let's Encrypt, auto-renew |
| 1.6 | Database schema | ✅ DONE | PostgreSQL 16, 4 migrations, full relational model |
| 1.7 | CI/CD pipeline | ⬜ TODO | Cloud Build → Artifact Registry → Cloud Run |
| 1.8 | Secret Manager | ⬜ TODO | Move from .env to GCP Secret Manager |

### Key Deliverables
- [x] Cloud project ready (longcare-prod)
- [x] Monorepo initialized (pnpm + turbo)
- [x] Docker builds working (all 9 services)
- [x] DNS + SSL + Nginx configured
- [x] Database migrations (001-004)
- [ ] CI/CD automation
- [ ] Production secret management

---

## PHASE 2: Core Product - Booking & Payment (Day 2-4)

**Status: 80% COMPLETE**

| # | Task | Status | Details |
|---|------|--------|---------|
| 2.1 | Landing page (longcare.au) | ✅ DONE | Service cards ($29/$99/$450), CTAs, SEO |
| 2.2 | Booking flow UI | ✅ DONE | 3-step: service → time → payment (booking-web) |
| 2.3 | Booking API routes | ✅ DONE | /booking/hold, confirm, cancel, reschedule (282 LOC) |
| 2.4 | 10-min hold logic | ✅ DONE | Cloud Scheduler auto-expiry, OCC for slot conflicts |
| 2.5 | Booking status machine | ✅ DONE | DRAFT→HOLD→PENDING→CONFIRMED→[CANCEL/REFUND/NO_SHOW] |
| 2.6 | Stripe Checkout | ⚠️ PARTIAL | Checkout session creation done; webhook handling basic |
| 2.7 | Bank transfer/PayID | ✅ DONE | Instructions generated with booking reference |
| 2.8 | Webhook idempotency | ✅ DONE | Migration 003 - webhook_events table |
| 2.9 | Stripe products config | ⬜ TODO | Create actual products/prices in Stripe Dashboard |
| 2.10 | Refund flow | ⬜ TODO | Stripe refund API integration |

### Key Deliverables
- [x] Booking UI (3-step conversion funnel)
- [x] Booking API (full CRUD + status machine)
- [x] Hold/expiry mechanism
- [x] Payment routes (Stripe + bank transfer)
- [ ] Stripe production products
- [ ] Full refund automation
- [ ] Payment reconciliation

---

## PHASE 3: Delivery - Calendar, Meet, Gmail, Auth (Day 4-6)

**Status: 70% COMPLETE**

| # | Task | Status | Details |
|---|------|--------|---------|
| 3.1 | Firebase Auth (Google Sign-In) | ✅ DONE | Primary auth, auto-create user, role-based |
| 3.2 | OpenAI OAuth fallback | ✅ DONE | ChatGPT Sign-In, JWT sessions, login UI |
| 3.3 | Google Calendar integration | ✅ DONE | packages/google/src/services/calendar.ts coded |
| 3.4 | Google Meet link creation | ✅ DONE | packages/google/src/services/meet.ts coded |
| 3.5 | Gmail API (confirmations) | ✅ DONE | packages/google/src/services/gmail.ts coded |
| 3.6 | Booking→Calendar mapping | ✅ DONE | API route creates calendar event on confirm |
| 3.7 | Email templates | ⬜ TODO | HTML templates for confirmation/reminder/cancel |
| 3.8 | Reminder emails (24h before) | ⬜ TODO | Cloud Scheduler trigger |
| 3.9 | User dashboard (app.longcare.au) | ✅ DONE | Bookings, learning history, recommendations |
| 3.10 | Admin dashboard (admin.longcare.au) | ✅ DONE | Revenue KPIs, booking table, campaign approval |
| 3.11 | Cross-domain auth | ⬜ TODO | Shared session between g.bookedai.au ↔ longcare.au |
| 3.12 | Google service account setup | ⬜ TODO | Production credentials for Calendar/Gmail/Drive |

### Key Deliverables
- [x] Dual auth system (Firebase + OpenAI OAuth)
- [x] Google API integrations coded (14 services)
- [x] User + Admin dashboards
- [ ] Email templates (HTML)
- [ ] Reminder automation
- [ ] Production Google service account
- [ ] Cross-domain session sharing

---

## PHASE 4: Intelligence - AI & Learning Engine (Day 6-10)

**Status: 40% COMPLETE**

| # | Task | Status | Details |
|---|------|--------|---------|
| 4.1 | Gemini chat (g.bookedai.au) | ⚠️ PARTIAL | Chat route exists, agent service has stub router |
| 4.2 | Learning session summary | ✅ DONE | Gemini generates summary + Q&A + next CTA |
| 4.3 | Google Docs note creation | ✅ DONE | packages/google/src/services/docs.ts |
| 4.4 | Learning history API | ✅ DONE | /learning/history + /learning/session-summary |
| 4.5 | Marketing content generator | ✅ DONE | 8-channel AI (Ads, YouTube, LinkedIn, FB, IG, Email, GBP, SEO) |
| 4.6 | Campaign approval workflow | ✅ DONE | DRAFT→NEEDS_REVIEW→APPROVED→SCHEDULED→PUBLISHED |
| 4.7 | Agent orchestrator | ⬜ TODO | Multi-turn conversation, context management |
| 4.8 | Intent detection → booking | ⬜ TODO | AI detects booking intent and triggers flow |
| 4.9 | Course recommendation engine | ⬜ TODO | Personalized learning path based on history |
| 4.10 | AI content generation (lessons) | ⬜ TODO | Track A curriculum, lesson scripts |
| 4.11 | Translation (multi-language) | ⬜ TODO | Cloud Translation API for content |
| 4.12 | Speech-to-Text (sessions) | ⬜ TODO | Transcribe mentor sessions |

### Key Deliverables
- [x] Gemini AI integration (learning + marketing)
- [x] Session summary + recommendations
- [x] 8-channel marketing content generation
- [ ] Full chat agent with booking intent
- [ ] Course curriculum generation
- [ ] Multi-language content
- [ ] Session transcription

---

## PHASE 5: Growth - Marketing, SEO, Analytics (Day 8-11)

**Status: 20% PLANNED**

| # | Task | Status | Details |
|---|------|--------|---------|
| 5.1 | GA4 property setup | ⬜ TODO | Create property, configure events |
| 5.2 | GTM container | ⬜ TODO | Page views, booking events, payment events |
| 5.3 | Conversion tracking | ⬜ TODO | booking_complete, payment_success events |
| 5.4 | UTM naming convention | ⬜ TODO | Standard UTM params for all campaigns |
| 5.5 | Google Ads campaign | ⬜ TODO | Search + Display campaigns |
| 5.6 | SEO landing pages | ⬜ TODO | services.longcare.au with schema markup |
| 5.7 | Search Console | ⬜ TODO | Verify domain, submit sitemap |
| 5.8 | Google Business Profile | ⬜ TODO | Create/verify listing |
| 5.9 | BigQuery export | ⚠️ PARTIAL | packages/google/src/services/bigquery.ts coded |
| 5.10 | Looker Studio dashboard | ⬜ TODO | Revenue, bookings, acquisition reports |
| 5.11 | Social content publishing | ⬜ TODO | Auto-publish approved marketing content |
| 5.12 | A/B testing framework | ⬜ TODO | Landing page variants |

### Key Deliverables
- [ ] GA4 + GTM fully configured
- [ ] Google Ads first campaign live
- [ ] SEO pages with schema markup
- [ ] Search Console + Business Profile
- [ ] Revenue analytics dashboard
- [ ] Social auto-publishing

---

## PHASE 6: Operations - Accounting, Notifications, Scale (Day 12-14)

**Status: 10% PLANNED**

| # | Task | Status | Details |
|---|------|--------|---------|
| 6.1 | Xero OAuth2 connection | ⬜ TODO | Service account + token refresh |
| 6.2 | Invoice generation | ⬜ TODO | GST-inclusive, ABN on invoice |
| 6.3 | Payment→Xero reconciliation | ⬜ TODO | Auto-match Stripe payments |
| 6.4 | BAS reporting | ⬜ TODO | Monthly GST summary |
| 6.5 | SMS notifications (Twilio) | ⬜ TODO | Booking confirmation + reminders |
| 6.6 | Push notifications (FCM) | ⬜ TODO | Real-time booking updates |
| 6.7 | In-app notifications | ⬜ TODO | Firestore-delivered notifications |
| 6.8 | Cloud Run deployment | ⬜ TODO | Production containerized deployment |
| 6.9 | Auto-scaling | ⬜ TODO | Cloud Run min/max instances |
| 6.10 | Monitoring & alerting | ⬜ TODO | Cloud Logging + Error Reporting |
| 6.11 | R&D agent | ⬜ TODO | Weekly AI trend reports |
| 6.12 | Executive weekly report | ⬜ TODO | Auto-generated business summary |

### Key Deliverables
- [ ] Xero accounting sync
- [ ] Multi-channel notifications
- [ ] Cloud Run production deployment
- [ ] Monitoring & alerting
- [ ] Automated reporting

---

## Implementation Priority Matrix

```
                    HIGH IMPACT
                        │
    ┌───────────────────┼───────────────────┐
    │                   │                   │
    │  PHASE 2 (left)   │  PHASE 3 (left)   │
    │  • Stripe config  │  • Email templates │
    │  • Refund flow    │  • Service account │
    │                   │  • Reminders       │
    │                   │                   │
LOW ├───────────────────┼───────────────────┤ HIGH
EFFORT│                   │                   │ EFFORT
    │  PHASE 5          │  PHASE 6          │
    │  • GA4/GTM        │  • Xero sync      │
    │  • Search Console │  • Cloud Run      │
    │  • UTM setup      │  • SMS/Push       │
    │                   │                   │
    └───────────────────┼───────────────────┘
                        │
                    LOW IMPACT
```

---

## Recommended Next Steps (Priority Order)

### Immediate (This Week)
1. **Configure Stripe products** - Create real $29/$99/$450 products in Stripe Dashboard
2. **Google service account** - Set up production credentials for Calendar/Gmail/Drive
3. **Email templates** - HTML confirmation/reminder/cancellation templates
4. **Cross-domain auth** - Shared sessions between g.bookedai.au ↔ longcare.au

### Short-term (Week 2)
5. **Agent orchestrator** - Full Gemini chat with booking intent detection
6. **GA4 + GTM setup** - Start tracking user behavior immediately
7. **Google Ads first campaign** - Start acquiring users
8. **Cloud Run deployment** - Move from Docker Compose to production

### Medium-term (Week 3-4)
9. **Xero accounting sync** - Automated invoicing + GST
10. **Notification channels** - SMS (Twilio) + Push (FCM)
11. **SEO pages** - services.longcare.au landing pages
12. **Course content** - AI-generated learning modules

---

## Tech Debt & Improvements

| Item | Priority | Notes |
|------|----------|-------|
| Replace tsx runtime with compiled dist/ | Medium | Better cold-start in production |
| Add health checks to all services | Low | Currently only API has /health |
| Implement proper retry logic | Medium | Pub/Sub + Cloud Tasks for reliability |
| Add request tracing (OpenTelemetry) | Low | Cross-service observability |
| Database connection pooling (PgBouncer) | Medium | For Cloud Run scaling |
| CDN for static assets | Low | Cloudflare already provides some caching |
| Rate limiting per user (not just IP) | Medium | Prevent abuse after auth |

---

## Revenue Model & Success Metrics

| Metric | Target (Week 2) | Target (Month 1) |
|--------|-----------------|-------------------|
| Bookings | 5-20 | 50-100 |
| Revenue | $500-$2,000 | $5,000-$10,000 |
| Users registered | 20-50 | 200+ |
| Conversion rate | 5-10% | 10-15% |
| Sessions delivered | 5-15 | 40-80 |
| Marketing campaigns | 1-3 | 10+ |
| SEO pages | 3 | 20+ |

---

## File References

| Document | Path |
|----------|------|
| Master Plan | docs/blueprint/01_MASTER_IMPLEMENTATION_PLAN.md |
| Daily Tasks | docs/blueprint/02_DAILY_TASKS_14_DAYS.md |
| Architecture | docs/architecture.html |
| Stack Diagram | docs/stack-architecture.svg |
| API Contracts | docs/blueprint/07_API_CONTRACTS.yaml |
| Data Model | docs/blueprint/08_DATA_MODEL.sql |
| QA Test Plan | docs/blueprint/12_QA_UAT_TEST_PLAN.md |
| Marketing Plan | docs/blueprint/14_MARKETING_AGENT_PLAN.md |
| CI/CD Plan | docs/blueprint/11_CI_CD_PLAN.md |

---

*Last updated: 2026-05-04*
