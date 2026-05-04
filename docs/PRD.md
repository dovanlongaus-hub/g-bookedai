# bookedai.au — Product Requirements Document (PRD)

> **Version:** 2.0 | **Updated:** 2026-05-04
> **Product:** bookedai.au — The AI Revenue Engine
> **First Tenant:** longcare.au — AI Mentor & Learning
> **Status:** MVP Development (Week 2)

---

## 1. Product Vision

**bookedai.au** is an AI-powered revenue engine that automatically converts customer intent into confirmed bookings, payments, and sustained growth for Australian service businesses.

**Core Promise:** "Turn customer intent into revenue — automatically"

---

## 2. Architecture Summary

```
Users → Cloudflare (DNS/CDN) → Nginx (SSL/Proxy) → Docker Compose
  ├── 5 Frontend Apps (Next.js 15)
  ├── 9 Backend Services (Express 5 + TypeScript)
  ├── 4 Shared Packages
  └── Infrastructure (PostgreSQL 16, Redis 7)
      + Google Cloud Platform (Gemini, Calendar, Gmail, Drive, Pub/Sub...)
      + External (Stripe, OpenAI OAuth, Xero, GA4)
```

### 2.1 Domain Map

| Domain | Service | Port | Stack | Status |
|--------|---------|------|-------|--------|
| g.bookedai.au | web-g-bookedai | 3000 | Next.js 15 (EN/VI) | LIVE |
| longcare.au | web-longcare | 3001 | Next.js 15 + SEO | LIVE |
| booking.g.bookedai.au | booking-web | 3002 | Next.js 15 + Stripe | LIVE |
| app.g.bookedai.au | user-app | 3003 | Next.js 15 | LIVE |
| admin.g.bookedai.au | admin-app | 3004 | Next.js 15 | LIVE |
| api.g.bookedai.au | api | 8180→8080 | Express 5 + Dual Auth | LIVE |
| (internal) | agent | 8081 | Express 5 + Gemini | LIVE |
| (internal) | design-agent | 8084 | Express 5 + Gemini | LIVE |
| (internal) | notification | 8082 | Gmail API + FCM | PARTIAL |
| (internal) | drive-sync | 8083 | Google Drive API | LIVE |
| (internal) | payment | — | Stripe SDK | STUB |
| (internal) | learning-agent | — | Gemini + Google Docs | DONE |
| (internal) | marketing-agent | — | Gemini + 8-channel | DONE |
| (internal) | accounting-sync | — | Xero SDK | STUB |

### 2.2 Shared Packages

| Package | Purpose | Status |
|---------|---------|--------|
| @bookedai/shared | Types, constants, enums | DONE |
| @bookedai/db | PostgreSQL client, 4 migrations, seeds | DONE |
| @bookedai/google | 14 Google Cloud/Workspace API integrations | DONE |
| @bookedai/ui | Shared React component library (Button, Card, Badge, Input, Footer) | IN PROGRESS |

### 2.3 Infrastructure

| Component | Technology | Status |
|-----------|-----------|--------|
| Server | GCE 34.40.164.84 (australia-southeast1) | LIVE |
| DNS | Cloudflare (g.bookedai.au proxied, subdomains DNS-only) | LIVE |
| SSL | Let's Encrypt (auto-renew, covers all subdomains) | LIVE |
| Proxy | Nginx (reverse proxy, WebSocket, SSL termination) | LIVE |
| Containers | Docker Compose (14 services) | LIVE |
| Database | PostgreSQL 16 (4 migrations) | LIVE |
| Cache | Redis 7 | LIVE |
| CI/CD | Not yet (planned: Cloud Build → Cloud Run) | TODO |

---

## 3. Features — Detailed Specification

### 3.1 Authentication System (DONE)

**Primary:** Firebase Auth (Google Sign-In)
- Auto-create user on first login
- Role-based: customer, mentor, admin, superadmin
- Firebase ID token verification

**Fallback:** OpenAI OAuth (ChatGPT Sign-In)
- OAuth 2.0 flow with CSRF protection
- JWT session tokens (7-day expiry)
- Auto-creates user by email

**Auth Middleware:** Tries JWT first (local, fast) → Falls back to Firebase (network call)

**Files:**
- `services/api/src/middleware/auth.ts` — Dual auth middleware
- `services/api/src/routes/auth.ts` — OAuth routes (/auth/openai/login, /auth/openai/callback, /auth/providers)
- `apps/web-g-bookedai/src/app/login/page.tsx` — Login UI with Google + ChatGPT buttons

