#!/usr/bin/env bash
#
# Project level builder

echo "Building Objectified Master Project"

# Load the database first
cd objectified-db && sh ./build.sh && cd .. && echo "DB Loaded." && echo

## Load the OpenAPI toolset next
#cd objectified-api && sh ./build.sh && cd .. && echo "API project built properly." && echo
#
## Compile the services layer
#cd objectified-services && sh ./build.sh && cd .. && echo "Services layer built properly." && echo
#
## Compile the external layer
#cd objectified-external && sh ./build.sh && cd .. && echo "External services layer built properly." && echo


