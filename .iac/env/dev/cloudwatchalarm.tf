data "aws_sns_topic" "topic" {
  name = "BigPanda_Topic"
}

resource "aws_cloudwatch_metric_alarm" "cloudwatchalarm" {
  count = var.enable_cloudwatch_alarms ? 1 : 0

  alarm_name          = "${local.product}-fargate-alarm"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "HealthyHostCount"
  namespace           = "AWS/ApplicationELB"

  dimensions = {
    LoadBalancer = aws_alb.main.arn_suffix
    TargetGroup  = aws_alb_target_group.main.arn_suffix
  }

  period             = "300"
  statistic          = "Average"
  threshold          = "0.8"
  alarm_description  = "This metric fargate service"
  alarm_actions      = [data.aws_sns_topic.topic.arn]
  ok_actions         = [data.aws_sns_topic.topic.arn]
  treat_missing_data = "breaching"
}
