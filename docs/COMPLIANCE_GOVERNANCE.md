# BookedAI — Compliance, Governance & Financial Controls

> **Version:** 1.0 | **Date:** 2026-05-06
> **Applicable Standards:** Australian Privacy Act 1988, ACL, GST Act, AML/CTF, WCAG 2.2 AA, OWASP Top 10
> **Scope:** All BookedAI platform operations, tenant data, and financial transactions

---

## 1. Financial Controls & Spending Approval

### 1.1 Core Principle: No Auto-Spend Without Approval

**Rule:** Mọi hoạt động chi tiền tự động PHẢI có nút nhấn Approve bằng tay trên giao diện trước khi thực hiện.

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐
│ System/User │     │   Approval   │     │   Admin     │     │ Execute  │
│ Requests    │────▶│   Queue      │────▶│  Reviews    │────▶│ Action   │
│ Spending    │     │  (Database)  │     │  + Approves │     │ + Ledger │
└─────────────┘     └──────────────┘     └─────────────┘     └──────────┘
                           │                    │
                           ▼                    ▼
                    ┌──────────────┐     ┌─────────────┐
                    │ Audit Trail  │     │ Reason Log  │
                    │ (Immutable)  │     │ (Required)  │
                    └──────────────┘     └─────────────┘
```

### 1.2 Spending Categories

| Category | Description | Examples |
|----------|-------------|----------|
| `refund` | Customer refund | Stripe refund, bank reversal |
| `payout` | Money out to third party | Vendor payment, commission payout |
| `ad_spend` | Advertising budget | Google Ads, Facebook Ads, LinkedIn |
| `sms_cost` | Communication costs | Twilio SMS, push notifications |
| `marketing_budget` | Marketing expenses | Content creation, influencer, PR |
| `vendor_payment` | Supplier/vendor invoices | Software licenses, hosting, tools |
| `subscription_charge` | Platform subscription billing | Tenant billing, service fees |

### 1.3 Spending Limits

| Role | Category | Max Single | Max Daily | Max Monthly | Dual Approval | Auto-approve Under |
|------|----------|-----------|-----------|-------------|---------------|-------------------|
| admin | refund | $500 | $2,000 | $10,000 | No | $0 |
| admin | payout | $1,000 | $5,000 | $20,000 | **YES** | $0 |
| admin | ad_spend | $500 | $2,000 | $5,000 | No | $0 |
| admin | sms_cost | $100 | $500 | $2,000 | No | $50 |
| admin | marketing_budget | $1,000 | $3,000 | $10,000 | No | $0 |
| admin | vendor_payment | $2,000 | $5,000 | $20,000 | **YES** | $0 |
| superadmin | refund | $2,000 | $10,000 | $50,000 | No | $100 |
| superadmin | payout | $5,000 | $20,000 | $100,000 | No | $0 |
| superadmin | ad_spend | $2,000 | $10,000 | $30,000 | No | $100 |
| superadmin | vendor_payment | $10,000 | $20,000 | $100,000 | No | $0 |

### 1.4 Dual-Control Principle

```
RULE: Không ai được tự approve request của chính mình.

