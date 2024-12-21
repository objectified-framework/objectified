# objectified-services

Objectified REST Services and OpenAPI Definitions

This project uses artifacts published by `objectified-api` to autogenerate
code required to run a service REST layer defined by the
OpenAPI Specification in `api/openapi.yaml`.

## Building the application

To build the application, run the following command:

```shell
sh ./build.sh
```

This will install all the prerequisite libraries, autogenerate the
code from the OpenAPI Specification, and build the application layer.

To run the application, simply run:

```shell
npm run start
```
