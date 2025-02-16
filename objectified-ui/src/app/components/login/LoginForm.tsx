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
import {saveSignup} from "@/app/services/signup";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginShowing, setLoginShowing] = useState(false);
  const [requestAccessShowing, setRequestAccessShowing] = useState<boolean>(false);
  const [requestShowing, setRequestShowing] = useState<boolean>(false);
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

  const completeSignup = () => {
    if (!payload.name || !payload.emailAddress || !payload.source) {
      setRequestShowing(false);
      errorDialog('Please complete the form: we need your email address, name, and your source of referral.');
      return;
    }

    setRequestShowing(true);
    saveSignup(payload)
      .then((x: any) => {
        if (!x.data) {
          errorDialog('Your signup request could not be completed: you may have already signed up, or your email address may not be valid.');
          return;
        }

        alertDialog('Thank you!  A member of the Objectified staff will reach out to you soon.');
        setRequestAccessShowing(false);
        setPayload({});
      })
      .catch((x) => {
        errorDialog('Your signup request could not be completed: you may have already signed up, or your email address may not be valid.');
      })
      .finally(() => {
        setRequestShowing(false);
      });
  }

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

      <Dialog open={requestShowing}>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Submitting request ...
            </Typography>
            <p style={{ paddingBottom: '10px' }}/>
            <LinearProgress sx={{ paddingTop: '10px' }}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog open={requestAccessShowing}>
        <DialogTitle>
          Sign Up for Early Access
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography style={{ paddingBottom: '30px' }}>
              You are signing up for early access to the Objectified Schema-as-a-Service.
              Once you sign up, we will reach out to you and let you know how to access
              the site.  <em>Thank you for your interest!</em>
            </Typography>
            <TextField type={'text'}
                       fullWidth
                       value={payload['emailAddress'] ?? ''}
                       name={'emailAddress'}
                       sx={{paddingBottom: '1em'}}
                       onChange={handleChange}
                       placeholder={'Enter your email address'}/>

            <TextField type={'text'}
                       fullWidth
                       value={payload['name'] ?? ''}
                       name={'name'}
                       sx={{paddingBottom: '1em'}}
                       onChange={handleChange}
                       placeholder={'Enter your name'}/>

            <TextField type={'text'}
                       fullWidth
                       value={payload['source'] ?? ''}
                       name={'source'}
                       sx={{paddingBottom: '1em'}}
                       onChange={handleChange}
                       placeholder={'Who referred you?'}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} onClick={() => {
            setRequestAccessShowing(false);
            setRequestShowing(false);
            setPayload({});
          }}>Cancel</Button>
          <Button variant={'contained'} onClick={() => {
            completeSignup();
          }}>Sign up</Button>
        </DialogActions>
      </Dialog>

      <div style={{
        backgroundColor: '#fff', color: '#000', width: '100%',
        border: '1px solid #000',
        padding: '20px',
        boxShadow: '6px 6px 4px #aaf',
        width: '500px'
      }}>
        <div style={{
          paddingTop: '1em', width: '100%'
        }}>
          <div style={{ backgroundColor: 'blue', color: '#fff', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
            Welcome to Objectified!
          </div>

          <Stack direction={'row'} sx={{paddingTop: '30px'}}>
            <Item sx={{width: '100%', paddingLeft: '0px', paddingRight: '0px'}}>
              <Button variant={'contained'}
                      sx={{backgroundColor: '#0f0', color: '#000', fontWeight: 'bold', padding: '14px'}}
                      fullWidth
                      onClick={() => setRequestAccessShowing(true)}
                      type={'submit'}>Request Early Access</Button>
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
        </div>
      </div>
    </>
  );
}

export default LoginForm;