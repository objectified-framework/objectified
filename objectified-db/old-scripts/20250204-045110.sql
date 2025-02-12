-- Link table

DROP TABLE IF EXISTS obj.link CASCADE;

CREATE TABLE obj.link (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    link_desc_id UUID NOT NULL REFERENCES obj.link_desc(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES obj.tenant(id) ON DELETE CASCADE,
    left_instance_id UUID NOT NULL REFERENCES obj.instance(id),
    right_instance_id UUID NOT NULL REFERENCES obj.instance(id),
    join_data JSONB DEFAULT NULL
);
