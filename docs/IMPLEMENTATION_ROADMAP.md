# BookedAI — Professional Implementation Roadmap

> **Platform:** AI Revenue Engine for Australian Businesses
> **First Tenant:** longcare.au — AI Mentor & Learning
> **Maturity Level:** 6.5/10 → Target 9.5/10
> **Timeline:** 8 Phases across 10 weeks

---

## Current Maturity Assessment

| Area | Score | Status |
|------|-------|--------|
| Core Booking Logic | 9/10 | Production-ready, ACID transactions, OCC |
| Auth & Security | 8/10 | Dual auth, role-based, Helmet, CORS |
| Error Handling | 8.5/10 | AppError class, Zod validation, structured |
| Database Design | 8/10 | 4 migrations, proper indexes, audit logs |
| Testing | 3/10 | Schema tests only, no integration/E2E |
| Observability | 2/10 | Pino logging only, no APM/tracing |
| UI/UX & Design | 5/10 | CSS tokens exist, no component library, no brand assets |
| Documentation | 4/10 | CLAUDE.md only, no OpenAPI |
| CI/CD | 1/10 | Docker only, no automation |

---

## PHASE 1: Foundation & DevOps Excellence
**Timeline:** Week 1 | **Status:** 95% → 100%

### 1.1 Infrastructure Hardening

```
┌─────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ Cloud    │  │ Artifact     │  │ Secret Manager   │ │
│  │ Build    │  │ Registry     │  │ (credentials)    │ │
│  │ (CI/CD)  │──▶│ (images)     │──▶│                  │ │
│  └──────────┘  └──────────────┘  └──────────────────┘ │
│       │                                                 │
│       ▼                                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Cloud Run (auto-scaling, 0-to-N instances)      │  │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐    │  │
│  │  │ API│ │Web │ │Book│ │User│ │Admn│ │Agnt│    │  │
│  │  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │ Cloud SQL    │  │ Memorystore  │                   │
│  │ (PostgreSQL) │  │ (Redis)      │                   │
│  └──────────────┘  └──────────────┘                   │
└─────────────────────────────────────────────────────────┘
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| CI/CD Pipeline | CRITICAL | Cloud Build → Artifact Registry → Cloud Run | 4h |
| Secret Manager | CRITICAL | Migrate all .env vars to GCP Secret Manager | 2h |
| Cloud SQL setup | HIGH | Managed PostgreSQL with automated backups | 2h |
| Memorystore Redis | HIGH | Managed Redis for sessions/cache | 1h |
| Cloud Run deployment | HIGH | Configure min/max instances, CPU/memory | 3h |
| Health check probes | HIGH | Liveness + readiness for all services | 2h |
| Custom domain mapping | MEDIUM | Cloud Run → custom domains | 1h |
| VPC Connector | MEDIUM | Private networking between services | 2h |

### 1.2 Observability Stack

```
┌─────────────────────────────────────────────────────┐
│               OBSERVABILITY PYRAMID                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│           ┌─────────────────────┐                   │
│           │   ALERTING          │ ← PagerDuty/Slack │
│           │   Cloud Monitoring  │                   │
│           └────────┬────────────┘                   │
│                    │                                │
│      ┌─────────────┼─────────────┐                  │
│      │             │             │                  │
│  ┌───▼───┐   ┌────▼────┐   ┌───▼────┐             │
│  │METRICS│   │ TRACES  │   │  LOGS  │             │
│  │Cloud  │   │ Cloud   │   │ Cloud  │             │
│  │Monitor│   │ Trace   │   │Logging │             │
│  └───────┘   └─────────┘   └────────┘             │
│      ▲             ▲             ▲                  │
│      └─────────────┼─────────────┘                  │
│                    │                                │
│         ┌──────────▼──────────┐                     │
│         │   OpenTelemetry     │                     │
│         │   (SDK in each svc) │                     │
│         └─────────────────────┘                     │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  Error Tracking: Sentry (all services)      │    │
│  │  APM: Request duration, DB queries, ext API │    │
│  │  Business: Revenue, bookings, conversion    │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| OpenTelemetry SDK | CRITICAL | Add to all backend services | 4h |
| Cloud Trace integration | CRITICAL | Distributed tracing across services | 2h |
| Sentry error tracking | CRITICAL | Real-time error alerts + context | 2h |
| Cloud Monitoring dashboards | HIGH | CPU, memory, request latency, error rate | 3h |
| Custom business metrics | HIGH | Bookings/hr, revenue/day, conversion rate | 2h |
| Alerting policies | HIGH | Error rate > 5%, latency > 2s, downtime | 2h |
| Log-based metrics | MEDIUM | Extract metrics from structured logs | 1h |
| Uptime checks | MEDIUM | External monitoring of all endpoints | 1h |

### 1.3 Testing Framework

