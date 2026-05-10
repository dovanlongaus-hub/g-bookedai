#!/usr/bin/env bash
###############################################################################
# deploy-cloudrun.sh
#
# Generic Cloud Run deploy helper for any LongCare service.
# Builds the image with Cloud Build (or accepts a pre-built image), then
# deploys it to Cloud Run with the right runtime service account, secrets,
# and traffic settings.
#
# Usage:
#   SERVICE=api \
#   IMAGE=australia-southeast1-docker.pkg.dev/longcare-prod/services/api:1.0.0 \
#   SA_EMAIL=longcare-api@longcare-prod.iam.gserviceaccount.com \
#   PROJECT_ID=longcare-prod \
#   REGION=australia-southeast1 \
#   ./infrastructure/scripts/deploy-cloudrun.sh
#
# Optional env vars:
#   SOURCE_DIR     Path to Dockerfile dir; if set, runs `gcloud run deploy --source` instead of using IMAGE.
#   ALLOW_UNAUTH   "true" to make service publicly invocable (default: false).
#   MIN_INSTANCES  default: 0
#   MAX_INSTANCES  default: 10
#   CPU            default: 1
#   MEMORY         default: 512Mi
#   CONCURRENCY    default: 80
#   TIMEOUT        default: 300s
#   ENV_VARS       comma-separated KEY=VALUE list (forwarded to --set-env-vars)
#   SECRETS        comma-separated KEY=secret-id:latest list (forwarded to --set-secrets)
#   VPC_CONNECTOR  optional Serverless VPC connector name
###############################################################################

set -euo pipefail

SERVICE="${SERVICE:?SERVICE is required (e.g. api, agent, notification)}"
PROJECT_ID="${PROJECT_ID:?PROJECT_ID is required}"
REGION="${REGION:-australia-southeast1}"
SA_EMAIL="${SA_EMAIL:?SA_EMAIL is required (Cloud Run runtime SA)}"

ALLOW_UNAUTH="${ALLOW_UNAUTH:-false}"
MIN_INSTANCES="${MIN_INSTANCES:-0}"
MAX_INSTANCES="${MAX_INSTANCES:-10}"
CPU="${CPU:-1}"
MEMORY="${MEMORY:-512Mi}"
CONCURRENCY="${CONCURRENCY:-80}"
TIMEOUT="${TIMEOUT:-300s}"

# ---------------------------------------------------------------------------
# Pre-flight
# ---------------------------------------------------------------------------

if ! command -v gcloud >/dev/null 2>&1; then
  echo "ERROR: gcloud CLI not found." >&2
  exit 1
fi

gcloud config set project "${PROJECT_ID}" >/dev/null

DEPLOY_ARGS=(
  "--project=${PROJECT_ID}"
  "--region=${REGION}"
  "--service-account=${SA_EMAIL}"
  "--min-instances=${MIN_INSTANCES}"
  "--max-instances=${MAX_INSTANCES}"
  "--cpu=${CPU}"
  "--memory=${MEMORY}"
  "--concurrency=${CONCURRENCY}"
  "--timeout=${TIMEOUT}"
  "--platform=managed"
)

if [[ "${ALLOW_UNAUTH}" == "true" ]]; then
  DEPLOY_ARGS+=("--allow-unauthenticated")
else
  DEPLOY_ARGS+=("--no-allow-unauthenticated")
fi

if [[ -n "${ENV_VARS:-}" ]]; then
  DEPLOY_ARGS+=("--set-env-vars=${ENV_VARS}")
fi

if [[ -n "${SECRETS:-}" ]]; then
  DEPLOY_ARGS+=("--set-secrets=${SECRETS}")
fi

if [[ -n "${VPC_CONNECTOR:-}" ]]; then
  DEPLOY_ARGS+=("--vpc-connector=${VPC_CONNECTOR}")
fi

# ---------------------------------------------------------------------------
# Deploy: source-build mode (preferred for first deploy) vs pre-built image
# ---------------------------------------------------------------------------

if [[ -n "${SOURCE_DIR:-}" ]]; then
  echo "==> Deploying ${SERVICE} from source ${SOURCE_DIR}..."
  gcloud run deploy "${SERVICE}" \
    --source "${SOURCE_DIR}" \
    "${DEPLOY_ARGS[@]}"
else
  IMAGE="${IMAGE:?IMAGE is required when SOURCE_DIR is not set}"
  echo "==> Deploying ${SERVICE} from image ${IMAGE}..."
  gcloud run deploy "${SERVICE}" \
    --image "${IMAGE}" \
    "${DEPLOY_ARGS[@]}"
fi

# ---------------------------------------------------------------------------
# Print URL
# ---------------------------------------------------------------------------

URL="$(gcloud run services describe "${SERVICE}" \
  --project="${PROJECT_ID}" --region="${REGION}" \
  --format='value(status.url)')"

echo
echo "==> Deploy complete."
echo "==> Service URL: ${URL}"
