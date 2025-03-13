---
sidebar_position: 2
---

# Concepts and Terminology 

Objectified has a simple number of concepts and terms that you should be
aware of.  This guide will help you as you build your classes, design
your field and properties, and ultimately, create your API designs.

## Concepts

Objectified stores and defines its data internally using PostgreSQL.
There are a number of database tables and stored procedures that assist
with its storage, along with manipulation and representation of the
data stored therein.

Stored procedures are used to help maintain data security, validity, and
logging.

Objectified never deletes data: records that are "removed" are marked
for deletion with a "[soft-delete](https://en.wiktionary.org/wiki/soft_deletion)"
flag.

Data is shaped using a combination of `Class` definitions that are
formed using `Properties`.  Their data is joined together by way of a
`ClassProperty` class (joining table) that defines the data that each
`Class` represents.

The Objectified platform stack provides a means to generate `Class`
definitions, along with the ability to store and retrieve records
that conform to the shapes of each defined `Class`.

## Terminology

### Data Type

A `Data Type` is a core type that identifies the data that can be stored
in a `Field`.  These are [core JSON primitive data types](https://www.w3schools.com/js/js_json_datatypes.asp) that are
represented by Objectified, and by [JSON schemas](https://www.json.org/json-en.html).

Data types can contain arrays of data, enumerations, regular expressions,
and much more.

Core data types cannot be modified or removed, as they are considered
essential to the Objectified platform.

Data types are shared among all `Tenant`s in Objectified.

:::note

Note, there are currently 8 data types defined in the platform.  These
types cannot be changed; they are used by `Field` definitions in order
to identify the type of data that can be stored.

:::

### Tenant

`Tenant`s are names that are used to organize groups of objects or
organizations.  They are used to prevent name collisions that can occur
when multiple organizations may use similar names to describe different
object definitions.

A `Tenant` ensures that all of a given set of objects have unique names
so that they may easily be identified and separated under a common group.

For instance, one `Tenant`'s definition of a `User` may differ from
another `Tenant`'s `User`. Same with a `Car`, `Bike`, or `Computer`.

:::note

Tenants are created by the Objectified staff.  Each organization has a
limit of 3 tenants that they can use.  Additional tenancies may require
additional licenses.

Furthermore, users are assigned to tenants based on the requirements for
each tenant.

:::

### Class

`Class`es are templates that define the _shape_ (or _schema_) of data that 
can be contained in a record (or `Instance`).

`Class`es contain any name that you want, however, we recommend a name that
describes the type of data that the object will end up storing.

:::info

Avoid names that begin with numbers or small letters.  `Class` names
should be named using [PascalCase](https://en.wiktionary.org/wiki/Pascal_case),
and should not contain any spaces or special characters.

:::

:::tip

Examples of good names include `User`, `Account`, `StreetAddress`.\
Bad examples include names like `phoneNumber` and `zipcodeAnd4`.

Avoid plurality in the `Class` names wherever possible.

:::

### Field

In Object-Oriented design, `Field`s define the data that can be stored
for a `Class` `Property`.  `Property` names are unique per `Class` and
the `Field`s that contain the storage definitions can be reused.

:::info

Avoid naming fields with the same names for properties.  The properties
that you define should use the `Field` to describe the data that they
store - not the other way around.

`Field` names [should be camelCase](https://en.wikipedia.org/wiki/Camel_case).

:::

### Property

`Properties` are member stores that are used by `Class`es to store
data defined by a `Field`.

`Properties` describe `Fields` by adding options such as nullability,
default values, required flags, and so on.  `Properties` can also be
objects that implement other `Properties` (sub-properties).

`Properties` can reuse `Fields` as required - for instance, multiple
strings, numeric values, floating point definitions, etc.

`Properties` are not specific to any one `Class` - they can be reused
as necessary.

:::tip

`Property` names [should be camelCase](https://en.wikipedia.org/wiki/Camel_case).

:::

### Class Property

A `ClassProperty` defines the properties that are assigned to a `Class`.
These are used to define the data that a `Class` can store when a new
`Instance` of data is created.

`ClassProperties` are used to create the templates to describe what a
`Class` can contain, thus creating the JSON Schema rules that define
what they store.

:::tip

It is recommended to use an `ID` field in each class so that their
data instances can be retrieved using this unique field.

:::