```
Testing Pyramid:
                    ┌───────┐
                    │  E2E  │  ← Playwright (5 critical flows)
                   ┌┴───────┴┐
                   │ Integr. │  ← Supertest + TestContainers (API routes)
                  ┌┴─────────┴┐
                  │   Unit    │  ← Vitest (business logic, utils)
                 ┌┴───────────┴┐
                 │  Schema     │  ← Zod (input validation - DONE)
                 └─────────────┘

Target Coverage: 80%+ for critical paths
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Integration test setup | CRITICAL | Supertest + test database | 3h |
| Booking flow tests | CRITICAL | Hold → confirm → cancel → reschedule | 4h |
| Payment webhook tests | HIGH | Stripe event processing | 2h |
| Auth middleware tests | HIGH | Firebase + JWT verification | 2h |
| E2E test setup (Playwright) | HIGH | Critical user journeys | 4h |
| Database migration tests | MEDIUM | Ensure migrations are idempotent | 2h |
| Load testing (k6) | MEDIUM | 100 concurrent bookings | 3h |
| CI test runner | MEDIUM | Run tests on every PR | 1h |

---

## PHASE 2: Core Product — Revenue Engine
**Timeline:** Week 1-2 | **Status:** 80% → 100%

### 2.1 Payment System (Production-Grade)

```
┌─────────────────────────────────────────────────────────┐
│                  PAYMENT ARCHITECTURE                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │   Stripe     │    │ Bank Transfer│                  │
│  │   ┌────────┐ │    │ ┌──────────┐ │                  │
│  │   │Checkout│ │    │ │  PayID   │ │                  │
│  │   │Session │ │    │ │Reference │ │                  │
│  │   └────┬───┘ │    │ └────┬─────┘ │                  │
│  │        │     │    │      │       │                  │
│  │   ┌────▼───┐ │    │ ┌────▼─────┐ │                  │
│  │   │Webhook │ │    │ │  Manual  │ │                  │
│  │   │Handler │ │    │ │  Confirm │ │                  │
│  │   └────┬───┘ │    │ └────┬─────┘ │                  │
│  └────────┼─────┘    └──────┼───────┘                  │
│           └──────────┬───────┘                          │
│                      ▼                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Payment Truth Engine                             │  │
│  │  • Idempotent webhook processing                  │  │
│  │  • Double-entry ledger (credit/debit)            │  │
│  │  • GST calculation (10% Australian)              │  │
│  │  • Refund state machine                          │  │
│  │  • Revenue recognition rules                     │  │
│  └──────────────────────────────────────────────────┘  │
│                      │                                  │
│                      ▼                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Downstream Actions                               │  │
│  │  • Pub/Sub: payment.succeeded                    │  │
│  │  • Invoice generation (GST-inclusive)            │  │
│  │  • Xero sync queue                              │  │
│  │  • Email receipt                                 │  │
│  │  • Booking status update                        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Stripe products/prices | CRITICAL | Create $29/$99/$450/$850/$1500 products | 1h |
| Webhook hardening | CRITICAL | Retry logic, dead-letter queue, monitoring | 3h |
| Refund automation | HIGH | Full/partial refund with Stripe API | 3h |
| Invoice generation | HIGH | PDF invoice with ABN, GST line items | 4h |
| Payment receipt email | HIGH | Branded HTML email via Gmail API | 2h |
| Subscription/packages | MEDIUM | 5-session, 10-session package management | 4h |
| Revenue dashboard | MEDIUM | Real-time revenue metrics for admin | 3h |
| Payment retry logic | MEDIUM | Handle declined cards, retry flow | 2h |
| Coupon/discount system | LOW | Promo codes for marketing campaigns | 3h |

### 2.2 Booking Engine Enhancement

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Recurring bookings | HIGH | Weekly/fortnightly session scheduling | 4h |
| Buffer time between bookings | HIGH | 15-min gap for mentor prep | 1h |
| Waitlist system | MEDIUM | Notify when cancelled slot opens | 3h |
| Group bookings | MEDIUM | Multiple attendees per session | 4h |
| Booking modification limits | MEDIUM | Max 2 reschedules, 24h cancellation policy | 2h |
| Availability template system | LOW | Reusable weekly schedules for mentors | 3h |

---

## PHASE 3: Delivery Excellence — Communication & Auth
**Timeline:** Week 2-3 | **Status:** 70% → 100%

### 3.1 Notification System (Multi-Channel)

