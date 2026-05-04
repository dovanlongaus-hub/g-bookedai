# 01 — Master Implementation Plan

## 1. Vision

**bookedai.au** is an **AI Revenue Engine Platform**.  
**g.bookedai.au** is the new AI entry/search/chat layer.  
**longcare.au** is the first production tenant that sells AI Mentor sessions, AI learning content, and SME transformation programs.

**Slogan:** Turn customer intent into revenue — automatically

## 2. Two-week objective

Within 14 days, launch a production-first MVP that can:

1. Capture customer intent on `g.bookedai.au`.
2. Recommend Longcare services.
3. Book real sessions at `book.longcare.au`.
4. Accept card payment and bank transfer instructions.
5. Create Google Calendar + Google Meet session.
6. Send Gmail confirmation.
7. Provide Google-login user dashboard.
8. Produce AI lesson summary, Q&A extraction, improvement suggestions, and next-course CTA.
9. Track marketing and revenue with GA4, GTM, Search Console, BigQuery, Looker Studio plan.
10. Run initial Google Ads and social/content campaigns.

## 3. Domain architecture

```txt
g.bookedai.au           → AI search/chat entry
agent.g.bookedai.au     → Gemini / Google Agent service
api.g.bookedai.au       → new API layer on Cloud Run
app.g.bookedai.au       → future multi-tenant workspace

longcare.au             → public tenant site
book.longcare.au        → booking/payment conversion page
app.longcare.au         → user learning dashboard
admin.longcare.au       → admin/revenue/ops dashboard
services.longcare.au    → SEO landing pages
```

## 4. Product modules

| Module | Purpose | 2-week scope |
|---|---|---|
| AI Entry | Search/chat intent capture | g.bookedai.au basic Gemini chat |
| Booking Truth Engine | Real slot, hold, confirm/edit/cancel | Booking status lifecycle + calendar sync |
| Payment/Billing | Card + bank transfer | Stripe Checkout + bank transfer instructions |
| Learning Engine | AI notes, Q&A, improvement, CTA | Gemini summary + dashboard |
| Marketing Agent | Campaign/content automation | Generate drafts + approval list |
| Accounting Layer | Xero/GST/BAS-ready design | Accounting sync spec + manual/Xero setup checklist |
| R&D Agent | Update AI content/model trends | Weekly AI update workflow |
| QA/UAT | Production confidence | Test cases + daily smoke tests |

## 5. Revenue products

| Product | Launch price | Purpose |
|---|---:|---|
| 30-min AI Starter Session | $29 launch / $49 standard | Low-friction acquisition |
| 1-hour AI Mentor | $99 intro / $120 standard | Core revenue |
| 5-session package | $450 | LTV increase |
| 10-session package | $850 | Serious learners/SMEs |
| AI Business Transformation Program | $1,500–$3,000+ | Premium B2B |
| Single lesson | $19–$29 | Course monetization |
| Module of 5 lessons | $79–$149 | Content revenue |

## 6. Google-first stack

| Layer | Tool |
|---|---|
| AI model | Gemini via Vertex AI / Google AI |
| Agent development | Vertex AI Agent Builder / ADK / Agent Engine path |
| Hosting backend | Cloud Run |
| Container registry | Artifact Registry |
| Frontend hosting | Firebase Hosting / Cloud Run web container |
| Database truth | Cloud SQL PostgreSQL |
| Realtime/session state | Firestore |
| Events/retries | Pub/Sub + Cloud Tasks + Cloud Scheduler |
| Auth | Google Sign-In / Identity Platform |
| Email | Gmail API |
| Calendar/Meet | Google Calendar API + Google Meet links |
| Translation | Cloud Translation API |
| Voice | Speech-to-Text + Text-to-Speech |
| Analytics | GA4 + GTM + BigQuery + Looker Studio |
| Search/SEO | Search Console + Google Business Profile + Maps |
| Ads | Google Ads |
| Docs | Drive + Docs + Sheets |

## 7. Technical principles

```txt
- AI may recommend, but only Booking Truth Engine can confirm.
- Every paid booking must generate an auditable revenue event.
- Every learning session must create a next-step CTA.
- Every campaign must use UTM links and track booking/payment outcome.
- Every service must run as a versioned container.
```

## 8. 14-day success criteria

| Area | Minimum target |
|---|---|
| Booking | Real booking flow works |
| Payment | Stripe card payment works; bank transfer instruction works |
| Delivery | Calendar + Meet link created |
| Learning | Session summary + next CTA available |
| Marketing | Ads/campaign drafts ready; first campaign launched |
| Accounting | Xero setup plan + invoice mapping ready |
| QA | Smoke tests and UAT checklist complete |
| Revenue | Target 5–20 bookings / $500–$2,000 initial revenue |
