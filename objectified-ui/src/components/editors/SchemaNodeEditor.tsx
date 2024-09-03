import {PropsSchemaNode} from "../nodes/SchemaNode";

const SchemaNodeEditor = ( schema: PropsSchemaNode ) => {
  return (
    <>
      <div style={{width: '100%', backgroundColor: '#f0f', borderBottom: '1px solid #aaa'}}>
        Schema
      </div>

      {schema.name}<br/>
      {schema.description}
    </>
  );
}

export default SchemaNodeEditor;
