-- This stored procedure is used to populate the fields table with a default set of fields that can be
-- assigned to properties.  Custom fields can be defined later, however, these are the defaults that
-- most classes will adopt.

CREATE OR REPLACE FUNCTION obj.create_default_fields_for_tenant(tenant_uuid UUID)
RETURNS VOID AS $$
BEGIN
    -- Insert standard fields first
    INSERT INTO obj.field (tenant_id, data_type_id, name, description)
    VALUES (
        tenant_uuid, (SELECT id FROM obj.data_type WHERE name = 'string' LIMIT 1),
        'string',
        'Default string field value'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description)
    VALUES (
        tenant_uuid, (SELECT id FROM obj.data_type WHERE name = 'number' LIMIT 1),
        'number',
        'Default numeric field value'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description)
    VALUES (
        tenant_uuid, (SELECT id FROM obj.data_type WHERE name = 'integer' LIMIT 1),
        'integer',
        'Default integer field value'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description)
    VALUES (
        tenant_uuid, (SELECT id FROM obj.data_type WHERE name = 'boolean' LIMIT 1),
        'boolean',
        'Default boolean field value'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description)
    VALUES (
        tenant_uuid, (SELECT id FROM obj.data_type WHERE name = 'null' LIMIT 1),
        'null',
        'Default null field value'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description)
    VALUES (
        tenant_uuid, (SELECT id FROM obj.data_type WHERE name = 'object' LIMIT 1),
        'object',
        'Default object field value'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description)
    VALUES (
        tenant_uuid, (SELECT id FROM obj.data_type WHERE name = 'ref' LIMIT 1),
        'ref',
        'Default $ref field value'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, data_format)
    VALUES (
        tenant_uuid, (SELECT id FROM obj.data_type WHERE name = 'integer' LIMIT 1),
        'int32',
        'Default 32-bit integer field value',
        'int32'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, data_format)
    VALUES (
        tenant_uuid, (SELECT id FROM obj.data_type WHERE name = 'integer' LIMIT 1),
        'int64',
        'Default 64-bit integer field value',
        'int64'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, data_format)
    VALUES (
        tenant_uuid, (SELECT id FROM obj.data_type WHERE name = 'string' LIMIT 1),
        'date',
        'Default date field value',
        'date'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO obj.field (tenant_id, data_type_id, name, description, data_format)
    VALUES (
        tenant_uuid, (SELECT id FROM obj.data_type WHERE name = 'string' LIMIT 1),
        'date-time',
        'Default date-time field value',
        'date-time'
    ) ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;
