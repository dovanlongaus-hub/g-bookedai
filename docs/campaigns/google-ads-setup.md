# Google Ads Campaign Setup — Longcare AU (bookedai.au)

**Last updated:** 2026-05-04  
**Landing domain:** longcare.au  
**Booking domain:** booking.g.bookedai.au  
**Budget range:** $500 – $2,000 / month  

---

## UTM Naming Convention

All ad URLs must include UTM parameters for GA4 tracking:

```
utm_source=google
utm_medium=cpc
utm_campaign={campaign_name}
utm_content={ad_group_or_creative}
utm_term={keyword}
```

**Campaign name format:** `{objective}_{audience}_{geo}_{month}`

Examples:
- `ai-mentoring_awareness_au_may26`
- `book-session_conversion_au_may26`
- `remarketing_retarget_au_may26`

---

## Campaign 1: "AI Mentoring Australia" (Search — Awareness/Consideration)

**Objective:** Drive qualified traffic to service pages  
**Budget:** $200 – $800 / month  
**Bid strategy:** Maximise clicks (switch to Target CPA after 30 conversions)  
**Target CPA:** $15 – $25  

### Keywords

| Match Type | Keywords |
|---|---|
| Phrase | "AI mentoring Australia" |
| Phrase | "AI mentor online" |
| Phrase | "AI coaching Australia" |
| Phrase | "AI tutoring Melbourne" |
| Phrase | "learn AI online Australia" |
| Broad Modified | +AI +mentoring +session |
| Broad Modified | +AI +coaching +business +Australia |
| Phrase | "prompt engineering course" |
| Phrase | "AI training for business" |
| Phrase | "ChatGPT mentor Australia" |
| Exact | [AI mentor Australia] |
| Exact | [AI coaching session online] |

### Negative Keywords

- free, job, hiring, salary, degree, university, certification exam, PDF, download

### Ad Group 1: AI Mentoring — General

**Headlines (max 30 chars each):**
1. AI Mentoring from $29 AUD
2. Book an AI Mentor Online
3. Expert AI Coaching Australia
4. Learn AI — Live 1-on-1
5. AI Mentoring Sessions
6. Personalised AI Training

**Descriptions (max 90 chars each):**
1. Live Google Meet sessions with expert AI mentors. From $29 AUD. Book online today.
2. Master ChatGPT, Gemini & AI tools with personalised 1-on-1 mentoring. GST inclusive.

**Final URL:** `https://longcare.au/services?utm_source=google&utm_medium=cpc&utm_campaign=ai-mentoring_awareness_au&utm_content=general`

### Ad Group 2: AI Mentoring — Business

**Headlines:**
1. AI for Your Business — $99
2. SME AI Strategy Session
3. Transform Your Business w/ AI
4. AI Workflow Consulting
5. Book AI Business Session
6. AI Automation Mentoring

**Descriptions:**
1. Get a custom AI strategy for your SME. 60-min deep-dive with an expert. Book online now.
2. Automate workflows, boost productivity & build AI capabilities. From $99/session in AUD.

**Final URL:** `https://longcare.au/services/ai-mentor?utm_source=google&utm_medium=cpc&utm_campaign=ai-mentoring_awareness_au&utm_content=business`

### Ad Extensions

| Extension Type | Content |
|---|---|
| Sitelinks | Services ($29+), Pricing, How It Works, Packages ($450+) |
| Callouts | GST-Inclusive, Google Meet 1-on-1, AI-Generated Notes, Cancel Free 24h |
| Structured Snippets | Services: AI Starter, AI Mentor, 5-Pack, 10-Pack, Business Transformation |
| Call Extension | +61 455 301 335 |
| Price Extension | Starter $29, Mentor $99, 5-Pack $450, 10-Pack $850 |

---

## Campaign 2: "Book AI Session" (Search — Conversion/Transactional)

**Objective:** Drive direct bookings from high-intent searches  
**Budget:** $200 – $800 / month  
**Bid strategy:** Maximise conversions (Target CPA $20 after ramp)  
**Target CPA:** $10 – $20  

### Keywords

