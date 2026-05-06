# BookedAI (bookedai.au) - Comprehensive Business Strategy
## AI-Powered SaaS Booking Platform for Australian Service Businesses
### Prepared: May 2026 | First Tenant: longcare.au (AI Mentoring)

---

# SECTION 1: AUSTRALIAN BUSINESS COMPLIANCE REQUIREMENTS

## 1.1 ABN (Australian Business Number) Registration

| Requirement | Detail |
|---|---|
| **What** | 11-digit unique business identifier |
| **Cost** | Free via Australian Business Register (ABR) |
| **Timeline** | Instant for sole traders; 1-28 days for companies |
| **Prerequisite** | Must be obtained BEFORE GST registration |
| **Ongoing** | Must be displayed on all invoices, website, and communications |
| **Action** | Register at abr.gov.au; required for Stripe AU account setup |

## 1.2 GST Registration

| Requirement | Detail |
|---|---|
| **Threshold** | Mandatory at $75,000 annual GST turnover ($150,000 for non-profits) |
| **Rate** | 10% on all taxable supplies |
| **Registration deadline** | Within 21 days of reaching threshold |
| **Voluntary registration** | Available below threshold (recommended for input tax credits) |
| **BAS reporting** | Quarterly (turnover < $20M); Monthly (turnover >= $20M) |
| **BAS due dates** | 28th of the month following the end of each quarter |
| **Payment method** | Accruals basis (when invoiced) or Cash basis (when received) |

**Recommendation for BookedAI:** Register for GST voluntarily from Day 1 to claim input tax credits on cloud hosting, Stripe fees, and software costs. Use cash accounting method initially for simpler cash flow management.

**2025 Update:** Since April 2025, the ATO can require businesses with poor GST compliance history to report monthly for at least 12 months.

## 1.3 Privacy Act 1988 + Australian Privacy Principles (APPs)

### Applicability
The Privacy Act applies to organisations with annual turnover over $3 million. However, BookedAI should comply from Day 1 because:
- It handles health-adjacent data (mentoring/counselling bookings via longcare.au)
- Best practice builds trust with enterprise clients
- 2025-2026 reforms are significantly tightening enforcement

### The 13 APPs -- BookedAI Compliance Checklist

| APP | Requirement | BookedAI Action |
|---|---|---|
| APP 1 | Open and transparent management | Publish comprehensive Privacy Policy |
| APP 2 | Anonymity and pseudonymity | Allow anonymous browsing of public pages |
| APP 3 | Collection of solicited information | Only collect data necessary for service delivery |
| APP 4 | Dealing with unsolicited information | Process to destroy/de-identify unsolicited data |
| APP 5 | Notification of collection | Clear collection notices on all forms |
| APP 6 | Use or disclosure | Only use data for stated purposes |
| APP 7 | Direct marketing | Opt-in only; unsubscribe mechanism required |
| APP 8 | Cross-border disclosure | Document any overseas data transfers (GCP sydney region mitigates) |
| APP 9 | Government identifiers | Don't use govt IDs as customer identifiers |
| APP 10 | Quality of personal information | Keep data accurate and up-to-date |
| APP 11 | Security | Implement appropriate technical security measures |
| APP 12 | Access | Provide mechanism for users to access their data |
| APP 13 | Correction | Allow users to request data corrections |

### Critical 2025-2026 Privacy Reforms

| Reform | Effective Date | Impact on BookedAI |
|---|---|---|
| **Statutory tort for serious privacy invasions** | June 2025 | Individuals can now sue directly without going through OAIC |
| **Automated decision-making transparency** | 10 December 2026 | Must disclose AI-driven decisions in privacy policy |
| **Children's Online Privacy Code** | December 2026 | May apply if tenants serve minors |
| **OAIC enforcement priorities** | 2025-2026 | Focus on AI, ad-tech, excessive data collection |

**Critical Action:** The automated decision-making transparency obligation (Dec 2026) is directly relevant since BookedAI uses AI for scheduling and mentoring. Privacy policy must disclose how AI decisions are made.

## 1.4 Consumer Data Right (CDR)

