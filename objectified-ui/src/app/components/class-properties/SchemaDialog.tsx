'use client';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  TextField
} from "@mui/material";
import {SearchOutlined} from '@mui/icons-material';
import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {listClasses, putClass, saveClass, deleteClass, getClassSchema} from "@/app/services/class";
import {formItems, tableItems} from "@/app/classes/index";
import AutoForm from "@/app/components/common/AutoForm";
import {useSession} from 'next-auth/react';
import {errorDialog} from "@/app/components/common/ConfirmDialog";
import DriveFileMoveRtlOutlinedIcon from '@mui/icons-material/DriveFileMoveRtlOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import * as yaml from 'yaml';
import {jsonSchemaToSQL} from "@/app/components/class-properties/JsonSchemaTools";

export interface ISchemaDialog {
  schemaOpen: boolean;
  classId: string;
  closeSchemaClicked: () => void;
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase();
}

export const SchemaDialog = (props: ISchemaDialog) => {
  const [schemaFormat, setSchemaFormat] = useState<string>('json');
  const [schemaLoading, setSchemaLoading] = useState<boolean>(true);
  const [schema, setSchema] = useState<string>('');
  const [schemaHeader, setSchemaHeader] = useState<string>('Schema');
  const [className, setClassName] = useState<string>('');

  const handleSchemaViewChange = (event: any, val: string) => {
    if (val === null) {
      return;
    }

    setSchemaFormat(val);
  }

  const closeClicked = () => {
    setSchemaFormat('json');
    setSchema('');
    setClassName('');
    setSchemaLoading(true);
    props.closeSchemaClicked();
  }

  useEffect(() => {
    if (props.classId) {
      setSchemaLoading(true);
      getClassSchema(props.classId)
        .then((x: any) => {
          setSchema(JSON.stringify(x.results, null, 2));
          setSchemaHeader(`Schema (${x.results.title})`);
          setSchemaLoading(false);
          setClassName(toKebabCase(x.results.title));
        })
        .catch((x: any) => {
          setSchema(`{ "result": "Schema failed to retrieve: ${x}" }`);
          setSchemaHeader(`Schema (Unavailable)`);
          setSchemaLoading(false);
          setClassName('unknown');
        });
    }
  }, [props.classId]);

  const downloadPayload = (extension: string, contentType: string, payload: string) => {
    const blob = new Blob([payload], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    let filename = `${className}${extension}`;

    if (filename.startsWith('-')) {
      filename = filename.substring(1);
    }

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog
      open={props.schemaOpen}
      scroll={'paper'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth={'md'}
      fullWidth
      PaperProps={{ style: {
          minHeight: '90%',
          maxHeight: '90%',
        }}}
    >
      <DialogTitle id="scroll-dialog-title">
        <Stack direction={'row'}>
          <div style={{ width: '50%' }}>
            {schemaHeader}
          </div>
          <div style={{ width: '50%', textAlign: 'right' }}>
            <ToggleButtonGroup
              color="primary"
              value={schemaFormat}
              exclusive
              onChange={handleSchemaViewChange}
              aria-label="Format"
              sx={{ height: '28px' }}
            >
              <ToggleButton value="json">JSON</ToggleButton>
              <ToggleButton value="yaml">YAML</ToggleButton>
              <ToggleButton value="sql">SQL</ToggleButton>
            </ToggleButtonGroup>
            &nbsp;
          </div>
        </Stack>
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
        >
          {schemaLoading && (
            <CircularProgress/>
          )}

          {schema && schemaFormat === 'json' && (
            <>
            <div style={{ width: '100%', height: '100%' }}>
              <div style={{ width: '100%', textAlign: 'right', paddingBottom: '10px' }}>
                <Button style={{
                  height: '24px', borderRadius: 2,
                  color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                        className={'bg-slate-200'}
                        variant={'contained'} startIcon={<ContentPasteIcon/>}
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(JSON.parse(schema), null, 2))}>
                  <Typography className={'font-thin text-xs'} textTransform={'none'}>
                    Copy to Clipboard
                  </Typography>
                </Button>
                &nbsp;
                <Button style={{
                  height: '24px', borderRadius: 2,
                  color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                        className={'bg-slate-200'}
                        variant={'contained'} startIcon={<DriveFileMoveRtlOutlinedIcon/>}
                        onClick={() => downloadPayload('.json', 'text/json', JSON.stringify(JSON.parse(schema), null, 2))}>
                  <Typography className={'font-thin text-xs'} textTransform={'none'}>
                    Export
                  </Typography>
                </Button>
              </div>

              <TextField label={''}
                         fullWidth
                         multiline
                         value={JSON.stringify(JSON.parse(schema), null, 2)}
                         name={'json-text'}
                         key={`schema-form-json`}
                         inputProps={{ style: { fontFamily: 'monospace' }, readOnly: true}}
                         sx={{ width: '100%', height: '100%' }}>
              </TextField>
            </div>
            </>
          )}

          {schema && schemaFormat === 'yaml' && (
            <>
              <div style={{ width: '100%', height: '100%' }}>
                <div style={{ width: '100%', textAlign: 'right', paddingBottom: '10px' }}>
                  <Button style={{
                    height: '24px', borderRadius: 2,
                    color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                          className={'bg-slate-200'}
                          variant={'contained'} startIcon={<ContentPasteIcon/>}
                          onClick={() => navigator.clipboard.writeText(yaml.stringify(JSON.parse(schema)))}>
                    <Typography className={'font-thin text-xs'} textTransform={'none'}>
                      Copy to Clipboard
                    </Typography>
                  </Button>
                  &nbsp;
                  <Button style={{
                    height: '24px', borderRadius: 2,
                    color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                          className={'bg-slate-200'}
                          variant={'contained'} startIcon={<DriveFileMoveRtlOutlinedIcon/>}
                          onClick={() => downloadPayload('.yaml', 'text/yaml', yaml.stringify(JSON.parse(schema)))}>
                    <Typography className={'font-thin text-xs'} textTransform={'none'}>
                      Export
                    </Typography>
                  </Button>
                </div>

                <TextField label={''}
                           fullWidth
                           multiline
                           value={yaml.stringify(JSON.parse(schema))}
                           name={'yaml-text'}
                           key={`schema-form-yaml`}
                           inputProps={{ style: { fontFamily: 'monospace' }, readOnly: true}}
                           sx={{ width: '100%', height: '100%' }}>
                </TextField>
              </div>
            </>
          )}

          {schema && schemaFormat === 'sql' && (
            <>
              <div style={{ width: '100%', height: '100%' }}>
                <div style={{ width: '100%', textAlign: 'right', paddingBottom: '10px' }}>
                  <Button style={{
                    height: '24px', borderRadius: 2,
                    color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                          className={'bg-slate-200'}
                          variant={'contained'} startIcon={<ContentPasteIcon/>}
                          onClick={() => navigator.clipboard.writeText(jsonSchemaToSQL(JSON.parse(schema)))}>
                    <Typography className={'font-thin text-xs'} textTransform={'none'}>
                      Copy to Clipboard
                    </Typography>
                  </Button>
                  &nbsp;
                  <Button style={{
                    height: '24px', borderRadius: 2,
                    color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                          className={'bg-slate-200'}
                          variant={'contained'} startIcon={<DriveFileMoveRtlOutlinedIcon/>}
                          onClick={() => downloadPayload('.sql', 'text/plain', jsonSchemaToSQL(JSON.parse(schema)))}>
                    <Typography className={'font-thin text-xs'} textTransform={'none'}>
                      Export
                    </Typography>
                  </Button>
                </div>

                <TextField label={''}
                           fullWidth
                           multiline
                           value={jsonSchemaToSQL(JSON.parse(schema))}
                           name={'yaml-text'}
                           key={`schema-form-yaml`}
                           inputProps={{ style: { fontFamily: 'monospace' }, readOnly: true}}
                           sx={{ width: '100%', height: '100%' }}>
                </TextField>
              </div>
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          closeClicked();
        }} variant={'contained'}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}