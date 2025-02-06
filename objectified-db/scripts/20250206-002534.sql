CREATE EXTENSION vector;

ALTER TABLE obj.instance_current ADD COLUMN embedding vector(1536);
