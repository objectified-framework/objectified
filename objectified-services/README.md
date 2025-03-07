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
sh ./run.sh
```

## Note regarding services

Many of the services running in this server are unprotected, meaning, the JWT tokens
are not read or used.  This is because this server is intended to be run behind a
firewall and not exposed to the outside.

NextJS services used by the `objectified-ui` application will connect to the internal
services using the clients layer, provided by the `objectified-api` autogenerator
code.

Services via NextJS run at the server level, so they are not at risk of exposure.

## Creating a password for users

To create a password for a user, use the `gen-passwd` tool in `package.json`:

```shell
yarn gen-passwd (password)
```

Once the password is generated using `bcrypt`, copy/paste that into the user's password
record in the database.
