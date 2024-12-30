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

## tenant

This is an important table in the system, used to group users and objects together with
their own tenancy names.  This concept is similar to a Namespace, in that only objects
that belong to a tenant can be used by the tenant.  Tenants contain a `data` field, which
can be used to store information specific to the tenant.

## tenant_user

This groups users with tenants.  It contains a `permission` column for eventual ABAC
service functionality.

## field

The field table defines a `data_type` to an object that can be assigned a `property`.
Think of a field as a class or object store type, which can be instantiated to store
data contained in a class.  Fields can be reused and reassigned to as many properties
as desired.

When data is assigned to a field from a class instantiation, that data can be indexed by
the system, and can be used to cross-reference data between other instantiated classes
using internal tooling.
