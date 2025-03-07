'use client';

import {
  Link,
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
        <div style={{ margin: '0',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%'
        }}>
          <LoginForm/>
        </div>
        <div style={{ position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '32px',
          borderBottom: '1px solid #000',
          padding: '4px',
        }}>
          <Link
            href={'https://www.objectified.dev/'}>
            About
          </Link> | <Link
          href={'https://github.com/objectified-framework'}>
            GitHub Repository
          </Link>
        </div>
      </>
    );
  } else {
    router.push('/');
  }
}

export default Login;
