# BookedAI — Implementation Plan & Modular Architecture

> **Version:** 3.0 | **Date:** 2026-05-06
> **Purpose:** Chi tiết kế hoạch thực hiện, tách module, và hướng dẫn scale/upgrade
> **Revenue Plan:** Xem [REVENUE_PRIORITY_PLAN.md](./REVENUE_PRIORITY_PLAN.md) — kế hoạch ưu tiên kiếm tiền

---

## 1. Module Architecture — Tách riêng từng phần

### 1.1 Sơ đồ Module

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND MODULES                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐ ┌──────────┐ │
│  │ Platform │ │ Tenant   │ │ Booking  │ │ Meet │ │ Dashboard│ │
│  │ g.booked │ │ longcare │ │ book.    │ │ meet.│ │ app/admin│ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──┬───┘ └────┬─────┘ │
│       │            │            │           │          │        │
└───────┼────────────┼────────────┼───────────┼──────────┼────────┘
        │            │            │           │          │
        ▼            ▼            ▼           ▼          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API GATEWAY (port 8090)                       │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ Auth   │ │Booking │ │Payment │ │ Chat   │ │Dashboard│       │
│  │ Module │ │ Module │ │ Module │ │ Module │ │ Module  │       │
│  └────┬───┘ └────┬───┘ └────┬───┘ └────┬───┘ └────┬───┘       │
│       │          │          │          │          │             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │Export  │ │Referral│ │Partners│ │  Cron  │ │WhatsApp│       │
│  │ Module │ │ Module │ │ Module │ │ Module │ │ Module │       │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘       │
└─────────────────────────┬───────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  AI AGENT    │ │ NOTIFICATION │ │  DRIVE SYNC  │
│  (port 8091) │ │ (port 8082)  │ │ (port 8083)  │
│              │ │              │ │              │
│ • Orchestrator│ │ • Email      │ │ • CEO Reports│
│ • Intent     │ │ • SMS        │ │ • Docs Sync  │
│ • Tools      │ │ • Push       │ │ • Metrics    │
│ • Classifier │ │ • In-App     │ │ • NotebookLM │
└──────────────┘ └──────────────┘ └──────────────┘
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SHARED PACKAGES                               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ @bookedai/   │ │ @bookedai/   │ │ @bookedai/   │            │
│  │ shared       │ │ db           │ │ google       │            │
│  │              │ │              │ │              │            │
│  │ • Types      │ │ • Pool       │ │ • Calendar   │            │
│  │ • Constants  │ │ • Migrations │ │ • Gmail      │            │
│  │ • Analytics  │ │ • Seed       │ │ • Drive      │            │
│  │ • Enums      │ │ • Tenant Ctx │ │ • Firestore  │            │
│  └──────────────┘ └──────┬───────┘ │ • Pub/Sub    │            │
│                          │         │ • BigQuery   │            │
│                          ▼         │ • 17 services│            │
│                   ┌──────────────┐ └──────────────┘            │
│                   │ PostgreSQL 16│                              │
│                   │ 16 tables    │     ┌──────────────┐        │
│                   │ 6 migrations │     │   Redis 7    │        │
│                   └──────────────┘     └──────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Module Registry

| Module ID | Package/Service | Độc lập? | API Interface | Scale Strategy |
|-----------|----------------|----------|---------------|----------------|
| **M01** | `apps/web-g-bookedai` | ✅ | Static + /api proxy | CDN / Cloud Run |
| **M02** | `apps/web-longcare` | ✅ | Static + /api proxy | CDN / Cloud Run |
| **M03** | `apps/booking-web` | ✅ | Static + /api proxy | CDN / Cloud Run |
| **M04** | `apps/meet` | ✅ | Redirect only | CDN |
| **M05** | `apps/user-app` | ✅ | Static + /api proxy | CDN / Cloud Run |
| **M06** | `apps/admin-app` | ✅ | Static + /api proxy | CDN / Cloud Run |
| **M07** | `services/api` | ✅ | REST API | Horizontal scale |
| **M08** | `services/agent` | ✅ | REST API | Horizontal scale |
| **M09** | `services/notification` | ✅ | Internal API | Queue-based |
| **M10** | `services/drive-sync` | ✅ | Internal API | Single instance |
| **M11** | `services/payment` | ✅ | Library | Via API gateway |
| **M12** | `services/learning-agent` | ✅ | Library | Via API gateway |
| **M13** | `services/marketing-agent` | ✅ | Library | Via API gateway |
| **M14** | `services/accounting-sync` | ✅ | Library | Via API gateway |
| **M15** | `packages/shared` | Shared | NPM package | Versioned |
| **M16** | `packages/db` | Shared | NPM package | Connection pool |
| **M17** | `packages/google` | Shared | NPM package | Versioned |