Currently limited to banking, energy, and telecommunications sectors. Not directly applicable to BookedAI at present, but monitor for expansion to broader digital services.

## 1.5 Australian Consumer Law (ACL)

### Key Requirements

| Requirement | BookedAI Compliance |
|---|---|
| **Consumer Guarantees** | Services must be provided with due care and skill, be fit for purpose, and be delivered within a reasonable time |
| **Unfair contract terms** | Terms of Service must not contain unfair terms; consumers must have ability to negotiate or refuse |
| **Misleading conduct** | All marketing claims must be truthful and substantiated |
| **Refund policy** | Cannot exclude statutory consumer guarantees; must offer remedies for service failures |
| **Price transparency** | All prices must be clear; no hidden fees; GST-inclusive pricing for consumers |

### ACCC 2025-2026 Enforcement Focus
The ACCC is actively sweeping online businesses for ACL compliance, having reviewed 2,000+ retail websites. Ensure:
- Return/refund policy does not exclude statutory rights
- Terms of Service are plain English and not unconscionable
- Subscription cancellation is easy and transparent
- No "dark patterns" in UI that mislead consumers

## 1.6 ASIC Requirements for Online Payments

BookedAI processes payments via Stripe, which holds its own AFSL and AUSTRAC registration. BookedAI does NOT need:
- An AFSL (Australian Financial Services Licence) -- Stripe is the regulated entity
- AUSTRAC registration -- unless handling crypto/digital assets

**However, BookedAI must:**
- Comply with the ePayments Code for transparency and dispute handling
- Not charge excessive surcharges (credit card surcharge cap proposed at 0.3% from July 2026)
- Handle chargebacks and refunds per consumer law
- Display clear pricing before payment confirmation

## 1.7 ATO Requirements for Digital Services

| Requirement | Detail |
|---|---|
| **Income reporting** | All subscription and commission income reported in annual tax return |
| **GST on SaaS** | 10% GST on all domestic SaaS subscriptions |
| **GST on commissions** | 10% GST on commission revenue (marketplace facilitator) |
| **Record keeping** | 5-year retention of all financial records |
| **Single Touch Payroll** | Required if employing staff (STP Phase 2) |
| **Tax invoices** | Must be issued for all B2B transactions >= $82.50 inc GST |

## 1.8 Stripe Payment Compliance in Australia

### Stripe Fees (Current 2026)

| Transaction Type | Fee (excl GST) | Fee (incl GST) |
|---|---|---|
| Domestic cards | 1.7% + A$0.30 | 1.87% + A$0.33 |
| International cards | 3.25% + A$0.30 | 3.575% + A$0.33 |
| BECS Direct Debit | 1% + A$0.30 (capped at A$3.50) | 1.1% + A$0.33 |
| Currency conversion | +2% | +2.2% |

**Note:** GST on Stripe fees is claimable as input tax credit if GST-registered.

### Compliance Requirements
- PCI DSS compliance: Handled by Stripe (Level 1 certified)
- Stripe Connect for marketplace model: Required for tenant payment splits
- Strong Customer Authentication: Not mandatory in AU but recommended
- BECS Direct Debit: Requires mandate/agreement from customer

## 1.9 Terms of Service Legal Requirements

Under ACL, Terms of Service must:
1. Be written in plain, understandable English
2. Not contain unfair contract terms (e.g., unilateral termination without notice)
3. Not exclude or limit Consumer Guarantees
4. Clearly state subscription terms, pricing, and cancellation process
5. Include dispute resolution procedures
6. Specify governing law (Australian law, relevant State jurisdiction)
7. Comply with Privacy Act notification requirements
8. Include clear limitation of liability (within legal bounds)

## 1.10 Professional Indemnity Insurance

| Coverage | Estimated Monthly Cost | Recommended |
|---|---|---|
| PI only ($1M cover) | A$43 - $83/month | Minimum |
| PI + Public Liability bundle | A$98 - $150/month | Recommended |
| PI + PL + Cyber Insurance | A$150 - $250/month | Ideal for SaaS |

**Recommendation:** Start with PI + PL bundle (~A$100/month). Add cyber insurance when processing significant payment volumes. Annual cost: ~A$1,200 - $3,000.

