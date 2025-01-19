'use client';

import {
  Dialog,
} from "@mui/material";
import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {formItems, tableItems} from "@/app/properties/index";
import AutoForm from "@/app/components/common/AutoForm";
import {useSession} from 'next-auth/react';
import {errorDialog} from "@/app/components/common/ConfirmDialog";
import {listProperties} from "@/app/services/property";
import {listFields} from "@/app/services/field";

const Properties = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataPayload, setDataPayload] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedLine, setSelectedLine] = useState({});

  const resetSelectedLine = () => {
    setSelectedLine({});
  }

  const refreshProperties = () => {
    setIsLoading(true);

    listProperties().then((x) => {
      setDataPayload(x);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const refreshFields = async (): Promise<void> => {
    await listFields()
      .then((x) => {
        const mappedResults = x.map((y) => {
          return {
            fieldId: y.id,
            name: y.name,
          };
        });

        formItems[0].dataset = mappedResults;
        setFields(mappedResults);
      })
      .catch((x) => {
        return Promise.reject();
      });
  }

  useEffect(() => {
    refreshProperties();
    refreshFields();
    resetSelectedLine();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const saveClicked = async (payload: any) => {
    // if (!payload) {
    //   errorDialog('Empty payload.');
    //   return;
    // }
    //
    // if (payload.id) {
    //   await putClass(payload)
    //     .then((x) => {
    //       refreshProperties();
    //       setOpen(false);
    //     })
    //     .catch((x) => {
    //       errorDialog('Failed to update this data type - duplicate entry or other error.');
    //     });
    // } else {
    //   payload.ownerId = session.objectified.id;
    //
    //   await saveClass(payload)
    //     .finally(() => {
    //       refreshProperties();
    //       setOpen(false);
    //     });
    // }
  }

  const deleteClicked = async (payload: any) => {
    // if (!payload.enabled) {
    //   errorDialog('This data type has already been deleted.');
    //   return;
    // }
    //
    // await deleteClass(payload.id)
    //   .then((x) => {
    //     refreshProperties();
    //   })
    //   .catch((x) => {
    //     errorDialog('You do not have permission to remove this class.');
    //   });
  }

  const editClicked = async (payload: any) => {
    // if (payload.ownerId !== session.objectified.id || payload.tenantId != session.currentTenant) {
    //   errorDialog('You cannot edit data types that you or your tenant do not own.');
    //   return;
    // }
    //
    // setSelectedLine(payload);
    // setOpen(true);
  }

  return (
    <>
      <Dialog fullWidth={'md'} open={open} onClose={handleClose}>
        <AutoForm header={'Properties'}
                  formElements={formItems}
                  editPayload={selectedLine}
                  onSave={saveClicked}
                  onCancel={handleClose}/>
      </Dialog>

      <div style={{width: '100%', padding: '10px'}}>
        <DataListTable header={'Properties'}
                       columns={tableItems}
                       dataset={dataPayload}
                       isLoading={isLoading}
                       onAdd={() => {
                         if (fields.length === 0) {
                           errorDialog('You need to add at least one field before you can create a property.');
                           return;
                         }
                         resetSelectedLine();
                         setOpen(true);
                       }}
                       onDelete={(payload) => deleteClicked(payload)}
                       onEdit={(payload: any) => editClicked(payload)}
                       onRefresh={() => refreshProperties()}
                       isEditable={(x: any) => {
                         return (!x.coreType || (x.ownerId && x.ownerId != session.objectified.id)) && x.enabled;
                       }}
                       isDeletable={(x: any) => {
                         return (x.ownerId && x.ownerId === session.objectified.id) && x.enabled;
                       }}
        />
      </div>
    </>
  );
}

export default Properties;
