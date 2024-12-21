CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP SCHEMA IF EXISTS obj CASCADE;
CREATE SCHEMA obj;

-- User database

DROP TABLE IF EXISTS obj.user CASCADE;
DROP TYPE IF EXISTS obj_user_source;

CREATE TYPE obj_user_source AS ENUM ('github', 'gitlab', 'azure');

CREATE TABLE obj.user (
    id UUID NOT NULL PRIMARY KEY,
    email_address VARCHAR(255) NOT NULL,
    source obj_user_source[] NOT NULL,
    data JSON
);

INSERT INTO obj.user (id, email_address, source) VALUES (uuid_generate_v4(), 'kenji.suenobu@fastmail.com', '{github}');
