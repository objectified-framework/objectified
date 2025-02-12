DROP TYPE IF EXISTS obj.data_type_enum CASCADE;
CREATE TYPE obj.data_type_enum AS ENUM (
    'STRING', 'BOOLEAN', 'NUMBER', 'INTEGER', 'NULL', 'OBJECT', '$REF'
);

DROP TABLE IF EXISTS obj.data_type CASCADE;
DROP INDEX IF EXISTS idx_data_type_unique_name;

CREATE TABLE obj.data_type (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES obj.user(id),
    name VARCHAR(80) NOT NULL,
    description VARCHAR(4096) NOT NULL,
    data_type obj.data_type_enum NOT NULL,
    data_format VARCHAR(80),
    is_array BOOLEAN NOT NULL DEFAULT false,
    max_length INT NOT NULL DEFAULT 0,
    pattern TEXT,
    enum_values TEXT[],
    enum_descriptions TEXT[],
    examples TEXT[],
    enabled BOOLEAN NOT NULL DEFAULT true,
    core_type BOOLEAN NOT NULL DEFAULT false,
    create_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    update_date TIMESTAMP WITHOUT TIME ZONE,
    delete_date TIMESTAMP WITHOUT TIME ZONE
);

CREATE UNIQUE INDEX idx_data_type_unique_name ON obj.data_type(UPPER(name));

--- Insert initial types matching JSON Schema types

INSERT INTO obj.data_type (name, description, data_type, core_type) VALUES
    ('string', 'String type', 'STRING', true),
    ('number', 'Generic numeric type', 'NUMBER', true),
    ('integer', 'Generic integer type', 'INTEGER', true),
    ('boolean', 'Boolean type', 'BOOLEAN', true),
    ('null', 'Null storage value', 'NULL', true),
    ('object', 'A free formed object', 'OBJECT', true);

INSERT INTO obj.data_type (name, description, data_type, is_array, core_type) VALUES
    ('array', 'An array value', 'ARRAY', true, true);

INSERT INTO obj.data_type (name, description, data_type, data_format, core_type) VALUES
    ('float', 'A floating point number', 'NUMBER', 'float', true),
    ('double', 'A floating point number with double precision', 'NUMBER', 'double', true),
    ('int32', 'Signed 32-bit integer', 'INTEGER', 'int32', true),
    ('int64', 'Signed 64-bit integer', 'INTEGER', 'int64', true),
    ('date', 'Full-Date notation per RFC-3339 section 5.6', 'STRING', 'date', true),
    ('date-time', 'Date-time notation per RFC-3339 section 5.6', 'STRING', 'date-time', true),
    ('password', 'A password UI hint', 'STRING', 'password', true),
    ('byte', 'Base64-encoded character string', 'STRING', 'byte', true),
    ('binary', 'Binary data', 'STRING', 'binary', true);
