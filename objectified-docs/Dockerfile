FROM node:22-alpine

WORKDIR /objectified-docs
COPY . /objectified-docs
RUN corepack enable && corepack install -g yarn
RUN yarn install && yarn build

ENTRYPOINT ["/bin/sh", "-c", "cd /objectified-docs && yarn serve"]
