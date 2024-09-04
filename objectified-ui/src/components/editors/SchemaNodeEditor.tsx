import {PropsSchemaNode} from "../nodes/SchemaNode";

export interface SchemaNodeEditorProps {
  payload: PropsSchemaNode,
  onSave: (e: SchemaNodeEditorProps) => void,
  onCancel: () => void,
}


const SchemaNodeEditor = ( props: SchemaNodeEditorProps ) => {
  return (
    <>
      <div style={{width: '100%', backgroundColor: '#f0f', borderBottom: '1px solid #aaa'}}>
        Schema
      </div>

      {props.payload.name}<br/>
      {props.payload.description}
    </>
  );
}

export default SchemaNodeEditor;
