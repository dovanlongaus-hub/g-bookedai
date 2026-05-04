# BookedAI Platform - System Architecture

> **Slogan:** Turn customer intent into revenue — automatically
> **First Tenant:** longcare.au — AI Mentor & Learning
> **Server:** 34.40.164.84 (GCE, australia-southeast1)

---

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CLOUDFLARE (DNS + CDN + DDoS)                       │
│                                                                                 │
│  longcare.au ─────┐     g.bookedai.au ────────────────────────┐                 │
│  book.longcare.au ─┤     admin.g.bookedai.au ─────────────────┤                 │
│  app.longcare.au ──┤     booking.g.bookedai.au ───────────────┤                 │
│  admin.longcare.au┘     app.g.bookedai.au ────────────────────┤                 │
│                          api.g.bookedai.au ────────────────────┘                 │
└───────────────────────────────────┬─────────────────────────────────────────────┘
                                    │ IP: 34.40.164.84
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         NGINX (Reverse Proxy + SSL)                              │
│                         Let's Encrypt Certificates                               │
│                                                                                 │
│  :80/:443 → g.bookedai.au        ──→  localhost:3000                            │
│  :80/:443 → admin.g.bookedai.au  ──→  localhost:3004                            │
│  :80/:443 → booking.g.bookedai.au──→  localhost:3002                            │
│  :80/:443 → app.g.bookedai.au    ──→  localhost:3003                            │
│  :80/:443 → api.g.bookedai.au    ──→  localhost:8180                            │
└───────────────────────────────────┬─────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        DOCKER COMPOSE (Container Orchestration)                  │
│                                                                                 │
│  ┌─── Frontend Apps (Next.js 15) ─────────────────────────────────────────────┐ │
│  │                                                                             │ │
│  │  web-g-bookedai (:3000)    │  web-longcare (:3001)   │  booking-web (:3002)│ │
│  │  g.bookedai.au             │  longcare.au            │  booking.g/book.lc  │ │
│  │  i18n (en/vi/zh)           │  SEO + Schema.org       │  Stripe Checkout    │ │
│  │                            │                         │                     │ │
│  │  user-app (:3003)          │  admin-app (:3004)      │                     │ │
│  │  app.g/app.lc              │  admin.g/admin.lc       │                     │ │
│  │  Booking history           │  Management dashboard   │                     │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                             │
│                                    ▼ NEXT_PUBLIC_API_URL                         │
│  ┌─── Backend Services (Express 5 + TypeScript) ──────────────────────────────┐ │
│  │                                                                             │ │
│  │  ┌─────────────────────────────────────────────────────┐                   │ │
│  │  │  API Service (:8080 → host :8180)                   │                   │ │
│  │  │  ┌─────────────────────────────────────────────┐    │                   │ │
│  │  │  │ DUAL AUTH                                    │    │                   │ │
│  │  │  │ ┌──────────────┐  ┌───────────────────────┐│    │                   │ │
│  │  │  │ │ Firebase Auth│  │ OpenAI OAuth (fallback)││    │                   │ │
│  │  │  │ │ (Primary)    │  │ ChatGPT Sign-In       ││    │                   │ │
│  │  │  │ │ Google IdP   │  │ JWT Sessions (7d)     ││    │                   │ │
│  │  │  │ └──────────────┘  └───────────────────────┘│    │                   │ │
│  │  │  └─────────────────────────────────────────────┘    │                   │ │
│  │  │  Routes: /health /chat /services /booking           │                   │ │
│  │  │          /payment /learning /marketing /auth        │                   │ │
│  │  │  Security: Helmet, CORS, Rate-limit, Zod            │                   │ │
│  │  └─────────────────────────────────────────────────────┘                   │ │
│  │                                                                             │ │
│  │  agent (:8081)       │ notification (:8082)   │ drive-sync (:8083)         │ │
│  │  Gemini 2.0 Flash    │ Gmail API + FCM        │ Google Drive API           │ │
│  │  AI Chat/Recommend   │ Email notifications    │ File sync                  │ │
│  │                      │                        │                            │ │
│  │  payment (internal)  │ learning-agent (int)   │ marketing-agent (int)      │ │
│  │  Stripe SDK          │ Gemini + Google Docs   │ Gemini + 8-channel         │ │
│  │                      │                        │                            │ │
│  │  accounting-sync (internal)                                                │ │
│  │  Xero SDK (GST/BAS)                                                       │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                             │
│  ┌─── Shared Packages ────────────────────────────────────────────────────────┐ │
│  │  @bookedai/shared  — Types, constants, enums (UserRole, BookingStatus)     │ │
│  │  @bookedai/db      — PostgreSQL client, migrations (001-004), seeds        │ │
│  │  @bookedai/google  — ALL Google Cloud & Workspace API integrations         │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                             │
│  ┌─── Infrastructure ─────────────────────────────────────────────────────────┐ │
│  │  PostgreSQL 16 (:5432)          │  Redis 7 (:6379)                         │ │
│  │  DB: longcare                   │  Session state                           │ │
│  │  User: bookedai                 │  OAuth CSRF tokens                       │ │
│  │  Migrations: 004               │  Cache                                   │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                         GOOGLE CLOUD PLATFORM                                    │
│                                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐ ┌──────────────────┐   │
│  │ Gemini   │ │ Firebase │ │ Cloud    │ │ Pub/Sub    │ │ Cloud Tasks/     │   │
│  │ 2.0 Flash│ │ Auth/IdP │ │ Firestore│ │ Events     │ │ Scheduler        │   │
│  └──────────┘ └──────────┘ └──────────┘ └────────────┘ └──────────────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐ ┌──────────────────┐   │
│  │ Gmail    │ │ Calendar │ │ Drive    │ │ Cloud      │ │ BigQuery +       │   │
│  │ API      │ │ + Meet   │ │ API      │ │ Logging    │ │ Looker Studio    │   │
│  └──────────┘ └──────────┘ └──────────┘ └────────────┘ └──────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL SERVICES                                        │
│                                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Stripe       │  │ OpenAI       │  │ Xero         │  │ GA4 + GTM        │   │
│  │ Payments     │  │ OAuth/Auth   │  │ Accounting   │  │ Analytics        │   │
│  │ Webhooks     │  │ (Fallback)   │  │ GST/BAS      │  │ Tracking         │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Domain Map

