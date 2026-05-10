###############################################################################
# iam.tf
# Service accounts + minimum-privilege IAM bindings for LongCare workloads.
###############################################################################

###############################################################################
# services/api — Cloud Run (Express 5, Firebase Admin, Firestore, Pub/Sub)
###############################################################################

resource "google_service_account" "sa_api" {
  account_id   = var.sa_api_id
  display_name = "LongCare API (Cloud Run)"
  description  = "Runtime SA for services/api. Firebase Admin + Firestore + Secrets + Pub/Sub publisher."
  project      = var.project_id

  depends_on = [google_project_service.enabled]
}

locals {
  sa_api_roles = [
    "roles/firebase.admin",
    "roles/datastore.user",
    "roles/secretmanager.secretAccessor",
    "roles/pubsub.publisher",
    "roles/cloudtasks.enqueuer",
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter",
    "roles/cloudtrace.agent",
  ]
}

resource "google_project_iam_member" "sa_api_roles" {
  for_each = toset(local.sa_api_roles)
  project  = var.project_id
  role     = each.value
  member   = "serviceAccount:${google_service_account.sa_api.email}"
}

###############################################################################
# services/agent — Vertex AI / Discovery Engine consumer
###############################################################################

resource "google_service_account" "sa_agent" {
  account_id   = var.sa_agent_id
  display_name = "LongCare AI Agent"
  description  = "Runtime SA for services/agent. Vertex AI user + Discovery Engine viewer."
  project      = var.project_id

  depends_on = [google_project_service.enabled]
}

locals {
  sa_agent_roles = [
    "roles/aiplatform.user",
    "roles/discoveryengine.viewer",
    "roles/secretmanager.secretAccessor",
    "roles/storage.objectViewer",
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter",
  ]
}

resource "google_project_iam_member" "sa_agent_roles" {
  for_each = toset(local.sa_agent_roles)
  project  = var.project_id
  role     = each.value
  member   = "serviceAccount:${google_service_account.sa_agent.email}"
}

###############################################################################
# services/workflow — Pub/Sub orchestrator + Cloud Tasks
###############################################################################

resource "google_service_account" "sa_workflow" {
  account_id   = var.sa_workflow_id
  display_name = "LongCare Workflow Orchestrator"
  description  = "SA for orchestration: Pub/Sub editor, Cloud Tasks editor, secrets."
  project      = var.project_id

  depends_on = [google_project_service.enabled]
}

locals {
  sa_workflow_roles = [
    "roles/pubsub.editor",
    "roles/cloudtasks.admin",
    "roles/cloudscheduler.admin",
    "roles/secretmanager.secretAccessor",
    "roles/logging.logWriter",
  ]
}

resource "google_project_iam_member" "sa_workflow_roles" {
  for_each = toset(local.sa_workflow_roles)
  project  = var.project_id
  role     = each.value
  member   = "serviceAccount:${google_service_account.sa_workflow.email}"
}

###############################################################################
# services/notification — Gmail API, Twilio, FCM dispatch
###############################################################################

resource "google_service_account" "sa_notification" {
  account_id   = var.sa_notification_id
  display_name = "LongCare Notification Worker"
  description  = "SA for services/notification (Gmail/Twilio/FCM)."
  project      = var.project_id

  depends_on = [google_project_service.enabled]
}

locals {
  sa_notification_roles = [
    "roles/secretmanager.secretAccessor",
    "roles/pubsub.subscriber",
    "roles/datastore.user",
    "roles/logging.logWriter",
    "roles/firebasecloudmessaging.admin",
  ]
}

resource "google_project_iam_member" "sa_notification_roles" {
  for_each = toset(local.sa_notification_roles)
  project  = var.project_id
  role     = each.value
  member   = "serviceAccount:${google_service_account.sa_notification.email}"
}

###############################################################################
# Cloud Run invoker — let workflow SA invoke api/agent (eventarc / push subs)
###############################################################################

resource "google_project_iam_member" "workflow_run_invoker" {
  project = var.project_id
  role    = "roles/run.invoker"
  member  = "serviceAccount:${google_service_account.sa_workflow.email}"
}
