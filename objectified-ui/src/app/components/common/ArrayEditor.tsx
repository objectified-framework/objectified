import {useState, useEffect} from 'react';
import Item from '@/app/components/common/Item';
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import {AddOutlined, RemoveOutlined, RefreshOutlined, CheckBox, Edit} from '@mui/icons-material';

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
  const [payload, setPayload] = useState([]);

  useEffect(() => {
    setPayload(props.arrayPayload);
  }, [props.arrayPayload]);

  const addClicked = () => {
    const copiedPayload = Object.assign([], payload);

    copiedPayload.push('Random Object');

    setPayload(copiedPayload);
    props.onChange(props.name, copiedPayload);
  }

  const removeClicked = (position: number) => {
    const copiedPayload = Object.assign([], payload);

    delete copiedPayload[position];

    setPayload(copiedPayload);
    props.onChange(props.name, copiedPayload);
  }

  return (
    <>
      <Stack direction={'row'} sx={{ border: '1px solid #ccc', borderRadius: 1, padding: '3px' }}>
        <Item sx={{width: '80%', textAlign: 'left', padding: '0px', paddingLeft: '8px', paddingTop: '6px' }}>
          <Typography>{props.header}</Typography>
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
          backgroundColor: '#eee' }}>
          <Item sx={{ width: '100%', textAlign: 'center', backgroundColor: '#eee' }}>
            Click "+" to add an array item
          </Item>
        </Stack>
      )}

      {payload.map((item, counter: number) => (
        <Stack direction={'row'} sx={{ border: '1px solid #ccc',
          borderRadius: 1,
          padding: '3px',
          borderTop: '0px' }}>
          <Item sx={{ width: '80%', textAlign: 'left' }}>
            {item} ({counter})
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