---

## 2. API Interface Contracts

### 2.1 Inter-service Communication

```
Frontend Apps ──HTTP/HTTPS──▶ Nginx ──proxy──▶ API Gateway (M07)
                                                    │
                                    ┌───────────────┼───────────────┐
                                    ▼               ▼               ▼
                              AI Agent (M08)  Notification (M09) Drive Sync (M10)
                              HTTP :8091      HTTP :8082          HTTP :8083
```

**Rule:** Frontend KHÔNG gọi trực tiếp services khác. Luôn qua API Gateway hoặc nginx proxy `/api/*`.

### 2.2 API Gateway Routes Map

```
/api/                          → API Gateway (port 8090)
├── /health                    → health.ts
├── /auth/*                    → auth.ts
├── /chat                      → chat.ts → forwards to Agent (8091)
├── /services                  → services.ts
├── /booking/*                 → booking.ts (auth required)
├── /guest-booking             → guest-booking.ts (no auth)
├── /payment/*                 → payment.ts
├── /webhooks/stripe           → webhooks.ts (signature verified)
├── /whatsapp                  → whatsapp.ts (webhook)
├── /learning/*                → learning.ts (auth required)
├── /marketing/*               → marketing.ts (admin only)
├── /dashboard/*               → dashboard.ts
├── /export/*                  → export.ts
├── /referral/*                → referral.ts
├── /partners/*                → partners.ts
├── /cron/*                    → cron.ts (internal)
├── /courses/*                 → courses.ts
├── /notifications/*           → notifications.ts
└── /events/*                  → sse.ts (Server-Sent Events)
```

### 2.3 Service-to-Service Contracts

| Caller | Callee | Protocol | Endpoint | Purpose |
|--------|--------|----------|----------|---------|
| API | Agent | HTTP | POST /orchestrator/chat | AI chat |
| API | Notification | HTTP | POST /send | Email/SMS/Push |
| API | Google (pkg) | Library | calendarService.* | Calendar/Meet |
| API | Google (pkg) | Library | gmailService.* | Email |
| API | Google (pkg) | Library | pubsubService.* | Events |
| Cron | API | HTTP | POST /cron/* | Scheduled tasks |
| WhatsApp | Agent | HTTP | POST /orchestrator/chat | Auto-reply |
| Drive Sync | DB (pkg) | Library | query() | Progress data |
| Drive Sync | Google (pkg) | Library | driveService.* | Upload files |

---

## 3. Kế hoạch thực hiện chi tiết — Phase-based

### Phase 1: Foundation (DONE — Day 1)

| Task | Module | Status | Files |
|------|--------|--------|-------|
| Monorepo setup (pnpm workspaces) | All | ✅ | package.json, pnpm-workspace.yaml |
| PostgreSQL + Redis Docker | M16 | ✅ | docker-compose.yml |
| DB migrations (001-006) | M16 | ✅ | packages/db/src/migrations/ |
| Shared types + constants | M15 | ✅ | packages/shared/src/ |
| Google integrations (17 services) | M17 | ✅ | packages/google/src/services/ |
| API Gateway + Express 5 | M07 | ✅ | services/api/ |
| Auth middleware (Firebase + JWT) | M07 | ✅ | services/api/src/middleware/ |
| Booking routes (hold/confirm/cancel) | M07 | ✅ | services/api/src/routes/booking.ts |
| Payment routes (Stripe + bank) | M07 | ✅ | services/api/src/routes/payment.ts |
| AI Agent + Gemini | M08 | ✅ | services/agent/ |
| All 6 frontend apps | M01-M06 | ✅ | apps/*/ |
| Nginx + Cloudflare DNS | Infra | ✅ | /etc/nginx/sites-available/ |
| PM2 ecosystem | Infra | ✅ | ecosystem.config.cjs |

