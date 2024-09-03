'use client';

import {Button, Stack, TextField} from "@mui/material";
import React from "react";

export interface TagNodeEditorProps {
  tagName: string,
  tagDescription: string,
  onSave: (e: TagNodeEditorProps) => void,
  onCancel: () => void,
}

export default function TagNodeEditor(props: TagNodeEditorProps) {
  const [payload, setPayload] = React.useState({
    tagName: props.tagName,
    tagDescription: props.tagDescription,
  });

  const handleChange = (e: any) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <div style={{ width: '100%', backgroundColor: '#ff0', borderBottom: '1px solid #aaa' }}>
        Tag
      </div>

      <div style={{ width: '100%', backgroundColor: '#fff', padding: '10px' }}>
        <TextField type={'text'} name={'tagName'} fullWidth value={payload.tagName} placeholder={'Tag Name'} onChange={handleChange}/>
        <p/>
        <TextField type={'text'} name={'tagDescription'} fullWidth value={payload.tagDescription} placeholder={'Tag Name'}
                   onChange={handleChange} rows={4} multiline={true}/>
      </div>

      <Stack direction={'row'} style={{ padding: '10px' }}>
        <div style={{width: '50%'}}>
          <Button variant={'contained'} sx={{ backgroundColor: 'green' }}
          onClick={() => props.onSave(payload)}>Save</Button>
        </div>

        <div style={{width: '50%', textAlign: 'right'}}>
          <Button variant={'contained'} sx={{ backgroundColor: 'red' }}
          onClick={() => props.onCancel()}>Cancel</Button>
        </div>
      </Stack>
    </>
  );
}
