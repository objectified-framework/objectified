'use client';

import React, {useState} from 'react';
import {
  Box, Button,
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
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

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
          <Item sx={{ width: '100%' }}>
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

            <Stack direction={'column'}>
              <Item sx={{ width: '100%', textAlign: 'center', padding: '40px 0px 0px 0px' }}>
                <Button variant={'contained'}
                        style={{ width: '100%', height: '60px', border: '1px solid #000', padding: '0px' }}
                        onClick={() => handleLogin()}>Login</Button>
              </Item>

              <Item sx={{ width: '100%', padding: '30px' }}>
                <Divider>
                  OR
                </Divider>
              </Item>
            </Stack>

            <Stack direction={'row'} sx={{ verticalAlign: 'middle' }}>
              <Item sx={{ width: '33%', paddingTop: '0px' }}>
                <Button variant={'contained'}
                        sx={{backgroundColor: '#fff', fontWeight: 'bold', color: '#000', padding: '0px', border: '1px solid #dfdfdf',
                          height: '56px',
                          '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                            border: '1px solid #000',
                          }
                        }}
                        fullWidth onClick={() => {
                          setLoginShowing(true);
                          signIn("github");
                        }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '64px',
                      height: '100%',
                      backgroundColor: '#096BDE',
                      color: 'white',
                      padding: '0px'
                    }}
                  >
                    <GitHubIcon style={{ color: 'white' }}/>
                  </Box>

                  {/* Text container - flexible width with centered text */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexGrow: 1,
                      px: 2,
                      backgroundColor: '#fff',
                      color: 'black',
                      padding: '14px'
                    }}
                  >
                    <Typography variant="button" textTransform={'none'}>
                      GitHub
                    </Typography>
                  </Box>
                </Button>
              </Item>

              <Item sx={{ width: '34%', paddingTop: '0px' }}>
                <Button variant={'contained'}
                        sx={{backgroundColor: '#fff', fontWeight: 'bold', color: '#000', padding: '0px', border: '1px solid #dfdfdf',
                          height: '56px',
                          '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                            border: '1px solid #000',
                          }
                        }}
                        fullWidth onClick={() => {
                  setLoginShowing(true);
                  signIn("gitlab");
                }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '64px',
                      height: '100%',
                      backgroundColor: '#e2432a',
                      color: 'white',
                      padding: '0px',
                      borderBottom: '1px solid #00f'
                    }}
                  >
                    <img src={'/gitlab.png'} width={24} height={24} style={{ color: 'white' }}/>
                  </Box>

                  {/* Text container - flexible width with centered text */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexGrow: 1,
                      px: 2,
                      backgroundColor: '#fff',
                      color: 'black',
                      padding: '14px'
                    }}
                  >
                    <Typography variant="button" textTransform={'none'}>
                      GitLab
                    </Typography>
                  </Box>
                </Button>
              </Item>

              <Item sx={{ width: '33%', paddingTop: '0px' }}>
                <Button variant={'contained'}
                        sx={{backgroundColor: '#fff', fontWeight: 'bold', color: '#000', padding: '0px', border: '1px solid #dfdfdf',
                          height: '56px',
                          '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                            border: '1px solid #000',
                          }
                        }}
                        fullWidth onClick={() => {
                  setLoginShowing(true);
                  signIn("gitlab");
                }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '64px',
                      height: '100%',
                      backgroundColor: '#000',
                      color: 'white',
                      padding: '0px',
                      borderBottom: '1px solid #00f'
                    }}
                  >
                    <GoogleIcon style={{ color: 'white' }}/>
                  </Box>

                  {/* Text container - flexible width with centered text */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexGrow: 1,
                      px: 2,
                      backgroundColor: '#fff',
                      color: 'black',
                      padding: '14px'
                    }}
                  >
                    <Typography variant="button" textTransform={'none'}>
                      Google
                    </Typography>
                  </Box>
                </Button>
              </Item>
            </Stack>

            <Item sx={{ width: '100%', textAlign: 'center', paddingTop: '40px', color: '#000' }}>
              Don't have an account?  <Link onClick={() => {
              setPayload({});
              setRequestAccessShowing(true);
            }}>Sign up</Link>
            </Item>
          </Item>
        </Stack>
      </div>
    </>
  );
}

export default LoginForm;