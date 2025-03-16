#!/usr/bin/env sh
#
# Build and publish

TAG=0.0.1

docker compose build
docker tag objectified-db objectified-db/${TAG}
docker image push docker.objectified.dev/objectified-db:${TAG}

