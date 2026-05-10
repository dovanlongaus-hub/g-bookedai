###############################################################################
# variables.tf
# Input variables for the LongCare GCP environment.
###############################################################################

variable "project_id" {
  description = "GCP project ID (e.g. longcare-prod, longcare-staging, longcare-dev)."
  type        = string
}

variable "project_name" {
  description = "Human-friendly project name (used when creating new projects)."
  type        = string
  default     = "LongCare"
}

variable "region" {
  description = "Primary region for Cloud Run, Firestore, Pub/Sub, etc."
  type        = string
  default     = "australia-southeast1"
}

variable "zone" {
  description = "Default zone for zonal resources (rare; most are regional)."
  type        = string
  default     = "australia-southeast1-a"
}

variable "env" {
  description = "Deployment environment label (prod | staging | dev)."
  type        = string
  default     = "prod"

  validation {
    condition     = contains(["prod", "staging", "dev"], var.env)
    error_message = "env must be one of: prod, staging, dev."
  }
}

variable "org_id" {
  description = "GCP organisation ID (optional; leave empty for personal accounts)."
  type        = string
  default     = ""
}

variable "billing_account" {
  description = "GCP billing account ID (e.g. 0X0X0X-0X0X0X-0X0X0X). Sensitive."
  type        = string
  sensitive   = true
  default     = ""
}

variable "domain_root" {
  description = "Root domain for the tenant (used in OAuth redirect URIs, Firebase auth domain mapping, etc.)."
  type        = string
  default     = "longcare.au"
}

variable "labels" {
  description = "Common resource labels merged into every taggable resource."
  type        = map(string)
  default = {
    tenant     = "longcare"
    managed_by = "terraform"
    workload   = "ai-mentor"
  }
}

###############################################################################
# Service-account naming
# These are derived inside iam.tf — kept as variables so an operator can
# override per environment if a SA already exists.
###############################################################################

variable "sa_api_id" {
  description = "Service-account ID for services/api Cloud Run."
  type        = string
  default     = "longcare-api"
}

variable "sa_agent_id" {
  description = "Service-account ID for services/agent (Vertex AI / Gemini)."
  type        = string
  default     = "longcare-agent"
}

variable "sa_workflow_id" {
  description = "Service-account ID for orchestration / Pub/Sub / Cloud Tasks."
  type        = string
  default     = "longcare-workflow"
}

variable "sa_notification_id" {
  description = "Service-account ID for services/notification."
  type        = string
  default     = "longcare-notification"
}
