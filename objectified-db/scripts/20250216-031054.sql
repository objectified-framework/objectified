CREATE OR REPLACE FUNCTION generate_schema_for_class(class_uuid UUID)
RETURNS JSONB AS $$
DECLARE
    schema_json JSONB;
BEGIN
    -- Build the JSON Schema object dynamically
    SELECT jsonb_build_object(
        'title', c.name,
        'description', c.description,
        'type', 'object',
        'properties', COALESCE(jsonb_object_agg(
            COALESCE(cp.name, p.name, 'unknown_property'),  -- Ensure property names are never NULL
            jsonb_strip_nulls(
                CASE 
                    WHEN p.is_array THEN  -- If the property is an array, place description at parent level
                        jsonb_build_object(
                            'type', 'array',
                            'description', COALESCE(cp.description, p.description),
                            'items', jsonb_strip_nulls(jsonb_build_object(
                                'type', LOWER(dt.name),
                                'default', p.default_value,
                                'nullable', CASE WHEN p.nullable THEN true ELSE NULL END,
                                'enum', NULLIF(f.enum_values, '{}'::TEXT[]), -- Avoid empty arrays
                                'minLength', NULLIF(p.constraints->>'minLength', '')::int,
                                'maxLength', NULLIF(p.constraints->>'maxLength', '')::int,
                                'minimum', NULLIF(p.constraints->>'minimum', '')::int,
                                'maximum', NULLIF(p.constraints->>'maximum', '')::int,
                                'pattern', f.pattern,
                                'format', f.data_format,
                                'examples', f.examples,
                                -- Include $ref only if class_id refers to another class
                                '$ref', CASE WHEN p.class_id IS NOT NULL THEN format('#/components/schemas/%s', cref2.name) ELSE NULL END
                            ))
                        )
                    ELSE  -- If not an array, return the normal property definition
                        jsonb_build_object(
                            'type', LOWER(dt.name),
                            'description', COALESCE(cp.description, p.description),
                            'default', p.default_value,
                            'nullable', CASE WHEN p.nullable THEN true ELSE NULL END,
                            'enum', NULLIF(f.enum_values, '{}'::TEXT[]), -- Avoid empty arrays
                            'minLength', NULLIF(p.constraints->>'minLength', '')::int,
                            'maxLength', NULLIF(p.constraints->>'maxLength', '')::int,
                            'minimum', NULLIF(p.constraints->>'minimum', '')::int,
                            'maximum', NULLIF(p.constraints->>'maximum', '')::int,
                            'pattern', f.pattern,
                            'format', f.data_format,
                            'examples', f.examples,
                            -- Include $ref only if class_id refers to another class
                            '$ref', CASE WHEN p.class_id IS NOT NULL THEN format('#/components/schemas/%s', cref2.name) ELSE NULL END
                        )
                END
            )
        ), '{}'::jsonb),  -- Ensure an empty object if no properties exist
        'required',
        CASE
            WHEN EXISTS (
                SELECT 1 FROM obj.class_property cp
                JOIN obj.property p ON cp.property_id = p.id
                WHERE cp.class_id = class_uuid AND p.required = TRUE
            )
            THEN (SELECT jsonb_agg(COALESCE(cp.name, p.name))
                FROM obj.class_property cp
                JOIN obj.property p ON cp.property_id = p.id
                WHERE cp.class_id = class_uuid AND p.required = TRUE)
            ELSE NULL
        END
    )
    INTO schema_json
    FROM obj.class c
    LEFT JOIN obj.class_property cp ON c.id = cp.class_id
    LEFT JOIN obj.property p ON cp.property_id = p.id
    LEFT JOIN obj.field f ON p.field_id = f.id  -- Fetch pattern, enum_values, etc.
    LEFT JOIN obj.data_type dt ON f.data_type_id = dt.id  -- Get data type name
    LEFT JOIN obj.class cref ON cp.class_id = cref.id -- Get referenced class
    LEFT JOIN obj.class cref2 ON p.class_id = cref2.id
    WHERE c.id = class_uuid
    GROUP BY c.id;

    -- Return the generated schema
    RETURN schema_json;
END;
$$ LANGUAGE plpgsql;

