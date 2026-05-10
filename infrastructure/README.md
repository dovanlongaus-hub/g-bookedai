# LongCare Infrastructure

Infrastructure-as-Code scaffold for `longcare.au` — a Sprint P1 deliverable that
prepares everything we need on GCP before backend services move from
`bookedai.au` shared infra to a dedicated tenant project.

## Layout

```
infrastructure/
├── README.md                # this file (quick start)
├── firestore.rules          # Firestore security rules
├── firestore.indexes.json   # Firestore composite indexes
├── scripts/
│   ├── bootstrap.sh         # one-shot: project + APIs + tf init+apply
│   └── deploy-cloudrun.sh   # generic Cloud Run deploy helper
└── terraform/
    ├── main.tf              # providers + GCS backend
    ├── variables.tf         # inputs (project_id, region, env, ...)
    ├── outputs.tf           # SA emails, project id, firestore name
    ├── services.tf          # GCP API enablement (~20 APIs)
    ├── firestore.tf         # Firestore database + backup bucket
    ├── iam.tf               # 4 service accounts + IAM bindings
    ├── secrets.tf           # 8 Secret Manager secrets + accessor IAM
    └── .gitignore
```

For the long-form guide (project bootstrap, quotas, credits, deploy sequence,
cost estimate, troubleshooting) see [`docs/longcare/INFRASTRUCTURE.md`](../docs/longcare/INFRASTRUCTURE.md).

## Prerequisites

- `gcloud` CLI ≥ 480.0.0 ([install](https://cloud.google.com/sdk/docs/install))
- `terraform` ≥ 1.6.0 ([install](https://developer.hashicorp.com/terraform/install))
- `gsutil` (bundled with `gcloud`)
- A GCP billing account (required to create new projects)
- Owner / Project Creator IAM role on the org or folder

```bash
gcloud auth login
gcloud auth application-default login
```

## One-shot bootstrap

```bash
export PROJECT_ID=longcare-prod
export BILLING_ACCOUNT=0X0X0X-0X0X0X-0X0X0X
export REGION=australia-southeast1
export ENV=prod
# optional: ORG_ID, AUTO_APPROVE=true

./infrastructure/scripts/bootstrap.sh
```

The script is **idempotent**:

1. Creates the GCP project (if missing) and links billing.
2. Enables bootstrap APIs (`cloudresourcemanager`, `serviceusage`, `iam`,
   `iamcredentials`, `storage`).
3. Creates a versioned GCS bucket `gs://${PROJECT_ID}-tfstate` for Terraform
   remote state.
4. Runs `terraform init` against that bucket and `terraform apply` to create:
   - The full set of enabled APIs (Firebase, Vertex AI, Cloud Run, Pub/Sub,
     Cloud Tasks, Cloud Scheduler, BigQuery, etc.).
   - Firestore (Native mode) in `australia-southeast1` with PITR enabled.
   - A versioned GCS backup bucket with 30-day lifecycle.
   - 4 runtime service accounts (`api`, `agent`, `workflow`, `notification`)
     with least-privilege IAM bindings.
   - 8 Secret Manager secrets (versions are populated manually, never via
     Terraform).

## After bootstrap

1. **Populate secrets** (versions are NOT created by Terraform):

   ```bash
   echo -n "$GEMINI_KEY" | gcloud secrets versions add gemini-api-key --data-file=-
   echo -n "$STRIPE_SECRET" | gcloud secrets versions add stripe-secret-key --data-file=-
   # ... and so on for openai-api-key, stripe-webhook-secret, xero-client-secret,
   #     firebase-admin-service-account, twilio-auth-token, google-oauth-client-secret
   ```

2. **Configure Firebase Auth** (Console):
   - Add Web app for `longcare-prod`, copy the config to
     `apps/web-longcare/.env.local` as `NEXT_PUBLIC_FIREBASE_*` vars.
   - Enable providers: Google, Email link.
   - Add authorised domains: `longcare.au`, `app.longcare.au`,
     `book.longcare.au`, `localhost`.

3. **Deploy Firestore rules + indexes:**

   ```bash
   firebase deploy --only firestore:rules,firestore:indexes \
     --project=longcare-prod
   ```

4. **Deploy a service:**

   ```bash
   SERVICE=api \
   PROJECT_ID=longcare-prod \
   REGION=australia-southeast1 \
   SA_EMAIL=longcare-api@longcare-prod.iam.gserviceaccount.com \
   SOURCE_DIR=services/api \
   ./infrastructure/scripts/deploy-cloudrun.sh
   ```

## Multi-environment usage

Re-run the bootstrap with a different `PROJECT_ID` and `ENV`:

```bash
PROJECT_ID=longcare-staging ENV=staging BILLING_ACCOUNT=... ./infrastructure/scripts/bootstrap.sh
PROJECT_ID=longcare-dev     ENV=dev     BILLING_ACCOUNT=... ./infrastructure/scripts/bootstrap.sh
```

Each environment gets its own state bucket (`gs://<project>-tfstate`) and its
own Firestore + secrets. There is no shared state.

## Safety

- `*.tfstate*` and `*.tfvars` are git-ignored.
- Deletion protection is enabled on Firestore in `prod`.
- `disable_on_destroy = false` keeps APIs enabled if you ever
  `terraform destroy` (so transient teardown doesn't kill billing-attached
  services).
- Secrets are user-managed-replication and pinned to `australia-southeast1`
  for data-residency.
