'use client';

import {useRouter} from "next/navigation";
import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import Item from "@/app/components/common/Item";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle, FormControl, IconButton,
  InputLabel, MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {listDataTypes} from "@/app/services/data-type";
import {formItems, tableItems} from "@/app/data-types/index";
import AutoForm from "@/app/components/common/AutoForm";

const DataTypes = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>({});
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

  const handleChange = (e: any) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  }

  const clearForm = () => {
    setPayload({});
  }

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
