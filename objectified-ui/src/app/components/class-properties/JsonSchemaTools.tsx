interface JSONSchemaProperty {
  type?: string | string[];
  format?: string;
  description?: string;
  enum?: any[];
  items?: JSONSchemaProperty;
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  default?: any;
  $ref?: string;
  name?: string;
}

interface JSONSchema {
  $id?: string;
  $schema?: string;
  title?: string;
  description?: string;
  type?: string;
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
}

function pascalToSnake(pascalCase: string): string {
  return pascalCase.replace(/([A-Z])/g, '_$1').toLowerCase().substring(1);
}

export function jsonSchemaToSQL(schema: any): string {
  // Validate and normalize the schema input
  if (!schema) {
    throw new Error('Schema cannot be null or undefined');
  }

  // Handle case where schema might not have a type specified
  const schemaType = schema.type || 'object';
  if (schemaType !== 'object') {
    throw new Error('Schema must be of type "object"');
  }

  // Ensure properties exists, even if empty
  if (!schema.properties || typeof schema.properties !== 'object') {
    schema.properties = {};
  }

  // If empty properties, log a warning but continue with empty table
  if (Object.keys(schema.properties).length === 0) {
    console.warn('Warning: Schema has no properties, creating empty table structure');
  }

  const tableName = schema.title ?
    pascalToSnake(schema.title) : 'generated_table';

  const required = schema.required || [];

  const columns = Object.entries(schema.properties).map(([propName, propSchema]) => {
    const sqlType = mapJsonTypeToSQLType(propSchema);
    const isRequired = required.includes(propName);
    const constraints = getConstraints(propSchema, isRequired);

    return `  ${propName} ${sqlType}${constraints}`;
  });

  // Generate SQL
  let sql = `CREATE TABLE ${tableName} (\n`;

  // Handle case where there are no columns
  if (columns.length === 0) {
    sql += '  id SERIAL PRIMARY KEY\n';
  } else {
    sql += columns.join(',\n');

    // Add a primary key based on the schema if possible
    // For this example, we'll look for an id field first, then use the first required property,
    // or finally just the first property
    let primaryKeyColumn = '';

    if (schema.properties.id) {
      primaryKeyColumn = 'id';
    } else if (required.length > 0) {
      primaryKeyColumn = required[0];
    } else if (Object.keys(schema.properties).length > 0) {
      primaryKeyColumn = Object.keys(schema.properties)[0];
    } else {
      // If no properties exist, we've already added the id column above
      primaryKeyColumn = 'id';
    }

    if (columns.length > 0) {
      sql += `,\n  PRIMARY KEY (${primaryKeyColumn})`;
    }
  }

  sql += '\n);';

  // Add comments if descriptions are available
  Object.entries(schema.properties).forEach(([propName, propSchema]: [string, any]) => {
    if (propSchema.description) {
      sql += `\n\nCOMMENT ON COLUMN ${tableName}.${propName} IS '${propSchema.description.replace(/'/g, "''")}';`;
    }
  });

  if (schema.description) {
    sql += `\n\nCOMMENT ON TABLE ${tableName} IS '${schema.description.replace(/'/g, "''")}';`;
  }

  return sql;
}

function mapJsonTypeToSQLType(property: any): string {
  if (!property || !property.type) {
    return 'TEXT'; // Default to TEXT if property is missing or type is not specified
  }

  const type = Array.isArray(property.type) ? property.type[0] : property.type;

  switch (type) {
    case 'string':
      if (property.format === 'date-time' || property.format === 'date') {
        return 'TIMESTAMP';
      } else if (property.format === 'time') {
        return 'TIME';
      } else if (property.format === 'email') {
        return 'VARCHAR(255)';
      } else if (property.format === 'uuid') {
        return 'UUID';
      } else if (property.enum) {
        // For enums, create a custom type or use TEXT with check constraint
        return 'TEXT';
      } else if (property.maxLength) {
        return `VARCHAR(${property.maxLength})`;
      } else {
        return 'TEXT';
      }
    case 'integer':
      // For PostgreSQL, smallint is 2 bytes, integer is 4 bytes, bigint is 8 bytes
      if (property.minimum !== undefined && property.maximum !== undefined) {
        if (property.minimum >= -32768 && property.maximum <= 32767) {
          return 'SMALLINT';
        } else if (property.minimum >= -2147483648 && property.maximum <= 2147483647) {
          return 'INTEGER';
        }
      }
      return 'BIGINT';
    case 'number':
      return 'NUMERIC';
    case 'boolean':
      return 'BOOLEAN';
    case 'array':
      if (property.items) {
        const itemType = mapJsonTypeToSQLType(property.items);
        return `${itemType}[]`;
      }
      return 'TEXT[]';
    case 'object':
      return 'JSONB';
    case 'null':
      return 'TEXT';
    default:
      return 'TEXT';
  }
}

function getConstraints(property: any, isRequired: boolean): string {
  let constraints = '';

  if (isRequired) {
    constraints += ' NOT NULL';
  } else {
    constraints += ' NULL';
  }

  if (property.default !== undefined) {
    // Format the default value based on type
    let defaultValue: string;

    if (typeof property.default === 'string') {
      defaultValue = `'${property.default.replace(/'/g, "''")}'`;
    } else if (property.default === null) {
      defaultValue = 'NULL';
    } else if (typeof property.default === 'object') {
      defaultValue = `'${JSON.stringify(property.default)}'::jsonb`;
    } else {
      defaultValue = String(property.default);
    }

    constraints += ` DEFAULT ${defaultValue}`;
  }

  // Add CHECK constraints for enum values
  if (property.enum && property.enum.length > 0) {
    const enumValues = property.enum
      .map((val: any) => typeof val === 'string' ? `'${val.replace(/'/g, "''")}'` : String(val))
      .join(', ');
    constraints += ` CHECK (${property.name} IN (${enumValues}))`;
  }

  return constraints;
}
