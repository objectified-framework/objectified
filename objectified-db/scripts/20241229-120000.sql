--- Classic tenant database

DROP TABLE IF EXISTS tenant CASCADE;
CREATE TABLE obj.tenant (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES obj.user(id),
    name VARCHAR(80) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT true,
    data JSON
);

CREATE UNIQUE INDEX idx_tenant_name ON obj.tenant(UPPER(name));

INSERT INTO obj.tenant (owner_id, name) VALUES
    ((SELECT id FROM obj.user WHERE email_address='ksuenobu@fastmail.com'), 'Objectified Project');

--- Tenant membership

DROP TABLE IF EXISTS tenant_user CASCADE;
CREATE TABLE obj.tenant_user (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES obj.tenant(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES obj.user(id) ON DELETE CASCADE,
    enabled BOOLEAN NOT NULL DEFAULT true,
    permissions JSON
);

CREATE UNIQUE INDEX idx_unique_tenant_user ON obj.tenant_user(tenant_id, user_id);

INSERT INTO obj.tenant_user (tenant_id, user_id, enabled) VALUES
    ((SELECT id FROM obj.tenant WHERE name='Objectified Project'),
     (SELECT id FROM obj.user WHERE email_address='ksuenobu@fastmail.com'),
     true);

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
