# Deployment Guide — bookedai.au

## Prerequisites

1. Google Cloud project (`longcare-prod`) with billing enabled
2. `gcloud` CLI authenticated
3. Artifact Registry repository created
4. GitHub repo secrets configured

## Step 1: Enable Google Cloud APIs

```bash
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com \
  sqladmin.googleapis.com \
  firestore.googleapis.com \
  pubsub.googleapis.com \
  cloudscheduler.googleapis.com \
  cloudtasks.googleapis.com \
  aiplatform.googleapis.com \
  generativelanguage.googleapis.com \
  calendar-json.googleapis.com \
  gmail.googleapis.com \
  drive.googleapis.com \
  docs.googleapis.com \
  translate.googleapis.com
```

## Step 2: Create Artifact Registry

```bash
gcloud artifacts repositories create bookedai-services \
  --repository-format=docker \
  --location=australia-southeast1
```

## Step 3: Create Cloud SQL Instance

```bash
gcloud sql instances create longcare-db \
  --database-version=POSTGRES_16 \
  --tier=db-f1-micro \
  --region=australia-southeast1 \
  --storage-auto-increase

gcloud sql databases create longcare --instance=longcare-db
gcloud sql users set-password postgres --instance=longcare-db --password=<SECURE_PASSWORD>
```

## Step 4: Store Secrets

```bash
echo -n "AIzaSy..." | gcloud secrets create GEMINI_API_KEY --data-file=-
echo -n "sk_live_..." | gcloud secrets create STRIPE_SECRET_KEY --data-file=-
echo -n "whsec_..." | gcloud secrets create STRIPE_WEBHOOK_SECRET --data-file=-
echo -n "postgresql://..." | gcloud secrets create DATABASE_URL --data-file=-
```

## Step 5: Deploy (Manual)

```bash
# Build and push API
docker build -t australia-southeast1-docker.pkg.dev/longcare-prod/bookedai-services/api:latest services/api
docker push australia-southeast1-docker.pkg.dev/longcare-prod/bookedai-services/api:latest

# Deploy API to Cloud Run
gcloud run deploy api-g-bookedai \
  --image australia-southeast1-docker.pkg.dev/longcare-prod/bookedai-services/api:latest \
  --region australia-southeast1 \
  --platform managed \
  --port 8080 \
  --memory 512Mi \
  --set-secrets "GEMINI_API_KEY=GEMINI_API_KEY:latest,STRIPE_SECRET_KEY=STRIPE_SECRET_KEY:latest,DATABASE_URL=DATABASE_URL:latest" \
  --set-env-vars "NODE_ENV=production"
```

## Step 6: Deploy (CI/CD — Automated)

Push to `main` branch triggers `.github/workflows/deploy.yml`.

### Required GitHub Secrets

| Secret | Value |
|---|---|
| `GCP_PROJECT_ID` | `longcare-prod` |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | Workload Identity Federation provider |
| `GCP_SERVICE_ACCOUNT` | `github-actions@longcare-prod.iam.gserviceaccount.com` |

### Setup Workload Identity Federation

```bash
# Create service account
gcloud iam service-accounts create github-actions --display-name="GitHub Actions"

# Grant permissions
gcloud projects add-iam-policy-binding longcare-prod \
  --member="serviceAccount:github-actions@longcare-prod.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding longcare-prod \
  --member="serviceAccount:github-actions@longcare-prod.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

# Create workload identity pool
gcloud iam workload-identity-pools create github-pool \
  --location=global \
  --display-name="GitHub Pool"

gcloud iam workload-identity-pools providers create-oidc github-provider \
  --location=global \
  --workload-identity-pool=github-pool \
  --display-name="GitHub Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"
```

## Step 7: Run Migrations on Cloud SQL

```bash
# Connect to Cloud SQL proxy
gcloud sql connect longcare-db --user=postgres

# Run migrations
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/longcare pnpm db:migrate
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/longcare pnpm db:seed
```

## Step 8: Configure Domains

See `infra/cloudflare-dns.md` for DNS configuration.

## Monitoring

- Cloud Run metrics: https://console.cloud.google.com/run
- Cloud Logging: https://console.cloud.google.com/logs
- Error Reporting: https://console.cloud.google.com/errors
