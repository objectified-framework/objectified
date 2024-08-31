'use client';

import React, {useRef, useState} from 'react';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText, DialogTitle, FormControl, InputLabel,
  LinearProgress, Link, MenuItem, Select,
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
import {FacebookOutlined, Microsoft, X} from "@mui/icons-material";

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

      <form onSubmit={handleSubmit}>
        <Stack direction={'column'}>
          <Typography sx={{color: '#fff', fontWeight: 'bold'}} variant={'h4'}>Sign In</Typography>

          <Typography sx={{color: '#999'}}>New user? <Link href={'#'}>Create an Account</Link></Typography>

          <div sx={{height: '10px'}}>&nbsp;</div>
          <div sx={{height: '10px'}}>&nbsp;</div>

          <TextField type={'text'} fullWidth value={email} onChange={handleEmailChange}
                     inputProps={{style: {color: '#fff'}}}
                     sx={{border: '1px solid #fff'}}
                     placeholder={'Enter your email address'}/>

          <div sx={{height: '10px'}}>&nbsp;</div>

          <PasswordTextField fullWidth value={password} onChange={handlePasswordChange}
                             inputProps={{style: {color: '#fff'}}}
                             sx={{border: '1px solid #fff', color: '#fff'}}
                             placeholder={'Enter your password'}/>
        </Stack>

        <Stack direction={'row'} sx={{paddingTop: '40px'}}>
          <Item sx={{width: '100%', paddingLeft: '0px', paddingRight: '0px', backgroundColor: 'inherit'}}>
            <Button variant={'contained'}
                    sx={{backgroundColor: '#66f', fontWeight: 'bold', borderRadius: '10px'}}
                    fullWidth
                    type={'submit'}>Log in</Button>
          </Item>
        </Stack>

        <div sx={{height: '10px'}}>&nbsp;</div>

        <Divider sx={{ color: '#ccc', '&.MuiDivider-root': {
            '&::before': {
              borderTop: `thin solid #aaf`
            },
            '&::after': {
              borderTop: `thin solid #aaf`
            },
          } }} variant={'middle'}>
          OR
        </Divider>

        <div sx={{height: '10px'}}>&nbsp;</div>

        <div style={{ width: '100%', textAlign: 'center' }}>
          <Button variant={'contained'}
                  sx={{
                    backgroundColor: 'inherit', fontWeight: 'bold', color: '#fff', padding: '20px',
                    border: '1px solid #dfdfdf', borderRadius: '10px', width: '36px', height: '60px',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#000',
                      border: '1px solid #000',
                    }
                  }}
                  fullWidth onClick={() => {
            setLoginShowing(true);
            signIn("google");
          }}><GoogleIcon/></Button>

          &nbsp;&nbsp;

          <Button variant={'contained'}
                  sx={{
                    backgroundColor: 'inherit', fontWeight: 'bold', color: '#fff', padding: '10px',
                    border: '1px solid #dfdfdf', borderRadius: '10px', width: '36px', height: '60px',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#000',
                      border: '1px solid #000',
                    }
                  }}
                  fullWidth onClick={() => {
            setLoginShowing(true);
            signIn("github");
          }}><GitHubIcon/></Button>

          &nbsp;&nbsp;

          <Button variant={'contained'}
                  sx={{
                    backgroundColor: 'inherit', fontWeight: 'bold', color: '#fff', padding: '10px',
                    border: '1px solid #dfdfdf', borderRadius: '10px', width: '36px', height: '60px',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#000',
                      border: '1px solid #000',
                    }
                  }}
                  fullWidth onClick={() => {}}><FacebookOutlined/></Button>

          &nbsp;&nbsp;

          <Button variant={'contained'}
                  sx={{
                    backgroundColor: 'inherit', fontWeight: 'bold', color: '#fff', padding: '10px',
                    border: '1px solid #dfdfdf', borderRadius: '10px', width: '36px', height: '60px',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#000',
                      border: '1px solid #000',
                    }
                  }}
                  fullWidth onClick={() => {}}><Microsoft/></Button>

          &nbsp;&nbsp;

          <Button variant={'contained'}
                  sx={{
                    backgroundColor: 'inherit', fontWeight: 'bold', color: '#fff', padding: '10px',
                    border: '1px solid #dfdfdf', borderRadius: '10px', width: '36px', height: '60px',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#000',
                      border: '1px solid #000',
                    }
                  }}
                  fullWidth onClick={() => {}}><X/></Button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;