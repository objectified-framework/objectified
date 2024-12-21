'use client';

import {useRouter} from "next/navigation";
import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import {
  Button,
  Dialog,
  DialogContent, DialogContentText,
  DialogTitle, FormControl, IconButton, InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Item from "@/app/components/common/Item";
import {AddOutlined} from "@mui/icons-material";
import {useState} from "react";
import PasswordTextField from "@/app/components/common/PasswordTextField";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

const Users = () => {
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
              New User
            </div>
            <div style={{ width: '50%', textAlign: 'right' }}>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon/>
              </IconButton>
            </div>
          </Stack>
        </DialogTitle>

        <DialogContentText sx={{ paddingLeft: '1.5em', paddingRight: '1em' }}>
          Password can be blank if "source" is other than local.
          Local specifies the login source via 2FA.
        </DialogContentText>

        <DialogContent>
          <Stack direction={'column'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Username'} fullWidth value={payload.username ?? ''}
                         name={'username'} onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '100%' }}>
              <PasswordTextField label={'Password'} fullWidth value={payload.password ?? ''}
                         name={'password'} onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '30%' }}>
              <FormControl fullWidth>
                <InputLabel id={'source-label'}>Source</InputLabel>
                <Select labelId={'source-label'} label={'Source'}
                  style={{ textAlign: 'left' }}
                  value={payload.source ?? 'local'} name={'source'}
                  onChange={handleChange} fullWidth>
                  <MenuItem value={'local'}>Local</MenuItem>
                  <MenuItem value={'google'}>Google</MenuItem>
                  <MenuItem value={'github'}>GitHub</MenuItem>
                  <MenuItem value={'gitlab'}>GitLab</MenuItem>
                </Select>
              </FormControl>
            </Item>
            <Item sx={{ width: '70%' }}>
              <TextField label={'E-Mail Address'} fullWidth value={payload.email_address ?? ''}
                         name={'email_address'} onChange={handleChange}/>
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

      <div style={{width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px'}}>
        <Stack direction={'row'}>
          <Typography variant={'h4'} fontWeight={'bold'}>Users</Typography>
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

export default Users;
