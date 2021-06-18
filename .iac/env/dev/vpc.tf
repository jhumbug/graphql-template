variable "vpc_id" {}

data "aws_subnet_ids" "selected" {
  vpc_id = var.vpc_id

  tags = {
    Tier = var.internal ? "Private" : "Public"
  }
}
