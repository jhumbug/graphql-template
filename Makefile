.PHONY: start stop
.DEFAULT_GOAL := start

start:
	yarn install
	docker-compose -f docker-compose.local.yml up --build

stop:
	docker-compose -f docker-compose.local.yml down --volumes