### 3.2 Booking Truth Engine (DONE)

**Status Machine:**
```
DRAFT → HOLD (10min) → PENDING_PAYMENT → CONFIRMED → [RESCHEDULED|CANCELLED|REFUNDED|NO_SHOW]
```

**Features:**
- Optimistic Concurrency Control (version column on slots)
- 10-minute hold with Cloud Scheduler auto-expiry
- Transaction-based operations with ROLLBACK on errors
- On confirm: creates Calendar event + Meet link + Gmail notification + Pub/Sub event + audit log
- Non-blocking error handling (booking confirms even if calendar fails)

**API Routes:** /booking/hold, /booking/confirm, /booking/cancel, /booking/reschedule (282 LOC)

**Files:** `services/api/src/routes/booking.ts`

### 3.3 Payment System (PARTIAL)

**Done:**
- Stripe Checkout session creation
- Bank transfer / PayID instructions with reference
- Webhook signature verification
- Webhook idempotency (webhook_events table, migration 003)

**TODO:**
- Stripe production products ($29/$99/$450/$850)
- Full refund automation
- Payment reconciliation
- Invoice PDF generation

**Files:** `services/api/src/routes/payment.ts`, `services/api/src/routes/webhooks.ts`

### 3.4 AI Chat Assistant (PARTIAL)

**Done:**
- Chat route proxying to agent service
- SSE streaming endpoint
- Multi-language support (EN/VI)

**TODO:**
- Full conversation manager with Firestore persistence
- Intent classification (booking/learning/faq/pricing)
- Tool-use (AI can search services, hold slots, recommend)

**Files:** `services/api/src/routes/chat.ts`, `services/agent/src/index.ts`

### 3.5 Learning Engine (DONE)

**Features:**
- Gemini-powered session summaries with JSON parsing
- Multi-language support
- Next-course recommendations
- Google Docs note creation
- Learning history API

**Files:** `services/learning-agent/`, `services/api/src/routes/learning.ts`

### 3.6 Marketing AI (DONE)

**Features:**
- 8-channel content generation (Google Ads, YouTube Shorts, LinkedIn, Facebook, Instagram, Email, Google Business, SEO Blog)
- UTM tracking built-in
- Campaign approval workflow (DRAFT→NEEDS_REVIEW→APPROVED→SCHEDULED→PUBLISHED)

**Files:** `services/marketing-agent/`, `services/api/src/routes/marketing.ts`

### 3.7 Design Agent (DONE — NEW)

**Service:** `services/design-agent` (Port 8084)

**Endpoints:**
- `POST /design/ui-review` — AI audits UI/UX, scores accessibility/usability/conversion
- `POST /design/generate-layout` — Generates page layout specs
- `POST /design/color-palette` — Creates harmonious color systems
- `POST /brand/generate-identity` — Full brand guidelines from prompts
- `POST /brand/generate-logo-brief` — Logo concepts with SVG output
- `POST /brand/style-guide` — Generates CSS/Tailwind tokens
- `POST /component/generate` — Creates React components to design system spec
- `POST /component/audit` — Quality checks existing components
- `POST /component/page-layout` — Generates complete page layouts

### 3.8 Landing Page — g.bookedai.au (DONE — REDESIGNED)

**Design System:** Dark theme (Vercel/Linear inspired)
- Background: #0a0a0a
- Accent: #0070f3 (blue)
- Typography: Inter font
- Borders: 1px solid rgba(255,255,255,0.08)

**Sections:**
1. Navbar — Glassmorphism blur, logo PNG, EN/VI toggle, CTA
2. Hero — Centered headline, gradient accent, dual CTAs, trust badges
3. Stats — 4 animated counters (IntersectionObserver scroll-triggered)
4. Features — 3-column grid with 1px gap borders, hover effects
5. How It Works — 3 numbered steps
6. Pricing — 3 tiers ($29/$99/$450), featured middle card
7. Testimonials — 3 quote cards with stars
8. CTA — Dark section with strong heading
9. Footer — Links, social icons, copyright

**Multi-language:** EN/VI toggle using Google Translate API (client-side)
- `src/components/GoogleTranslate.tsx` — Hidden widget + combo trigger
- Translates entire page content including all sections

**Chat Widget:** Floating bottom-right, preserves full AI chat functionality

### 3.9 Shared UI Library — @bookedai/ui (IN PROGRESS)

