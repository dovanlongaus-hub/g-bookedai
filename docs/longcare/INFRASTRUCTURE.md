# LongCare.au — Infrastructure Guide

> Sprint P1 backend onboarding playbook. End-to-end walkthrough from "no GCP
> project" to "first Cloud Run deploy with Firebase Auth wired to the web app."
>
> Companion files:
> - [`infrastructure/README.md`](../../infrastructure/README.md) — quick start
> - [`infrastructure/terraform/`](../../infrastructure/terraform/) — IaC source
> - [`infrastructure/firestore.rules`](../../infrastructure/firestore.rules)
> - [`apps/web-longcare/src/lib/firebase-client.ts`](../../apps/web-longcare/src/lib/firebase-client.ts)

---

## 1. Prerequisites

| Tool | Version | Notes |
|---|---|---|
| `gcloud` | ≥ 480 | `gcloud components update` |
| `terraform` | ≥ 1.6 | `tfenv install 1.9.5` recommended |
| `firebase-tools` | ≥ 13 | `npm i -g firebase-tools` |
| `pnpm` | ≥ 9 | already pinned in monorepo |
| Node | 20 LTS | matches Cloud Run base |

GCP roles required on the **billing account** for the operator running
bootstrap:

- `roles/billing.user`
- `roles/resourcemanager.projectCreator` (or `roles/resourcemanager.folderAdmin`)
- `roles/iam.organizationRoleAdmin` (only if you want custom roles later)

Run once per workstation:

```bash
gcloud auth login
gcloud auth application-default login
gcloud config set core/disable_prompts true   # optional, for CI
```

---

## 2. GCP project bootstrap

### 2.1 Pick a project ID

Convention used by Terraform variables:

| Env | Project ID | Description |
|---|---|---|
| prod | `longcare-prod` | Public traffic. Delete-protection on. |
| staging | `longcare-staging` | Mirror of prod for QA. |
| dev | `longcare-dev` | Sandbox. Cheap quotas. |

Project IDs are globally unique — append a 3-char suffix if taken
(`longcare-prod-au1`, etc.).

### 2.2 Run the bootstrap

```bash
export PROJECT_ID=longcare-prod
export BILLING_ACCOUNT=0X0X0X-0X0X0X-0X0X0X   # gcloud beta billing accounts list
export REGION=australia-southeast1
export ENV=prod
# Optional:
# export ORG_ID=123456789012
# export AUTO_APPROVE=true

./infrastructure/scripts/bootstrap.sh
```

What happens (idempotent):

1. `gcloud projects create longcare-prod` (skipped if exists)
2. `gcloud beta billing projects link …`
3. Enable bootstrap APIs (Resource Manager, Service Usage, IAM, Storage)
4. Create versioned GCS bucket `gs://longcare-prod-tfstate`
5. `terraform init` against that bucket
6. `terraform apply` — provisions everything described in §6

If anything fails halfway, just re-run; every step is conditional.

---

## 3. Apply for quota uplift

Defaults are too low for AI workloads. Submit these requests **on day one** —
they take 24–72h.

### 3.1 Vertex AI (Gemini)

- IAM & Admin → **Quotas** → filter `aiplatform.googleapis.com`
- Increase:
  - `Online prediction requests per minute per region` → **600**
  - `Generate content requests per minute per region` → **600**
  - `Tokens per minute per region` (text-bison/gemini) → **2,000,000**

### 3.2 Vertex AI Search (Discovery Engine)

- `discoveryengine.googleapis.com`
- Increase:
  - `Search requests per minute` → **300**
  - `Document import requests per day` → **50**

### 3.3 Cloud Run

- `run.googleapis.com`
- Default of 1000 concurrent CPU is fine. Bump only if traffic exceeds expectations.

### 3.4 Firebase Authentication

- No quota request needed for ≤50k MAU on Spark/Blaze.

Templates for justifications (paste into the request form):

> "Customer-facing AI mentor product targeting Australian aged-care workforce.
> Expected 10k MAU year 1, ~30 Gemini calls per session, average session length
> 12 minutes. Please uplift to support our launch baseline."

