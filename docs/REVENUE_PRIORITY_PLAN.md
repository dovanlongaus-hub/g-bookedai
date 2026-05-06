# BookedAI — Kế Hoạch Ưu Tiên Kiếm Tiền

> **Version:** 1.0 | **Date:** 2026-05-06
> **Nguyên tắc:** Ưu tiên tuyệt đối thứ tự: **Kiếm tiền → Giữ tiền → Tối ưu tiền**
> **Target:** A$138,600 ARR (Month 12) | Break-even Month 4-5

---

## Tổng quan chiến lược

```
SPRINT 1 (Tuần 1-2)     → Sửa lỗi chặn tiền: AI chat, OAuth, thanh toán tự động
SPRINT 2 (Tuần 3-4)     → Đưa khách vào: Google Ads, SEO, referral
SPRINT 3 (Tháng 2)      → Giữ khách: SMS nhắc, email drip, giảm no-show
SPRINT 4 (Tháng 3)      → Scale: Multi-tenant billing, Xero, thêm kênh
SPRINT 5 (Tháng 4-6)    → Premium: Voice AI, dynamic pricing, mobile app
```

```
Mục tiêu doanh thu:
Month 1:  A$150 MRR   →  3 khách (2 Starter + 1 Growth)
Month 3:  A$1,500 MRR →  15 khách + commission
Month 6:  A$3,400 MRR →  35 khách + commission
Month 12: A$11,550 MRR → 175 khách + commission
```

---

## SPRINT 1: FIX REVENUE BLOCKERS (Tuần 1-2)

> **Mục tiêu:** Hệ thống sẵn sàng nhận tiền thật từ khách thật
> **KPI:** 100% booking flow hoạt động end-to-end, AI chat trả lời chính xác

### 1.1 ❶ Fix AI Chat — Gemini API Key (Day 1)

| Item | Chi tiết |
|------|---------|
| **Tại sao ưu tiên #1** | AI chat là USP, không có = mất 30-50% conversion |
| **Việc cần làm** | Lấy Gemini API key mới hoặc dùng OpenAI key |
| **File sửa** | `.env` → `GEMINI_API_KEY=...` |
| **Test** | `curl -X POST https://longcare.au/api/chat -d '{"message":"hello"}'` |
| **Revenue impact** | +10-15% conversion rate = +A$500-1,500/tháng (at scale) |
| **Effort** | 5 phút |

### 1.2 ❷ Google OAuth Consent Screen (Day 1-2)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | Không login được = không booking được (auth required routes) |
| **Việc cần làm** | Submit OAuth consent screen, verify domain |
| **URL** | console.cloud.google.com → APIs & Services → OAuth consent screen |
| **Test** | Login flow trên longcare.au/app.longcare.au |
| **Revenue impact** | Unblocks 100% authenticated bookings |
| **Effort** | 1 ngày (chờ Google approve) |

### 1.3 ❸ Stripe Subscription Auto-billing (Day 2-3)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | Platform revenue = subscription, phải auto-renew |
| **Việc cần làm** | Stripe Billing: tạo Price objects cho 3 tiers, webhook `invoice.paid` |
| **File** | `services/api/src/routes/payment.ts` — thêm `/subscribe`, `/manage-subscription` |
| **File** | `services/api/src/routes/webhooks.ts` — handle `customer.subscription.*` events |
| **Revenue impact** | 100% platform recurring revenue |
| **Effort** | 4 giờ |

```typescript
// API endpoints cần thêm:
POST /payment/subscribe        → Stripe Checkout (subscription mode)
POST /payment/manage           → Stripe Customer Portal
POST /webhooks/stripe          → Handle invoice.paid, subscription.deleted
GET  /payment/subscription     → Current plan status
```

### 1.4 ❹ Real Google Calendar Sync (Day 3-4)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | Calendar giả → double booking → mất uy tín → mất khách |
| **Việc cần làm** | Connect real Calendar API, sync availability slots |
| **File** | `packages/google/src/services/calendar.ts` → dùng real credentials |
| **File** | `services/api/src/routes/booking.ts` → check real availability |
| **Revenue impact** | Prevents overbooking, enables real scheduling |
| **Effort** | 4 giờ |

