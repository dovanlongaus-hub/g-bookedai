# BookedAI — Complete UI/UX Flows & All-Page Wireframes

> **Version:** 1.0 | **Date:** 2026-05-06
> **Supplement to:** UI_UX_ENTERPRISE_PLAN.md
> **Coverage:** 53 pages across 6 apps, 8 user journey flows, notification matrix

---

## 1. User Journey Flow Maps

### 1.1 Discovery → Booking → Session (Primary Revenue Flow)

```
                    ┌─────────────────────────────────────────────────────────────────────────────┐
                    │                     PRIMARY REVENUE FLOW                                     │
                    └─────────────────────────────────────────────────────────────────────────────┘

  Google Ads          Social Media         Organic SEO          WhatsApp           Referral
  /get-started        LinkedIn/FB          Google Search        +61 455 301 335    /referral/:code
       │                  │                     │                    │                  │
       └──────────────────┴─────────┬───────────┘                   │                  │
                                    │                                │                  │
                                    ▼                                ▼                  ▼
                        ┌──────────────────────┐          ┌─────────────────┐  ┌──────────────┐
                        │  longcare.au         │          │  AI Chat Widget │  │  Referral    │
                        │  Landing Page        │──────────│  (bottom-right) │  │  Landing     │
                        │                      │          │                 │  │              │
                        │  • Hero              │          │  Auto-triggers: │  │  Pre-filled  │
                        │  • Services (3)      │          │  • 5s greeting  │  │  referral    │
                        │  • How It Works      │          │  • 30s pricing  │  │  discount    │
                        │  • Stats/Trust       │          │  • 2m booking   │  └──────┬───────┘
                        │  • FAQ               │          │  • Exit intent  │         │
                        │  • CTA               │          └────────┬────────┘         │
                        └──────────┬───────────┘                   │                  │
                                   │                               │                  │
                    ┌──────────────┼──────────────┐                │                  │
                    ▼              ▼              ▼                │                  │
            ┌──────────┐  ┌──────────┐  ┌──────────┐             │                  │
            │/services │  │/pricing  │  │/how-it-  │             │                  │
            │          │  │          │  │works     │             │                  │
            │ 4 cards  │  │ Compare  │  │ 6 steps  │             │                  │
            │ + detail │  │ all tiers│  │ visual   │             │                  │
            └─────┬────┘  └─────┬────┘  └──────────┘             │                  │
                  │             │                                  │                  │
                  ▼             ▼                                  ▼                  ▼
            ┌──────────┐  ┌──────────┐                    ┌──────────────────────────────────┐
            │/services/│  │/services/│                    │                                  │
            │ai-starter│  │ai-mentor │                    │  "I want to book a session"      │
            │          │  │          │                    │         ▼                        │
            │ Detail + │  │ Detail + │                    │  Chat recommends service         │
            │ FAQ +    │  │ Compare +│                    │         ▼                        │
            │ Schema   │  │ Schema   │                    │  [ Book Now → ] inline CTA       │
            └─────┬────┘  └─────┬────┘                    └──────────────┬───────────────────┘
                  │             │                                        │
                  └──────┬──────┘                                       │
                         │                                              │
                         ▼                                              ▼
              ┌─────────────────────────────────────────────────────────────────────┐
              │                                                                     │
              │                    book.longcare.au                                  │
              │                    BOOKING FLOW (4 Steps)                            │
              │                                                                     │
              │  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐      │
              │  │ Step 1   │───▶│ Step 2   │───▶│ Step 3   │───▶│ Step 4   │      │
              │  │ SERVICE  │    │ SCHEDULE │    │ DETAILS  │    │ PAYMENT  │      │
              │  │          │    │          │    │          │    │          │      │
              │  │ 5 cards  │    │ Calendar │    │ Name     │    │ Card     │      │
              │  │ badges   │    │ 8 weeks  │    │ Email*   │    │ PayID QR │      │
              │  │ expand   │    │ Time grid│    │ Phone    │    │ VND QR   │      │
              │  │ select   │    │ Multi-   │    │ Notes    │    │ Pay Later│      │
              │  │          │    │ session  │    │ T&C tick │    │          │      │
              │  └──────────┘    └──────────┘    └──────────┘    └──────────┘      │
              │                                                       │            │
              │  ┌─ HOLD (10 min auto-expiry) ──────────────────────┐ │            │
              │  │ Slot reserved via POST /booking/hold             │ │            │
              │  │ Timer visible: "Reserved for 9:45"               │ │            │
              │  └──────────────────────────────────────────────────┘ │            │
              │                                                       │            │
              └───────────────────────────────────────────────────────┼────────────┘
                                                                      │
                                    ┌─────────────────────────────────┼────────────────────┐
                                    │                                 │                    │
                                    ▼                                 ▼                    ▼
                          ┌─────────────────┐             ┌─────────────────┐   ┌────────────────┐
                          │ Stripe Checkout │             │ Bank Transfer   │   │ Pay Later      │
                          │ (redirect)      │             │ QR displayed    │   │ Book now       │
                          │                 │             │ Admin approves  │   │ Pay b4 session │
                          └────────┬────────┘             └────────┬────────┘   └───────┬────────┘
                                   │                               │                    │
                                   │  ← Webhook confirms ──────── │                    │
                                   ▼                               ▼                    ▼
                          ┌─────────────────────────────────────────────────────────────────────┐
                          │                                                                     │
                          │                    BOOKING CONFIRMED                                 │
                          │                                                                     │
                          │  ┌─────────────────────────────────────────────────────────────┐    │
                          │  │ Success Page (/booking/success)                              │    │
                          │  │                                                              │    │
                          │  │  ✓ Booking Confirmed!                                       │    │
                          │  │  Ref: BOOK-A1B2C                                            │    │
                          │  │  Service: 1-Hour AI Mentor                                  │    │
                          │  │  Date: Tue May 12, 10:00 AM AEST                            │    │
                          │  │  Amount: $99.00 (GST incl.)                                 │    │
                          │  │                                                              │    │
                          │  │  [ Add to Google Calendar ]  [ WhatsApp Confirmation ]       │    │
                          │  │  [ View Dashboard ]          [ Book Another ]                │    │
                          │  │                                                              │    │
                          │  │  QR Code: book.longcare.au/manage/BOOK-A1B2C                │    │
                          │  └─────────────────────────────────────────────────────────────┘    │
                          │                                                                     │
                          │  TRIGGERED AUTOMATICALLY:                                           │
                          │  📧 Confirmation email (Gmail API) with Meet link                  │
                          │  📱 WhatsApp confirmation message                                  │
                          │  📅 Google Calendar event created with Meet link                   │
                          │  📊 GA4: purchase event                                            │
                          │  📋 Audit log entry                                                │
                          │                                                                     │
                          └─────────────────────────────────────────────────────────────────────┘
                                                       │
                                                       ▼
                          ┌─────────────────────────────────────────────────────────────────────┐
                          │                    SESSION LIFECYCLE                                 │
                          │                                                                     │
                          │  T-24h         T-1h          T-15m         T=0           T+5m      │
                          │    │             │              │            │              │        │
                          │    ▼             ▼              ▼            ▼              ▼        │
                          │  📧 Email     📱 Push       🏠 Lobby    🎥 Google    ⚠️ No-show   │
                          │  Reminder    Notification   Equipment    Meet          Detection    │
                          │  + prep      "Starting      Camera/     Session       Auto-email   │
                          │  materials   soon!"         Mic test    Active        + reschedule  │
                          │              📱 WhatsApp    Countdown                               │
                          │              reminder       5→0 sec                                 │
                          │                                                                     │
                          │  POST-SESSION:                                                      │
                          │    ▼                                                                │
                          │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
                          │  │ Feedback Form    │  │ AI Session Notes │  │ Recommendation   │  │
                          │  │ ★★★★★ rating     │  │ Gemini summary   │  │ Next course/     │  │
                          │  │ Tags selection   │  │ Q&A extraction   │  │ session          │  │
                          │  │ Optional comment │  │ Google Docs      │  │ "Book Again"     │  │
                          │  │ NPS quarterly    │  │ NotebookLM       │  │ Package upsell   │  │
                          │  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
                          │                                                                     │
                          └─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Admin Daily Operations Flow

```
  CEO/Admin logs in → admin.longcare.au
         │
         ▼
  ┌──────────────────────────────────────────────────────────────────────────────────┐
  │ ADMIN DASHBOARD (/)                                                              │
  │                                                                                  │
  │  Morning Check (8:00 AM)                                                         │
  │  ───────────────────────                                                         │
  │  KPI Cards → Revenue Today, Total Bookings, Users, Cancelled                     │
  │  MTD Metrics → Revenue, Bookings, Avg Session Value, GST Collected               │
  │  Revenue Chart → 7d/30d/90d trend                                                │
  │  System Health → 6 services status (green/amber/red)                             │
  │                                                                                  │
  │         │                    │                    │                    │           │
  │         ▼                    ▼                    ▼                    ▼           │
  │  ┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐        │
  │  │ /bookings  │     │ /users     │     │ /marketing │     │ /analytics │        │
  │  │            │     │            │     │            │     │            │        │
  │  │ Filter:    │     │ Search:    │     │ Campaigns  │     │ Funnel:    │        │
  │  │ All/Conf/  │     │ by name    │     │ Review/    │     │ Visit→Chat │        │
  │  │ Pending/   │     │ by email   │     │ Approve/   │     │ →Browse→   │        │
  │  │ Cancelled  │     │ by role    │     │ Publish    │     │ Select→Pay │        │
  │  │            │     │            │     │            │     │ →Confirm   │        │
  │  │ Actions:   │     │ Actions:   │     │ 5 channels:│     │            │        │
  │  │ • Approve  │     │ • View     │     │ Google Ads │     │ Revenue by │        │
  │  │   payment  │     │ • Export   │     │ LinkedIn   │     │ service    │        │
  │  │ • Confirm  │     │ • CSV      │     │ Facebook   │     │ Channel    │        │
  │  │ • Cancel   │     │            │     │ Email      │     │ attribution│        │
  │  │ • Details  │     │            │     │ GBP        │     │            │        │
  │  └────────────┘     └────────────┘     └────────────┘     └────────────┘        │
  │         │                    │                    │                    │           │
  │         ▼                    ▼                    ▼                    ▼           │
  │  ┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐        │
  │  │ /emails    │     │ /health    │     │ /webhooks  │     │ Export CSV │        │
  │  │            │     │            │     │            │     │            │        │
  │  │ 4 email    │     │ 6 services │     │ Stripe     │     │ bookings   │        │
  │  │ templates  │     │ status     │     │ event log  │     │ revenue    │        │
  │  │ Preview    │     │ Latency    │     │ Debug      │     │ users      │        │
  │  │ HTML       │     │ Uptime %   │     │ Retry      │     │ webhooks   │        │
  │  └────────────┘     └────────────┘     └────────────┘     └────────────┘        │
  │                                                                                  │
  │  Daily End (6:00 PM)                                                             │
  │  ───────────────────                                                             │
  │  Drive Sync → CEO Daily Report (Google Docs)                                     │
  │  Cron → Daily summary email                                                      │
  │  Cron → 24h reminders for tomorrow's bookings                                    │
  │                                                                                  │
  └──────────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Partner Onboarding Flow (SaaS Platform)

