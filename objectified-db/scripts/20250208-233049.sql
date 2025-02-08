-- This function updates the obj.class_schema object when a class_property is upserted into the database.
-- This is used to keep the schema up-to-date at all times, and used to cross-reference and validate
-- data upserted into the instance_data table.

CREATE OR REPLACE FUNCTION obj.update_class_schema(class_uuid UUID)
RETURNS VOID AS $$
DECLARE
    schema JSONB;
    start_time TIMESTAMP := clock_timestamp();
    end_time TIMESTAMP;
    exec_duration INTERVAL;
BEGIN
    -- Log the start of the procedure.
    INSERT INTO obj.system_log (source_id, source_table, procedure_name, action, message, log_timestamp)
    VALUES (
        class_uuid,
        'obj.class_schema',
        'update_class_schema',
        'start',
        'Procedure update_class_schema started.',
        NOW()
    );

    -- Step 1: Generate the JSON Schema.
    schema := obj.generate_schema_for_class(class_uuid);

    -- Step 2: Upsert the class_schema table.
    INSERT INTO obj.class_schema (class_id, schema)
        VALUES (class_uuid, schema)
            ON CONFLICT (class_id) DO UPDATE
           SET schema = EXCLUDED.schema;

    -- Benchmark: Calculate the execution duration.
    end_time := clock_timestamp();
    exec_duration := end_time - start_time;

    -- Log successful completion and execution time.
    INSERT INTO obj.system_log (source_id, source_table, procedure_name, action, message, execution_time, log_timestamp)
    VALUES (
        class_uuid,
        'obj.class_schema',
        'update_class_schema',
        'finish',
        'JSON Schema updated successfully.',
        exec_duration,
        NOW()
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION obj.trigger_update_class_schema_func()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        PERFORM obj.update_class_schema(OLD.class_id);
        RETURN OLD;
    ELSE
        PERFORM obj.update_class_schema(NEW.class_id);
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_class_schema ON obj.class_property;

CREATE TRIGGER trigger_update_class_schema
    AFTER INSERT OR UPDATE OR DELETE ON obj.class_property
    FOR EACH ROW EXECUTE FUNCTION obj.trigger_update_class_schema_func();
