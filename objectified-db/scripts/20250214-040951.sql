CREATE OR REPLACE FUNCTION generate_schema_for_class(class_uuid UUID)
RETURNS JSONB AS $$
DECLARE
    schema_json JSONB;
    component_schemas JSONB;
BEGIN
    -- Build the JSON Schema object dynamically
    SELECT jsonb_build_object(
        'title', c.name,
        'description', c.description,
        'type', 'object',
        'properties', jsonb_object_agg(
            COALESCE(cp.name, p.name, '[EMPTY]'),  -- Use class-specific name if available
            jsonb_strip_nulls(jsonb_build_object(
                'type', LOWER(dt.name),  -- Fetch `data_type` from `obj.data_type`
                'description', COALESCE(cp.description, p.description),  -- Use class-specific description if available
                'nullable', p.nullable,
                'default', p.default_value,
                'enum', CASE WHEN f.enum_values IS NOT NULL THEN f.enum_values ELSE NULL END,
                'minLength', p.constraints->>'minLength',
                'maxLength', p.constraints->>'maxLength',
                'minimum', p.constraints->>'minimum',
                'maximum', p.constraints->>'maximum',
                'pattern', CASE WHEN f.pattern IS NOT NULL THEN f.pattern ELSE NULL END,
                'format', f.data_format,
                'examples', f.examples,
                'anyOf', p.constraints->'anyOf',
                'allOf', p.constraints->'allOf',
                'oneOf', p.constraints->'oneOf',
                '$ref', CASE WHEN cp.class_id IS NOT NULL
                            THEN format('#/components/schemas/%s', c_ref.name)
                            ELSE NULL
                        END
            ))
        ),
        'required', CASE
            WHEN EXISTS (
                SELECT 1 FROM obj.property p
                JOIN obj.class_property cp ON cp.property_id = p.id
                WHERE cp.class_id = class_uuid AND p.required = TRUE
            )
            THEN ARRAY(
                SELECT COALESCE(cp.name, p.name) FROM obj.property p
                JOIN obj.class_property cp ON cp.property_id = p.id
                WHERE cp.class_id = class_uuid AND p.required = TRUE
            )
            ELSE NULL
        END
    )
    INTO schema_json
    FROM obj.class c
    LEFT JOIN obj.class_property cp ON c.id = cp.class_id
    LEFT JOIN obj.property p ON cp.property_id = p.id
    LEFT JOIN obj.field f ON p.field_id = f.id  -- Fetch `pattern` and `enum_values` from `obj.field`
    LEFT JOIN obj.data_type dt ON f.data_type_id = dt.id  -- Get `data_type` from `obj.data_type`
    LEFT JOIN obj.class c_ref ON p.class_id = c_ref.id -- Get referenced class
    WHERE c.id = class_uuid
    GROUP BY c.id;

    -- Build the component schemas for referenced classes
    SELECT jsonb_object_agg(
        c_ref.name,
        generate_schema_for_class(c_ref.id) -- Recursively generate schema for referenced classes
    )
    INTO component_schemas
    FROM obj.property p
    JOIN obj.class c_ref ON p.class_id = c_ref.id
    JOIN obj.class_property cp ON cp.property_id = p.id
    WHERE cp.class_id = class_uuid AND p.class_id IS NOT NULL
    GROUP BY c_ref.name, c_ref.id;

    -- Add components section if there are referenced schemas
    IF component_schemas IS NOT NULL THEN
        schema_json := jsonb_set(
            schema_json,
            '{components,schemas}',
            component_schemas
        );
    END IF;

    -- Return the generated schema
    RETURN schema_json;
END;
$$ LANGUAGE plpgsql;

