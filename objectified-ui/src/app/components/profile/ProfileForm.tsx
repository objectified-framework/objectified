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
import { UserPutUser } from '@objectified-framework/objectified-services/dist/generated/clients';
import {putUser} from "@/app/services/user";
import {errorDialog} from "@/app/components/common/ConfirmDialog";

export interface IProfileForm {
  onClose: () => any;
}

export const ProfileForm = (props: IProfileForm) => {
  const [payload, setPayload] = useState<any>({});
  const [savingShowing, setSavingShowing] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleChange = (e: any) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  }

  const clearForm = () => {
    setPayload({});
  }

  const saveClicked = async () => {
    setSavingShowing(true);

    console.log('Service URL', process.env.SERVICE_URL);

    await putUser(session.objectified.id, payload)
      .then((x) => {
        session.objectified.data = payload;
        setSavingShowing(false);
      }).catch((x) => {
        errorDialog(`Failed to save your profile: ${x}`);
      }).finally(() => {
        props.onClose();
      });
  }

  useEffect(() => {
    let currentData = session.objectified.data;
    const currentUser = session.user;

    if (!currentData) {
      currentData = {};
      currentData.name = currentUser.name;
      currentData.email = currentUser.email;
    }

    console.log(currentData);
    setPayload(currentData);
  }, []);

  return (
    <>
      <Dialog open={savingShowing}>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Saving your profile ...
            </Typography>
            <p style={{ paddingBottom: '10px' }}/>
            <LinearProgress sx={{ paddingTop: '10px' }}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <div style={{backgroundColor: 'blue', color: '#fff', padding: '10px', textAlign: 'center', fontWeight: 'bold'}}>
        Your Objectified Profile (Remember, it's a beta)
      </div>

      <Stack direction={'column'}>
        <Item sx={{width: '100%', textAlign: 'left' }}>
          <Typography>
            Your Objectified ID: {session.objectified.id}
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
      </Stack>

      <Stack direction={'row'}>
        <Item sx={{width: '35%', textAlign: 'left'}}>
          <Button variant={'contained'} color={'error'} onClick={() => clearForm()}>Clear Form</Button>
        </Item>

        <Item sx={{width: '65%', textAlign: 'right'}}>
          <Button variant={'contained'} onClick={() => saveClicked()}>Save</Button>
          &nbsp;
          <Button variant={'contained'} color={'error'} onClick={() => props.onClose()}>Cancel</Button>
        </Item>
      </Stack>
    </>
  );
}

export default ProfileForm;