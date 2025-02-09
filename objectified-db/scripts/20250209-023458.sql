-- This stored procedure will nullify the "vectorization" table for a record that gets inserted or updated
-- in the database.  This way, the vectorization script can come through and update those records in need
-- of indexing.

CREATE OR REPLACE FUNCTION obj.nullify_vectorization()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        -- If the update did not explicitly set a new vectorization value,
        -- then keep the old vectorization (i.e. do not nullify it).
        IF NEW.vectorization IS NULL THEN
            NEW.vectorization := OLD.vectorization;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_nullify_vectorization ON obj.instance_current;

CREATE TRIGGER trigger_nullify_vectorization
BEFORE UPDATE ON obj.instance_current
FOR EACH ROW
EXECUTE FUNCTION obj.nullify_vectorization();