## 1.11 WCAG Accessibility (DDA 1992)

### Requirements
- **Standard:** WCAG 2.2 Level AA (updated from WCAG 2.0 in April 2025)
- **Applies to:** All public-facing websites, SaaS platforms, mobile apps, emails
- **Penalties:** Up to $250,000 per violation under the DDA
- **Scope:** Covers AI tools, CAPTCHAs, 2FA systems, booking interfaces

### BookedAI Actions Required
1. Audit all 5 subdomains for WCAG 2.2 AA compliance
2. Ensure booking forms are keyboard-navigable and screen-reader compatible
3. Provide sufficient colour contrast (4.5:1 minimum for text)
4. Add alt text to all images
5. Ensure AI chat interface is accessible
6. Test with assistive technologies

---

# SECTION 2: REVENUE MODEL & UNIT ECONOMICS

## 2.1 Competitive Pricing Benchmarks (AUD)

| Platform | Free | Starter/Basic | Growth/Pro | Enterprise |
|---|---|---|---|---|
| **Calendly** | $0 | ~$16/mo/seat | ~$26/mo/seat | ~$24,000/yr |
| **Acuity Scheduling** | - | $26/mo | $53/mo | $80/mo |
| **Square Appointments** | $0 (1 staff) | $40/mo/location | $90/mo/location | Custom |
| **BookedAI (Proposed)** | $0 (limited) | $29/mo | $79/mo | $199/mo |

*Calendly prices converted at ~1.60 AUD/USD*

### BookedAI Pricing Justification
BookedAI offers MORE than pure scheduling (AI mentoring, multi-tenant SaaS, integrated payments, AI chat). Price premium over Calendly justified by:
- AI-powered booking intelligence
- Integrated service delivery (mentoring, chat)
- Australian-first design and compliance
- Commission-based revenue share model

## 2.2 Proposed Pricing Tiers

### Tier 1: Starter -- A$29/month
- 1 staff calendar
- Up to 100 bookings/month
- Basic AI scheduling assistant
- Email reminders
- Stripe payments (tenant pays own Stripe fees)
- Basic booking page

### Tier 2: Growth -- A$79/month
- Up to 5 staff calendars
- Unlimited bookings
- AI chat assistant
- SMS + Email reminders
- Custom booking domain
- Group bookings
- Client management CRM
- Analytics dashboard

### Tier 3: Enterprise -- A$199/month
- Unlimited staff calendars
- White-label branding
- Priority AI support
- API access
- Custom integrations
- Dedicated account manager
- SLA guarantees
- Advanced reporting

### Transaction Commission: 5-8%
- 5% on Starter plan
- 6% on Growth plan
- 8% on Enterprise plan (offset by higher subscription fee -- negotiable)
- OR flat 5% across all plans for simplicity

**Recommendation:** Start with flat 5% commission across all tiers. This is competitive with Square's payment processing model and provides predictable revenue.

## 2.3 Unit Economics

### Customer Acquisition Cost (CAC) Targets

| Channel | Target CAC | Notes |
|---|---|---|
| Organic/SEO | A$50 - $150 | Content marketing, blog, local SEO |
| Referral | A$30 - $80 | Referral program, word-of-mouth |
| Paid (Google Ads) | A$150 - $300 | Target service business keywords |
| Social (LinkedIn, FB) | A$100 - $250 | Targeted AU service business ads |
| **Blended Target** | **A$120** | Weighted average across channels |

### Lifetime Value (LTV) Calculation

**Assumptions:**
- Average Revenue Per Account (ARPA): A$54/month (blended across tiers)
- Average commission per customer: A$25/month (assuming $500/month GMV at 5%)
- Total monthly revenue per customer: A$79
- Gross margin: 80%
- Monthly churn rate: 4% (SMB benchmark)
- Customer lifetime: 25 months (1/0.04)

**LTV Calculation:**
```
LTV = ARPA x Gross Margin x Customer Lifetime
LTV = $79 x 0.80 x 25 = A$1,580
```

### LTV:CAC Ratio

```
LTV:CAC = $1,580 / $120 = 13.2:1
```

