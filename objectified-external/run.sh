#!/usr/bin/env bash
#
# Starts the server

if [ -z ${DATABASE_URL} ]; then echo "DATABASE_URL is missing" && exit; fi

yarn build && yarn start

