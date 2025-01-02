import {useState, useEffect} from "react";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Item from "@/app/components/common/Item";
import {
  Autocomplete,
  Button,
  Checkbox,
  DialogTitle, FormControl, FormControlLabel, IconButton,
  InputLabel, MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import {errorDialog} from "@/app/components/common/ConfirmDialog";

export interface IAutoForm {
  header: string;
  formElements: any[];
  editPayload: any;
  onSave: (data: any) => any;
  onCancel: () => any;
}

/**
 * Converts a string from anyAlternateCase to snake_case.
 *
 * @param str {string} to convert.
 * @returns snake_cased string.
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export const AutoForm = (props: IAutoForm) => {
  const [payload, setPayload] = useState<any>({});

  /**
   * Handles the change of the form when a value of an input box or a checkbox changes.
   */
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

  /**
   * Clears the form by clearing the payload, and resetting any enumeration values to their default (first)
   * values.
   */
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

  /**
   * This is called when the function first initializes.  If the form is opened without being edited, the
   * form is cleared.  This is the default action when the form initializes.
   */
  useEffect(() => {
    clearForm();
  }, []);

  /**
   * This effect is only called when an edit action is performed, meaning the edit payload is populated.  This
   * function will always get called, but will only affect the payload if an edit payload exists.
   */
  useEffect(() => {
    if (props.editPayload && Object.keys(props.editPayload).length > 0) {
      setPayload(props.editPayload);
    }
  }, [props.editPayload]);

  /**
   * When "save" is clicked, this function is called.  Any elements that are required will be checked here,
   * and will prevent a save from occurring if a required field contains no data.  Additionally,
   * any entries that contain "array" as a type will be converted into an array of strings or other
   * values when separated by a ",".
   */
  const saveClicked = () => {
    let required = false;
    const requiredFields: string[] = [];

    /**
     * Gather a list of elements that are required, and have not been assigned values here.
     */
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

    /**
     * If the required fields are missing values, display them here in an error.  Otherwise, parse
     * the array values, split them into separate values, and call "onSave" with the modified
     * payload.
     */
    if (required) {
      errorDialog(`One or more required fields are missing: ${requiredFields.join(', ')}`);
    } else {
      const modifiedPayload: any = payload;

      props.formElements.forEach((x) => {
        const formName = x.name;
        const formType = x.type;

        if (formType === 'array') {
          if (payload[formName]) {
            modifiedPayload[formName] = payload[formName].split(',').map((x) => x.trim());
          }
        } else {
          modifiedPayload[formName] = payload[formName];
        }
      });

      props.onSave(modifiedPayload);
    }
  }

  /**
   * Generates a single element from the element properties defined for the form generator from the
   * props.formElements property.
   */
  const generateFormElement = (element: any) => {
    const name = element.name;
    const description = element.description;
    const type = element.type ?? 'textfield';
    const required = element.required ?? false;

    /**
     * Text fields are handled here.  Text fields are single lines of text that can be edited.
     */
    if (type === 'textfield') {
      return (
        <>
          <Stack direction={'column'}>
            <Item sx={{width: '100%'}}>
              <TextField label={`${description} (${name})`}
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
      /**
       * Enumerations are handled here as separate FormControl items.  The list is parsed, and presented
       * one-at-a-time in the dropdown select box.
       */

      const labelName = `${name}-label`;

      return (
        <Stack direction={'column'}>
          <Item sx={{width: '100%'}}>
            <FormControl
              required={required}
              fullWidth>
              <InputLabel id={labelName}>{description} ({name})</InputLabel>
              <Select labelId={labelName}
                      label={`${description} (${name})`}
                      style={{ textAlign: 'left' }}
                      value={payload[name] ?? element.options[0]}
                      name={name}
                      required={required}
                      onChange={handleChange}
                      key={`auto-form-${name}`}
                      fullWidth>
                {element.options.map((x, counter: number) => (
                  <MenuItem value={x}>{x}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
        </Stack>
      )
    } else if (type === 'check') {
      /**
       * Checkbox controls here.
       */
      return (
        <Stack direction={'column'}>
          <Item sx={{ width: '100%', textAlign: 'left' }}>
            <FormControlLabel control={<Checkbox
              name={name}
              onChange={handleChange}
              checked={payload[name] ?? false}
              required={required}
            />} label={`${description} (${name})`} />
          </Item>
        </Stack>
      )
    } else if (type === 'array') {
      /**
       * Arrays are handled as text boxes (for now), allowing users to enter values with a comma-separated string.
       */
      return (
        <>
          <Stack direction={'column'}>
            <Item sx={{width: '100%'}}>
              <TextField label={`${description} (${name})`}
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
    } else if (type === 'select') {
      const labelName = `${name}-label`;

      return (
        <Stack direction={'column'}>
          <Item sx={{width: '100%'}}>
            <FormControl
              required={required}
              fullWidth>
              <InputLabel id={labelName}>{description} ({name})</InputLabel>
              <Select labelId={labelName}
                      label={`${description} (${name})`}
                      style={{ textAlign: 'left' }}
                      value={payload[name] ?? element.dataset[0].name}
                      name={name}
                      required={required}
                      onChange={handleChange}
                      fullWidth>
                {element.dataset.map((x, counter: number) => (
                  <MenuItem value={x[name]}>{x.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
        </Stack>
      );
    } else if (type === 'autocomplete') {
      const labelName = `${name}-label`;

      return (
        <Stack direction={'column'}>
          <Item sx={{width: '100%'}}>
            <Autocomplete
              disablePortal
              options={element.dataset.map((x: any, counter: number) => {
                return {
                  label: x.name,
                  id: x.id,
                };
              })}
              fullWidth
              value={payload[name] ?? element.dataset[0].name}
              name={name}
              required={required}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} label={`${description} (${name})`}/>}
            />
          </Item>
        </Stack>
      );
    }

    /**
     * Otherwise, we return the type name as an unknown type.
     */
    return (
      <>
        Unknown type: {type}
      </>
    );
  }

  /**
   * Generate the form here.
   */
  return (
    <>
      <DialogTitle>
        <Stack direction={'row'}>
          <div style={{ width: '50%' }}>
            {props.header} {props.editPayload && props.editPayload.id ? `(id: ${props.editPayload.id})` : ''}
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