```
┌─────────────────────────────────────────────────────────┐
│               NOTIFICATION ARCHITECTURE                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Notification Orchestrator                        │  │
│  │  • User preference-aware routing                  │  │
│  │  • Template engine (Handlebars)                   │  │
│  │  • Throttling & deduplication                    │  │
│  │  • Scheduling (send at optimal time)             │  │
│  └───────────────────┬──────────────────────────────┘  │
│                      │                                  │
│        ┌─────────────┼─────────────────────┐           │
│        │             │             │       │           │
│   ┌────▼────┐  ┌────▼────┐  ┌────▼───┐ ┌─▼──────┐   │
│   │  EMAIL  │  │   SMS   │  │  PUSH  │ │IN-APP  │   │
│   │ Gmail   │  │ Twilio  │  │  FCM   │ │Firestore│   │
│   │ API     │  │         │  │        │ │        │   │
│   └─────────┘  └─────────┘  └────────┘ └────────┘   │
│                                                         │
│  Templates:                                             │
│  • booking_confirmed    • payment_receipt               │
│  • booking_reminder_24h • session_summary               │
│  • booking_cancelled    • marketing_campaign            │
│  • booking_rescheduled  • welcome_new_user              │
└─────────────────────────────────────────────────────────┘
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Email template engine | CRITICAL | Handlebars + branded HTML templates | 4h |
| Booking confirmation email | CRITICAL | Calendar invite attachment, Meet link | 2h |
| 24h reminder (Cloud Scheduler) | HIGH | Automated reminder with session prep | 3h |
| SMS via Twilio | HIGH | Booking confirm + reminder (AU numbers) | 3h |
| Push notifications (FCM) | MEDIUM | Real-time booking updates | 3h |
| In-app notification center | MEDIUM | Firestore-delivered, bell icon UI | 4h |
| Notification preferences | MEDIUM | User settings: email/sms/push per event | 2h |
| Unsubscribe handling | MEDIUM | One-click unsubscribe, CAN-SPAM | 1h |
| Template preview/testing | LOW | Admin can preview templates before sending | 2h |

### 3.2 Authentication & Identity (Enterprise-Grade)

```
┌─────────────────────────────────────────────────────────┐
│              IDENTITY & ACCESS MANAGEMENT                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Auth Gateway                                     │  │
│  │  ┌────────────┐  ┌────────────┐  ┌───────────┐  │  │
│  │  │  Firebase  │  │  OpenAI    │  │  API Key  │  │  │
│  │  │  (Google)  │  │  OAuth     │  │  (M2M)    │  │  │
│  │  │  PRIMARY   │  │  FALLBACK  │  │  PARTNERS │  │  │
│  │  └──────┬─────┘  └──────┬─────┘  └─────┬─────┘  │  │
│  │         └────────────────┼──────────────┘        │  │
│  │                          ▼                        │  │
│  │  ┌──────────────────────────────────────────┐    │  │
│  │  │  Unified Auth Payload                     │    │  │
│  │  │  { userId, tenantId, email, role, perms } │    │  │
│  │  └──────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  RBAC Matrix:                                           │
│  ┌──────────┬────────┬────────┬────────┬───────────┐  │
│  │ Resource │Customer│ Mentor │ Admin  │ Superadmin│  │
│  ├──────────┼────────┼────────┼────────┼───────────┤  │
│  │ Booking  │ CRUD*  │  Read  │  CRUD  │   CRUD    │  │
│  │ Payment  │ Create │   —    │  CRUD  │   CRUD    │  │
│  │ Learning │ Read   │  CRUD  │  Read  │   CRUD    │  │
│  │ Marketing│   —    │   —    │  CRUD  │   CRUD    │  │
│  │ Users    │ Self   │  Self  │ Tenant │    All    │  │
│  │ Settings │ Self   │  Self  │ Tenant │    All    │  │
│  └──────────┴────────┴────────┴────────┴───────────┘  │
│  * Own bookings only                                    │
└─────────────────────────────────────────────────────────┘
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| API Key system (M2M) | HIGH | Partner/webhook authentication | 4h |
| Cross-domain sessions | HIGH | Share auth between g.bookedai.au ↔ longcare.au | 3h |
| Token refresh mechanism | HIGH | Auto-refresh before expiry | 2h |
| Permission granularity | MEDIUM | Resource-level permissions (not just role) | 4h |
| Session management UI | MEDIUM | View active sessions, revoke access | 2h |
| 2FA option | LOW | TOTP for admin/superadmin accounts | 4h |
| Audit log for auth events | LOW | Login, logout, failed attempts | 2h |

---

## PHASE 4: Intelligence — AI-Powered Revenue
**Timeline:** Week 3-4 | **Status:** 40% → 90%

