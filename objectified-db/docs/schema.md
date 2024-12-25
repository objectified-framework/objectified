# objectified-db schema

This is an explanation of the schema, what each table means, and how its
referential integrity is set up.

## user

This is the user table.

## data_type

This is used to define the different types of data that can be stored in specific
field definitions.

This data table is loaded with initial data so that a list of [JSON Schema valid types](https://cswr.github.io/JsonSchema/spec/basic_types/) 
are available for use.
