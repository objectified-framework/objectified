DROP TABLE IF EXISTS obj.class_property;
DROP INDEX IF EXISTS idx_class_property_class;
DROP INDEX IF EXISTS idx_class_property_property;

CREATE TABLE obj.class_property (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES obj.class(id),
    property_id UUID NOT NULL REFERENCES obj.property(id),
    UNIQUE (class_id, property_id)
);

CREATE INDEX idx_class_property_class ON obj.class_property(class_id);
CREATE INDEX idx_class_property_property ON obj.class_property(property_id);
