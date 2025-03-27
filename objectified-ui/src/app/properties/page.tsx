'use client';

import {
  Dialog,
  Stack,
  Box,
  Button,
  Typography,
} from "@mui/material";
import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {formItems, tableItems} from "@/app/properties/index";
import AutoForm from "@/app/components/common/AutoForm";
import {useSession} from 'next-auth/react';
import {errorDialog} from "@/app/components/common/ConfirmDialog";
import {listProperties, saveProperty, putProperty, deleteProperty} from "@/app/services/property";
import {listFields} from "@/app/services/field";
import {listClasses} from "@/app/services/class";
import HelpIcon from '@mui/icons-material/Help';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import Item from "@/app/components/common/Item";

const Properties = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataPayload, setDataPayload] = useState([]);
  const [fields, setFields] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedLine, setSelectedLine] = useState({});

  const resetSelectedLine = () => {
    setSelectedLine({});
  }

  const refreshProperties = () => {
    setIsLoading(true);

    listProperties().then((x: any) => {
      setDataPayload(x);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const refreshClasses = () => {
    setIsLoading(true);

    listClasses().then((x: any) => {
      let mappedResults = x.map((y: any) => {
        return {
          classId: y.id,
          name: y.name,
        };
      }).sort((a: any, b: any) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

      mappedResults = [
        {
          classId: null,
          name: 'No Class Selected'
        },
        ...mappedResults,
      ]
      formItems[1].dataset = mappedResults;
      setClasses(mappedResults);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const refreshFields = async (): Promise<void> => {
    await listFields()
      .then((x: any) => {
        let mappedResults = x.map((y: any) => {
          return {
            fieldId: y.id,
            name: y.name,
          };
        }).sort((a: any, b: any) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

        mappedResults = [
          {
            fieldId: null,
            name: 'No Field Selected'
          },
          ...mappedResults,
        ]
        formItems[0].dataset = mappedResults;
        setFields(mappedResults);
      })
      .catch(() => {
        return Promise.reject();
      });
  }

  useEffect(() => {
    refreshProperties();
    refreshFields().then(() => {});
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

    if (payload.name.charAt(0) === payload.name.charAt(0).toUpperCase() || payload.name.includes('-')) {
      errorDialog('Property names must be lowercase, pascalCase, or snake_case.');
      return;
    }

    if (payload.fieldId === null && payload.classId === null) {
      errorDialog('Property must refer to a field or a class.');
      return;
    }

    if (payload.id) {
      await putProperty(payload)
        .then(() => {
          refreshProperties();
          setOpen(false);
        })
        .catch(() => {
          errorDialog('Failed to update this property - duplicate entry or other error.');
        });
    } else {
      payload.ownerId = (session as any).objectified.id;

      await saveProperty(payload)
        .finally(() => {
          refreshProperties();
          setOpen(false);
        });
    }
  }

  const deleteClicked = async (payload: any) => {
    if (!payload.enabled) {
      errorDialog('This data type has already been deleted.');
      return;
    }

    await deleteProperty(payload.id)
      .then(() => {
        refreshProperties();
      })
      .catch(() => {
        errorDialog('You do not have permission to remove this class.');
      });
  }

  const editClicked = async (payload: any) => {
    console.log(payload);

    if (payload.tenantId != (session as any).currentTenant) {
      errorDialog('You cannot edit properties that you or your tenant do not own.');
      return;
    }

    setSelectedLine(payload);
    setOpen(true);
  }

  if (!(session as any).currentTenant) {
    return (
      <Stack direction={'column'}>
        <Item sx={{width: '100%', padding: '30px' }}>
          <Box sx={{ boxShadow: 4, padding: '20px', backgroundColor: '#f66', color: '#fff' }}>
            <b>You have not chosen a tenant.</b>
          </Box>
        </Item>
      </Stack>
    );
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose}
              scroll={'paper'}
              PaperProps={{ style: {
                  minHeight: '90%',
                  maxHeight: '90%',
                }}}>
      <AutoForm header={'Properties'}
                  formElements={formItems}
                  editPayload={selectedLine}
                  onSave={saveClicked}
                  onCancel={handleClose}/>
      </Dialog>

      <div style={{ width: '100%', height: '36px', borderBottom: '1px solid #ccc', padding: '4px' }}>
        <Stack direction={'row'}>
          <div style={{ width: '50%', textAlign: 'left', paddingLeft: '2px', }}>
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-slate-200'}
                    variant={'contained'} startIcon={<AddIcon/>}
                    onClick={() => {
                      if (fields.length <= 1) {
                        errorDialog('You need to add at least one field before you can create a property.');
                        return;
                      }
                      resetSelectedLine();
                      setOpen(true);
                    }}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Add
              </Typography>
            </Button>
            &nbsp;
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-green-300'}
                    variant={'contained'} startIcon={<RefreshIcon/>}
                    onClick={() => refreshProperties()}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Refresh
              </Typography>
            </Button>
          </div>

          <div style={{ width: '50%', textAlign: 'right', paddingRight: '10px' }}>
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-slate-200'}
                    variant={'contained'} startIcon={<HelpIcon/>}
                    onClick={() => window.open('https://docs.objectified.dev/docs/ui/properties', '_none')}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Help
              </Typography>
            </Button>
          </div>
        </Stack>
      </div>

      <div style={{width: '100%', padding: '0px'}}>
        <DataListTable header={'Properties'}
                       columns={tableItems}
                       dataset={dataPayload}
                       isLoading={isLoading}
                       isAddable={false}
                       isRefreshable={false}
                       onDelete={(payload) => deleteClicked(payload)}
                       onEdit={(payload: any) => editClicked(payload)}
                       isEditable={(x: any) => {
                         return (x.tenantId === (session as any).currentTenant) && x.enabled;
                       }}
                       isDeletable={(x: any) => {
                         return (x.tenantId === (session as any).currentTenant) && x.enabled;
                       }}
                       renderColumn={(column, value) => {
                         if (column === 'fieldId') {
                           const result: any[] = fields.filter((x: any) => x['fieldId'] === value);

                           if (value === null) {
                             return '';
                           }

                           return (result.length > 0) ? result[0].name : value;
                         } else if (column === 'classId') {
                           const result: any[] = classes.filter((x: any) => x['classId'] === value);

                           if (value === null) {
                             return '';
                           }

                           return (result.length > 0) ? result[0].name : value;
                         }

                         return value;
                       }}
        />
      </div>
    </>
  );
}

export default Properties;
