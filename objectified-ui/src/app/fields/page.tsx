'use client';

import {
  Dialog,
} from "@mui/material";
import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {formItems, tableItems} from "@/app/fields/index";
import AutoForm from "@/app/components/common/AutoForm";
import {useSession} from 'next-auth/react';
import {errorDialog} from "@/app/components/common/ConfirmDialog";
import {listFields} from "@/app/services/field";

const Fields = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataPayload, setDataPayload] = useState([]);
  const [selectedLine, setSelectedLine] = useState({});

  const resetSelectedLine = () => {
    setSelectedLine({});
  }

  const refreshDataTypes = () => {
    setIsLoading(true);

    listFields().then((x) => {
      setDataPayload(x);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    refreshDataTypes();
    resetSelectedLine();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const saveClicked = async (payload: any) => {
    // if (payload.id) {
    //   await putDataType(payload)
    //     .then((x) => {
    //       refreshDataTypes();
    //       setOpen(false);
    //     })
    //     .catch((x) => {
    //       errorDialog('Failed to update this data type - duplicate entry or other error.');
    //     });
    // } else {
    //   payload.ownerId = session.objectified.id;
    //
    //   await saveDataType(payload)
    //     .finally(() => {
    //       refreshDataTypes();
    //       setOpen(false);
    //     });
    // }
  }

  const deleteClicked = async (payload: any) => {
    // if (payload.coreType) {
    //   errorDialog('You are not allowed to delete a core data type.');
    //   return;
    // }
    //
    // if (!payload.enabled) {
    //   errorDialog('This data type has already been deleted.');
    //   return;
    // }
    //
    // await deleteDataType(payload.id)
    //   .then((x) => {
    //     refreshDataTypes();
    //   })
    //   .catch((x) => {
    //     errorDialog('You do not have permission to remove this data type.');
    //   });
  }

  const editClicked = async (payload: any) => {
    // if (payload.coreType) {
    //   errorDialog('You are not allowed to edit core types.');
    //   return;
    // }
    //
    // if (payload.ownerId !== session.objectified.id) {
    //   errorDialog('You cannot edit data types that you do not own.');
    //   return;
    // }
    //
    // setSelectedLine(payload);
    // setOpen(true);
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
                         setOpen(true);
                       }}
                       onDelete={(payload) => deleteClicked(payload)}
                       onEdit={(payload: any) => editClicked(payload)}
                       onRefresh={() => refreshDataTypes()}
        />
      </div>
    </>
  );
}

export default Fields;