---

## 4. Apply for Google Cloud for Startups credits

LongCare/bookedai qualify under the AI track. Up to **USD 100k** in credits
(Series A) or **USD 25k** (pre-seed).

- Apply: <https://cloud.google.com/startup>
- Required: company registration (ACN), pitch deck, founder LinkedIn, target
  GCP spend, expected scale.
- Stack on top of: NVIDIA Inception, AWS Activate (we are GCP-first; don't run
  workloads on AWS, but Activate credits are good for SaaS tooling).

Once approved, the GCP credits land on the billing account; bootstrap remains
unchanged.

---

## 5. Terraform apply workflow

### 5.1 Manual run (after first bootstrap)

```bash
cd infrastructure/terraform
terraform init -reconfigure \
  -backend-config="bucket=longcare-prod-tfstate" \
  -backend-config="prefix=longcare/prod"

terraform plan -var="project_id=longcare-prod" -var="env=prod"
terraform apply -var="project_id=longcare-prod" -var="env=prod"
```

### 5.2 What gets created

| Resource | Count | Notes |
|---|---|---|
| `google_project_service` | 20 | Firebase, Vertex AI, Run, Pub/Sub, Tasks, Scheduler, Logging, Monitoring, BigQuery, Discovery Engine, Artifact Registry, Secret Manager, IAM, Cloud Build, Functions, Storage |
| `google_firestore_database` | 1 | Native mode, `australia-southeast1`, PITR on |
| `google_storage_bucket` | 1 | Firestore backups, 30-day lifecycle |
| `google_service_account` | 4 | api, agent, workflow, notification |
| `google_project_iam_member` | ~25 | least-priv role bindings |
| `google_secret_manager_secret` | 8 | gemini, openai, stripe×2, xero, firebase-admin, twilio, google-oauth |
| `google_secret_manager_secret_iam_member` | ~14 | per-SA accessor grants |

### 5.3 State

State lives in `gs://${PROJECT_ID}-tfstate/longcare/${ENV}`. Versioning is on,
so accidental `destroy` can be rolled back via `gsutil ls -a` + restore.

### 5.4 Drift detection

Cron job (Sprint P2): `terraform plan -detailed-exitcode` in CI nightly →
alert if exit `2`.

---

## 6. Cloud Run deployment per service

After bootstrap, deploy each service in `services/` to its own Cloud Run
service. The deploy helper takes the runtime SA email from Terraform outputs:

```bash
SA_API=$(terraform -chdir=infrastructure/terraform output -raw service_account_emails | jq -r .api)

SERVICE=api \
PROJECT_ID=longcare-prod \
REGION=australia-southeast1 \
SA_EMAIL=$SA_API \
SOURCE_DIR=services/api \
ENV_VARS="NODE_ENV=production,LOG_LEVEL=info" \
SECRETS="STRIPE_SECRET_KEY=stripe-secret-key:latest,STRIPE_WEBHOOK_SECRET=stripe-webhook-secret:latest" \
./infrastructure/scripts/deploy-cloudrun.sh
```

Suggested per-service config:

| Service | CPU | Memory | Min | Max | Concurrency | Public? |
|---|---|---|---|---|---|---|
| api | 1 | 512Mi | 1 | 20 | 80 | yes (allow-unauth, JWT/Firebase enforces) |
| agent | 2 | 1Gi | 0 | 10 | 1 | no (private) |
| notification | 1 | 256Mi | 0 | 5 | 80 | no (Pub/Sub push) |
| workflow | 1 | 256Mi | 0 | 5 | 80 | no |
| drive-sync | 1 | 512Mi | 0 | 3 | 1 | no |
| design-agent | 1 | 1Gi | 0 | 3 | 1 | no |
| accounting-sync | 1 | 256Mi | 0 | 2 | 1 | no |

For private services, grant `roles/run.invoker` on the workflow SA (already
done in `iam.tf`).

---

## 7. Firebase Auth setup

### 7.1 Register the web app

