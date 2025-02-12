DROP TYPE IF EXISTS obj.data_type_enum CASCADE;
CREATE TYPE obj.data_type_enum AS ENUM (
    'STRING', 'BOOLEAN', 'NUMBER', 'INTEGER', 'NULL', 'OBJECT', '$REF'
);

DROP TABLE IF EXISTS obj.data_type CASCADE;
DROP INDEX IF EXISTS idx_data_type_unique_name;

CREATE TABLE obj.data_type (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(80) NOT NULL,
    description TEXT NOT NULL,
    data_type obj.data_type_enum NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT true,
    create_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    update_date TIMESTAMP WITHOUT TIME ZONE,
    delete_date TIMESTAMP WITHOUT TIME ZONE
);

CREATE UNIQUE INDEX idx_data_type_unique_name ON obj.data_type(UPPER(name));

-- Modify the data_type table so that the update_date is updated when a change is made.
CREATE OR REPLACE FUNCTION update_data_type_update_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_date = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_data_type_date
    BEFORE UPDATE ON obj.data_type
    FOR EACH ROW
    EXECUTE FUNCTION update_data_type_update_date();

-- Modify the data_type table to update the delete_date when the enabled flag is disabled.
CREATE OR REPLACE FUNCTION update_data_type_delete_date()
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
CREATE TRIGGER trigger_update_data_type_delete_date
    BEFORE UPDATE ON obj.data_type
    FOR EACH ROW
    WHEN (NEW.enabled IS DISTINCT FROM OLD.enabled)
    EXECUTE FUNCTION update_data_type_delete_date();

--- Insert initial types matching JSON Schema types

INSERT INTO obj.data_type (name, description, data_type) VALUES
('string', 'String type', 'STRING'),
('number', 'Generic numeric type', 'NUMBER'),
('integer', 'Generic integer type', 'INTEGER'),
('boolean', 'Boolean type', 'BOOLEAN'),
('null', 'Null storage value', 'NULL'),
('object', 'A free formed object', 'OBJECT'),
('ref', 'A class or external reference', '$REF');
