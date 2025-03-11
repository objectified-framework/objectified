'use client';

import React, {useState} from 'react';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText, DialogTitle,
  LinearProgress, Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Item from '@/app/components/common/Item';
import PasswordTextField from '@/app/components/common/PasswordTextField';
import {alertDialog, errorDialog} from '@/app/components/common/ConfirmDialog';
import {useRouter} from 'next/navigation';
import {signIn} from "next-auth/react";
import Divider from "@mui/material/Divider";
import {saveSignup} from "@/app/services/signup";

const LoginForm = () => {
  const [loginShowing, setLoginShowing] = useState(false);
  const [requestAccessShowing, setRequestAccessShowing] = useState<boolean>(false);
  const [requestShowing, setRequestShowing] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>({});
  const router = useRouter();

  const handleLogin = (async () => {
    const emailAddress = payload['emailAddress'];
    const password = payload['password'];

    if (!emailAddress) {
      errorDialog('E-Mail Address cannot be blank.');
      return;
    }

    if (!password) {
      errorDialog('Password cannot be blank.');
      return;
    }

    if (emailAddress.indexOf('@') === -1) {
      errorDialog('Your E-Mail address is malformed.');
      return;
    }

    setLoginShowing(true);

    signIn('credentials', {
      emailAddress,
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
    setPayload({});
  }

  const handleChange = (e: any) => {
    console.log('Handling change', e.target.name, e.target.value);
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
        console.log(x);
        if (x !== true) {
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

  // @ts-ignore
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
          <Button variant={'contained'} color={'error'} onClick={() => {
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
        backgroundColor: '#fff', color: '#000',
        padding: '20px',
        width: '100%'
      }}>
        <div style={{ width: '100%', textAlign: 'center', paddingBottom: '40px' }}>
          <img src={'/Objectified-02.png'} style={{ width: 300, display: 'block', margin: '0 auto' }}
          alt={'Objectified Glyph'}/>
        </div>

        <Stack direction={'row'}>
          <Item sx={{ width: '45%' }}>
            <Stack direction={'column'}>
              <Item sx={{ width: '100%', padding: '0px' }}>
                <TextField type={'text'}
                           fullWidth
                           value={payload['emailAddress'] ?? ''}
                           name={'emailAddress'}
                           sx={{paddingBottom: '1em'}}
                           onChange={handleChange}
                           placeholder={'Enter your email address'}/>
              </Item>

              <Item sx={{ width: '100%', padding: '0px' }}>
                <PasswordTextField type={'text'}
                           fullWidth
                           value={payload['password'] ?? ''}
                           name={'password'}
                           sx={{paddingBottom: '1em'}}
                           onChange={handleChange}
                           placeholder={'Enter your password'}/>
              </Item>
            </Stack>

            <Stack direction={'row'}>
              <Item sx={{ width: '100%', textAlign: 'center', padding: '40px 0px 0px 0px' }}>
                <Button variant={'contained'}
                        style={{ width: '100%', height: '60px', border: '1px solid #000', padding: '0px' }}
                        onClick={() => handleLogin()}>Login</Button>
              </Item>
            </Stack>
          </Item>

          <Item sx={{ width: '10%' }}>
            <Divider variant={'middle'} orientation={'vertical'}>
              OR
            </Divider>
          </Item>

          <Item sx={{ width: '45%' }}>
            <Stack direction={'column'} sx={{ verticalAlign: 'middle' }}>
              <Item sx={{ width: '100%', paddingLeft: '0px', paddingRight: '0px' }}>
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
                        startIcon={<img src={'/github-mark.png'} width={24} height={24}/>}>
                  <Typography textTransform={'none'}>Sign in with GitHub</Typography>
                </Button>
              </Item>
            </Stack>
          </Item>
        </Stack>

        <Item sx={{ width: '100%', textAlign: 'center', paddingTop: '40px', color: '#000' }}>
          Don't have an account?  <Link onClick={() => {
          setPayload({});
          setRequestAccessShowing(true);
        }}>Sign up</Link>
        </Item>
      </div>
    </>
  );
}

export default LoginForm;