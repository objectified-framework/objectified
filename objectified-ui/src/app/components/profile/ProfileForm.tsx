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
import {useState, useEffect} from "react";
import Item from "@/app/components/common/Item";
import {useSession} from "next-auth/react";
import {putPassword, putUser} from "@/app/services/user";
import {alertDialog, errorDialog} from "@/app/components/common/ConfirmDialog";
import PasswordTextField from "@/app/components/common/PasswordTextField";

export interface IProfileForm {
  onClose: () => any;
}

export const ProfileForm = (props: IProfileForm) => {
  const [payload, setPayload] = useState<any>({});
  const [passwordPayload, setPasswordPayload] = useState<any>({});
  const [savingShowing, setSavingShowing] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleChange = (e: any) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  }

  const handleChangePassword = (e: any) => {
    setPasswordPayload({
      ...passwordPayload,
      [e.target.name]: e.target.value,
    });
  }

  const saveClicked = async () => {
    setSavingShowing(true);

    await putUser((session as any).objectified.id, payload)
      .then((x) => {
        (session as any).objectified.data = payload;
        setSavingShowing(false);
      }).catch((x) => {
        errorDialog(`Failed to save your profile: ${x}`);
      }).finally(() => {
        props.onClose();
      });
  }

  const savePasswordClicked = async () => {
    setSavingShowing(true);

    try {
      await putPassword((session as any).objectified.id, passwordPayload)
        .then((x: any) => {
          if (x.response?.status && x.response.status > 200) {
            errorDialog('Failed to change your password.  Check your credentials and try again.');
            setPasswordPayload({});
            return;
          }

          alertDialog('Your password has been changed.');

          props.onClose();
        }).catch((x) => {
          errorDialog(`Failed to change your password: ${x}`);
        }).finally(() => {
          setSavingShowing(false);
        });
    } catch(e) {
      errorDialog(`Failed to change your password: ${e}`);
    }
  }

  useEffect(() => {
    let currentData = (session as any).objectified.data;
    const currentUser = (session as any).user;

    if (!currentData) {
      currentData = {};
      currentData.name = currentUser.name;
      currentData.email = currentUser.email;
    }

    setPasswordPayload({});

    console.log(currentData);
    setPayload(currentData);
  }, []);

  return (
    <>
      <Dialog open={savingShowing}>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Saving, one moment ...
            </Typography>
            <p style={{ paddingBottom: '10px' }}/>
            <LinearProgress sx={{ paddingTop: '10px' }}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Stack direction={'row'}>
        <div style={{ width: '50%', borderRight: '1px solid #ccc' }}>
          <Stack direction={'column'}>
            <Item sx={{width: '100%', textAlign: 'left' }}>
              <Typography className={ 'text-xs font-thin' }>
                Change Profile ({(session as any).objectified.id.substring(0, 8)}...)
              </Typography>
            </Item>

            <Item sx={{width: '100%'}}>
              <TextField label={'Your Name'} fullWidth value={payload.name ?? ''}
                         name={'name'} onChange={handleChange}/>
            </Item>

            <Item sx={{width: '100%'}}>
              <TextField label={'Your E-Mail Address'} fullWidth value={payload.email ?? ''}
                         name={'email'} onChange={handleChange}/>
            </Item>

            <Item sx={{width: '100%', textAlign: 'left'}}>
              <Button variant={'contained'} onClick={() => saveClicked()}>Save</Button>
              &nbsp;
              <Button variant={'contained'} color={'error'} onClick={() => props.onClose()}>Cancel</Button>
            </Item>
          </Stack>
        </div>

        <div style={{ width: '50%' }}>
          <Stack direction={'column'}>
            <Item sx={{width: '100%', textAlign: 'left' }}>
              <Typography className={ 'text-xs font-thin' }>
                Change Password
              </Typography>
            </Item>

            <Item sx={{width: '100%'}}>
              <PasswordTextField label={'Current'} fullWidth value={passwordPayload.currentPassword ?? ''}
                         name={'currentPassword'} onChange={handleChangePassword}/>
            </Item>

            <Stack direction={'row'}>
              <Item sx={{width: '50%'}}>
                <PasswordTextField label={'New'} fullWidth value={passwordPayload.password1 ?? ''}
                           name={'password1'} onChange={handleChangePassword}/>
              </Item>

              <Item sx={{width: '50%'}}>
                <PasswordTextField label={'New (again)'} fullWidth value={passwordPayload.password2 ?? ''}
                           name={'password2'} onChange={handleChangePassword}/>
              </Item>
            </Stack>

            <Item sx={{width: '100%', textAlign: 'right' }}>
              <Button variant={'contained'}
                      disabled={!passwordPayload.currentPassword ||
                        (passwordPayload.password1 != passwordPayload.password2) ||
                        !passwordPayload.password1 || !passwordPayload.password2 ||
                        (passwordPayload.password1 == passwordPayload.currentPassword) ||
                        (passwordPayload.password2 == passwordPayload.currentPassword)}
                      onClick={() => savePasswordClicked()}>Change Password</Button>
            </Item>
          </Stack>
        </div>
      </Stack>
    </>
  );
}

export default ProfileForm;