```
  New Business discovers g.bookedai.au (or g.longcare.au)
         │
         ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │ g.bookedai.au Landing (/)                                           │
  │                                                                     │
  │  Hero → "The AI Revenue Engine for Service Businesses"              │
  │  9 Feature Cards → AI Chat, Booking, Payment, Meet, AI Notes...    │
  │  5 Industries → Health, Beauty, NDIS, Professional, Fitness        │
  │  3 Pricing Tiers → Starter $29 / Growth $79 / Enterprise $199     │
  │  Case Study → Longcare AU success story                            │
  │  CTA Form → Business signup                                        │
  └──────────┬───────────────────────────┬───────────────────────────────┘
             │                           │
             ▼                           ▼
  ┌──────────────────┐        ┌──────────────────────┐
  │ /features        │        │ /partners            │
  │ 6 deep-dive      │        │ Benefits (6 cards)   │
  │ feature sections │        │ Revenue models       │
  │ with capabilities│        │ Case study           │
  │ and screenshots  │        │ Application form     │
  └──────────────────┘        └──────────┬───────────┘
             │                           │
             │                           ▼
             │                ┌──────────────────────┐
             │                │ /onboarding          │
             │                │ 4-Step Wizard        │
             │                │                      │
             │                │ Step 1: Business Info │
             │                │ • Name, Industry     │
             │                │ • Website, Desc      │
             │                │         │             │
             │                │         ▼             │
             │                │ Step 2: Services      │
             │                │ • Add services        │
             │                │ • Name, Price, Dur    │
             │                │ • Dynamic list        │
             │                │         │             │
             │                │         ▼             │
             │                │ Step 3: Branding      │
             │                │ • Color picker        │
             │                │ • Subdomain           │
             │                │ • Live preview        │
             │                │         │             │
             │                │         ▼             │
             │                │ Step 4: Review        │
             │                │ • Summary cards       │
             │                │ • Launch button       │
             │                │         │             │
             │                │         ▼             │
             │                │ ✓ "Platform Ready!"   │
             │                │ • Domain generated    │
             │                │ • "Contact in 24h"    │
             │                └──────────────────────┘
             │
             │  Explore more:
             ▼
  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
  │ /security        │  │ /integrations    │  │ /docs            │
  │ 6 security areas │  │ 17 integrations  │  │ Getting Started  │
  │ Trust stats      │  │ Status badges    │  │ API Reference    │
  │ SOC 2, Privacy   │  │ Google-first     │  │ SDKs & Tools     │
  └──────────────────┘  └──────────────────┘  └─────┬────────────┘
                                                     │
                                              ┌──────┴──────┐
                                              ▼             ▼
                                    ┌────────────┐  ┌────────────┐
                                    │ /docs/guide│  │ /api-docs  │
                                    │ Code       │  │ Interactive│
                                    │ examples   │  │ endpoint   │
                                    │ cURL/Node/ │  │ browser    │
                                    │ Python     │  │ with filter│
                                    └────────────┘  └────────────┘
```