### 1.5 ❺ Real Gmail Confirmations (Day 4)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | Email xác nhận = trust signal, chuyên nghiệp |
| **Việc cần làm** | Gmail API send từ hello@longcare.au |
| **File** | `packages/google/src/services/gmail.ts` → real send |
| **File** | `services/notification/src/templates/` → beautiful HTML templates |
| **Revenue impact** | +5% conversion (trust), -20% no-show (reminder) |
| **Effort** | 3 giờ |

### 1.6 ❻ Stripe Webhook End-to-End (Day 4-5)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | Payment succeed → auto confirm → Calendar → Email = revenue loop |
| **Việc cần làm** | Test full flow: Stripe payment → webhook → DB update → Calendar → Gmail |
| **Test** | Stripe test card → verify booking confirmed in DB + Calendar event created |
| **Revenue impact** | 100% payment→booking automation |
| **Effort** | 2 giờ |

### Sprint 1 Definition of Done

```
✅ AI chat trả lời chính xác (EN/VI/ZH)
✅ User login bằng Google → booking → payment → confirmation email
✅ Stripe subscription auto-renew cho tenants
✅ Calendar event thật tạo khi booking confirmed
✅ Email confirmation gửi sau khi payment
✅ Webhook Stripe xử lý 100% events
```

---

## SPRINT 2: CUSTOMER ACQUISITION (Tuần 3-4)

> **Mục tiêu:** 20-30 khách đầu tiên (10 longcare.au + 10-20 SME tenants)
> **KPI:** CAC < A$150, first 5 paying customers
> **Budget:** A$3,300/tháng Google Ads + organic

### 2.1 ❼ Google Ads Campaign Launch (Day 8-9)

| Item | Chi tiết |
|------|---------|
| **Keywords** | "online booking Australia", "AI booking system", "appointment scheduling" |
| **Budget** | A$3,300/tháng (A$110/ngày), CPC target A$2-5 |
| **Landing pages** | g.bookedai.au (SME), longcare.au (B2C) |
| **Conversion tracking** | GA4 + GTM events đã setup (12 events) |
| **Revenue impact** | 20-30 leads/tháng → 5-8 customers → A$400-600 MRR |
| **Effort** | 4 giờ setup + ongoing optimize |

**Chiến lược keywords:**

```
Tier 1 — High Intent (60% budget):
  "online booking software australia"           CPC ~A$3.50
  "appointment scheduling system"               CPC ~A$4.20
  "AI booking assistant"                        CPC ~A$2.80
  "beauty salon booking system"                 CPC ~A$3.00

Tier 2 — Medium Intent (30% budget):
  "automate customer bookings"                  CPC ~A$2.50
  "NDIS provider booking software"              CPC ~A$5.00
  "whatsapp booking bot"                        CPC ~A$1.50

Tier 3 — Brand (10% budget):
  "bookedai"                                    CPC ~A$0.50
  "longcare au"                                 CPC ~A$0.30
```

### 2.2 ❽ SEO Content — 10 Landing Pages (Day 9-12)

| Item | Chi tiết |
|------|---------|
| **Target** | 5 industry pages + 5 feature pages |
| **Industries** | Beauty, Allied Health, NDIS, Fitness, Professional Services |
| **Features** | AI Chat, WhatsApp Booking, Multi-session, QR Payment, Analytics |
| **File** | `apps/web-g-bookedai/src/app/[industry]/page.tsx` |
| **File** | `apps/web-g-bookedai/src/app/features/[feature]/page.tsx` |
| **Revenue impact** | Long-term organic traffic, A$0 CAC |
| **Effort** | 8 giờ |

### 2.3 ❾ Referral Program — Live (Day 12-13)

| Item | Chi tiết |
|------|---------|
| **Mechanics** | Giới thiệu 1 tenant → được 1 tháng free Growth (A$79 value) |
| **Referee** | Được 20% off tháng đầu |
| **Tracking** | Referral code trong URL + DB tracking (route đã có) |
| **File** | `services/api/src/routes/referral.ts` → enhance với reward logic |
| **File** | `apps/web-g-bookedai/src/app/referral/page.tsx` → referral dashboard |
| **Revenue impact** | CAC A$30-80 (vs A$150 paid), viral coefficient 0.3+ |
| **Effort** | 4 giờ |

