//    LinkDef:
//       type: object
//       required:
//         - namespaceId
//         - t1
//         - t2
//       description: |
//         `LinkDef` defines a `Link` between two `Class` objects.  It contains a left side (t1) and a right side (t2).
//       properties:
//         id:
//           type: integer
//           format: int64
//           description: The numerical ID of the link definition.  (Auto-numbering, ignored on create.)
//         namespaceId:
//           type: integer
//           format: int64
//           description: The numerical ID of the namespace to which this link definition belongs.
//         t1:
//           type: integer
//           format: int64
//           description: The numerical ID of the class on the left side to link from.
//         t2:
//           type: integer
//           format: int64
//           description: The numerical ID of the class on the right side to link to.
//         name:
//           type: string
//           description: Alphanumeric common name of the data type, cannot start with a number.
//           minLength: 2
//           maxLength: 80
//           pattern: '^[A-Za-z][A-Za-z0-9]*$'
//         description:
//           type: string
//           description: A short description describing the data type.  CommonMark accepted.
//           maxLength: 4096


import {Handle, NodeProps} from "@xyflow/react";
import {Stack, Typography} from "@mui/material";

export type PropsSchemaNode = {
  name: string;
  type?: string;
  required?: string[];
  description?: string;
  properties?: any[];
};

export const SchemaNode = ({
                           data: { schema },
                         }: NodeProps<{ schema: PropsSchemaNode }>) => {
  return (
    <div style={{border: '1px solid #000', borderTopLeftRadius: 3, borderTopRightRadius: 3, backgroundColor: '#fff', minWidth: '200px' }}>
      <div style={{
        borderTopLeftRadius: 3, borderTopRightRadius: 3, backgroundColor: '#f0f', borderBottom: '1px solid #ccc',
        paddingLeft: '10px'
      }}>
        {schema.name}
      </div>
      <Handle type={'target'} position={'left'}/>
      <Handle type={'source'} position={'right'}/>
      <Typography color={'#aaa'}>Undefined</Typography>
    </div>
  );
};

export default SchemaNode;
