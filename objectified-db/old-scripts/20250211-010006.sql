-- This stored procedure is used to populate the fields table with a default set of fields that can be
-- assigned to properties.  Custom fields can be defined later, however, these are the defaults that
-- most classes will adopt.

CREATE OR REPLACE FUNCTION obj.create_default_fields_for_tenant(tenant_uuid UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'string' AND core_type = true LIMIT 1),
        'string',
        'Default string field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'number' AND core_type = true LIMIT 1),
        'number',
        'Default numeric value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'integer' AND core_type = true LIMIT 1),
        'integer',
        'Default integer field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'boolean' AND core_type = true LIMIT 1),
        'boolean',
        'Default boolean field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'null' AND core_type = true LIMIT 1),
        'null',
        'Default null field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'object' AND core_type = true LIMIT 1),
        'object',
        'Default generic object field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'float' AND core_type = true LIMIT 1),
        'float',
        'Default floating point field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'string' AND core_type = true LIMIT 1),
        'double',
        'Default double precision field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'int32' AND core_type = true LIMIT 1),
        'int32',
        'Default int32 field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'int64' AND core_type = true LIMIT 1),
        'int64',
        'Default int64 (bigint) field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'date' AND core_type = true LIMIT 1),
        'date',
        'Default date field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'date-time' AND core_type = true LIMIT 1),
        'date-time',
        'Default date and timestamp field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'password' AND core_type = true LIMIT 1),
        'password',
        'Default password field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'byte' AND core_type = true LIMIT 1),
        'byte',
        'Default Base64-encoded field value',
        true
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, enabled)
    VALUES
    (
        tenant_uuid,
        (SELECT id FROM obj.data_type WHERE name = 'binary' AND core_type = true LIMIT 1),
        'binary',
        'Default binary field value',
        true
    ) ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;