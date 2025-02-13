# objectified-db schema

This is an explanation of the schema, what each table means, and how its
referential integrity is set up.

## user

This is the user table.  The "create_date" is automatically populated when a new user
is added to the database.  When any updates are made to any columns, the update_date
is automatically populated using the `trigger_update_user_date` trigger.

## tenant

Tenants allow for logical groups of ownership in Objectified.  It is used to separate
and manage different organizations, users, or groups that use the same system while
keeping their data isolated.

Tenants can be created, updated, and deleted, but their records are soft-deleted, meaning
their delete dates will be updated, but their records will be disabled.

When a tenant record is updated, the update_date is automatically altered by the
`trigger_update_tenant_date` trigger.  When a tenant is disabled, the `delete_date`
column is updated with the current date by the `trigger_update_tenant_delete_date`
trigger.

## tenant_user

This table describes user tenancy membership.  It describes a membership list of the
users and tenants that they belong to, along with any additional `permissions` they might
be assigned, using a free-formed JSON object.  Create, update, and delete dates are
triggered using the `trigger_update_tenant_user_date` trigger, along with the
`trigger_update_tenant_user_delete_date` triggers, respectively.

## data_type

This table defines and stores the JSON Schema data types that are available for use by
`Field` definitions.  They obey the same triggers with respect to `update` and `delete`
actions using the `trigger_update_data_type_date` and `trigger_update_data_type_delete_date`
triggers, respectively.

## class

This is a storage mechanism that defines a schema for the data it can contain.  Think of
a `Class` as the same as a `Class` in other languages, where it can define the names of
properties it stores, along with the data type for each property.

They obey the same triggers with respect to `update` and `delete`
actions using the `trigger_update_class_date` and `trigger_update_class_delete_date`
triggers, respectively. 

## field

This is a table that extends data types by assigning constraints, formats, patterns, 
enumeration values, and examples.  It is used by `Property` entries to describe how
the field will be applied.

They obey the same triggers with respect to `update` and `delete`
actions using the `trigger_update_field_date` and `trigger_update_field_delete_date`
triggers, respectively.

## property

This table defines properties that accept a `Field` definition to describe the data
in which the property represents.  The property is an extension of the `Field`, providing
information such as nullability, array lists, default values, and additional
constraints.

They obey the same triggers with respect to `update` and `delete`
actions using the `trigger_update_property_date` and `trigger_update_property_delete_date`
triggers, respectively.

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

# Stored Procedures

Stored procedures are used in Objectified's Database engine to assist with creation of
schemas and validation rules.  It also controls insertion of data from one table to
another, enforcing data retention rules.

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

### obj.create_default_fields_for_tenant(id)

Used to create a set of default field definitions for a tenant by their Tenant ID.
Creates fields that map to data types, both the data types and the field names are
identical.  Generic descriptions for all data types are included.
