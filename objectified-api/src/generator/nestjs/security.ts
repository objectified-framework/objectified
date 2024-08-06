import {toPascalCase} from "../util";
import { faker } from '@faker-js/faker';

const HEADER: string = `/**\n * This utility security scheme file is automatically generated.\n * Do not modify this file, any changes will be overwritten.\n *\n * Generated ${new Date()}\n */\n\n`;

export function generateSecuritySchemes(directory: string, schema: any) {
  const utilDirectory: string = `${directory}/util`;
  const fs = require('fs');
  const schemes = schema.components.securitySchemes;

  fs.mkdirSync(utilDirectory, { recursive: true });

  for (const [schemeName, schemeData] of Object.entries(schemes)) {
    generateSecurity(utilDirectory, schemeName, schemeData);
  }
}

function generateSecurity(directory: string, schemeName: string, schemeData: any) {
  const fs = require('fs');
  const file = `${directory}/${schemeName}.ts`;
  let utilBody: string = '';

  utilBody += HEADER;
  utilBody += 'import { Request } from \'express\';\n';

  switch(schemeData.bearerFormat.toLowerCase()) {
    case 'jwt':
      utilBody += jwtUtilBody(schemeName);
      break;

    default:
      throw new Error('Cannot write utility for security scheme: ' + schemeName);
  }

  fs.writeFileSync(file, utilBody);
  console.log(`  - Wrote security scheme utility: ${file}`);
}

function jwtUtilBody(schemeName: string): string {
  let body = '';

  // JWT Encode/Decode import
  body += 'import jwt, { Secret } from \'jsonwebtoken\';\n\n';
  body += '// JWT Secret Key: either JWT_SECRET_KEY in environment variable, or generated randomly on restart using faker.\n';
  body += `export const SECRET_KEY: Secret = process.env.JWT_SECRET_KEY ?? '${faker.string.sample(64).replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}';\n\n`;

  // Encoder
  body += '/**\n';
  body += ' * Encodes a JWT token with the given payload and possible timeout given as a string or numeric value.\n';
  body += ' *\n';
  body += ' * @param req The request object containing the bearer authorization token\n';
  body += ' * @param payload The data to encode into the JWT token\n';
  body += ' * @param timeout The optional timeout for the JWT token as a string expression or numeric value in milliseconds\n';
  body += ' * @returns The JWT token string\n';
  body += ' */\n';
  body += `export function ${toPascalCase(schemeName)}Encode(req: Request, payload: any, timeout?: string | number): string {\n`;
  body += '  if (timeout) {\n';
  body += '    return jwt.sign({ data: payload }, SECRET_KEY, { expiresIn: timeout });\n';
  body += '  }\n\n';
  body += '  return jwt.sign({ data: payload }, SECRET_KEY);\n';
  body += '}\n\n';

  // Decoder
  body += '/**\n';
  body += ' * Decodes a JWT token payload from the given request object\'s Bearer authorization string.\n';
  body += ' *\n';
  body += ' * @param req The request object containing the bearer authorization token\n';
  body += ' * @returns The decoded JWT token payload\n';
  body += ' * @throws Error if the token is missing\n';
  body += ' */\n';
  body += `export function ${toPascalCase(schemeName)}Decode(req: Request): any {\n`;
  body += '  const token: string = req.headers.authorization?.split(\' \')[1];\n\n';
  body += '  if (!token) {\n';
  body += '    throw new Error(\'Missing JWT token\');\n';
  body += '  }\n\n';
  body += '  return jwt.verify(token, SECRET_KEY);\n';
  body += '}\n';

  return body;
}
