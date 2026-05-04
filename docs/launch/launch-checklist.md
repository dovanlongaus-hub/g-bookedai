# Launch Checklist — Longcare AU / bookedai.au

## Pre-Launch (Day 14)

### Infrastructure
- [x] PostgreSQL database running (16 tables, 3 migrations)
- [x] Redis cache running
- [x] All 7 PM2 processes online
- [x] Nginx reverse proxy configured
- [x] Cloudflare DNS + SSL (Flexible mode)
- [x] Docker Compose for local dev
- [x] Cloud Build connected to GitHub

### Domains
- [x] longcare.au — Landing page
- [x] g.longcare.au — AI Chat (3 languages)
- [x] book.longcare.au — Booking flow
- [x] app.longcare.au — User dashboard
- [x] admin.longcare.au — Admin dashboard

### Backend
- [x] API Gateway (Express 5 + Firebase Auth)
- [x] Agent Service (Gemini 2.5 Flash / fallback)
- [x] 17 Vitest tests passing
- [x] Zod validation on all endpoints
- [x] Helmet + rate limiting + CORS
- [x] Health check with DB connectivity

### Frontend
- [x] Dark glassmorphism UI theme
- [x] Tailwind CSS v4
- [x] i18n (EN/VI/ZH) — client-side
- [x] PWA manifests
- [x] Schema.org SEO markup
- [x] sitemap.xml + robots.txt

### AI & Integrations
- [x] Gemini 2.5 Flash AI Chat (with fallback)
- [x] Google Calendar + Meet (code ready, needs OAuth)
- [x] Gmail API (code ready, needs OAuth)
- [x] Google Docs session notes (code ready)
- [x] Google Drive file management (code ready)
- [x] NotebookLM integration (code ready)
- [x] Pub/Sub event bus (9 topics defined)
- [x] Firestore real-time (code ready)
- [x] BigQuery analytics (code ready)
- [x] Cloud Translation (code ready)

### Payments
- [ ] Stripe test keys configured
- [ ] Stripe Checkout flow tested
- [ ] Bank transfer instructions displayed
- [ ] Webhook signature verification active

### Google Workspace
- [ ] OAuth consent screen configured
- [ ] Calendar API enabled + tested
- [ ] Gmail API enabled + tested
- [ ] Service account with correct scopes

### Analytics
- [ ] GA4 property created
- [ ] GTM container created
- [ ] Conversion events configured
- [ ] Google Ads account linked

### Accounting
- [ ] Xero account connected
- [ ] Chart of accounts configured
- [ ] GST settings verified
- [ ] Invoice templates created

## Post-Launch (Day 15-30)
- [ ] First 5 bookings
- [ ] First $500 revenue
- [ ] Google Ads campaign live
- [ ] LinkedIn organic posts started
- [ ] First customer testimonial
- [ ] Weekly R&D report running
- [ ] Drive Sync daily reports active

## Revenue Targets
| Period | Bookings | Revenue |
|---|---|---|
| Week 1 | 5 | $200 |
| Week 2 | 10 | $500 |
| Month 1 | 20 | $2,000 |
| Month 3 | 50 | $5,000 |