### 4.1 AI Agent Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 AI AGENT ARCHITECTURE                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Agent Orchestrator (services/agent)              │  │
│  │                                                    │  │
│  │  ┌────────────────────────────────────────────┐   │  │
│  │  │  Conversation Manager                       │   │  │
│  │  │  • Multi-turn context (Firestore)          │   │  │
│  │  │  • Intent classification                    │   │  │
│  │  │  • Tool selection                          │   │  │
│  │  │  • Response generation                     │   │  │
│  │  └───────────────────┬────────────────────────┘   │  │
│  │                      │                             │  │
│  │       ┌──────────────┼──────────────────┐         │  │
│  │       │              │              │   │         │  │
│  │  ┌────▼────┐  ┌─────▼─────┐  ┌────▼───┐│         │  │
│  │  │ Booking │  │  Learning │  │Marketing││         │  │
│  │  │  Tool   │  │   Tool    │  │  Tool   ││         │  │
│  │  │         │  │           │  │         ││         │  │
│  │  │• Search │  │• Summary  │  │• Content││         │  │
│  │  │• Hold   │  │• Recommend│  │• Campaign│         │  │
│  │  │• Confirm│  │• Progress │  │• Publish││         │  │
│  │  └─────────┘  └───────────┘  └─────────┘│         │  │
│  │                                          │         │  │
│  │  ┌────────────┐  ┌────────────┐         │         │  │
│  │  │  FAQ/KB    │  │  Pricing   │         │         │  │
│  │  │  Tool      │  │  Tool      │         │         │  │
│  │  └────────────┘  └────────────┘         │         │  │
│  └──────────────────────────────────────────┘         │  │
│                                                         │
│  AI Models:                                             │
│  • Gemini 2.0 Flash (fast responses, chat)             │
│  • Gemini 1.5 Pro (complex reasoning, summaries)       │
│  • Embeddings (semantic search, recommendations)       │
└─────────────────────────────────────────────────────────┘
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Conversation manager | CRITICAL | Multi-turn context with Firestore persistence | 6h |
| Intent classification | CRITICAL | booking/learning/faq/pricing/support intents | 4h |
| Booking tool | CRITICAL | AI can search, hold, and guide to booking | 4h |
| Knowledge base (RAG) | HIGH | Service descriptions, FAQ, policies | 4h |
| Streaming responses (SSE) | HIGH | Real-time AI response streaming | 3h |
| Session transcription | HIGH | Speech-to-Text for mentor sessions | 4h |
| Learning recommendations | HIGH | Personalized next-course based on history | 3h |
| Sentiment analysis | MEDIUM | Detect frustrated users, escalate | 2h |
| Multi-language chat | MEDIUM | Cloud Translation for non-English users | 2h |
| Agent analytics | MEDIUM | Track intent accuracy, resolution rate | 3h |

### 4.2 Learning Engine (Full)

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Course curriculum generator | HIGH | AI generates structured course outline | 4h |
| Lesson content creation | HIGH | AI creates lesson text + exercises | 4h |
| Progress tracking | HIGH | Learning path completion percentage | 3h |
| Quiz/assessment engine | MEDIUM | Auto-generated questions from content | 4h |
| Certificate generation | MEDIUM | PDF certificate on course completion | 3h |
| Peer learning groups | LOW | Match learners with similar goals | 4h |

---

## PHASE 5: Growth — Acquisition & Analytics
**Timeline:** Week 4-5 | **Status:** 20% → 85%

### 5.1 Analytics & Tracking Architecture