| Domain | App/Service | Port | Stack |
|--------|-------------|------|-------|
| g.bookedai.au | apps/web-g-bookedai | 3000 | Next.js 15 + i18n (en/vi/zh) |
| longcare.au | apps/web-longcare | 3001 | Next.js 15 + SEO + Schema.org |
| booking.g.bookedai.au / book.longcare.au | apps/booking-web | 3002 | Next.js 15 + Stripe |
| app.g.bookedai.au / app.longcare.au | apps/user-app | 3003 | Next.js 15 |
| admin.g.bookedai.au / admin.longcare.au | apps/admin-app | 3004 | Next.js 15 |
| api.g.bookedai.au | services/api | 8180→8080 | Express 5 + Firebase Auth + OpenAI OAuth |
| (internal) | services/agent | 8081 | Express 5 + Gemini |
| (internal) | services/notification | 8082 | Gmail API + FCM |
| (internal) | services/drive-sync | 8083 | Google Drive API |
| (internal) | services/payment | — | Stripe SDK |
| (internal) | services/learning-agent | — | Gemini + Google Docs |
| (internal) | services/marketing-agent | — | Gemini + 8-channel content |
| (internal) | services/accounting-sync | — | Xero SDK |

---

## Authentication Flow

```
User visits https://g.bookedai.au/login
       │
       ├─── [Primary] "Sign in with Google"
       │         │
       │         ▼
       │    Firebase Auth (Google Identity Platform)
       │         │
       │         ▼ Firebase ID Token
       │    API: admin.auth().verifyIdToken(token)
       │         │
       │         ▼ Lookup/Create user by google_sub
       │    Return auth payload → Frontend stores token
       │
       └─── [Fallback] "Sign in with ChatGPT" (auto-shows when Firebase fails)
                 │
                 ▼
            GET /auth/openai/login?returnUrl=...
                 │
                 ▼
            Redirect → https://auth.openai.com/authorize
            (client_id, redirect_uri, scope: openid email profile)
                 │
                 ▼ User logs in with OpenAI account
            Callback → GET /auth/openai/callback?code=...&state=...
                 │
                 ├── Verify CSRF state
                 ├── Exchange code for access_token
                 ├── Fetch user info (email, name)
                 ├── Find/Create user in PostgreSQL (openai_sub)
                 └── Sign JWT (7 days) → Redirect to /auth/callback?token=...
                          │
                          ▼
                    Frontend stores JWT → Redirect to home
```