Admin A tạo request  →  Admin B approve/reject
Admin B tạo request  →  Admin A approve/reject
Superadmin có thể override dual-approval categories
```

### 1.5 Approval Workflow

```
Status Flow:
PENDING_APPROVAL → APPROVED   (admin nhấn Approve + lý do)
PENDING_APPROVAL → REJECTED   (admin nhấn Reject + lý do BẮT BUỘC)
PENDING_APPROVAL → EXPIRED    (auto sau 72 giờ không ai xử lý)
PENDING_APPROVAL → CANCELLED  (người tạo hủy trước khi approve)
```

**Mandatory fields cho mọi spending request:**
1. **Category** — Loại chi tiêu
2. **Action** — Mô tả hành động cụ thể
3. **Amount** — Số tiền chính xác (AUD)
4. **Reason** — Lý do/justification (BẮT BUỘC)
5. **Reference** — Liên kết đến booking/payment/campaign liên quan

**Mandatory fields cho rejection:**
1. **Note** — Lý do từ chối (BẮT BUỘC, không thể reject mà không có lý do)

### 1.6 Spending Ledger & Reconciliation

Mọi chi tiêu đã approve PHẢI được ghi vào `spending_ledger`:

| Field | Purpose |
|-------|---------|
| `amount_cents` | Tổng chi (bao gồm GST) |
| `gst_cents` | Thành phần GST (1/11 tổng) |
| `net_cents` | Chi phí ròng (excl GST) |
| `stripe_charge_id` | Stripe reference (nếu có) |
| `xero_invoice_id` | Xero invoice (khi đã sync) |
| `reconciled` | Đã đối chiếu chưa (true/false) |
| `reconciled_by` | Ai đối chiếu |
| `reconciled_at` | Thời gian đối chiếu |

**Rule:** Mọi entry chưa reconciled sẽ hiển thị trong Approval Center → cần đối chiếu.

---

## 2. Australian Privacy Act 1988 Compliance

### 2.1 Australian Privacy Principles (APP) Checklist

| # | Principle | Implementation | Status |
|---|-----------|---------------|--------|
| APP 1 | Open and transparent management | Privacy policy published, data practices documented | Done |
| APP 2 | Anonymity and pseudonymity | Guest booking available without login | Done |
| APP 3 | Collection of solicited personal info | Only collect what's needed: email, name, phone | Done |
| APP 4 | Unsolicited personal info | Not applicable (no unsolicited collection) | N/A |
| APP 5 | Notification of collection | Privacy notice on signup, booking, payment forms | Done |
| APP 6 | Use or disclosure | Data used only for stated purposes | Done |
| APP 7 | Direct marketing | Opt-in only, unsubscribe in every email | Done |
| APP 8 | Cross-border disclosure | Data stays in AU (Sydney region) | Done |
| APP 9 | Adoption of government identifiers | No government IDs stored | Done |
| APP 10 | Quality of personal info | Users can update profile | Done |
| APP 11 | Security of personal info | Encryption, access controls, audit logs | Done |
| APP 12 | Access to personal info | Export CSV from dashboard | Done |
| APP 13 | Correction of personal info | Users can edit profile, admin can update | Done |

### 2.2 Data Retention Policy

| Data Type | Retention | Reason |
|-----------|----------|--------|
| Active bookings | Indefinite | Operational |
| Completed bookings | 7 years | Tax/audit requirement |
| Payment records | 7 years | GST/BAS compliance |
| Audit logs | 7 years | Financial audit trail |
| User accounts (inactive) | 2 years | Then anonymize |
| Chat transcripts | 1 year | Then delete |
| Marketing consent | Until withdrawn | APP 7 |
| Spending approvals | 7 years | Financial governance |

### 2.3 Data Breach Response Plan

```
1. DETECT    → System monitoring, error alerts
2. CONTAIN   → Isolate affected systems (< 1 hour)
3. ASSESS    → Determine scope and risk level
4. NOTIFY    → OAIC within 30 days (if eligible breach)
                Affected individuals (as soon as practicable)
5. REMEDIATE → Fix root cause, update controls
6. REVIEW    → Post-incident review within 14 days
```

**Reportable breach criteria (Notifiable Data Breaches scheme):**
- Unauthorized access/disclosure of personal information
- Loss of personal information likely to result in serious harm
- Organization unable to prevent serious harm through remedial action

---

## 3. GST & Tax Compliance

### 3.1 GST Rules

```
All prices displayed: GST-INCLUSIVE (Australian standard)
GST rate: 10%
GST = Total / 11

Example:
  Service price: $99.00 (incl GST)
  GST component: $9.00
  Net price: $90.00
```

### 3.2 Invoice Requirements (Tax Invoice)

Every payment MUST generate a compliant tax invoice:

| Field | Required | Source |
|-------|----------|--------|
| ABN | Yes | Company registration |
| Invoice number | Yes | Auto-generated sequential |
| Date of issue | Yes | Payment confirmed date |
| Supplier name | Yes | BookedAI / Longcare AU |
| Buyer name | Yes | User profile |
| Description of services | Yes | Service name + dates |
| Total amount (incl GST) | Yes | booking.total_cents |
| GST amount | Yes | total / 11 |
| Payment method | Yes | Stripe/bank/QR |

### 3.3 BAS (Business Activity Statement)

```
Quarterly BAS lodgment:
  Q1: Jul-Sep → Due 28 Oct
  Q2: Oct-Dec → Due 28 Feb
  Q3: Jan-Mar → Due 28 Apr
  Q4: Apr-Jun → Due 28 Jul