Firebase Console → `longcare-prod` → Project settings → **General** → Add app
→ Web. Copy the config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=longcare-prod.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=longcare-prod
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=longcare-prod.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=1:...:web:...
```

Paste into:

- `apps/web-longcare/.env.local` (dev)
- Cloud Run env vars on every web service for staging/prod

### 7.2 Enable providers

Authentication → Sign-in method → enable:

- Google (with OAuth 2.0 client; auto-created)
- Email link (passwordless)
- (later) Apple, Microsoft, OIDC for Australian Digital Identity

### 7.3 Authorised domains

Add: `longcare.au`, `app.longcare.au`, `book.longcare.au`, `localhost`,
`*.run.app` (only if doing Cloud Run preview URLs).

### 7.4 Server-side verification

`services/api` uses Firebase Admin SDK with the
`firebase-admin-service-account` secret (service-account JSON). Token verify:

```ts
const decoded = await admin.auth().verifyIdToken(idToken);
```

### 7.5 Custom claims (roles + tenant)

Use a one-off admin script (or `services/api` admin endpoint):

```ts
await admin.auth().setCustomUserClaims(uid, { role: 'mentor', tenant: 'longcare' });
```

These claims are required by `firestore.rules` (`hasRole`, `tenantMatches`).

---

## 8. Firestore + security rules deploy

```bash
firebase use longcare-prod
firebase deploy --only firestore:rules,firestore:indexes
```

The deploy reads:

- `infrastructure/firestore.rules`
- `infrastructure/firestore.indexes.json`

Hook them into the `firebase.json` at repo root (Sprint P1 next step) so
`firebase deploy` picks them up automatically. Until that exists, deploy
explicitly with `--config infrastructure/firebase.json` after authoring it.

### Index changes

Edit `firestore.indexes.json` and re-deploy. Index builds take 5–60 minutes
on existing data; plan accordingly.

### Rules testing

```bash
pnpm dlx @firebase/rules-unit-testing
# author tests under tests/firestore-rules/*.spec.ts
```

---

## 9. Cloud Scheduler / Pub/Sub topics needed

These should be created in a follow-up Terraform module (`pubsub.tf` /
`scheduler.tf`) once payload schemas are agreed. Reserve the topic names now
to avoid breaking changes later:

| Topic | Producer | Subscribers |
|---|---|---|
| `mentor.session.scheduled` | api | notification |
| `mentor.session.completed` | api | learning-agent, marketing-agent |
| `assessment.completed` | api | learning-agent |
| `lesson.progress.updated` | api | analytics |
| `payment.succeeded` | api | accounting-sync, notification |
| `payment.failed` | api | notification |
| `marketing.content.approved` | admin-app | marketing-agent |
| `notification.send` | * | notification |

Cloud Scheduler jobs:

| Job | Cron | Target |
|---|---|---|
| `firestore-export-daily` | `0 18 * * *` (UTC) | Cloud Run `services/api/admin/firestore-export` → backup bucket |
| `mentor-session-reminders` | `*/15 * * * *` | api `/cron/session-reminders` |
| `lesson-progress-rollup` | `0 16 * * *` | api `/cron/progress-rollup` |
| `stripe-webhook-replay-check` | `0 * * * *` | api `/cron/webhook-replay-check` |

---

## 10. Cost estimate (rough monthly per phase)

> Sketch only. Actual depends on traffic. All in AUD, prod env, AU region.

### Phase 1 — soft launch (≤ 500 MAU)

| Service | Est cost |
|---|---|
| Cloud Run (7 services, low traffic) | $20 |
| Firestore (≤ 5 GB, ≤ 5M reads/mo) | $20 |
| Vertex AI Gemini (≤ 1M tokens/day) | $80 |
| Vertex AI Search | $30 |
| Cloud Storage (assets + backups) | $5 |
| Pub/Sub + Cloud Tasks | $5 |
| Logging + Monitoring | $10 |
| BigQuery (GA4 export) | $10 |
| Secret Manager | $1 |
| **Total** | **~$180/mo** |

GCP startup credits cover ~14–16 months at this rate.

### Phase 2 — growth (5k MAU)

| Service | Est cost |
|---|---|
| Cloud Run (autoscaled) | $200 |
| Firestore (~50 GB, 100M reads/mo) | $250 |
| Vertex AI Gemini | $1,200 |
| Vertex AI Search | $200 |
| Storage + backups | $40 |
| Pub/Sub + Tasks + Scheduler | $30 |
| Logging + Monitoring (12 mo retention) | $80 |
| BigQuery | $80 |
| **Total** | **~$2,000/mo** |

### Phase 3 — scale (50k MAU)

Roughly **~$15–20k/mo**. Vertex AI dominates; consider:

- Move heavy embedding jobs to batch.
- Cache Gemini responses for common assessments.
- Migrate hot reads to Firestore bundles + CDN-edge.

---

## 11. Troubleshooting

### `terraform apply` fails on API enablement

- "Permission denied to enable service": confirm operator has
  `roles/serviceusage.serviceUsageAdmin` and `roles/iam.serviceAccountAdmin`
  on the project.
- "Billing must be enabled": `gcloud beta billing projects link …`.

### Firestore creation fails with "ALREADY_EXISTS"

The `(default)` Firestore database is single-per-project. Either import the
existing database into Terraform state:

```bash
terraform import google_firestore_database.longcare projects/longcare-prod/databases/(default)
```

…or pick a fresh project ID.

### Cloud Run can't access a secret

- Confirm the runtime SA matches `outputs.tf` `service_account_emails`.
- Re-check `secrets.tf::secret_consumers` — add the SA → secret pair if
  missing, then `terraform apply`.

### Firebase Auth login fails with `auth/invalid-api-key`

The `NEXT_PUBLIC_FIREBASE_API_KEY` env is missing or stale. Pull a fresh copy
from Firebase Console → Project settings → Web app config.

### `firebase-client.ts` console-warns "firebase package not installed"

That's expected until `pnpm add firebase` runs. The lib is designed to be a
no-op until the SDK arrives — see comment block in the file.

### Quota exceeded on Vertex AI

You hit the default 60 RPM. Submit the quota uplift in §3.1; wait 24–72h. In
the meantime, exponential backoff in `services/agent` (`@google-cloud/aiplatform`
already retries 429s).

### Pub/Sub messages stuck in "unacknowledged"

Most common: Cloud Run service is private and the Pub/Sub push subscription
SA lacks `roles/run.invoker`. Bind it:

```bash
gcloud run services add-iam-policy-binding <service> \
  --member=serviceAccount:longcare-workflow@longcare-prod.iam.gserviceaccount.com \
  --role=roles/run.invoker --region=australia-southeast1
