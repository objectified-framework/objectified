'use client';

import { ReactFlow, Background, MiniMap, Controls, } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useState, useEffect} from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import {listClasses} from "@/app/services/class";
import {AddOutlined, RefreshOutlined, CheckBox, Edit} from '@mui/icons-material';

const Designer = () => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const reloadClasses = () => {
    setLoading(true);
    setNodes([]);

    listClasses().then((x: any) => {
      const nodeList: any[] = [];
      let row = 0;
      let column = 0;

      x.forEach((cls: any, count: number) => {
        nodeList.push({
          id: cls.id,
          position: {
            x: column * 200,
            y: row * 75,
          },
          data: {
            label: cls.name,
          },
        });

        column++;

        if (count % 4 == 3) {
          row++;
          column = 0;
        }
      });

      setNodes(nodeList);
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    reloadClasses();
  }, []);

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <ReactFlow nodes={nodes} edges={[]} fitView>
          <Background/>
          <MiniMap/>
          <Controls/>

          <div style={{ width: '100%', top: '70', left: '0', position: 'fixed', textAlign: 'right', zIndex: 999 }}>
            <IconButton>
              <RefreshOutlined onClick={() => reloadClasses()}/>
            </IconButton>
          </div>

          {loading && (
            <div style={{ width: '100%', textAlign: 'center', padding: '20px' }}>
              Refreshing Class List, one moment ...
              <p/><br/>
              <CircularProgress/>
            </div>
          )}
        </ReactFlow>
      </div>
    </>
  );
}

export default Designer;