```
┌─────────────────────────────────────────────────────────┐
│              ANALYTICS DATA PIPELINE                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  User Actions                                           │
│       │                                                 │
│       ▼                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐ │
│  │   GTM    │───▶│   GA4    │───▶│    BigQuery      │ │
│  │ (client) │    │ (events) │    │ (raw events)     │ │
│  └──────────┘    └──────────┘    └────────┬─────────┘ │
│                                           │           │
│  Server Events                            ▼           │
│       │                        ┌──────────────────┐   │
│       ▼                        │  Looker Studio   │   │
│  ┌──────────┐                  │  (dashboards)    │   │
│  │ Pub/Sub  │─────────────────▶│                  │   │
│  │ (events) │                  │  • Revenue/day   │   │
│  └──────────┘                  │  • Bookings/hr   │   │
│                                │  • Conversion %  │   │
│  Conversion Funnel:            │  • LTV per user  │   │
│  Visit → Chat → Browse →      │  • Churn risk    │   │
│  Select → Hold → Pay →        │  • Agent perf.   │   │
│  Confirm → Attend → Rebook    └──────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| GA4 property + events | CRITICAL | page_view, booking_start, payment_complete | 3h |
| GTM container | CRITICAL | All frontend events via data layer | 3h |
| Conversion tracking | HIGH | Define funnel stages, drop-off points | 2h |
| BigQuery export | HIGH | GA4 → BigQuery for custom analysis | 2h |
| Looker Studio dashboards | HIGH | Revenue, bookings, user acquisition | 4h |
| UTM parameter system | HIGH | Standard naming for all campaigns | 1h |
| Server-side events | MEDIUM | Pub/Sub → BigQuery for backend events | 3h |
| Cohort analysis | MEDIUM | User retention, LTV prediction | 3h |
| A/B testing framework | LOW | Landing page, pricing, CTA variants | 4h |

### 5.2 SEO & Organic Growth

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Search Console setup | CRITICAL | Verify domain, submit XML sitemap | 1h |
| Schema.org markup | HIGH | LocalBusiness, Service, Course schemas | 3h |
| SEO landing pages | HIGH | /services/ai-mentor, /services/ai-learning, etc. | 6h |
| Blog/content system | MEDIUM | AI-generated blog posts (marketing agent) | 4h |
| Google Business Profile | MEDIUM | Create listing, add services, collect reviews | 2h |
| Internal linking strategy | LOW | Automated related content links | 2h |

### 5.3 Paid Acquisition

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Google Ads campaigns | HIGH | Search + Display for AI mentoring keywords | 4h |
| Remarketing audiences | HIGH | Visitors who didn't book, cart abandonment | 2h |
| Social media ads | MEDIUM | Facebook/Instagram for awareness | 3h |
| YouTube Shorts campaign | MEDIUM | AI-generated short-form content | 4h |
| Landing page variants | MEDIUM | Test different value propositions | 3h |
| Budget optimization | LOW | Auto-bidding rules, ROAS targets | 2h |

---

## PHASE 6: Operations — Accounting, Compliance & Scale
**Timeline:** Week 5-7 | **Status:** 10% → 80%

### 6.1 Accounting & Financial Operations

```
┌─────────────────────────────────────────────────────────┐
│              ACCOUNTING ARCHITECTURE                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Trigger Events:                                        │
│  payment.succeeded ──┐                                  │
│  booking.cancelled ──┼──▶ Accounting Queue              │
│  refund.processed ───┘         │                        │
│                                ▼                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Accounting Sync Service                          │  │
│  │                                                    │  │
│  │  ┌────────────────┐  ┌────────────────────────┐  │  │
│  │  │ Invoice Engine │  │  Xero Sync Engine      │  │  │
│  │  │                │  │                        │  │  │
│  │  │ • Generate PDF │  │  • OAuth2 connection   │  │  │
│  │  │ • GST calc 10% │  │  • Invoice creation    │  │  │
│  │  │ • ABN display  │  │  • Payment matching    │  │  │
│  │  │ • Line items   │  │  • Bank reconciliation │  │  │
│  │  │ • Credit notes │  │  • BAS report data     │  │  │
│  │  └────────────────┘  └────────────────────────┘  │  │
│  │                                                    │  │
│  │  Reports:                                          │  │
│  │  • Monthly revenue summary                        │  │
│  │  • GST collected / BAS lodgement data             │  │
│  │  • Aged receivables                               │  │
│  │  • Payment method breakdown                       │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Xero OAuth2 setup | HIGH | Connect Xero account, token refresh | 4h |
| Invoice PDF generation | HIGH | Branded PDF with ABN, GST, line items | 6h |
| Xero invoice sync | HIGH | Auto-create invoice on payment | 4h |
| Payment reconciliation | HIGH | Match Stripe payments to Xero | 3h |
| Credit note (refunds) | MEDIUM | Auto-create on refund | 2h |
| BAS report generation | MEDIUM | Monthly GST summary for accountant | 3h |
| Revenue recognition | MEDIUM | Deferred revenue for packages | 3h |
| Aged receivables | LOW | Outstanding bank transfer payments | 2h |

### 6.2 Multi-Tenant & Scale

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Tenant isolation | HIGH | Row-level security, tenant-scoped queries | 4h |
| Tenant onboarding flow | HIGH | Self-service tenant registration | 6h |
| Custom domain per tenant | MEDIUM | tenant.bookedai.au or custom domain | 4h |
| Tenant billing | MEDIUM | Platform fee per booking or monthly | 4h |
| Tenant dashboard | MEDIUM | Revenue, users, settings per tenant | 4h |
| White-label theming | LOW | Custom colors, logo per tenant | 3h |

### 6.3 Security Hardening

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Penetration testing | HIGH | OWASP Top 10 scan | 8h |
| Data encryption at rest | HIGH | Cloud SQL encryption, field-level for PII | 3h |
| GDPR/Privacy Act compliance | HIGH | Data export, deletion, consent tracking | 6h |
| WAF rules (Cloudflare) | MEDIUM | Custom rules for API abuse patterns | 2h |
| Dependency audit | MEDIUM | npm audit, Snyk integration | 2h |
| Backup & disaster recovery | MEDIUM | Automated DB backups, recovery playbook | 3h |
| SOC 2 preparation | LOW | Document controls, access policies | 8h |

---

## PHASE 7: Design System, Brand & UI/UX Excellence
**Timeline:** Week 2-6 (parallel) | **Status:** 5/10 → 9.5/10

### 7.1 AI Design Agent (services/design-agent)

