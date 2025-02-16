'use client';

import {
  Dialog,
} from "@mui/material";
import {SearchOutlined} from '@mui/icons-material';
import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {listClasses, putClass, saveClass, deleteClass, getClassSchema} from "@/app/services/class";
import {formItems, tableItems} from "@/app/classes/index";
import AutoForm from "@/app/components/common/AutoForm";
import {useSession} from 'next-auth/react';
import {errorDialog} from "@/app/components/common/ConfirmDialog";
import {SchemaDialog} from "@/app/components/class-properties/SchemaDialog";

const Classes = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [schemaOpen, setSchemaOpen] = useState<boolean>(false);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
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
      setDataPayload(x.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
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
    setSelectedClassId(payload.id);
    setSchemaOpen(true);
  }

  const handleSchemaViewChange = (event, val: string) => {
    if (val === null) {
      return;
    }

    setSchemaFormat(val);
  }

  const closeSchemaClicked = () => {
    setSchemaOpen(false);
    setSelectedClassId('');
  }

  return (
    <>
      <SchemaDialog schemaOpen={schemaOpen} classId={selectedClassId} closeSchemaClicked={() => closeSchemaClicked()}/>

      <Dialog fullWidth open={open} onClose={handleClose}
              maxWidth={'md'}
              PaperProps={{ style: {
                minHeight: '90%',
                maxHeight: '90%',
              }}}>
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
                       isAddable={true}
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
