FROM node:22-alpine

RUN mkdir -p objectified/objectified-external objectified/objectified-api objectified/openapi
COPY objectified-external /objectified/objectified-external
COPY objectified-api /objectified/objectified-api
COPY openapi /objectified/openapi
COPY package.json /objectified
WORKDIR /objectified
RUN corepack enable && corepack install -g yarn
RUN cd objectified-api && yarn install && yarn build && cd ..
RUN cd objectified-external && yarn install && yarn autogen && yarn build && cd ..
