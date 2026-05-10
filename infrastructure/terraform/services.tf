###############################################################################
# services.tf
# Enable every GCP API the LongCare workloads depend on.
# `disable_on_destroy = false` keeps APIs enabled if Terraform is torn down.
###############################################################################

locals {
  required_apis = [
    "firebase.googleapis.com",          # Firebase platform
    "identitytoolkit.googleapis.com",   # Firebase Auth (Identity Platform)
    "firestore.googleapis.com",         # Cloud Firestore (native mode)
    "aiplatform.googleapis.com",        # Vertex AI (Gemini, embeddings)
    "discoveryengine.googleapis.com",   # Vertex AI Search / Agent Builder
    "storage.googleapis.com",           # Cloud Storage (assets, TF state)
    "cloudfunctions.googleapis.com",    # Cloud Functions (gen2)
    "cloudbuild.googleapis.com",        # Container builds for Cloud Run
    "run.googleapis.com",               # Cloud Run services
    "artifactregistry.googleapis.com",  # Image registry (Cloud Run sources)
    "secretmanager.googleapis.com",     # Secret Manager
    "pubsub.googleapis.com",            # Pub/Sub event bus
    "cloudtasks.googleapis.com",        # Cloud Tasks (durable retries)
    "cloudscheduler.googleapis.com",    # Cron triggers (hold expiry, etc.)
    "logging.googleapis.com",           # Cloud Logging
    "monitoring.googleapis.com",        # Cloud Monitoring + alerting
    "bigquery.googleapis.com",          # Analytics warehouse for GA4 export
    "iamcredentials.googleapis.com",    # SA impersonation / WIF
    "serviceusage.googleapis.com",      # Required to manage other APIs
    "cloudresourcemanager.googleapis.com",
  ]
}

resource "google_project_service" "enabled" {
  for_each = toset(local.required_apis)

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}