### 1.4 User Learning & Retention Flow

```
  Customer after first session
         │
         ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │ app.longcare.au — USER DASHBOARD                                    │
  │                                                                     │
  │  ┌─── Session Alert ──────────────────────────────────────────┐    │
  │  │ 🟢 Your session starts in 2 hours                          │    │
  │  │ [ Join Meeting ] [ Reschedule ]                             │    │
  │  └────────────────────────────────────────────────────────────┘    │
  │                                                                     │
  │  Stats → Sessions (12) | Hours (18.5) | Progress (78%) | Streak   │
  │                                                                     │
  │  Upcoming Bookings → 3 cards with Join/Reschedule                  │
  │                                                                     │
  │  Learning History → Session notes links (Google Docs)              │
  │                                                                     │
  │  Recommended → AI-suggested next course/session                    │
  │                                                                     │
  │         │                    │                    │                  │
  │         ▼                    ▼                    ▼                  │
  │  ┌────────────┐     ┌────────────┐     ┌────────────┐              │
  │  │ /settings  │     │ /notif.    │     │ Manage     │              │
  │  │            │     │            │     │ Booking    │              │
  │  │ Profile    │     │ Unread (3) │     │ /manage/   │              │
  │  │ • Name     │     │ Mark read  │     │ [ref]      │              │
  │  │ • Email    │     │ 5 types:   │     │            │              │
  │  │ • Phone    │     │ • Booking  │     │ View info  │              │
  │  │ • Language │     │ • Payment  │     │ Reschedule │              │
  │  │            │     │ • Summary  │     │ Cancel     │              │
  │  │ Notif Pref │     │ • Reminder │     │ WhatsApp   │              │
  │  │ • Email ☑  │     │ • Welcome  │     │            │              │
  │  │ • SMS ☑    │     │            │     │ Cancel     │              │
  │  │ • WhatsApp │     │            │     │ Policy:    │              │
  │  │            │     │            │     │ >24h: Full │              │
  │  │ Timezone   │     │            │     │ <24h: 50%  │              │
  │  │ Session len│     │            │     │ No-show: 0 │              │
  │  │            │     │            │     │            │              │
  │  │ Payment    │     │            │     │            │              │
  │  │ History    │     │            │     │            │              │
  │  └────────────┘     └────────────┘     └────────────┘              │
  │                                                                     │
  └──────────────────────────────────────────────────────────────────────┘
         │
         │  Learning Path:
         ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │ longcare.au/courses — LEARNING ENGINE                               │
  │                                                                     │
  │  Track A: AI Foundations (5 lessons)                                │
  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐      │
  │  │ L1     │  │ L2     │  │ L3     │  │ L4     │  │ L5     │      │
  │  │ FREE   │──│ $19    │──│ $19    │──│ $19    │──│ $19    │      │
  │  │        │  │        │  │        │  │        │  │        │      │
  │  │ Intro  │  │ Prompts│  │ Tools  │  │ Ethics │  │ Strategy│      │
  │  │        │  │ 🔒     │  │ 🔒     │  │ 🔒     │  │ 🔒     │      │
  │  └────────┘  └────────┘  └────────┘  └────────┘  └────────┘      │
  │                                                                     │
  │  Or buy module: $79-$149 for all 5 lessons                         │
  │                                                                     │
  │  After Track A complete:                                            │
  │  → AI recommends Track B: AI for Business                          │
  │  → Certificate of completion (PDF)                                  │
  │  → LinkedIn share                                                   │
  └──────────────────────────────────────────────────────────────────────┘
```

