'use client';

import {
  Typography,
  Divider,
  Button,
} from "@mui/material";
import LoginForm from '@/app/components/login/LoginForm';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {VERSION} from "@/middleware";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log('[Login] Session', session);

  if (!session) {
    return (
      <>
          <div style={{
            width: '50%',
            position: 'absolute',
            left: '0px',
            height: '100%',
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              padding: '20px'
            }}>
              <LoginForm/>
            </div>
          </div>
          <div style={{
            backgroundImage: 'linear-gradient(to right, white, blue)',
            position: 'absolute',
            right: '0px',
            height: '100%',
            width: '50%' }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              padding: '20px',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: '20px' }}>
                <Button style={{ width: '50%' }}
                        sx={{backgroundColor: '#ccf', fontWeight: 'bold', color: '#000', padding: '14px', border: '1px solid #dfdfdf',
                          '&:hover': {
                            backgroundColor: '#99f',
                            color: '#000',
                            border: '1px solid #000',
                          }
                        }}
                        variant={'contained'}
                        onClick={() => { window.open('https://www.objectified.dev/', '_none') }}>
                  <Typography textTransform={'none'}>
                    About the Platform
                  </Typography>
                </Button>
                <br/><br/>
                <Button style={{ width: '50%' }}
                        sx={{backgroundColor: '#ccf', fontWeight: 'bold', color: '#000', padding: '14px', border: '1px solid #dfdfdf',
                          '&:hover': {
                            backgroundColor: '#99f',
                            color: '#000',
                            border: '1px solid #000',
                          }
                        }}
                        variant={'contained'}
                        onClick={() => { window.open('https://github.com/objectified-framework/', '_none') }}>
                  <Typography textTransform={'none'}>
                    GitHub Repository
                  </Typography>
                </Button>
                <br/><br/>
                <Button style={{ width: '50%' }}
                        sx={{backgroundColor: '#ccf', fontWeight: 'bold', color: '#000', padding: '14px', border: '1px solid #dfdfdf',
                          '&:hover': {
                            backgroundColor: '#99f',
                            color: '#000',
                            border: '1px solid #000',
                          }
                        }}
                        variant={'contained'}
                        onClick={() => { window.open('https://docs.objectified.dev/docs/intro', '_none') }}>
                  <Typography textTransform={'none'}>
                    Support
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
      </>
    );
  } else {
    router.push('/');
  }
}

export default Login;
