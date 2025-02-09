ALTER TABLE obj.instance_current
DROP COLUMN IF EXISTS embedding;

ALTER TABLE obj.instance_current ADD COLUMN embedding float8[];
