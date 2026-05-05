# BookedAI — Product Requirements Document v5.0

> **Version:** 5.0 FINAL | **Date:** 2026-05-05
> **Product:** bookedai.au — The AI Revenue Engine
> **First Tenant:** longcare.au — AI Mentor & Learning
> **Status:** Production Live

---

## 1. Executive Summary

BookedAI is an AI-powered SaaS platform that automates the entire customer journey for service businesses — from initial contact through AI chat, to booking, payment, video meetings, session intelligence, and customer retention.

**Live since:** 2026-05-04
**Domains:** 6 live (HTTPS via Cloudflare)
**Architecture:** Monorepo (pnpm workspaces) with 6 Next.js apps, 9 Express services, 4 shared packages

---

## 2. Business Model

### Platform (g.bookedai.au)
| Plan | Price | Features |
|---|---|---|
| Starter | $0/mo | 10 bookings, 1 language, basic booking |
| Growth | $99/mo | Unlimited bookings, 3 languages, AI notes, WhatsApp |
| Enterprise | Custom | White-label, API, team training, dedicated support |
| Commission | 5-10% per booking | No monthly fee alternative |

### First Tenant (longcare.au)
| Service | Price (AUD, inc GST) |
|---|---|
| 30-min AI Starter | $29 (launch) / $49 (standard) |
| 1-hour AI Mentor | $99 (intro) / $120 (standard) |
| 5-Session Package | $450 |
| 10-Session Package | $850 |
| Business Transformation | $1,500-$3,000+ |
| Single Lesson | $19-$29 |
| Module of 5 Lessons | $79-$149 |

---

## 3. Architecture

### Domain Map
| Domain | App | Port | Status |
|---|---|---|---|
| g.longcare.au | web-g-bookedai (SaaS Platform) | 3000 | LIVE |
| longcare.au | web-longcare (Tenant Landing) | 3001 | LIVE |
| book.longcare.au | booking-web (Booking Flow) | 3002 | LIVE |
| meet.longcare.au | meet (Meeting Rooms) | 3005 | LIVE |
| app.longcare.au | user-app (User Dashboard) | 3003 | LIVE |
| admin.longcare.au | admin-app (Admin Dashboard) | 3004 | LIVE |
| (internal) | API Gateway | 8090 | LIVE |
| (internal) | AI Agent | 8091 | LIVE |
| (internal) | Drive Sync | 8083 | LIVE |

### Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, Tailwind CSS v4 |
| Backend | Express 5, TypeScript, Zod validation |
| AI | Gemini 2.5 Flash + OpenAI (fallback) + Smart Fallback |
| Database | PostgreSQL 16 (16 tables, 4 migrations) |
| Cache | Redis 7 |
| Auth | Firebase Auth + Google Sign-In |
| Payments | Stripe LIVE (5 products) + QR (AUD/VND) + PayID |
| Meetings | Google Meet via meet.longcare.au |
| Email | Gmail API + Nodemailer templates |
| WhatsApp | Cloud API auto-reply |
| Analytics | GA4 (2 properties) + GTM + conversion tracking |
| Infrastructure | Docker, PM2, Nginx, Cloudflare |
| CI/CD | GitHub Actions + Cloud Build |

---

## 4. Features Implemented

### 4.1 AI Chat & Customer Care
- 15+ intent auto-reply topics (EN/VI/ZH)
- Intent classifier (12 intents, multilingual)
- Tool-use system (searchServices, getServiceDetails)
- Floating chat widget on all pages
- WhatsApp auto-reply (+61 455 301 335)

### 4.2 Booking System
- Single-page auto-scroll flow (no step navigation)
- Real-time availability calendar (week view)
- Service cards with SVG illustrations + badges
- Expandable curriculum + "What's included" + next course suggestions
- Guest booking (no auth required)
- Booking persist to database
- QR code booking ref on success page
- Manage page: reschedule, cancel, change service
- Pay Later option

### 4.3 Payment Processing
- Stripe LIVE checkout (5 products configured)
- QR code scan: AUD (PayID) + VND (Vietcombank VietQR)
- Real-time AUD/VND exchange rate
- Bank transfer with booking reference
- Webhook signature verification
- Booking success/cancel pages

### 4.4 Meetings
- Branded meeting rooms (meet.longcare.au/BOOK-XXXXX)
- Auto-redirect to Google Meet
- Calendar integration (Add to Google Calendar)
- WhatsApp join link

### 4.5 Learning Engine
- Gemini AI session summaries
- Q&A extraction
- Google Docs note creation
- NotebookLM integration
- Course content pages (Track A, 5 lessons)

### 4.6 Marketing Automation
- 8-channel campaign generation
- UTM tracking system
- CEO approval workflow (5 states)
- Social media content cards (admin)
- Email templates (booking, reminder, cancel, welcome, drip)

