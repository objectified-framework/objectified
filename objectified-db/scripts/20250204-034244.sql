-- Link definition table

DROP TABLE IF EXISTS obj.link_desc CASCADE;
DROP INDEX IF EXISTS idx_link_desc_unique;

CREATE TABLE obj.link_desc (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES obj.tenant(id) ON DELETE CASCADE,
    name VARCHAR(80) NOT NULL,
    description VARCHAR(4096) NOT NULL,
    left_class_id UUID NOT NULL REFERENCES obj.class(id),
    right_class_id UUID NOT NULL REFERENCES obj.class(id),
    property_id UUID NOT NULL REFERENCES obj.property(id)
);

CREATE UNIQUE INDEX idx_link_desc_unique ON obj.link_desc(name, tenant_id);
