import {Components} from '../schema/Components';

export class ApiSpec {
  private components: Components;
  // private paths: Paths;

  constructor(private readonly segment: any) {
    this.components = new Components(segment);

    throw new Error('Paths next');
  }

  public setComponents = (components: Components) => this.components = components;

  public getComponents = (): Components => this.components;
}

//  /auth/login:
//     post:
//       tags:
//         - Authentication
//       summary: Performs a login
//       operationId: authLogin
//       description: Logs a user into the system by their username and password.
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
