# Name of the application. This value should usually match the application tag below.
variable "app" {}

# A map of the tags to apply to various resources. The required tags are:
# `application`, name of the app;
# `contact-email`, contact email for the _team_;
variable "contact_email" {}

# client or customer of the application, generally for cost reporting and analysis;
variable "customer" {}

# the environment being created;
variable "environment" {}

# organization name that the repo is in
variable "github_organization" {}

# source code location
variable "github_repo" {}

# team responsible for the application;
variable "team" {}

locals {
  tags = {
    application   = var.app
    contact-email = var.contact_email
    customer      = var.customer
    environment   = var.environment
    repo          = "https://github.com/${var.github_organization}/${var.github_repo}"
    team          = var.team
  }
}

