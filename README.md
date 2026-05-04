# BookedAI — The AI Revenue Engine

> Turn customer intent into revenue — automatically

BookedAI is an AI-powered platform that automates chat, booking, payments, meetings, and customer care for service businesses.

## Live Demo

| Domain | Description |
|---|---|
| [g.longcare.au](https://g.longcare.au) | BookedAI Platform (SaaS) |
| [longcare.au](https://longcare.au) | Longcare AU — First Tenant |
| [book.longcare.au](https://book.longcare.au) | Booking Flow |
| [meet.longcare.au](https://meet.longcare.au) | Meeting Rooms |
| [app.longcare.au](https://app.longcare.au) | User Dashboard |
| [admin.longcare.au](https://admin.longcare.au) | Admin Dashboard |

## Architecture

```
g.bookedai.au (SaaS Platform)
    ├── AI Chat Engine (Gemini / OpenAI / Fallback)
    ├── Booking Truth Engine (hold → confirm → meet)
    ├── Payment Processing (Stripe + QR + Bank Transfer)
    ├── Google Workspace (Calendar, Meet, Gmail, Docs, Drive)
    ├── Analytics Pipeline (GA4 + GTM + BigQuery)
    └── Marketing Automation (8-channel content generation)

longcare.au (Tenant #1 — AI Mentoring)
    └── Uses all BookedAI capabilities via API
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, Tailwind CSS v4 |
| Backend | Express 5, TypeScript, Zod |
| AI | Google Gemini 2.5 Flash, OpenAI (fallback) |
| Database | PostgreSQL 16, Redis 7, Firestore |
| Auth | Firebase Auth, Google Sign-In |
| Payments | Stripe Live, QR (AUD + VND), PayID |
| Meetings | Google Calendar + Meet |
| Email | Gmail API, Nodemailer |
| Analytics | GA4, GTM, BigQuery |
| Infrastructure | Docker, PM2, Nginx, Cloudflare |
| CI/CD | GitHub Actions, Google Cloud Build |

## Project Structure

```
apps/
├── web-g-bookedai/    → g.bookedai.au (SaaS platform)
├── web-longcare/      → longcare.au (tenant)
├── booking-web/       → book.longcare.au
├── meet/              → meet.longcare.au
├── user-app/          → app.longcare.au
└── admin-app/         → admin.longcare.au

services/
├── api/               → REST API gateway
├── agent/             → AI agent (Gemini + intent classifier)
├── notification/      → Email/SMS/Push
├── drive-sync/        → Google Drive reports
├── payment/           → Stripe SDK
├── learning-agent/    → Session notes AI
├── marketing-agent/   → Campaign generation
└── accounting-sync/   → Xero integration

packages/
├── shared/            → Types, constants, analytics
├── db/                → PostgreSQL client, migrations
├── google/            → 17 Google Cloud integrations
└── ui/                → Shared React components
```

## Quick Start

```bash
# Install
pnpm install

# Start infrastructure
docker compose up postgres redis -d

# Run migrations
pnpm db:migrate && pnpm db:seed

# Start all services
pm2 start ecosystem.config.cjs

# Or start individually
pnpm dev:api    # API on port 8090
pnpm dev:web    # g.bookedai.au on port 3000
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
cp .env.example .env
```

Key variables:
- `GEMINI_API_KEY` — Google AI Studio API key
- `STRIPE_SECRET_KEY` — Stripe live secret key
- `GOOGLE_CLIENT_ID` — Google OAuth client ID
- `GA4_MEASUREMENT_ID` — Google Analytics 4
- `GTM_ID` — Google Tag Manager

## API Documentation

See [API Reference](https://g.longcare.au/api-docs) or [OpenAPI spec](docs/openapi.yaml).

## Features

- **AI Chat** — Multilingual (EN/VI/ZH), intent detection, 24/7 auto-reply
- **Smart Booking** — 4-step flow, real-time availability, Pay Later option
- **Payments** — Stripe, QR codes (AUD/VND), bank transfer, real-time FX
- **Meetings** — Branded rooms (meet.longcare.au), Google Meet, calendar invites
- **Analytics** — GA4 conversion tracking, GTM, server-side measurement paths
- **Customer Care** — AI chatbot on all pages, WhatsApp integration
- **Marketing** — 8-channel campaign generation, UTM tracking
- **SEO** — Schema.org, sitemap, robots.txt, OG tags

## License

Proprietary — BookedAI © 2026
