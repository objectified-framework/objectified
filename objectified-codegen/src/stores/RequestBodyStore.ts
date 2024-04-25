export class RequestBodyStore {
  private description: string;
  private required: boolean;
  // private contents: ContentStore[];

  constructor(private readonly segment: any) {
    this.description = segment['description'];
    this.required = segment['required'];

    throw new Error('RequestBodyStore not yet implemented');
  }

//       requestBody:
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

}