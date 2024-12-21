# objectified-db

Database Layer of Objectified

This project contains the database for Objectified.

## Prerequisites

This database schema is defined for Postgres.

## Running the script

In order to run the loading script, you must have the following environment variables
set:

- POSTGRES_USER
- POSTGRES_PASS
- POSTGRES_HOST
- POSTGRES_PORT

All of these will be used to create a `postgresql://` URL for which the psql command
will use.

To run the script, simply run:

```shell
sh build.sh
```

This will build and execute the SQL commands to generate the schema.

> **NOTE:**\
> If you have already run this script once, and want to back up the data, make sure
> to use `pg_dump` command to dump your schema beforehand.

## Current database visualized

![image](images/current-db.png "Current Database Relationship")