```
┌─────────────────────────────────────────────────────────┐
│              DESIGN AGENT ARCHITECTURE                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Design Agent Service (:8084)                     │  │
│  │  AI-powered design automation                     │  │
│  │                                                    │  │
│  │  ┌────────────────────────────────────────────┐   │  │
│  │  │  Gemini 2.0 Flash (Design Specialist)      │   │  │
│  │  └───────────────────┬────────────────────────┘   │  │
│  │                      │                             │  │
│  │  ┌──────────┬────────┼────────┬──────────────┐   │  │
│  │  │          │        │        │              │   │  │
│  │  ▼          ▼        ▼        ▼              ▼   │  │
│  │  ┌────┐  ┌─────┐  ┌─────┐  ┌──────┐  ┌──────┐  │  │
│  │  │ UI │  │Brand│  │Comp.│  │Layout│  │Audit │  │  │
│  │  │Rev.│  │Gen. │  │Gen. │  │Gen.  │  │      │  │  │
│  │  └────┘  └─────┘  └─────┘  └──────┘  └──────┘  │  │
│  │                                                    │  │
│  │  Endpoints:                                        │  │
│  │  POST /design/ui-review        → AI UX audit      │  │
│  │  POST /design/generate-layout  → Page layouts     │  │
│  │  POST /design/color-palette    → Color systems    │  │
│  │  POST /brand/generate-identity → Brand guidelines │  │
│  │  POST /brand/generate-logo-brief → Logo concepts  │  │
│  │  POST /brand/style-guide       → CSS/Tailwind     │  │
│  │  POST /component/generate      → React components │  │
│  │  POST /component/audit         → Quality check    │  │
│  │  POST /component/page-layout   → Full pages       │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Design Agent service | ✅ DONE | Express + Gemini, 3 route modules | — |
| UI review endpoint | ✅ DONE | AI audits pages for UX issues | — |
| Brand identity generator | ✅ DONE | Full brand guidelines from prompts | — |
| Component generator | ✅ DONE | React components with design tokens | — |
| Logo SVG generator | HIGH | Gemini generates SVG logo concepts | 4h |
| Image asset pipeline | HIGH | Generate social images, hero photos (Imagen) | 6h |
| Design critique workflow | MEDIUM | Auto-review PR screenshots | 4h |
| Figma sync (MCP) | LOW | Export tokens to/from Figma | 6h |

### 7.2 Brand Identity & Assets

```
┌─────────────────────────────────────────────────────────┐
│                    BRAND SYSTEM                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────── Logo Suite ────────────────────────────┐ │
│  │                                                     │ │
│  │  Primary Mark    Wordmark       Icon Mark           │ │
│  │  ┌─────────┐   ┌───────────┐  ┌─────┐            │ │
│  │  │  [B]    │   │ BookedAI  │  │ [B] │            │ │
│  │  │ BookedAI│   │           │  │     │            │ │
│  │  └─────────┘   └───────────┘  └─────┘            │ │
│  │                                                     │ │
│  │  Variants: Dark bg / Light bg / Monochrome         │ │
│  │  Sizes: favicon, app icon, social, email header    │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│  ┌──────────── Color System ──────────────────────────┐ │
│  │  Primary    Secondary   Accent     Neutral          │ │
│  │  ●●●●●●    ●●●●●●     ●●●●●●    ●●●●●●          │ │
│  │  Indigo     Cyan        Teal       Slate            │ │
│  │  #6366f1    #0891b2     #22d3ee    #8b92a5         │ │
│  │                                                     │ │
│  │  Semantic: ●Success  ●Warning  ●Danger  ●Info      │ │
│  │            #22c55e   #f59e0b   #ef4444  #3b82f6    │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│  ┌──────────── Typography ────────────────────────────┐ │
│  │  Heading: Outfit (600-700) — Modern, clean         │ │
│  │  Body:    Outfit (300-400) — Readable, friendly    │ │
│  │  Mono:    JetBrains Mono  — Code, technical        │ │
│  │                                                     │ │
│  │  Scale: 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36    │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│  ┌──────────── Visual Language ───────────────────────┐ │
│  │  • Glass-morphism (frosted surfaces, blur)         │ │
│  │  • Subtle gradients (primary → accent)             │ │
│  │  • Glow effects on interactive elements            │ │
│  │  • Smooth micro-animations (200-300ms)             │ │
│  │  • Dark-first with light mode support              │ │
│  │  • Geometric patterns (grid, dots)                 │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Logo design (AI + refinement) | CRITICAL | Primary mark, wordmark, icon, favicon | 4h |
| Brand guidelines document | CRITICAL | Colors, typography, voice, usage rules | 3h |
| Social media kit | HIGH | Profile pic, cover images (all platforms) | 3h |
| Email header/footer template | HIGH | Branded email components | 2h |
| Favicon + app icons | HIGH | All sizes: 16/32/180/192/512px | 1h |
| OG image templates | HIGH | Auto-generated social share images | 3h |
| Presentation template | MEDIUM | Google Slides branded deck | 2h |
| Business card design | LOW | Digital + print-ready | 1h |
| Brand photography guidelines | LOW | Style, subjects, color treatment | 1h |

