# LongCare.au — Implementation Progress

Last updated: 2026-05-12
Companion to: `VISION.md`, `IMPLEMENTATION_PLAN.md`, `IA_BLUEPRINT.md`, `INFRASTRUCTURE.md`

---

## Phase status

| Phase | Theme | Status | % done |
|---|---|---|---|
| **P0** | Stabilisation | ✅ Complete | 100% |
| **Phase E** | Extraction & Independent Deploy | ✅ Complete (deployed to GitHub 2026-05-11) | 100% |
| **Phase E1** | Pre-commit + CI hooks | 🟢 Husky/ESLint/Prettier/lint-staged active; CI deploy on tag pending operator creds | 80% |
| **P1** | Foundation (Mentor/Academy/Assessment) | 🟡 Frontend scaffold complete, backend pending GCP creds | 40% |
| **P2** | Automation Platform (Toolkit, Solutions) | 🟢 Toolkit 7 apps + Solutions 7 industries live | 35% |
| **P3** | AI Agent Marketplace | 🟢 Marketplace 17 pages live, runtime pending | 30% |
| **P4** | AI Ecosystem (Governance/Community/i18n) | 🟢 Marketing + Governance + Community + i18n scaffold live | 35% |

---

## P0 — Stabilisation ✅ (delivered 2026-05-09)

### Build & deploy
- ✅ `motion` + `zod` deps added; build passes
- ✅ `HeroSection.tsx` removed (was duplicating inline Hero)
- ✅ `theme-toggle.tsx` hydration mismatch fixed (`mounted` flag pattern)
- ✅ Twitter card wired to dynamic `/api/og` route
- ✅ Dockerfile pinned to `--frozen-lockfile --prod=false`

### API security
- ✅ `src/lib/rate-limit.ts` — in-memory token bucket (10 req/60s/IP)
- ✅ `src/lib/api-helpers.ts` — Zod `parseBody()`, `requireEnv()`, 429 helper
- ✅ `src/middleware.ts` — CORS allowlist via `ALLOWED_ORIGINS` env
- ✅ All 7 API routes (`chat, newsletter, review, referral, guide-lead, quiz-lead, og`) hardened
- ✅ `localhost:8090` fallback removed; fail-fast on missing `API_URL`

### IA cleanup (page consolidation)
- ✅ 308 redirects: `/pricing` → `/services`, `/get-started` → `/services`, `/mentors` → `/about#team`, `/quiz` → `/resources/ai-readiness`, `/discovery` → `/resources/ai-readiness`, `/courses` → `/academy`
- ✅ 6 legacy directories deleted
- ✅ `/about` expanded 47 → 230 lines (mission, founder, team, values, Organization schema)
- ✅ `floating-cta-bar` dual-conflict fix at `md` breakpoint
- ✅ `exit-intent-popup` migrated `sessionStorage` → `localStorage` 7-day TTL
- ✅ `social-proof-toast` feature-flagged off (env `NEXT_PUBLIC_SOCIAL_PROOF`)

### SEO/Metadata
- ✅ `src/lib/metadata.ts` — `getPageMetadata()` helper
- ✅ Applied to 14 pages with `path`, canonical, OG (en_AU), Twitter
- ✅ `FAQSchema` rendered globally in layout
- ✅ Schema added: `BlogPosting`, `Blog`, `Organization`, `AggregateRating`, `Review[]`, `Course`, `Service`, `Article`, `BreadcrumbList`
- ✅ `public/og-image.svg` 1200×630 brand fallback
- ✅ `src/lib/site-config.ts` shared `CONTACT_EMAIL`, `SITE_URL`, `BRAND_NAME`

### Accessibility
- ✅ Quiz: `role="radiogroup/radio"`, `aria-checked`, progressbar
- ✅ Forms: `aria-required`, `aria-invalid`, `aria-describedby`, `role="alert" aria-live="polite"`, `aria-busy`
- ✅ FAQ: `aria-expanded` + `aria-controls`
- ✅ `<img>` → `next/image` (nav, page, TestimonialCarousel)
- ✅ Phone input: `pattern` + `inputMode="tel"`
- ✅ Tree-shake 9 unused lucide icons

---

