--- Property tables

DROP TABLE IF EXISTS obj.property CASCADE;
CREATE TABLE obj.property (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES obj.tenant(id),
    field_id UUID NOT NULL REFERENCES obj.field(id),
    name VARCHAR(80) NOT NULL,
    description TEXT NOT NULL,
    required BOOLEAN NOT NULL DEFAULT FALSE,
    nullable BOOLEAN NOT NULL DEFAULT FALSE,
    is_array BOOLEAN NOT NULL DEFAULT FALSE,
    default_value TEXT DEFAULT NULL,
    constraints JSONB DEFAULT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    update_date TIMESTAMP WITHOUT TIME ZONE,
    delete_date TIMESTAMP WITHOUT TIME ZONE,
    UNIQUE (tenant_id, name)
);

CREATE INDEX idx_property_tenant ON obj.property(tenant_id);
CREATE INDEX idx_property_field ON obj.property(field_id);

-- Automatically update the update_date when an upsert takes place.
CREATE OR REPLACE FUNCTION update_property_update_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_date = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_property_date
    BEFORE UPDATE ON obj.property
    FOR EACH ROW
    EXECUTE FUNCTION update_property_update_date();

-- Automatically update the delete_Date when enabled is toggled.
CREATE OR REPLACE FUNCTION update_property_delete_date()
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

CREATE TRIGGER trigger_update_property_delete_date
    BEFORE UPDATE ON obj.property
    FOR EACH ROW
    WHEN (NEW.enabled IS DISTINCT FROM OLD.enabled)
    EXECUTE FUNCTION update_property_delete_date();
