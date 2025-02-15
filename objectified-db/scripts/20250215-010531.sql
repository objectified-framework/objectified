DROP INDEX IF EXISTS idx_class_schema_class_id;
CREATE UNIQUE INDEX idx_class_schema_class_id ON obj.class_schema (class_id);