## P1 — Foundation (Frontend scaffold complete; backend pending) 🟡

### What's live (frontend) ✅
| Deliverable | URL | Status |
|---|---|---|
| Resources hub | `/resources` | ✅ 6-card hub |
| AI Readiness Assessment | `/resources/ai-readiness` | ✅ 12-Q quiz, 4 dimensions, scoring 0–36, 3-tier classification, ROI estimate, 3 prioritised recommendations, email capture |
| ROI Calculator | `/resources/roi-calculator` | ✅ Wraps existing component |
| Academy hub | `/academy` | ✅ 5 paths + 3 "Coming Soon" |
| Beginner AI path | `/academy/beginner-ai` | ✅ 8 lessons listed, A$49 |
| AI for Business path | `/academy/ai-for-business` | ✅ 10 lessons listed, A$99 |
| AI Productivity path | `/academy/ai-productivity` | ✅ 8 lessons listed, A$59 |
| Prompt Engineering path | `/academy/prompt-engineering` | ✅ 8 lessons listed, A$79 |
| AI Automation path | `/academy/ai-automation` | ✅ 10 lessons listed, A$149 |

### What's pending (backend — needs GCP credentials) ⏳
| Deliverable | Status | Blocker |
|---|---|---|
| Firebase Auth migration | 📝 Client SDK scaffold ready (`src/lib/firebase-client.ts`, dynamic-import safe) | GCP project + Firebase Auth provider config |
| Vertex AI scoring for assessment | ⏳ Currently client-side heuristic | Vertex AI quota approval |
| Vertex AI Search RAG (mentor) | ⏳ Architecture documented in INFRASTRUCTURE.md | Discovery Engine quota |
| Lesson video player + progress | ⏳ Lesson schema defined; pages stub only | Firestore activation, content pipeline |
| Stripe metered billing | ⏳ Existing checkout works for fixed prices | Stripe metered SKU setup |
| Onboarding wizard | ⏳ Routes reserved (`app.longcare.au`) | Auth dependency |
| BigQuery analytics export | ⏳ APIs enabled in Terraform | GA4 + BQ link |

---

## P2 — Automation Platform (Industry preview live) 🟡

### What's live ✅
| Deliverable | URL | Status |
|---|---|---|
| Solutions hub | `/solutions` | ✅ 7 industries |
| Healthcare | `/solutions/healthcare` | ✅ Pain points, AHPRA compliance, 4 workflows |
| Retail | `/solutions/retail` | ✅ Shopify-friendly, 5 workflows |
| Hospitality | `/solutions/hospitality` | ✅ 4 workflows |
| Real Estate | `/solutions/real-estate` | ✅ 4 workflows |
| Trades | `/solutions/trades` | ✅ 4 workflows |
| Education | `/solutions/education` | ✅ AU curriculum-aligned, 4 workflows |
| Professional Services | `/solutions/professional-services` | ✅ TPB/legal-friendly, 4 workflows |

**Total pre-built workflows listed: 30**

### What's pending ⏳
- Toolkit (7 mini-apps): email-assistant, document-generator, proposal-writer, meeting-assistant, customer-support, social-media, hr-assistant
- Workflow builder UI + runtime (`services/workflow`, Pub/Sub, Cloud Tasks)
- Industry templates seed data
- Embeddable chatbot widget for SME sites

---

## P3 — AI Agent Marketplace ⚪ (not started)

Reserved routes (will build in P3):
- `/agents`, `/agents/business`, `/agents/industry`, `/agents/[slug]` × 12
- `/agents/automation-packages`, `/agents/deployment-services`

---

## P4 — AI Ecosystem (Governance/Community marketing scaffold live) 🟡

### What's live ✅

**Governance suite:**
| Deliverable | URL | Status |
|---|---|---|
| Governance hub | `/governance` | ✅ 3-card hub |
| AI Policy Templates | `/governance/policies` | ✅ 6 templates listed (Acceptable Use, Data Handling, Vendor, Output Review, Incident, Customer Disclosure) |
| Risk Assessment landing | `/governance/risk-assessment` | ✅ 4-dimension framework + waitlist form |
| Responsible AI Framework | `/governance/responsible-ai` | ✅ 7 principles + 4 reference frameworks (APP, OAIC, AU AI Ethics, ISO/IEC 42001) |

