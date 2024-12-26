'use client';

import {
  Dialog,
} from "@mui/material";
import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {listDataTypes, saveDataType} from "@/app/services/data-type";
import {formItems, tableItems} from "@/app/data-types/index";
import AutoForm from "@/app/components/common/AutoForm";
import {useSession} from 'next-auth/react';

const DataTypes = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataPayload, setDataPayload] = useState([]);

  const refreshDataTypes = () => {
    setIsLoading(true);

    listDataTypes().then((x) => {
      setDataPayload(x);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    refreshDataTypes();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const saveClicked = async (payload: any) => {
    payload.ownerId = session.objectified.id;

    await saveDataType(payload)
      .finally(() => {
        refreshDataTypes();
        setOpen(false);
      });
  }

  return (
    <>
      <Dialog fullWidth={'md'} open={open} onClose={handleClose}>
        <AutoForm header={'Data Type'}
                  formElements={formItems}
                  onAdd={saveClicked}
                  onCancel={handleClose}/>
      </Dialog>

      <div style={{width: '100%', padding: '10px'}}>
        <DataListTable header={'System Data Types'}
                       columns={tableItems}
                       dataset={dataPayload}
                       isLoading={isLoading}
                       onAdd={() => setOpen(true)}
                       onRefresh={() => refreshDataTypes()}
        />
      </div>
    </>
  );
}

export default DataTypes;
