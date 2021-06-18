data "aws_sns_topic" "topic5xx" {
  name = "BigPanda_Topic"
}

resource "aws_cloudwatch_metric_alarm" "cloudwatchalarm5xx" {
  count = var.enable_cloudwatch_alarms ? 1 : 0

  alarm_name          = "${local.product}-5xx-fargate-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "HTTPCode_ELB_5XX"
  namespace           = "AWS/ApplicationELB"

  dimensions = {
    LoadBalancer = aws_alb.main.arn_suffix
    TargetGroup  = aws_alb_target_group.main.arn_suffix
  }

  period             = "300"
  statistic          = "Sum"
  threshold          = "50"
  alarm_description  = "This metric measures 5XX from fargate service"
  alarm_actions      = [data.aws_sns_topic.topic5xx.arn]
  ok_actions         = [data.aws_sns_topic.topic5xx.arn]
  treat_missing_data = "notBreaching"
}
