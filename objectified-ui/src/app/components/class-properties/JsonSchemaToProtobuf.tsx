/**
 * Converts a JSON Schema definition to a Protocol Buffers definition.
 * @param jsonSchema - The JSON Schema definition to convert
 * @returns String containing the Protocol Buffers definition
 */
function jsonSchemaToProtobuf(jsonSchema: any): string {
  // Track message definitions to avoid duplicates
  const messages: Map<string, string> = new Map();
  // Track enums definitions to avoid duplicates
  const enums: Map<string, string> = new Map();
  // Keep track of the current indentation level
  let indent = 0;

  /**
   * Helper function to indent lines
   */
  function getIndent(): string {
    return '  '.repeat(indent);
  }

  /**
   * Converts a JSON Schema type to a Protobuf type
   */
  function mapType(schema: any): string {
    if (!schema || !schema.type) {
      return 'google.protobuf.Any';
    }

    switch (schema.type) {
      case 'string':
        if (schema.format === 'date-time') {
          return 'google.protobuf.Timestamp';
        } else if (schema.enum) {
          // Enums will be handled separately
          return schema.title || 'Enum';
        }
        return 'string';
      case 'integer':
        return 'int32';
      case 'number':
        return 'double';
      case 'boolean':
        return 'bool';
      case 'null':
        return 'google.protobuf.NullValue';
      case 'array':
        if (schema.items) {
          const itemType = mapType(schema.items);
          return `repeated ${itemType}`;
        }
        return 'repeated google.protobuf.Any';
      case 'object':
        if (schema.title) {
          // Create a new message type
          return schema.title;
        }
        return 'google.protobuf.Struct';
      default:
        return 'google.protobuf.Any';
    }
  }

  /**
   * Converts a JSON Schema property name to a valid Protobuf field name
   */
  function toFieldName(name: string): string {
    // Replace invalid characters and convert to snake_case
    return name
      .replace(/[^\w]/g, '_')
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '');
  }

  /**
   * Process JSON Schema object and generate a Protobuf message
   */
  function processObject(schema: any, name: string = 'Root'): string {
    const messageName = name;

    // Skip if we've already processed this message
    if (messages.has(messageName)) {
      return messageName;
    }

    let fields: string[] = [];
    let fieldNumber = 1;

    indent++;

    // Process properties
    if (schema.properties) {
      for (const [propName, propSchema] of Object.entries<any>(schema.properties)) {
        const fieldName = toFieldName(propName);
        let fieldType = '';

        // Handle nested objects
        if (propSchema.type === 'object' && propSchema.properties) {
          const nestedMessageName = processObject(
            propSchema,
            propSchema.title || `${messageName}${propName}`
          );
          fieldType = nestedMessageName;
        }
        // Handle enums
        else if (propSchema.type === 'string' && propSchema.enum) {
          const enumName = (propSchema.title || `${messageName}${propName}Enum`);
          processEnum(propSchema.enum, enumName);
          fieldType = enumName;
        }
        // Handle arrays with object items
        else if (propSchema.type === 'array' && propSchema.items && propSchema.items.type === 'object') {
          const nestedMessageName = processObject(
            propSchema.items,
            propSchema.items.title || `${messageName}${propName}Item`
          );
          fieldType = `repeated ${nestedMessageName}`;
        }
        // Handle regular types
        else {
          fieldType = mapType(propSchema);
        }

        // Check if property is required
        const isRequired = schema.required && schema.required.includes(propName);

        // Add field definition
        fields.push(`${getIndent()}${fieldType} ${fieldName} = ${fieldNumber};${isRequired ? '' : ' // optional'}`);
        fieldNumber++;
      }
    }

    indent--;

    const messageDefinition = `message ${messageName} {\n${fields.join('\n')}\n${getIndent()}}`;
    messages.set(messageName, messageDefinition);

    return messageName;
  }

  /**
   * Process JSON Schema enum and generate a Protobuf enum
   */
  function processEnum(enumValues: string[], enumName: string): string {
    // Skip if we've already processed this enum
    if (enums.has(enumName)) {
      return enumName;
    }

    let items: string[] = [];
    indent++;

    // Add the UNSPECIFIED value as first item (protobuf best practice)
    items.push(`${getIndent()}${enumName.toUpperCase()}_UNSPECIFIED = 0;`);

    // Process enum values
    enumValues.forEach((value, index) => {
      const valueName = value
        .toString()
        .replace(/[^\w]/g, '_')
        .toUpperCase();
      items.push(`${getIndent()}${valueName} = ${index + 1};`);
    });

    indent--;

    const enumDefinition = `enum ${enumName} {\n${items.join('\n')}\n${getIndent()}}`;
    enums.set(enumName, enumDefinition);

    return enumName;
  }

  // Start with the syntax declaration and imports
  let result = 'syntax = "proto3";\n\n';
  result += 'import "google/protobuf/any.proto";\n';
  result += 'import "google/protobuf/struct.proto";\n';
  result += 'import "google/protobuf/timestamp.proto";\n\n';

  // Add package declaration (optional)
  if (jsonSchema.title) {
    result += `package ${jsonSchema.title.toLowerCase().replace(/[^\w]/g, '.')};\n\n`;
  } else {
    result += 'package schema;\n\n';
  }

  // Generate the main message
  processObject(jsonSchema, jsonSchema.title);

  // Add all enum definitions
  if (enums.size > 0) {
    result += '// Enum definitions\n';
    for (const enumDef of enums.values()) {
      result += enumDef + '\n\n';
    }
  }

  // Add all message definitions
  if (messages.size > 0) {
    result += '// Message definitions\n';
    for (const messageDef of messages.values()) {
      result += messageDef + '\n\n';
    }
  }

  return result.trim();
}

export default jsonSchemaToProtobuf;