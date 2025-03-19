CREATE OR REPLACE FUNCTION obj.generate_schema_for_class(input_class_id UUID)
RETURNS jsonb AS $$
  // Get primary class information
  const classQuery = plv8.execute(`
    SELECT c.id, c.tenant_id, c.name, c.description
    FROM obj.class c
    WHERE c.id = $1
  `, [input_class_id]);

  if (classQuery.length === 0) {
    plv8.elog(ERROR, `Class with ID ${input_class_id} not found`);
    return null;
  }

  const classInfo = classQuery[0];

  // Initialize the schema object
  const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: `schema:${classInfo.tenant_id}:${classInfo.id}`,
    title: classInfo.name,
    description: classInfo.description,
    type: "object",
    properties: {},
    additionalProperties: false
  };

  // Container to store required properties
  const requiredProperties = [];

  // QUERY 1: Get standard properties joined through class_property
  const propertiesQuery = plv8.execute(`
    SELECT
      cp.id as class_property_id,
      cp.name as class_property_name,
      cp.description as class_property_description,
      p.id as property_id,
      p.name as property_name,
      p.description as property_description,
      p.required,
      p.nullable,
      p.is_array,
      p.default_value,
      p.constraints,
      p.class_id as property_class_id,
      f.id as field_id,
      f.name as field_name,
      f.data_format,
      f.pattern,
      f.enum_values,
      f.enum_descriptions,
      f.examples,
      dt.data_type
    FROM obj.class_property cp
    JOIN obj.property p ON cp.property_id = p.id
    JOIN obj.field f ON p.field_id = f.id
    JOIN obj.data_type dt ON f.data_type_id = dt.id
    WHERE cp.class_id = $1 AND p.class_id IS NULL
  `, [input_class_id]);

  // Process standard properties
  for (const property of propertiesQuery) {
    // Use the class_property name if provided, otherwise use the property name
    const propertyName = property.class_property_name || property.property_name;

  // Start building the property schema
    const propertySchema = {
      description: property.class_property_description || property.property_description
    };

  // Handle the data type
    switch (property.data_type) {
      case 'STRING':
        propertySchema.type = property.nullable ? ['string', 'null'] : 'string';
        if (property.data_format) propertySchema.format = property.data_format;
        if (property.pattern) propertySchema.pattern = property.pattern;
        break;

      case 'NUMBER':
        propertySchema.type = property.nullable ? ['number', 'null'] : 'number';
        break;

      case 'INTEGER':
        propertySchema.type = property.nullable ? ['integer', 'null'] : 'integer';
        break;

      case 'BOOLEAN':
        propertySchema.type = property.nullable ? ['boolean', 'null'] : 'boolean';
        break;

      case 'NULL':
        propertySchema.type = 'null';
        break;

      case 'OBJECT':
        propertySchema.type = property.nullable ? ['object', 'null'] : 'object';
        break;

      case '$REF':
        // Handle references using data_format
        if (property.data_format) {
          propertySchema.$ref = property.data_format;
        } else {
          // Fallback if no reference is provided
          propertySchema.type = 'object';
        }
        break;
    }

    // Add enum values if present
    if (property.enum_values && property.enum_values.length > 0) {
      propertySchema.enum = property.enum_values;

      // Add enum descriptions if present
      if (property.enum_descriptions && property.enum_descriptions.length > 0) {
        propertySchema.enumDescriptions = property.enum_descriptions;
      }
    }

    // Add examples if present
    if (property.examples && property.examples.length > 0) {
      propertySchema.examples = property.examples;
    }

    // Add default value if present
    if (property.default_value !== null) {
      try {
        // Try to parse as JSON first
        propertySchema.default = JSON.parse(property.default_value);
      } catch (e) {
        // If not valid JSON, use as string
        propertySchema.default = property.default_value;
      }
    }

    // Add any additional constraints from the JSONB field
    if (property.constraints) {
      Object.assign(propertySchema, property.constraints);
    }

    // Handle arrays
    if (property.is_array) {
      const itemSchema = { ...propertySchema };
      delete itemSchema.format;
      delete itemSchema.pattern;
      delete itemSchema.enum;
      delete itemSchema.enumDescriptions;

      // Create new schema with array type and items
      const arraySchema = {
        type: 'array',
        description: property.class_property_description || property.property_description,
        items: itemSchema
      };

      // Add to the schema properties
      schema.properties[propertyName] = arraySchema;
    } else {
      // Add to the schema properties
      schema.properties[propertyName] = propertySchema;
    }

    // Add to required properties if needed
    if (property.required) {
      requiredProperties.push(propertyName);
    }
  }

  // QUERY 2: Get class references - properties with class_id set
  const classReferencesQuery = plv8.execute(`
    SELECT
      cp.id as class_property_id,
      cp.name as class_property_name,
      cp.description as class_property_description,
      p.id as property_id,
      p.name as property_name,
      p.description as property_description,
      p.required,
      p.nullable,
      p.is_array,
      p.default_value,
      p.constraints,
      p.class_id as referenced_class_id,
      c.name as referenced_class_name,
      c.tenant_id as referenced_tenant_id
    FROM obj.class_property cp
    JOIN obj.property p ON cp.property_id = p.id
    JOIN obj.class c ON p.class_id = c.id
    WHERE cp.class_id = $1 AND p.class_id IS NOT NULL
  `, [input_class_id]);

  // Process class reference properties
  for (const reference of classReferencesQuery) {
    // Use the class_property name if provided, otherwise use the property name
    const propertyName = reference.class_property_name || reference.property_name;

    // Create a reference to the other class
    const refSchema = {
      description: reference.class_property_description || reference.property_description,
      $ref: `#/components/schemas/${reference.referenced_class_name}`
    };

    // Handle arrays
    if (reference.is_array) {
      schema.properties[propertyName] = {
        type: 'array',
        description: reference.class_property_description || reference.property_description,
        items: refSchema
      };
    } else {
      schema.properties[propertyName] = refSchema;
    }

    // Add to required properties if needed
    if (reference.required) {
      requiredProperties.push(propertyName);
    }

    plv8.elog(NOTICE, `Added reference to class ${reference.referenced_class_name} (${reference.referenced_class_id}) as property ${propertyName}`);
  }

  // Add required array if there are required properties
  if (requiredProperties.length > 0) {
    schema.required = requiredProperties;
  }

  // Return the generated schema
  return schema;
$$
LANGUAGE plv8;

-- Example usage:
-- SELECT obj.generate_schema_for_class('your-class-uuid');