**Community:**
| Deliverable | URL | Status |
|---|---|---|
| Community hub | `/community` | ✅ 5-card hub + newsletter |
| Events | `/community/events` | ✅ 3 upcoming + 3 past |
| Workshops | `/community/workshops` | ✅ 4 workshops, A$149–A$199, capacity 12 |
| Bootcamps | `/community/bootcamps` | ✅ 2 bootcamps, A$1,499–A$1,899 |
| Partners | `/community/partners` | ✅ 3 tiers (Referrer 15%, Integration, Channel) + apply form |
| Network | `/community/network` | ✅ Slack/LinkedIn/Newsletter channels |

### What's pending ⏳
- Public API (OpenAPI 3.1 spec exists in `services/api`; need keys + metering)
- Partner marketplace runtime + Stripe Connect payouts
- Audit log dashboard (server-side)
- Risk assessment full interactive tool (Sprint 2 of governance)
- APAC i18n (vi/zh) + multi-currency
- Enterprise SSO/SCIM/VPC connector

---

## Infrastructure ready ✅ (deployable when GCP creds available)

`/infrastructure/` contains complete Terraform + scripts:
- 8 `.tf` files (services, firestore, iam, secrets, outputs, variables, main, .gitignore)
- 2 scripts (bootstrap.sh, deploy-cloudrun.sh)
- `firestore.rules` + `firestore.indexes.json`
- `infrastructure/README.md` quick-start
- `docs/longcare/INFRASTRUCTURE.md` 13-section playbook

**APIs enabled by Terraform (20):** firebase, identitytoolkit, firestore, aiplatform, discoveryengine, storage, cloudfunctions, cloudbuild, run, artifactregistry, secretmanager, pubsub, cloudtasks, cloudscheduler, logging, monitoring, bigquery, iamcredentials, serviceusage, cloudresourcemanager.

**Service accounts:** `longcare-api`, `longcare-agent`, `longcare-workflow`, `longcare-notification`.

**Firestore collections defined:** users, mentor_sessions, assessments, lesson_progress, agents/{tenantId}/..., public, audit_logs.

**Cost sketch (AUD/month, australia-southeast1):**
- Phase 1 soft launch (≤500 MAU): ~$180/mo
- Phase 2 growth (5k MAU): ~$2,000/mo
- Phase 3 scale (50k MAU): ~$15–20k/mo

---

## Site stats — current state

| Metric | Pre-P0 | Post-P0 | Now |
|---|---|---|---|
| Static routes | 25 | 30 | **47** |
| Dynamic API routes | 6 | 7 | **7** |
| Total routes | 31 | 37 | **54** |
| Source files (`.ts/.tsx`) | 69 | 70 | **115+** |
| Sitemap entries | ~18 | 14 | **40** |
| Languages | en | en | **en** (i18n in P4) |
| First Load JS (homepage) | 175 kB | 180 kB | **182 kB** |
| Middleware bundle | 0 | 32.6 kB | **32.6 kB** |
| TypeScript errors | n/a | 0 | **0** |
| Lighthouse SEO target | n/a | ≥95 | **≥95** (run after deploy) |

---

## Deployment readiness (2026-05-10)

### Phase E — Extraction (2026-05-10)

Standalone repo scaffolded at `/home/longcare.au/`. Extracted from `apps/web-longcare/`. Ships independently of the monorepo from this point.

**Completed:**
- ✅ Standalone repo scaffolded at `/home/longcare.au/`
- ✅ Source migrated (zero `@bookedai/shared` dependency — confirmed via grep)
- ✅ Standalone `Dockerfile` (multi-stage, Node 22-slim, non-root, healthcheck)
- ✅ Container orchestration: `docker-compose.yml`, `k8s/` manifests, Kustomization with dev/staging/prod overlays
- ✅ Cloud Run + Terraform infrastructure under `infrastructure/`
- ✅ GitHub Actions: `ci`, `deploy-cloud-run`, `deploy-k8s`, `security`, `preview` (5 workflows)
- ✅ Cloud Build pipeline (`cloudbuild.yaml`) as alternative
- ✅ Operator scripts: `init-repo.sh`, `deploy.sh`, `local-dev.sh`, `lint-fix.sh`
- ✅ Independent docs: `README.md`, `EXTRACTION_GUIDE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/OPERATIONS.md`, `docs/CONTENT_AUTHORING.md`

