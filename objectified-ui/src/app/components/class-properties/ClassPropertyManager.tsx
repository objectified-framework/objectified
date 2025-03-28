import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import {useState, useEffect} from "react";
import Item from "@/app/components/common/Item";
import {
  Stack,
  Typography,
  Button,
  Dialog,
  IconButton,
} from '@mui/material';
import {AddOutlined, RefreshOutlined, DeleteOutlined, SearchOutlined,} from '@mui/icons-material';
import AutoForm from "@/app/components/common/AutoForm";
import {errorDialog} from "@/app/components/common/ConfirmDialog";
import {deleteClassProperties, listClassProperties, putClassProperties} from "@/app/services/class-properties";
import {SchemaDialog} from "@/app/components/class-properties/SchemaDialog";
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';

export interface IClassPropertyManager {
  name: string;
  classId: string;
  properties: any[];
  fields: any[];
  key: string;
}

export const formItems: any[] = [
  {
    name: 'id',
    description: 'Property',
    required: true,
    type: 'autocomplete',
    dataset: [],
  },
  {
    name: 'name',
    description: 'Data Type Name',
    pattern: '^[A-Za-z_][A-Za-z0-9_]*$',
    helperText: 'Value must start with a letter.',
  },
  {
    name: 'description',
    description: 'Description',
    multiline: true,
    maxRows: 4,
    pattern: '^[\x00-\x7F]+$',
    helperText: 'Value must contain printable ASCII characters.',
  },
];

export const ClassPropertyManager = (props: IClassPropertyManager) => {
  const [classProperties, setClassProperties] = useState([]);
  const [open, setOpen] = useState(false);
  const [schemaOpen, setSchemaOpen] = useState<boolean>(false);
  const [selectedClassId, setSelectedClassId] = useState<string>('');

  const refreshClassProperties = () => {
    listClassProperties(props.classId)
      .then((x: any) => {
        setClassProperties(x);
      })
      .catch((x: any) => {
        console.log('Class properties failed.', x);
      });

    setClassProperties([]);
  }

  const onDelete = (prop: any) => {
    deleteClassProperties(props.classId, prop.propertyId)
      .then((x: any) => {
        refreshClassProperties();
      })
      .catch((x: any) => {
        console.log('Delete fail', x);
      });
  }

  useEffect(() => {
    if (props.properties.length > 0) {
      formItems[0].dataset = props.properties;
    }
  }, [props.properties]);

  const onAdd = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const saveClicked = async (payload: any) => {
    if (!payload) {
      errorDialog('Empty payload.');
      return;
    }

    await putClassProperties(props.classId, payload)
      .then((x: any) => {
        setOpen(false);
        refreshClassProperties();
      })
      .catch((x: any) => {
        console.log('Save failed', x);
        setOpen(false);
      });
  }

  const onSchemaClicked = () => {
    setSelectedClassId(props.classId);
    setSchemaOpen(true);
  }

  const closeSchemaClicked = () => {
    setSelectedClassId('');
    setSchemaOpen(false);
  }

  useEffect(() => {
    refreshClassProperties();
  }, [props.properties, props.fields]);

  const getProperty = (propId: string) => props.properties.filter((x) => x.id === propId)[0] ?? {
    name: `???`,
    description: `Unknown property: ${propId}`,
  };

  return (
    <>
      <SchemaDialog schemaOpen={schemaOpen} classId={selectedClassId} closeSchemaClicked={() => closeSchemaClicked()}/>

      <Dialog PaperProps={{ style: {
                minHeight: '65%',
                maxHeight: '65%',
              }}}
              fullWidth
              open={open} onClose={handleClose}>
        <AutoForm header={'Add Property'}
                  formElements={formItems}
                  editPayload={null}
                  onSave={saveClicked}
                  onCancel={handleClose}/>
      </Dialog>

      <div style={{ width: '100%', textAlign: 'left', paddingLeft: '2px', borderBottom: '1px solid #ccc', height: '36px' }}>
        <Stack direction={'row'}>
          <div style={{ width: '50%', textAlign: 'left', paddingLeft: '6px', paddingTop: '6px', }}>
            <Typography className={'text-black font-bold'}>
              {props.name}
            </Typography>
          </div>

          <div style={{ width: '50%', textAlign: 'right', paddingRight: '14px', paddingTop: '4px' }}>
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-green-300'}
                    variant={'contained'} startIcon={<RefreshIcon/>}
                    onClick={() => refreshClassProperties()}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Refresh
              </Typography>
            </Button>
            &nbsp;
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-slate-200'}
                    variant={'contained'} startIcon={<AddIcon/>}
                    onClick={() => onAdd()}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Add
              </Typography>
            </Button>
            &nbsp;
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-slate-200'}
                    variant={'contained'} startIcon={<SearchIcon/>}
                    onClick={() => onSchemaClicked()}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Inspect
              </Typography>
            </Button>
          </div>
        </Stack>
      </div>

      <div style={{width: '100%', padding: '0px', paddingBottom: '0px'}}>
        {classProperties.length === 0 && (
          <Stack direction={'row'} key={'key2'}>
            <Item sx={{width: '100%', textAlign: 'center', border: '1px solid #000', borderTop: '0px', borderRight: '0px', borderLeft: '0px' }}>
              <Typography sx={{color: '#000'}} className={'text-sm font-thin'}>
                This class definition is empty.
              </Typography>
            </Item>
          </Stack>
        )}

        {classProperties.length > 0 && classProperties.map((prop: any, position: number) => (
          <Stack direction={'row'} key={`key3-${position}`}>
            <Item sx={{width: '90%', textAlign: 'left', borderBottom: '1px solid #000', }}>
              <Typography sx={{color: '#000'}} className={'text-sm font-thin'}>
                {prop.name ?? getProperty(prop.propertyId).name} ({prop.description ?? getProperty(prop.propertyId).description})
              </Typography>
            </Item>

            <Item sx={{width: '10%', textAlign: 'right', borderBottom: '1px solid #000', padding: '0px', paddingTop: '6px', paddingRight: '10px' }}>
              <Button style={{
                        height: '24px', borderRadius: 1,
                        border: '1px solid #44f', paddingLeft: '6px', paddingRight: '6px'
                      }}
                      variant={'contained'} startIcon={<DeleteOutlined/>}
                      className={'bg-red-400 text-white'}
                      onClick={() => onDelete(prop)}>
                <Typography style={{ fontWeight: 150, fontSize: 12, }} textTransform={'none'}>
                  Delete
                </Typography>
              </Button>
            </Item>
          </Stack>
        ))}
      </div>
    </>
  );
}

export default ClassPropertyManager;