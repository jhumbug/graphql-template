# The tag mutability setting for the repository (defaults to IMMUTABLE)
variable "image_tag_mutability" {
  type        = string
  default     = "IMMUTABLE"
  description = "The tag mutability setting for the repository (defaults to IMMUTABLE)"
}

# create an ECR repo at the app/image level
resource "aws_ecr_repository" "app" {
  name                 = var.app
  image_tag_mutability = var.image_tag_mutability
  tags                 = local.tags
}

resource "aws_ecr_lifecycle_policy" "expire_images" {
  repository = aws_ecr_repository.app.name

  policy = <<EOF
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Expire untagged images older than 14 days",
      "selection": {
        "tagStatus": "untagged",
        "countType": "sinceImagePushed",
        "countUnit": "days",
        "countNumber": 14
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
EOF
}

output "docker_registry" {
  value = aws_ecr_repository.app.repository_url
}
