'use client';

import {useRouter} from "next/navigation";
import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import Item from "@/app/components/common/Item";
import {
  Button,
  Dialog, DialogContent,
  DialogTitle,
  FormControl,
  IconButton, Input,
  InputLabel, MenuItem, Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import PasswordTextField from "@/app/components/common/PasswordTextField";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useState} from "react";

const Groups = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>({});

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

  const saveClicked = () => {

  }

  return (
    <>
      <Dialog fullWidth={'md'} open={open} onClose={handleClose}>
        <DialogTitle>
          <Stack direction={'row'}>
            <div style={{ width: '50%' }}>
              New Group
            </div>
            <div style={{ width: '50%', textAlign: 'right' }}>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon/>
              </IconButton>
            </div>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack direction={'column'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Group Name'} fullWidth value={payload.name ?? ''}
                         name={'name'} onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '100%' }}>
              <TextField label={'Description'} fullWidth value={payload.description ?? ''}
                     name={'description'} onChange={handleChange} multiline rows={3}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%', textAlign: 'right' }}>
              <Button variant={'contained'} color={'error'} onClick={() => clearForm()}>Clear Form</Button>
              &nbsp;
              <Button variant={'contained'} onClick={() => saveClicked()}>Save</Button>
            </Item>
          </Stack>
        </DialogContent>
      </Dialog>

      <div style={{width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px' }}>
        <Stack direction={'row'}>
          <Typography variant={'h4'} fontWeight={'bold'}>Groups</Typography>
          <Item sx={{width: '100%', textAlign: 'right', backgroundColor: 'inherit', padding: '0px'}}>
            <Button sx={{color: '#fff'}} onClick={() => setOpen(true)}>
              <AddOutlined/>
            </Button>
          </Item>
        </Stack>
      </div>
    </>
  );
}

export default Groups;
