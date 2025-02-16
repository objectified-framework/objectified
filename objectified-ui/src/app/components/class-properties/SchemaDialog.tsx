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
import * as yaml from 'yaml';

export interface ISchemaDialog {
  schemaOpen: boolean;
  classId: string;
  closeSchemaClicked: () => void;
}

export const SchemaDialog = (props: ISchemaDialog) => {
  const [schemaFormat, setSchemaFormat] = useState<string>('json');
  const [schemaLoading, setSchemaLoading] = useState<boolean>(true);
  const [schema, setSchema] = useState<string>('');
  const [schemaHeader, setSchemaHeader] = useState<string>('Schema');

  const handleSchemaViewChange = (event, val: string) => {
    if (val === null) {
      return;
    }

    setSchemaFormat(val);
  }

  const closeClicked = () => {
    setSchemaFormat('json');
    setSchema('');
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
        })
        .catch((x) => {
          setSchema(`{ "result": "Schema failed to retrieve: ${x}" }`);
          setSchemaHeader(`Schema (Unavailable)`);
          setSchemaLoading(false);
        });
    }
  }, [props.classId]);

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
          <div style={{ width: '60%' }}>
            {schemaHeader}
          </div>
          <div style={{ width: '40%', textAlign: 'right' }}>
            <ToggleButtonGroup
              color="primary"
              value={schemaFormat}
              exclusive
              onChange={handleSchemaViewChange}
              aria-label="Format"
              style={{ height: '28px' }}
            >
              <ToggleButton value="json">JSON</ToggleButton>
              <ToggleButton value="yaml">YAML</ToggleButton>
            </ToggleButtonGroup>
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
              <div style={{ width: '100%', textAlign: 'right' }}>
                <Button onClick={() => navigator.clipboard.writeText(JSON.stringify(JSON.parse(schema), null, 2))}>Copy to Clipboard</Button>
              </div>
              <TextField label={''}
                         fullWidth
                         multiline
                         value={JSON.stringify(JSON.parse(schema), null, 2)}
                         name={'json-text'}
                         key={`schema-form-json`}
                         inputProps={{ style: { fontFamily: 'monospace' }, readOnly: true}}
                         style={{ width: '100%', height: '100%' }}>
              </TextField>
            </div>
            </>
          )}

          {schema && schemaFormat === 'yaml' && (
            <>
              <div style={{ width: '100%', height: '100%' }}>
                <div style={{ width: '100%', textAlign: 'right' }}>
                  <Button onClick={() => navigator.clipboard.writeText(yaml.stringify(JSON.parse(schema)))}>Copy to Clipboard</Button>
                </div>
              <TextField label={''}
                         fullWidth
                         multiline
                         value={yaml.stringify(JSON.parse(schema))}
                         name={'yaml-text'}
                         key={`schema-form-yaml`}
                         inputProps={{ style: { fontFamily: 'monospace' }, readOnly: true}}
                         style={{ width: '100%', height: '100%' }}>
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