```

---

## 12. Roll-back & disaster recovery

| Failure | Recovery |
|---|---|
| Bad rules deploy | `firebase firestore:rules:rollback` (Console → previous version) |
| Bad Cloud Run revision | `gcloud run services update-traffic <svc> --to-revisions <prev>=100` |
| Firestore data corruption | Restore from PITR (within 7 days) or backup bucket export (daily, 30-day retention) |
| Secret leaked | `gcloud secrets versions disable …` → rotate at provider → add new version |
| Project compromise | `gcloud projects update --no-organization`, raise GCP support, rotate every secret |

---

## 13. Sign-off checklist (Sprint P1 exit)

- [ ] `bootstrap.sh` ran cleanly for `longcare-prod`
- [ ] Quota uplift submitted (Vertex AI, Discovery Engine)
- [ ] Startup credits applied
- [ ] All 8 secrets have at least one version
- [ ] Firebase Web app config in `apps/web-longcare/.env.local`
- [ ] Firebase Auth: Google + Email link enabled, domains authorised
- [ ] Firestore rules + indexes deployed (`firebase deploy --only firestore`)
- [ ] First Cloud Run service (`api`) deployed and `/health` returns 200
- [ ] Cost alert configured at $300/mo, $1,000/mo (Cloud Billing)
