-- Latest instance data store

DROP TABLE IF EXISTS obj.instance_current CASCADE;
DROP INDEX IF EXISTS idx_instance_current_unique;

CREATE TABLE obj.instance_current (
    instance_id UUID NOT NULL REFERENCES obj.instance(id),
    instance_data JSONB NOT NULL
);

CREATE UNIQUE INDEX idx_instance_current_unique ON obj.instance_current(instance_id);
