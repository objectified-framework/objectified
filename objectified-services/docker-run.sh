#!/usr/bin/env bash
#
# Starts the docker image after build

docker-compose run --service-ports -e DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@host.docker.internal:${POSTGRES_PORT}/${POSTGRES_DB}" objectified-services