### Auth Middleware Priority

```
Bearer token received
       │
       ├── 1. Try JWT verification (local, fast)
       │      └── If valid + provider=openai → authenticated
       │
       └── 2. Try Firebase ID token verification (network call)
              └── If valid → lookup user by google_sub → authenticated
```

---

## Booking Truth Engine

```
┌──────────┐    ┌──────────┐    ┌───────────────┐    ┌───────────┐    ┌──────────┐
│  AI      │    │   HOLD   │    │   PENDING     │    │ CONFIRMED │    │ Calendar │
│Recommend │───▶│ (10 min) │───▶│   PAYMENT     │───▶│  (Truth)  │───▶│ + Meet   │
│ (Gemini) │    │          │    │               │    │           │    │ + Gmail  │
└──────────┘    └──────────┘    └───────────────┘    └───────────┘    └──────────┘
                     │                  │                    │               │
              Cloud Scheduler     Stripe/Bank         PostgreSQL        Pub/Sub
              (auto-expire)       Transfer             INSERT         Events fired
```

### Booking Status Flow

```
DRAFT → HOLD → PENDING_PAYMENT → CONFIRMED → [RESCHEDULED | CANCELLED | REFUNDED | NO_SHOW]
```

---

## Event Bus (Google Cloud Pub/Sub)

| Topic | Trigger |
|-------|---------|
| booking.created | New booking hold |
| booking.paid | Payment confirmed |
| booking.cancelled | Cancellation request |
| payment.succeeded | Stripe webhook |
| payment.failed | Stripe webhook |
| session.completed | Learning session ends |
| learning.notes.created | Gemini summary generated |
| marketing.content.approved | Campaign approved |
| accounting.sync.failed | Xero sync error |

---

## Database Schema (PostgreSQL 16)

### Migrations

| # | File | Description |
|---|------|-------------|
| 001 | initial_schema.sql | tenants, users, services, availability_slots, bookings, payments, learning_sessions, marketing_campaigns, audit_logs |
| 002 | add_missing_tables.sql | invoices (GST/BAS), social_content_items, notification_preferences, calendar_events, learning_notes + user columns |
| 003 | add_occ_and_webhook_idempotency.sql | Optimistic concurrency control + webhook deduplication |
| 004 | add_openai_auth.sql | users.openai_sub, users.auth_provider, index |

### Key Tables

