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
    -- Log start of schema generation
    INSERT INTO obj.system_log (
        source_id, source_table, procedure_name, action, message, log_timestamp
    )
    VALUES (
        class_uuid,
        'obj.class',
        'generate_schema_for_class',
        'start',
        'Started schema generation for class ' || class_uuid,
        NOW()
    );

    -- Retrieve the class name from obj.class
    SELECT name INTO class_name
    FROM obj.class
    WHERE id = class_uuid;

    IF class_name IS NULL THEN
        INSERT INTO obj.system_log (
            source_id, source_table, procedure_name, action, message, log_timestamp
        )
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
    INSERT INTO obj.system_log (
        source_id, source_table, procedure_name, action, message, log_timestamp
    )
    VALUES (
        class_uuid,
        'obj.class',
        'generate_schema_for_class',
        'info',
        'Class found: ' || class_name,
        NOW()
    );

    -- Aggregate properties and required fields.
    -- When a child_class_id is present, use the child class's name as the property key
    -- and generate a $ref pointer.
    SELECT
        jsonb_object_agg(
                COALESCE(p.name, child_class.name),
                CASE
                    WHEN cp.child_class_id IS NOT NULL THEN
                        jsonb_build_object('$ref', '#/components/schemas/' || cp.child_class_id::text)
                    ELSE
                        jsonb_build_object(
                                'type', LOWER(dt.data_type::TEXT),
                                'format', COALESCE(dt.data_format, NULL),
                                'description', p.description
                        )
                    END
        ) AS properties,
        array_agg(
                CASE
                    WHEN cp.child_class_id IS NOT NULL THEN COALESCE(p.name, child_class.name)
                    ELSE p.name
                    END
        ) FILTER (WHERE COALESCE(p.required, false) OR cp.child_class_id IS NOT NULL) AS required_fields
    INTO properties, required_fields
    FROM obj.class_property cp
             LEFT JOIN obj.property p ON cp.property_id = p.id
             LEFT JOIN obj.field f ON p.field_id = f.id
             LEFT JOIN obj.data_type dt ON f.data_type_id = dt.id
             LEFT JOIN obj.class child_class ON cp.child_class_id = child_class.id
    WHERE cp.class_id = class_uuid
    GROUP BY cp.class_id;

    -- Log property aggregation completion
    INSERT INTO obj.system_log (
        source_id, source_table, procedure_name, action, message, log_timestamp
    )
    VALUES (
        class_uuid,
        'obj.class_property',
        'generate_schema_for_class',
        'info',
        'Properties aggregated successfully.',
        NOW()
    );

    -- Build the final JSON Schema.
    schema := jsonb_build_object(
        '$schema', 'https://json-schema.org/draft/2020-12/schema',
        'title', class_name,
        'type', 'object',
        'properties', properties,
        'required', COALESCE(to_jsonb(required_fields), '[]'::jsonb)
    );

    -- Benchmark: calculate execution duration.
    end_time := clock_timestamp();
    exec_duration := end_time - start_time;

    -- Log completion with benchmarking info.
    INSERT INTO obj.system_log (
        source_id, source_table, procedure_name, action, message, execution_time, log_timestamp
    )
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