### 2.4 ❿ Social Proof — Testimonials & Reviews (Day 13-14)

| Item | Chi tiết |
|------|---------|
| **Việc cần làm** | Collect 5 testimonials từ beta users, post lên Capterra/G2 |
| **Hiển thị** | Testimonial carousel trên g.bookedai.au + longcare.au |
| **File** | `apps/web-g-bookedai/src/app/page.tsx` → real testimonials section |
| **Revenue impact** | +15% conversion rate from social proof |
| **Effort** | 2 giờ technical, ongoing outreach |

### Sprint 2 Definition of Done

```
✅ Google Ads chạy, CPC < A$5, 100+ clicks/tuần
✅ 10 SEO landing pages indexed (Google Search Console)
✅ Referral system hoạt động end-to-end
✅ 5+ testimonials hiển thị trên landing pages
✅ First 5 paying customers (real revenue > A$0)
```

---

## SPRINT 3: CUSTOMER RETENTION & NO-SHOW REDUCTION (Tháng 2)

> **Mục tiêu:** Giảm churn từ 4% → 3%, giảm no-show 30-50%
> **KPI:** Customer retention >96%, no-show rate <10%

### 3.1 ⓫ SMS Reminders via Twilio (Week 5)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | SMS reminder giảm no-show 30-50% → bảo vệ revenue đã có |
| **Timing** | 24h trước + 2h trước appointment |
| **Template** | "Hi {name}, your {service} at Longcare is tomorrow at {time}. Reply C to cancel." |
| **File** | `services/notification/src/channels/sms.ts` |
| **File** | `services/api/src/routes/cron.ts` → add SMS reminder job |
| **Cost** | ~A$0.08/SMS, ~A$50/tháng cho 625 bookings |
| **Revenue impact** | Saves A$500-1,500/tháng in no-show losses |
| **Effort** | 6 giờ |

### 3.2 ⓬ Email Drip — Onboarding Sequence (Week 5-6)

| Item | Chi tiết |
|------|---------|
| **Day 0** | Welcome + how to setup your first service |
| **Day 3** | "Add your WhatsApp for auto-replies" |
| **Day 7** | "Your first week report" + upsell Growth plan |
| **Day 14** | Case study: "How X salon saved 10hrs/week" |
| **Day 30** | "Upgrade to Growth for multi-staff" |
| **File** | `services/notification/src/templates/drip/` |
| **Revenue impact** | +20% activation, +15% upgrade Starter→Growth |
| **Effort** | 4 giờ |

### 3.3 ⓭ Automated Follow-up Booking (Week 6)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | 60% revenue từ repeat bookings, auto-suggest = more revenue |
| **Logic** | Sau session → AI gợi ý next session → 1-click rebook |
| **File** | `services/api/src/routes/booking.ts` → add follow-up endpoint |
| **File** | `apps/booking-web/src/app/rebook/page.tsx` → pre-filled form |
| **Revenue impact** | +25% repeat booking rate |
| **Effort** | 4 giờ |

### 3.4 ⓮ In-App Notifications (Week 6-7)

| Item | Chi tiết |
|------|---------|
| **Channels** | Bell icon in nav + browser push (FCM) |
| **Events** | Booking confirmed, payment received, session reminder, new message |
| **File** | `services/api/src/routes/notifications.ts` → enhance |
| **File** | `apps/user-app/src/components/notification-bell.tsx` |
| **Revenue impact** | +10% engagement, reduces churn |
| **Effort** | 4 giờ |

### Sprint 3 Definition of Done

```
✅ SMS reminders 24h + 2h trước appointment
✅ 5-email onboarding drip sequence hoạt động
✅ Auto follow-up booking suggestion sau mỗi session
✅ In-app notification bell + push notifications
✅ No-show rate < 10% (tracked in dashboard)
✅ Churn rate < 4%
```

---

## SPRINT 4: SCALE & ENTERPRISE (Tháng 3)

> **Mục tiêu:** Multi-tenant billing live, enterprise features, A$3,400 MRR
> **KPI:** 35 tenants, 3+ Enterprise clients (A$199/mo each)

