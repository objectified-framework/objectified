import {Components} from '../schema/Components';
import {Path} from './Path';

export class ApiSpec {
  private components: Components;
  private paths: Path[];

  constructor(private readonly segment: any) {
    this.components = new Components(segment);
    this.paths = [];

    const pathList = Object.keys(segment['paths']);

    console.log(`[ApiSpec] Processing ${pathList.length} paths`);

    for(const pathUrl of pathList) {
      const path = segment['paths'][pathUrl];
      const pathVerbs = Object.keys(segment['paths'][pathUrl]);

      for(const pathVerb of pathVerbs) {
        const pathWithVerb = path[pathVerb];

        this.paths.push(new Path(pathUrl, pathVerb, pathWithVerb));
      }
    }
  }

  public setComponents = (components: Components) => this.components = components;
  public setPaths = (paths: Path[]) => this.paths = paths;

  public getComponents = (): Components => this.components;
  public getPaths = (): Path[] => this.paths;
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
