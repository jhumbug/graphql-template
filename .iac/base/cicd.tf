# create ci/cd user with access keys (for build system)
resource "aws_iam_user" "cicd" {
  name = "srv_${var.app}_cicd"
  tags = local.tags
}

resource "aws_iam_access_key" "cicd_keys" {
  user = aws_iam_user.cicd.name
}

data "aws_iam_policy_document" "cicd_policy_document" {
  # allows user to push/pull to the registry
  statement {
    sid = "ecr"

    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
    ]

    resources = [
      aws_ecr_repository.app.arn,
    ]
  }

  # allows user to deploy to ecs
  statement {
    sid = "ecs"

    actions = [
      "ecr:GetAuthorizationToken",
      "ecs:DescribeServices",
      "ecs:DescribeTaskDefinition",
      "ecs:UpdateService",
      "ecs:RegisterTaskDefinition",
    ]

    resources = [
      "*",
    ]
  }
}

resource "aws_iam_user_policy" "cicd_policy" {
  name   = "${var.app}-cicd"
  user   = aws_iam_user.cicd.name
  policy = data.aws_iam_policy_document.cicd_policy_document.json
}

# The AWS_ACCESS_KEY_ID env var for Github Actions
output "AWS_ACCESS_KEY_ID" {
  value = aws_iam_access_key.cicd_keys.id
}

# The AWS_SECRET_ACCESS_KEY env var for Github Actions
output "AWS_SECRET_ACCESS_KEY" {
  value     = aws_iam_access_key.cicd_keys.secret
  sensitive = true
}

