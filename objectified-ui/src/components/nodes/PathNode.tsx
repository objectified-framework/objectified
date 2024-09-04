//  /auth:
//     post:
//       tags:
//         - Auth
//       summary: Login service
//       operationId: login
//       description: |
//         Logs a user into the system via their username and password combination.
//       security: []
//       requestBody:
//         description: The user credentials with which to login.
//         required: true
//         content:
//           application/json:
//             schema:
//               $ref: '#/components/schemas/Login'
//       responses:
//         '200':
//           description: OK, returns the JWT session token that must be stored on the client.
//           content:
//             text/plain:
//               schema:
//                 type: string
//         '400':
//           description: Bad request
//         '401':
//           description: Unauthorized

import {NodeProps} from "@xyflow/react";
import {Stack, Typography} from "@mui/material";

export type PropsPathNode = {
  path: string;
  pathAction: string;
  pathTags?: string[];
  summary?: string;
  description?: string;
  security?: [];
  requestBody?: any;
  responses?: any[];
  grpcDestination: string;
};

export const PathNode = ({
                          data: { schema },
                        }: NodeProps<{ schema: PropsPathNode }>) => {
  return (
    <div style={{border: '1px solid #000', borderTopLeftRadius: 3, borderTopRightRadius: 3, backgroundColor: '#fff', minWidth: '200px' }}>
      <div style={{
        borderTopLeftRadius: 3, borderTopRightRadius: 3, backgroundColor: '#0ff', borderBottom: '1px solid #ccc',
        paddingLeft: '10px'
      }}>
        {schema.pathAction.toUpperCase()} {schema.path}
      </div>
      <Stack direction={'column'}>
        <Stack direction={'row'}>
          <div style={{ width: '70%' }}>
            Inputs
          </div>
          <div style={{ width: '30%', textAlign: 'right' }}>
            &gt;
          </div>
        </Stack>
        <Stack direction={'row'}>
          <div style={{ width: '70%' }}>
            Request Body
          </div>
          <div style={{ width: '30%', textAlign: 'right' }}>
            &gt;
          </div>
        </Stack>
        <Stack direction={'row'}>
          <div style={{ width: '70%' }}>
            Responses
          </div>
          <div style={{ width: '30%', textAlign: 'right' }}>
            &gt;
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default PathNode;
