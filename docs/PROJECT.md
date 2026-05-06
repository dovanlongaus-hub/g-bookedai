# BookedAI — Complete Project Documentation

> **Version:** 5.1 | **Date:** 2026-05-05
> **Product:** bookedai.au — The AI Revenue Engine
> **First Tenant:** longcare.au — AI Mentor & Learning
> **Status:** Production Live
> **Repository:** https://github.com/dovanlongaus-hub/g-bookedai

---

## 1. Executive Summary

**BookedAI** is an AI-powered SaaS platform that automates the entire customer journey for service businesses — from AI chat, to booking, payment, video meetings, session intelligence, and customer retention.

**Core Promise:** *"Turn customer intent into revenue — automatically"*

**Key Achievements:**
- 53 git commits in 2 days
- 6 live HTTPS domains
- 53 pages across 6 apps
- 19 API route files (50+ endpoints)
- Stripe LIVE payments
- WhatsApp auto-reply
- AI chat in 3 languages (EN/VI/ZH)

---

## 2. Business Model

### 2.1 Platform — g.bookedai.au (SaaS for SMEs)

| Plan | Monthly | Features |
|------|---------|----------|
| **Starter** | $0 | 10 bookings/mo, 1 language, basic booking page |
| **Growth** | $99 | Unlimited bookings, 3 languages, AI notes, WhatsApp, analytics |
| **Enterprise** | Custom | White-label, API access, team training, dedicated support |
| **Commission** | 5-10% per booking | No monthly fee alternative |

### 2.2 First Tenant — longcare.au (AI Mentoring)

| Service | Launch Price | Standard Price | Duration |
|---------|-------------|----------------|----------|
| 30-min AI Starter | **$29** | $49 | 30 min |
| 1-hour AI Mentor | **$99** | $120 | 60 min |
| 5-Session Package | **$450** | — | 5 × 60 min |
| 10-Session Package | **$850** | — | 10 × 60 min |
| Business Transformation | **$1,500–$3,000+** | — | Custom |
| Single Lesson | $19–$29 | — | Self-paced |
| Module (5 lessons) | $79–$149 | — | Self-paced |

**Payment Methods:** Stripe card, QR code (AUD PayID + VND Vietcombank), Bank transfer, Pay Later

---

## 3. Architecture

### 3.1 System Overview

```
Users → Cloudflare (DNS/SSL) → Nginx (reverse proxy) → PM2 (process manager)
  ├── 6 Frontend Apps (Next.js 15 + React 19 + Tailwind v4)
  ├── 9 Backend Services (Express 5 + TypeScript)
  ├── 4 Shared Packages (@bookedai/shared, db, google, ui)
  └── Infrastructure
      ├── PostgreSQL 16 (16 tables, 6 migrations)
      ├── Redis 7 (cache)
      ├── Google Cloud (Gemini, Calendar, Gmail, Drive, Pub/Sub, Firestore, BigQuery)
      └── External (Stripe LIVE, WhatsApp Cloud API, GA4, GTM)
```

### 3.2 Domain Map

| Domain | App | Port | Purpose | Status |
|--------|-----|------|---------|--------|
| **g.longcare.au** | web-g-bookedai | 3000 | SaaS Platform Landing | LIVE |
| **longcare.au** | web-longcare | 3001 | Tenant Landing + Content | LIVE |
| **book.longcare.au** | booking-web | 3002 | Booking + Payment Flow | LIVE |
| **meet.longcare.au** | meet | 3005 | Meeting Room Lobby | LIVE |
| **app.longcare.au** | user-app | 3003 | User Dashboard | LIVE |
| **admin.longcare.au** | admin-app | 3004 | Admin Dashboard | LIVE |

### 3.3 Backend Services

