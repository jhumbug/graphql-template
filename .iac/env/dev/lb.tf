# note that this creates the alb, target group, and access logs
# the listeners are defined in lb-http.tf and lb-https.tf
# delete either of these if your app doesn't need them
# but you need at least one

# The amount time for Elastic Load Balancing to wait before changing the state of a deregistering target from draining to unused
variable "deregistration_delay" {
  default = 30
}

# The path to the health check for the load balancer to know if the container(s) are ready
variable "health_check" {
  default = "/"
}

# How often to check the liveliness of the container
variable "health_check_interval" {
  default = 30
}

# How long to wait for the response on the health check path
variable "health_check_timeout" {
  default = 10
}

# What HTTP response code to listen for
variable "health_check_matcher" {
  default = "200"
}

variable "lb_access_logs_expiration_days" {
  default = 3
}

# The port the load balancer will listen on
variable "lb_port" {
  default = 80
}

# The load balancer protocol
variable "lb_protocol" {
  default = "HTTP"
}

resource "aws_alb" "main" {
  name = local.product

  # launch lbs in public or private subnets based on "internal" variable
  internal        = var.internal
  subnets         = data.aws_subnet_ids.selected.ids
  security_groups = [aws_security_group.nsg_lb.id]
  tags            = local.tags

  # enable access logs in order to get support from aws
  access_logs {
    enabled = true
    bucket  = aws_s3_bucket.lb_access_logs.bucket
  }
}

resource "aws_alb_target_group" "main" {
  name                 = local.product
  port                 = var.lb_port
  protocol             = var.lb_protocol
  vpc_id               = var.vpc_id
  target_type          = "ip"
  deregistration_delay = var.deregistration_delay

  health_check {
    path                = var.health_check
    matcher             = var.health_check_matcher
    interval            = var.health_check_interval
    timeout             = var.health_check_timeout
    healthy_threshold   = 5
    unhealthy_threshold = 5
  }

  tags = local.tags
}

data "aws_elb_service_account" "main" {
}

# bucket for storing ALB access logs
resource "aws_s3_bucket" "lb_access_logs" {
  bucket        = "${local.product}-lb-access-logs"
  acl           = "private"
  tags          = local.tags
  force_destroy = true

  lifecycle_rule {
    id                                     = "cleanup"
    enabled                                = true
    abort_incomplete_multipart_upload_days = 1
    prefix                                 = ""

    expiration {
      days = var.lb_access_logs_expiration_days
    }
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

# give load balancing service access to the bucket
resource "aws_s3_bucket_policy" "lb_access_logs" {
  bucket = aws_s3_bucket.lb_access_logs.id

  policy = <<POLICY
{
  "Id": "Policy",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": [
        "${aws_s3_bucket.lb_access_logs.arn}",
        "${aws_s3_bucket.lb_access_logs.arn}/*"
      ],
      "Principal": {
        "AWS": [ "${data.aws_elb_service_account.main.arn}" ]
      }
    }
  ]
}
POLICY
}

output "upstream" {
  value = lower(format("%s://%s:%d", var.lb_protocol, aws_alb.main.dns_name, var.lb_port))
}