### 4.1 ⓯ Multi-tenant Billing Automation (Week 9-10)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | Không auto-bill = churn khi quên → mất MRR |
| **Việc cần làm** | Stripe Billing per tenant: trial → paid → upgrade/downgrade |
| **Features** | 14-day free trial, auto-upgrade prompt, usage metering |
| **File** | `services/api/src/routes/payment.ts` → tenant subscription CRUD |
| **File** | `apps/web-g-bookedai/src/app/pricing/page.tsx` → pricing + checkout |
| **Revenue impact** | 100% MRR automation, reduces churn 50% |
| **Effort** | 8 giờ |

### 4.2 ⓰ Xero Accounting Integration (Week 10-11)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | 60% SME AU dùng Xero, không có = deal breaker cho Enterprise |
| **Việc cần làm** | OAuth2 connect, auto-create invoices, reconcile payments |
| **File** | `services/accounting-sync/src/` → Xero API integration |
| **APIs** | Invoices, Payments, Contacts, BankTransactions |
| **Revenue impact** | Enables Enterprise tier (A$199/mo), +A$600-2,000 MRR |
| **Effort** | 16 giờ |

### 4.3 ⓱ White-label Custom Domain (Week 11-12)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | Enterprise muốn brand riêng (salon.com.au thay vì book.longcare.au) |
| **Việc cần làm** | Cloudflare API: add CNAME, auto-SSL, nginx dynamic proxy |
| **File** | `services/api/src/routes/partners.ts` → domain management |
| **Revenue impact** | Premium feature, justifies A$199/mo |
| **Effort** | 8 giờ |

### 4.4 ⓲ Commission Collection System (Week 12)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | 5% commission = passive revenue stream |
| **Việc cần làm** | Stripe Connect: platform fee on every tenant booking |
| **File** | `services/api/src/routes/payment.ts` → Stripe Connect application_fee |
| **Revenue impact** | 5% of all GMV = A$200-1,000/mo growing |
| **Effort** | 8 giờ |

### Sprint 4 Definition of Done

```
✅ Tenant signup → 14-day trial → auto-bill Stripe subscription
✅ Xero OAuth2 connected, auto-invoice on payment
✅ Custom domain mapping cho Enterprise tenants
✅ 5% platform commission collected via Stripe Connect
✅ 35+ active tenants, 3+ Enterprise
✅ MRR > A$3,400
```

---

## SPRINT 5: PREMIUM FEATURES (Tháng 4-6)

> **Mục tiêu:** Differentiate, raise ARPA, approach A$11,550 MRR
> **KPI:** ARPA > A$80, Enterprise pipeline 10+

### 5.1 ⓳ Afterpay/Zip BNPL Integration (Month 4)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | A$18B AU BNPL market, 30% millennials prefer BNPL |
| **Việc cần làm** | Afterpay API: checkout widget, webhook, settlement |
| **Revenue impact** | +15-20% checkout conversion, higher AOV |
| **Effort** | 12 giờ |

### 5.2 ⓴ Voice AI — After-hours Booking (Month 4-5)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | 40% calls after-hours → lost revenue |
| **Việc cần làm** | Twilio Voice + Google STT + Gemini → auto-book by phone |
| **Revenue impact** | +A$2,000-5,000/mo per tenant (at scale) |
| **Effort** | 40 giờ |

### 5.3 ㉑ No-Show Prediction AI (Month 5)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | Predict → overbooking → fill slots → recover 15-20% lost revenue |
| **Model** | Logistic regression: booking history, weather, time-of-day, payment method |
| **Revenue impact** | +A$500-1,500/mo per tenant |
| **Effort** | 20 giờ |

### 5.4 ㉒ Dynamic Pricing (Month 5-6)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | Peak/off-peak pricing = 10-25% revenue lift |
| **Logic** | Demand-based: high demand → +20%, low demand → -10% (fill empty slots) |
| **Revenue impact** | +10-25% ARPA expansion |
| **Effort** | 16 giờ |

### 5.5 ㉓ Mobile App — React Native (Month 6)

| Item | Chi tiết |
|------|---------|
| **Tại sao** | 70% bookings on mobile, native app = push + biometric + offline |
| **Việc cần làm** | React Native, share @bookedai/shared package |
| **Revenue impact** | +30% engagement, reduces churn |
| **Effort** | 80 giờ |