| Match Type | Keywords |
|---|---|
| Exact | [book AI session] |
| Exact | [book AI mentor online] |
| Exact | [AI mentoring session near me] |
| Phrase | "book AI coaching session" |
| Phrase | "buy AI mentoring session" |
| Phrase | "AI session booking Australia" |
| Phrase | "online AI tutor booking" |
| Phrase | "AI mentor appointment" |
| Exact | [AI starter session $29] |
| Exact | [AI mentor session $99] |
| Phrase | "AI mentoring package" |

### Negative Keywords

- free, job, internship, YouTube, tutorial video, course platform, udemy, coursera

### Ad Group 1: Book Now — Starter

**Headlines:**
1. Book AI Starter — $29
2. 30-Min AI Session Online
3. Start Learning AI Today
4. Quick AI Intro — Book Now
5. AI Starter — $29 AUD
6. Your First AI Session

**Descriptions:**
1. 30-minute live AI mentoring session for just $29. Google Meet. AI notes included. Book now.
2. Perfect for beginners. Get started with AI tools in 30 minutes. Secure your spot today.

**Final URL:** `https://longcare.au/services/ai-starter?utm_source=google&utm_medium=cpc&utm_campaign=book-session_conversion_au&utm_content=starter`

### Ad Group 2: Book Now — Mentor

**Headlines:**
1. Book AI Mentor — $99
2. 1-Hour AI Deep Dive
3. Expert AI Session — Book
4. AI Mentor — $99 AUD
5. Custom AI Workflows
6. Deep-Dive AI Coaching

**Descriptions:**
1. 60-min personalised AI mentoring. Custom workflows + learning path. Book your session now.
2. Most popular: 1-hour AI mentor session. Hands-on, outcome-focused. Only $99 AUD.

**Final URL:** `https://longcare.au/services/ai-mentor?utm_source=google&utm_medium=cpc&utm_campaign=book-session_conversion_au&utm_content=mentor`

### Ad Group 3: Book Now — Packages

**Headlines:**
1. AI Package — Save $150
2. 5 AI Sessions for $450
3. 10 AI Sessions for $850
4. AI Learning Package
5. Structured AI Training
6. Bulk AI Mentor Sessions

**Descriptions:**
1. Save up to $150 with multi-session AI mentoring packages. 5-pack $450 or 10-pack $850.
2. Structured AI learning with progress tracking & dedicated mentors. Book your package now.

**Final URL:** `https://longcare.au/services/packages?utm_source=google&utm_medium=cpc&utm_campaign=book-session_conversion_au&utm_content=packages`

### Ad Extensions

| Extension Type | Content |
|---|---|
| Sitelinks | $29 Starter, $99 Mentor, Packages, Pricing |
| Callouts | Book in 60 Seconds, Cancel Free 24h, GST-Inclusive, Secure Payment |
| Price Extension | Starter $29, Mentor $99, 5-Pack $450, 10-Pack $850 |
| Promotion Extension | Launch pricing — sessions from $29 AUD |

---

## Campaign 3: "Remarketing" (Display — Retargeting)

**Objective:** Re-engage website visitors who did not book  
**Budget:** $100 – $400 / month  
**Bid strategy:** Maximise conversions  
**Target CPA:** $15  

### Audiences

