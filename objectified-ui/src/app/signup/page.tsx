'use client';

import PasswordTextField from "@/app/components/common/PasswordTextField";
import Item from "@/app/components/common/Item";
import LoginForm from "@/app/components/login/LoginForm";
import SignupForm from "@/app/components/signup/SignupForm";

const Signup = () => {
  return (
    <>
      <div style={{margin: '0', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        <SignupForm/>
      </div>
    </>
  );
}

export default Signup;