**⏳ Pending operator action:**
1. `cd /home/longcare.au && pnpm install`
2. Verify `pnpm build` passes (must produce `.next/standalone/` output)
3. `./scripts/init-repo.sh git@github.com:USER/longcare-au.git` (replace remote)
4. Push to GitHub
5. Configure GCP secrets in GitHub Actions (`GCP_PROJECT_ID`, `WIF_PROVIDER`, `GCP_SERVICE_ACCOUNT`, `NEXT_PUBLIC_*`)
6. First Docker build + Cloud Run preview deploy with `--no-traffic --tag=preview`
7. Verify migration checklist (see `EXTRACTION_GUIDE.md`)
8. Traffic switch from monorepo PM2 to standalone Cloud Run (10% → 50% → 100%)
9. Map custom domain `longcare.au` to Cloud Run service
10. Park monorepo PM2 process for 14 days as fallback

**Rollback window:** 14 days from first traffic switch. After window closes cleanly, delete `apps/web-longcare/` from monorepo.

---

### Build status
- ✅ `pnpm build` succeeds, 78 routes (47 static + 7 dynamic + middleware)
- ✅ TypeScript: 0 errors
- ✅ `pnpm-lock.yaml` deterministic
- ✅ Dockerfile updated to `node:22-slim` + `pnpm@10.33.2` (Node 22 needed for latest pnpm)

### Cloud Run deploy script ready
File: `infrastructure/scripts/deploy-longcare.sh` (executable). Wraps:
1. Artifact Registry repo create (idempotent)
2. `gcloud builds submit --tag` for Dockerfile build
3. `gcloud run deploy web-longcare` with env vars + memory + concurrency
4. Returns service URL

### Required to deploy
The dev VM's compute service account has **read-only scopes** (cannot create Cloud Build / Cloud Run / Artifact Registry). Deploy must be run from a machine with admin credentials:

```bash
# From a workstation with personal/admin gcloud auth:
gcloud auth login
gcloud config set project <YOUR_PROJECT_ID>
gcloud auth configure-docker australia-southeast1-docker.pkg.dev

cd /path/to/g.bookedai.au
./infrastructure/scripts/deploy-longcare.sh
```

Optional env overrides:
- `PROJECT_ID` (default: gcloud default project)
- `REGION` (default: `australia-southeast1`)
- `SERVICE_NAME` (default: `web-longcare`)
- `MEMORY` (default: 512Mi)
- `NEXT_PUBLIC_*`, `ALLOWED_ORIGINS` (defaults wired for production longcare.au)

### After first deploy
1. Map custom domain: `gcloud beta run domain-mappings create --service=web-longcare --domain=longcare.au --region=australia-southeast1`
2. Update DNS CNAME / A records per Google's instructions
3. Submit sitemap to Google Search Console: `https://longcare.au/sitemap.xml`
4. Verify Twitter card: https://cards-dev.twitter.com/validator
5. Verify Schema.org: https://validator.schema.org/

---

## Next steps for stakeholder

### Immediate (this week)
1. **Approve deploy** — confirm GCP project + region for first preview/prod deploy
2. **Run** `./infrastructure/scripts/deploy-longcare.sh` from workstation with admin gcloud credentials
3. **Map** `longcare.au` custom domain after first successful deploy

### Sprint P1 backend (next 2-3 weeks, requires creds)
1. Apply for **Google Cloud for Startups** credits (covers ~14 months at Phase 1 spend)
2. Apply for **Vertex AI quota uplift** (default 60 RPM insufficient for production)
3. Run `infrastructure/scripts/bootstrap.sh` with `BILLING_ACCOUNT` set to provision Terraform stack
4. **`pnpm add firebase`** in `apps/web-longcare` — wire `firebase-client.ts` to live Firebase Auth
5. Build assessment server-side scoring on Vertex AI (replace client heuristic in `/resources/ai-readiness`)
6. Wire lesson video player + Firestore progress tracking on academy paths

