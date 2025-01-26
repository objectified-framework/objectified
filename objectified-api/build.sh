#!/usr/bin/env bash
#
# Build script

echo "Cleaning generated directory"
rm -rf src/generated

echo
echo "Installing dependency packages"
yarn install

echo "Lint"
yarn lint

echo
echo "Building code"
yarn build

