variable "redis_cluster_type" {
  default = "cache.t2.micro"
}

variable "redis_cluster_nodes" {
  default = 1
}

variable "redis_port" {
  default = 6379
}

resource "aws_elasticache_subnet_group" "default" {
  name        = "subnet-group-${local.product}"
  description = "Private subnets for the ElastiCache instances: ${local.product}"
  subnet_ids  = data.aws_subnet_ids.selected.ids
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = local.product
  engine               = "redis"
  engine_version       = "5.0.5"
  maintenance_window   = "sun:05:00-sun:06:00"
  node_type            = var.redis_cluster_type
  num_cache_nodes      = var.redis_cluster_nodes
  parameter_group_name = "default.redis5.0"
  port                 = var.redis_port
  subnet_group_name    = aws_elasticache_subnet_group.default.name
  security_group_ids   = [aws_security_group.nsg_redis.id]
  tags                 = local.tags
}

resource "aws_security_group" "nsg_redis" {
  name        = "${local.product}-redis"
  description = "Allowing ${local.product}-task to connect to all external resources"
  vpc_id      = var.vpc_id
  tags        = local.tags
}

resource "aws_security_group_rule" "nsg_redis_ingress_rule" {
  description              = "Only allow connections from ${local.product}-task on port ${var.redis_port}"
  type                     = "ingress"
  from_port                = var.redis_port
  to_port                  = var.redis_port
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.nsg_task.id

  security_group_id = aws_security_group.nsg_redis.id
}

resource "aws_security_group_rule" "nsg_redis_egress_rule" {
  description = "Allows redis to establish connections to all resources"
  type        = "egress"
  from_port   = var.redis_port
  to_port     = var.redis_port
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = aws_security_group.nsg_redis.id
}

output "REDIS_HOST" {
  value = aws_elasticache_cluster.redis.cache_nodes.0.address
}

output "REDIS_PORT" {
  value = aws_elasticache_cluster.redis.cache_nodes.0.port
}
