#!/usr/bin/env bash
###############################################################################
# bootstrap.sh
#
# One-shot LongCare GCP bootstrap. Idempotent — re-run safely as the env
# changes. Performs:
#   1. Project create (if missing) + billing link
#   2. TF state bucket create + versioning
#   3. Terraform init/apply for the infrastructure/terraform/ module
#
# Usage:
#   PROJECT_ID=longcare-prod \
#   BILLING_ACCOUNT=0X0X0X-0X0X0X-0X0X0X \
#   ./infrastructure/scripts/bootstrap.sh
#
# Optional env vars:
#   REGION         (default: australia-southeast1)
#   ORG_ID         (default: empty)
#   ENV            (default: prod)
#   AUTO_APPROVE   (default: false; set to "true" for non-interactive apply)
###############################################################################

set -euo pipefail

PROJECT_ID="${PROJECT_ID:-longcare-prod}"
REGION="${REGION:-australia-southeast1}"
ENV="${ENV:-prod}"
ORG_ID="${ORG_ID:-}"
BILLING_ACCOUNT="${BILLING_ACCOUNT:?BILLING_ACCOUNT is required (e.g. 0X0X0X-0X0X0X-0X0X0X)}"
AUTO_APPROVE="${AUTO_APPROVE:-false}"

STATE_BUCKET="${PROJECT_ID}-tfstate"
TF_PREFIX="longcare/${ENV}"

# ---------------------------------------------------------------------------
# Pre-flight checks
# ---------------------------------------------------------------------------

if ! command -v gcloud >/dev/null 2>&1; then
  echo "ERROR: gcloud CLI not found. Install Google Cloud SDK first." >&2
  exit 1
fi

if ! command -v terraform >/dev/null 2>&1; then
  echo "ERROR: terraform not found. Install Terraform >= 1.6.0 first." >&2
  exit 1
fi

if ! command -v gsutil >/dev/null 2>&1; then
  echo "ERROR: gsutil not found. Install Google Cloud SDK first." >&2
  exit 1
fi

ACTIVE_ACCOUNT="$(gcloud config get-value account 2>/dev/null || true)"
if [[ -z "${ACTIVE_ACCOUNT}" || "${ACTIVE_ACCOUNT}" == "(unset)" ]]; then
  echo "ERROR: gcloud is not logged in. Run: gcloud auth login" >&2
  exit 1
fi

echo "==> Active gcloud account: ${ACTIVE_ACCOUNT}"
echo "==> Target project:        ${PROJECT_ID}"
echo "==> Region:                ${REGION}"
echo "==> Env:                   ${ENV}"
echo "==> TF state bucket:       gs://${STATE_BUCKET} (prefix=${TF_PREFIX})"
echo

# ---------------------------------------------------------------------------
# 1. Project create + billing link (idempotent)
# ---------------------------------------------------------------------------

if gcloud projects describe "${PROJECT_ID}" >/dev/null 2>&1; then
  echo "==> Project ${PROJECT_ID} already exists; skipping create."
else
  echo "==> Creating project ${PROJECT_ID}..."
  CREATE_ARGS=("${PROJECT_ID}" "--name=LongCare ${ENV}")
  if [[ -n "${ORG_ID}" ]]; then
    CREATE_ARGS+=("--organization=${ORG_ID}")
  fi
  gcloud projects create "${CREATE_ARGS[@]}"
fi

echo "==> Linking billing account..."
gcloud beta billing projects link "${PROJECT_ID}" \
  --billing-account="${BILLING_ACCOUNT}"

gcloud config set project "${PROJECT_ID}" >/dev/null

# ---------------------------------------------------------------------------
# 2. Enable bootstrap APIs (Terraform enables the rest)
# ---------------------------------------------------------------------------

echo "==> Enabling bootstrap APIs (cloudresourcemanager, serviceusage, iam, storage)..."
gcloud services enable \
  cloudresourcemanager.googleapis.com \
  serviceusage.googleapis.com \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  storage.googleapis.com \
  --project="${PROJECT_ID}"

# ---------------------------------------------------------------------------
# 3. Terraform state bucket
# ---------------------------------------------------------------------------

if gsutil ls -b "gs://${STATE_BUCKET}" >/dev/null 2>&1; then
  echo "==> TF state bucket gs://${STATE_BUCKET} already exists."
else
  echo "==> Creating TF state bucket gs://${STATE_BUCKET}..."
  gsutil mb -p "${PROJECT_ID}" -l "${REGION}" -b on "gs://${STATE_BUCKET}"
fi

gsutil versioning set on "gs://${STATE_BUCKET}"

# ---------------------------------------------------------------------------
# 4. Terraform init + apply
# ---------------------------------------------------------------------------

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TF_DIR="${SCRIPT_DIR}/../terraform"

cd "${TF_DIR}"

echo "==> terraform init..."
terraform init -reconfigure \
  -backend-config="bucket=${STATE_BUCKET}" \
  -backend-config="prefix=${TF_PREFIX}"

APPLY_FLAGS=(
  "-var=project_id=${PROJECT_ID}"
  "-var=region=${REGION}"
  "-var=env=${ENV}"
)
if [[ -n "${ORG_ID}" ]]; then
  APPLY_FLAGS+=("-var=org_id=${ORG_ID}")
fi
if [[ -n "${BILLING_ACCOUNT}" ]]; then
  APPLY_FLAGS+=("-var=billing_account=${BILLING_ACCOUNT}")
fi

if [[ "${AUTO_APPROVE}" == "true" ]]; then
  APPLY_FLAGS+=("-auto-approve")
fi

echo "==> terraform apply..."
terraform apply "${APPLY_FLAGS[@]}"

echo
echo "==> Bootstrap complete."
echo "==> Next steps:"
echo "    1. Populate Secret Manager versions (gemini-api-key, stripe-*, etc.)."
echo "    2. Configure Firebase Auth providers (Google, Email link) in console."
echo "    3. Deploy services with infrastructure/scripts/deploy-cloudrun.sh."
echo "    4. Apply Firestore security rules: firebase deploy --only firestore:rules,firestore:indexes"
