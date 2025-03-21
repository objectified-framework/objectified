'use client';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  const onLogout = async () => {
    await signOut({});
  }

  return (
    <button onClick={onLogout}
            className={'text-sm uppercase border text-white px-6 py-1.5 rounded-md hover:bg-white hover:text-black duration-400'}>
      Logout
    </button>
  )
};

export default LogoutButton;
