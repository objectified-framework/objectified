import {useState} from "react";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Item from "@/app/components/common/Item";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle, FormControl, FormControlLabel, IconButton,
  InputLabel, MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

export interface IAutoForm {
  header: string;
  formElements: any[];
  onAdd: (data: any) => any;
  onCancel: () => any;
}

export const AutoForm = (props: IAutoForm) => {
  const [payload, setPayload] = useState<any>({});

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
    const preparedPayload = {};

    props.onAdd(preparedPayload);
  }

  const generateFormElement = (element: any) => {
    const name = element.name;
    const description = element.description;
    const type = element.type ?? 'textfield';

    if (type === 'textfield') {
      return (
        <>
          <Stack direction={'column'}>
            <Item sx={{width: '100%'}}>
              <TextField label={description}
                         fullWidth
                         value={payload[name] ?? ''}
                         name={name}
                         onChange={handleChange}/>
            </Item>
          </Stack>
        </>
      );
    } else if (type === 'enum') {
      const labelName = `${name}-label`;

      return (
        <Stack direction={'column'}>
          <Item sx={{width: '100%'}}>
            <FormControl fullWidth>
              <InputLabel id={labelName}>{description}</InputLabel>
              <Select labelId={labelName}
                      label={description}
                      style={{ textAlign: 'left' }}
                      value={payload[name] ?? 'STRING'}
                      name={name}
                      onChange={handleChange}
                      fullWidth>
                {element.options.map((x) => (
                  <MenuItem value={x}>{x}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
        </Stack>
      )
    } else if (type === 'check') {
      return (
        <Stack direction={'column'}>
          <Item sx={{ width: '100%', textAlign: 'left' }}>
            <FormControlLabel control={<Checkbox
              name={name}
              onChange={handleChange}
              checked={payload[name] ?? false}
            />} label={description} />
          </Item>
        </Stack>
      )
    } else if (type === 'array') {
      return (
        <>
          <Stack direction={'column'}>
            <Item sx={{width: '100%'}}>
              <TextField label={description}
                         fullWidth
                         value={payload[name] ?? ''}
                         name={name}
                         onChange={handleChange}
                         multiline
                         rows={3}/>
            </Item>
          </Stack>
        </>
      );
    }

    return (
      <>
        Unknown type {type}
      </>
    );
  }

  return (
    <>
      <DialogTitle>
        <Stack direction={'row'}>
          <div style={{ width: '50%' }}>
            {props.header}
          </div>
          <div style={{ width: '50%', textAlign: 'right' }}>
            <IconButton onClick={() => props.onCancel()}>
              <CloseIcon/>
            </IconButton>
          </div>
        </Stack>

        {props.formElements.map(x => generateFormElement(x))}

        <Stack direction={'row'}>
          <Item sx={{ width: '100%', textAlign: 'right' }}>
            <Button variant={'contained'} color={'error'} onClick={() => clearForm()}>Clear Form</Button>
            &nbsp;
            <Button variant={'contained'} onClick={() => saveClicked()}>Save</Button>
          </Item>
        </Stack>
      </DialogTitle>
    </>
  );
}

export default AutoForm;