### 4.7 Analytics & Reporting
- GA4: 2 properties (longcare + bookedai)
- GTM: shared container
- 12 conversion events tracked
- Server-side measurement paths (/metrics, /analytics)
- Admin revenue chart (SVG)
- Booking funnel visualization
- Channel attribution
- CSV export (bookings, revenue, users)
- Drive Sync daily/weekly CEO reports

### 4.8 Admin Tools
- Dashboard with real DB data (KPIs, revenue, bookings)
- User management (search, export)
- Booking management (approve bank transfers)
- Webhook event log viewer
- Email template previews
- Marketing campaign cards
- Health check dashboard
- Analytics page (funnel, metrics, channels)

### 4.9 Platform Features (g.bookedai.au)
- Enterprise SaaS landing page
- Partner onboarding wizard (4-step)
- Partner signup API (tenant creation)
- Multi-tenant admin dashboard
- API documentation + guide
- OpenAPI 3.1 spec
- Pricing (Starter/Growth/Enterprise)

### 4.10 SEO & Performance
- Schema.org (LocalBusiness, Service, Article, BreadcrumbList)
- Dynamic OG images (/api/og)
- sitemap.xml + robots.txt
- PWA service worker (offline support)
- Tailwind CSS v4
- Dark/Light theme toggle
- Mobile responsive (hamburger menu)
- Search page
- Loading skeletons + error boundaries
- Accessibility (aria labels, keyboard nav)
- Print styles

---

## 5. Pages Summary

### g.bookedai.au (14 pages)
Landing, Features, Integrations, Security, Partners, Docs, API-docs, API Guide, Demo, Admin, Onboarding, Error, 404, Login

### longcare.au (18 pages)
Landing, Services, Pricing, FAQ, How-it-Works, Mentors, Testimonials, Blog (listing + 3 posts), Courses, About, Contact, Terms, Privacy, Get-Started, Search, Error, 404, Loading

### book.longcare.au (5 pages)
Booking (single page flow), Success, Cancel, Manage/[ref], Error

### meet.longcare.au (2 pages)
Root (redirect), Meeting Room/[ref]

### app.longcare.au (6 pages)
Dashboard, Settings, Notifications, Login, Error, 404

### admin.longcare.au (10 pages)
Dashboard, Bookings, Marketing, Emails, Health, Webhooks, Users, Analytics, Login, Error

**Total: 55 pages**

---

## 6. API Endpoints (17 route files, 45+ endpoints)