### Sprint 5 Definition of Done

```
✅ Afterpay/Zip checkout live cho all tenants
✅ Voice AI demo working (basic booking flow)
✅ No-show prediction model trained (>70% accuracy)
✅ Dynamic pricing toggle in tenant settings
✅ Mobile app MVP on TestFlight/Play Console
✅ MRR approaching A$11,550
```

---

## Revenue Waterfall — Dự kiến doanh thu theo tháng

```
Month    MRR        ARR          Khách   Nguồn chính
───────────────────────────────────────────────────────
  1     A$150     A$1,800         3     longcare.au + 2 beta
  2     A$550     A$6,600         8     Google Ads + referral
  3    A$1,500   A$18,000        15     Ads scaling + SEO start
  4    A$2,200   A$26,400        22     + commission + BNPL
  5    A$2,800   A$33,600        28     + Xero enterprise
  6    A$3,400   A$40,800        35     + organic growth
  7    A$4,500   A$54,000        45     + referral viral
  8    A$5,800   A$69,600        58     + voice AI upsell
  9    A$7,200   A$86,400        72     + industry partnerships
 10    A$8,800  A$105,600        88     + dynamic pricing
 11   A$10,100  A$121,200       115     + mobile app
 12   A$11,550  A$138,600       175     compound growth
```

---

## Chi phí vận hành hàng tháng

| Hạng mục | Cost/tháng | Ghi chú |
|----------|-----------|---------|
| VM (GCP e2-standard-4) | A$120 | Current production |
| Cloudflare Pro | A$25 | SSL + CDN + WAF |
| Stripe fees (2.9% + 30¢) | ~A$100-300 | Scales with GMV |
| Twilio SMS | A$50-150 | Scales with bookings |
| Gemini API | A$20-80 | Pay-per-use |
| Google Workspace | A$18 | Gmail API, Calendar |
| Domain renewals | A$15 | .au domains |
| Google Ads | A$3,300 | Customer acquisition |
| **Total** | **A$3,650-4,000** | **Break-even at ~50 Growth customers** |

---

## KPI Dashboard — Theo dõi hàng tuần

| Metric | Target | Cách đo |
|--------|--------|---------|
| **MRR** | Tăng 30% MoM | Stripe Dashboard |
| **New Tenants** | 5-10/tuần (after Month 2) | DB query: `SELECT count(*) FROM tenants WHERE created_at > now() - interval '7 days'` |
| **Booking Volume** | Tăng 20% WoW | DB query: bookings table |
| **No-Show Rate** | < 10% | Bookings: NO_SHOW / CONFIRMED |
| **Churn Rate** | < 4% monthly | Cancelled subscriptions / total |
| **CAC** | < A$150 | Ad spend / new customers |
| **LTV:CAC** | > 3:1 (target 13:1) | Average revenue × lifetime / CAC |
| **AI Chat Accuracy** | > 85% | Manual review 20 chats/week |
| **CSAT** | > 4.5/5 | Post-session survey |

---

## Risk & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Gemini API quota exceeded | AI chat down | Medium | OpenAI fallback + smart auto-reply |
| Stripe account suspended | All payments stop | Low | Keep reserve payment processor |
| Google OAuth rejected | Login broken | Medium | JWT fallback (đã có) |
| High churn Month 1-2 | MRR stalls | High | Email drip + SMS + 1:1 onboarding calls |
| Competitor copies | Market share loss | Medium | Speed + AI differentiation + AU compliance |
| GCP outage | All services down | Low | Dockerize → multi-cloud ready |

---

## Action Items — Việc làm NGAY HÔM NAY

```
1. [  ] Lấy Gemini API key mới (5 phút)
2. [  ] Submit Google OAuth consent screen (30 phút)
3. [  ] Test Stripe payment flow end-to-end (1 giờ)
4. [  ] Connect real Google Calendar credentials (2 giờ)
5. [  ] Setup Gmail API cho confirmation emails (2 giờ)
```

---

*Document owner: BookedAI Engineering*
*Last updated: 2026-05-06*
*Next review: Weekly Monday standup*