**Target:** Minimum 3:1 (we are well above at 13.2:1)
**Healthy range:** 4:1 to 7:1 (we exceed this due to low organic CAC)
**Caveat:** If relying heavily on paid channels (CAC = $250), ratio drops to 6.3:1 -- still healthy.

### CAC Payback Period

```
Payback = CAC / (Monthly Revenue x Gross Margin)
Payback = $120 / ($79 x 0.80) = 1.9 months
```

**Benchmark:** Under 12 months is healthy; median for SaaS is 6.8 months. BookedAI at 1.9 months is excellent.

## 2.4 MRR Projections (12-Month)

| Month | Customers | Avg ARPA | Subscription MRR | Commission MRR | Total MRR |
|---|---|---|---|---|---|
| 1 | 3 | $40 | $120 | $30 | $150 |
| 2 | 8 | $42 | $336 | $80 | $416 |
| 3 | 15 | $45 | $675 | $150 | $825 |
| 4 | 25 | $48 | $1,200 | $250 | $1,450 |
| 5 | 38 | $50 | $1,900 | $380 | $2,280 |
| 6 | 55 | $52 | $2,860 | $550 | $3,410 |
| 7 | 72 | $53 | $3,816 | $720 | $4,536 |
| 8 | 90 | $54 | $4,860 | $900 | $5,760 |
| 9 | 110 | $54 | $5,940 | $1,100 | $7,040 |
| 10 | 130 | $55 | $7,150 | $1,300 | $8,450 |
| 11 | 150 | $55 | $8,250 | $1,500 | $9,750 |
| 12 | 175 | $56 | $9,800 | $1,750 | $11,550 |

**Year 1 Total Revenue: ~A$55,617**
**Month 12 ARR: A$138,600**

## 2.5 Churn Rate Benchmarks

| Metric | SMB Benchmark | BookedAI Target |
|---|---|---|
| Monthly churn | 3-5% | 4% (Year 1), 3% (Year 2) |
| Annual churn | 10-15% | 12% (Year 1) |
| Net Revenue Retention | 90-100% | 95% |

**Churn Reduction Strategies:**
1. Onboarding automation with AI assistant
2. Monthly usage reports showing ROI
3. Annual billing discount (20% off)
4. Switching cost via data lock-in (booking history, client data)
5. Feature releases tied to engagement

## 2.6 Break-Even Analysis

| Item | Monthly Cost |
|---|---|
| GCE VM (e2-standard-4) | A$180 |
| Domain + DNS (Cloudflare) | A$15 |
| Stripe fees (on own revenue) | ~2% of MRR |
| Insurance | A$100 |
| Accounting/bookkeeping | A$200 |
| Marketing | A$500 |
| Miscellaneous | A$100 |
| **Total Fixed Costs** | **~A$1,095/month** |

**Break-even MRR:** ~A$1,370 (at 80% gross margin)
**Break-even customers:** ~25 customers at blended A$54 ARPA
**Expected break-even:** Month 4-5

## 2.7 Commission Model Viability

### 5% Commission Analysis

| Tenant Monthly GMV | BookedAI Commission (5%) | Tenant Effective Cost |
|---|---|---|
| $500 | $25 | Subscription + $25 |
| $2,000 | $100 | Subscription + $100 |
| $5,000 | $250 | Subscription + $250 |
| $10,000 | $500 | Subscription + $500 |
| $20,000 | $1,000 | Subscription + $1,000 |

**Risk:** High-GMV tenants may resist 5% commission at scale. Consider:
- Cap commission at $500/month for Enterprise tier
- Reduce to 3% above $10,000 GMV/month
- Or offer commission-free plan at higher subscription price (e.g., $299/month)

---

# SECTION 3: BUSINESS MODEL CANVAS

## 3.1 Key Partners
- **Stripe** -- Payment processing, Connect platform for marketplace
- **Google Cloud Platform** -- Infrastructure (australia-southeast1)
- **Cloudflare** -- CDN, DNS, SSL, DDoS protection
- **OpenAI/Anthropic** -- AI model providers for chat and scheduling AI
- **Twilio/MessageMedia** -- SMS notifications (Australian numbers)
- **Australian service industry associations** -- Channel partnerships
- **Accountants/bookkeepers** -- Referral partners
- **Business coaches** -- First adopter segment