### Phase 2: Features (DONE — Day 1-2)

| Task | Module | Status | Files |
|------|--------|--------|-------|
| Intent classifier (12 intents) | M08 | ✅ | services/agent/src/agents/intent-classifier.ts |
| Tool-use system | M08 | ✅ | services/agent/src/agents/tools.ts |
| WhatsApp webhook | M07 | ✅ | services/api/src/routes/whatsapp.ts |
| Email drip sequences | M09 | ✅ | services/notification/src/templates/ |
| Cron jobs (hold expiry, reminders) | M07 | ✅ | services/api/src/routes/cron.ts |
| Guest booking (no auth) | M07 | ✅ | services/api/src/routes/guest-booking.ts |
| Dashboard real data | M07 | ✅ | services/api/src/routes/dashboard.ts |
| CSV export | M07 | ✅ | services/api/src/routes/export.ts |
| Referral tracking | M07 | ✅ | services/api/src/routes/referral.ts |
| Partner signup | M07 | ✅ | services/api/src/routes/partners.ts |
| Drive Sync (CEO reports) | M10 | ✅ | services/drive-sync/ |

### Phase 3: UX & Content (DONE — Day 2)

| Task | Module | Status | Files |
|------|--------|--------|-------|
| Booking UX redesign (auto-scroll) | M03 | ✅ | apps/booking-web/src/app/page.tsx |
| SVG illustrations (5 services) | M03 | ✅ | apps/booking-web/src/components/ |
| 2-month calendar | M03 | ✅ | apps/booking-web/src/components/availability-calendar.tsx |
| Multi-session packages (5/10) | M03 | ✅ | Same as above |
| QR booking ref + manage page | M03 | ✅ | apps/booking-web/src/app/manage/ |
| Chat widget (all pages) | M02 | ✅ | apps/web-longcare/src/components/chat-widget.tsx |
| Mobile hamburger menu | M02 | ✅ | apps/web-longcare/src/components/nav.tsx |
| Dark/Light theme toggle | M02 | ✅ | apps/web-longcare/src/components/theme-toggle.tsx |
| Search page | M02 | ✅ | apps/web-longcare/src/app/search/ |
| Blog (3 full posts) | M02 | ✅ | apps/web-longcare/src/app/blog/ |
| Courses (Track A) | M02 | ✅ | apps/web-longcare/src/app/courses/ |
| FAQ, Mentors, Testimonials | M02 | ✅ | apps/web-longcare/src/app/ |
| Terms, Privacy | M02 | ✅ | apps/web-longcare/src/app/ |
| g.bookedai.au enterprise redesign | M01 | ✅ | apps/web-g-bookedai/ |
| Partner onboarding wizard | M01 | ✅ | apps/web-g-bookedai/src/app/onboarding/ |
| API docs + guide | M01 | ✅ | apps/web-g-bookedai/src/app/docs/ |
| Admin: bookings, users, analytics | M06 | ✅ | apps/admin-app/src/app/ |

### Phase 4: Quality & Polish (DONE — Day 2)

