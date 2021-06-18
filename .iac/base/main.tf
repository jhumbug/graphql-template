terraform {
  required_version = ">= 0.12"

  backend "s3" {
    region  = "us-east-1"
    profile = "REPLACE_ME"
    bucket  = "as-terraform-state-files"
    key     = "REPLACE_ME/base/terraform.tfstate"
  }
}

variable "aws_region" {
  default = "us-east-1"
}

variable "aws_profile" {
  default = "REPLACE_ME"
}

provider "aws" {
  version = ">= 2.27.0"
  region  = var.aws_region
  profile = var.aws_profile
}

provider "github" {
  version      = ">= 2.5.0"
  organization = var.github_organization
}

resource "github_actions_secret" "AWS_ACCESS_KEY_ID" {
  repository      = var.github_repo
  secret_name     = "AWS_ACCESS_KEY_ID"
  plaintext_value = aws_iam_access_key.cicd_keys.id
}

resource "github_actions_secret" "AWS_SECRET_ACCESS_KEY" {
  repository      = var.github_repo
  secret_name     = "AWS_SECRET_ACCESS_KEY"
  plaintext_value = aws_iam_access_key.cicd_keys.secret
}


output "tags" {
  value = local.tags
}
