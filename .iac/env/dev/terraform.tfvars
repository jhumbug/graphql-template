aws_profile = "REPLACE_ME"

app = "REPLACE_ME"

contact_email = "REPLACE_ME@REPLACE_ME.com"

customer = "REPLACE_ME"

environment = "dev"

repo = "https://github.com/REPLACE_ME/REPLACE_ME"

team = "REPLACE_ME"

# vpc config

vpc_id = "vpc-17d0c170"

# ecs config

container_port = 4000
lb_port        = 4000
health_check   = "/.well-known/apollo/server-health"

# saml config

saml_role = "REPLACE_ME"
saml_users = [
  "REPLACE_ME1@REPLACE_ME.com",
  "REPLACE_ME2@REPLACE_ME.com",
]
