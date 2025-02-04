-- Class auto-generated schema table

DROP TABLE IF EXISTS obj.class_schema CASCADE;
DROP INDEX IF EXISTS idx_class_schema_unique;

CREATE TABLE obj.class_schema (
    class_id UUID NOT NULL REFERENCES obj.class(id) ON DELETE CASCADE,
    schema JSONB
);

CREATE UNIQUE INDEX idx_class_schema_unique ON obj.class_schema(class_id);
