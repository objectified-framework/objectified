import {Background, Controls, MiniMap, ReactFlow} from "@xyflow/react";

const MainPage = () => {
  return (
    <>
      <ReactFlow>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </>
  );
}

export default MainPage;