### 7.3 Shared UI Component Library (@bookedai/ui)

```
┌─────────────────────────────────────────────────────────┐
│            COMPONENT LIBRARY ARCHITECTURE                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  packages/ui/                                           │
│  ├── src/                                               │
│  │   ├── tokens.css          ← Design tokens (CSS vars)│
│  │   ├── lib/utils.ts        ← cn() helper             │
│  │   ├── components/                                    │
│  │   │   ├── Button.tsx      ← 5 variants, 5 sizes    │
│  │   │   ├── Card.tsx        ← 5 variants (glass, etc)│
│  │   │   ├── Badge.tsx       ← 6 semantic variants    │
│  │   │   ├── Input.tsx       ← Labels, errors, hints  │
│  │   │   ├── Modal.tsx       ← Accessible dialog      │
│  │   │   ├── Dropdown.tsx    ← Menu, select           │
│  │   │   ├── Table.tsx       ← Sortable, paginated    │
│  │   │   ├── Tabs.tsx        ← Animated tab panels    │
│  │   │   ├── Toast.tsx       ← Notification toasts    │
│  │   │   ├── Avatar.tsx      ← User avatars           │
│  │   │   ├── Skeleton.tsx    ← Loading placeholders   │
│  │   │   ├── Chart.tsx       ← Revenue/booking charts │
│  │   │   ├── Calendar.tsx    ← Date/time picker       │
│  │   │   ├── Stepper.tsx     ← Multi-step forms       │
│  │   │   └── Pricing.tsx     ← Pricing cards          │
│  │   └── index.ts            ← Barrel exports         │
│  └── package.json                                       │
│                                                         │
│  Used by: All 5 frontend apps via workspace dependency  │
│  Tools: class-variance-authority + clsx + tailwind-merge│
│  Pattern: Composable, accessible, theme-aware           │
└─────────────────────────────────────────────────────────┘
```

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Button component | ✅ DONE | 5 variants (primary/secondary/ghost/accent/danger) | — |
| Card component | ✅ DONE | 5 variants (default/elevated/interactive/glass/gradient) | — |
| Badge component | ✅ DONE | 6 semantic colors + dot indicator | — |
| Input component | ✅ DONE | Label, error, hint, accessibility | — |
| Design tokens CSS | ✅ DONE | Full token system (colors, spacing, typography, etc.) | — |
| Modal/Dialog | HIGH | Focus trap, ESC close, animations | 3h |
| Dropdown/Select | HIGH | Keyboard nav, search, multi-select | 4h |
| Data Table | HIGH | Sort, filter, pagination, selection | 6h |
| Toast notifications | HIGH | Auto-dismiss, stacking, variants | 3h |
| Calendar/Date picker | HIGH | Booking slot selection UI | 6h |
| Stepper/Wizard | HIGH | Multi-step booking/payment flow | 3h |
| Skeleton loaders | MEDIUM | Content placeholder animations | 2h |
| Chart components | MEDIUM | Revenue, bookings, conversion graphs | 4h |
| Pricing cards | MEDIUM | Tiered pricing with CTA | 2h |
| Avatar/user | MEDIUM | Initials fallback, status indicator | 1h |
| Storybook setup | MEDIUM | Visual component documentation | 4h |
| Accessibility audit | HIGH | WCAG 2.2 AA for all components | 4h |

### 7.4 Page-Level UI/UX Redesign

| Page | Priority | Current State | Target State |
|------|----------|---------------|--------------|
| g.bookedai.au (hero) | CRITICAL | Chat only | Hero + value prop + social proof + chat CTA |
| longcare.au (landing) | CRITICAL | Service cards + FAQ | Full landing: hero, benefits, testimonials, pricing, FAQ, CTA |
| booking-web (funnel) | HIGH | 3-step basic | Animated stepper, trust badges, urgency, upsell |
| user-app (dashboard) | HIGH | Data display | Charts, progress, recommendations, quick actions |
| admin-app (dashboard) | HIGH | KPIs + table | Real-time metrics, filters, bulk actions, export |
| /login page | HIGH | Basic buttons | Branded, trust signals, social proof |
| /pricing page | MEDIUM | N/A | Comparison table, FAQ, guarantee badge |
| Error pages (404/500) | LOW | Default | Branded, helpful navigation |

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Hero section redesign | CRITICAL | Animated hero with value proposition | 4h |
| Testimonial/social proof | HIGH | Customer quotes, logos, stats | 3h |
| Pricing page | HIGH | Tiered pricing with feature comparison | 4h |
| Booking flow UX | HIGH | Progress bar, trust badges, timer | 4h |
| Dashboard charts | HIGH | Revenue line chart, booking pie chart | 4h |
| Micro-interactions | MEDIUM | Button hover, card entrance, page transitions | 3h |
| Loading states | MEDIUM | Skeleton + progress indicators | 2h |
| Empty states | MEDIUM | Helpful empty states with CTAs | 2h |
| Error states | LOW | Friendly error messages + recovery actions | 2h |
| Onboarding flow | LOW | First-time user welcome tour | 4h |

