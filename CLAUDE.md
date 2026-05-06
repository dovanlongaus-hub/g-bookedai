# bookedai.au — AI Revenue Engine Platform

**Slogan:** Turn customer intent into revenue — automatically  
**First Tenant:** longcare.au — AI Mentor & Learning

## Architecture

```
AI recommends → Truth Engine confirms → Payment proves → Accounting records → Analytics optimizes
```

### Domain Map

| Domain | Workspace | Port | Stack |
|---|---|---|---|
| g.bookedai.au | apps/web-g-bookedai | 3000 | Next.js 15 + i18n (en/vi/zh) |
| longcare.au | apps/web-longcare | 3001 | Next.js 15 + SEO + Schema.org |
| book.longcare.au | apps/booking-web | 3002 | Next.js 15 + Stripe |
| app.longcare.au | apps/user-app | 3003 | Next.js 15 |
| admin.longcare.au | apps/admin-app | 3004 | Next.js 15 |
| api.g.bookedai.au | services/api | 8180→8080 | Express 5 + Dual Auth + OpenAPI |
| (internal) | services/agent | 8081 | Express 5 + Gemini + OpenAI |
| (internal) | services/notification | 8082 | Gmail API + Twilio + FCM + PostgreSQL |
| (internal) | services/drive-sync | 8083 | Google Drive API + NotebookLM |
| (internal) | services/design-agent | 8084 | Gemini + Brand/UI/Component gen |
| (internal) | services/accounting-sync | 8085 | Xero OAuth2 |
| (internal) | services/payment | - | Stripe SDK |
| (internal) | services/learning-agent | - | Gemini + Google Docs |
| (internal) | services/marketing-agent | - | Gemini + 8-channel content |

### Google-First Tech Stack

| Layer | Google Service |
|---|---|
| AI Model | Gemini 2.0 Flash via @google/generative-ai |
| Auth | Firebase Auth / Google Identity Platform |
| Database (truth) | Cloud SQL PostgreSQL |
| Real-time state | Cloud Firestore |
| Events/retries | Cloud Pub/Sub + Cloud Tasks + Cloud Scheduler |
| Email | Gmail API |
| Calendar/Meet | Google Calendar API + Google Meet |
| Notes | Google Docs API |
| Files | Google Drive API |
| Translation | Cloud Translation API |
| Logging | Cloud Logging |
| Analytics | GA4 + GTM + BigQuery + Looker Studio |
| Hosting | Cloud Run + Artifact Registry |
| Frontend | Next.js 15 on Firebase Hosting / Cloud Run |

## Commands

```bash
pnpm install                    # Install all dependencies
pnpm dev                        # Run all apps/services in dev mode
pnpm dev:api                    # Run API service only
pnpm dev:web                    # Run g.bookedai.au UI only
pnpm build                      # Build all packages
pnpm --filter @bookedai/api test  # Run API tests (17 tests)
pnpm db:migrate                 # Run all database migrations
pnpm db:seed                    # Seed initial data
docker compose up postgres redis -d  # Start local DB + cache
```

## Project Structure

```
apps/                       5 Frontend applications (Next.js 15)
services/                   9 Backend microservices (Express 5)
packages/
  shared/                   Types, constants, enums
  db/                       PostgreSQL client, migrations (001-007), seeds
  google/                   ALL Google Cloud & Workspace API integrations (14 services)
  ui/                       Shared React component library (Button, Card, Badge, Input, Footer)
upload/logo_official/       Official logo PNG files (3 variants)
docs/
  PRD.md                    Product Requirements Document (v2.1)
  IMPLEMENTATION_ROADMAP.md Prioritized implementation plan
  architecture.html         Visual architecture diagrams (Mermaid)
  brand-kit.html            Brand identity showcase
  stack-architecture.svg    Stack architecture SVG
  blueprint/                Original 14-day planning documents
```

## Security (Google-first)

- Firebase Auth (Google Sign-In) replacing JWT
- OpenAI OAuth fallback (ChatGPT Sign-In, JWT 7-day sessions)
- Auto-create user on first login
- Role-based access control (customer, mentor, admin, superadmin)
- Helmet security headers
- CORS restricted to known origins
- Rate limiting: 100 req/15min per IP
- Zod request validation on all endpoints
- Stripe webhook signature verification
- Environment validation at startup
- Compression (gzip/brotli)

