'use client';

import PasswordTextField from "@/app/components/common/PasswordTextField";
import Item from "@/app/components/common/Item";
import {useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography} from "@mui/material";

const SignupForm = () => {
  const [payload, setPayload] = useState<any>({});

  const handleChange = (e: any) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  }

  const clearForm = () => {
    setPayload({});
  }

  return (
    <>
      <div style={{
        backgroundColor: '#fff', color: '#000', width: '100%',
        border: '1px solid #000',
        padding: '20px'
      }}>
        <div style={{
          paddingTop: '1em', width: '100%'
        }}>
          <div
            style={{backgroundColor: 'blue', color: '#fff', padding: '10px', textAlign: 'center', fontWeight: 'bold'}}>
            Complete Your Registration
          </div>

          <Stack direction={'column'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Your Full Name'} fullWidth value={payload.name ?? ''}
                         name={'name'} onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '100%' }}>
              <TextField label={'Group Invite Code'} fullWidth value={payload.description ?? ''}
                         name={'groupInviteCode'} onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'} sx={{paddingTop: '40px'}}>
            <Item sx={{width: '100%', paddingLeft: '0px', paddingRight: '0px'}}>
              <Button variant={'contained'}
                      sx={{backgroundColor: '#66f', fontWeight: 'bold'}}
                      fullWidth
                      type={'submit'}>Save</Button>
            </Item>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
