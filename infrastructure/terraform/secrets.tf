###############################################################################
# secrets.tf
# Declares Secret Manager secrets used by LongCare services.
# Versions are NOT created in Terraform — populate them manually via console or
# `gcloud secrets versions add <name> --data-file=...` so credentials never
# touch state files or git.
###############################################################################

locals {
  managed_secrets = {
    "gemini-api-key" = {
      description = "Google AI Studio / Gemini API key (services/agent fallback)."
    }
    "openai-api-key" = {
      description = "OpenAI API key (chat fallback + embeddings)."
    }
    "stripe-secret-key" = {
      description = "Stripe live secret key (services/api payments)."
    }
    "stripe-webhook-secret" = {
      description = "Stripe webhook signing secret."
    }
    "xero-client-secret" = {
      description = "Xero OAuth2 client secret (services/accounting-sync)."
    }
    "firebase-admin-service-account" = {
      description = "Firebase Admin SDK service-account JSON (server-side)."
    }
    "twilio-auth-token" = {
      description = "Twilio Auth Token (services/notification SMS)."
    }
    "google-oauth-client-secret" = {
      description = "Google OAuth client secret (Gmail/Calendar/Drive APIs)."
    }
  }
}

resource "google_secret_manager_secret" "secrets" {
  for_each = local.managed_secrets

  project   = var.project_id
  secret_id = each.key

  replication {
    user_managed {
      replicas {
        location = var.region
      }
    }
  }

  labels = merge(local.common_labels, {
    purpose = replace(each.key, "-", "_")
  })

  depends_on = [google_project_service.enabled]
}

###############################################################################
# Bind each runtime SA to the secrets it needs.
# This is a coarse map; tighten per-secret if separation of duties matters.
###############################################################################

locals {
  secret_consumers = {
    sa_api = {
      email = google_service_account.sa_api.email
      keys  = ["stripe-secret-key", "stripe-webhook-secret", "firebase-admin-service-account", "google-oauth-client-secret", "xero-client-secret"]
    }
    sa_agent = {
      email = google_service_account.sa_agent.email
      keys  = ["gemini-api-key", "openai-api-key"]
    }
    sa_notification = {
      email = google_service_account.sa_notification.email
      keys  = ["twilio-auth-token", "google-oauth-client-secret", "firebase-admin-service-account"]
    }
    sa_workflow = {
      email = google_service_account.sa_workflow.email
      keys  = ["firebase-admin-service-account"]
    }
  }

  secret_access_pairs = flatten([
    for sa_key, cfg in local.secret_consumers : [
      for secret_id in cfg.keys : {
        sa_key    = sa_key
        email     = cfg.email
        secret_id = secret_id
      }
    ]
  ])
}

resource "google_secret_manager_secret_iam_member" "accessor" {
  for_each = {
    for pair in local.secret_access_pairs :
    "${pair.sa_key}:${pair.secret_id}" => pair
  }

  project   = var.project_id
  secret_id = google_secret_manager_secret.secrets[each.value.secret_id].secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${each.value.email}"
}
