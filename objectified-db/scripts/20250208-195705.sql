-- Instance data store

DROP TABLE IF EXISTS obj.instance_data CASCADE;
DROP TYPE IF EXISTS obj_instance_data_enum;

CREATE TYPE obj_instance_data_enum AS ENUM ('created', 'updated', 'deleted', 'restored');

CREATE TABLE obj.instance_data (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    instance_id UUID NOT NULL REFERENCES obj.class(id) ON DELETE CASCADE,
    instance_action obj_instance_data_enum NOT NULL DEFAULT 'created',
    instance_date DATE NOT NULL DEFAULT NOW(),
    data JSONB
);