```sql
tenants          — Multi-tenant support (domain-based)
users            — google_sub, openai_sub, auth_provider, role, language
services         — Bookable services with pricing
availability_slots — Time slots for booking
bookings         — Status machine (DRAFT→CONFIRMED)
payments         — Stripe + bank transfer records
invoices         — GST/BAS compliant invoicing
learning_sessions — AI-powered learning tracking
marketing_campaigns — 8-channel content campaigns
audit_logs       — Full audit trail
```

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /health | No | Health check + DB connectivity |
| GET | /auth/providers | No | Available auth methods |
| GET | /auth/openai/login | No | Initiate OpenAI OAuth |
| GET | /auth/openai/callback | No | OAuth callback handler |
| POST | /chat | No | AI chat (Gemini via agent) |
| GET | /services | No | List active services |
| POST | /services/search | No | Search services |
| POST | /booking/hold | Firebase/JWT | Hold slot (10min) |
| POST | /booking/confirm | Firebase/JWT | Confirm booking |
| POST | /booking/cancel | Firebase/JWT | Cancel booking |
| POST | /booking/reschedule | Firebase/JWT | Reschedule |
| POST | /payment/checkout | Firebase/JWT | Stripe/bank transfer |
| POST | /webhooks/stripe | Signature | Stripe events |
| POST | /learning/session-summary | Firebase/JWT | Gemini summary |
| GET | /learning/history | Firebase/JWT | Learning sessions |
| POST | /marketing/campaigns | Admin | Create campaign |
| POST | /marketing/approve | Admin | Approve campaign |
| GET | /events/booking/:id | SSE | Real-time status |
| GET | /events/chat/:id | SSE | AI chat streaming |

---

## Security

| Layer | Implementation |
|-------|---------------|
| Auth (Primary) | Firebase Auth / Google Identity Platform |
| Auth (Fallback) | OpenAI OAuth 2.0 + JWT sessions |
| Headers | Helmet (CSP, HSTS, X-Frame-Options) |
| CORS | Restricted to known origins |
| Rate Limiting | 100 req/15min per IP |
| Validation | Zod schema on all inputs |
| Webhooks | Stripe signature verification |
| DDoS | Cloudflare Pro (proxied) |
| SSL | Let's Encrypt (auto-renew) |
| Secrets | Environment variables (never in code) |

---

## Infrastructure Stack

| Layer | Technology |
|-------|-----------|
| Server | Google Compute Engine (34.40.164.84) |
| OS | Linux (Ubuntu Noble) |
| DNS | Cloudflare Pro (auto-subdomain via `cf-subdomain` script) |
| SSL | Let's Encrypt (certbot timer) |
| Proxy | Nginx (reverse proxy, WebSocket support) |
| Containers | Docker Compose (11 services) |
| Frontend | Next.js 15 (standalone output, 5 apps) |
| Backend | Express 5 + tsx runtime (7 services) |
| Database | PostgreSQL 16 |
| Cache | Redis 7 Alpine |
| AI Model | Gemini 2.0 Flash (@google/generative-ai) |
| Payments | Stripe SDK |
| Accounting | Xero SDK |
| Analytics | GA4 + GTM + BigQuery + Looker Studio |
| Email | Gmail API |
| Calendar | Google Calendar API + Google Meet |
| Storage | Google Drive API |
| Events | Cloud Pub/Sub + Cloud Tasks + Cloud Scheduler |
| Monitoring | Cloud Logging |
| Production | Cloud Run + Artifact Registry |

---

## Compliance

- Australian Privacy Act (APP 1-13)
- GST-inclusive pricing (10% for Australian tax)
- WCAG 2.2 AA accessibility target
- Audit logging on all state changes

---

## Commands

```bash
# Development
pnpm install                    # Install all dependencies
pnpm dev                        # Run all apps/services in dev mode
pnpm dev:api                    # Run API service only
pnpm dev:web                    # Run g.bookedai.au UI only
pnpm build                      # Build all packages

# Database
pnpm db:migrate                 # Run all database migrations
pnpm db:seed                    # Seed initial data

# Docker (Production)
docker compose up -d            # Start all services
docker compose build            # Rebuild all images
docker compose logs -f api      # Follow API logs

# DNS Management
cf-subdomain app                # Create app.longcare.au → server IP (proxied)
cf-subdomain api off            # Create api.longcare.au (DNS only)
cf-subdomain mail off CNAME x   # Create CNAME record
```

---

*Last updated: 2026-05-04*
