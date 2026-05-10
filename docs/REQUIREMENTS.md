# BookedAI — Yeu Cau Chi Tiet Thuc Hien Du An

> **Version:** 1.0 | **Date:** 2026-05-06
> **Platform:** g.bookedai.au (SaaS) + longcare.au (First Tenant)
> **Slogan:** Turn customer intent into revenue — automatically
> **Target:** A$138,600 ARR Month 12 | Break-even Month 4-5

---

## Muc Luc

1. [Tam nhin & Mo hinh kinh doanh](#1-tầm-nhìn--mô-hình-kinh-doanh)
2. [Kien truc he thong](#2-kiến-trúc-hệ-thống)
3. [Co so du lieu](#3-cơ-sở-dữ-liệu)
4. [API & Endpoints](#4-api--endpoints)
5. [Tinh nang chi tiet](#5-tính-năng-chi-tiết)
6. [Thiet ke UI/UX](#6-thiết-kế-uiux)
7. [Quy trinh Approval & Kiem soat tai chinh](#7-quy-trình-approval--kiểm-soát-tài-chính)
8. [Compliance & Tieu chuan](#8-compliance--tiêu-chuẩn)
9. [Ke hoach thuc hien (5 Sprints)](#9-kế-hoạch-thực-hiện-5-sprints)
10. [KPI & Metrics](#10-kpi--metrics)
11. [Van hanh & Monitoring](#11-vận-hành--monitoring)
12. [Phu luc](#12-phụ-lục)

---

## 1. Tam Nhin & Mo Hinh Kinh Doanh

### 1.1 Product Vision

```
AI recommends → Truth Engine confirms → Payment proves → Accounting records → Analytics optimizes
```

BookedAI la nen tang AI tu dong hoa hanh trinh khach hang cho cac doanh nghiep dich vu tai Uc:
- **AI Chat** phan tich y dinh khach hang (12 intents, EN/VI/ZH)
- **Booking Engine** tu dong dat lich, giu cho, xac nhan
- **Payment** thu tien tu dong (Stripe + QR AUD/VND)
- **Session Intelligence** ghi nhan, tom tat, de xuat buoc tiep
- **Marketing Automation** tao noi dung 8 kenh, referral, drip email

### 1.2 Hai Domain Tach Bach

| Domain | Vai tro | Doi tuong | Doanh thu |
|--------|---------|-----------|-----------|
| **g.bookedai.au** | SaaS Platform ban cho SME | Owner doanh nghiep | Subscription A$0-199/thang + 5% commission |
| **longcare.au** | AI Training, Mentorship & Implementation Ecosystem | **Individuals + Startups + SMEs + Organisations** | Dich vu A$29-3,000+/engagement |

> **Longcare.au scope** (per [docs/longcare/VISION.md](./longcare/VISION.md) v2.0):
> 7 trụ cột — AI Learning & Mentorship · SME Transformation · Agent Marketplace · Governance & Compliance · Community & Ecosystem · **Startup Mentorship & Advisory** · **Cloud & Infrastructure Advisory**.
> Đối tượng: Individuals (career changers, AI learners) · Startups (founders, MVP, fundraising) · SMEs (retail, services, agencies) · Organisations (innovation/transformation teams).
> Định vị: "Trusted AI ecosystem partner across Australia and APAC", aligned with Google Cloud for Startups.

### 1.3 Pricing — g.bookedai.au (SaaS)

| Plan | Gia/thang | Bookings | Staff | Tinh nang |
|------|----------|----------|-------|-----------|
| **Starter** | A$0 (Free) | 100/thang | 1 | AI chat co ban, email reminders |
| **Growth** | A$79 | Unlimited | 5 | AI chat, SMS, CRM, analytics, WhatsApp |
| **Enterprise** | A$199 | Unlimited | Unlimited | White-label, API, Xero, SLA, custom domain |
| **Commission** | A$0/thang + 5% | Per booking | - | Khong phai tra subscription |

### 1.4 Pricing — longcare.au (Tenant)

| Dich vu | Gia (incl GST) | Loai |
|---------|----------------|------|
| AI Starter Consultation | A$29 → A$49 | Single session |
| AI Mentor 1:1 | A$99 → A$120 | Single session |
| 5-Session Package | A$450 | Multi-session |
| 10-Session Package | A$850 | Multi-session |
| Custom Enterprise | A$1,500-3,000+ | Custom |

### 1.5 Du bao doanh thu

```
Month    MRR        ARR          Khach   Nguon chinh
  1     A$150     A$1,800         3     longcare.au + 2 beta
  3    A$1,500   A$18,000        15     Ads scaling + SEO
  6    A$3,400   A$40,800        35     + organic + referral
  12   A$11,550  A$138,600       175    compound growth

Chi phi van hanh: ~A$3,650-4,000/thang
Break-even: ~50 Growth customers
```

---

## 2. Kien Truc He Thong

### 2.1 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 + React 19 + Tailwind CSS v4 |
| Backend | Express 5 + TypeScript + Zod validation |
| Database | PostgreSQL 16 (truth) + Redis 7 (cache) |
| AI | Google Gemini 2.0 Flash + OpenAI fallback |
| Auth | Firebase Auth (Google Sign-In) + JWT fallback |
| Payment | Stripe LIVE + QR (AUD PayID + VND VietQR) |
| Communication | Gmail API + Twilio SMS + FCM Push + WhatsApp Cloud API |
| Calendar | Google Calendar API + Google Meet |
| Analytics | GA4 + GTM + BigQuery + Looker Studio |
| Hosting | GCP VM (e2-standard-4) + Cloudflare CDN + Nginx |
| CI/CD | GitHub + PM2 |

### 2.2 Domain Map

| Domain | Workspace | Port | Muc dich |
|--------|-----------|------|----------|
| g.bookedai.au | apps/web-g-bookedai | 3000 | Landing page SaaS + partner signup |
| longcare.au | apps/web-longcare | 3001 | Tenant website + blog + courses |
| book.longcare.au | apps/booking-web | 3002 | Booking flow + payment |
| app.longcare.au | apps/user-app | 3003 | User dashboard |
| admin.longcare.au | apps/admin-app | 3004 | Admin + approval center |
| meet.longcare.au | apps/meet | 3005 | Meeting redirect |
| api (internal) | services/api | 8090 | API Gateway |
| agent (internal) | services/agent | 8091 | AI Agent |
| notification (internal) | services/notification | 8082 | Email/SMS/Push |
| drive-sync (internal) | services/drive-sync | 8083 | CEO Reports |

### 2.3 Module Registry

| ID | Module | Doc lap? | Scale Strategy |
|----|--------|----------|----------------|
| M01 | apps/web-g-bookedai | Yes | CDN / Cloud Run |
| M02 | apps/web-longcare | Yes | CDN / Cloud Run |
| M03 | apps/booking-web | Yes | CDN / Cloud Run |
| M04 | apps/meet | Yes | CDN |
| M05 | apps/user-app | Yes | CDN / Cloud Run |
| M06 | apps/admin-app | Yes | CDN / Cloud Run |
| M07 | services/api | Yes | Horizontal scale |
| M08 | services/agent | Yes | Horizontal scale |
| M09 | services/notification | Yes | Queue-based |
| M10 | services/drive-sync | Yes | Single instance |
| M11 | services/payment | Yes | Via API gateway |
| M12 | services/learning-agent | Yes | Via API gateway |
| M13 | services/marketing-agent | Yes | Via API gateway |
| M14 | services/accounting-sync | Yes | Via API gateway |
| M15 | packages/shared | Shared | NPM versioned |
| M16 | packages/db | Shared | Connection pool |
| M17 | packages/google | Shared | NPM versioned |
| M18 | packages/ui | Shared | NPM versioned |

### 2.4 Inter-Service Communication

```
Frontend Apps ──HTTPS──▶ Cloudflare ──▶ Nginx ──proxy──▶ API Gateway (M07)
                                                              │
                                              ┌───────────────┼───────────────┐
                                              ▼               ▼               ▼
                                        AI Agent (M08)  Notification (M09) Drive Sync (M10)
                                        HTTP :8091      HTTP :8082          HTTP :8083
```

**Quy tac:** Frontend KHONG goi truc tiep services khac. Luon qua API Gateway hoac nginx proxy `/api/*`.

---

## 3. Co So Du Lieu

### 3.1 Tables (8 Migrations)

| Migration | Tables | Muc dich |
|-----------|--------|----------|
| 001 | tenants, users, services, availability_slots, bookings, payments, learning_sessions, marketing_campaigns, audit_logs | Schema goc |
| 002 | invoices, social_content_items, notification_preferences, calendar_events, learning_notes | Mo rong GST, social, notifications |
| 003 | webhook_events + OCC (version column) | Idempotency + optimistic concurrency |
| 004 | users.openai_sub, users.auth_provider | OpenAI OAuth |
| 005a | notifications | In-app notifications |
| 005b | RLS policies | Row-level security per tenant |
| 006 | courses, lessons, enrollments, quiz_results, certificates | Learning platform |
| 007 | Indexes on bookings, payments, users | Performance |
| **008** | **approval_requests, spending_limits, spending_ledger** | **Approval workflow & spending controls** |

### 3.2 Booking Status Flow

```
DRAFT → HOLD (10min TTL) → PENDING_PAYMENT → CONFIRMED
                                                  │
                                    ┌─────────────┼─────────────┐
                                    ▼             ▼             ▼
                              RESCHEDULED    CANCELLED      NO_SHOW
                                    │             │
                                    ▼             ▼
                              CONFIRMED       REFUNDED
```

### 3.3 Approval Status Flow

```
PENDING_APPROVAL → APPROVED   (admin nhan Approve + ly do)
PENDING_APPROVAL → REJECTED   (admin nhan Reject + ly do BAT BUOC)
PENDING_APPROVAL → EXPIRED    (auto 72h khong xu ly)
PENDING_APPROVAL → CANCELLED  (nguoi tao huy)
```

### 3.4 Event Bus (Pub/Sub Topics)

```
booking.created, booking.paid, booking.cancelled
payment.succeeded, payment.failed
session.completed, learning.notes.created
marketing.content.approved, accounting.sync.failed
notification.sent, approval.requested, approval.processed
```

---

## 4. API & Endpoints

### 4.1 Public Endpoints (No Auth)

| Method | Path | Muc dich |
|--------|------|----------|
| GET | /health | Health check + DB connectivity |
| GET | /openapi.json | OpenAPI 3.1 spec |
| GET | /docs | Scalar API documentation UI |
| POST | /chat | AI chat (Gemini via agent) |
| GET | /services | List active services |
| POST | /services/search | Search services |
| GET | /courses | List courses |
| GET | /courses/:id | Course detail |
| POST | /guest-booking | Guest booking (no auth) |
| POST | /payment/guest-checkout | Guest Stripe checkout |

### 4.2 Authenticated Endpoints (Firebase/JWT)

| Method | Path | Role | Muc dich |
|--------|------|------|----------|
| POST | /booking/hold | User | Hold slot 10min |
| POST | /booking/confirm | User | Confirm + Calendar + Meet + Email |
| POST | /booking/cancel | User | Cancel + release slot |
| POST | /booking/reschedule | User | Reschedule + Calendar update |
| POST | /payment/checkout | User | Stripe Checkout / bank transfer |
| POST | /learning/session-summary | User | AI summary + Google Docs |
| GET | /learning/history | User | Learning sessions |
| POST | /courses/:id/enroll | User | Enroll in course |
| GET | /notifications | User | Notification list |
| PUT | /notifications/:id/read | User | Mark read |
| GET | /events/booking/:id | User | SSE booking status |
| GET | /events/chat/:id | User | SSE chat streaming |

### 4.3 Admin Endpoints (authenticate + requireRole)

| Method | Path | Role | Muc dich |
|--------|------|------|----------|
| GET | /dashboard/admin/stats | Admin | Revenue KPIs |
| GET | /dashboard/admin/revenue-by-service | Admin | Revenue breakdown |
| GET | /dashboard/admin/pending-payments | Admin | Bank transfers cho duyet |
| POST | /dashboard/admin/approve-payment | Admin | Approve + audit trail |
| GET | /dashboard/admin/users | Admin | User management |
| POST | /marketing/campaigns | Admin | Create AI campaign |
| POST | /marketing/approve | Admin | Approve campaign publish |
| **GET** | **/approval/pending** | **Admin** | **Danh sach chi tieu cho duyet** |
| **POST** | **/approval/request** | **Admin** | **Tao yeu cau chi tieu** |
| **POST** | **/approval/:id/approve** | **Admin** | **NUT APPROVE (dual-control)** |
| **POST** | **/approval/:id/reject** | **Admin** | **NUT REJECT (ly do bat buoc)** |
| **GET** | **/approval/history** | **Admin** | **Lich su da xu ly** |
| **GET** | **/approval/stats** | **Admin** | **Tong chi tieu + limits** |
| **GET** | **/approval/ledger** | **Admin** | **So cai doi chieu** |
| **POST** | **/approval/ledger/:id/reconcile** | **Admin** | **Danh dau da reconcile** |

### 4.4 Webhook Endpoints

| Method | Path | Auth | Muc dich |
|--------|------|------|----------|
| POST | /webhooks/stripe | Signature | Stripe events → confirm → Calendar → Gmail |
| GET | /whatsapp | Token verify | WhatsApp webhook verification |
| POST | /whatsapp | Token verify | WhatsApp message → AI auto-reply |

---

## 5. Tinh Nang Chi Tiet

### 5.1 AI Chat Engine

**Yeu cau:**
- 12 intents phan loai tu dong: booking, pricing, service_info, availability, cancel, reschedule, payment_help, complaint, learning, greeting, farewell, other
- Da ngon ngu: EN/VI/ZH (auto-detect tu browser)
- Fallback thong minh khi AI API fail (smart auto-reply 15+ topics)
- Conversation context (gioi han 10 messages)
- Tool-use: searchServices, getServiceDetails, generateBookingLink, checkAvailability
- SSE streaming response

**Files:**
- `services/agent/src/agents/revenue-orchestrator.ts`
- `services/agent/src/agents/intent-classifier.ts`
- `services/agent/src/agents/tools.ts`

### 5.2 Booking System

**Yeu cau:**
- Single-page auto-scroll booking flow (5 steps, no page reload)
- Service grid voi SVG illustrations
- 2-month calendar (8 tuan), hash-based consistent availability
- Multi-session packages (5/10 sessions): auto-suggest weekly
- Hold slot 10 phut (auto-expire via cron)
- Guest booking (no auth required)
- Booking QR code de scan manage
- Manage page: reschedule, cancel, change service

**Files:**
- `apps/booking-web/src/app/page.tsx`
- `apps/booking-web/src/components/availability-calendar.tsx`
- `apps/booking-web/src/app/manage/[ref]/page.tsx`

### 5.3 Payment System

**Yeu cau:**
- Stripe LIVE checkout (card, Apple Pay, Google Pay)
- QR payment (AUD PayID + VND Vietcombank VietQR)
- Pay Later option (manual admin approval)
- Webhook: payment.succeeded → auto confirm booking → Calendar → Email
- Multi-session package payment (upfront full amount)
- **MOI REFUND PHAI QUA APPROVAL CENTER**
- GST tu dong tinh (10% = total/11)

**Files:**
- `services/api/src/routes/payment.ts`
- `services/api/src/routes/webhooks.ts`

### 5.4 Calendar & Meeting

**Yeu cau:**
- Google Calendar API real sync
- Google Meet link tu dong tao khi booking confirmed
- Meet redirect page: meet.longcare.au/{meetingId}
- Calendar availability check truoc khi hold
- Reminder: 24h + 2h truoc session

**Files:**
- `packages/google/src/services/calendar.ts`
- `apps/meet/src/app/page.tsx`

### 5.5 Notification System

**Yeu cau:**
- Email: Gmail API (booking confirm, reminder, welcome, drip)
- SMS: Twilio (24h + 2h reminders, marketing opt-in)
- Push: FCM (browser + mobile)
- In-app: Bell icon + notification list
- WhatsApp: Auto-reply AI agent

**Channels priority:** Email > SMS > Push > In-app > WhatsApp

**Files:**
- `services/notification/src/`
- `services/api/src/routes/whatsapp.ts`
- `services/api/src/routes/notifications.ts`

### 5.6 Marketing Automation

**Yeu cau:**
- AI generate 8-channel content (Email, LinkedIn, Instagram, Facebook, TikTok, YouTube, Blog, Podcast)
- Campaign workflow: DRAFT → NEEDS_REVIEW → APPROVED → SCHEDULED → PUBLISHED
- **Campaign publish PHAI qua admin approve**
- UTM tracking on all links
- Referral program: invite 1 tenant → 1 month free Growth
- Email drip: Day 0/3/7/14/30 onboarding sequence

**Files:**
- `services/api/src/routes/marketing.ts`
- `services/api/src/routes/referral.ts`
- `services/marketing-agent/`

### 5.7 Learning Platform

**Yeu cau:**
- Course catalog: lessons, quizzes, certificates
- AI session summary (Gemini) → Google Docs
- Learning progress tracking
- Course AI tutor (per-lesson Q&A)
- Certificate generation (PDF)

**Files:**
- `services/api/src/routes/courses.ts`
- `services/api/src/routes/learning.ts`
- `services/learning-agent/`

### 5.8 Admin Dashboard

**Yeu cau:**
- Revenue KPIs: today, MTD, by service
- Booking management: list, filter, confirm, cancel
- User management: list, role filter, search
- **Approval Center: pending queue, history, spending limits**
- Marketing campaigns: review, approve, reject
- System health: API, DB, Firestore, Stripe, AI, Gmail
- Export: CSV (bookings, revenue, users)
- Webhook event log

**Pages:**
- `/` Dashboard (KPIs, charts, recent bookings)
- `/bookings` Booking management
- `/users` User management
- `/approvals` **Approval Center (spending controls)**
- `/marketing` Campaign management
- `/analytics` Performance metrics
- `/health` System health
- `/webhooks` Webhook logs
- `/emails` Email templates
- `/login` Authentication

### 5.9 Partner & Tenant Management

**Yeu cau:**
- Partner signup form (g.bookedai.au)
- 4-step onboarding wizard
- Tenant isolation (RLS policies)
- Custom domain mapping (Cloudflare API)
- White-label CSS variables per tenant
- Tenant billing (Stripe Subscriptions)
- API key management

**Files:**
- `services/api/src/routes/partners.ts`
- `apps/web-g-bookedai/src/app/onboarding/`

### 5.10 WhatsApp Integration

**Yeu cau:**
- Webhook verification (GET challenge)
- Message handler: text → AI agent → reply
- Auto-detect language
- Business phone: +61455301335
- Reply within 24h window (WhatsApp policy)

**Files:**
- `services/api/src/routes/whatsapp.ts`

---

## 6. Thiet Ke UI/UX

### 6.1 Design System (Light & Friendly Theme)

| Token | Value |
|-------|-------|
| Background | Off-white #F8FAFC (nền chính sáng, dịu mắt) |
| Surface | White #FFFFFF (card, modal, vùng chứa nội dung) |
| Primary | Blue #3B82F6 (xanh thân thiện, tạo sự tin tưởng) |
| Secondary | Sky #0EA5E9 (xanh dương nhạt, tươi sáng) |
| Accent | Coral #FF7F50 hoặc Teal #14B8A6 (điểm nhấn nổi bật) |
| Text | Slate #334155 (xám đậm, dễ đọc trên nền sáng, không dùng đen tuyền) |
| Success | Green #22C55E |
| Warning | Amber #F59E0B |
| Error | Red #EF4444 |
| Font Heading | Quicksand hoặc Outfit (tròn trịa, hiện đại, thân thiện) |
| Font Body | Inter hoặc Outfit |
| Font Code | JetBrains Mono |
| Border Radius | 16px (cards), 12px (buttons), 8px (inputs) - bo tròn mềm mại |
| Shadows | Soft diffuse (0 4px 20px rgba(0,0,0,0.05)) |
| Spacing | 4px grid (0.25rem increments) |

#### Định hướng UI/UX (Redesign cho longcare.au):
- **Giao diện thân thiện:** Ưu tiên thiết kế bo góc lớn, sử dụng bóng đổ mềm (soft shadows) để tạo cảm giác các khối nổi nhẹ trên nền trắng, tránh viền cứng nhắc.
- **Nền màu sáng (Light-themed):** Đảm bảo độ tương phản (contrast) chuẩn WCAG với chữ xám đậm trên nền trắng/off-white. Tạo không gian mở, thoáng đãng.
- **Hình ảnh minh hoạ:** Sử dụng các hình minh hoạ (illustrations) 2D phong cách tươi sáng, hoặc ảnh chân dung mentor có nụ cười tự nhiên, nền trong suốt/sáng.
- **Trải nghiệm tích cực:** Màu sắc ấm, các micro-interactions (hiệu ứng hover, click) cần mượt mà (transition ~0.2s - 0.3s).

### 6.2 Component Library (@bookedai/ui)

| Component | Status | Muc dich |
|-----------|--------|----------|
| Button | Done | Primary, Secondary, Outline, Ghost, Danger |
| Card | Done | Content container |
| Badge | Done | Status, category labels |
| Input | Done | Text, email, password, search |
| Footer | Done | Shared footer |
| Select | Done | Dropdown |
| Modal | Done | Dialog, confirm |
| Toast | Done | Success, error, warning notifications |
| DataTable | Done | Sortable, filterable tables |
| Tabs | Done | Tab navigation |
| Stepper | Done | Multi-step wizard |
| Skeleton | Done | Loading states |
| Avatar | Done | User avatar |
| Switch | Done | Toggle |
| Tooltip | Done | Hover info |
| Accordion | Done | Collapsible sections |
| Sidebar | Done | Admin navigation |

### 6.3 Responsive Breakpoints

```
Mobile:  320px  — 640px   (single column)
Tablet:  641px  — 1024px  (2 columns)
Desktop: 1025px — 1440px  (3-4 columns)
Wide:    1441px — 1920px  (max-width container)
```

### 6.4 Page Inventory (53 pages)

**g.bookedai.au (10 pages):**
Landing, Pricing, Features, Industries (5), Docs/API, Onboarding Wizard, Partner Dashboard

**longcare.au (18 pages):**
Home, About, Services, Blog (list+3 posts), Courses (list+detail), FAQ, Mentors, Testimonials, Contact, Search, Terms, Privacy

**book.longcare.au (3 pages):**
Booking Flow (single-page), Manage Booking, Rebook

**app.longcare.au (6 pages):**
Dashboard, Bookings, Profile, Learning, Notifications, Settings

**admin.longcare.au (10 pages):**
Dashboard, Bookings, Users, **Approvals**, Marketing, Analytics, Health, Webhooks, Emails, Login

**meet.longcare.au (1 page):**
Meeting redirect

---

## 7. Quy Trinh Approval & Kiem Soat Tai Chinh

### 7.1 Nguyen Tac Co Ban

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   MOI CHI TIEU TU DONG PHAI:                                    │
│                                                                  │
│   1. Tao approval request trong he thong                        │
│   2. Hien thi tren Approval Center (admin.longcare.au/approvals)│
│   3. Admin KHAC (khong phai nguoi tao) nhan APPROVE             │
│   4. Co ly do/justification BAT BUOC                            │
│   5. Ghi vao spending_ledger de doi chieu                       │
│   6. GST tu dong tinh (10%)                                     │
│   7. Reconcile cuoi thang                                       │
│                                                                  │
│   KHONG BAO GIO tu dong chi tien ma khong co nut approve.       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 7.2 Spending Categories & Limits

| Category | Vi du | Admin Max/Lan | Admin Max/Ngay | Admin Max/Thang | Dual Approve? | Auto-approve |
|----------|-------|---------------|----------------|-----------------|---------------|-------------|
| `refund` | Hoan tien khach | $500 | $2,000 | $10,000 | No | $0 |
| `payout` | Chi vendor/partner | $1,000 | $5,000 | $20,000 | **YES** | $0 |
| `ad_spend` | Google/Facebook Ads | $500 | $2,000 | $5,000 | No | $0 |
| `sms_cost` | Twilio SMS | $100 | $500 | $2,000 | No | $50 |
| `marketing_budget` | Content, PR, influencer | $1,000 | $3,000 | $10,000 | No | $0 |
| `vendor_payment` | Software, hosting | $2,000 | $5,000 | $20,000 | **YES** | $0 |
| `subscription_charge` | Tenant billing | $500 | $1,000 | $5,000 | No | $0 |

**Superadmin** co limit cao hon gap 4-5 lan va co the override dual-approval.

### 7.3 Dual-Control Principle

```
Admin A tao request  →  Admin B review + approve/reject
Admin B tao request  →  Admin A review + approve/reject
Superadmin co the override cho payout & vendor categories
KHONG AI tu approve request cua chinh minh
```

### 7.4 Approval UI (admin.longcare.au/approvals)

**3 Tabs:**

| Tab | Noi dung |
|-----|---------|
| Pending Approval | Queue chi tieu cho duyet + nut APPROVE / REJECT |
| History | Lich su da xu ly (approved, rejected, expired) |
| Spending Limits | Bang limits theo role/category |

**Moi approval card hien thi:**
- Category badge (mau theo loai)
- So tien (font lon, mau do)
- Action description
- REASON/JUSTIFICATION box (vien vang, bat buoc)
- Requester name + thoi gian
- Reference link (booking/payment/campaign)
- Expiry time
- Input: Approval note (tuy chon)
- Input: Rejection reason (BAT BUOC de reject)
- Button: **APPROVE** (xanh) + **REJECT** (do) + confirm dialog

### 7.5 Spending Ledger & Reconciliation

Moi chi tieu da approve ghi vao `spending_ledger`:

```
amount_cents     → Tong chi (incl GST)
gst_cents        → GST = amount / 11
net_cents        → amount - gst
stripe_charge_id → Stripe ref (neu co)
xero_invoice_id  → Xero invoice (khi sync)
reconciled       → true/false
reconciled_by    → Ai doi chieu
reconciled_at    → Khi nao doi chieu
```

**Quy trinh cuoi thang:**
1. Vao Approval Center → Spending Ledger
2. Filter: unreconciled only
3. Doi chieu tung entry voi bank statement / Xero
4. Click "Reconcile" + nhap bank reference
5. Bao cao: tong chi theo category, GST, net

### 7.6 Cac hoat dong CHI TIEU can approve

| Hoat dong | Category | Trigger |
|-----------|----------|---------|
| Hoan tien booking qua Stripe | `refund` | Admin click Refund |
| Tra tien cho mentor/partner | `payout` | Cuoi thang settle |
| Nap budget Google Ads | `ad_spend` | Truoc khi chay campaign |
| Gui SMS nhac lich (Twilio) | `sms_cost` | Cron job tao request |
| Chi influencer/PR | `marketing_budget` | Marketing team request |
| Tra license Gemini/Stripe/Twilio | `vendor_payment` | Monthly invoice |
| Charge tenant subscription | `subscription_charge` | Stripe Billing event |

---

## 8. Compliance & Tieu Chuan

> Chi tiet: [COMPLIANCE_GOVERNANCE.md](./COMPLIANCE_GOVERNANCE.md)

### 8.1 Australian Privacy Act 1988

| APP | Principle | Implementation |
|-----|-----------|---------------|
| 1 | Open management | Privacy policy published |
| 2 | Anonymity | Guest booking available |
| 3 | Collection | Only email, name, phone |
| 5 | Notification | Privacy notice on forms |
| 6 | Use/disclosure | Data for stated purposes only |
| 7 | Direct marketing | Opt-in only, unsubscribe |
| 8 | Cross-border | Data in Sydney (AU) |
| 11 | Security | Encryption, access control, audit |
| 12 | Access | CSV export |
| 13 | Correction | User profile edit |

### 8.2 GST Compliance

```
Gia hien thi: LUON BAO GOM GST (tieu chuan Uc)
GST = 10% = Total / 11
Moi payment tao tax invoice:
  - ABN, invoice number, date, buyer/seller, description
  - Total (incl GST), GST amount, payment method
BAS lodgment: Quarterly (Q1 Jul-Sep → due 28 Oct, ...)
```

### 8.3 Australian Consumer Law (ACL)

- Dich vu phu hop muc dich (service descriptions chinh xac)
- Cooling-off 7 ngay (sessions chua su dung)
- Khong quang cao sai (pricing transparent, no hidden fees)
- Quy trinh khieu nai ro rang
- Quyen hoan tien qua Approval Center

### 8.4 AML/CTF Transaction Monitoring

| Rule | Threshold | Action |
|------|-----------|--------|
| Large transaction | > $10,000 AUD | Flag review |
| Unusual pattern | 5+ bookings/ngay cung user | Alert admin |
| Refund churning | 3+ refunds/30 ngay | Auto-block |
| Cash threshold | > $5,000 bank transfers/ngay | AML review |

### 8.5 WCAG 2.2 AA Accessibility

- Alt text on all images
- 4.5:1 text contrast ratio
- Keyboard navigation (all interactive elements)
- ARIA labels, semantic HTML
- Focus visible, skip-to-content
- Monthly automated scan (axe-core)

### 8.6 Security (OWASP Top 10)

| # | Vulnerability | Mitigation |
|---|-------------|-----------|
| A01 | Broken Access Control | authenticate + requireRole middleware |
| A02 | Cryptographic | HTTPS, Stripe tokenization |
| A03 | Injection | Parameterized queries, Zod validation |
| A04 | Insecure Design | Dual-control, least privilege |
| A05 | Misconfiguration | Helmet, CORS whitelist |
| A07 | Auth Failures | Firebase Auth, rate limiting |
| A08 | Integrity | Stripe webhook signature |
| A09 | Logging | Audit logs, pino structured logging |

### 8.7 Data Retention

| Data | Retention | Reason |
|------|----------|--------|
| Bookings (active) | Indefinite | Operational |
| Bookings (completed) | 7 nam | Tax/audit |
| Payments | 7 nam | GST/BAS |
| Audit logs | 7 nam | Financial audit |
| Spending approvals | 7 nam | Governance |
| User (inactive) | 2 nam → anonymize | Privacy |
| Chat transcripts | 1 nam → delete | Privacy |

---

## 9. Ke Hoach Thuc Hien (5 Sprints)

> Chi tiet: [REVENUE_PRIORITY_PLAN.md](./REVENUE_PRIORITY_PLAN.md)
> Nguyen tac: **Kiem tien → Giu tien → Toi uu tien**

### SPRINT 1: Fix Revenue Blockers (Tuan 1-2)

| # | Task | Module | Priority | Revenue Impact | Effort | Approval? |
|---|------|--------|----------|----------------|--------|-----------|
| 1 | Fix Gemini API key | M08 | CRITICAL | +10-15% conversion | 5 min | No |
| 2 | Google OAuth consent screen | M07 | CRITICAL | Unblocks auth | 1 day | No |
| 3 | Stripe Subscription auto-billing | M07 | CRITICAL | 100% platform MRR | 4 hrs | `subscription_charge` |
| 4 | Real Google Calendar sync | M17 | HIGH | Prevents overbooking | 4 hrs | No |
| 5 | Real Gmail confirmations | M17 | HIGH | +5% conversion | 3 hrs | No |
| 6 | Stripe webhook E2E test | M07 | HIGH | 100% automation | 2 hrs | No |

**Definition of Done:**
- [ ] AI chat tra loi chinh xac (EN/VI/ZH)
- [ ] User login Google → booking → payment → email
- [ ] Stripe subscription auto-renew
- [ ] Calendar event that tao khi confirmed
- [ ] Email confirmation gui sau payment
- [ ] Webhook Stripe xu ly 100% events

### SPRINT 2: Customer Acquisition (Tuan 3-4)

| # | Task | Module | Priority | Revenue Impact | Effort | Approval? |
|---|------|--------|----------|----------------|--------|-----------|
| 7 | Google Ads campaign | Marketing | CRITICAL | 20-30 leads/mo | 4 hrs | `ad_spend` **PHAI APPROVE** |
| 8 | SEO: 10 industry/feature pages | M01 | HIGH | Long-term $0 CAC | 8 hrs | No |
| 9 | Referral program live | M07 | HIGH | CAC $30-80 | 4 hrs | No |
| 10 | Social proof (5 testimonials) | M01,M02 | MEDIUM | +15% conversion | 2 hrs | No |

**Definition of Done:**
- [ ] Google Ads chay, CPC < $5 — moi lan nap budget phai approve
- [ ] 10 SEO pages indexed
- [ ] Referral system end-to-end
- [ ] 5+ testimonials hien thi

### SPRINT 3: Customer Retention (Thang 2)

| # | Task | Module | Priority | Revenue Impact | Effort | Approval? |
|---|------|--------|----------|----------------|--------|-----------|
| 11 | SMS reminders (Twilio) | M09 | CRITICAL | -30-50% no-show | 6 hrs | `sms_cost` auto < $50 |
| 12 | Email drip onboarding | M09 | HIGH | +20% activation | 4 hrs | No |
| 13 | Auto follow-up booking | M07 | HIGH | +25% repeat | 4 hrs | No |
| 14 | In-app notifications + push | M09 | MEDIUM | +10% engagement | 4 hrs | No |

**Definition of Done:**
- [ ] SMS 24h + 2h truoc — chi phi SMS qua approval neu > $50
- [ ] 5-email drip hoat dong
- [ ] Auto follow-up suggestion
- [ ] Notification bell + push
- [ ] No-show < 10%

### SPRINT 4: Scale & Enterprise (Thang 3)

| # | Task | Module | Priority | Revenue Impact | Effort | Approval? |
|---|------|--------|----------|----------------|--------|-----------|
| 15 | Multi-tenant billing | M07 | CRITICAL | 100% MRR auto | 8 hrs | `subscription_charge` |
| 16 | Xero accounting | M14 | HIGH | Enterprise enabler | 16 hrs | No |
| 17 | White-label domains | Infra | HIGH | Justifies $199/mo | 8 hrs | No |
| 18 | 5% commission (Stripe Connect) | M07 | HIGH | Passive income | 8 hrs | No |

**Definition of Done:**
- [ ] Tenant signup → trial → auto-bill — billing qua approval
- [ ] Xero OAuth2 connected, auto-invoice
- [ ] Custom domain cho Enterprise tenants
- [ ] 5% commission collected
- [ ] 35+ tenants, 3+ Enterprise

### SPRINT 5: Premium Features (Thang 4-6)

| # | Task | Module | Priority | Revenue Impact | Effort | Approval? |
|---|------|--------|----------|----------------|--------|-----------|
| 19 | Afterpay/Zip BNPL | M11 | HIGH | +15-20% checkout | 12 hrs | No |
| 20 | Voice AI (after-hours) | M08 | HIGH | +$2-5K/mo/tenant | 40 hrs | No |
| 21 | No-show prediction AI | M08 | MEDIUM | +15-20% saved | 20 hrs | No |
| 22 | Dynamic pricing | M07 | MEDIUM | +10-25% ARPA | 16 hrs | No |
| 23 | Mobile app (React Native) | New | MEDIUM | +30% engagement | 80 hrs | No |

**Definition of Done:**
- [ ] Afterpay/Zip checkout live
- [ ] Voice AI demo working
- [ ] No-show model > 70% accuracy
- [ ] Dynamic pricing toggle
- [ ] Mobile MVP

---

## 10. KPI & Metrics

### 10.1 Revenue Metrics

| Metric | Target | Cach do |
|--------|--------|---------|
| MRR | Tang 30% MoM | Stripe Dashboard |
| New Tenants | 5-10/tuan (Month 2+) | DB: `SELECT count(*) FROM tenants WHERE created_at > now()-7d` |
| Booking Volume | Tang 20% WoW | DB: bookings table |
| ARPA | > $80 | MRR / active customers |
| Commission Rev | > 5% GMV | Stripe Connect |

### 10.2 Operational Metrics

| Metric | Target | Cach do |
|--------|--------|---------|
| No-Show Rate | < 10% | Bookings: NO_SHOW / CONFIRMED |
| Churn Rate | < 4%/thang | Cancelled subs / total |
| CAC | < $150 | Ad spend / new customers |
| LTV:CAC | > 3:1 (target 13:1) | Avg revenue x lifetime / CAC |
| AI Chat Accuracy | > 85% | Manual review 20 chats/week |
| CSAT | > 4.5/5 | Post-session survey |

### 10.3 Financial Controls Metrics

| Metric | Target | Cach do |
|--------|--------|---------|
| Approval Response Time | < 24h | Avg(reviewed_at - requested_at) |
| Rejection Rate | Record only | Rejections / total requests |
| Spending vs Budget | < 100% monthly | spending_ledger vs limits |
| Reconciliation Rate | 100% | Reconciled / total entries |
| Unreconciled Items | 0 (end of month) | spending_ledger WHERE reconciled=false |

---

## 11. Van Hanh & Monitoring

### 11.1 Deployment

```bash
# Build & deploy
git pull origin main
pnpm install
pnpm build
pm2 restart ecosystem.config.cjs
pm2 save

# Smoke test
curl https://longcare.au/api/health
pm2 status
```

### 11.2 Health Checks

```bash
# API
curl http://localhost:8090/health

# All domains
for d in longcare.au g.longcare.au book.longcare.au app.longcare.au admin.longcare.au; do
  curl -sL -o /dev/null -w "%{http_code}" https://$d
done

# PM2
pm2 status
```

### 11.3 Monitoring

```bash
# Logs
pm2 logs api --lines 50
pm2 logs agent --lines 20

# Database
PGPASSWORD=localpass psql -h localhost -U bookedai -d longcare -c "
  SELECT 'Bookings' as entity, count(*) FROM bookings
  UNION ALL SELECT 'Users', count(*) FROM users
  UNION ALL SELECT 'Approvals Pending', count(*) FROM approval_requests WHERE status='PENDING_APPROVAL'
  UNION ALL SELECT 'Spending MTD', coalesce(sum(amount_cents),0) FROM spending_ledger WHERE created_at >= date_trunc('month', now())
"
```

### 11.4 Incident Response

```
P1 (Critical) — All down, data loss        → 15 min response
P2 (Major)    — Payment down               → 1 hour response
P3 (Minor)    — Feature degraded           → 4 hours response
P4 (Low)      — UI bug                    → 24 hours response

P1/P2 → Superadmin SMS + email immediately
P3    → Dashboard notification
P4    → Issue tracker
```

### 11.5 Backup

```
Database: Daily pg_dump, 30 days retention
Application: Git repository
Config: .env manual backup (encrypted)
Recovery test: Monthly
```

### 11.6 Change Management

```
1. Feature branch → PR → Code review → Merge
2. Tests: 17 unit + 16 E2E
3. PM2 restart affected services only
4. Smoke test domains
5. Monitor 30 minutes
6. Rollback plan documented before execution
```

---

## 12. Phu Luc

### 12.1 Tai lieu lien quan

| Document | Muc dich | File |
|----------|---------|------|
| PRD | Product requirements goc | [docs/PRD.md](./PRD.md) |
| Project Status | Tong quan trang thai | [docs/PROJECT.md](./PROJECT.md) |
| Implementation Plan | Module architecture | [docs/IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) |
| Revenue Priority Plan | 5-sprint kiem tien | [docs/REVENUE_PRIORITY_PLAN.md](./REVENUE_PRIORITY_PLAN.md) |
| Compliance Governance | Quy dinh tai chinh | [docs/COMPLIANCE_GOVERNANCE.md](./COMPLIANCE_GOVERNANCE.md) |
| CEO/CFO Strategy | Chien luoc kinh doanh | [docs/C-LEVEL_CEO_CFO_STRATEGY.md](./C-LEVEL_CEO_CFO_STRATEGY.md) |
| CMO GTM Strategy | Go-to-market | [docs/C-LEVEL_CMO_GTM_STRATEGY.md](./C-LEVEL_CMO_GTM_STRATEGY.md) |
| CTO R&D Analysis | Competitor + tech | [docs/C-LEVEL_CTO_RD_ANALYSIS.md](./C-LEVEL_CTO_RD_ANALYSIS.md) |
| UI/UX Plan | Design system | [docs/UI_UX_ENTERPRISE_PLAN.md](./UI_UX_ENTERPRISE_PLAN.md) |

### 12.2 Environment Variables

| Variable | Module | Muc dich |
|----------|--------|----------|
| DATABASE_URL | API, Drive Sync | PostgreSQL connection |
| STRIPE_SECRET_KEY | API | Stripe payments |
| STRIPE_WEBHOOK_SECRET | API | Webhook verification |
| GEMINI_API_KEY | Agent | Google AI |
| GOOGLE_CLIENT_ID | API | OAuth |
| GOOGLE_CLIENT_SECRET | API | OAuth |
| WHATSAPP_ACCESS_TOKEN | API | WhatsApp Cloud API |
| WHATSAPP_PHONE_NUMBER_ID | API | WhatsApp sender |
| JWT_SECRET | API | Session tokens |
| NEXT_PUBLIC_GA4_ID | Frontend | Google Analytics |
| NEXT_PUBLIC_GTM_ID | Frontend | Google Tag Manager |

### 12.3 Key Principles (14 Dieu)

1. AI may recommend, but only Booking Truth Engine can confirm
2. Every paid booking must generate an auditable revenue event
3. Every learning session must create a next-step CTA
4. Every campaign must use UTM links and track outcomes
5. Every service must run as a versioned container
6. Google-first: use Google Cloud wherever possible
7. Australian Privacy Act compliance (APP 1-13)
8. WCAG 2.2 AA accessibility target
9. GST-inclusive pricing (10%)
10. **NO auto-spend without manual approval**
11. **Dual-control principle** — cannot approve own request
12. **Spending limits enforced** — per-role, per-category caps
13. **Audit trail immutable** — every action logged
14. **Reconciliation required** — all spending reconciled

---

*Document owner: BookedAI Engineering & Compliance*
*Last updated: 2026-05-06*
*Next review: Weekly standup*
*Tong so: 12 phan, 53 pages, 50+ API endpoints, 8 migrations, 18 modules, 14 nguyen tac*
