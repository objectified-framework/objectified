DROP TYPE IF EXISTS obj.user_source_enum CASCADE;
CREATE TYPE obj.user_source_enum AS ENUM ('local', 'google', 'github', 'gitlab');

ALTER TABLE obj.user ADD COLUMN IF NOT EXISTS source obj.user_source_enum DEFAULT 'local';
