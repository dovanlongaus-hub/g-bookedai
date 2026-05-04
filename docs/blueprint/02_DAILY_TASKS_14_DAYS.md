# 02 — Daily Tasks: 14-Day Implementation Plan

## Day 1 — Foundation & Google project setup

### Tasks
- Confirm domains and DNS plan
- Create/confirm Google Cloud project under ceo@longcare.au
- Enable Gemini/Vertex AI, Cloud Run, Artifact Registry, Firestore, Cloud SQL, Secret Manager
- Create Git repo structure with **Turborepo** for pnpm workspaces
- Define separate `.env.local` for dev and Secret Manager keys for production
- Create Docker baseline
- Create tracking sheet and issue labels

### Deliverables
- Cloud project ready
- Monorepo initialized with Turborepo
- Environment checklist and secrets ready

## Day 2 — Landing + booking UX

### Tasks
- Build longcare.au service landing plan
- Build book.longcare.au booking wireframe (with Optimistic UI for slot selection)
- Create pricing components
- Create CTA inventory
- Define booking statuses and rules
- Implement 10-minute hold logic: trigger Cloud Task to auto-release slot if not confirmed

### Deliverables
- Landing copy ready
- Booking flow accepted (with OCC handling)
- Pricing UI ready

## Day 3 — Payment & billing core

### Tasks
- Configure Stripe products/prices
- Create card payment flow spec
- Create bank transfer / PayID instructions
- Define payment webhook events (Implement Idempotency using webhook_events table)
- Define refund/cancel rules

### Deliverables
- Payment flow ready for implementation
- Billing rules approved with webhook safety plan

## Day 4 — Google Calendar, Meet, Gmail

### Tasks
- Enable Calendar API and Gmail API
- Define booking→calendar event mapping
- Define Meet link creation
- Define confirmation email templates
- Create reminder email templates

### Deliverables
- Calendar/Meet/Gmail plan complete
- Email templates ready

## Day 5 — Google Login + dashboards

### Tasks
- Implement Google Sign-In requirements
- Define Cross-domain Auth strategy: Handle session between g.bookedai.au and book.longcare.au via Firebase JWT.
- Define user roles
- Design app.longcare.au dashboard
- Design admin.longcare.au dashboard
- Add CTA next booking areas

### Deliverables
- Dashboard UX ready
- Cross-domain Auth and role plan ready

## Day 6 — Learning Engine MVP

### Tasks
- Define transcript/notes pipeline
- Define Firestore structure for AI sessions: `users/{userId}/sessions/{sessionId}/messages/{messageId}`
- Create Gemini prompts for summary/Q&A/improvement
- Design Google Docs note template
- Define user learning history model
- Define next course recommendation logic

### Deliverables
- Learning agent prompt pack and Firestore schema ready
- Learning dashboard fields ready

## Day 7 — End-to-end MVP QA

### Tasks
- Run E2E design review
- Check booking→payment→Meet→email→dashboard flow
- Create smoke test checklist
- Fix gaps
- Prepare launch checklist

### Deliverables
- Week 1 MVP sign-off
- Smoke test list ready

## Day 8 — Google Ads + GA4/GTM

### Tasks
- Create GA4 property plan
- Create GTM events
- Create Google Ads campaign draft
- Define conversion events
- Create UTM naming convention

### Deliverables
- Ads plan ready
- Tracking spec ready

## Day 9 — SEO pages + Search Console

### Tasks
- Create services.longcare.au SEO URL plan
- Write first 3 SEO page briefs
- Define schema markup
- Prepare Search Console verification checklist
- Google Business Profile checklist

### Deliverables
- SEO plan ready
- 3 SEO briefs ready

## Day 10 — Marketing Agent MVP

### Tasks
- Create campaign generator prompt
- Create content writer prompt
- Create approval workflow
- Create social publishing queue model
- Create first campaign pack

### Deliverables
- Marketing Agent spec ready
- First content drafts ready

## Day 11 — AI content: text/image/video

### Tasks
- Create Track A curriculum
- Create Lesson 1 script
- Create image/video prompt templates
- Define paywall preview/full content rules
- Define video asset storage plan

### Deliverables
- Course content MVP ready
- Paywall rules ready

## Day 12 — Accounting, Xero, GST

### Tasks
- Define chart of accounts
- Define GST treatment
- Create Xero sync mapping
- Create invoice/payment/reconciliation workflow
- Create monthly BAS-ready reporting checklist

### Deliverables
- Accounting design ready
- Xero setup checklist ready

## Day 13 — R&D + company AI ops

### Tasks
- Define R&D agent tasks
- Create weekly AI update report template
- Create model upgrade decision rules
- Create executive weekly report
- Create HR role/task assignment model

### Deliverables
- R&D loop ready
- Executive report template ready

## Day 14 — Final UAT + launch

### Tasks
- Run UAT scenarios
- Run random QA checks
- Finalize release checklist
- Prepare launch content
- Prepare next 30-day backlog

### Deliverables
- Launch-ready package
- Next backlog ready

# Parallel workstreams

- Product/UX can run ahead by 1–2 days.
- Marketing/content can start from Day 2 once pricing is locked.
- Accounting/Xero can be designed while core booking/payment is being built.
- QA should run every day from Day 3 onward.