**Package:** `packages/ui`
**Components:** Button (5 variants), Card (5 variants), Badge (6 semantic), Input (label/error/hint), Footer
**Design Tokens:** `packages/ui/src/tokens.css` — Full CSS variable system
**Utils:** `cn()` helper (clsx + tailwind-merge)
**Tools:** class-variance-authority for variant management

### 3.10 Google Cloud Integrations (DONE)

14 services in `packages/google/src/services/`:
Calendar, Gmail, Docs, Drive, Firestore, Pub/Sub, Cloud Scheduler, Tasks, BigQuery, Logging, Translation, Firebase Auth, Meet, NotebookLM

### 3.11 Database Schema (DONE)

4 migrations:
- 001: tenants, users, services, availability_slots, bookings, payments, learning_sessions, marketing_campaigns, audit_logs
- 002: invoices (GST/BAS), social_content_items, notification_preferences, calendar_events, learning_notes
- 003: OCC (version column) + webhook idempotency (webhook_events)
- 004: OpenAI auth (users.openai_sub, users.auth_provider)

### 3.12 Notification System (PARTIAL)

**Done:** Email channel (Gmail API)
**TODO:** SMS (Twilio), Push (FCM), In-app (Firestore), email templates

### 3.13 DNS Automation (DONE)

**Script:** `/usr/local/bin/cf-subdomain`
- Auto-creates Cloudflare DNS records + Nginx configs
- Usage: `cf-subdomain <subdomain> [proxy:on|off] [type:A|CNAME] [content]`
- Supports longcare.au (teal token) and bookedai.au (separate token)

---

## 4. Brand Identity

### 4.1 Official Assets

**Logo files:** `/upload/logo_official/`
- `logo-primary.png` — Navy text on white (default)
- `logo-light.png` — Cream/gold text on transparent (for dark backgrounds)
- `logo-dark.png` — Outline text (for light backgrounds)

**Applied to:** All 5 frontend apps at `/public/logo.png` and `/public/logo-light.png`
(longcare.au retains its own logo — NOT overwritten)

### 4.2 Design Tokens (Current — v2.0)

```
Background:    #0a0a0a (near black)
Surface:       #111111
Card:          #161616
Border:        rgba(255,255,255,0.08)
Text:          #ededed
Text-muted:    #888888
Accent:        #0070f3 (blue)
Success:       #0cce6b
Font:          Inter (300-800)
Radius:        12px / 20px
```

### 4.3 Brand Guidelines
- Always use "bookedai.au" (lowercase) — never "BookedAI" alone
- Tagline: "The AI Revenue Engine"
- Logo must have clear space of 1x logo height
- Dark theme by default; light theme variant available

---

## 5. Security

| Layer | Implementation | Status |
|-------|---------------|--------|
| Auth (Primary) | Firebase Auth / Google Identity Platform | DONE |
| Auth (Fallback) | OpenAI OAuth 2.0 + JWT sessions | DONE |
| Headers | Helmet (CSP, HSTS, X-Frame-Options) | DONE |
| CORS | Restricted to known origins | DONE |
| Rate Limiting | 100 req/15min per IP | DONE |
| Validation | Zod schema on all endpoints | DONE |
| Webhooks | Stripe signature verification | DONE |
| DDoS | Cloudflare (proxied for g.bookedai.au) | DONE |
| SSL | Let's Encrypt (auto-renew) | DONE |
| API Key system | X-API-Key header / query param, tenant lookup | DONE |
| 2FA | Not yet | TODO |

---

## 6. API Endpoints

| Method | Path | Auth | Status |
|--------|------|------|--------|
| GET | /health | No | DONE |
| GET | /auth/providers | No | DONE |
| GET | /auth/openai/login | No | DONE |
| GET | /auth/openai/callback | No | DONE |
| POST | /chat | No | DONE |
| GET | /services | No | DONE |
| POST | /services/search | No | DONE |
| POST | /booking/hold | Auth | DONE |
| POST | /booking/confirm | Auth | DONE |
| POST | /booking/cancel | Auth | DONE |
| POST | /booking/reschedule | Auth | DONE |
| POST | /payment/checkout | Auth | DONE |
| POST | /webhooks/stripe | Sig | DONE |
| POST | /learning/session-summary | Auth | DONE |
| GET | /learning/history | Auth | DONE |
| POST | /marketing/campaigns | Admin | DONE |
| POST | /marketing/approve | Admin | DONE |
| GET | /events/booking/:id | SSE | DONE |
| GET | /events/chat/:id | SSE | DONE |

