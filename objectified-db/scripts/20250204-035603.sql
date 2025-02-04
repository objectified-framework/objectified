-- Link definition table

DROP TABLE IF EXISTS obj.instance CASCADE;
DROP INDEX IF EXISTS idx_instance_unique;

CREATE TABLE obj.instance (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES obj.user(id),
    class_id UUID NOT NULL REFERENCES obj.class(id),
    name VARCHAR(80) NOT NULL,
    description VARCHAR(4096) DEFAULT NULL,
    create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    update_date TIMESTAMP WITHOUT TIME ZONE,
    delete_date TIMESTAMP WITHOUT TIME ZONE
);

CREATE UNIQUE INDEX instance_instance_unique ON obj.instance(name, owner_id, class_id);
