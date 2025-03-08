import {IconButton, TextField, TextFieldProps} from '@mui/material';
import {PreviewOutlined, Visibility, VisibilityOff} from '@mui/icons-material';
import {useState} from 'react';

const PasswordTextField = (props: TextFieldProps) => {
  const [showing, setShowing] = useState(false);

  return (
    <TextField {...props}
               type={showing ? 'text' : 'password'}
               InputProps={{
                 // @ts-ignore
                 endAdornment: (
                   <IconButton onClick={() => setShowing(!showing)}>
                     {showing ? <Visibility/> : <VisibilityOff/>}
                   </IconButton>
                 ),
               }}/>
  );
}

export default PasswordTextField;