### 1.5 Booking Management & Self-Service Flow

```
  Customer receives booking confirmation email
         │
         │  Email contains: book.longcare.au/manage/BOOK-A1B2C
         ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │ book.longcare.au/manage/BOOK-A1B2C                                  │
  │                                                                     │
  │  ┌─── Booking Info Card ──────────────────────────────────────┐    │
  │  │ Ref: BOOK-A1B2C                                            │    │
  │  │ Service: 1-Hour AI Mentor                                   │    │
  │  │ Status: ● CONFIRMED                                        │    │
  │  │ Amount: $99.00                                              │    │
  │  │ Meeting: meet.longcare.au/BOOK-A1B2C                       │    │
  │  └────────────────────────────────────────────────────────────┘    │
  │                                                                     │
  │  4 Action Buttons:                                                  │
  │                                                                     │
  │  ┌──────────────────┐  ┌──────────────────┐                        │
  │  │ 📅 Change Date   │  │ 🔄 Change Service│                        │
  │  │ & Time           │  │ → redirect to    │                        │
  │  │                  │  │   booking page   │                        │
  │  │ Calendar widget  │  │                  │                        │
  │  │ Reschedule       │  │                  │                        │
  │  │ policy:          │  │                  │                        │
  │  │ >24h: Free       │  │                  │                        │
  │  │ <24h: $15 fee    │  │                  │                        │
  │  └──────────────────┘  └──────────────────┘                        │
  │  ┌──────────────────┐  ┌──────────────────┐                        │
  │  │ ❌ Cancel Booking │  │ 💬 WhatsApp      │                        │
  │  │                  │  │ Support          │                        │
  │  │ Refund policy:   │  │                  │                        │
  │  │ >24h: 100%       │  │ → wa.me/         │                        │
  │  │ <24h: 50%        │  │   61455301335    │                        │
  │  │ No-show: 0%      │  │                  │                        │
  │  │                  │  │                  │                        │
  │  │ Reason textarea  │  │                  │                        │
  │  │ Confirm button   │  │                  │                        │
  │  └──────────────────┘  └──────────────────┘                        │
  │                                                                     │
  │  QR Code: This manage page URL                                     │
  │                                                                     │
  └──────────────────────────────────────────────────────────────────────┘
```

