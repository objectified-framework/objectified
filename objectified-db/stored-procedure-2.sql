CREATE OR REPLACE FUNCTION obj.update_class_schema(class_uuid UUID)
RETURNS VOID AS $$
DECLARE
class_name TEXT;
    properties JSONB;
    required_fields TEXT[];
schema JSONB;
    start_time TIMESTAMP := clock_timestamp();
    end_time TIMESTAMP;
    exec_duration INTERVAL;
BEGIN
    -- Log the start of the procedure
INSERT INTO obj.system_log (
    source_id,
    source_table,
    procedure_name,
    action,
    message,
    log_timestamp
)
VALUES (
           class_uuid,
           'obj.class_schema',
           'update_class_schema',
           'start',
           'Procedure update_class_schema started.',
           NOW()
       );

-- Get the class name from the obj.class table
SELECT name INTO class_name
FROM obj.class
WHERE id = class_uuid;

IF class_name IS NULL THEN
        INSERT INTO obj.system_log (
            source_id,
            source_table,
            procedure_name,
            action,
            message,
            log_timestamp
        )
        VALUES (
            class_uuid,
            'obj.class',
            'update_class_schema',
            'error',
            'Class not found for provided UUID.',
            NOW()
        );
        RAISE EXCEPTION 'Class not found for class_uuid: %', class_uuid;
END IF;

    -- Generate JSON properties and required fields from the class's properties
SELECT
    jsonb_object_agg(
            p.name,
            jsonb_build_object(
                    'type', LOWER(dt.data_type::TEXT),
                    'format', COALESCE(dt.data_format, NULL),
                    'description', p.description
            )
    ) AS properties,
    array_agg(p.name) FILTER (WHERE p.required) AS required_fields
INTO properties, required_fields
FROM obj.class_property cp
         JOIN obj.property p ON cp.property_id = p.id
         JOIN obj.field f ON p.field_id = f.id
         JOIN obj.data_type dt ON f.data_type_id = dt.id
WHERE cp.class_id = class_uuid
GROUP BY cp.class_id;

-- Construct the JSON Schema
schema := jsonb_build_object(
        '$schema', 'https://json-schema.org/draft/2020-12/schema',
        'title', class_name,
        'type', 'object',
        'properties', properties,
        'required', COALESCE(required_fields, '[]'::jsonb)
    );

    -- Insert or update the class_schema table
INSERT INTO obj.class_schema (class_id, schema)
VALUES (class_uuid, schema)
    ON CONFLICT (class_id) DO UPDATE
                                  SET schema = EXCLUDED.schema;

-- Benchmark: Calculate the execution duration
end_time := clock_timestamp();
    exec_duration := end_time - start_time;

    -- Log successful completion and benchmarking info
INSERT INTO obj.system_log (
    source_id,
    source_table,
    procedure_name,
    action,
    message,
    execution_time,
    log_timestamp
)
VALUES (
           class_uuid,
           'obj.class_schema',
           'update_class_schema',
           'finish',
           'JSON Schema updated successfully for class.',
           exec_duration,
           NOW()
       );

END;
$$ LANGUAGE plpgsql;

-- Trigger for property addition or removal
CREATE TRIGGER trg_update_class_schema
    AFTER INSERT OR DELETE ON obj.class_property
FOR EACH ROW EXECUTE FUNCTION update_class_schema();

