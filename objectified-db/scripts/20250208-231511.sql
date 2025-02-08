-- This procedure generates a JSON Schema based on the class definition by its ID.  It traverses the list of
-- properties assigned to a class using class_property and joining against the class ID.  Once generated,
-- it returns the schema as a JSONB object result.  It also stores information in the obj.system_log table
-- so that it can be benchmarked and possibly modified if slowness is observed.

CREATE OR REPLACE FUNCTION obj.generate_schema_for_class(class_uuid UUID)
RETURNS JSONB AS $$
DECLARE
class_name TEXT;
    properties JSONB;
    required_fields TEXT[];
    schema JSONB;
    start_time TIMESTAMP := clock_timestamp();
    end_time TIMESTAMP;
    exec_duration INTERVAL;
BEGIN
    -- Log the start of schema generation
    INSERT INTO obj.system_log (source_id, source_table, procedure_name, action, message, log_timestamp)
    VALUES (
        class_uuid,
        'obj.class',
        'generate_schema_for_class',
        'start',
        'Starting schema generation for class ' || class_uuid,
        NOW()
    );

    -- Retrieve the class name from obj.class
    SELECT name INTO class_name
    FROM obj.class
    WHERE id = class_uuid;

    IF class_name IS NULL THEN
        INSERT INTO obj.system_log (source_id, source_table, procedure_name, action, message, log_timestamp)
        VALUES (
            class_uuid,
            'obj.class',
            'generate_schema_for_class',
            'error',
            'Class not found for class_uuid: ' || class_uuid,
            NOW()
        );
        RAISE EXCEPTION 'Class not found for class_uuid: %', class_uuid;
    END IF;

    -- Log successful class retrieval
    INSERT INTO obj.system_log (source_id, source_table, procedure_name, action, message, log_timestamp)
    VALUES (
        class_uuid,
        'obj.class',
        'generate_schema_for_class',
        'info',
        'Class found: ' || class_name,
        NOW()
    );

    -- Aggregate properties and required fields from related tables
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

    -- Log that property aggregation was successful
    INSERT INTO obj.system_log (source_id, source_table, procedure_name, action, message, log_timestamp)
    VALUES (
        class_uuid,
        'obj.class_property',
        'generate_schema_for_class',
        'info',
        'Properties aggregated successfully.',
        NOW()
    );

    -- Construct the JSON Schema
    schema := jsonb_build_object(
        '$schema', 'https://json-schema.org/draft/2020-12/schema',
        'title', class_name,
        'type', 'object',
        'properties', properties,
        'required', COALESCE(to_jsonb(required_fields), '[]'::jsonb)
    );

    -- Benchmark: Calculate execution duration
    end_time := clock_timestamp();
    exec_duration := end_time - start_time;

    -- Log completion and execution time
    INSERT INTO obj.system_log (source_id, source_table, procedure_name, action, message, execution_time, log_timestamp)
    VALUES (
        class_uuid,
        'obj.class_schema',
        'generate_schema_for_class',
        'finish',
        'Schema generation completed successfully.',
        exec_duration,
        NOW()
    );

    RETURN schema;
END;
$$ LANGUAGE plpgsql;