---

## 2. Complete Page Inventory & UI Specifications

### 2.1 g.bookedai.au — SaaS Platform (13 pages)

| # | Page | Current Quality | UI Spec |
|---|------|----------------|---------|
| 1 | `/` Landing | 8/10 | Hero gradient + 9 feature cards + 5 industries + 3-tier pricing + case study + CTA form |
| 2 | `/features` | 7/10 | 6 alternating sections with screenshots. **ADD:** real screenshots, demo videos, comparison table |
| 3 | `/integrations` | 8/10 | 17 integration cards with status badges. **ADD:** setup guides, pricing impact |
| 4 | `/security` | 9/10 | 6 security sections, trust stats. Near-complete for enterprise |
| 5 | `/partners` | 8/10 | Benefits + revenue models + application form. **ADD:** partner success metrics |
| 6 | `/onboarding` | 9/10 | 4-step wizard with live preview. Excellent UX |
| 7 | `/docs` | 8/10 | Getting started + 7 API endpoints + integrations. **ADD:** interactive explorer |
| 8 | `/docs/guide` | 9/10 | Code examples in cURL/Node/Python. Excellent |
| 9 | `/api-docs` | 8/10 | 17 endpoints with filter tabs. **ADD:** try-it-out feature |
| 10 | `/demo` | 8/10 | Live iframe + chat demo. **ADD:** recorded demo video |
| 11 | `/admin` | 7/10 | Tenant list + KPIs. **ADD:** tenant management actions, revenue tracking |
| 12 | `/login` | 9/10 | Dual auth (Firebase + OpenAI OAuth). Excellent fallback handling |
| 13 | `/auth/callback` | N/A | Auth redirect handler |

### 2.2 longcare.au — Tenant Landing (19 pages)

