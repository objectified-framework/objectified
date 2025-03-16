FROM node:22-alpine

WORKDIR /objectified-ui
COPY . /objectified-ui
RUN corepack enable && corepack install -g yarn
RUN yarn install && yarn build