### Sprint P2 backend
1. Build `services/agent` toolkit endpoint (1 endpoint per tool, Gemini 2.0 Flash)
2. Stripe metered billing setup for SME plan (A$29/mo, free tier 100 runs)
3. Toolkit dashboard at `app.longcare.au/toolkit` (authed users)

### Sprint P3 backend
1. Build `services/agent-runtime` (multi-step agent execution, Cloud Run jobs)
2. Wire 1 agent end-to-end as pilot (recommend: Scheduling AI — smallest tool surface)
3. Open enrolment for first 5 pilot customers

### Sprint P4 polish
1. **Run** `pnpm add next-intl` and follow `docs/longcare/I18N_GUIDE.md` to enable Vietnamese + Mandarin
2. Native marketing reviewer audit `messages/{vi,zh}.json`
3. Lawyer sign-off on `/governance/*` policy templates if used as binding contracts

See `IMPLEMENTATION_PLAN.md` §15 for the 6 open stakeholder questions.

---

## Sprint 7 — Live site polish (2026-05-11)

### Image hygiene
- ✅ Renamed banner asset for clarity in `apps/web-longcare/public` and `/home/longcare.au/public`
- ✅ Verified 6 legacy PNGs (`bookedai-logo.png`, `logo-light.png`, `longcare_banner.png`, `longcare_logo_final.png`, `longcare_logo_footer.png`, `longcare_logo_latest.png`) had 0 references in `src/` across both repos
- ✅ Deleted 12 unused PNG files (6 per repo) — **~12.83 MB freed** (6,725,138 bytes per repo × 2)

### Standalone deploy automation
- ✅ `scripts/start-next-standalone.sh` now syncs `public/` + `.next/static/` into the standalone tree before `exec server.js`
- ✅ Uses `rsync -a --delete` when available (idempotent + fast), falls back to `cp -r`
- ✅ Eliminates the manual copy step previously required after each PM2 reload — Next.js standalone output omits these directories by design
- ✅ Public assets (logos, OG images, manifest, sw.js) and Next.js static bundles now serve correctly on every reload

### Accessibility
- ✅ 70 placeholder `href` attributes audited and accessibilised across marketing surfaces (button semantics, aria-label, focus visible)
- ✅ 9 forms gained submit guards (`disabled` while in-flight) + `aria-busy="true"` during async submission
- ✅ Eliminates double-submit risk and announces loading state to assistive tech

### Repo hygiene (standalone `/home/longcare.au`)
- ✅ Confirmed `.gitignore` already excludes `node_modules`, `.next`, `out`, `dist`, `*.tsbuildinfo`, `.env`, `.env.local`, `.env.*.local`
- ✅ Build artifacts will not be committed on next push

### Files touched
- `apps/web-longcare/public/` — 6 PNGs removed
- `/home/longcare.au/public/` — 6 PNGs removed
- `scripts/start-next-standalone.sh` — added rsync/cp sync block before `exec`
- `docs/longcare/IMPLEMENTATION_PROGRESS.md` — this sprint entry

---

## Sprint 9 — Activate hooks + content engine (2026-05-12)

### What shipped
- ✅ Husky + ESLint + Prettier activated on standalone repo
- ✅ Pre-commit hook: lint-staged + image budget check
- ✅ pnpm install hooks: husky auto-init via prepare script
- ✅ 10 new academy lessons (lessons 13-14, push to 70 total)
- ✅ Roadmap + changelog updated with Sprint 7-9 deliverables
- ✅ GitHub: dovanlongaus-hub/longcare-au synced (6 commits)

### Cumulative numbers (post Sprint 9)
- Live URLs: 184 (was 174)
- Academy lessons: 70 (was 60)
- GitHub commits: 6 (was 5)
- Configs in standalone: husky, eslint, prettier, lint-staged ready
- Pre-commit guards: lint + format + image budget

### What's pending
- Operator: configure GCP secrets in GitHub Actions
- Operator: first Cloud Run deploy via `git tag v1.0.0 && git push --tags`
- Backend P1: needs GCP credentials (Firebase Auth + Vertex AI)