| # | Page | Current Quality | UI Spec |
|---|------|----------------|---------|
| 1 | `/` Landing | 8/10 | Hero + 3 services + How It Works + Stats + FAQ + CTA. **ADD:** testimonial carousel, video |
| 2 | `/services` | 9/10 | 4 service cards with Schema.org. Excellent SEO |
| 3 | `/services/ai-starter` | 9/10 | Detail + FAQ + Schema.org. **ADD:** sample session notes |
| 4 | `/services/ai-mentor` | 9/10 | Detail + comparison table + FAQ. **ADD:** mentor profile |
| 5 | `/services/packages` | 8/10 | Package comparison. **ADD:** savings calculator |
| 6 | `/pricing` | 9/10 | 6 pricing options + comparison table. Excellent |
| 7 | `/how-it-works` | 8/10 | 6 steps visual. **ADD:** estimated timeline |
| 8 | `/faq` | 8/10 | Expandable Q&A sections |
| 9 | `/mentors` | 7/10 | Mentor profiles. **ADD:** credentials, certifications, video intros |
| 10 | `/testimonials` | 7/10 | Customer stories. **ADD:** video testimonials, ratings |
| 11 | `/blog` | 8/10 | 3 articles with dates. **ADD:** search, categories, featured images |
| 12 | `/blog/[slug]` | 8/10 | Full article page with Schema.org |
| 13 | `/courses` | 7/10 | Track A listing. **ADD:** progress tracking, preview, enroll CTA |
| 14 | `/about` | 8/10 | Company story + team. **ADD:** timeline, values, mission |
| 15 | `/contact` | 8/10 | Contact form + channels |
| 16 | `/terms` | 8/10 | Legal compliance |
| 17 | `/privacy` | 8/10 | Australian Privacy Act |
| 18 | `/get-started` | 7/10 | Google Ads landing. **ADD:** specific CTA, social proof |
| 19 | `/search` | 6/10 | Search across content. **ADD:** filters, categories, suggestions |

### 2.3 book.longcare.au — Booking (4 pages)

| # | Page | Current Quality | UI Spec |
|---|------|----------------|---------|
| 1 | `/` Booking Flow | 9/10 | 4-section auto-scroll + 3 payment methods. **ADD:** progress bar, trust signals |
| 2 | `/booking/success` | 8/10 | Confirmation + Calendar + QR. **ADD:** celebration animation |
| 3 | `/booking/cancel` | 7/10 | Cancel message. **ADD:** retry suggestions, alternate payment |
| 4 | `/manage/[ref]` | 8/10 | Self-service with reschedule/cancel/support |

### 2.4 meet.longcare.au — Meeting (2 pages)

| # | Page | Current Quality | UI Spec |
|---|------|----------------|---------|
| 1 | `/` Redirect | 7/10 | Basic redirect. **ADD:** branded splash |
| 2 | `/[ref]` Meeting Room | 7/10 | 5s countdown + Meet redirect. **ADD:** equipment check, session info |

### 2.5 app.longcare.au — User Dashboard (4 pages)

| # | Page | Current Quality | UI Spec |
|---|------|----------------|---------|
| 1 | `/` Dashboard | 8/10 | KPIs + bookings + learning + recommendations |
| 2 | `/settings` | 8/10 | Profile + notif prefs + timezone + payment history |
| 3 | `/notifications` | 7/10 | 5 notification types with read/unread |
| 4 | `/login` | 8/10 | Auth page |

### 2.6 admin.longcare.au — Admin (9 pages)

| # | Page | Current Quality | UI Spec |
|---|------|----------------|---------|
| 1 | `/` Dashboard | 9/10 | KPIs + revenue + bookings + campaigns + health |
| 2 | `/bookings` | 8/10 | Filter tabs + data table + actions |
| 3 | `/users` | 8/10 | Search + filter + CSV export |
| 4 | `/marketing` | 8/10 | 5-channel content cards with copy/approve |
| 5 | `/emails` | 7/10 | 4 template previews. **ADD:** editor, send test |
| 6 | `/health` | 8/10 | 6 services status with latency/uptime |
| 7 | `/webhooks` | 7/10 | Stripe event log. **ADD:** retry, debug tools |
| 8 | `/analytics` | 7/10 | Funnel + metrics. **ADD:** date range, comparison |
| 9 | `/login` | 8/10 | Admin auth |

---

