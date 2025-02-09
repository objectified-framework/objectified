-- This stored procedure will nullify the "vectorization" table for a record that gets inserted or updated
-- in the database.  This way, the vectorization script can come through and update those records in need
-- of indexing.

CREATE OR REPLACE FUNCTION obj.nullify_vectorization()
RETURNS TRIGGER AS $$
BEGIN
    -- When an update occurs (such as via an upsert), clear the vectorization column.
    NEW.vectorization := NULL;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_nullify_vectorization ON obj.instance_current;

CREATE TRIGGER trigger_nullify_vectorization
BEFORE UPDATE ON obj.instance_current
FOR EACH ROW
EXECUTE FUNCTION obj.nullify_vectorization();
