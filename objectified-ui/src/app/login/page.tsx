'use client';

import LoginForm from '@/app/components/login/LoginForm';
import {Stack, Typography} from "@mui/material";
import Item from "@/app/components/common/Item";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import LoginLeftSide from "@/app/components/login/LoginLeftSide";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  if (!session) {
    return (
      <>
        <div style={{ width: '100%', height: '100%', position: 'fixed', top: '0', left: '0' }}>
          <Stack direction={'row'} sx={{ height: '100%' }}>
            <div style={{ width: '50%', height: '100%', backgroundColor: '#5555d6' }}>
              <div style={{ width: '100%', paddingTop: '20px', paddingLeft: '60px', color: '#fff',
                backgroundColor: 'inherit', position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                <LoginLeftSide/>
              </div>
            </div>

            <div style={{ width: '50%', height: '100%', backgroundColor: '#223' }}>
              <div style={{ width: '100%', padding: '80px', color: '#fff',
                backgroundColor: 'inherit', position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                <LoginForm/>
              </div>
            </div>
          </Stack>
        </div>
      </>
    );
  } else {
    router.push('/');
  }
}

export default Login;
