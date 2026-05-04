# 04 — System Architecture

## Architecture principle

```txt
AI recommends. Truth Engine confirms. Payment proves. Accounting records. Analytics optimizes.
```

## High-level flow

```txt
Customer
→ g.bookedai.au AI Search/Chat
→ Gemini Intent Agent
→ Longcare Service Card
→ book.longcare.au Booking
→ Payment
→ Calendar + Meet
→ Gmail confirmation
→ Learning Agent summary
→ Dashboard CTA
→ Repeat booking
```

## Container services

| Service | Domain | Purpose |
|---|---|---|
| web-g-bookedai | g.bookedai.au | AI entry/search UI |
| agent-service | agent.g.bookedai.au | Gemini tool orchestration |
| api-service | api.g.bookedai.au | REST API gateway |
| web-longcare | longcare.au | Public site |
| booking-web | book.longcare.au | Booking/payment UX |
| user-app | app.longcare.au | Dashboard |
| admin-app | admin.longcare.au | Admin dashboard |
| payment-service | internal | Stripe/bank transfer |
| learning-agent | internal | Notes/Q&A/CTA |
| marketing-agent | internal | Campaign/content generation |
| accounting-sync | internal | Xero sync |

## Databases

### Cloud SQL PostgreSQL

- tenants
- users
- services
- availability_slots
- bookings
- payments
- invoices
- learning_sessions
- learning_notes
- marketing_campaigns
- social_content_items
- audit_logs

### Firestore

- live chat sessions
- booking hold state
- agent run state
- dashboard cache

### BigQuery

- funnel events
- revenue events
- campaign performance
- learning analytics
- conversion analytics

## Event bus

Use Pub/Sub topics:

```txt
booking.created
booking.paid
booking.cancelled
payment.succeeded
payment.failed
session.completed
learning.notes.created
marketing.content.approved
accounting.sync.failed
```

## Truth rules

```txt
- Slot must exist before booking hold.
- Hold expires automatically.
- Booking cannot be CONFIRMED without payment success or admin-confirmed bank transfer.
- Calendar event and Meet link must be created after confirmation.
- Every status change must be logged.
```
