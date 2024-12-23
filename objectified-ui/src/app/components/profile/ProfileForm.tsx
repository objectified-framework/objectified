import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText, DialogTitle, FormControl, InputLabel,
  LinearProgress, MenuItem, Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {useState, useEffect} from "react";
import Item from "@/app/components/common/Item";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import {useSession, getCsrfToken} from "next-auth/react";

export interface IProfileForm {
  onClose: () => any;
}

export const ProfileForm = (props: IProfileForm) => {
  const [payload, setPayload] = useState<any>({});
  const { data: session } = useSession();

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
    props.onClose();
  }

  useEffect(() => {
    let currentData = session.objectified.data;
    const currentUser = session.user;

    if (!currentData) {
      currentData = {};
      currentData.name = currentUser.name;
      currentData.email = currentUser.email;
    }

    console.log(currentData);
    setPayload(currentData);
  }, []);

  return (
    <>
      <div style={{backgroundColor: 'blue', color: '#fff', padding: '10px', textAlign: 'center', fontWeight: 'bold'}}>
        Your Objectified Profile
      </div>

      <Stack direction={'column'}>
        <Item sx={{width: '100%', textAlign: 'left' }}>
          <Typography>
            Your Objectified ID: {session.objectified.id}
          </Typography>
        </Item>

        <Item sx={{width: '100%'}}>
          <TextField label={'Your Name'} fullWidth value={payload.name ?? ''}
                     name={'name'} onChange={handleChange}/>
        </Item>

        <Item sx={{width: '100%'}}>
          <TextField label={'Your E-Mail Address'} fullWidth value={payload.email ?? ''}
                     name={'email'} onChange={handleChange}/>
        </Item>
      </Stack>

      <Stack direction={'row'}>
        <Item sx={{width: '35%', textAlign: 'left'}}>
          <Button variant={'contained'} color={'error'} onClick={() => clearForm()}>Clear Form</Button>
        </Item>

        <Item sx={{width: '65%', textAlign: 'right'}}>
          <Button variant={'contained'} onClick={() => saveClicked()}>Save</Button>
          &nbsp;
          <Button variant={'contained'} color={'error'} onClick={() => props.onClose()}>Cancel</Button>
        </Item>
      </Stack>
    </>
  );
}

export default ProfileForm;