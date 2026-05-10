###############################################################################
# main.tf
# Provider + remote state configuration for the LongCare GCP environment.
###############################################################################

terraform {
  required_version = ">= 1.6.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.40"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.40"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  # GCS remote state. Bucket is created by infrastructure/scripts/bootstrap.sh
  # before `terraform init` is run for the first time. Pass `bucket` and
  # `prefix` via `-backend-config=...` flags.
  backend "gcs" {}
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

###############################################################################
# Common locals
###############################################################################

locals {
  resource_prefix = "longcare-${var.env}"

  common_labels = merge(var.labels, {
    env = var.env
  })
}
