import { faker } from "@faker-js/faker";

const HEADER: string = `/**\n * This utility security scheme file is automatically generated.\n * Do not modify this file, any changes will be overwritten.\n *\n * Generated ${new Date()}\n */\n\n`;

export function generateSecuritySchemes(utilDirectory: string, schema: any) {
  const fs = require("fs");
  const schemes = schema.components.securitySchemes;

  fs.mkdirSync(utilDirectory, { recursive: true });

  console.log(`Generating NestJS utilities to ${utilDirectory}:`);

  for (const [schemeName, schemeData] of Object.entries(schemes)) {
    generateSecurity(utilDirectory, schemeName, schemeData);
  }
}

function generateSecurity(
  directory: string,
  schemeName: string,
  schemeData: any,
) {
  const fs = require("fs");
  const file = `${directory}/${schemeName}.ts`;
  let utilBody: string = "";

  utilBody += HEADER;
  utilBody += "\n";

  switch (schemeData.bearerFormat.toLowerCase()) {
    case "jwt":
      utilBody += jwtUtilBody(schemeName);
      break;

    default:
      throw new Error(
        "Cannot write utility for security scheme: " + schemeName,
      );
  }

  fs.writeFileSync(file, utilBody);
  console.log(`  - Wrote security scheme utility: ${file}`);
}

function jwtUtilBody(schemeName: string): string {
  let body = "";

  // JWT Encode/Decode import, encoder, decoder, and validator
  body += `import { Request } from 'express';
import { sign, decode, verify } from 'jsonwebtoken';

// JWT Secret Key: either JWT_SECRET_KEY in environment variable, or generated randomly on restart using faker.
export const SECRET_KEY = process.env.JWT_SECRET_KEY ?? '${faker.string.sample(64).replaceAll("\\", "\\\\").replaceAll("'", "\\'")}';

export class JWT {
  /**
   * Encrypts a JWT token with the given payload and possible timeout given as a string or numeric value.
   *
   * @param payload The data to encode into the JWT token
   * @param timeout The optional timeout for the JWT token as a string expression or numeric value in milliseconds
   * @returns The JWT token string
   */
  public static encrypt(payload: any, timeout?: string | number): string {
    if (timeout) {
      return sign({ data: payload }, SECRET_KEY, { expiresIn: timeout });
    }
    
    return sign({ data: payload }, SECRET_KEY);
  }
  
  /**
   * Decrypts a JWT token payload from the given request object's Bearer authorization string.
   *
   * @param req The request object containing the bearer authorization token
   * @returns The decoded JWT token payload
   * @throws Error if the token is missing
   */
  public static decrypt(req: Request): any {
    const token: string = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new Error('Missing JWT token');
    }
    
    return decode(token, SECRET_KEY);
  }
  
  /**
   * Validates a JWT token payload from the given request object's Bearer authorization string.
   *
   * @param req The request object containing the bearer authorization token
   * @returns {boolean} \`true\` if valid, \`false\` otherwise, or if bearer authorization token is missing
   *
   * TODO: This method needs to be modified, but this needs to be modified if the SECRET_KEY is an actual
   * signing key.
   */
  public static validate(req: Request): any {
    const token: string = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    // return verify(token, SECRET_KEY);
    return decode(token, SECRET_KEY) ? true : false;
  }
}
`;

  return body;
}
