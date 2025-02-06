CREATE EXTENSION vector;

ALTER TABLE obj.instance_current ADD COLUMN embedding_time BIGINT NOT NULL DEFAULT 0;
ALTER TABLE obj.instance_current ADD COLUMN embedding vector(1536);
