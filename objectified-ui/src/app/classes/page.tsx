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

const Classes = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [schemaOpen, setSchemaOpen] = useState<boolean>(false);
  const [schema, setSchema] = useState<string>('');
  const [schemaLoading, setSchemaLoading] = useState<boolean>(true);
  const [schemaFormat, setSchemaFormat] = useState<string>('json');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataPayload, setDataPayload] = useState([]);
  const [selectedLine, setSelectedLine] = useState({});
  // @ts-ignore
  const sessionObject: any = session!.objectified;

  const resetSelectedLine = () => {
    setSelectedLine({});
  }

  const refreshClasses = () => {
    setIsLoading(true);

    listClasses().then((x: any) => {
      setDataPayload(x);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    refreshClasses();
    resetSelectedLine();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const saveClicked = async (payload: any) => {
    if (!payload) {
      errorDialog('Empty payload.');
      return;
    }

    if (payload.id) {
      await putClass(payload)
        .then((x) => {
          refreshClasses();
          setOpen(false);
        })
        .catch((x) => {
          errorDialog('Failed to update this data type - duplicate entry or other error.');
        });
    } else {
      // @ts-ignore
      payload.ownerId = sessionObject.id;

      await saveClass(payload)
        .finally(() => {
          refreshClasses();
          setOpen(false);
        });
    }
  }

  const deleteClicked = async (payload: any) => {
    if (!payload.enabled) {
      errorDialog('This data type has already been deleted.');
      return;
    }

    await deleteClass(payload.id)
      .then((x) => {
        refreshClasses();
      })
      .catch((x) => {
        errorDialog('You do not have permission to remove this class.');
      });
  }

  const editClicked = async (payload: any) => {
    // @ts-ignore
    if (payload.ownerId !== session.objectified.id || payload.tenantId != session.currentTenant) {
      errorDialog('You cannot edit data types that you or your tenant do not own.');
      return;
    }

    setSelectedLine(payload);
    setOpen(true);
  }

  const showSchemaClicked = async (payload: any) => {
    console.log(payload);
    setSchemaOpen(true);
    await getClassSchema(payload.id)
      .then((x) => {
        setSchema(JSON.stringify(x.results, null, 2));
        setSchemaLoading(false);
      })
      .catch((x) => {
        setSchema(`{ "result": "Schema failed to retrieve: ${x}" }`);
        setSchemaLoading(false);
      });
  }

  const handleSchemaViewChange = (event, val: string) => {
    if (val === null) {
      return;
    }

    setSchemaFormat(val);
  }

  const closeSchemaClicked = () => {
    setSchemaOpen(false);
    setSchemaFormat('json');
    setSchema('');
    setSchemaLoading(true);
  }

  return (
    <>
      <Dialog
        open={schemaOpen}
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
              Schema
            </div>
            <div style={{ width: '40%', textAlign: 'right' }}>
              <ToggleButtonGroup
                color="primary"
                value={schemaFormat}
                exclusive
                onChange={handleSchemaViewChange}
                aria-label="Format"
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
              <>
                <CircularProgress/>
              </>
            )}

            {schema && schemaFormat === 'json' && (
              <pre>
                {JSON.stringify(JSON.parse(schema), null, 2)}
              </pre>
            )}

            {schema && schemaFormat === 'yaml' && (
              <pre>
                {yaml.stringify(JSON.parse(schema))}
              </pre>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSchemaClicked}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <AutoForm header={'Class'}
                  formElements={formItems}
                  editPayload={selectedLine}
                  onSave={saveClicked}
                  onCancel={handleClose}/>
      </Dialog>

      <div style={{width: '100%', padding: '10px'}}>
        <DataListTable header={'Classes'}
                       columns={tableItems}
                       dataset={dataPayload}
                       isLoading={isLoading}
                       onAdd={() => {
                         resetSelectedLine();
                         setOpen(true);
                       }}
                       onDelete={(payload) => deleteClicked(payload)}
                       onEdit={(payload: any) => editClicked(payload)}
                       onRefresh={() => refreshClasses()}
                       isEditable={(x: any) => {
                         return (!x.coreType || (x.ownerId && x.ownerId != sessionObject.id)) && x.enabled;
                       }}
                       isDeletable={(x: any) => {
                         return (x.ownerId && x.ownerId === sessionObject.id) && x.enabled;
                       }}
                       extraIcon={<SearchOutlined/>}
                       onExtraIcon={(payload) => showSchemaClicked(payload)}
        />
      </div>
    </>
  );
}

export default Classes;
