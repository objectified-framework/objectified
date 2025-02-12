# objectified-db schema

This is an explanation of the schema, what each table means, and how its
referential integrity is set up.

## user

This is the user table.  The "create_date" is automatically populated when a new user
is added to the database.  When any updates are made to any columns, the update_date
is automatically populated using the `trigger_update_user_date` trigger.

## tenant

## tenant_user

[//]: # (## user)

[//]: # ()
[//]: # (This is the user table.)

[//]: # ()
[//]: # (## data_type)

[//]: # ()
[//]: # (This is used to define the different types of data that can be stored in specific)

[//]: # (field definitions.)

[//]: # ()
[//]: # (This data table is loaded with initial data so that a list of [JSON Schema valid types]&#40;https://cswr.github.io/JsonSchema/spec/basic_types/&#41; )

[//]: # (are available for use.)

[//]: # ()
[//]: # (## tenant)

[//]: # ()
[//]: # (This is an important table in the system, used to group users and objects together with)

[//]: # (their own tenancy names.  This concept is similar to a Namespace, in that only objects)

[//]: # (that belong to a tenant can be used by the tenant.  Tenants contain a `data` field, which)

[//]: # (can be used to store information specific to the tenant.)

[//]: # ()
[//]: # (## tenant_user)

[//]: # ()
[//]: # (This groups users with tenants.  It contains a `permission` column for eventual ABAC)

[//]: # (service functionality.)

[//]: # ()
[//]: # (## field)

[//]: # ()
[//]: # (The field table defines a `data_type` to an object that can be assigned a `property`.)

[//]: # (Think of a field as a class or object store type, which can be instantiated to store)

[//]: # (data contained in a class.  Fields can be reused and reassigned to as many properties)

[//]: # (as desired.)

[//]: # ()
[//]: # (When data is assigned to a field from a class instantiation, that data can be indexed by)

[//]: # (the system, and can be used to cross-reference data between other instantiated classes)

[//]: # (using internal tooling.)

[//]: # ()
[//]: # (## property)

[//]: # ()
[//]: # (A property is an assignment of a field to a name and default properties which can be used)

[//]: # (by a class in order to define its schema.)

[//]: # ()
[//]: # (## class)

[//]: # ()
[//]: # (This is a storage mechanism that defines a schema for the data it can contain.  Think of)

[//]: # (a `Class` as the same as a `Class` in other languages, where it can define the names of)

[//]: # (properties it stores, along with the data type for each property.)

[//]: # ()
[//]: # (## class_property)

[//]: # ()
[//]: # (This defines the properties that are attached to a `Class`, defining its schema.)

[//]: # ()
[//]: # (## object_property)

[//]: # ()
[//]: # (Properties can contain complex objects, which are defined using this table.  This table)

[//]: # (allows a property &#40;of an object type&#41; to contain multiple other objects, even objects of)

[//]: # (objects, if defined properly by the schema.)

[//]: # ()
[//]: # (# Stored Procedures)

[//]: # ()
[//]: # (Stored procedures are used in Objectified's Database engine to assist with creation of)

[//]: # (schemas and validation rules.  It also controls insertion of data from one table to)

[//]: # (another, enforcing data retention rules.)

[//]: # ()
[//]: # (## enforce_class_property_tenant)

[//]: # ()
[//]: # (Triggered on upsert in `class_property`, checks that the class and property are members)

[//]: # (of the same tenant ID.)

[//]: # ()
[//]: # (## generate_schema_for_class&#40;id&#41;)

[//]: # ()
[//]: # (Walks a `Class` by its ID, generating a JSON Schema as a result based on the)

[//]: # (`class_property` membership for the `Class`.  Obeys generation of properties and `$ref`)

[//]: # (references.)

[//]: # ()
[//]: # (## update_class_schema&#40;id&#41;)

[//]: # ()
[//]: # (Triggered on upsert to `class_property` table, calling `generate_schema_for_class` when)

[//]: # (a change is detected, re-generating the schema, and saving it in the `class_schema`)

[//]: # (table.)

[//]: # ()
[//]: # (## nullify_vectorization)

[//]: # ()
[//]: # (Triggered on upsert in `instance_current`, nullifies the embedding table on update.)

[//]: # ()
[//]: # (## enforce_instance_tenancy)

[//]: # ()
[//]: # (Triggered on upsert in `instance`, enforces that the owner and tenant have appropriate )

[//]: # (access to the `Class` by ID when an `instance` is being inserted or updated.)

[//]: # ()
[//]: # (## validate_and_update_instance_data)

[//]: # ()
[//]: # (Triggered on create, update, delete, or restore of data in the `instance_data` table,)

[//]: # (copying data to the `instance_current` table after validation against the `class_schema`)

[//]: # (table.  Performs replacement, deletion, restoration of data, and update delta operations)

[//]: # (automatically.)

[//]: # ()
[//]: # (## create_default_fields_for_tenant&#40;id&#41;)

[//]: # ()
[//]: # (Used to create a set of default field definitions for a tenant by their Tenant ID.)

[//]: # (Creates fields that map to data types, both the data types and the field names are)

[//]: # (identical.  Generic descriptions for all data types are included.)
