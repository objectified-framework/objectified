#!/usr/bin/env ts-node
/**
 * OpenAPI 3.1 Code Generator
 */

import {string} from 'yaml/dist/schema/common/string';

(async () => {
  const args = process.argv.splice(2);

  function showHelp() {
    console.log('Usage: gen.ts [OpenAPI YAML file] <options>');
    console.log('Where <options> are:');
    console.log('...');
    process.exit(0);
  }

  if (args.includes('-h') || args.includes('--help') || args.length === 0) {
    showHelp();
  }

  const openApiFile = args[0];

  const yaml = require('yaml');
  const fs = require('fs');

  if (!fs.existsSync(openApiFile)) {
    console.log(`OpenAPI file ${openApiFile} does not exist.`);
    showHelp();
  }

  const spec = yaml.parse(fs.readFileSync(openApiFile, 'utf8'));
  const dirDto = 'src/generated/dto';

  if (!fs.existsSync(dirDto)) {
    fs.mkdirSync(dirDto, { recursive: true });
  }

  // Step 1: Generate component schema library from the 'components/schema' section in the OpenAPI spec.
  // Any definitions here will get written to the DTO file verbatim as defined in the component schema
  // section.

  console.log('Generating Component Schema DTO library to src/generated/dto:');

  const schemas = spec['components']['schemas'];
  let indexDto = `/**
 * Data Type Object for OpenAPI 3.1
 * Auto-generated for all objects in this directory.
 *
 * DO NOT MAKE ANY CHANGES TO THIS FILE, IT IS AUTOMATICALLY GENERATED.
 * ANY CHANGES WILL BE OVERWRITTEN!
 */\n`;

  for(const objectName of Object.keys(schemas)) {
    const properties = schemas[objectName]['properties'];
    const required = schemas[objectName]['required'] ?? [];

    if (schemas[objectName]['type'].toLowerCase() !== 'object') {
      console.log(`    - ${objectName}: (Skipping: cannot handle object of type '${schemas[objectName]['type']}`);
      continue;
    }

    let outputFile = `/**
 * Data Type Object for OpenAPI 3.1
 * Auto-generated for object '${objectName}'
 *
 * DO NOT MAKE ANY CHANGES TO THIS FILE, IT IS AUTOMATICALLY GENERATED.
 * ANY CHANGES WILL BE OVERWRITTEN!
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ${objectName}Dto {
`;

    for(const propertyName of Object.keys(properties)) {
      const requiredProperty = required.includes(propertyName);
      const stringifiedProperty = JSON.stringify(properties[propertyName], null, 2).replaceAll('\n', '\n   * ');

      outputFile += `  /**\n   * Original definition:\n   *\n   * ${stringifiedProperty}\n   */\n`;
      if (requiredProperty) {
        outputFile += `  @ApiProperty({\n`;
      } else {
        outputFile += `  @ApiPropertyOptional({\n`;
      }

      if (properties[propertyName]['description']) {
        outputFile += `    description: '${properties[propertyName]['description']}',\n`;
      }

      if (!properties[propertyName]['type']) {
        console.log(`  - ${objectName}: Skipping property '${propertyName}': No 'type' specified, or missing.`);
        continue;
      }

      const propertyType = properties[propertyName]['type'].toLowerCase();
      let tsType = '';

      // TODO:
      // Support for '$ref'
      // Support 'array' types
      // Support 'date-time' format
      // Research 'pattern'

      switch(propertyType) {
        case 'integer':
        case 'number':
        case 'float':
        case 'double':
          outputFile += `    type: Number,\n`;
          tsType = 'number';
          break;

        case 'boolean':
          outputFile += `    type: Boolean,\n`;
          tsType = 'boolean';
          break;

        case 'string':
          outputFile += `    type: String,\n`;
          tsType = 'string';
          break;

        case 'object':
          outputFile += `    type: Object,\n`;
          tsType = 'any';
          break;

        default:
          outputFile += `    type: Unknown(${properties[propertyName]['type']}),\n`;
          tsType = 'any';
          break;
      }

      outputFile += '  })\n';

      if (requiredProperty) {
        outputFile += `  ${propertyName}: ${tsType};\n\n`;
      } else {
        outputFile += `  ${propertyName}?: ${tsType};\n\n`;
      }
    }

    outputFile += '}\n';
    indexDto += `export * from './${objectName}Dto';\n`;

    fs.writeFileSync(`${dirDto}/${objectName}Dto.ts`, outputFile);
    console.log(`  - ${objectName} -> Created ${objectName}Dto.ts`);
  }

  fs.writeFileSync(`${dirDto}/index.ts`, indexDto);
  console.log('  - Generated Index');

  // Step 2: Write schemas from paths with requestBody
  // Step 3: Write services in NestJS with paths and required objects from DTO definitions
  // Step 4: Generate tests
})();