| Audience | Definition | Window |
|---|---|---|
| Service Page Visitors | Visited /services, /services/ai-starter, /services/ai-mentor, /services/packages | 30 days |
| Pricing Page Visitors | Visited /pricing | 14 days |
| Booking Abandoners | Started checkout on booking.g.bookedai.au but did not complete | 7 days |
| Blog Readers | Visited /blog/* pages | 30 days |

**Exclusions:** Users who already completed a booking (GA4 purchase event)

### Creative Specs

| Creative | Size | Message |
|---|---|---|
| Banner 1 | 300x250 | "Still thinking about AI mentoring? Book from $29" + CTA |
| Banner 2 | 728x90 | "Your AI journey starts here — $29 starter session" + CTA |
| Banner 3 | 160x600 | "AI Mentor $99 — Book Now" + benefit bullets |
| Responsive Display | Auto | Headlines + descriptions + logo + images (AI mentoring visuals) |

### Responsive Display Ad Copy

**Headlines:**
1. AI Mentoring from $29
2. Book Your AI Session
3. Learn AI with a Mentor
4. Still Thinking About AI?
5. Your AI Journey Awaits

**Long Headlines:**
1. Personalised AI Mentoring Sessions from $29 AUD — Book Online
2. Master AI Tools with Expert 1-on-1 Mentoring via Google Meet

**Descriptions:**
1. Live AI mentoring from $29. Google Meet 1-on-1. AI notes included.
2. Don't miss out — book your AI mentor session today. GST-inclusive.

**Final URL:** `https://longcare.au/services?utm_source=google&utm_medium=cpc&utm_campaign=remarketing_retarget_au&utm_content=display`

---

## Conversion Tracking Setup (GA4)

### Required GA4 Events

| Event Name | Trigger | Parameters |
|---|---|---|
| `page_view` | All pages (automatic) | page_location, page_title |
| `view_service` | User views a service page | service_name, service_price |
| `begin_checkout` | User clicks "Book Now" / starts booking | service_name, value, currency |
| `purchase` | Booking confirmed + payment received | transaction_id, value, currency, service_name |
| `generate_lead` | User submits contact form or chat inquiry | lead_source |

### GTM Implementation

1. **GA4 Configuration Tag** — fires on all pages using the GA4_MEASUREMENT_ID from .env
2. **view_service Event Tag** — fires when user lands on `/services/*` pages
   - Trigger: Page Path matches `/services/ai-starter`, `/services/ai-mentor`, `/services/packages`
   - Variables: service_name (from data layer), service_price
3. **begin_checkout Event Tag** — fires on "Book Now" button clicks
   - Trigger: Click URL contains `booking.g.bookedai.au`
   - Variables: service_name, value, currency (AUD)
4. **purchase Event Tag** — fires on booking confirmation page
   - Trigger: Page path matches booking confirmation URL
   - Variables: transaction_id, value, currency, service_name

### Google Ads Conversion Import

1. In Google Ads > Tools > Conversions, create conversion actions:
   - **Primary:** `purchase` event (value: dynamic, count: every)
   - **Secondary:** `begin_checkout` event (count: one per click)
   - **Observation:** `view_service` event
2. Link GA4 property to Google Ads account
3. Import GA4 conversions into Google Ads
4. Set `purchase` as the primary conversion for Smart Bidding optimisation

### Google Ads Remarketing Tag

1. In GTM, add "Google Ads Remarketing" tag
2. Configure with Google Ads Conversion ID
3. Set dynamic remarketing parameters:
   - `ecomm_prodid`: service slug
   - `ecomm_pagetype`: home / category / product / cart / purchase
   - `ecomm_totalvalue`: service price

---

## Budget Recommendations

| Monthly Budget | Strategy | Expected Results |
|---|---|---|
| $500 | Campaign 1 ($250) + Campaign 2 ($200) + Campaign 3 ($50) | 20-40 clicks/day, 15-30 bookings/month |
| $1,000 | Campaign 1 ($400) + Campaign 2 ($400) + Campaign 3 ($200) | 40-80 clicks/day, 30-60 bookings/month |
| $2,000 | Campaign 1 ($800) + Campaign 2 ($800) + Campaign 3 ($400) | 80-150 clicks/day, 60-100 bookings/month |

### Key Metrics to Track

| Metric | Target |
|---|---|
| Click-Through Rate (CTR) | > 3% (Search), > 0.5% (Display) |
| Cost Per Click (CPC) | $1.50 – $4.00 (Search), $0.30 – $1.00 (Display) |
| Conversion Rate | > 5% (landing page to booking) |
| Cost Per Acquisition (CPA) | < $25 (starter), < $50 (mentor/package) |
| Return on Ad Spend (ROAS) | > 3x |

---

## Launch Checklist

- [ ] GA4 property connected and receiving data
- [ ] GTM container published with all event tags
- [ ] Google Ads account linked to GA4
- [ ] GA4 conversions imported into Google Ads
- [ ] Remarketing audiences created in GA4 and shared with Google Ads
- [ ] All landing pages live and indexed (check via Google Search Console)
- [ ] Ad copy reviewed and approved
- [ ] Ad extensions configured
- [ ] Negative keyword lists applied
- [ ] Budget and bid strategy configured
- [ ] Conversion tracking verified with Tag Assistant
- [ ] Campaign set to "Paused" for final review before launch