Required data (from spending_ledger + payments):
  1A: Total GST collected on sales
  1B: Total GST paid on purchases
  Net: 1A - 1B = GST payable/refundable
```

---

## 4. Australian Consumer Law (ACL) Compliance

### 4.1 Consumer Guarantees

| Guarantee | Implementation |
|-----------|---------------|
| Services fit for purpose | Service descriptions accurate, satisfaction policy |
| Services delivered with due care | Qualified mentors, session quality tracking |
| Cooling-off period | 7-day refund for unused sessions |
| No misleading conduct | Pricing transparent, no hidden fees |
| Right to refund | Refund process via Approval Center (manual approve) |

### 4.2 Terms of Service Requirements

- [ ] Clear cancellation policy (24h before session)
- [ ] Refund policy (7-day cooling-off)
- [ ] Service description accuracy
- [ ] Price transparency (all prices incl GST)
- [ ] Complaint handling process
- [ ] Dispute resolution mechanism

---

## 5. Anti-Money Laundering (AML/CTF) Considerations

### 5.1 Transaction Monitoring

| Rule | Threshold | Action |
|------|-----------|--------|
| Large single transaction | > $10,000 AUD | Flag for review |
| Unusual pattern | 5+ bookings/day same user | Alert admin |
| International payment | Non-AU card | Additional verification |
| Refund churning | 3+ refunds in 30 days | Auto-block, require manual review |
| Cash threshold | > $5,000 in bank transfers/day | Flag for AML review |

### 5.2 Know Your Customer (KYC)

| Tier | Threshold | Verification Required |
|------|-----------|----------------------|
| Basic | < $500/month | Email verification only |
| Standard | $500-$5,000/month | Email + phone verification |
| Enhanced | > $5,000/month | ID verification (Enterprise tenants) |

---

## 6. WCAG 2.2 AA Accessibility

### 6.1 Compliance Checklist

| Criterion | Status | Notes |
|-----------|--------|-------|
| 1.1.1 Non-text Content | Done | Alt text on all images |
| 1.3.1 Info and Relationships | Done | Semantic HTML, ARIA labels |
| 1.4.1 Use of Color | Done | Not color-only indicators |
| 1.4.3 Contrast (Minimum) | Done | 4.5:1 text contrast |
| 2.1.1 Keyboard | Done | All interactive elements focusable |
| 2.4.1 Bypass Blocks | Done | Skip-to-content link |
| 2.4.7 Focus Visible | Done | Focus ring styling |
| 3.1.1 Language of Page | Done | `lang="en"` on html |
| 3.3.1 Error Identification | Done | Form validation errors |
| 4.1.2 Name, Role, Value | Done | ARIA roles on components |

### 6.2 Accessibility Testing Schedule

```
Monthly: Automated scan (axe-core, Lighthouse)
Quarterly: Manual keyboard testing
Annually: Screen reader testing (NVDA/JAWS)
```

---

## 7. Security Controls (OWASP Top 10)

### 7.1 Implementation Status

| # | Vulnerability | Mitigation | Status |
|---|-------------|-----------|--------|
| A01 | Broken Access Control | authenticate + requireRole middleware | Done |
| A02 | Cryptographic Failures | HTTPS everywhere, Stripe tokenization | Done |
| A03 | Injection | Parameterized queries (pg), Zod validation | Done |
| A04 | Insecure Design | Principle of least privilege, dual-control | Done |
| A05 | Security Misconfiguration | Helmet headers, CORS whitelist | Done |
| A06 | Vulnerable Components | pnpm audit, dependency updates | Ongoing |
| A07 | Auth Failures | Firebase Auth, JWT expiry, rate limiting | Done |
| A08 | Software/Data Integrity | Stripe webhook signature verification | Done |
| A09 | Security Logging | Audit logs, pino structured logging | Done |
| A10 | SSRF | No user-controlled URLs in server requests | Done |

### 7.2 Authentication Security

```
Primary: Firebase Auth (Google Sign-In)
Fallback: OpenAI OAuth (JWT 7-day sessions)
Session: Bearer token in Authorization header
Refresh: Firebase auto-refresh / JWT re-auth

