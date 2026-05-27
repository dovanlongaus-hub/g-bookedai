#!/usr/bin/env bash
# Deploy web-longcare to Cloud Run.
# Run this locally with personal/admin gcloud credentials (the VM service
# account in this dev environment does not have Cloud Build / Run scopes).
#
# Prerequisites:
#   gcloud auth login
#   gcloud config set project <YOUR_PROJECT_ID>
#   gcloud auth configure-docker <REGION>-docker.pkg.dev
#
# Usage:
#   ./infrastructure/scripts/deploy-longcare.sh
#
# Optional env overrides:
#   PROJECT_ID, REGION, SERVICE_NAME, REPO_NAME, IMAGE_TAG, MEMORY, CPU
#   ALLOWED_ORIGINS, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_CONTACT_EMAIL,
#   NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SOCIAL_PROOF
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-$(gcloud config get-value project)}"
REGION="${REGION:-australia-southeast1}"
SERVICE_NAME="${SERVICE_NAME:-web-longcare}"
REPO_NAME="${REPO_NAME:-bookedai-services}"
IMAGE_TAG="${IMAGE_TAG:-$(git rev-parse --short HEAD 2>/dev/null || date +%s)}"
MEMORY="${MEMORY:-512Mi}"
CPU="${CPU:-1}"
NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://longcare.au}"
NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-https://api.g.bookedai.au}"
NEXT_PUBLIC_CONTACT_EMAIL="${NEXT_PUBLIC_CONTACT_EMAIL:-hello@longcare.au}"
NEXT_PUBLIC_SOCIAL_PROOF="${NEXT_PUBLIC_SOCIAL_PROOF:-false}"
ALLOWED_ORIGINS="${ALLOWED_ORIGINS:-https://longcare.au,https://book.longcare.au,https://app.longcare.au}"

if [[ -z "${PROJECT_ID}" || "${PROJECT_ID}" == "(unset)" ]]; then
  echo "ERROR: PROJECT_ID not set. Run: gcloud config set project <id>" >&2
  exit 1
fi

REGISTRY="${REGION}-docker.pkg.dev"
IMAGE="${REGISTRY}/${PROJECT_ID}/${REPO_NAME}/web-longcare:${IMAGE_TAG}"

echo "==> Project:  ${PROJECT_ID}"
echo "==> Region:   ${REGION}"
echo "==> Service:  ${SERVICE_NAME}"
echo "==> Image:    ${IMAGE}"
echo

echo "==> Ensuring Artifact Registry repo exists..."
gcloud artifacts repositories describe "${REPO_NAME}" \
  --location="${REGION}" \
  --project="${PROJECT_ID}" >/dev/null 2>&1 || \
  gcloud artifacts repositories create "${REPO_NAME}" \
    --repository-format=docker \
    --location="${REGION}" \
    --project="${PROJECT_ID}" \
    --description="LongCare AU Cloud Run images"

echo "==> Building and pushing image..."
cd "$(dirname "$0")/../.."
docker build \
  -f apps/web-longcare/Dockerfile \
  -t "${IMAGE}" \
  --build-arg "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" \
  --build-arg "API_URL=${NEXT_PUBLIC_API_URL}" \
  .
docker push "${IMAGE}"

echo "==> Deploying to Cloud Run..."
gcloud run deploy "${SERVICE_NAME}" \
  --image="${IMAGE}" \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --platform=managed \
  --allow-unauthenticated \
  --port=3000 \
  --memory="${MEMORY}" \
  --cpu="${CPU}" \
  --min-instances=0 \
  --max-instances=10 \
  --concurrency=80 \
  --timeout=60s \
  --set-env-vars="NODE_ENV=production,NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL},NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL},NEXT_PUBLIC_CONTACT_EMAIL=${NEXT_PUBLIC_CONTACT_EMAIL},NEXT_PUBLIC_SOCIAL_PROOF=${NEXT_PUBLIC_SOCIAL_PROOF},ALLOWED_ORIGINS=${ALLOWED_ORIGINS},API_URL=${NEXT_PUBLIC_API_URL}"

URL=$(gcloud run services describe "${SERVICE_NAME}" \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --format='value(status.url)')

echo
echo "==> Deployed: ${URL}"
echo "==> Map custom domain (one-time):"
echo "    gcloud beta run domain-mappings create --service=${SERVICE_NAME} --domain=longcare.au --region=${REGION}"
