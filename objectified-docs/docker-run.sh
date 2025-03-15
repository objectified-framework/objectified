#!/usr/bin/env sh
#
# Starts the docker instance

docker-compose run --service-ports -e PORT=${PORT} objectified-docs

