'use client';

import {useRouter} from "next/navigation";
import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import Item from "@/app/components/common/Item";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle, FormControl, IconButton,
  InputLabel, MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useState} from "react";

const DataTypes = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  }

  const clearForm = () => {
    setPayload({});
  }

  const saveClicked = () => {

  }

  return (
    <>
      <Dialog fullWidth={'md'} open={open} onClose={handleClose}>
        <DialogTitle>
          <Stack direction={'row'}>
            <div style={{ width: '50%' }}>
              New Data Type
            </div>
            <div style={{ width: '50%', textAlign: 'right' }}>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon/>
              </IconButton>
            </div>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack direction={'column'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Data Type Name'} fullWidth value={payload.name ?? ''}
                         name={'name'} onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '100%' }}>
              <TextField label={'Description'} fullWidth value={payload.description ?? ''}
                         name={'description'} onChange={handleChange} multiline rows={3}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '60%' }}>
              <TextField label={'Regex Pattern'} fullWidth value={payload.pattern ?? ''}
                         name={'pattern'} onChange={handleChange} multiline rows={4}/>
            </Item>

            <Item sx={{ width: '40%' }}>
              <Stack direction={'column'}>
                <div style={{ width: '100%' }}>
                  <FormControl fullWidth>
                    <InputLabel id={'data-type-label'}>Source</InputLabel>
                    <Select labelId={'data-type-label'} label={'Data Type'}
                            style={{ textAlign: 'left' }}
                            value={payload.data_type ?? 'STRING'} name={'data_type'}
                            onChange={handleChange} fullWidth>
                      <MenuItem value={'STRING'}>String</MenuItem>
                      <MenuItem value={'INT32'}>32-Bit Integer</MenuItem>
                      <MenuItem value={'INT64'}>64-Bit Integer</MenuItem>
                      <MenuItem value={'FLOAT'}>Floating Point</MenuItem>
                      <MenuItem value={'DOUBLE'}>Double Precision</MenuItem>
                      <MenuItem value={'BOOLEAN'}>Boolean</MenuItem>
                      <MenuItem value={'DATE'}>Date</MenuItem>
                      <MenuItem value={'DATE_TIME'}>Date and Time</MenuItem>
                      <MenuItem value={'URI'}>URI</MenuItem>
                      <MenuItem value={'BYTE'}>Byte</MenuItem>
                      <MenuItem value={'BINARY'}>Binary</MenuItem>
                      <MenuItem value={'PASSWORD'}>Password</MenuItem>
                      <MenuItem value={'OBJECT'}>Complex Object</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div style={{ width: '100%', textAlign: 'left', paddingTop: '10px' }}>
                  <Button variant={'contained'}>Test Regex</Button>
                </div>
              </Stack>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%', textAlign: 'right' }}>
              <Button variant={'contained'} color={'error'} onClick={() => clearForm()}>Clear Form</Button>
              &nbsp;
              <Button variant={'contained'} onClick={() => saveClicked()}>Save</Button>
            </Item>
          </Stack>
        </DialogContent>
      </Dialog>

      <div style={{width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px'}}>
        <Stack direction={'row'}>
          <Item sx={{width: '50%', textAlign: 'left', backgroundColor: 'inherit', padding: '0px'}}>
            <Typography sx={{ color: '#fff' }} variant={'h4'} fontWeight={'bold'}>Data Types</Typography>
          </Item>

          <Item sx={{width: '50%', textAlign: 'right', backgroundColor: 'inherit', padding: '0px'}}>
            <Button sx={{color: '#fff'}} onClick={() => setOpen(true)}>
              <AddOutlined/>
            </Button>
          </Item>
        </Stack>
      </div>
    </>
  );
}

export default DataTypes;
