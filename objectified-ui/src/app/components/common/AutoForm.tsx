import {useState, useEffect} from "react";
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
import {errorDialog} from "@/app/components/common/ConfirmDialog";

export interface IAutoForm {
  header: string;
  formElements: any[];
  onAdd: (data: any) => any;
  onCancel: () => any;
}

export const AutoForm = (props: IAutoForm) => {
  const [payload, setPayload] = useState<any>({});

  const handleChange = (e: any) => {
    if (e.target.type === 'checkbox') {
      setPayload({
        ...payload,
        [e.target.name]: e.target.checked,
      });
    } else {
      setPayload({
        ...payload,
        [e.target.name]: e.target.value,
      });
    }
  }

  const clearForm = () => {
    const clearPayload: any = {};

    props.formElements.forEach((x) => {
      const name = x.name;
      const type = x.type;
      const options = x.options;

      if (type === 'enum') {
        clearPayload[name] = options[0];
      }
    });

    setPayload(clearPayload);
  }

  useEffect(() => {
    clearForm();
  }, []);

  const saveClicked = () => {
    let required = false;
    const requiredFields: string[] = [];

    props.formElements.forEach((x) => {
      const formName = x.name;
      const formRequired = x.required;

      if (x.required) {
        if (!payload[formName]) {
          required = true;
          requiredFields.push(formName);
        }
      }
    });

    if (required) {
      errorDialog(`One or more required fields are missing: ${requiredFields.join(', ')}`);
    } else {
      const modifiedPayload: any = {};

      props.formElements.forEach((x) => {
        const formName = x.name;
        const formType = x.type;

        if (formType === 'array') {
          if (payload[formName]) {
            modifiedPayload[formName] = payload[formName].split(',');
          }
        } else {
          modifiedPayload[formName] = payload[formName];
        }
      })

      props.onAdd(modifiedPayload);
    }
  }

  const generateFormElement = (element: any) => {
    const name = element.name;
    const description = element.description;
    const type = element.type ?? 'textfield';
    const required = element.required ?? false;

    if (type === 'textfield') {
      return (
        <>
          <Stack direction={'column'}>
            <Item sx={{width: '100%'}}>
              <TextField label={description}
                         fullWidth
                         value={payload[name] ?? ''}
                         name={name}
                         required={required}
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
            <FormControl
              required={required}
              fullWidth>
              <InputLabel id={labelName}>{description}</InputLabel>
              <Select labelId={labelName}
                      label={description}
                      style={{ textAlign: 'left' }}
                      value={payload[name] ?? 'STRING'}
                      name={name}
                      required={required}
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
              required={required}
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
                         required={required}
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
