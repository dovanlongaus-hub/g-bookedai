# Launch Checklist — Longcare AU / bookedai.au

## Pre-Launch

### Infrastructure
- [x] PostgreSQL database running (16 tables, 3 migrations)
- [x] Redis cache running
- [x] 8 PM2 processes online (api, agent, web-g, web-longcare, booking, user-app, admin, meet)
- [x] Nginx reverse proxy configured (7 domains)
- [x] Cloudflare DNS + SSL Flexible mode
- [x] Docker Compose for local dev
- [x] Cloud Build connected to GitHub
- [x] PM2 ecosystem.config.cjs with .env auto-load

### Domains (6 live)
- [x] longcare.au — Landing page (hero, services, FAQ, footer, nav)
- [x] g.longcare.au — AI Chat (EN/VI/ZH, 15+ auto-reply topics)
- [x] book.longcare.au — 4-step booking (Service → Time → Contact → Payment)
- [x] meet.longcare.au — Meeting room lobby + Google Meet redirect
- [x] app.longcare.au — User dashboard
- [x] admin.longcare.au — Admin dashboard

### Backend
- [x] API Gateway (Express 5 + Firebase Auth + trust proxy)
- [x] Agent Service (Gemini fallback + OpenAI ready)
- [x] 17 Vitest tests passing
- [x] Zod validation on all endpoints
- [x] Helmet + rate limiting + CORS
- [x] Health check with DB connectivity
- [x] Guest checkout endpoint (no auth for booking page)

### Frontend
- [x] Dark glassmorphism UI theme
- [x] Tailwind CSS v4
- [x] i18n (EN/VI/ZH) — client-side language switcher
- [x] PWA manifests
- [x] Schema.org SEO markup (LocalBusiness, FAQ)
- [x] sitemap.xml + robots.txt
- [x] SVG logos + service icons
- [x] GA4/GTM analytics components (ready, needs measurement ID)
- [x] AI chatbot widget on all pages (floating green button)
- [x] Navigation bar on longcare.au

### Payments
- [x] Stripe LIVE keys configured (sk_live_*)
- [x] Stripe Checkout flow working (guest-checkout endpoint)
- [x] QR payment: AUD (PayID/BSB) + VND (Vietcombank VietQR)
- [x] Real-time AUD/VND exchange rate
- [x] Pay Later option (book now, pay before session)
- [x] Bank account: Van Long DO (BSB 062-517, Acc 11404999)
- [ ] Stripe webhook verification (needs STRIPE_WEBHOOK_SECRET)

### AI Chat & Customer Care
- [x] AI chatbot on all longcare.au pages (24/7)
- [x] Auto-reply: pricing, booking, cancel, refund, payment, contact, WhatsApp
- [x] Vietnamese + English auto-replies
- [x] Fallback when Gemini/OpenAI unavailable
- [ ] Gemini/OpenAI live AI (needs working API key)

### Google Workspace
- [x] Google OAuth Client ID + Secret configured
- [x] Calendar integration code (packages/google)
- [x] Gmail API code ready
- [x] meet.longcare.au branded meeting rooms
- [ ] OAuth consent screen approved by Google
- [ ] Calendar API tested with real events
- [ ] Gmail API tested with real emails

### SEO & Marketing
- [x] /services, /about, /contact pages
- [x] Schema.org LocalBusiness + FAQ markup
- [x] sitemap.xml + robots.txt
- [x] Launch campaign data (5 channels, UTM)
- [x] Course Track A, Lesson 1 content
- [ ] GA4 property created (needs measurement ID)
- [ ] Google Ads campaign launched
- [ ] LinkedIn organic posts started

### Accounting
- [x] Chart of accounts documented (Xero-ready)
- [x] GST treatment rules (10% Australian)
- [x] Invoice types + GST calculation code
- [ ] Xero account connected
- [ ] First invoice generated

### Documentation
- [x] CLAUDE.md project guide
- [x] 14-day implementation plan (100% complete)
- [x] Cloudflare DNS config guide
- [x] Cloud Run deployment guide
- [x] Weekly R&D report template
- [x] Launch checklist (this file)

## Post-Launch (Next Steps)
- [ ] Get working Gemini/OpenAI API key for live AI chat
- [ ] Set up GA4 property + GTM container
- [ ] Configure Stripe webhook endpoint
- [ ] Test Google OAuth login flow end-to-end
- [ ] Create first Google Calendar event via API
- [ ] Send first Gmail confirmation via API
- [ ] Launch Google Ads campaign
- [ ] Post on LinkedIn, Facebook
- [ ] First 5 real bookings
- [ ] First $500 revenue
- [ ] Connect Xero accounting
- [ ] Drive Sync daily reports to ceo@longcare.au

## Revenue Targets
| Period | Bookings | Revenue |
|---|---|---|
| Week 1 | 5 | $200 |
| Week 2 | 10 | $500 |
| Month 1 | 20 | $2,000 |
| Month 3 | 50 | $5,000 |

## Project Stats
- **237 source files**, 10,677 lines of TypeScript
- **20 git commits** on https://github.com/dovanlongaus-hub/g-bookedai
- **6 live domains** (HTTPS via Cloudflare)
- **8 PM2 processes** (api, agent, 6 Next.js apps)
- **16 database tables**, 5 services seeded
- **17 tests** passing
