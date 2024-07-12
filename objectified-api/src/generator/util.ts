/**
 * This is a type formatter that converts types from one type to another, matching object types for
 * GraphQL and for JSON Schema definitions.
 *
 * @param key The key to parse for.
 * @param value The value of the key.
 * @returns Altered value if applicable, otherwise, returns the original value that was sent.
 */
export function typeFormatter(key: string, value: string) {
  if (key.toLowerCase() === 'type') {
    switch(value.toLowerCase()) {
      case 'number':
      case 'integer':
      case 'float':
      case 'double':
        return 'Number';

      case 'string':
        return 'String';

      case 'boolean':
        return 'Boolean';

      case 'object':
        return 'Object';

      case 'array':
        return 'Array';

      default:
        return value;
    }
  }

  if (key.toLowerCase() === 'description') {
    return value.replaceAll('\n', ' ');
  }

  return value;
}

/**
 * Takes in a JSON Schema snippet, and returns a TypeScript type that matches the definition.
 * Translates $ref values, parsing off the `#/component/schemas` field, and attaching a TypeScript well formatted
 * type in its place.  Converts enumeration values to TypeScript enumeration values.  Converts numeric types to
 * `number`, string types to `string`, and arrays to `type[]` with recursion.
 *
 * @param properties The JSON schema snippet.
 * @returns string containing the translated value.
 */
export function propertyToType(properties: any): string {
  const type = properties['type'];
  const ref = properties['$ref'];

  if (ref) {
    return ref.substring(ref.lastIndexOf('/') + 1) + 'Dto';
  }

  if (properties['enum']) {
    return '[ ' + properties['enum'].map((x) => `'${x}'`).join(' | ') + ' ]';
  }

  switch(type.toLowerCase()) {
    case 'integer':
      return 'number';

    case 'array':
      return `${propertyToType(properties['items'])}[]`;
  }

  return type;
}

/**
 * Capitalization of word.
 *
 * @param str Converts word to capitalized word.
 */
export function initCap(str: string): string {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

export function toCamelCase(str: string): string {
  const s =
    str &&
    str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');

  return s.slice(0, 1).toLowerCase() + s.slice(1);
}
