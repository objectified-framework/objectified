CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP SCHEMA IF EXISTS obj CASCADE;
CREATE SCHEMA obj;

-- User database

DROP TABLE IF EXISTS obj.user CASCADE;
DROP INDEX IF EXISTS idx_user_email;
DROP INDEX IF EXISTS idx_user_source;
DROP TYPE IF EXISTS obj_user_source;

CREATE TYPE obj_user_source AS ENUM ('github', 'gitlab', 'azure');

CREATE TABLE obj.user (
    id UUID NOT NULL PRIMARY KEY,
    email_address VARCHAR(255) NOT NULL,
    source obj_user_source[] NOT NULL,
    data JSON,
    create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP WITHOUT TIME ZONE
);

INSERT INTO obj.user (id, email_address, source)
    VALUES (
        uuid_generate_v4(), 'ksuenobu@fastmail.com', '{github}'
    );

CREATE UNIQUE INDEX idx_user_email ON obj.user(email_address);
CREATE INDEX idx_user_source ON obj.user USING GIN (source);

-- Trigger Function to Update `update_date`
-- This trigger will automatically update the obj.user record when an update is made.
-- New records (create) will automatically use NOW() as default.
CREATE OR REPLACE FUNCTION update_user_update_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_date = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to Fire on Any Update
CREATE TRIGGER trigger_update_user_date
BEFORE UPDATE ON obj.user
FOR EACH ROW
EXECUTE FUNCTION update_user_update_date();

--- Classic tenant database

DROP TABLE IF EXISTS tenant CASCADE;
DROP INDEX IF EXISTS idx_tenant_name;
DROP INDEX IF EXISTS idx_tenant_owner;

CREATE TABLE obj.tenant (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES obj.user(id),
    name VARCHAR(80) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    data JSON,
    create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP WITHOUT TIME ZONE,
    delete_date TIMESTAMP WITHOUT TIME ZONE
);

CREATE UNIQUE INDEX idx_tenant_name ON obj.tenant(UPPER(name));
CREATE INDEX idx_tenant_owner ON obj.tenant(owner_id);

INSERT INTO obj.tenant (owner_id, name) VALUES
    ((SELECT id FROM obj.user WHERE email_address='ksuenobu@fastmail.com'), 'Objectified Project');

-- Trigger Function to Update `update_date`
-- This trigger will automatically update the obj.user record when an update is made.
-- New records (create) will automatically use NOW() as default.
CREATE OR REPLACE FUNCTION update_tenant_update_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_date = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to Fire on Any Update
CREATE TRIGGER trigger_update_tenant_date
    BEFORE UPDATE ON obj.tenant
    FOR EACH ROW
    EXECUTE FUNCTION update_tenant_update_date();

-- Trigger to change the delete_date field based on enabled flag.  If enabled is set false,
-- the delete_date is set to NOW().  Otherwise, the delete_date is set NULL when enabled.
CREATE OR REPLACE FUNCTION update_tenant_delete_date()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.enabled = FALSE THEN
        NEW.delete_date = NOW();  -- Set delete_date when disabled
    ELSIF NEW.enabled = TRUE THEN
        NEW.delete_date = NULL;  -- Remove delete_date when re-enabled
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tenant_delete_date
    BEFORE UPDATE ON obj.tenant
    FOR EACH ROW
    WHEN (NEW.enabled IS DISTINCT FROM OLD.enabled)
EXECUTE FUNCTION update_tenant_delete_date();

--- Tenant membership

DROP TABLE IF EXISTS tenant_user CASCADE;
DROP INDEX IF EXISTS idx_unique_tenant_user;
DROP INDEX IF EXISTS idx_tenant_user_tenant;
DROP INDEX IF EXISTS idx_tenant_user_user;

CREATE TABLE obj.tenant_user (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES obj.tenant(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES obj.user(id) ON DELETE CASCADE,
    enabled BOOLEAN NOT NULL DEFAULT true,
    permissions JSON,
    create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP WITHOUT TIME ZONE,
    delete_date TIMESTAMP WITHOUT TIME ZONE
);

CREATE UNIQUE INDEX idx_unique_tenant_user ON obj.tenant_user(tenant_id, user_id);
CREATE INDEX idx_tenant_user_tenant ON obj.tenant_user(tenant_id);
CREATE INDEX idx_tenant_user_user ON obj.tenant_user(user_id);

INSERT INTO obj.tenant_user (tenant_id, user_id, enabled) VALUES
    ((SELECT id FROM obj.tenant WHERE name='Objectified Project'),
     (SELECT id FROM obj.user WHERE email_address='ksuenobu@fastmail.com'),
     true);

-- Trigger Function to Update `update_date` When `permissions` Changes
-- This trigger will only occur when the "permissions" table is updated.  If this table
-- is changed, the "update_date" will reflect the new date to indicate the change.
CREATE OR REPLACE FUNCTION update_tenant_user_update_date()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.permissions IS DISTINCT FROM OLD.permissions THEN
        NEW.update_date = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to Fire on `permissions` Updates Only
CREATE TRIGGER trigger_update_tenant_user_date
    BEFORE UPDATE ON obj.tenant_user
    FOR EACH ROW
    EXECUTE FUNCTION update_tenant_user_update_date();

-- Trigger Function to Auto-Update `delete_date` Based on `enabled`
-- When enabled is changed to true, the delete_date is set NULL, which will indicate that
-- the user is allowed to log in.  If the enabled flag is set false, the delete_date
-- is set to NOW(), indicating deletion.
CREATE OR REPLACE FUNCTION update_tenant_user_delete_date()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.enabled = FALSE THEN
        NEW.delete_date = NOW();  -- Set delete_date when disabled
    ELSIF NEW.enabled = TRUE THEN
        NEW.delete_date = NULL;  -- Remove delete_date when re-enabled
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to Fire When `enabled` Changes
CREATE TRIGGER trigger_update_tenant_user_delete_date
    BEFORE UPDATE ON obj.tenant_user
    FOR EACH ROW
    WHEN (NEW.enabled IS DISTINCT FROM OLD.enabled)
    EXECUTE FUNCTION update_tenant_user_delete_date();

