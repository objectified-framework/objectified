import { faker } from "@faker-js/faker";
import * as fs from 'fs';

const HEADER: string = `/**\n * This utility security scheme file is automatically generated.\n * Do not modify this file, any changes will be overwritten.\n *\n * Generated ${new Date()}\n */\n\n`;

export function generateSecuritySchemes(utilDirectory: string, schema: any) {
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
  const file = `${directory}/${schemeName}.ts`;
  let utilBody: string = "";

  utilBody += HEADER;
  utilBody += "\n";

  switch (schemeData.bearerFormat.toLowerCase()) {
    case "jwt":
      utilBody += jwtUtilBody();
      break;

    case "api_key":
      utilBody += apiKeyUtilBody();
      break;

    default:
      throw new Error(
        "Cannot write utility for security scheme: " + schemeName,
      );
  }

  fs.writeFileSync(file, utilBody);
  console.log(`  - Wrote security scheme utility: ${file}`);
}

function apiKeyUtilBody(): string {
  let body = "";

  // API Key functionality
  body += `import { DaoUtils } from "../dao";
import { Request } from 'express';
import { matches } from 'ip-matching';

export class API_KEY {
  public static validate(request: Request): boolean {
    const ip: string = request.headers['x-forwarded-for'] ? request.headers['x-forwarded-for'][0] : request.socket.remoteAddress;
    const apiKey: string = request.cookies['API_KEY'] ?? '';
    
    if (!apiKey) {
      console.log(\`No API_KEY provided by IP \${ip}\`);
      return false;
    }
    
    const db = DaoUtils.getDatabase();
    const sql = 'SELECT * FROM obj.api_key WHERE id=$[apiKey] LIMIT 1';
    const result = db.oneOrNone(sql, {
      apiKey,
    }).then((x) => x)
    .catch((x) => null);
    
    // Make sure we have an access record
    if (result) {
      console.log('Result', result);
      
      // Check the IP access address to make sure the IP address matches the request
      if (result.addressPattern && !matches(ip, result.addressPattern)) {
        return false;
      }
      
      // Check the access count to make sure the access count hasn't exceeded the max access count
      if (result.maxAccessCount > 0 && result.accessCount > result.maxAccessCount) {
        return false;
      }
      
      return true;
    }
    
    console.log(\`No API_KEY record found for IP \${ip} API_KEY \${apiKey}\`);
    return false;
  }
}
  `;

  return body;
}

function jwtUtilBody(): string {
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
      // @ts-ignore
      return sign({ data: payload }, SECRET_KEY, { expiresIn: timeout });
    }
    
    // @ts-ignore
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

    return decode(token, SECRET_KEY) ? true : false;
  }
}
`;

  return body;
}
