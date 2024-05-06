# objectified-codegen

This is a simple OpenAPI 3.1 auto-generator.

This was provided because the code for `openapi-generator` is, and has been,
experimental for NestJS code generation.

This code more fits the design and style of Objectified, so this should
be considered a custom generator.  It may work for other projects,
but it has been designed specifically for Objectified.

This code may be useful for other projects; if it is, and other users find it
useful, it may be spun off into its own project within the objectified group.

## What it generates

Nothing yet.  It is in process of being parsed and first class objects being
created as a representation of the data it loads.

## Roadmap

- DTOs (Data Type Objects) from components/schemas
  - Supporting DTOs for service-defined schemas that do not implement `$ref`
- `Delegates` model code for service paths that are:
  - `Tags` defines the delegate code
  - `Impl` must be implemented to be called by `main`
- Authentication bearers
- Pathing, input parameters, etc, all defined using annotations
- TypeScript valid code
- TypeScript valid tests

All code is designed to be compiled using NestJS.

## License

[Commercial-friendly Apache 2.0 License.](../../LICENSE)  100% Open Source.
