# Name of the application. This value should usually match the application tag below.
variable "app" {
}

# contact email for the team
variable "contact_email" {
}

# client or customer of the application, generally for cost reporting and analysis;
variable "customer" {
}

# the environment being created;
variable "environment" {
}

# source code location
variable "repo" {
}

# team responsible for the application;
variable "team" {
}

# Whether the application is available on the public internet,
# also will determine which subnets will be used (public or private)
variable "internal" {
  default = true
}

# The SAML role to use for adding users to the ECR policy
variable "saml_role" {}

# The users (email addresses) from the saml role to give access
# case sensitive
variable "saml_users" {
  type = list(string)
}

variable "enable_cloudwatch_alarms" {
  default = false
}

locals {
  product = "${var.app}-${var.environment}"

  tags = {
    application   = var.app
    contact-email = var.contact_email
    customer      = var.customer
    environment   = var.environment
    product       = local.product
    repo          = var.repo
    team          = var.team
  }
}

