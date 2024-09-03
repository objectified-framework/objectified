import {PropsPathNode} from "../nodes/PathNode";

const PathNodeEditor = ( schema: PropsPathNode ) => {
  return (
    <>
      <div style={{width: '100%', backgroundColor: '#0ff', borderBottom: '1px solid #aaa'}}>
        Path
      </div>

      {schema.pathAction}<br/>
      {schema.path}
    </>
  );
}

export default PathNodeEditor;
