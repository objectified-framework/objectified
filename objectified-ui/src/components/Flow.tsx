'use client'

import {useCallback, useState} from "react";
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
import TagNode from "./nodes/TagNode";
import PathNode from "./nodes/PathNode";
import SchemaNode from "./nodes/SchemaNode";
import TagNodeEditor from "./editors/TagNodeEditor";
import PathNodeEditor from "./editors/PathNodeEditor";
import SchemaNodeEditor from "./editors/SchemaNodeEditor";

const nodeTypes = {
  'tag': TagNode,
  'path': PathNode,
  'schema': SchemaNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [editorOpen, setEditorOpen] = useState(false);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
  const [editorChildren, setEditorChildren] = useState(<></>);

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

    let newNode = {};
    const nodeId = getId();

    switch(type) {
      case 'tag':
        newNode = {
          id: nodeId,
          type,
          position,
          data: {
            tagName: `Tag ${nodeId.substring(nodeId.lastIndexOf('_') + 1)}`,
            tagDescription: 'No description'
          },
        };
        break;

      case 'path':
        newNode = {
          id: nodeId,
          type,
          position,
          data: {
            schema: {
              path: '/',
              pathAction: 'GET',
            },
          },
        };
        break;

      case 'schema':
        newNode = {
          id: nodeId,
          type,
          position,
          data: {
            schema: {
              name: `Schema${nodeId.substring(nodeId.lastIndexOf('_') + 1)}`
            },
          },
        };
        break;
    }

    setNodes((nds) => nds.concat(newNode));

    console.log('Position', position);
  }, [screenToFlowPosition, type]);

  const persistPayload = (targetNode, payload) => {
    if (targetNode.type === 'tag') {
      console.log(`Save tag node`, payload);

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === targetNode.id) {
            return {
              ...node,
              data: {
                ...payload,
              },
            };
          }

          return node;
        }));
    }

    onPaneClick();
  }

  const onNodeClick = (event, node) => {
    console.log('click node', node);
    let childrenNodes = <></>;

    switch(node.type) {
      case 'tag':
        childrenNodes = <TagNodeEditor tagName={node.data.tagName}
                                       tagDescription={node.data.tagDescription}
                                       onSave={(e) => persistPayload(node, e)}
                                       onCancel={onPaneClick}/>;
        break;

      case 'path':
        childrenNodes = PathNodeEditor(node.data.schema);
        break;

      case 'schema':
        childrenNodes = SchemaNodeEditor(node.data.schema);
        break;
    }

    setEditorChildren(<>{childrenNodes}</>);
    setEditorOpen(true);
  }
  const onPaneClick = () => setEditorOpen(false);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        sx={{width: '300'}}
      >
        <Background/>
        <MiniMap/>
        <Controls/>
      </ReactFlow>

      {editorOpen && (
        <div style={{
          position: 'fixed',
          top: '44px',
          width: '300px',
          border: '2px solid #000',
          backgroundColor: '#fff',
          left: 'calc(100% - 310px)'
        }}>
          {editorChildren}
        </div>
      )}
    </>
  );
}