| Route File | Key Endpoints |
|---|---|
| health | GET /health |
| auth | GET /auth/providers, /auth/openai/* |
| chat | POST /chat |
| services | GET /services, POST /services/search |
| booking | POST /booking/hold, /confirm, /cancel, /reschedule |
| guest-booking | POST /guest-booking |
| payment | POST /payment/checkout, /payment/guest-checkout |
| webhooks | POST /webhooks/stripe |
| whatsapp | GET+POST /whatsapp |
| learning | POST /learning/session-summary, GET /learning/history |
| marketing | POST /marketing/campaigns, /marketing/approve |
| dashboard | GET /dashboard/admin/stats, /user/bookings, /admin/users |
| export | GET /export/bookings.csv, /revenue.csv, /users.csv |
| referral | POST /referral/generate, GET /referral/track/:code |
| partners | POST /partners/apply, GET /partners/list |
| cron | POST /cron/expire-holds, /send-reminders-24h, /daily-summary |
| sse | GET /events/booking/:id, /events/chat/:id |
| courses | courses API |
| notifications | notifications API |

---

## 7. Database Schema (16 tables, 6 migrations)

Core: tenants, users, services, availability_slots, bookings, payments
Learning: learning_sessions, learning_notes
Marketing: marketing_campaigns, social_content_items
System: audit_logs, webhook_events, calendar_events, invoices, notification_preferences
Courses: courses (migration 006)

---

## 8. Security

| Layer | Implementation |
|---|---|
| Auth | Firebase Auth + JWT sessions |
| Headers | Helmet (CSP, HSTS, X-Frame) |
| CORS | Restricted to known origins |
| Rate Limiting | 100 req/15min per IP |
| Validation | Zod schema on all endpoints |
| Webhooks | Stripe signature verification |
| API Keys | Tenant-based API key auth |
| DDoS | Cloudflare proxied |
| SSL | Cloudflare Flexible |
| Trust Proxy | Behind nginx/Cloudflare |

---

## 9. Change Request Log (53 CRs)

| CR# | Description | Status |
|---|---|---|
| CR-001 | Initial monorepo setup with pnpm workspaces | DONE |
| CR-002 | PostgreSQL schema design (16 tables) | DONE |
| CR-003 | Express 5 API gateway with health check | DONE |
| CR-004 | Firebase Auth integration | DONE |
| CR-005 | Gemini AI chat agent with intent classifier | DONE |
| CR-006 | Service listing and search API | DONE |
| CR-007 | Booking hold/confirm/cancel/reschedule flow | DONE |
| CR-008 | Stripe payment integration (checkout + webhooks) | DONE |
| CR-009 | Guest booking (no auth required) | DONE |
| CR-010 | QR code payments (AUD PayID + VND VietQR) | DONE |
| CR-011 | Google Meet meeting rooms | DONE |
| CR-012 | Gmail API email templates | DONE |
| CR-013 | WhatsApp Cloud API auto-reply | DONE |
| CR-014 | Learning engine (Gemini summaries + Google Docs) | DONE |
| CR-015 | Marketing agent (8-channel content generation) | DONE |
| CR-016 | Admin dashboard with real DB data | DONE |
| CR-017 | User dashboard (bookings, settings, notifications) | DONE |
| CR-018 | longcare.au landing page (18 pages) | DONE |
| CR-019 | book.longcare.au booking flow (single-page auto-scroll) | DONE |
| CR-020 | g.bookedai.au SaaS platform landing page | DONE |
| CR-021 | Partner onboarding wizard (4-step) | DONE |
| CR-022 | API documentation + OpenAPI 3.1 spec | DONE |
| CR-023 | Schema.org structured data | DONE |
| CR-024 | Dynamic OG images (/api/og) | DONE |
| CR-025 | GA4 + GTM analytics integration | DONE |
| CR-026 | SEO: sitemap.xml + robots.txt | DONE |
| CR-027 | PWA service worker (offline support) | DONE |
| CR-028 | Dark/Light theme toggle | DONE |
| CR-029 | Mobile responsive design | DONE |
| CR-030 | CSV export (bookings, revenue, users) | DONE |
| CR-031 | Booking funnel visualization | DONE |
| CR-032 | Revenue chart (SVG) | DONE |
| CR-033 | Email template previews in admin | DONE |
| CR-034 | Webhook event log viewer | DONE |
| CR-035 | Health check dashboard | DONE |
| CR-036 | SSE real-time events (booking, chat) | DONE |
| CR-037 | Cron jobs (expire holds, reminders, daily summary) | DONE |
| CR-038 | Referral program API | DONE |
| CR-039 | Course content pages (Track A, 5 lessons) | DONE |
| CR-040 | Multi-language AI chat (EN/VI/ZH) | DONE |
| CR-041 | Availability slots management (70 slots) | DONE |
| CR-042 | Booking manage page (reschedule, cancel, change service) | DONE |
| CR-043 | Print styles for all pages | DONE |
| CR-044 | Error boundaries + loading skeletons | DONE |
| CR-045 | Accessibility (aria labels, keyboard nav) | DONE |
| CR-046 | Search page on longcare.au | DONE |
| CR-047 | Blog with 3 posts on longcare.au | DONE |
| CR-048 | Nginx reverse proxy + Cloudflare DNS setup | DONE |
| CR-049 | PM2 process management (9 services) | DONE |
| CR-050 | Docker Compose (PostgreSQL + Redis) | DONE |
| CR-051 | Drive Sync service (CEO reports) | DONE |
| CR-052 | Smart AI fallback (Gemini -> OpenAI) | DONE |
| CR-053 | Logo consistency across all apps | DONE |

---

## 10. Project Statistics

| Metric | Value |
|---|---|
| Git commits | 49 |
| Pages | 55 |
| TypeScript files | 250+ |
| API route files | 17 (45+ endpoints) |
| Live domains | 6 HTTPS |
| PM2 services | 9 online |
| Unit tests | 17 |
| E2E tests | 16 |
| DB tables | 16 |
| DB bookings | 2+ real |
| DB users | 3+ |
| Stripe products | 5 LIVE |
| Availability slots | 70 |
| Tenants | 2+ |

---

## 11. Deployment

| Component | Details |
|---|---|
| Server | GCE VM 34.40.164.84 (australia-southeast1) |
| DNS | Cloudflare (SSL Flexible, 6 subdomains) |
| Process Manager | PM2 (9 services, auto-restart on reboot) |
| Database | PostgreSQL 16 via Docker |
| Cache | Redis 7 via Docker |
| CI/CD | GitHub Actions (CI) + Cloud Build (deploy) |
| Repo | github.com/dovanlongaus-hub/g-bookedai |

---

## 12. Roadmap (Next 30 Days)

### Week 1-2 (Immediate)
- [ ] Get working Gemini/OpenAI API key for live AI chat
- [ ] Google OAuth consent screen approval
- [ ] Launch Google Ads campaign
- [ ] First 5 real customer bookings
- [ ] LinkedIn organic posts

### Week 3-4 (Growth)
- [ ] Xero accounting integration
- [ ] SMS notifications (Twilio)
- [ ] Course video content
- [ ] Second tenant onboarding
- [ ] Referral program launch

### Month 2 (Scale)
- [ ] Mobile app (React Native)
- [ ] Multi-language content pages
- [ ] Advanced AI agent (tool-use with real booking)
- [ ] Stripe subscription billing for platform
- [ ] 20+ bookings, $2,000 revenue target

---

*Document owner: bookedai.au Engineering*
*Last updated: 2026-05-05*