| Service | Port | Purpose | Status |
|---------|------|---------|--------|
| API Gateway | 8090 | REST API + Auth + Validation | LIVE |
| AI Agent | 8091 | Gemini + Intent Classifier + Tools | LIVE |
| Drive Sync | 8083 | Google Drive CEO Reports | LIVE |
| Notification | 8082 | Email/SMS/Push (partial) | PARTIAL |
| Payment | — | Stripe SDK | LIVE |
| Learning Agent | — | Session AI Notes | DONE |
| Marketing Agent | — | Campaign Generation | DONE |
| Accounting Sync | — | Xero (planned) | STUB |
| Design Agent | 8084 | Brand/UI Generation | DONE |

### 3.4 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, Tailwind CSS v4, TypeScript |
| Backend | Express 5, TypeScript, Zod validation, Pino logging |
| AI | Google Gemini 2.5 Flash + OpenAI (fallback) + Smart Fallback (15+ intents) |
| Database | PostgreSQL 16 (16 tables, 6 migrations), Redis 7 |
| Auth | Firebase Auth (Google Sign-In) + JWT sessions |
| Payments | Stripe LIVE (5 products) + QR (AUD PayID + VND VietQR) + Bank Transfer |
| Meetings | Google Meet via meet.longcare.au branded rooms |
| Email | Gmail API + Nodemailer + 4 drip sequence templates |
| WhatsApp | Meta Cloud API auto-reply (+61 455 301 335) |
| Analytics | GA4 (2 properties) + GTM + 12 conversion events + server-side paths |
| Infrastructure | Docker, PM2 (auto-restart), Nginx, Cloudflare (SSL Flexible) |
| CI/CD | GitHub Actions (CI: lint+test+build) + Google Cloud Build (deploy) |
| Testing | Vitest (17 unit) + Playwright (16 E2E) |

---

## 4. Features — Complete List

### 4.1 AI Chat & Customer Care
- Floating chat widget on ALL longcare.au pages (bottom-right green button)
- 15+ intent auto-reply topics (booking, pricing, cancel, refund, payment, contact, greeting, services, meeting, learning, etc.)
- Intent classifier with 12 intents + entity extraction (service, price, email)
- Tool-use system (searchServices, getServiceDetails, generateBookingLink)
- Multilingual: English, Vietnamese, Chinese
- Language auto-detection from browser
- Quick suggestion buttons
- Conversation history per session
- Fallback when Gemini/OpenAI unavailable

### 4.2 WhatsApp Auto-Reply
- Webhook: longcare.au/whatsapp
- Auto-reply via AI agent with intent detection
- Language detection (EN/VI/ZH)
- Phone: +61 455 301 335
- Verified webhook endpoint

### 4.3 Booking System
- Single-page auto-scroll flow (select → time → contact → payment)
- NO step navigation — progressive reveal with auto-scroll
- 5 service cards with unique SVG illustrations
- Badges: MOST POPULAR / BEST VALUE / PREMIUM
- Launch vs standard pricing (strikethrough)
- Expandable detail view per service:
  - Full curriculum / learning path
  - "What's included" checklist (2-column)
  - "Next Step" course suggestion
- Availability calendar: 2-month range (8 weeks)
- Multi-session booking for 5/10 packages:
  - Auto-suggest same day+time weekly
  - Override individual sessions
  - Session list with numbered badges + remove
  - Progress indicator (3/5 sessions selected)
- Guest booking (no auth required)
- Booking persist to PostgreSQL database
- QR code booking ref on success page
- Manage page: /manage/BOOK-XXXXX (reschedule, cancel, change service)
- Pay Later option (book now, pay before session)
- Google Calendar "Add to Calendar" button with Meet link
- WhatsApp confirmation link

### 4.4 Payment Processing
- **Stripe LIVE** checkout (5 products configured on Stripe Dashboard)
- Guest checkout endpoint (no auth)
- QR code scan: AUD (PayID 0455301335, BSB 062-517, Acc 11404999)
- QR code scan: VND (Vietcombank 0071000985789, DO VAN LONG)
- Real-time AUD/VND exchange rate (api.exchangerate-api.com)
- Bank transfer with auto-generated booking reference
- Webhook signature verification (whsec_*)
- Booking success page (/booking/success)
- Payment cancelled page (/booking/cancel)
- Bank transfer admin approval API

