'use client';

import React, {useRef, useState} from 'react';
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
import Item from '@/app/components/common/Item';
import PasswordTextField from '@/app/components/common/PasswordTextField';
import {alertDialog, errorDialog} from '@/app/components/common/ConfirmDialog';
import {useRouter} from 'next/navigation';
import {signIn, signOut, useSession} from "next-auth/react";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import Divider from "@mui/material/Divider";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginShowing, setLoginShowing] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const router = useRouter();

  const handleSubmit = (async (e: any) => {
    e.preventDefault();

    if (!email) {
      errorDialog('E-Mail Address cannot be blank.');
      return;
    }

    if (!password) {
      errorDialog('Password cannot be blank.');
      return;
    }

    if (email.indexOf('@') === -1) {
      errorDialog('Your E-Mail address is malformed.');
      return;
    }

    setLoginShowing(true);
    signIn('credentials', {
      email,
      password,
      redirect: false,
    })
      .then((res: any) => {
        if (res?.error) {
          clearInputs();
          setLoginShowing(false);
          alertDialog('Failed to login - please check your e-mail or password');
        } else {
          clearInputs();
          setLoginShowing(false);
          router.push('/');
        }
      })
      .catch((e) => {
        setLoginShowing(false);
        console.error(e);
      });
  });

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const handleChange = (e: any) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  }

  const handleEmailChange = ((e: any) => setEmail(e.target.value));
  const handlePasswordChange = ((e: any) => setPassword(e.target.value));

  return (
    <>
      <Dialog open={loginShowing}>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Stand by, logging you in.
            </Typography>
            <p style={{ paddingBottom: '10px' }}/>
            <LinearProgress sx={{ paddingTop: '10px' }}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <div style={{
        backgroundColor: '#fff', color: '#000', width: '100%',
        border: '1px solid #000',
        padding: '20px',
        boxShadow: '6px 6px 4px #aaf',
      }}>
        <div style={{
          paddingTop: '1em', width: '100%'
        }}>
          <div style={{ backgroundColor: 'blue', color: '#fff', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
            Welcome to Objectified
          </div>

          <div style={{ padding: '15px' }}></div>

          <form onSubmit={handleSubmit}>
            <TextField type={'text'} fullWidth value={email} sx={{paddingBottom: '1em'}} onChange={handleEmailChange}
                       placeholder={'Enter your email address'}/>
            <PasswordTextField fullWidth value={password} onChange={handlePasswordChange}
                               placeholder={'Enter your password'}/>

            <Stack direction={'row'} sx={{paddingTop: '20px'}}>
              <Item sx={{width: '100%', paddingLeft: '0px', paddingRight: '0px'}}>
                <Button variant={'contained'}
                        sx={{backgroundColor: '#66f', fontWeight: 'bold'}}
                        fullWidth
                        disabled={true}
                        type={'submit'}>Request Early Access</Button>
              </Item>
            </Stack>

            <Stack direction={'row'}>
              <Item sx={{width: '100%', paddingLeft: '0px', paddingRight: '0px'}}>
                <Button variant={'contained'}
                        sx={{backgroundColor: '#66f', fontWeight: 'bold'}}
                        fullWidth
                        disabled={true}
                        type={'submit'}>Log in</Button>
              </Item>
            </Stack>

            <div style={{width: '100%', textAlign: 'center', fontWeight: 'bold', paddingTop: '1em'}}>
              <Divider>
                or log in with
              </Divider>
            </div>

            <Stack direction={'row'} sx={{paddingTop: '20px'}}>
              <Item sx={{width: '50%'}}>
                <Button variant={'contained'}
                        sx={{backgroundColor: '#fff', fontWeight: 'bold', color: '#000', padding: '14px', border: '1px solid #dfdfdf',
                        '&:hover': {
                          backgroundColor: '#fff',
                          color: '#000',
                          border: '1px solid #000',
                        }
                        }}
                        fullWidth onClick={() => {
                          setLoginShowing(true);
                          signIn("google");
                        }}
                        startIcon={<img src={'/g-logo.png'} width={24} height={24}/>}></Button>
              </Item>

              <Item sx={{width: '50%', paddingLeft: '20px'}}>
                <Button variant={'contained'}
                        sx={{backgroundColor: '#fff', fontWeight: 'bold', color: '#000', padding: '14px', border: '1px solid #dfdfdf',
                          '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                            border: '1px solid #000',
                          }
                        }}
                        fullWidth onClick={() => {
                          setLoginShowing(true);
                          signIn("github");
                        }}
                        startIcon={<img src={'/github-mark.png'} width={24} height={24}/>}></Button>
              </Item>
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;