Rate Limiting:
  - 100 requests per 15 minutes per IP
  - 10 login attempts per 15 minutes per IP
  - Stripe webhook: signature-verified (no rate limit)
```

### 7.3 Data Encryption

| Layer | Method |
|-------|--------|
| Transit | TLS 1.3 (Cloudflare → Nginx → App) |
| At Rest | PostgreSQL encryption (AES-256) |
| Secrets | .env file (never committed), PM2 env injection |
| API Keys | Environment variables, rotated quarterly |
| Passwords | Firebase-managed (bcrypt/scrypt) |

---

## 8. Operational Procedures

### 8.1 Change Management

```
Code Change Process:
1. Feature branch → PR → Code review → Merge
2. Automated tests (17 unit + 16 E2E)
3. PM2 restart affected services only
4. Smoke test: curl https://longcare.au/api/health
5. Monitor error rates for 30 minutes

Database Change Process:
1. Write migration SQL file (packages/db/src/migrations/)
2. Review by another engineer
3. Run on staging first (if available)
4. Run on production: pnpm db:migrate
5. Verify with SELECT query
6. Rollback plan documented before execution
```

### 8.2 Incident Response

```
Severity Levels:
  P1 (Critical) — All services down, data loss    → Response: 15 min
  P2 (Major)    — Payment processing down          → Response: 1 hour
  P3 (Minor)    — Single feature degraded          → Response: 4 hours
  P4 (Low)      — UI bug, non-blocking             → Response: 24 hours

Escalation:
  P1/P2 → Superadmin notified immediately (SMS + email)
  P3    → Admin notified via dashboard notification
  P4    → Tracked in issue tracker
```

### 8.3 Backup & Recovery

```
Database Backup:
  - Automated daily backup (pg_dump)
  - Retention: 30 days
  - Recovery tested: monthly

Application:
  - Git repository = source of truth
  - PM2 ecosystem = deployment config
  - .env = manual backup (encrypted)
```

---

## 9. Compliance Review Schedule

| Review | Frequency | Owner | Deliverable |
|--------|-----------|-------|-------------|
| Privacy Impact Assessment | Annually | Superadmin | PIA report |
| GST/BAS lodgment | Quarterly | Accountant | BAS form |
| Security audit | Semi-annually | CTO | Security report |
| Accessibility audit | Annually | UX team | WCAG report |
| Spending limit review | Quarterly | CFO | Limits adjustment |
| Data retention cleanup | Quarterly | Admin | Deletion log |
| Incident review | After each P1/P2 | All | Post-mortem |
| Vendor risk assessment | Annually | Admin | Vendor checklist |

---

## 10. Compliance Contacts

| Role | Responsibility | Escalation |
|------|---------------|------------|
| Superadmin | Platform governance, spending approval | All P1/P2 |
| Admin | Day-to-day operations, booking approval | P3/P4 |
| Accountant | GST/BAS, financial reconciliation | Quarterly |
| Privacy Officer | Privacy complaints, breach notification | As needed |
| OAIC | Office of the Australian Information Commissioner | Breach reporting |

---

## 11. Approval Center — User Guide

### 11.1 Accessing Approval Center

```
URL: https://admin.longcare.au/approvals
Auth: Requires admin or superadmin role
```

### 11.2 Approval Workflow

**Step 1: View Pending Requests**
- Navigate to Approvals page
- Filter by category (Refund, Payout, Ads, SMS, etc.)
- Review amount, reason, requester, and expiry time

**Step 2: Review Details**
- Read the REASON/JUSTIFICATION box carefully
- Check reference links (booking/payment/campaign)
- Verify amount against spending limits

**Step 3: Approve or Reject**
- **Approve:** Enter optional note → Click APPROVE → Confirm
- **Reject:** Enter MANDATORY reason → Click REJECT → Confirm
- Cannot approve your own request (dual-control)

**Step 4: Reconciliation**
- After month-end, go to Spending Ledger
- Mark each entry as reconciled against bank statement/Xero
- Unreconciled entries flagged automatically

### 11.3 Emergency Override

```
Only superadmin can:
  - Override dual-approval requirements
  - Approve above admin spending limits
  - Modify spending limits (via database migration)
  - Cancel expired requests
```

---

*Document owner: BookedAI Compliance*
*Last updated: 2026-05-06*
*Review schedule: Quarterly*
