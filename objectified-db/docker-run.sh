#!/usr/bin/env bash
#
# Starts the docker image after build

docker-compose run --rm -e POSTGRES_HOST=host.docker.internal -e POSTGRES_PORT -e POSTGRES_USER -e POSTGRES_PASSWORD objectified-db
