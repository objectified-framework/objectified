'use client'

import { useCallback } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect, useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

// import { initialNodes, nodeTypes, type CustomNodeType } from "./nodes";
// import { initialEdges, edgeTypes, type CustomEdgeType } from "./edges";
import { initialNodes } from "./nodes";
import { initialEdges } from "./edges";
import {useDnD} from "./drag-and-drop/DnDContext";

let id = 0;
const getId = () => `dndnode_${id}`;

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeType>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdgeType>(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    console.log('[Flow] On Drag Over');
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    if (!type) {
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    }

    setNodes((nds) => nds.concat(newNode));

    console.log('Position', position);
  }, [screenToFlowPosition, type]);

  return (
    <>
      <ReactFlow<CustomNodeType, CustomEdgeType>
        nodes={nodes}
        // nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        // edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        sx={{ width: '300'}}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </>
  );
}
