import {useState, useEffect, useRef} from 'react';
import Item from '@/app/components/common/Item';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {AddOutlined, RemoveOutlined, RefreshOutlined, CheckBox, Edit} from '@mui/icons-material';
import {errorDialog} from "@/app/components/common/ConfirmDialog";

export interface IArrayEditor {
  header: string;
  arrayPayload: any[];
  name: string;
  onChange: (name: string, payload: any) => any;
}

/**
 * This is a simple programmatic array value editor.  It will allow arrays to be modified, but the values can only
 * be string-based values.
 *
 * @param props {IArrayEditor} properties.
 */
export const ArrayEditor = (props: IArrayEditor) => {
  const [payload, setPayload] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const addValueRef = useRef('');

  useEffect(() => {
    setPayload(props.arrayPayload);
  }, [props.arrayPayload]);

  const addClicked = () => {
    setOpen(true);
  }

  const addItem = () => {
    const copiedPayload = Object.assign([], payload);
    const value = (addValueRef.current as any).value;

    if (value) {
      copiedPayload.push(value);

      setPayload(copiedPayload);
      props.onChange(props.name, copiedPayload);
    } else {
      errorDialog('Missing value.');
      return;
    }

    setOpen(false);
  }

  const removeClicked = (position: number) => {
    const copiedPayload = Object.assign([], payload);

    copiedPayload.splice(position, 1);

    setPayload(copiedPayload);
    props.onChange(props.name, copiedPayload);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle key={'auto-form-dialog-title'}>
          Add Array Record
        </DialogTitle>
        <DialogContent>
          <TextField inputRef={addValueRef} fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} color={'error'} onClick={() => {
            setOpen(false);
          }}>Cancel</Button>
          <Button variant={'contained'} onClick={() => {
            addItem();
          }}>Add</Button>
        </DialogActions>
      </Dialog>

      <Stack direction={'row'} sx={{ border: '1px solid #ccc', borderRadius: 1, padding: '3px' }} key={`${props.name}-header`}>
        <Item sx={{width: '80%', textAlign: 'left', padding: '0px', paddingLeft: '8px', paddingTop: '6px' }}>
          <Typography>{props.header} ({payload.length} item(s))</Typography>
        </Item>

        <Item sx={{width: '20%', textAlign: 'right', padding: '0px'}}>
          <Button onClick={() => addClicked()}>
            <AddOutlined/>
          </Button>
        </Item>
      </Stack>

      {payload.length === 0 && (
        <Stack direction={'row'} sx={{ border: '1px solid #ccc',
          borderRadius: 1,
          padding: '3px',
          borderTop: '0px',
          backgroundColor: '#eee' }}
          key={`${props.name}-no-items`}
        >
          <Item sx={{ width: '100%', textAlign: 'center', backgroundColor: '#eee' }}>
            Click "+" to add an array item
          </Item>
        </Stack>
      )}

      {payload.map((item, counter: number) => (
        <Stack direction={'row'} sx={{ border: '1px solid #ccc',
          borderRadius: 1,
          padding: '3px',
          borderTop: '0px' }}
          key={`${props.name}-items-${counter}`}>
          <Item sx={{ width: '80%', textAlign: 'left' }}>
            {item}
          </Item>
          <Item sx={{ width: '20%', textAlign: 'right', paddingRight: '0px' }}>
            <Button onClick={() => removeClicked(counter)}>
              <RemoveOutlined/>
            </Button>
          </Item>
        </Stack>
      ))}
    </>
  );
}

export default ArrayEditor;
