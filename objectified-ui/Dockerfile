FROM node:22-alpine

RUN mkdir -p objectified/objectified-services objectified/objectified-api objectified/objectified-ui objectified/openapi
COPY objectified-services /objectified/objectified-services
COPY objectified-ui /objectified/objectified-ui
COPY objectified-api /objectified/objectified-api
COPY openapi /objectified/openapi
COPY package.json /objectified
WORKDIR /objectified
RUN corepack enable && corepack install -g yarn
RUN cd /objectified/objectified-api && yarn install && yarn build && cd ..
RUN cd /objectified/objectified-services && yarn install && yarn autogen && yarn build && cd ..
RUN cd /objectified/objectified-ui && yarn install && yarn build && cd ..

ENTRYPOINT ["/bin/sh", "-c", "cd /objectified/objectified-ui && yarn start"]
