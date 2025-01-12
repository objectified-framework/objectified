--- Class tables

DROP TABLE IF EXISTS obj.class CASCADE;
CREATE TABLE obj.class (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES obj.tenant(id),
    owner_id UUID NOT NULL REFERENCES obj.user(id),
    name VARCHAR(80) NOT NULL,
    description VARCHAR(4096) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT true,
    create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    update_date TIMESTAMP WITHOUT TIME ZONE,
    delete_date TIMESTAMP WITHOUT TIME ZONE
);

--- Property tables

DROP TABLE IF EXISTS obj.property CASCADE;
CREATE TABLE obj.property (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES obj.tenant(id),
    field_id UUID NOT NULL REFERENCES obj.field(id),
    name VARCHAR(80) NOT NULL,
    description VARCHAR(4096) NOT NULL,
    required BOOLEAN NOT NULL DEFAULT false,
    nullable BOOLEAN NOT NULL DEFAULT false,
    is_array BOOLEAN NOT NULL DEFAULT false,
    default_value VARCHAR(4096) DEFAULT NULL,
    enabled BOOLEAN NOT NULL DEFAULT true,
    create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    update_date TIMESTAMP WITHOUT TIME ZONE,
    delete_date TIMESTAMP WITHOUT TIME ZONE
);

--- Class table property definitions

DROP TABLE IF EXISTS obj.class_property CASCADE;
DROP INDEX IF EXISTS idx_class_property_unique;

CREATE TABLE obj.class_property (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES obj.class(id),
    property_id UUID NOT NULL REFERENCES obj.property(id)
);

CREATE UNIQUE INDEX idx_class_property_unique ON obj.class_property(class_id, property_id);

--- Object properties

DROP TABLE IF EXISTS obj.object_property CASCADE;
DROP INDEX IF EXISTS idx_object_property_unique;

CREATE TABLE obj.object_property (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES obj.property(id),
    child_id UUID NOT NULL REFERENCES obj.property(id)
);

CREATE UNIQUE INDEX idx_object_property_unique ON obj.object_property(parent_id, child_id);
