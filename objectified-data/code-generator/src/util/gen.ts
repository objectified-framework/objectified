/**
 * OpenAPI 3.1 Code Generator
 */
import {ApiSpec} from '../schema/ApiSpec';
import fs from 'fs';

const GENERATED_FILE_HEADER = `/**
 * DO NOT MAKE ANY CHANGES TO THIS FILE, IT IS AUTOMATICALLY GENERATED.
 * ANY CHANGES WILL BE OVERWRITTEN!
 */`;

(async () => {
  const args = process.argv.splice(2);
  let dtoDirectory = 'src/generated/dto';
  let nestControllerDir = 'src/controllers';
  let nestServicesDir = 'src/services';

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

  // if (!fs.existsSync(dtoDirectory)) {
  //   fs.mkdirSync(dtoDirectory, { recursive: true });
  // }

  const specFile = yaml.parse(fs.readFileSync(openApiFile, 'utf8'));
  const spec: ApiSpec = new ApiSpec(specFile);

//   console.log(`Writing DTOs to: ${dtoDirectory}`);
//   console.log(`Writing NestJS Controllers to: ${nestControllerDir}`);
//   console.log(`Writing NestJS Services to: ${nestServicesDir}`);
//
//   // Step 1: Extract all schemas from components/schemas
//   const schemas = spec['components']['schemas'];
//
//   // Step 2: Extract all user-created schemas from requestBody entries in paths.
//   for(const path of Object.keys(spec['paths'])) {
//     const pathSpec = spec['paths'][path];
//     const pathObject = pathSpec['get'] ?? pathSpec['post'] ?? pathSpec['delete'] ?? pathSpec['put'] ?? pathSpec['patch'] ?? {};
//     const pathTag = pathObject['tags'];
//     const pathRequestBody = pathObject['requestBody'] ?? {};
//     let pathRequestBodyProperties = (pathRequestBody['content'] && pathRequestBody['content']['application/json'] &&
//       pathRequestBody['content']['application/json']['schema'] &&
//       pathRequestBody['content']['application/json']['schema']['properties']) ? pathRequestBody['content']['application/json']['schema']['properties'] : undefined;
//
//     if (pathRequestBodyProperties && !pathRequestBodyProperties['$ref']) {
//       const schemaName = pathObject['operationId'];
//
//       if (schemaName) {
//         const schemaNameInput = schemaName.charAt(0).toUpperCase() + schemaName.substring(1) + 'Input';
//
//         schemas[schemaNameInput] = {};
//         schemas[schemaNameInput]['type'] = 'object';
//         schemas[schemaNameInput]['description'] = `Auto-generated input variables class for path '${path}' in tag '${pathTag}'.\nThese input variables are used with the '${schemaName}' operation method in ${pathTag}Delegate.`;
//         schemas[schemaNameInput]['properties'] = pathRequestBodyProperties;
//       } else {
//         console.log(`Path '${path}' in ${pathTag} does not contain an 'operationId' entry!`);
//         continue;
//       }
//     }
//   }
//
//   // Step 3: Create DTO schemas for all found and prepared schema objects.
//   console.log('Generating Component Schema DTO library to src/generated/dto:');
//
//   let indexDto = GENERATED_FILE_HEADER;
//
//   for(const objectName of Object.keys(schemas)) {
//     const properties = schemas[objectName]['properties'];
//     const required = schemas[objectName]['required'] ?? [];
//
//     if (schemas[objectName]['type'].toLowerCase() !== 'object') {
//       console.log(`    - ${objectName}: (Skipping: cannot handle object of type '${schemas[objectName]['type']}`);
//       continue;
//     }
//
//     const classDescription = (schemas[objectName]['description'] ?? `Auto-generated DTO class for '${objectName}' in /components/schemas`)
//       .trim()
//       .replaceAll('\n', '\n * ');
//
//     let outputFile = `${GENERATED_FILE_HEADER}
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
//
// /**
//  * ${classDescription}
//  */
// export class ${objectName}Dto {
// `;
//
//     for(const propertyName of Object.keys(properties)) {
//       const requiredProperty = required.includes(propertyName);
//       const stringifiedProperty = JSON.stringify(properties[propertyName], null, 2).replaceAll('\n', '\n   * ');
//
//       outputFile += `  /**\n   * Original definition:\n   *\n   * ${stringifiedProperty}\n   */\n`;
//       if (requiredProperty) {
//         outputFile += `  @ApiProperty({\n`;
//       } else {
//         outputFile += `  @ApiPropertyOptional({\n`;
//       }
//
//       if (properties[propertyName]['description']) {
//         outputFile += `    description: '${properties[propertyName]['description']}',\n`;
//       }
//
//       if (!properties[propertyName]['type']) {
//         console.log(`  - ${objectName}: Skipping property '${propertyName}': No 'type' specified, or missing.`);
//         continue;
//       }
//
//       const propertyType = properties[propertyName]['type'].toLowerCase();
//       let tsType = '';
//
//       // TODO:
//       // Support for '$ref'
//       // Support 'array' types
//       // Support 'date-time' format
//       // Research 'pattern'
//
//       switch(propertyType) {
//         case 'integer':
//         case 'number':
//         case 'float':
//         case 'double':
//           outputFile += `    type: Number,\n`;
//           tsType = 'number';
//           break;
//
//         case 'boolean':
//           outputFile += `    type: Boolean,\n`;
//           tsType = 'boolean';
//           break;
//
//         case 'string':
//           outputFile += `    type: String,\n`;
//           tsType = 'string';
//           break;
//
//         case 'object':
//           outputFile += `    type: Object,\n`;
//           tsType = 'any';
//           break;
//
//         case 'array':
//           outputFile += `    type: [Array],\n`;
//           tsType = 'any[]';
//           break;
//
//         default:
//           outputFile += `    type: Unknown(${properties[propertyName]['type']}),\n`;
//           tsType = 'any';
//           break;
//       }
//
//       outputFile += '  })\n';
//
//       if (requiredProperty) {
//         outputFile += `  ${propertyName}: ${tsType};\n\n`;
//       } else {
//         outputFile += `  ${propertyName}?: ${tsType};\n\n`;
//       }
//     }
//
//     outputFile += '}\n';
//     indexDto += `export * from './${objectName}Dto';\n`;
//
//     fs.writeFileSync(`${dtoDirectory}/${objectName}Dto.ts`, outputFile);
//     console.log(`  - ${objectName} -> Created ${objectName}Dto.ts`);
//   }
//
//   fs.writeFileSync(`${dtoDirectory}/index.ts`, indexDto);
//   console.log('  - Generated Index');
//
//   // Step 4: Build services and controllers for NestJS

})();
