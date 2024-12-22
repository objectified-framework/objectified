#!/usr/bin/env bash
#
# Project level builder

echo "Building Objectified Master Project"
cd objectified-api && sh ./build.sh && cd .. && echo "API project built properly."


