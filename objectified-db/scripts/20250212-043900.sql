--- Class tables

DROP TABLE IF EXISTS obj.class CASCADE;
DROP INDEX IF EXISTS idx_class_tenant;
DROP INDEX IF EXISTS idx_class_owner;

CREATE TABLE obj.class (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES obj.tenant(id),
    owner_id UUID NOT NULL REFERENCES obj.user(id),
    name VARCHAR(80) NOT NULL,
    description TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT true,
    create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP WITHOUT TIME ZONE,
    delete_date TIMESTAMP WITHOUT TIME ZONE,
    UNIQUE (tenant_id, name)
);

CREATE INDEX idx_class_tenant ON obj.class(tenant_id);
CREATE INDEX idx_class_owner ON obj.class(owner_id);

-- Update update_date on the table if any changes are made to the class.
CREATE OR REPLACE FUNCTION update_class_update_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_date = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_class_date
    BEFORE UPDATE ON obj.class
    FOR EACH ROW
    EXECUTE FUNCTION update_class_update_date();

-- Update delete_date if the enabled flag changes.
CREATE OR REPLACE FUNCTION update_class_delete_date()
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

CREATE TRIGGER trigger_update_class_delete_date
    BEFORE UPDATE ON obj.class
    FOR EACH ROW
    WHEN (NEW.enabled IS DISTINCT FROM OLD.enabled)
    EXECUTE FUNCTION update_class_delete_date();
