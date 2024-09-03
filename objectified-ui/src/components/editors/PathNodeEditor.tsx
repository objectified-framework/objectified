import {PropsPathNode} from "../nodes/PathNode";
import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import React from "react";
import {TagNodeEditorProps} from "./TagNodeEditor";

export interface PathNodeEditorProps {
  payload: PropsPathNode,
  onSave: (e: PathNodeEditorProps) => void,
  onCancel: () => void,
}

export default function PathNodeEditor(props: PathNodeEditorProps) {
  const [payload, setPayload] = React.useState<any>({
    ...props.payload,
  });

  const handleChange = (e: any) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <div style={{width: '100%', backgroundColor: '#0ff', borderBottom: '1px solid #aaa'}}>
        Path
      </div>

      <div style={{ width: '100%', backgroundColor: '#fff', padding: '10px' }}>
        <FormControl fullWidth>
          <InputLabel id={'path-action-select-label'}>Path Action</InputLabel>
          <Select labelId={'path-action-select-label'} id={'path-action-select'}
                  value={payload.pathAction} label={'Path Action'}
                  name={'pathAction'}
                  onChange={handleChange}>
            <MenuItem value={'GET'}>GET</MenuItem>
            <MenuItem value={'POST'}>POST</MenuItem>
            <MenuItem value={'PUT'}>PUT</MenuItem>
            <MenuItem value={'PATCH'}>PATCH</MenuItem>
            <MenuItem value={'DELETE'}>DELETE</MenuItem>
          </Select>
        </FormControl>

        <TextField type={'text'} name={'path'} fullWidth value={payload.path} placeholder={'Path'} onChange={handleChange}/>
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
