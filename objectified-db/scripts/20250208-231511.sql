-- This procedure generates a JSON Schema based on the class definition by its ID.  It traverses the list of
-- properties assigned to a class using class_property and joining against the class ID.  Once generated,
-- it returns the schema as a JSONB object result.

CREATE OR REPLACE FUNCTION obj.generate_schema_for_class(class_uuid UUID)
RETURNS JSONB AS $$
DECLARE
    class_name TEXT;
    properties JSONB;
    required_fields TEXT[];
    schema JSONB;
BEGIN
    -- Retrieve the class name from the obj.class table.
    SELECT name
      INTO class_name
      FROM obj.class
     WHERE id = class_uuid;

    IF class_name IS NULL THEN
        RAISE EXCEPTION 'Class not found for class_uuid: %', class_uuid;
    END IF;

    -- Aggregate the properties and required fields from the related tables.
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

    -- Construct the JSON Schema.
    schema := jsonb_build_object(
        '$schema', 'https://json-schema.org/draft/2020-12/schema',
        'title', class_name,
        'type', 'object',
        'properties', properties,
        'required', COALESCE(to_jsonb(required_fields), '[]'::jsonb)
    );

    RETURN schema;
END;
$$ LANGUAGE plpgsql;

