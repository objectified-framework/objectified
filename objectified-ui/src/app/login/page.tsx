'use client';

import LoginForm from '@/app/components/login/LoginForm';
import {Stack, Typography} from "@mui/material";
import Item from "@/app/components/common/Item";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  if (!session) {
    return (
      <>
        <div style={{paddingLeft: '120px', paddingRight: '120px', width: '100%'}}>
          <div style={{paddingTop: '20px', paddingBottom: '20px', borderBottom: '1px solid #dfdfdf'}}>
            Objectified
          </div>

          <div style={{paddingTop: '40px'}}>
            <Typography variant="h4">Log in to access Objectified ObjectDB Suite</Typography>
          </div>

          <div style={{width: '100%', paddingTop: '20px'}}>
            <Stack direction={'row'}>
              <Item width={'45%'}>
                <LoginForm/>
              </Item>

              <Item width={'40%'} sx={{textAlign: 'right'}}>
                &nbsp;
              </Item>
            </Stack>
          </div>
        </div>
      </>
    );
  } else {
    router.push('/');
  }
}

export default Login;