---

## 7. Revenue Model

| Product | Price (inc GST) | Type |
|---------|----------------|------|
| AI Starter Session | $29 | 30-min 1-on-1 |
| AI Mentor Session | $99 | 1-hour deep dive |
| 5-Session Package | $450 | 5 x 1-hour |
| 10-Session Package | $850 | 10 x 1-hour |
| AI Business Transformation | $1,500-$3,000+ | Premium B2B program |
| Single Lesson | $19-$29 | Course content |
| Module (5 lessons) | $79-$149 | Course bundle |

---

## 8. Compliance

- Australian Privacy Act (APP 1-13)
- GST-inclusive pricing (10%)
- WCAG 2.2 AA accessibility target
- Audit logging on all state changes
- ABN registered in Australia

---

## 9. Change Request Log

| CR# | Date | Description | Priority | Status |
|-----|------|-------------|----------|--------|
| CR-001 | 2026-05-03 | Initial infrastructure setup (Nginx, SSL, DNS, Docker) | CRITICAL | DONE |
| CR-002 | 2026-05-03 | Create Cloudflare subdomains for g.bookedai.au | HIGH | DONE |
| CR-003 | 2026-05-03 | Implement OpenAI OAuth fallback auth | HIGH | DONE |
| CR-004 | 2026-05-04 | Fix Docker monorepo builds (workspace deps, HOSTNAME) | CRITICAL | DONE |
| CR-005 | 2026-05-04 | SSL fix — subdomains set to DNS-only (Cloudflare edge cert limitation) | CRITICAL | DONE |
| CR-006 | 2026-05-04 | Create Design Agent service (brand/UI/component gen) | MEDIUM | DONE |
| CR-007 | 2026-05-04 | Create @bookedai/ui shared component library | MEDIUM | DONE |
| CR-008 | 2026-05-04 | Apply official logo (PNG) across all apps | HIGH | DONE |
| CR-009 | 2026-05-04 | Integrate Google Translate (EN/VI) for full-page translation | HIGH | DONE |
| CR-010 | 2026-05-04 | Redesign landing page to premium dark theme (Linear/Vercel style) | HIGH | DONE |
| CR-011 | 2026-05-04 | Fix Tailwind v4 compilation (add @source directive) | CRITICAL | DONE |
| CR-012 | 2026-05-03 | Stripe production products configuration (5 products live) | CRITICAL | DONE |
| CR-013 | 2026-05-03 | Google service account (Calendar/Gmail/Drive) — code ready, needs OAuth approval | CRITICAL | PARTIAL |
| CR-014 | 2026-05-03 | Email templates (confirmation/reminder/cancel) | HIGH | DONE |
| CR-015 | 2026-05-03 | Agent orchestrator (multi-turn, intent detection, tool-use) | HIGH | DONE |
| CR-016 | 2026-05-03 | GA4 + GTM analytics setup (G-CKG4YQ57VV + G-2L68DR1GD4) | HIGH | DONE |
| CR-017 | 2026-05-03 | CI/CD pipeline (Cloud Build + GitHub Actions) | HIGH | DONE |
| CR-018 | — | Xero accounting sync | MEDIUM | PENDING |
| CR-019 | — | SMS notifications (Twilio) | MEDIUM | PENDING |
| CR-020 | 2026-05-03 | OpenAPI 3.1 spec + developer docs | MEDIUM | DONE |
| CR-021 | 2026-05-03 | WhatsApp auto-reply | HIGH | DONE |
| CR-022 | 2026-05-03 | Multi-tenant admin | HIGH | DONE |
| CR-023 | 2026-05-03 | Blog posts (3 articles) | MEDIUM | DONE |
| CR-024 | 2026-05-03 | User profile + notifications | HIGH | DONE |
| CR-025 | 2026-05-03 | Booking management | HIGH | DONE |
| CR-026 | 2026-05-03 | Partner signup API | MEDIUM | DONE |
| CR-027 | 2026-05-03 | Availability slots seeding | MEDIUM | DONE |
| CR-028 | 2026-05-03 | Mobile responsive + search + PWA | HIGH | IN PROGRESS |
| CR-029 | 2026-05-03 | E2E Playwright tests | MEDIUM | DONE |

---

*Next review: Weekly on Monday*
*Document owner: bookedai.au Engineering*