## 3. Notification Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              NOTIFICATION MATRIX                                         │
├──────────────────────┬───────┬──────────┬──────┬──────┬────────┬───────────────────────┤
│ Event                │ Email │ WhatsApp │ SMS  │ Push │ In-App │ Admin Alert           │
├──────────────────────┼───────┼──────────┼──────┼──────┼────────┼───────────────────────┤
│ Booking Confirmed    │  ✓   │    ✓     │  ✓  │  ✓  │   ✓   │ Dashboard update       │
│ Booking Cancelled    │  ✓   │    ✓     │      │  ✓  │   ✓   │ Alert + refund queue   │
│ Booking Rescheduled  │  ✓   │    ✓     │      │  ✓  │   ✓   │ Calendar update        │
│ 24h Reminder         │  ✓   │    ✓     │  ✓  │  ✓  │        │                        │
│ 1h Reminder          │      │          │      │  ✓  │   ✓   │                        │
│ Payment Received     │  ✓   │          │      │      │   ✓   │ Revenue update         │
│ Payment Failed       │  ✓   │          │      │  ✓  │   ✓   │ Alert                  │
│ Bank Transfer Pending│  ✓   │          │      │      │   ✓   │ Approval queue         │
│ Refund Processed     │  ✓   │          │      │      │   ✓   │ Financial update       │
│ Session Summary Ready│  ✓   │          │      │  ✓  │   ✓   │                        │
│ Course Enrolled      │  ✓   │          │      │      │   ✓   │                        │
│ Certificate Earned   │  ✓   │    ✓     │      │  ✓  │   ✓   │                        │
│ Welcome New User     │  ✓   │    ✓     │      │      │   ✓   │                        │
│ No-Show Detected     │  ✓   │    ✓     │      │      │        │ Alert + follow-up      │
│ Hold Expiring (2min) │      │          │      │  ✓  │   ✓   │                        │
│ Package Balance Low  │  ✓   │          │      │  ✓  │   ✓   │                        │
│ Marketing Campaign   │      │          │      │      │        │ Review queue           │
│ System Health Issue  │      │          │      │      │        │ Urgent alert           │
│ Daily CEO Summary    │  ✓   │          │      │      │        │ Google Drive report    │
│ New Partner Applied  │  ✓   │          │      │      │        │ Review queue           │
├──────────────────────┼───────┼──────────┼──────┼──────┼────────┼───────────────────────┤
│ Total Channels Used  │  16  │    6     │  3   │  10  │  14   │ 10                     │
└──────────────────────┴───────┴──────────┴──────┴──────┴────────┴───────────────────────┘
```

---

## 4. Micro-Interaction Specifications

```
ANIMATION STANDARDS
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  TRANSITIONS                                                         │
│  ─────────────                                                       │
│  Button hover:      transform scale(1.02), 150ms ease-out           │
│  Card hover:        translateY(-2px) + shadow, 200ms ease           │
│  Page transition:   opacity 0→1, 300ms ease-in-out                  │
│  Modal open:        scale(0.95→1) + opacity, 200ms ease-out         │
│  Modal close:       scale(1→0.95) + opacity, 150ms ease-in          │
│  Toast enter:       slideIn from right, 300ms cubic-bezier          │
│  Toast exit:        slideOut to right, 200ms ease-in                 │
│  Sidebar collapse:  width 240→64px, 200ms ease                      │
│  Tab switch:        indicator slide, 200ms ease                      │
│  Dropdown open:     scaleY(0→1) from top, 150ms ease-out            │
│                                                                      │
│  FEEDBACK                                                            │
│  ────────                                                            │
│  Button click:      scale(0.97), 100ms                               │
│  Form submit:       spinner icon, disable button                    │
│  Success:           checkmark animation, 500ms                       │
│  Error:             shake animation, 300ms                           │
│  Loading:           skeleton shimmer, 1.5s infinite                  │
│  Progress:          bar fill, 300ms ease-out                         │
│  Count up:          number increment, 1s ease-out                   │
│  Sparkline:         draw path, 800ms ease                            │
│                                                                      │
│  BOOKING FLOW                                                        │
│  ────────────                                                        │
│  Step complete:     green check fade-in, 300ms                       │
│  Auto-scroll:       smooth scroll to next section, 500ms             │
│  Service select:    border glow + scale, 200ms                       │
│  Time slot select:  bg color fill, 150ms                             │
│  Hold timer:        countdown digits, 1s interval                    │
│  Payment success:   confetti burst, 2s                               │
│  QR code appear:    fade-in + scale, 400ms                           │
│                                                                      │
│  REDUCED MOTION                                                      │
│  ───────────────                                                     │
│  @media (prefers-reduced-motion: reduce) {                           │
│    All durations → 0ms                                               │
│    All transforms → none                                             │
│    Only opacity transitions preserved                                │
│  }                                                                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 5. Error States & Empty States Specification

