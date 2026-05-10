###############################################################################
# outputs.tf
# Surface key identifiers for use by deploy scripts and other modules.
###############################################################################

output "project_id" {
  description = "GCP project ID."
  value       = var.project_id
}

output "region" {
  description = "Primary region for regional resources."
  value       = var.region
}

output "env" {
  description = "Environment label (prod | staging | dev)."
  value       = var.env
}

output "firestore_database" {
  description = "Firestore database name."
  value       = google_firestore_database.longcare.name
}

output "firestore_location" {
  description = "Firestore region."
  value       = google_firestore_database.longcare.location_id
}

output "firestore_backup_bucket" {
  description = "GCS bucket used for scheduled Firestore exports."
  value       = google_storage_bucket.firestore_backups.name
}

output "service_account_emails" {
  description = "Map of role -> service-account email for downstream automation."
  value = {
    api          = google_service_account.sa_api.email
    agent        = google_service_account.sa_agent.email
    workflow     = google_service_account.sa_workflow.email
    notification = google_service_account.sa_notification.email
  }
}

output "managed_secret_ids" {
  description = "Secret Manager secret IDs created (versions still need to be populated manually)."
  value       = [for s in google_secret_manager_secret.secrets : s.secret_id]
}

output "enabled_apis" {
  description = "List of GCP APIs enabled by Terraform."
  value       = sort([for svc in google_project_service.enabled : svc.service])
}
