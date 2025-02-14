DROP TABLE IF EXISTS obj.class_schema;

CREATE TABLE obj.class_schema (
    class_id UUID PRIMARY KEY REFERENCES obj.class(id) ON DELETE CASCADE,
    schema JSONB NOT NULL,
    last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
);

-- This trigger is called when a change to the class_properties table takes place.  It will re-generate
-- the class schema on any changes performed there.  It will also be affected if any changes to any properties
-- take place.
CREATE OR REPLACE FUNCTION update_class_schema()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT and UPDATE (NEW exists)
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO obj.class_schema (class_id, schema, last_updated)
        VALUES (
            NEW.class_id,
            generate_schema_for_class(NEW.class_id),  -- Regenerate schema
            NOW()
        )
        ON CONFLICT (class_id)
        DO UPDATE SET
            schema = generate_schema_for_class(EXCLUDED.class_id),
            last_updated = NOW();

    -- Handle DELETE (NEW is NULL, use OLD.class_id)
    ELSIF TG_OP = 'DELETE' THEN
        -- Check if any properties remain for this class
        IF NOT EXISTS (
            SELECT 1 FROM obj.class_property WHERE class_id = OLD.class_id
        ) THEN
        -- If no properties exist, remove the schema entry
            DELETE FROM obj.class_schema WHERE class_id = OLD.class_id;
        ELSE
          -- If properties still exist, regenerate the schema
            UPDATE obj.class_schema
            SET schema = generate_schema_for_class(OLD.class_id),
              last_updated = NOW()
            WHERE class_id = OLD.class_id;
        END IF;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Sets a trigger on class_property upsert.
CREATE OR REPLACE TRIGGER trigger_update_class_schema
    AFTER INSERT OR UPDATE OR DELETE ON obj.class_property
    FOR EACH ROW
    EXECUTE FUNCTION update_class_schema();

-- Sets a trigger on the property updates.
CREATE OR REPLACE TRIGGER trigger_update_class_schema_direct_property
    AFTER UPDATE ON obj.property
    FOR EACH ROW
    EXECUTE FUNCTION update_class_schema();