## 3.2 Key Activities
- Platform development and maintenance (Next.js, Node.js, PostgreSQL)
- AI model fine-tuning for booking optimisation
- Tenant onboarding and support
- Marketing and customer acquisition
- Payment processing and commission collection
- Compliance management (Privacy Act, ACL, GST)
- Data security and uptime management

## 3.3 Key Resources
- Engineering team (founder + contractors)
- AI/ML infrastructure and models
- Multi-tenant SaaS platform (5 subdomains per tenant)
- Australian-hosted cloud infrastructure
- Brand and domain portfolio (bookedai.au, longcare.au)
- Customer data and booking intelligence

## 3.4 Value Propositions

| Segment | Value Proposition |
|---|---|
| **Service providers** | All-in-one AI booking + CRM + payments platform built for Australian businesses, reducing no-shows by 30%+ and admin time by 50%+ |
| **End consumers** | Seamless booking experience with AI-powered scheduling, reminders, and service delivery |
| **longcare.au (first tenant)** | AI mentoring platform with integrated booking, chat, and session management |

**Differentiators vs Calendly/Acuity/Square:**
1. AI-native (not bolted on) -- AI scheduling, AI chat, AI insights
2. Australian-first -- GST compliance, local hosting, AU support
3. Multi-tenant architecture -- each tenant gets branded subdomains
4. Integrated service delivery -- not just booking, but the service itself (e.g., AI mentoring)
5. Commission model aligns BookedAI success with tenant success

## 3.5 Customer Relationships
- Self-service onboarding with AI-guided setup
- In-app chat support (AI-first, human escalation)
- Email nurture sequences for trial-to-paid conversion
- Quarterly business reviews for Enterprise clients
- Community forum / knowledge base
- Annual billing relationship for retention

## 3.6 Channels
- **Direct:** bookedai.au website, Google Ads, LinkedIn
- **Organic:** SEO, content marketing ("AI booking for Australian businesses")
- **Referral:** Partner program with accountants, business coaches
- **Marketplace:** Integration directories (Stripe, Google Workspace)
- **Local:** Australian service business meetups, chambers of commerce
- **Social:** LinkedIn (B2B), Facebook/Instagram (local service businesses)

## 3.7 Customer Segments

| Segment | Size (AU) | Priority | Examples |
|---|---|---|---|
| **Solo practitioners** | ~600,000 | HIGH | Coaches, tutors, mentors, therapists |
| **Small service teams** (2-10) | ~400,000 | HIGH | Beauty salons, clinics, consulting firms |
| **Professional services** | ~200,000 | MEDIUM | Accountants, lawyers, financial advisors |
| **Health & wellness** | ~150,000 | MEDIUM | Allied health, gyms, personal trainers |
| **Education/training** | ~50,000 | LOW (Year 2) | Training providers, tutoring centres |

**Beachhead market:** Solo practitioners and small teams in coaching/mentoring/wellness in major AU cities.

## 3.8 Cost Structure

| Cost Category | Monthly (Year 1 avg) | Annual | % of Revenue |
|---|---|---|---|
| Cloud infrastructure (GCP) | A$180 | A$2,160 | 4% |
| AI API costs (OpenAI/Anthropic) | A$200 | A$2,400 | 4% |
| Stripe fees | ~A$150 | ~A$1,800 | 3% |
| Domain + Cloudflare | A$15 | A$180 | <1% |
| Insurance (PI + PL) | A$100 | A$1,200 | 2% |
| Accounting + legal | A$300 | A$3,600 | 6% |
| Marketing + advertising | A$500 | A$6,000 | 11% |
| Contractor/dev costs | A$1,000 | A$12,000 | 22% |
| SMS/notifications | A$50 | A$600 | 1% |
| Miscellaneous | A$100 | A$1,200 | 2% |
| **Total** | **A$2,595** | **A$31,140** | **56%** |

## 3.9 Revenue Streams