### 4.5 Meetings
- Branded meeting rooms: meet.longcare.au/BOOK-XXXXX
- Auto-redirect to Google Meet (5-second countdown)
- Booking ref display on meeting lobby
- WhatsApp support link from meeting page
- Google Calendar integration (event with Meet link as location)

### 4.6 Learning Engine
- Gemini AI session summaries with JSON parsing
- Q&A extraction from transcripts
- Improvement suggestions
- Google Docs note creation
- NotebookLM integration
- Learning history API
- Next-course recommendations
- Course content pages (Track A: AI Foundations, 5 lessons)
- Lesson 1 free, lessons 2-5 behind paywall ($19/lesson or $79/module)

### 4.7 Marketing Automation
- 8-channel campaign generation (Google Ads, YouTube Shorts, LinkedIn, Facebook, Instagram, Email, Google Business Profile, SEO Blog)
- UTM tracking system with naming convention
- CEO approval workflow (DRAFT → NEEDS_REVIEW → APPROVED → SCHEDULED → PUBLISHED)
- Launch campaign data with 5 channels
- Admin: social media content cards with "Copy to Clipboard"
- Admin: email template previews (4 templates with HTML preview)
- Email drip sequences (4 emails: welcome, pre-session, post-session, re-engagement)

### 4.8 Analytics & Reporting
- GA4: 2 properties (longcare G-CKG4YQ57VV + bookedai G-2L68DR1GD4)
- GTM: shared container (GTM-T9CNRGZL)
- 12 conversion events tracked (view_service, select_time, begin_checkout, purchase, sign_up, start_trial, open_chat, etc.)
- Server-side measurement paths (/metrics on longcare, /analytics on bookedai)
- Admin revenue chart (SVG bar chart)
- Admin analytics page: booking funnel, conversion metrics, channel attribution
- CSV export: bookings.csv, revenue.csv, users.csv
- Drive Sync daily/weekly CEO reports
- Cron jobs: hold expiry (10min), 24h reminders, daily summary

### 4.9 Admin Tools
- Dashboard with REAL DB data (KPIs, revenue, recent bookings)
- Revenue by service table (from DB)
- User management (search, stats, table, CSV export)
- Booking management (filter tabs, approve bank transfers)
- Webhook event log viewer
- Email template previews
- Marketing campaign cards
- Health check dashboard (6 services real-time)
- Analytics page (funnel, metrics, channels)
- Navigation: Dashboard / Bookings / Marketing / Emails / Health / Webhooks / Users / Analytics

### 4.10 Platform Features — g.bookedai.au
- Enterprise SaaS landing page (Google/Vercel style)
- Inter font, #0070f3 accent, clean grid, SVG icons
- Features page (6 capabilities deep-dive)
- Integrations page (17 integrations grid)
- Security page (infrastructure, compliance, SLA)
- Partners page (SME program, subscription + commission models)
- Partner onboarding wizard (4-step: Business → Services → Branding → Launch)
- Partner signup API (creates tenant + admin user automatically)
- Multi-tenant admin dashboard (tenant list, stats)
- API documentation page
- API Guide with code examples (curl, Node.js, Python)
- API-docs page (interactive endpoint browser with tag filter)
- OpenAPI 3.1 spec (docs/openapi.yaml)
- Demo page (embedded chat + booking links)
- Pricing (Starter $0 / Growth $99 / Enterprise Custom)
- Official BookedAI logo (logo-light.png)
- Chat widget (indigo theme)