### 7.5 Responsive & Accessibility

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| Mobile-first responsive | CRITICAL | All pages work on 320px-1920px | 6h |
| Touch targets (44px min) | HIGH | All interactive elements | 2h |
| Color contrast (WCAG AA) | HIGH | 4.5:1 text, 3:1 UI elements | 2h |
| Keyboard navigation | HIGH | Tab order, focus indicators, shortcuts | 4h |
| Screen reader support | HIGH | ARIA labels, live regions, landmarks | 4h |
| Reduced motion | MEDIUM | Respect prefers-reduced-motion | 1h |
| Dark/Light mode toggle | MEDIUM | User preference, system default | 2h |
| RTL support preparation | LOW | For future Arabic/Hebrew locales | 3h |

---

## PHASE 8: Documentation & API Economy (Ongoing)
**Timeline:** Week 6-8 | **Status:** 4/10 → 9/10

| Task | Priority | Details | Est. |
|------|----------|---------|------|
| OpenAPI 3.1 spec | HIGH | Auto-generated from Zod schemas | 4h |
| API documentation site | HIGH | Hosted docs with examples (Scalar/Redoc) | 3h |
| SDK generation | MEDIUM | TypeScript client SDK from OpenAPI spec | 3h |
| Webhook documentation | MEDIUM | Event catalog, payload schemas | 2h |
| Integration guides | MEDIUM | How to connect as a partner/tenant | 4h |
| Architecture decision records | LOW | ADR for key technical decisions | 3h |
| Runbook for operations | LOW | Deployment, rollback, incident response | 4h |

---

## Timeline Summary

```
Week 1  ──────────────────────────────────────────────
        │ Phase 1: DevOps + Observability + Tests    │
        │ Phase 2: Payment production + Stripe       │
        ──────────────────────────────────────────────

Week 2  ──────────────────────────────────────────────
        │ Phase 2: Booking enhancements              │
        │ Phase 3: Notifications + Email templates   │
        ──────────────────────────────────────────────

Week 3  ──────────────────────────────────────────────
        │ Phase 3: Auth hardening + Cross-domain     │
        │ Phase 4: AI Agent + Intent detection       │
        ──────────────────────────────────────────────

Week 4  ──────────────────────────────────────────────
        │ Phase 4: Learning engine + Recommendations │
        │ Phase 5: GA4/GTM + Analytics setup         │
        ──────────────────────────────────────────────

Week 5  ──────────────────────────────────────────────
        │ Phase 5: SEO + Google Ads + Organic        │
        │ Phase 6: Xero + Invoice generation         │
        ──────────────────────────────────────────────

Week 6  ──────────────────────────────────────────────
        │ Phase 6: Multi-tenant + Security           │
        │ Phase 7: OpenAPI + Documentation           │
        ──────────────────────────────────────────────

Week 7-8 ─────────────────────────────────────────────
        │ Phase 6: Scale testing + Load testing      │
        │ Phase 7: SDK + Integration guides          │
        │ Launch prep + UAT + Go-live                │
        ──────────────────────────────────────────────
```

---

## Success Metrics (KPIs)

| Metric | Week 2 | Month 1 | Month 3 |
|--------|--------|---------|---------|
| Bookings | 5-20 | 50-100 | 200-500 |
| Revenue | $500-$2K | $5K-$10K | $20K-$50K |
| Registered Users | 20-50 | 200+ | 1,000+ |
| Conversion Rate | 5% | 10% | 15% |
| AI Chat Sessions | 50+ | 500+ | 2,000+ |
| Uptime | 99% | 99.5% | 99.9% |
| Test Coverage | 40% | 70% | 85% |
| Error Rate | <5% | <2% | <0.5% |
| Avg Response Time | <500ms | <300ms | <200ms |
| NPS Score | — | 30+ | 50+ |

---

## Budget Estimate (Monthly)

| Service | Cost/Month | Notes |
|---------|-----------|-------|
| Cloud Run | $50-200 | Auto-scaling, pay per use |
| Cloud SQL | $50-100 | db-f1-micro to db-n1-standard-1 |
| Memorystore | $30-50 | Basic tier |
| Cloudflare Pro | $20 | Already active |
| Stripe fees | 1.75%+30c | Per transaction |
| Twilio | $20-50 | SMS notifications |
| Sentry | $0-26 | Error tracking (free tier → team) |
| Google Ads | $500-2000 | Initial acquisition budget |
| Xero | $55 | Standard plan |
| **Total** | **$725-$2,500** | Scales with revenue |

---

*Last updated: 2026-05-04*
*Next review: Weekly on Monday*