| Stream | Type | Year 1 Projection |
|---|---|---|
| SaaS subscriptions (monthly/annual) | Recurring | A$47,000 |
| Transaction commissions (5% of GMV) | Variable | A$8,600 |
| Setup/onboarding fees (Enterprise) | One-time | A$2,000 |
| Premium AI features (add-ons) | Recurring | A$1,000 |
| **Total Year 1** | | **~A$58,600** |

---

# SECTION 4: FINANCIAL PROJECTIONS (12 MONTHS)

## 4.1 Month-by-Month P&L (All figures in AUD)

| Month | Customers | Subscription Rev | Commission Rev | Total Revenue | Cloud/Infra | AI Costs | Stripe Fees | Marketing | Insurance | Accounting | Other | Total Costs | Net Profit | Cumulative |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **M1** | 3 | 120 | 30 | 150 | 180 | 50 | 5 | 300 | 100 | 200 | 100 | 935 | -785 | -785 |
| **M2** | 8 | 336 | 80 | 416 | 180 | 80 | 12 | 400 | 100 | 200 | 100 | 1,072 | -656 | -1,441 |
| **M3** | 15 | 675 | 150 | 825 | 180 | 120 | 25 | 450 | 100 | 200 | 100 | 1,175 | -350 | -1,791 |
| **M4** | 25 | 1,200 | 250 | 1,450 | 180 | 160 | 44 | 500 | 100 | 200 | 100 | 1,284 | 166 | -1,625 |
| **M5** | 38 | 1,900 | 380 | 2,280 | 200 | 200 | 68 | 500 | 100 | 200 | 120 | 1,388 | 892 | -733 |
| **M6** | 55 | 2,860 | 550 | 3,410 | 200 | 250 | 102 | 600 | 100 | 250 | 150 | 1,652 | 1,758 | 1,025 |
| **M7** | 72 | 3,816 | 720 | 4,536 | 220 | 300 | 136 | 600 | 100 | 250 | 150 | 1,756 | 2,780 | 3,805 |
| **M8** | 90 | 4,860 | 900 | 5,760 | 220 | 350 | 173 | 700 | 100 | 250 | 150 | 1,943 | 3,817 | 7,622 |
| **M9** | 110 | 5,940 | 1,100 | 7,040 | 250 | 400 | 211 | 800 | 100 | 300 | 200 | 2,261 | 4,779 | 12,401 |
| **M10** | 130 | 7,150 | 1,300 | 8,450 | 250 | 450 | 254 | 800 | 100 | 300 | 200 | 2,354 | 6,096 | 18,497 |
| **M11** | 150 | 8,250 | 1,500 | 9,750 | 280 | 500 | 293 | 900 | 100 | 300 | 200 | 2,573 | 7,177 | 25,674 |
| **M12** | 175 | 9,800 | 1,750 | 11,550 | 300 | 550 | 347 | 1,000 | 100 | 300 | 250 | 2,847 | 8,703 | 34,377 |

### Summary

| Metric | Value |
|---|---|
| **Total Year 1 Revenue** | A$55,617 |
| **Total Year 1 Costs** | A$21,240 |
| **Year 1 Net Profit** | A$34,377 |
| **Net Margin (Month 12)** | 75.4% |
| **Break-even Month** | Month 4 |
| **Cash positive Month** | Month 6 |
| **Month 12 MRR** | A$11,550 |
| **Month 12 ARR (annualised)** | A$138,600 |

## 4.2 Key Assumptions & Risks

| Assumption | Value | Risk Level |
|---|---|---|
| Customer growth | ~15-20 net new/month by M6+ | MEDIUM -- dependent on marketing effectiveness |
| Monthly churn | 4% | MEDIUM -- SMB churn can spike to 7% |
| ARPA growth | $40 to $56 over 12 months | LOW -- as mix shifts to Growth/Enterprise |
| Commission GMV per tenant | $500/month average | MEDIUM -- varies hugely by tenant vertical |
| Founder salary | Not included (bootstrapped) | HIGH -- need to draw salary by M6+ |
| No external funding | Self-funded | LOW -- profitable by M4 |

## 4.3 GST Registration Trigger

