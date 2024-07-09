# objectified-data

This is the data project that accompanies Objectified.

It contains the OpenAPI 3.1 specification for the application, along with the database
definition for the DAO/DTO layer.

## package.json

To validate the OpenAPI spec, use `yarn lint`.  To test, you can use `redocly` to run
a test server against the data.

To run the server locally to browse the spec, use `npx @redocly/cli preview-docs api/openapi.yaml`
and tune your browser to `localhost:8080`.


