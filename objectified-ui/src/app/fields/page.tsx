'use client';

import {
  Dialog, Box, Stack,
} from "@mui/material";
import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {formItems, tableItems} from "@/app/fields/index";
import AutoForm from "@/app/components/common/AutoForm";
import {useSession} from 'next-auth/react';
import {errorDialog} from "@/app/components/common/ConfirmDialog";
import {deleteField, listFields, saveField, putField} from "@/app/services/field";
import {listDataTypes} from "@/app/services/data-type";
import Item from "@/app/components/common/Item";

const Fields = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataPayload, setDataPayload] = useState([]);
  const [selectedLine, setSelectedLine] = useState({});
  const [dataTypes, setDataTypes] = useState([]);

  const resetSelectedLine = () => {
    setSelectedLine({});
  }

  const loadFields = async () => {
    await listDataTypes()
      .then((x) => {
        const mappedResults = x.map((y) => {
          return {
            dataTypeId: y.id,
            name: y.name,
          };
        });

        formItems[2].dataset = mappedResults;
        setDataTypes(mappedResults);
      })
      .catch((x) => {
        return Promise.reject();
      });
  }

  const refreshFields = () => {
    setIsLoading(true);

    listFields().then((x) => {
      setDataPayload(x);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    refreshFields();
    resetSelectedLine();
    loadFields().then(r => {});
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const saveClicked = async (payload: any) => {
    if (payload.id) {
      await putField(payload.id, payload)
        .then((x) => {
          refreshFields();
          setOpen(false);
        })
        .catch((x) => {
          errorDialog('Failed to update this data type - duplicate entry or other error.');
        });
    } else {
      payload.ownerId = session.objectified.id;

      await saveField(payload)
        .finally(() => {
          refreshFields();
          setOpen(false);
        });
    }
  }

  const deleteClicked = async (payload: any) => {
    if (!payload.enabled) {
      errorDialog('This data type has already been deleted.');
      return;
    }

    await deleteField(payload.id)
      .then((x) => {
        refreshFields();
      })
      .catch((x) => {
        errorDialog('Unable to disable the selected field.');
        refreshFields();
      });
  }

  const editClicked = async (payload: any) => {
    if (session.currentTenant !== payload.tenantId) {
      errorDialog('You cannot edit data types that you do not own.');
      return;
    }

    setSelectedLine(payload);
    setOpen(true);
  }

  if (!session.currentTenant) {
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
      <Dialog fullWidth={'md'} open={open} onClose={handleClose}>
        <AutoForm header={'Field'}
                  formElements={formItems}
                  editPayload={selectedLine}
                  onSave={saveClicked}
                  onCancel={handleClose}/>
      </Dialog>

      <div style={{width: '100%', padding: '10px'}}>
        <DataListTable header={'Fields'}
                       columns={tableItems}
                       dataset={dataPayload}
                       isLoading={isLoading}
                       onAdd={() => {
                         resetSelectedLine();
                         loadFields().then(r => {
                           setOpen(true);
                         }).catch(() => {
                           setOpen(false);
                           errorDialog('Unable to load data types');
                         });
                       }}
                       onDelete={(payload) => deleteClicked(payload)}
                       onEdit={(payload: any) => editClicked(payload)}
                       onRefresh={() => refreshFields()}
                       isDeletable={(x) => {
                         return x.enabled;
                       }}
                       isEditable={(x) => {
                         return x.enabled;
                       }}
                       renderColumn={(column, value) => {
                         if (column === 'dataTypeId') {
                           const result = dataTypes.filter((x) => x['dataTypeId'] === value);

                           return (result.length > 0) ? result[0].name : value;
                         }

                         return value;
                       }}
        />
      </div>
    </>
  );
}

export default Fields;
