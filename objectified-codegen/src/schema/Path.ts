import {SecuritySchemeStore} from "../stores/SecuritySchemeStore";
import {RequestBodyStore} from "../stores/RequestBodyStore";
import {ResponseStore} from "../stores/ResponseStore";

export class Path {
  private operation: string;
  private pathUrl: string;
  private tags: string[];
  private summary: string;
  private operationId: string;
  private description: string;
  private security: SecuritySchemeStore[];
  private requestBody: RequestBodyStore;
  private responses: ResponseStore[];

  constructor(pathUrl: string, operation: string, private readonly segment: any) {
    this.operation = operation;
    this.pathUrl = pathUrl;

    if (!segment['tags']) {
      throw new Error(`Verb '${operation}' contains no associated Tags`);
    }

    if (!segment['responses']) {
      throw new Error(`Verb '${operation}' contains no defined responses`);
    }

    if (!segment['operationId']) {
      throw new Error(`Verb '${operation}' missing operationId`);
    }

    console.log(`[Path]: url=${pathUrl} operation=${operation}`);

    this.tags = segment['tags'];
    this.summary = segment['summary'] ?? null;
    this.operationId = segment['operationId'];
    this.description = segment['description'] ?? null;

    if (segment['security']) {
      this.security = [];

      for(const security of segment['security']) {
        this.security.push(new SecuritySchemeStore(security));
      }
    }

    if (segment['requestBody']) {
      this.requestBody = new RequestBodyStore(segment['requestBody']);
    }

    if (segment['responses']) {
      this.responses = [];

      const responses = segment['responses'];

      for(const responseCode of Object.keys(responses)) {
        this.responses.push(new ResponseStore(responseCode, responses[responseCode]));
      }
    }
  }
}

//  /auth/login:
//     post:
//       security: []
//       requestBody:
//         description: The user credentials with which to login.
//         required: true
//         content:
//           application/json:
//             schema:
//               type: object
//               properties:
//                 username:
//                   type: string
//                   description: The username to use.
//                 password:
//                   type: string
//                   description: The base64 encoded password.
//       responses:
//         '200':
//           description: OK, returns the JWT session token that must be stored.
//           content:
//             text/plain:
//               schema:
//                 type: string
//         '401':
//           description: Unauthorized
//         '403':
//           description: Forbidden