| Task | Module | Status | Files |
|------|--------|--------|-------|
| GA4 (2 properties) + GTM | All FE | ✅ | */components/analytics.tsx |
| 12 conversion events | M02,M03,M01 | ✅ | Various page.tsx |
| SEO: Schema.org, breadcrumbs | M02 | ✅ | */components/breadcrumbs.tsx |
| OG images (dynamic) | M02 | ✅ | apps/web-longcare/src/app/api/og/ |
| PWA service worker | M02 | ✅ | apps/web-longcare/public/sw.js |
| Error boundaries (5 apps) | All FE | ✅ | */components/error-boundary.tsx |
| Loading skeletons | M02 | ✅ | */components/skeleton.tsx |
| Accessibility (aria) | M02,M03 | ✅ | Various |
| E2E tests (16 Playwright) | E2E | ✅ | e2e/tests/smoke.spec.ts |
| Unit tests (17 Vitest) | M07 | ✅ | services/api/src/schemas/*.test.ts |
| Print styles | M02 | ✅ | globals.css |
| OpenAPI 3.1 spec | Docs | ✅ | docs/openapi.yaml |

---

## 4. Kế hoạch Scale & Upgrade — ƯU TIÊN KIẾM TIỀN

> **Xem chi tiết:** [REVENUE_PRIORITY_PLAN.md](./REVENUE_PRIORITY_PLAN.md)
> **Nguyên tắc:** Kiếm tiền → Giữ tiền → Tối ưu tiền

### 4.1 SPRINT 1: Fix Revenue Blockers (Tuần 1-2) — KIẾM TIỀN

| # | Task | Module | Priority | Revenue Impact | Effort |
|---|------|--------|----------|----------------|--------|
| 1 | Fix Gemini API key (AI chat) | M08 | 🔴 CRITICAL | +10-15% conversion | 5 min |
| 2 | Google OAuth consent screen | M07 | 🔴 CRITICAL | Unblocks all auth | 1 day |
| 3 | Stripe Subscription auto-billing | M07 | 🔴 CRITICAL | 100% platform MRR | 4 hrs |
| 4 | Real Google Calendar sync | M17 | 🟡 HIGH | Prevents overbooking | 4 hrs |
| 5 | Real Gmail confirmations | M17 | 🟡 HIGH | +5% conversion, -20% no-show | 3 hrs |
| 6 | Stripe webhook E2E test | M07 | 🟡 HIGH | 100% payment automation | 2 hrs |

### 4.2 SPRINT 2: Customer Acquisition (Tuần 3-4) — ĐƯA KHÁCH VÀO

| # | Task | Module | Priority | Revenue Impact | Effort |
|---|------|--------|----------|----------------|--------|
| 7 | Google Ads campaign (A$3,300/mo) | Marketing | 🔴 CRITICAL | 20-30 leads/mo | 4 hrs |
| 8 | SEO: 10 industry/feature pages | M01 | 🟡 HIGH | Long-term A$0 CAC | 8 hrs |
| 9 | Referral program live | M07 | 🟡 HIGH | CAC A$30-80 (viral) | 4 hrs |
| 10 | Social proof (5 testimonials) | M01,M02 | 🟢 MEDIUM | +15% conversion | 2 hrs |

### 4.3 SPRINT 3: Customer Retention (Tháng 2) — GIỮ TIỀN

| # | Task | Module | Priority | Revenue Impact | Effort |
|---|------|--------|----------|----------------|--------|
| 11 | SMS reminders (Twilio) | M09 | 🔴 CRITICAL | -30-50% no-show | 6 hrs |
| 12 | Email drip onboarding (5 emails) | M09 | 🟡 HIGH | +20% activation | 4 hrs |
| 13 | Auto follow-up booking | M07 | 🟡 HIGH | +25% repeat rate | 4 hrs |
| 14 | In-app notifications + push | M09 | 🟢 MEDIUM | +10% engagement | 4 hrs |

### 4.4 SPRINT 4: Scale & Enterprise (Tháng 3) — SCALE

| # | Task | Module | Priority | Revenue Impact | Effort |
|---|------|--------|----------|----------------|--------|
| 15 | Multi-tenant billing automation | M07 | 🔴 CRITICAL | 100% MRR auto | 8 hrs |
| 16 | Xero accounting integration | M14 | 🟡 HIGH | Enterprise enabler | 16 hrs |
| 17 | White-label custom domains | Infra | 🟡 HIGH | Justifies A$199/mo | 8 hrs |
| 18 | 5% commission (Stripe Connect) | M07 | 🟡 HIGH | Passive income stream | 8 hrs |

### 4.5 SPRINT 5: Premium Features (Tháng 4-6) — TỐI ƯU

| # | Task | Module | Priority | Revenue Impact | Effort |
|---|------|--------|----------|----------------|--------|
| 19 | Afterpay/Zip BNPL | M11 | 🟡 HIGH | +15-20% checkout | 12 hrs |
| 20 | Voice AI (after-hours) | M08 | 🟡 HIGH | +A$2-5K/mo/tenant | 40 hrs |
| 21 | No-show prediction AI | M08 | 🟢 MEDIUM | +15-20% saved rev | 20 hrs |
| 22 | Dynamic pricing | M07 | 🟢 MEDIUM | +10-25% ARPA | 16 hrs |
| 23 | Mobile app (React Native) | New | 🟢 MEDIUM | +30% engagement | 80 hrs |

---

## 5. Hướng dẫn Upgrade từng Module

### 5.1 Thêm API route mới

```bash
# 1. Tạo route file
touch services/api/src/routes/new-feature.ts

# 2. Tạo schema validation
touch services/api/src/schemas/new-feature.schema.ts

# 3. Register trong index.ts
# import { newFeatureRouter } from './routes/new-feature.js';
# app.use('/new-feature', newFeatureRouter);

# 4. Tạo proxy trong frontend app
mkdir -p apps/web-longcare/src/app/api/new-feature
touch apps/web-longcare/src/app/api/new-feature/route.ts

# 5. Test
curl -X POST http://localhost:8090/new-feature -H "Content-Type: application/json" -d '{}'

# 6. Commit
git add -A && git commit -m "feat: Add new-feature API"
```

### 5.2 Thêm trang mới cho longcare.au

```bash
# 1. Tạo page
mkdir -p apps/web-longcare/src/app/new-page
touch apps/web-longcare/src/app/new-page/page.tsx

# 2. Thêm vào nav (nếu cần)
# Edit apps/web-longcare/src/components/nav.tsx

# 3. Thêm vào sitemap
# Edit apps/web-longcare/src/app/sitemap.ts

# 4. Restart
pm2 restart web-longcare
```

### 5.3 Thêm Google integration mới

```bash
# 1. Tạo service file
touch packages/google/src/services/new-service.ts

# 2. Export trong index.ts
# packages/google/src/index.ts

# 3. Dùng trong API route
# import { newService } from '@bookedai/google';
```

### 5.4 Thêm DB migration

```bash
# 1. Tạo migration file
touch packages/db/src/migrations/007_new_table.sql

# 2. Chạy migration
DATABASE_URL=postgresql://bookedai:localpass@localhost:5432/longcare pnpm db:migrate

# 3. Cập nhật types nếu cần
# packages/shared/src/types/
```

### 5.5 Thêm tenant mới

```bash
# Option 1: API
curl -X POST http://localhost:8090/partners/apply \
  -H "Content-Type: application/json" \
  -d '{"businessName":"New Business","email":"admin@new.com","plan":"growth"}'

# Option 2: Database
PGPASSWORD=localpass psql -h localhost -U bookedai -d longcare -c "
  INSERT INTO tenants (id, domain, name) VALUES (gen_random_uuid(), 'new.bookedai.au', 'New Business')
"

# Option 3: g.bookedai.au/onboarding (4-step wizard)
```

---

## 6. Dependency Map — Khi nâng cấp module nào cần test module nào

```
@bookedai/shared (M15) ← DÙNG BỞI TẤT CẢ
  │
  ├── @bookedai/db (M16) ← API, Drive Sync, Learning Agent
  │
  ├── @bookedai/google (M17) ← API, Drive Sync, Notification
  │
  ├── services/api (M07) ← TẤT CẢ FRONTEND APPS
  │     │
  │     ├── services/agent (M08) ← Chat, WhatsApp
  │     ├── services/notification (M09) ← Booking, Cron
  │     └── services/drive-sync (M10) ← Cron, CEO reports
  │
  └── apps/* (M01-M06) ← Người dùng cuối
```

**Rule khi upgrade:**
- Sửa `@bookedai/shared` → test TẤT CẢ
- Sửa `@bookedai/db` → test API + Drive Sync
- Sửa `@bookedai/google` → test API + Drive Sync + Notification
- Sửa `services/api` → test TẤT CẢ frontend apps
- Sửa `services/agent` → test Chat + WhatsApp
- Sửa `apps/booking-web` → CHỈ test booking flow
- Sửa `apps/web-longcare` → CHỈ test longcare.au pages

---

## 7. Environment & Secrets Management

### 7.1 File hierarchy

```
.env                    ← Local secrets (NEVER commit)
.env.example            ← Template (committed)
ecosystem.config.cjs    ← PM2 config, loads .env via custom parser
credentials/            ← Google SA JSON (NEVER commit, in .gitignore)
```

### 7.2 Required secrets per module

| Module | Required Env Vars |
|--------|-------------------|
| API (M07) | DATABASE_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, GEMINI_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID |
| Agent (M08) | GEMINI_API_KEY (or OPENAI_API_KEY) |
| Drive Sync (M10) | DATABASE_URL, GOOGLE_APPLICATION_CREDENTIALS, CEO_EMAIL |
| Frontend (M01-M06) | NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_GTM_ID |

### 7.3 Thêm secret mới

```bash
# 1. Thêm vào .env
echo "NEW_SECRET=value" >> .env

# 2. Thêm vào .env.example (không có value)
echo "NEW_SECRET=" >> .env.example

# 3. Thêm vào ecosystem.config.cjs
# env: { ..., NEW_SECRET: dotenv.NEW_SECRET || '' }

# 4. Thêm vào env.ts validation (nếu API cần)
# services/api/src/lib/env.ts

# 5. Restart
pm2 delete api && pm2 start ecosystem.config.cjs --only api
```

---

## 8. Testing Strategy

### 8.1 Test Pyramid

```
         ╱╲
        ╱  ╲
       ╱ E2E╲        16 Playwright tests (smoke)
      ╱──────╲
     ╱ Integ  ╲      API endpoint tests (planned)
    ╱──────────╲
   ╱   Unit     ╲    17 Vitest tests (schemas)
  ╱──────────────╲
```

### 8.2 Chạy tests

```bash
# Unit tests
pnpm --filter @bookedai/api test

# E2E tests (cần apps đang chạy)
cd e2e && npx playwright test

# Smoke test manual
curl -s http://localhost:8090/health
curl -s http://localhost:8090/services
curl -s -X POST http://localhost:8090/chat -H "Content-Type: application/json" -d '{"message":"hello"}'
```

### 8.3 Thêm test mới

```bash
# Unit test cho schema mới
touch services/api/src/schemas/new.schema.test.ts

# E2E test cho page mới
# Edit e2e/tests/smoke.spec.ts
```

---

## 9. Deployment Checklist — Mỗi lần deploy

```
□ git status (no uncommitted changes)
□ pnpm --filter @bookedai/api test (17 pass)
□ pnpm --filter @bookedai/api lint (no errors)
□ git commit + push
□ pm2 restart <affected-services>
□ pm2 save
□ Smoke test: curl https://longcare.au
□ Smoke test: curl https://g.longcare.au
□ Check PM2: pm2 status (all online)
```

---

## 10. Monitoring & Alerting

### 10.1 Health checks

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

### 10.2 Logs

```bash
# API logs
pm2 logs api --lines 50

# Agent logs (intent classification)
pm2 logs agent --lines 20

# All logs
pm2 logs --lines 100
```

### 10.3 Database

```bash
PGPASSWORD=localpass psql -h localhost -U bookedai -d longcare -c "
  SELECT 'Bookings' as entity, count(*) FROM bookings
  UNION ALL SELECT 'Users', count(*) FROM users
  UNION ALL SELECT 'Tenants', count(*) FROM tenants
"
```

---

*Document owner: bookedai.au Engineering*
*Last updated: 2026-05-06*