```
ERROR & EMPTY STATES
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  404 PAGE                                                            │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │              [Illustration: Lost astronaut]                 │      │
│  │                                                             │      │
│  │          Oops! Page not found                               │      │
│  │    This page doesn't exist or has been moved.               │      │
│  │                                                             │      │
│  │    [ Go Home ]  [ Search ]  [ Contact Support ]             │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  500 PAGE                                                            │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │              [Illustration: Broken robot]                   │      │
│  │                                                             │      │
│  │          Something went wrong                               │      │
│  │    We're working on it. Please try again.                   │      │
│  │                                                             │      │
│  │    [ Refresh ]  [ Go Home ]  [ WhatsApp Support ]           │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  EMPTY BOOKING LIST                                                  │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │              [Illustration: Empty calendar]                 │      │
│  │                                                             │      │
│  │          No bookings yet                                    │      │
│  │    Book your first AI mentoring session today!              │      │
│  │                                                             │      │
│  │    [ Book a Session — From $29 ]                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  EMPTY NOTIFICATIONS                                                 │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │              [Illustration: Peaceful bell]                  │      │
│  │                                                             │      │
│  │          All caught up!                                     │      │
│  │    You have no new notifications.                           │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  NO SEARCH RESULTS                                                   │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │              [Illustration: Magnifying glass]               │      │
│  │                                                             │      │
│  │          No results for "xyz"                               │      │
│  │    Try different keywords or browse our services.           │      │
│  │                                                             │      │
│  │    [ View Services ]  [ Chat with AI ]                      │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  PAYMENT FAILED                                                      │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │              [Illustration: Declined card]                  │      │
│  │                                                             │      │
│  │          Payment didn't go through                          │      │
│  │    Your card was declined. Try another method.              │      │
│  │                                                             │      │
│  │    [ Try Again ] [ QR Code ] [ Bank Transfer ] [ WhatsApp ] │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  OFFLINE STATE                                                       │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │  ⚡ You're offline. Some features may be limited.           │      │
│  │  Reconnecting...                                            │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 6. Cross-App Navigation Map

```
                           ┌─────────────────────────────────────────────┐
                           │            NAVIGATION MAP                    │
                           └─────────────────────────────────────────────┘

  g.longcare.au (SaaS)                    longcare.au (Tenant)
  ┌─────────────────┐                     ┌─────────────────┐
  │ Nav:             │                     │ Nav:             │
  │ Features         │                     │ Services ▼       │
  │ Integrations     │                     │  ├ AI Starter    │
  │ Security         │                     │  ├ AI Mentor     │
  │ Partners         │                     │  └ Packages      │
  │ Docs ▼           │                     │ Pricing          │
  │  ├ Guide         │                     │ How it Works     │
  │  └ API Docs      │                     │ Blog             │
  │ Demo             │                     │ About            │
  │ Login            │                     │ Login            │
  └────────┬────────┘                     └────────┬────────┘
           │                                        │
           │  "Try BookedAI"                        │  "Book Now"
           │                                        │
           ▼                                        ▼
  book.longcare.au (Booking)              app.longcare.au (User)
  ┌─────────────────┐                     ┌─────────────────┐
  │ [Logo]           │                     │ Nav:             │
  │ Booking → Flow   │                     │ Dashboard        │
  │ /success         │                     │ Settings         │
  │ /cancel          │                     │ Notifications    │
  │ /manage/[ref]    │                     │ Login            │
  └─────────────────┘                     └─────────────────┘

  admin.longcare.au (Admin)               meet.longcare.au (Meet)
  ┌─────────────────┐                     ┌─────────────────┐
  │ Sidebar:         │                     │ / → redirect     │
  │ Dashboard        │                     │ /[ref] → lobby   │
  │ Bookings         │                     │  → Google Meet   │
  │ Users            │                     └─────────────────┘
  │ Payments         │
  │ Marketing        │
  │ Learning         │
  │ ──────────       │
  │ Analytics        │
  │ Health           │
  │ Webhooks         │
  │ Emails           │
  │ ──────────       │
  │ Settings         │
  └─────────────────┘

  CROSS-APP LINKS:
  longcare.au → book.longcare.au       (Book Now buttons)
  longcare.au → app.longcare.au        (Login → Dashboard)
  book.longcare.au → app.longcare.au   (View Dashboard)
  book.longcare.au → meet.longcare.au  (Join Meeting)
  admin.longcare.au → g.longcare.au    (Platform Admin)
  g.longcare.au → longcare.au          (Case Study)
  g.longcare.au → book.longcare.au     (Demo booking)
  ALL → WhatsApp (+61 455 301 335)     (Support)
```

---

*Document owner: bookedai.au Engineering*
*Last updated: 2026-05-06*
*Co-Authored-By: Claude Opus 4.6 (1M context)*