At current projections, BookedAI crosses the $75,000 GST threshold approximately in Month 12-14 (cumulative turnover). However, **voluntary registration from Day 1 is recommended** to reclaim input tax credits (~$2,000-3,000/year in Stripe fees, cloud hosting, and software).

---

# SECTION 5: AUSTRALIAN TAX & ACCOUNTING

## 5.1 GST Treatment -- SaaS Subscriptions

| Scenario | GST Treatment |
|---|---|
| Australian customer, any plan | 10% GST applies -- included in advertised price or added at checkout |
| B2B customer (GST-registered) | Charge GST + issue Tax Invoice; customer claims input tax credit |
| B2C customer | Charge GST; price should be GST-inclusive per ACL |
| Overseas customer | GST-free (export of services) if customer is overseas and service is used overseas |

**Example:** Starter plan A$29/month
- GST-inclusive price to consumer: A$29 (GST component = A$2.64)
- Or: A$29 + GST = A$31.90 (B2B pricing model)
- **Recommendation:** Advertise GST-inclusive prices (A$29, A$79, A$199) for simplicity under ACL

## 5.2 GST Treatment -- Marketplace Commissions

| Scenario | GST Treatment |
|---|---|
| Commission on tenant's booking revenue | GST applies to the commission amount (it is a service supplied by BookedAI to tenant) |
| Stripe Connect split | BookedAI receives commission net of Stripe fees; GST applies to gross commission |
| Tax invoice | BookedAI issues Tax Invoice to tenant for commission charged |

**Example:** Tenant processes $1,000 in bookings. BookedAI commission = 5% = $50.
- BookedAI charges tenant $50 + $5 GST = $55
- BookedAI issues Tax Invoice to tenant for $55
- Tenant claims $5 as input tax credit (if GST-registered)

**Important:** BookedAI is NOT the Electronic Distribution Platform (EDP) operator for GST purposes unless it controls the supply. Since tenants set their own prices and deliver their own services, BookedAI acts as a payment facilitator, not a deemed supplier.

## 5.3 BAS Reporting Requirements

| Frequency | Criteria | Due Date |
|---|---|---|
| **Quarterly** (recommended Year 1) | Turnover < $20M | 28th of month after quarter end |
| Monthly | Turnover >= $20M or ATO-directed | 21st of following month |

### Quarterly BAS Due Dates (FY 2025-26)

| Quarter | Period | Due Date |
|---|---|---|
| Q1 | July - September 2025 | 28 October 2025 |
| Q2 | October - December 2025 | 28 February 2026 |
| Q3 | January - March 2026 | 28 April 2026 |
| Q4 | April - June 2026 | 28 July 2026 |

### What to report on BAS:
1. **1A:** GST on sales (output tax)
2. **1B:** GST on purchases (input tax credits)
3. **PAYG Withholding:** If employing staff
4. **PAYG Instalments:** Prepayment of income tax

## 5.4 Tax Invoice Requirements

Every Tax Invoice issued by BookedAI must include:

1. The words **"Tax Invoice"** prominently displayed
2. **BookedAI's ABN**
3. **Date of issue**
4. **Description** of services (e.g., "Growth Plan - Monthly Subscription")
5. **Quantity and price** of each item
6. **GST amount** -- either shown separately or with statement "Total price includes GST"
7. **Total amount payable**
8. For invoices **over $1,000 inc GST**: buyer's identity or ABN also required

**Retention:** Keep all invoices for minimum 5 years.

**Automation:** Stripe invoicing can auto-generate compliant Tax Invoices if configured with ABN and GST settings.

## 5.5 Chart of Accounts Structure

### Revenue Accounts (4xxx)
```
4000  Revenue
  4100  Subscription Revenue
    4110  Starter Plan Revenue
    4120  Growth Plan Revenue
    4130  Enterprise Plan Revenue
  4200  Commission Revenue
    4210  Booking Commission (5%)
  4300  Setup/Onboarding Fees
  4400  Other Revenue
```

### Cost of Sales (5xxx)
```
5000  Cost of Sales
  5100  Stripe Payment Processing Fees
  5200  Cloud Infrastructure (GCP)
  5300  AI API Costs (OpenAI/Anthropic)
  5400  SMS/Notification Costs
  5500  Domain & CDN Costs
```

