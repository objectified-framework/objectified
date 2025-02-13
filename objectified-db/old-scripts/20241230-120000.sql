--- Object properties

DROP TABLE IF EXISTS obj.object_property CASCADE;
DROP INDEX IF EXISTS idx_object_property_unique;

CREATE TABLE obj.object_property (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES obj.property(id),
    child_id UUID NOT NULL REFERENCES obj.property(id)
);

CREATE UNIQUE INDEX idx_object_property_unique ON obj.object_property(parent_id, child_id);