### 4.11 SEO & Performance
- Schema.org: LocalBusiness, Service, Article, BreadcrumbList, FAQ
- Dynamic OG images (/api/og?title=...&subtitle=...)
- sitemap.xml (15+ pages) + robots.txt
- PWA service worker (offline caching)
- Dark/Light theme toggle (localStorage)
- Mobile responsive (hamburger menu with overlay)
- Search page (/search — filters across services, blog, pages)
- Loading skeletons with shimmer animation
- Error boundaries (5 apps) + error.tsx pages
- Accessibility (aria-label, role=progressbar, keyboard navigation)
- Print styles (@media print)
- Tailwind CSS v4
- Next.js standalone output for optimized builds
- Nginx static asset caching headers

### 4.12 Legal & Compliance
- Terms of Service (/terms) — booking policy, payments, liability
- Privacy Policy (/privacy) — Australian Privacy Act (APPs 1-13)
- GST-inclusive pricing (10% Australian)
- Audit logging on all state changes
- GDPR-ready data structure

---

## 5. All Pages (53 pages)

### g.bookedai.au — SaaS Platform (15 pages)
| Page | Path |
|------|------|
| Landing | / |
| Features | /features |
| Integrations | /integrations |
| Security | /security |
| Partners | /partners |
| Documentation | /docs |
| API Guide | /docs/guide |
| API Reference | /api-docs |
| Demo | /demo |
| Onboarding Wizard | /onboarding |
| Platform Admin | /admin |
| Email Preview | /admin/email-preview |
| OpenAI Auth | /admin/openai-auth |
| Login | /login |
| Auth Callback | /auth/callback |

### longcare.au — Tenant (19 pages)
| Page | Path |
|------|------|
| Landing | / |
| Services | /services |
| AI Starter Detail | /services/ai-starter |
| AI Mentor Detail | /services/ai-mentor |
| Packages Detail | /services/packages |
| Pricing | /pricing |
| How it Works | /how-it-works |
| FAQ | /faq |
| Mentors | /mentors |
| Testimonials | /testimonials |
| Blog Listing | /blog |
| Blog Posts (3) | /blog/[slug] |
| Courses | /courses |
| About | /about |
| Contact | /contact |
| Terms | /terms |
| Privacy | /privacy |
| Get Started (Ads) | /get-started |
| Search | /search |

### book.longcare.au — Booking (4 pages)
| Page | Path |
|------|------|
| Booking Flow | / |
| Success | /booking/success |
| Cancel | /booking/cancel |
| Manage Booking | /manage/[ref] |

### meet.longcare.au — Meetings (2 pages)
| Page | Path |
|------|------|
| Redirect | / |
| Meeting Room | /[ref] |

### app.longcare.au — User Dashboard (4 pages)
| Page | Path |
|------|------|
| Dashboard | / |
| Settings | /settings |
| Notifications | /notifications |
| Login | /login |

### admin.longcare.au — Admin (9 pages)
| Page | Path |
|------|------|
| Dashboard | / |
| Bookings | /bookings |
| Marketing | /marketing |
| Emails | /emails |
| Health | /health |
| Webhooks | /webhooks |
| Users | /users |
| Analytics | /analytics |
| Login | /login |

---

## 6. API Endpoints (19 route files, 50+ endpoints)

