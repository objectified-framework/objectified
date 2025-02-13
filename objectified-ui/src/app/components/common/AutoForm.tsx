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
import ArrayEditor from "@/app/components/common/ArrayEditor";

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
   * Handles the change of values when an autocomplete event takes place.  This only includes the internal
   * control, so it needs to take the event from the outer (parent) object, and the value that was
   * changed to.  The "name" here is used to support the name of the field being affected.  This way,
   * multiple Autocomplete controls can be used.
   *
   * @param event The event that caused the change.
   * @param value The value of the row that was selected.
   * @param name The name of the control for population in the payload from the selected value.
   */
  const handleAutocompleteChange = (event: object, value: any, name: string) => {
    setPayload({
      ...payload,
      [name]: value[name],
    });
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
      const dataset = x.dataset;

      if (type === 'enum') {
        clearPayload[name] = options[0];
      } else if (type === 'autocomplete') {
        clearPayload[name] = x.dataset[0][name];
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

        modifiedPayload[formName] = payload[formName];
      });

      props.onSave(modifiedPayload);
    }
  }

  /**
   * Generates a single element from the element properties defined for the form generator from the
   * props.formElements property.
   */
  const generateFormElement = (element: any, formCounter: number) => {
    const name = element.name;
    const description = element.description;
    const type = element.type ?? 'textfield';
    const required = element.required ?? false;
    const multiline = element.multiline ?? false;
    const maxRows = element.maxRows ?? 1;

    /**
     * Text fields are handled here.  Text fields are single lines of text that can be edited.
     */
    if (type === 'textfield') {
      return (
        <>
          <Stack direction={'column'} key={`auto-form-line-${name}`}>
            <Item sx={{width: '100%'}}>
              <TextField label={`${description} (${name})`}
                         fullWidth
                         multiline={multiline}
                         value={payload[name] ?? ''}
                         name={name}
                         required={required}
                         rows={maxRows}
                         key={`auto-form-${formCounter}`}
                         onChange={handleChange}/>
            </Item>
          </Stack>
        </>
      );
    } else if (type === 'object') {
      return (
        <>
          <Stack direction={'column'} key={`auto-form-line-${name}`}>
            <Item sx={{width: '100%'}}>
              <TextField label={`${description} (${name})`}
                         fullWidth
                         multiline={multiline}
                         value={JSON.stringify(payload[name], null, 2) ?? '{}'}
                         name={name}
                         required={required}
                         rows={maxRows}
                         key={`auto-form-${formCounter}`}
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
        <Stack direction={'column'} key={`auto-form-line-${name}`}>
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
                  <MenuItem value={x} key={`auto-form-${name}-${counter}`}>{x}</MenuItem>
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
        <Stack direction={'column'} key={`auto-form-line-${name}`}>
          <Item sx={{ width: '100%', textAlign: 'left' }}>
            <FormControlLabel control={<Checkbox
              name={name}
              onChange={handleChange}
              checked={payload[name] ?? false}
              required={required}
              key={`auto-form-${formCounter}`}
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
          <Stack direction={'column'} key={`auto-form-line-${name}`}>
            <Item sx={{ width: '100%' }}>
              <ArrayEditor header={`${description} (${name})`}
                           arrayPayload={payload[name] ?? []}
                           name={name}
                           onChange={(name, newPayload) => {
                             setPayload({
                               ...payload,
                               [name]: newPayload,
                             });
                           }}
               />
            </Item>
          </Stack>
        </>
      );
    } else if (type === 'select') {
      /**
       * This is a select dropdown list.
       */
      const labelName = `${name}-label`;

      return (
        <Stack direction={'column'} key={`auto-form-line-${name}`}>
          <Item sx={{width: '100%'}}>
            <FormControl
              key={`auto-form-${formCounter}`}
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
                      key={`auto-form-select-${name}`}
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
      /**
       * This is an autocomplete field, which uses a list from the dataset (similar to the select dropdown)
       * and allows for filtering via text input.
       */
      const labelName = `${name}-label`;

      return (
        <Stack direction={'column'} key={`auto-form-line-${name}`}>
          <Item sx={{width: '100%'}}>
            <Autocomplete
              disablePortal
              options={element.dataset}
              fullWidth
              value={payload[name] ?? element.dataset[0].name}
              name={name}
              required={required}
              key={`auto-form-${formCounter}`}
              onChange={(event, value) => handleAutocompleteChange(event, value, name)}
              getOptionLabel={option => {
                // Look up the entry from the dataset for the value in the option
                const datasetValue = element.dataset.filter((x: any) => x[name] === option);

                if (datasetValue.length === 0) {
                  if (option.name) {
                    return option.name;
                  }

                  return option;
                }

                return datasetValue[0].name;
              }}
              isOptionEqualToValue={(option, value) => option[name] === value}
              renderInput={(params) => <TextField {...params} name={name} label={`${description} (${name})`}/>}
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
        Cannot render unknown type: "{type}"
      </>
    );
  }

  /**
   * Generate the form here.
   */
  return (
    <DialogTitle key={'auto-form-dialog-title'}>
      <Stack direction={'row'} key={'auto-form-header'}>
        <div style={{ width: '70%' }} key={'auto-form-header-1'}>
          {props.header} {props.editPayload && props.editPayload.id ? `(id: ${props.editPayload.id})` : ''}
        </div>
        <div style={{ width: '30%', textAlign: 'right' }} key={'auto-form-header-2'}>
          <IconButton onClick={() => props.onCancel()}>
            <CloseIcon/>
          </IconButton>
        </div>
      </Stack>

      {props.formElements.map((x, formElementCounter) => generateFormElement(x, formElementCounter))}

      <Stack direction={'row'} key={'auto-form-controls'}>
        <Item sx={{ width: '100%', textAlign: 'right' }}>
          <Button variant={'contained'} color={'error'} onClick={() => clearForm()}>Clear Form</Button>
          &nbsp;
          <Button variant={'contained'} onClick={() => saveClicked()}>Save</Button>
        </Item>
      </Stack>
    </DialogTitle>
  );
}

export default AutoForm;
