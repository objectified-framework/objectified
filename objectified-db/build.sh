#!/usr/bin/env bash
#
# This loads the database into the system.
# Be careful, this will load from the beginning, and all data will be removed.

if [ -z ${POSTGRES_HOST} ]; then echo "POSTGRES_HOST is missing" && exit; fi
if [ -z ${POSTGRES_PORT} ]; then echo "POSTGRES_PORT is missing" && exit; fi
if [ -z ${POSTGRES_USER} ]; then echo "POSTGRES_USER is missing" && exit; fi
if [ -z ${POSTGRES_PASSWORD} ]; then echo "POSTGRES_PASSWORD is missing" && exit; fi

sem-apply --url postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/

echo "Loading process complete."
