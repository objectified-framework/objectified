--- Fields

DROP TABLE IF EXISTS obj.field CASCADE;
DROP INDEX IF EXISTS idx_field_unique_name;

CREATE TABLE obj.field (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES obj.tenant(id),
    data_type_id UUID NOT NULL REFERENCES obj.data_type(id),
    name VARCHAR(80) NOT NULL,
    description VARCHAR(4096) NOT NULL,
    default_value TEXT,
    enabled BOOLEAN NOT NULL DEFAULT true,
    create_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    update_date TIMESTAMP WITHOUT TIME ZONE,
    delete_date TIMESTAMP WITHOUT TIME ZONE
);

CREATE UNIQUE INDEX idx_field_unique_name ON obj.field(tenant_id, UPPER(name));