## API Routes

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /health | No | Health check with DB connectivity |
| GET | /openapi.json | No | OpenAPI 3.1 specification |
| GET | /docs | No | Scalar API documentation UI |
| GET | /auth/providers | No | Available auth methods |
| GET | /auth/openai/login | No | Initiate OpenAI OAuth flow |
| GET | /auth/openai/callback | No | OAuth callback handler |
| POST | /chat | No | AI chat (Gemini via agent service) |
| GET | /services | No | List active services |
| POST | /services/search | No | Search services |
| POST | /booking/hold | Firebase/JWT | Hold slot (10min, auto-expiry via Cloud Scheduler) |
| POST | /booking/confirm | Firebase/JWT | Confirm + Calendar + Meet + Gmail + Pub/Sub |
| POST | /booking/cancel | Firebase/JWT | Cancel + release slot + audit log |
| POST | /booking/reschedule | Firebase/JWT | Reschedule + Calendar update |
| POST | /payment/checkout | Firebase/JWT | Stripe Checkout or bank transfer |
| POST | /webhooks/stripe | Signature | Stripe events → confirm → Calendar → Gmail |
| POST | /learning/session-summary | Firebase/JWT | Gemini summary + Google Docs notes |
| GET | /learning/history | Firebase/JWT | User's learning sessions |
| GET | /courses | No | List available courses |
| GET | /courses/:id | No | Course detail with lessons |
| POST | /courses/:id/enroll | Firebase/JWT | Enroll in course |
| GET | /notifications | Firebase/JWT | User notifications list |
| PUT | /notifications/:id/read | Firebase/JWT | Mark notification as read |
| POST | /marketing/campaigns | Admin | Create + AI generate 8-channel content |
| POST | /marketing/approve | Admin | DRAFT→NEEDS_REVIEW→APPROVED→SCHEDULED→PUBLISHED |
| GET | /approval/pending | Admin | List pending spending approvals |
| GET | /approval/history | Admin | Processed approval history |
| GET | /approval/stats | Admin | Spending summary & limits |
| POST | /approval/request | Admin | Create spending approval request |
| POST | /approval/:id/approve | Admin | Approve spending (dual-control) |
| POST | /approval/:id/reject | Admin | Reject spending (reason required) |
| GET | /approval/ledger | Admin | Spending ledger for reconciliation |
| POST | /approval/ledger/:id/reconcile | Admin | Mark ledger entry reconciled |
| GET | /dashboard/admin/* | Admin | Dashboard stats (secured) |
| POST | /dashboard/admin/approve-payment | Admin | Approve bank transfer (audit trail) |
| GET | /events/booking/:id | SSE | Real-time booking status |
| GET | /events/chat/:id | SSE | AI chat streaming |

## Booking Status Flow

```
DRAFT → HOLD → PENDING_PAYMENT → CONFIRMED → [RESCHEDULED | CANCELLED | REFUNDED | NO_SHOW]
```

## Event Bus (Pub/Sub Topics)

```
booking.created, booking.paid, booking.cancelled
payment.succeeded, payment.failed
session.completed, learning.notes.created
marketing.content.approved, accounting.sync.failed
notification.sent
```

## Database (7 migrations)

Migration 001: tenants, users, services, availability_slots, bookings, payments, learning_sessions, marketing_campaigns, audit_logs
Migration 002: invoices (GST/BAS), social_content_items, notification_preferences, calendar_events, learning_notes + user columns (language, phone, display_name)
Migration 003: OCC (version column) + webhook idempotency (webhook_events)
Migration 004: OpenAI auth (users.openai_sub, users.auth_provider)
Migration 005: In-app notifications table, read/unread status
Migration 006: Courses, lessons, enrollments, quiz results, certificates
Migration 007: Performance indexes on bookings, payments, users
Migration 008: Approval workflow — approval_requests, spending_limits, spending_ledger tables

## Key Principles

1. AI may recommend, but only Booking Truth Engine can confirm
2. Every paid booking must generate an auditable revenue event
3. Every learning session must create a next-step CTA
4. Every campaign must use UTM links and track booking/payment outcome
5. Every service must run as a versioned container
6. Google-first: use Google Cloud services wherever possible
7. Australian Privacy Act compliance (APP 1-13)
8. WCAG 2.2 AA accessibility target
9. GST-inclusive pricing (10% GST for Australian tax)
10. **NO auto-spend without manual approval** — All spending requires admin button click + reason
11. **Dual-control principle** — Cannot approve your own spending request
12. **Spending limits enforced** — Per-role, per-category, per-day/month caps
13. **Audit trail immutable** — Every approve/reject logged with actor + timestamp + reason
14. **Reconciliation required** — All spending must be reconciled in spending_ledger
