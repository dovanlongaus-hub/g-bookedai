# BookedAI R&D Analysis Report
**Date:** 6 May 2026 | **Author:** CTO Office | **Classification:** Internal Strategy

---

## Table of Contents
1. [Competitor Technical Analysis](#1-competitor-technical-analysis)
2. [AI/ML Feature Roadmap](#2-aiml-feature-roadmap)
3. [Technical Architecture Recommendations](#3-technical-architecture-recommendations)
4. [Integration Priorities (Australian Market)](#4-integration-priorities-australian-market)
5. [Security & Compliance Roadmap](#5-security--compliance-roadmap)
6. [Performance Targets](#6-performance-targets)

---

## 1. Competitor Technical Analysis

### 1.1 Calendly
| Aspect | Details |
|--------|---------|
| **Pricing** | Free / $10-12/mo Standard / $16-20/mo Teams / $15K+/yr Enterprise |
| **AI Features** | AI scheduling assistant (learns patterns, resolves conflicts), AI phone call booking, MCP server for conversational scheduling |
| **API** | V2 REST API (V1 retired Aug 2025), upcoming Scheduling API for embedded booking |
| **Integrations** | 100+ (Salesforce, HubSpot, Zoom, Google, Stripe) |
| **Key Features to Copy** | MCP server for AI agent integration; embedded scheduling API; AI pattern learning for availability optimization |
| **What We Have That They Don't** | Full business management (invoicing, payments, CRM); AI chat agent; multi-vertical support; Australian-first compliance |
| **Weakness** | Scheduling-only -- no payments, invoicing, or business management |

### 1.2 Acuity Scheduling (Squarespace)
| Aspect | Details |
|--------|---------|
| **Pricing** | $20/mo Starter / $34/mo Standard / $61/mo Premium (annual -20%) |
| **Features** | Unlimited appointments, Stripe/Square/PayPal payments, SMS reminders, group sessions, packages/memberships, intake forms |
| **HIPAA** | Premium only ($61/mo) |
| **Key Features to Copy** | HIPAA compliance tier; packages and memberships; group session booking |
| **What We Have That They Don't** | AI chat agent; integrated CRM; multi-channel communication; dynamic pricing |
| **Weakness** | No AI features; limited to Squarespace ecosystem; no marketplace discovery |

### 1.3 Square Appointments
| Aspect | Details |
|--------|---------|
| **Pricing** | Free (solo) / $49/mo Plus / $149/mo Premium per location + 2.6-3.5% processing |
| **POS Integration** | Native POS hardware, accepts cards, digital wallets, QR codes, payment links |
| **Features** | Google Calendar sync, resource management, waitlists, cancellation fees, prepayments |
| **Key Features to Copy** | Integrated POS hardware support; waitlist auto-fill on cancellation; resource/room assignment per service |
| **What We Have That They Don't** | AI-powered booking; conversational agent; multi-tenant SaaS model |
| **Weakness** | Locked into Square payment ecosystem; per-location pricing punishes multi-site businesses |

### 1.4 Fresha
| Aspect | Details |
|--------|---------|
| **Pricing** | Eliminated free tier (2025); 2.9% + $0.30 per transaction |
| **Marketplace** | 20% commission on first booking from new marketplace clients (min $6); repeat visits free |
| **Key Features to Copy** | Marketplace discovery model (client acquisition channel); one-time commission rather than recurring; integrated payment processing |
| **What We Have That They Don't** | AI chat/voice agents; multi-vertical support (not beauty-only); no per-transaction commission on existing clients |
| **Weakness** | Beauty/wellness only; hidden fee structure surprises merchants; limited automation |

### 1.5 Timely
| Aspect | Details |
|--------|---------|
| **Pricing** | ~$20-50/mo per operator; no hidden costs; flexible scaling |
| **AU Presence** | 55,000+ hair/beauty professionals globally; strong ANZ market presence |
| **Features** | Color-coded scheduling, smart rebooking prompts, automated reminders, loyalty programs, branded booking pages |
| **Key Features to Copy** | Smart rebooking prompts; integrated loyalty program; brand customization depth |
| **What We Have That They Don't** | AI agents; multi-vertical (not beauty-only); integrated payments/invoicing |
| **Weakness** | Beauty-vertical only; pricing scales poorly with team size |

### 1.6 HoneyBook
| Aspect | Details |
|--------|---------|
| **Pricing** | $29-36/mo Starter / $49-59/mo Essentials / $109-129/mo Premium + 2.9% + $0.25 processing |
| **Client Management** | Unlimited clients/projects, proposals, contracts, invoicing, recurring payments, autopay |
| **AI Features** | Email drafts, project summaries, business trend analysis, meeting notes |
| **Key Features to Copy** | Smart file/contract management; multi-project management; AI email drafting; 60-day money-back guarantee |
| **What We Have That They Don't** | AI booking agent; marketplace; real-time scheduling; multi-tenant architecture |
| **Weakness** | No real-time booking; client-service model, not booking platform |

### 1.7 Dubsado
| Aspect | Details |
|--------|---------|
| **Pricing** | $35/mo Starter / $55/mo Premier ($335-525/yr annual) + $10/mo per brand |
| **Automation** | Node-based "Flows" workflow builder; trigger-based email/invoice/form automation; multi-step client journeys |
| **Key Features to Copy** | Visual workflow builder (Flows); trigger-based automation chains; white-label multi-brand support |
| **What We Have That They Don't** | AI agents; real-time booking; marketplace; integrated payments |
| **Weakness** | Steep learning curve; Starter plan lacks scheduling entirely; no AI features |

### 1.8 Mindbody
| Aspect | Details |
|--------|---------|
| **Pricing** | $139-699/mo (most expensive in category) |
| **Vertical** | Fitness/wellness: group classes, memberships, retail POS, marketing automation |
| **Features** | AI front desk, 700+ partner integrations, open API, branded mobile app, waitlists |
| **Key Features to Copy** | AI front desk concept; branded client mobile app; group class management with waitlists |
| **What We Have That They Don't** | Affordable pricing; multi-vertical support; conversational AI agent |
| **Weakness** | Extremely expensive; frequent bugs reported; complex pricing with hidden fees |

### 1.9 Booking.com (AI Travel Agent)
| Aspect | Details |
|--------|---------|
| **AI Features** | Smart Messenger (agentic AI for partner-guest communication), Auto-Reply, AI Trip Support (24/7), AI Voice Support (phone), AI Flight Search Summaries, AI Rental Helper |
| **Technical Approach** | Layered model strategy: small travel-specific models for fast inference; large LLMs for reasoning; domain-tuned evaluations |
| **Key Features to Copy** | AI Voice Support for phone booking; Auto-Reply with custom topic definitions; layered AI model approach (small+large); multi-language voice support |
| **What We Have That They Don't** | Service business focus; direct merchant relationship; SaaS model vs marketplace commission |

### 1.10 Shopify (Platform Strategy)
| Aspect | Details |
|--------|---------|
| **Revenue Model** | Monetizes economic activity, not seats -- earns more when merchants sell more; Subscription $2.75B + Merchant Solutions $8.8B in 2025 |
| **Scale** | $88B GMV (Q2 2025); 80,000+ checkouts/minute; 200M RPM peak |
| **Platform Strategy** | Agentic Storefronts (ChatGPT, Copilot, Gemini); Shop Pay one-click checkout; headless commerce APIs; unified B2C+B2B admin |
| **Key Lessons for BookedAI** | (1) Revenue model: take a % of bookings rather than just subscription; (2) Build an ecosystem with app marketplace; (3) Agentic commerce -- let AI platforms book directly; (4) One-click rebooking like Shop Pay; (5) Headless API for custom frontends |

### Competitive Pricing Summary

| Competitor | Solo/Free | Mid-Tier | Enterprise |
|-----------|-----------|----------|------------|
| Calendly | Free | $10-20/mo | $15K/yr |
| Acuity | $20/mo | $34/mo | $61/mo |
| Square | Free | $49/mo | $149/mo |
| Fresha | 2.9%+commission | Same | Same |
| Timely | ~$20/mo | ~$35/mo | ~$50/mo |
| HoneyBook | $29/mo | $49/mo | $129/mo |
| Dubsado | $35/mo | $55/mo | +$10/brand |
| Mindbody | $139/mo | $299/mo | $699/mo |
| **BookedAI Target** | **Free** | **$19-29/mo** | **$49-99/mo** |

**Pricing Strategy Recommendation:** Undercut all competitors on subscription while adding a small transaction fee (1-2%) on bookings processed. This mirrors Shopify's model of growing with merchants. Free tier should include AI chat agent as a differentiator.

---

## 2. AI/ML Feature Roadmap

### 2.1 Conversational AI (Priority: CRITICAL -- Q3 2026)

**Current State:** Gemini 2.5 Pro/Flash integration via Google AI APIs.

**Recommended Enhancements:**
- **Function Calling with Thinking:** Gemini 2.5+ models use internal reasoning to improve function calling accuracy. Implement structured tool definitions for: `checkAvailability()`, `createBooking()`, `processPayment()`, `rescheduleAppointment()`, `cancelBooking()`
- **Built-in + Custom Tools Combination:** New capability allows mixing Google's built-in tools (Search, Code Execution) with custom function calling in a single API call
- **MCP Server:** Build a BookedAI MCP server (like Calendly did) so any AI assistant (ChatGPT, Claude, Gemini) can book through BookedAI merchants
- **1M Token Context Window:** Leverage Gemini 2.5 Pro's massive context for maintaining months of conversation history per client

**Implementation Cost:** ~2-4 weeks engineering time
**Business Impact:** HIGH -- enables AI-first booking across all channels

### 2.2 Voice AI (Priority: HIGH -- Q4 2026)

**Technology Stack:**
- **Inbound:** Google Cloud Speech-to-Text (Chirp model, 85+ languages, streaming recognition)
- **Outbound:** Google Cloud Text-to-Speech (Gemini-TTS voices, 380+ voices, 75+ languages)
- **Orchestration:** Gemini 2.5 Flash Live API for real-time voice conversations
- **Phone Integration:** Twilio Voice + Google STT/TTS pipeline

**Architecture:**
```
Phone Call (Twilio) --> STT (Chirp) --> Gemini 2.5 Flash (reasoning + function calling)
                                           |
                                    [check availability, book, reschedule]
                                           |
                                    TTS (Gemini-TTS) --> Phone Call (Twilio)
```

**Key Metric:** Gemini 2.5 Flash achieves 71.5% on ComplexFuncBench (industry-leading) and 90% instruction adherence -- reliable enough for production voice agents.

**Implementation Cost:** ~6-8 weeks engineering time
**Business Impact:** VERY HIGH -- most service businesses still receive phone bookings; AI handles after-hours calls

### 2.3 No-Show Prediction (Priority: MEDIUM -- Q1 2027)

**Research Findings:**
- ML models achieve 75-85% accuracy predicting no-shows
- Best-performing algorithms: Gradient Boosting, Random Forest, Logistic Regression
- Key predictive features: (1) previous no-show history, (2) lead time between booking and appointment, (3) day of week/time, (4) client age/demographics, (5) weather, (6) distance to venue

**Recommended Model:**
- Start with Logistic Regression (interpretable, fast, 68% of research uses it)
- Graduate to XGBoost/LightGBM as data volume grows
- Minimum viable dataset: ~5,000 appointments with outcome labels

**Actions on Prediction:**
- High risk (>70%): Send extra reminder + require deposit/prepayment
- Medium risk (40-70%): Send additional reminder 2 hours before
- Low risk (<40%): Standard reminder flow
- Overbook slots with highest predicted no-show probability

**Implementation Cost:** ~4-6 weeks (model + integration)
**Business Impact:** MEDIUM -- reduces revenue loss from no-shows (industry average 20-30% no-show rate)

### 2.4 Dynamic Pricing (Priority: MEDIUM -- Q2 2027)

**Approach for Service Businesses:**
- **Demand-based:** Higher prices for peak slots (Saturday morning), lower for off-peak (Tuesday afternoon)
- **Utilization-based:** Discount slots that are likely to go unfilled (last-minute availability)
- **Surge pricing:** Auto-increase prices when availability drops below threshold
- **Loyalty pricing:** Returning clients get preferential rates

**Technical Implementation:**
- Real-time demand signal processing (bookings per time slot over rolling 30 days)
- Price elasticity estimation per service type
- A/B testing framework for price changes
- Merchant controls: set min/max price bounds, enable/disable per service

**Implementation Cost:** ~6-8 weeks
**Business Impact:** MEDIUM-HIGH -- proven to increase revenue 10-25% in service industries

### 2.5 Smart Scheduling (Priority: HIGH -- Q3 2026)

**Features:**
- **Gap minimization:** Suggest slots that minimize dead time between appointments
- **Travel time awareness:** For mobile service providers, factor in travel between locations
- **Energy management:** Alternate high-effort and low-effort services
- **Client preference learning:** Suggest times based on client's historical booking patterns
- **Buffer optimization:** Auto-add prep/cleanup time based on service type

**Implementation Cost:** ~3-4 weeks
**Business Impact:** HIGH -- directly increases provider utilization rate

### 2.6 Sentiment Analysis (Priority: LOW -- Q2 2027)

**Application:**
- Analyze chat/message tone during booking interactions
- Post-appointment review sentiment scoring
- Churn risk prediction based on declining sentiment trends
- Auto-flag negative interactions for business owner attention

**Technical Approach:** Use Gemini's built-in sentiment capabilities rather than building custom models.

**Implementation Cost:** ~2-3 weeks
**Business Impact:** LOW-MEDIUM -- valuable for retention but not revenue-critical initially

### 2.7 Automated Follow-ups (Priority: HIGH -- Q3 2026)

**Features:**
- AI-generated personalized rebooking reminders ("Your last haircut was 6 weeks ago...")
- Win-back campaigns for lapsed clients (auto-detect 2x missed booking cycle)
- Post-appointment review requests (optimal send time: 2 hours post-service)
- Birthday/anniversary offers
- Smart timing: ML-optimized send times per client

**Implementation Cost:** ~3-4 weeks
**Business Impact:** HIGH -- directly drives repeat bookings (primary revenue driver for service businesses)

### 2.8 Document AI (Priority: LOW -- Q3 2027)

**Use Cases:**
- Invoice scanning and auto-reconciliation
- Receipt processing for expense tracking
- ID verification for regulated services (NDIS, healthcare)
- Insurance document processing

**Technical Approach:** Google Document AI or Gemini 2.5 Pro multimodal (can process images/PDFs directly).

**Implementation Cost:** ~4-6 weeks
**Business Impact:** LOW -- nice-to-have for accounting integration

### 2.9 Video AI (Priority: LOW -- 2028)

**Use Cases:**
- Virtual consultation session recording
- AI-generated session summaries/highlights
- Training content creation from recorded sessions

**Defer** this feature until core platform is mature and video consultations are a proven use case.

### AI Feature Priority Matrix

| Feature | Priority | Timeline | Effort | Revenue Impact |
|---------|----------|----------|--------|----------------|
| Conversational AI (enhanced) | CRITICAL | Q3 2026 | 2-4 wks | Very High |
| Smart Scheduling | HIGH | Q3 2026 | 3-4 wks | High |
| Automated Follow-ups | HIGH | Q3 2026 | 3-4 wks | High |
| Voice AI | HIGH | Q4 2026 | 6-8 wks | Very High |
| No-Show Prediction | MEDIUM | Q1 2027 | 4-6 wks | Medium |
| Dynamic Pricing | MEDIUM | Q2 2027 | 6-8 wks | Medium-High |
| Sentiment Analysis | LOW | Q2 2027 | 2-3 wks | Low-Medium |
| Document AI | LOW | Q3 2027 | 4-6 wks | Low |
| Video AI | LOW | 2028 | 8-12 wks | Low |

---

## 3. Technical Architecture Recommendations

### 3.1 Current Architecture Assessment

**Current Stack:**
- Frontend: Next.js 15 (multiple apps on ports 3000-3004)
- Backend: Express 5 (API on port 8090, Agent on port 8091)
- Database: PostgreSQL via Docker (single instance, localhost:5432)
- Deployment: Single GCE VM (34.40.164.84), PM2 process manager
- Proxy: Nginx (port 80), Cloudflare SSL Flexible
- Region: australia-southeast1 (Sydney)

**Verdict:** This architecture is appropriate for the current stage (pre-scale, <1,000 merchants). Do NOT prematurely migrate to Kubernetes or microservices.

### 3.2 Scaling Roadmap

#### Phase 1: Current Stage (0-1,000 merchants) -- NOW
- **Keep:** Single VM + PM2 + Nginx + PostgreSQL Docker
- **Add:**
  - Redis for session management and caching (Docker container on same VM)
  - Automated daily PostgreSQL backups to Google Cloud Storage
  - Health check monitoring (UptimeRobot or Google Cloud Monitoring)
  - Structured logging (Winston/Pino) with Google Cloud Logging
- **Cost:** ~$50-100/mo additional

#### Phase 2: Growth Stage (1,000-10,000 merchants) -- Target Q1-Q2 2027
- **Migrate to:**
  - Cloud SQL for PostgreSQL (managed, automated backups, read replica)
  - Memorystore for Redis (managed Redis)
  - Cloud Run for API services (auto-scaling, pay-per-request)
  - Keep Next.js on GCE or move to Cloud Run
- **Add:**
  - Read replica for PostgreSQL (reporting/analytics queries)
  - Cloud CDN for static assets
  - Cloud Tasks for background job processing (emails, notifications)
  - Pub/Sub for event-driven architecture
- **Cost:** ~$300-800/mo

#### Phase 3: Scale Stage (10,000-100,000 merchants) -- Target 2028
- **Migrate to:**
  - GKE (Google Kubernetes Engine) for container orchestration
  - AlloyDB or Cloud Spanner for database (horizontal scaling)
  - Dedicated Memorystore cluster
- **Add:**
  - Database sharding by tenant (region-based)
  - Multi-region deployment (Sydney + Melbourne)
  - API Gateway with rate limiting
  - Service mesh (Istio) for inter-service communication
- **Cost:** ~$2,000-5,000/mo

### 3.3 Database Scaling Strategy

**Immediate (Phase 1):**
- Enable connection pooling (PgBouncer) -- critical for PM2 multi-process
- Add indexes on all tenant_id + frequently queried columns
- Implement Row Level Security (RLS) for tenant isolation
- Daily automated backups to GCS with 30-day retention

**Growth (Phase 2):**
- Migrate to Cloud SQL for PostgreSQL (managed)
- Add 1 read replica for analytics/reporting queries
- Implement query performance monitoring (pg_stat_statements)
- Partitioning: partition bookings table by date range (monthly)

**Scale (Phase 3):**
- Consider AlloyDB (Google's PostgreSQL-compatible, 4x faster for transactions)
- Shard by region or tenant size tier
- Separate OLTP (bookings) from OLAP (analytics) databases
- Implement Change Data Capture (CDC) for real-time analytics

### 3.4 Caching Strategy

**Layer 1 -- Browser/CDN:**
- Static assets: 1-year cache with content hashing (Next.js default)
- API responses: Cache-Control headers on read endpoints
- Cloudflare CDN: cache HTML pages for public booking pages (5-minute TTL)

**Layer 2 -- Application Cache (Redis):**
- Session data: 24-hour TTL
- Service provider availability: 5-minute TTL (invalidate on booking)
- Business configuration: 15-minute TTL
- Rate limiting: sliding window counters

**Layer 3 -- Database:**
- Materialized views for dashboard analytics (refresh hourly)
- Connection pooling via PgBouncer (critical at scale)

### 3.5 Real-Time Architecture

**Recommendation: SSE (Server-Sent Events) first, WebSocket for chat only.**

Based on 2026 best practices, SSE outperforms WebSockets for 95% of real-time SaaS features:

| Use Case | Protocol | Reason |
|----------|----------|--------|
| Booking notifications | SSE | Server-to-client only; auto-reconnect |
| Calendar updates | SSE | Server pushes availability changes |
| AI chat agent | WebSocket | Bidirectional streaming required |
| Dashboard metrics | SSE | One-way data feed |
| Voice AI | WebSocket | Real-time bidirectional audio |

**Implementation:**
- SSE via Express.js `res.write()` with `text/event-stream` content type
- WebSocket via `ws` library for chat/voice only
- For multi-server (Phase 2+): Redis Pub/Sub to distribute events across Cloud Run instances
- Google Cloud Pub/Sub for durable event processing (payment webhooks, booking confirmations)

### 3.6 Multi-Tenant Data Isolation

**Recommended Approach:** Shared database + tenant_id column + PostgreSQL RLS

```sql
-- Enable RLS on all tenant tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY tenant_isolation ON bookings
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Set tenant context per request (in Express middleware)
-- SET app.current_tenant = '<tenant-uuid>';
```

**Critical Notes:**
- Use session-mode connection pooling (not transaction mode) with RLS
- Validate tenant claims server-side from JWT -- never trust client headers
- Enterprise customers: offer dedicated schema or database as premium feature
- Audit logging: log all cross-tenant access attempts

### 3.7 API Versioning Strategy

**Recommendation:** URL path versioning (`/api/v1/bookings`)

- Current API becomes v1 (freeze on breaking changes)
- New features go in v1 until first breaking change necessitates v2
- Support N-1 versions (deprecate with 6-month notice)
- Version in URL path (not headers) for simplicity and cacheability
- OpenAPI/Swagger documentation auto-generated per version

### 3.8 Monolith vs Microservices

**Verdict: Stay monolithic until Phase 3.**

At <10,000 merchants, a well-structured monolith (modular monolith) is:
- Faster to develop and debug
- Cheaper to operate (single deployment)
- Easier to maintain with a small team

**Modular Monolith Structure:**
```
/src
  /modules
    /booking      -- scheduling, availability, calendar
    /payment      -- Stripe, invoicing, reconciliation
    /auth         -- authentication, authorization, tenants
    /ai           -- chat agent, voice, ML features
    /notification -- email, SMS, push
    /integration  -- Xero, Google, Twilio
    /analytics    -- reporting, dashboards
  /shared
    /middleware
    /utils
    /types
```

Extract to microservices only when: (a) a module needs independent scaling (e.g., AI agent), or (b) team grows beyond 8-10 engineers and needs independent deployment.

---

## 4. Integration Priorities (Australian Market)

### Ranked by Business Value for AU Market

| Rank | Integration | Priority | Justification |
|------|-------------|----------|---------------|
| 1 | **Stripe** | CRITICAL | Already likely integrated; payment processing backbone; supports AU cards, BECS Direct Debit, Apple/Google Pay |
| 2 | **Xero** | CRITICAL | 60% AU market share for accounting; AU businesses expect it; auto-sync invoices and payments |
| 3 | **Google Workspace** | CRITICAL | Calendar sync prevents double-bookings; Meet for virtual consultations; Gmail for notifications |
| 4 | **Twilio (SMS)** | HIGH | SMS reminders reduce no-shows 30-50%; AU businesses rely on SMS; MMS for appointment prep |
| 5 | **Afterpay/Zip** | HIGH | AU BNPL market growing 17.5% to $18.34B in 2026; "must-have" for service businesses; increases booking conversion |
| 6 | **WhatsApp Business** | HIGH | Growing channel in AU; supports rich media, location sharing, quick replies; WhatsApp Business API via Twilio |
| 7 | **SendGrid/Mailgun** | HIGH | Transactional email (confirmations, receipts); marketing campaigns (follow-ups); SendGrid has better AU deliverability |
| 8 | **MYOB** | MEDIUM | 20-25% AU market share; important for trades and inventory businesses; less critical than Xero but needed for enterprise |
| 9 | **Microsoft 365** | MEDIUM | Important for corporate/enterprise clients; Outlook calendar sync; Teams for video; lower priority than Google for SMBs |
| 10 | **Zoom** | MEDIUM | Virtual consultations; well-known brand; less critical if Google Meet is integrated |
| 11 | **Facebook Messenger** | MEDIUM | Customer acquisition channel; automated booking via Messenger; Meta Business Suite integration |
| 12 | **Instagram DM** | MEDIUM | Especially important for beauty/wellness; booking via DM; portfolio showcase |
| 13 | **Zapier/Make** | MEDIUM | Enables long-tail integrations without custom development; reduces integration requests; Make is cheaper |
| 14 | **PayPal** | LOW | Less popular in AU for service businesses; Stripe covers most needs; add later for international clients |
| 15 | **HubSpot CRM** | LOW | For larger businesses; most BookedAI target market uses built-in CRM; add when enterprise tier launches |
| 16 | **Salesforce CRM** | LOW | Enterprise only; high implementation cost; defer until enterprise tier is mature |

### Integration Implementation Timeline

**Q3 2026:** Stripe (enhance), Google Workspace (Calendar + Meet), Twilio SMS, SendGrid
**Q4 2026:** Xero, Afterpay/Zip, WhatsApp Business
**Q1 2027:** MYOB, Facebook Messenger, Instagram DM, Zapier/Make
**Q2 2027:** Microsoft 365, Zoom, PayPal
**2028:** HubSpot, Salesforce

---

## 5. Security & Compliance Roadmap

### 5.1 SOC 2 Type II

| Aspect | Details |
|--------|---------|
| **Timeline** | 12-18 months total (Type 1 by month 6, Type 2 observation period 6-12 months) |
| **Cost (Year 1)** | $20,000-35,000 all-in (audit $15-25K + tools + pen testing $5-15K) |
| **Cost (Year 2+)** | 30-50% reduction (~$12-20K) |
| **When to Start** | When targeting enterprise clients or when revenue exceeds $500K ARR |
| **Recommended Tool** | Vanta or Drata for automated compliance monitoring (~$5-10K/yr) |
| **Priority** | MEDIUM -- start preparation Q1 2027, achieve certification by Q4 2027 |

### 5.2 ISO 27001

| Aspect | Details |
|--------|---------|
| **Relevance** | Important for AU enterprise and government clients |
| **Timeline** | 6-12 months for initial certification |
| **Cost** | $15,000-50,000 depending on scope |
| **Priority** | LOW -- defer until government/enterprise contracts require it (likely 2028) |

### 5.3 Australian Government IRAP Assessment

| Aspect | Details |
|--------|---------|
| **Relevance** | Required if selling to AU federal, state, or local government |
| **Levels** | Official, Protected (most common requirement) |
| **Process** | Assessment by ASD-endorsed IRAP assessor against Information Security Manual (ISM) |
| **Cost** | $30,000-100,000+ depending on scope |
| **Prerequisite** | Must be hosted on IRAP-assessed infrastructure (Google Cloud Sydney is IRAP-assessed) |
| **Priority** | LOW -- only pursue if government contracts are in pipeline (2028+) |

### 5.4 PCI DSS Compliance

| Aspect | Details |
|--------|---------|
| **Current State** | Likely compliant via Stripe (they handle card data) |
| **Action Required** | Complete SAQ-A (Self-Assessment Questionnaire A) -- applicable when you never touch card data |
| **Cost** | Minimal (time only, ~2-4 hours to complete SAQ-A) |
| **Priority** | HIGH -- complete immediately; document compliance |

### 5.5 Data Sovereignty (Australian Data Residency)

| Aspect | Details |
|--------|---------|
| **Current State** | GCE VM in australia-southeast1 (Sydney) -- COMPLIANT |
| **Database** | PostgreSQL on same VM -- data stays in AU |
| **Cloudflare** | Edge caching is global but origin is AU -- acceptable |
| **Risks** | Third-party services (Stripe, SendGrid, Twilio) may process data offshore |
| **Action** | Document data flows; ensure Stripe AU entity is used; add privacy policy noting AU data residency |
| **Priority** | HIGH -- competitive advantage; document and market this |

### 5.6 Backup and Disaster Recovery Plan

**Immediate Actions (Phase 1):**

| Component | Strategy | RPO | RTO |
|-----------|----------|-----|-----|
| PostgreSQL | Daily automated backup to GCS (pg_dump) + WAL archiving for point-in-time recovery | 1 hour | 4 hours |
| Application Code | Git repository (GitHub) | 0 | 1 hour |
| Configuration | Documented in repo; environment variables in Secret Manager | 0 | 1 hour |
| VM Snapshot | Weekly GCE disk snapshot | 1 week | 2 hours |

**Growth Stage (Phase 2):**

| Component | Strategy | RPO | RTO |
|-----------|----------|-----|-----|
| Cloud SQL | Automated backups + point-in-time recovery + cross-region replica | 5 minutes | 30 minutes |
| Cloud Run | Stateless; auto-redeploy from container registry | 0 | 5 minutes |
| DNS Failover | Cloudflare health checks + automatic failover | N/A | 2 minutes |

**DR Testing:** Quarterly restore drill (restore backup to test environment, verify data integrity).

### Compliance Priority Matrix

| Compliance | Priority | Timeline | Cost | Trigger |
|-----------|----------|----------|------|---------|
| PCI DSS (SAQ-A) | CRITICAL | Now | Free | Already processing payments |
| Data Sovereignty Docs | HIGH | Q3 2026 | $0 | Competitive advantage |
| Backup & DR Plan | HIGH | Q3 2026 | ~$20/mo | Business continuity |
| SOC 2 Type II | MEDIUM | Q1-Q4 2027 | $20-35K | Enterprise sales |
| ISO 27001 | LOW | 2028 | $15-50K | Government/enterprise |
| IRAP | LOW | 2028+ | $30-100K | Government contracts |

---

## 6. Performance Targets

### 6.1 Core Web Vitals (Frontend)

| Metric | Target | "Good" Threshold | Current Priority |
|--------|--------|-------------------|-----------------|
| **LCP** (Largest Contentful Paint) | < 1.5s | < 2.5s | HIGH |
| **INP** (Interaction to Next Paint) | < 100ms | < 200ms | HIGH |
| **CLS** (Cumulative Layout Shift) | < 0.05 | < 0.1 | MEDIUM |
| **TTFB** (Time to First Byte) | < 200ms | < 800ms | HIGH |
| **FCP** (First Contentful Paint) | < 1.0s | < 1.8s | MEDIUM |

**Actions to Achieve:**
- Enable Next.js static generation for public booking pages
- Implement image optimization (next/image with WebP/AVIF)
- Code split aggressively (dynamic imports for below-fold content)
- Preconnect to API domain, Cloudflare CDN for static assets
- Server-side render critical booking data

### 6.2 API Response Time Targets

| Endpoint Category | P50 Target | P95 Target | P99 Target |
|-------------------|------------|------------|------------|
| Authentication | < 100ms | < 200ms | < 500ms |
| Read operations (GET) | < 50ms | < 150ms | < 300ms |
| Availability check | < 100ms | < 200ms | < 400ms |
| Create booking | < 200ms | < 500ms | < 1,000ms |
| Payment processing | < 500ms | < 1,500ms | < 3,000ms |
| AI chat response (first token) | < 500ms | < 1,000ms | < 2,000ms |
| AI chat response (complete) | < 2,000ms | < 5,000ms | < 10,000ms |
| Report generation | < 1,000ms | < 3,000ms | < 5,000ms |

### 6.3 Uptime SLA Commitment

| Tier | SLA | Monthly Downtime Budget |
|------|-----|------------------------|
| Free | 99.5% | ~3.6 hours |
| Professional | 99.9% | ~43 minutes |
| Enterprise | 99.95% | ~22 minutes |

**Monitoring Stack:**
- External: UptimeRobot or BetterStack (HTTP checks every 60s)
- Internal: Google Cloud Monitoring (custom metrics)
- Status page: Public status page (Instatus or BetterStack)
- Alerting: PagerDuty or OpsGenie for on-call rotation (when team grows)

### 6.4 Error Rate Targets

| Metric | Target | Alert Threshold |
|--------|--------|----------------|
| HTTP 5xx rate | < 0.1% | > 0.5% |
| HTTP 4xx rate | < 5% | > 10% |
| Booking failure rate | < 0.5% | > 1% |
| Payment failure rate | < 2% | > 5% |
| AI agent error rate | < 1% | > 3% |
| Unhandled exceptions | 0 | Any |

### 6.5 Throughput Targets

| Stage | Bookings/Minute | Concurrent Users | API Requests/Second |
|-------|----------------|-------------------|---------------------|
| Phase 1 (Current) | 10 | 100 | 50 |
| Phase 2 (Growth) | 100 | 1,000 | 500 |
| Phase 3 (Scale) | 1,000 | 10,000 | 5,000 |

### 6.6 Performance Monitoring Implementation

**Immediate (free/low-cost):**
- Google Lighthouse CI in deployment pipeline
- Express.js response time logging (middleware)
- PostgreSQL slow query log (> 100ms)
- PM2 monitoring dashboard

**Growth Stage:**
- Application Performance Monitoring (APM): Google Cloud Trace or Sentry Performance
- Real User Monitoring (RUM): Vercel Analytics or Web Vitals reporting
- Database monitoring: pg_stat_statements + Cloud SQL Insights
- Custom dashboards: Grafana + Cloud Monitoring

---

## Executive Summary: Top 10 Priorities

| # | Action | Timeline | Investment | Expected Impact |
|---|--------|----------|------------|-----------------|
| 1 | Enhanced Conversational AI (function calling, MCP server) | Q3 2026 | 2-4 weeks dev | Differentiation from all competitors |
| 2 | Xero + Google Workspace integration | Q3-Q4 2026 | 4-6 weeks dev | Unlocks AU enterprise market |
| 3 | SMS reminders via Twilio | Q3 2026 | 1-2 weeks dev | 30-50% no-show reduction |
| 4 | Automated follow-ups + smart rebooking | Q3 2026 | 3-4 weeks dev | Drives repeat revenue |
| 5 | Backup & DR plan implementation | Q3 2026 | 1 week dev + $20/mo | Business continuity |
| 6 | Afterpay/Zip BNPL integration | Q4 2026 | 2-3 weeks dev | Higher conversion, larger bookings |
| 7 | Voice AI phone booking | Q4 2026 | 6-8 weeks dev | After-hours revenue capture |
| 8 | Redis caching layer | Q3 2026 | 1 week dev | 2-5x API performance improvement |
| 9 | PCI DSS SAQ-A completion + data sovereignty docs | Now | 4 hours | Compliance checkbox for sales |
| 10 | Performance monitoring + Core Web Vitals | Q3 2026 | 1-2 weeks dev | SEO + user experience |

---

## Sources

- [Calendly Pricing 2026 Plans & Features](https://cal.com/blog/calendly-pricing)
- [Calendly AI Features 2025](https://www.theboutiquecoo.com/blog/5-powerful-ai-powered-calendly-features-to-leverage-in-2025)
- [Calendly Developer Portal](https://developer.calendly.com/)
- [Calendly Enterprise Pricing Guide 2026](https://www.default.com/post/calendly-enterprise-pricing)
- [Acuity Scheduling Pricing Plans](https://acuityscheduling.com/signup.php)
- [Acuity Scheduling Pricing 2026](https://talkspresso.com/blog/acuity-scheduling-pricing-2026)
- [Square Appointments Pricing & Plans](https://squareup.com/us/en/appointments/pricing)
- [Square Appointments Review 2026](https://www.salonbookingsystem.com/blog/case-study/square-appointments-review/)
- [Fresha Pricing](https://www.fresha.com/pricing)
- [Fresha Marketplace Fees](https://www.fresha.com/help-center/knowledge-base/billing-and-fees/188-marketplace-new-client-fees)
- [Fresha Pricing vs Pabau 2026](https://pabau.com/blog/fresha-pricing/)
- [Timely Reviews - Capterra Australia 2026](https://www.capterra.com.au/software/142756/timely)
- [HoneyBook Pricing Plans](https://www.honeybook.com/pricing)
- [HoneyBook Pricing 2026 After 89% Hike](https://www.agencyhandy.com/honeybook-pricing/)
- [Dubsado Pricing 2026](https://assembly.com/blog/dubsado-pricing)
- [Dubsado 3.0 Flows](https://www.dubsado.com/three-point-o)
- [Mindbody Business Pricing](https://www.mindbodyonline.com/business/pricing)
- [Mindbody Review 2026](https://schedulingkit.com/reviews/mindbody-review)
- [Booking.com Agentic AI Innovations](https://news.booking.com/bookingcom-debuts-agentic-ai-innovations-adding-to-its-robust-suite-of-genai-tools-for-customers/)
- [Booking.com AI Trip Planner Strategy](https://tripian.com/what-is-booking-coms-ai-trip-planner-strategy/)
- [Booking.com Agent Strategy at Scale](https://venturebeat.com/ai/booking-coms-agent-strategy-disciplined-modular-and-already-delivering-2)
- [Shopify Marketing Strategy 2025](https://www.blankboard.studio/originals/blog/shopify-strategy-2025)
- [Shopify Agentic Commerce Platform](https://www.shopify.com/news/ai-commerce-at-scale)
- [Shopify BFCM Readiness 2025](https://shopify.engineering/bfcm-readiness-2025)
- [Gemini Function Calling Docs](https://ai.google.dev/gemini-api/docs/function-calling)
- [Gemini 2.5 Flash Native Audio Guide](https://curateclick.com/blog/2025-gemini-25-flash-native-audio)
- [Google Cloud Speech-to-Text](https://cloud.google.com/speech-to-text)
- [Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech)
- [ML Model Predicts No-Shows - Annals of Family Medicine](https://www.annfammed.org/page/press-release/machine-learning-model-predicts-no-shows-and-cancellations)
- [No-Show Prediction Review - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2666521225000328)
- [Dynamic Pricing Software 2026](https://schematichq.com/blog/best-dynamic-pricing-software)
- [Multi-tenant RLS - AWS](https://aws.amazon.com/blogs/database/multi-tenant-data-isolation-with-postgresql-row-level-security/)
- [Multi-tenant SaaS Data Isolation Guide 2026](https://www.sachith.co.uk/multi%E2%80%91tenant-saas-data-isolation-scaling-strategies-practical-guide-mar-23-2026/)
- [Xero vs MYOB Australia 2026](https://www.scalesuite.com.au/resources/best-small-business-accounting-software-australia)
- [Australia BNPL Market 2026 - $18.34B](https://www.globenewswire.com/news-release/2026/02/03/3230802/0/en/Australia-Buy-Now-Pay-Later-Business-Report-2026-Market-to-Grow-by-17-5-to-Reach-18-34-Billion-this-Year-Forecast-to-2031-Featuring-Afterpay-ZipPay-PayPal-Sezzle.html)
- [Afterpay for Services AU](https://www.afterpay.com/en-AU/business/industry/services)
- [SOC 2 Cost 2026](https://www.strongdm.com/blog/how-much-does-soc-2-cost)
- [SOC 2 for Startups Guide](https://www.startupdefense.io/soc-2-costs-for-startups-complete-breakdown-and-budget-guide)
- [IRAP Compliance - AWS](https://aws.amazon.com/compliance/irap/)
- [2026 Microsoft IRAP Assessments](https://news.microsoft.com/source/asia/2026/03/26/irap-au-2026/)
- [Australia Data Sovereignty AI Plan](https://www.6clicks.com/resources/blog/australias-national-ai-plan-sovereign-ai-compliance-leaders)
- [Core Web Vitals 2026 Guide](https://www.corewebvitals.io/core-web-vitals)
- [SSE vs WebSockets 2026](https://jetbi.com/blog/streaming-architecture-2026-beyond-websockets)
- [Real-Time SaaS Architecture](https://www.twocents.software/blog/real-time-features-in-saas/)
- [Next.js Background Jobs PostgreSQL 2026](https://render.com/articles/nextjs-background-jobs-postgresql-production)
- [93% Faster Next.js in Kubernetes](https://blog.platformatic.dev/93-faster-nextjs-in-your-kubernetes)