### Operating Expenses (6xxx)
```
6000  Operating Expenses
  6100  Marketing & Advertising
    6110  Google Ads
    6120  Social Media Advertising
    6130  Content Marketing
  6200  Professional Services
    6210  Accounting & Bookkeeping
    6220  Legal Fees
    6230  Consulting
  6300  Insurance
    6310  Professional Indemnity Insurance
    6320  Public Liability Insurance
    6330  Cyber Insurance
  6400  Software & Tools
    6410  Development Tools & Licences
    6420  Productivity Software
  6500  Contractor Costs
    6510  Development Contractors
    6520  Design Contractors
  6600  Office & Administrative
    6610  Phone & Internet
    6620  Bank Fees
    6630  Miscellaneous
```

### Assets (1xxx)
```
1000  Assets
  1100  Cash at Bank
    1110  Operating Account (AUD)
    1120  Stripe Balance
  1200  Accounts Receivable
  1300  Prepaid Expenses
  1400  GST Receivable (Input Tax Credits)
```

### Liabilities (2xxx)
```
2000  Liabilities
  2100  Accounts Payable
  2200  GST Payable (Output Tax)
  2300  PAYG Withholding Payable
  2400  Deferred Revenue (Annual Subscriptions)
  2500  Credit Card Payable
```

### Equity (3xxx)
```
3000  Equity
  3100  Owner's Equity / Capital
  3200  Retained Earnings
  3300  Drawings
```

---

# SECTION 6: STRATEGIC RECOMMENDATIONS & ACTION PLAN

## Immediate Actions (Next 30 Days)

| Priority | Action | Cost | Timeline |
|---|---|---|---|
| 1 | Register ABN | Free | Week 1 |
| 2 | Register for GST (voluntary) | Free | Week 1 |
| 3 | Open business bank account (Up Business / Westpac) | Free | Week 1 |
| 4 | Set up Stripe Connect for marketplace model | Free | Week 2 |
| 5 | Draft Privacy Policy (APP-compliant) | $0-500 | Week 2 |
| 6 | Draft Terms of Service (ACL-compliant) | $0-500 | Week 2 |
| 7 | Implement GST on invoicing (Stripe Tax) | Free | Week 3 |
| 8 | Get PI + PL insurance quote | ~$100/mo | Week 3 |
| 9 | Set up Xero/MYOB for accounting | ~$30/mo | Week 3 |
| 10 | Run WCAG 2.2 AA accessibility audit | Free (tools) | Week 4 |

## Medium-Term (Months 2-6)

1. Launch Starter and Growth plans publicly
2. Begin content marketing (blog: "AI Booking for Australian Businesses")
3. Establish referral program with AU business coaches
4. Build automated onboarding flow
5. Implement BAS-ready reporting in accounting system
6. First BAS lodgement
7. Target 55 customers by Month 6

## Long-Term (Months 7-12)

1. Launch Enterprise plan
2. Add second and third tenants beyond longcare.au
3. Build integration marketplace (Xero, MYOB, Google Calendar)
4. Prepare for automated decision-making transparency (Dec 2026 deadline)
5. Evaluate hiring first employee (STP registration)
6. Target 175 customers and A$138,600 ARR by Month 12
7. Consider trademark registration for "BookedAI"

---

# APPENDIX: KEY REGULATORY REFERENCES

| Regulation | Source | Key Requirement |
|---|---|---|
| Privacy Act 1988 | legislation.gov.au | 13 APPs, $3M turnover threshold |
| Australian Consumer Law | Schedule 2 of Competition and Consumer Act 2010 | Consumer guarantees, unfair terms |
| GST Act | A New Tax System (Goods and Services Tax) Act 1999 | 10% GST, $75K threshold |
| DDA 1992 | Disability Discrimination Act 1992 | WCAG 2.2 AA for digital services |
| ePayments Code | ASIC regulatory guide | Payment transparency, dispute handling |
| PCI DSS | Payment Card Industry | Handled by Stripe |
| AML/CTF Act | Anti-Money Laundering and Counter-Terrorism Financing Act 2006 | Handled by Stripe/AUSTRAC |
