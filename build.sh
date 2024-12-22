#!/usr/bin/env bash
#
# Project level builder

echo "Building Objectified Master Project"

# Load the database first
cd objectified-db && sh ./build.sh && cd .. && echo "DB Loaded." && echo

# Load the OpenAPI toolset next
cd objectified-api && sh ./build.sh && cd .. && echo "API project built properly."


