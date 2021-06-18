terraform {
  required_version = ">= 0.12"

  backend "s3" {
    region  = "us-east-1"
    profile = "REPLACE_ME"
    bucket  = "as-terraform-state-files"
    key     = "REPLACE_ME/dev/terraform.tfstate"
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

data "aws_caller_identity" "current" {}

output "product" {
  value = local.product
}

output "tags" {
  value = local.tags
}
