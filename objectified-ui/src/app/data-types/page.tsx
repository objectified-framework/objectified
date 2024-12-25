'use client';

import {useRouter} from "next/navigation";
import {
  Dialog,
} from "@mui/material";
import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {listDataTypes} from "@/app/services/data-type";
import {formItems, tableItems} from "@/app/data-types/index";
import AutoForm from "@/app/components/common/AutoForm";

const DataTypes = () => {
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

  const saveClicked = (payload: any) => {
    console.log('Save payload', payload);
    setOpen(false);
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
