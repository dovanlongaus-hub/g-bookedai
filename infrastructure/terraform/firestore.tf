###############################################################################
# firestore.tf
# Firestore in Native mode for LongCare runtime state (mentor sessions,
# assessments, lesson progress, agent registry).
###############################################################################

resource "google_firestore_database" "longcare" {
  project     = var.project_id
  name        = "(default)"
  location_id = var.region
  type        = "FIRESTORE_NATIVE"

  concurrency_mode            = "OPTIMISTIC"
  app_engine_integration_mode = "DISABLED"
  point_in_time_recovery_enablement = "POINT_IN_TIME_RECOVERY_ENABLED"
  delete_protection_state           = var.env == "prod" ? "DELETE_PROTECTION_ENABLED" : "DELETE_PROTECTION_DISABLED"

  depends_on = [google_project_service.enabled]
}

###############################################################################
# Storage bucket for Firestore export / backup automation.
# Cloud Scheduler can trigger gcloud firestore export → this bucket.
###############################################################################

resource "google_storage_bucket" "firestore_backups" {
  name          = "${var.project_id}-firestore-backups"
  location      = var.region
  project       = var.project_id
  force_destroy = false

  uniform_bucket_level_access = true

  lifecycle_rule {
    condition {
      age = 30 # delete backups older than 30 days (adjust per compliance)
    }
    action {
      type = "Delete"
    }
  }

  versioning {
    enabled = true
  }

  labels = local.common_labels
}
