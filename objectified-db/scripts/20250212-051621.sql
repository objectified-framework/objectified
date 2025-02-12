--- Fields

DROP TABLE IF EXISTS obj.field CASCADE;
DROP INDEX IF EXISTS idx_field_unique_name;
DROP INDEX IF EXISTS idx_field_tenant;
DROP INDEX IF EXISTS idx_field_data_type;

CREATE TABLE obj.field (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES obj.tenant(id),
    data_type_id UUID NOT NULL REFERENCES obj.data_type(id),
    name VARCHAR(80) NOT NULL,
    description TEXT NOT NULL,
    data_format TEXT,
    pattern TEXT,
    enum_values TEXT[],
    enum_descriptions TEXT[],
    examples TEXT[],
    enabled BOOLEAN NOT NULL DEFAULT true,
    create_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    update_date TIMESTAMP WITHOUT TIME ZONE,
    delete_date TIMESTAMP WITHOUT TIME ZONE,
    UNIQUE (tenant_id, name)
);

CREATE INDEX idx_field_tenant ON obj.field(tenant_id);
CREATE INDEX idx_field_data_type ON obj.field(data_type_id);

-- Automatically updates the update date when a change to the field table takes place.
CREATE OR REPLACE FUNCTION update_field_update_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_date = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_field_date
    BEFORE UPDATE ON obj.field
    FOR EACH ROW
    EXECUTE FUNCTION update_field_update_date();

-- Automatically updates the delete date for a field when a field is disabled or cleared when enabled.
CREATE OR REPLACE FUNCTION update_field_delete_date()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.enabled = FALSE THEN
        NEW.delete_date = now();  -- Set delete_date when disabled
    ELSIF NEW.enabled = TRUE THEN
        NEW.delete_date = NULL;  -- Remove delete_date when re-enabled
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_field_delete_date
    BEFORE UPDATE ON obj.field
    FOR EACH ROW
    WHEN (NEW.enabled IS DISTINCT FROM OLD.enabled)
    EXECUTE FUNCTION update_field_delete_date();