| Route File | Endpoints | Auth |
|------------|-----------|------|
| **health.ts** | GET /health, POST /health/test-email | No |
| **auth.ts** | GET /auth/providers, /auth/openai/* | No |
| **chat.ts** | POST /chat | No |
| **services.ts** | GET /services, POST /services/search | No |
| **booking.ts** | POST /booking/hold, /confirm, /cancel, /reschedule | Auth |
| **guest-booking.ts** | POST /guest-booking | No |
| **payment.ts** | POST /payment/checkout, /payment/guest-checkout | Mixed |
| **webhooks.ts** | POST /webhooks/stripe | Signature |
| **whatsapp.ts** | GET+POST /whatsapp | Verify Token |
| **learning.ts** | POST /learning/session-summary, GET /learning/history | Auth |
| **marketing.ts** | POST /marketing/campaigns, /marketing/approve | Admin |
| **dashboard.ts** | GET /dashboard/admin/stats, /user/bookings, /admin/users, /admin/revenue-by-service, /admin/pending-payments, POST /admin/approve-payment | Mixed |
| **export.ts** | GET /export/bookings.csv, /revenue.csv, /users.csv, /webhook-events | No |
| **referral.ts** | POST /referral/generate, GET /referral/track/:code | No |
| **partners.ts** | POST /partners/apply, GET /partners/list | No |
| **cron.ts** | POST /cron/expire-holds, /send-reminders-24h, /daily-summary | Internal |
| **courses.ts** | Courses API | Mixed |
| **notifications.ts** | Notifications API | Auth |
| **sse.ts** | GET /events/booking/:id, /events/chat/:id | SSE |

---

## 7. Database Schema

### Tables (16)

| Table | Purpose | Migration |
|-------|---------|-----------|
| tenants | Multi-tenant organizations | 001 |
| users | User accounts (email, role, language) | 001 |
| services | Service catalog (name, price, currency) | 001 |
| availability_slots | Time slot management | 001 |
| bookings | Booking records with status machine | 001 |
| payments | Payment records (Stripe, bank transfer) | 001 |
| learning_sessions | AI session summaries | 001 |
| marketing_campaigns | Campaign records | 001 |
| audit_logs | All state changes | 001 |
| invoices | Invoice tracking (GST/BAS) | 002 |
| social_content_items | Multi-channel campaign content | 002 |
| notification_preferences | User notification settings | 002 |
| calendar_events | Google Calendar sync | 002 |
| learning_notes | Google Docs session notes | 002 |
| webhook_events | Stripe webhook idempotency | 003 |
| courses | Course content | 006 |

### Booking Status Machine
```
DRAFT → HOLD (10min auto-expiry) → PENDING_PAYMENT → CONFIRMED → [RESCHEDULED | CANCELLED | REFUNDED | NO_SHOW]
```

---

## 8. Security

| Layer | Implementation | Status |
|-------|---------------|--------|
| Auth (Primary) | Firebase Auth / Google Sign-In | DONE |
| Auth (Fallback) | JWT sessions + OpenAI OAuth | DONE |
| API Keys | Tenant-based X-API-Key header | DONE |
| Headers | Helmet (CSP, HSTS, X-Frame-Options) | DONE |
| CORS | Restricted to known origins | DONE |
| Rate Limiting | 100 req/15min per IP | DONE |
| Validation | Zod schema on all endpoints | DONE |
| Webhooks | Stripe signature verification | DONE |
| Trust Proxy | Behind Nginx/Cloudflare | DONE |
| DDoS | Cloudflare proxied | DONE |
| SSL | Cloudflare Flexible mode | DONE |

---

## 9. Deployment

| Component | Details |
|-----------|---------|
| Server | GCE VM 34.40.164.84 (australia-southeast1) |
| DNS | Cloudflare (SSL Flexible, 7+ subdomains) |
| Process Manager | PM2 (9 services, auto-restart on reboot) |
| Database | PostgreSQL 16 via Docker |
| Cache | Redis 7 via Docker |
| CI/CD | GitHub Actions (CI) + Cloud Build (deploy) |
| Google SA | bookedai-drive-sync@auschain-489904.iam.gserviceaccount.com |
| Repo | github.com/dovanlongaus-hub/g-bookedai |
| WhatsApp | +61 455 301 335 (webhook: longcare.au/whatsapp) |
| Stripe | LIVE (5 products, webhook: book.longcare.au/webhooks/stripe) |

---

## 10. Project Statistics

| Metric | Value |
|--------|-------|
| Git commits | **53** |
| Pages | **53** |
| TypeScript files | **253** |
| API route files | **19** (50+ endpoints) |
| Live domains | **6** HTTPS |
| PM2 services | **9** online |
| Unit tests | **17** (Vitest) |
| E2E tests | **16** (Playwright) |
| DB tables | **16** |
| DB migrations | **6** |
| DB bookings | **6** real |
| DB users | **7** |
| DB tenants | **2** (Longcare + Test Gym) |
| Availability slots | **70** (14 days seeded) |
| Stripe products | **5** LIVE |
| GA4 properties | **2** |
| Conversion events | **12** |
| Email templates | **8** (4 transactional + 4 drip) |
| WhatsApp intents | **15+** |

---

## 11. Implementation Timeline

### Day 1 (2026-05-03/04)
- Commits 1-20
- Infrastructure: Docker, PostgreSQL, Redis, Nginx, Cloudflare DNS
- 5 Next.js apps + 7 Express services + 4 shared packages
- Full API (booking, payment, chat, learning, marketing)
- AI agent with Gemini integration
- Stripe LIVE payments + QR codes
- Google integrations package (17 services)
- Dark glassmorphism UI theme
- CI/CD (GitHub Actions + Cloud Build)
- i18n (EN/VI/ZH)

### Day 2 (2026-05-04/05)
- Commits 21-53
- WhatsApp auto-reply
- All content pages (FAQ, mentors, testimonials, blog, courses, terms, privacy)
- g.bookedai.au SaaS platform redesign (enterprise style)
- Partner onboarding wizard
- Admin tools (bookings, users, marketing, emails, health, webhooks, analytics)
- Booking UX redesign (single page auto-scroll)
- 2-month calendar + multi-session packages
- QR booking ref + manage page
- Revenue charts + analytics dashboard
- CSV exports + referral tracking
- Error boundaries + loading skeletons + accessibility
- PRD v5 + project documentation

---

## 12. Roadmap (Next 30 Days)

### Week 1-2: Launch
- [ ] Get working Gemini API key for live AI chat
- [ ] Google OAuth consent screen approval
- [ ] Launch Google Ads campaign (use /get-started landing)
- [ ] First 5 real customer bookings
- [ ] LinkedIn organic posts (use launch campaign data)
- [ ] First revenue: $200 target

### Week 3-4: Growth
- [ ] Xero accounting integration
- [ ] SMS notifications (Twilio)
- [ ] Course video content
- [ ] Second tenant onboarding
- [ ] Referral program launch
- [ ] Revenue target: $500

### Month 2: Scale
- [ ] Mobile app (React Native)
- [ ] Multi-language content pages (full VI/ZH)
- [ ] Advanced AI agent (tool-use with real booking creation)
- [ ] Stripe subscription billing for platform
- [ ] 20+ bookings, $2,000 revenue target
- [ ] 3+ tenants on platform

### Month 3: Enterprise
- [ ] White-label tenant branding
- [ ] Custom domain mapping for partners
- [ ] API key management dashboard
- [ ] Advanced analytics (BigQuery + Looker Studio)
- [ ] 50+ bookings, $5,000 revenue target

---

## 13. Known Issues & Blockers

| Issue | Impact | Resolution |
|-------|--------|------------|
| Gemini API key expired (403) | AI chat uses fallback | Need new key from aistudio.google.com |
| Google OAuth consent screen | Login redirects not working | Need Google approval |
| Xero not connected | No accounting automation | Need Xero account |
| SMS not configured | No SMS notifications | Need Twilio account |
| Availability slots are seeded (mock) | Not real calendar data | Connect Google Calendar API |

---

## 14. Contact & Support

| Channel | Details |
|---------|---------|
| Email | ceo@longcare.au |
| WhatsApp | +61 455 301 335 |
| AI Chat | g.longcare.au (24/7) |
| GitHub | github.com/dovanlongaus-hub/g-bookedai |
| Location | Sydney, NSW, Australia |

---

*Document owner: bookedai.au Engineering*
*Last updated: 2026-05-05*
*Co-Authored-By: Claude Opus 4.6 (1M context)*
