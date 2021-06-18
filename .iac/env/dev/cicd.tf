# reference ci/cd user
data "aws_iam_user" "cicd" {
  user_name = "srv_${var.app}_cicd"
}

# grant required permissions to deploy to environment
data "aws_iam_policy_document" "cicd_policy" {
  # allows user to run ecs task using task execution and app roles
  statement {
    actions = [
      "iam:PassRole",
    ]

    resources = [
      aws_iam_role.app_role.arn,
      aws_iam_role.ecsTaskExecutionRole.arn,
    ]
  }
}

resource "aws_iam_user_policy" "cicd_user_policy" {
  name   = "${local.product}-cicd"
  user   = data.aws_iam_user.cicd.user_name
  policy = data.aws_iam_policy_document.cicd_policy.json
}
