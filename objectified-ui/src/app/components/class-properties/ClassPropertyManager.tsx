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

      <div style={{width: '100%', padding: '10px', paddingBottom: '0px'}}>
        <div style={{
          width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px',
          border: '1px solid #000'
        }}>
          <Stack direction={'row'} key={'key1'}>
            <Item sx={{width: '50%', textAlign: 'left', backgroundColor: 'inherit', padding: '0px'}}>
              <Typography sx={{color: '#fff'}} variant={'h4'} fontWeight={'bold'}>{props.name}</Typography>
            </Item>

            <Item sx={{width: '50%', textAlign: 'right', backgroundColor: 'inherit', padding: '0px'}}>
              <IconButton sx={{color: '#fff'}} onClick={() => refreshClassProperties()}>
                <RefreshOutlined/>
              </IconButton>

              <IconButton sx={{color: '#fff'}} onClick={() => onAdd()}>
                <AddOutlined/>
              </IconButton>

              <IconButton sx={{color: '#fff'}} onClick={() => onSchemaClicked()}>
                <SearchOutlined/>
              </IconButton>
            </Item>
          </Stack>
        </div>

        {classProperties.length === 0 && (
          <Stack direction={'row'} key={'key2'}>
            <Item sx={{width: '100%', textAlign: 'center', backgroundColor: '#ccc', border: '1px solid #000', borderTop: '0px' }}>
              <Typography sx={{color: '#000'}} fontWeight={'bold'}>
                This class definition is empty.
              </Typography>
            </Item>
          </Stack>
        )}

        {classProperties.length > 0 && classProperties.map((prop: any, position: number) => (
          <Stack direction={'row'} key={`key3-${position}`}>
            <Item sx={{width: '90%', textAlign: 'left', backgroundColor: '#fff', border: '1px solid #000', borderTop: '0px', borderRight: '0px' }}>
              <Typography sx={{color: '#000'}}>
                {prop.name ?? getProperty(prop.propertyId).name} ({prop.description ?? getProperty(prop.propertyId).description})
              </Typography>
            </Item>

            <Item sx={{width: '10%', textAlign: 'right', backgroundColor: '#fff', border: '1px solid #000', borderLeft: '0px', borderTop: '0px', padding: '0px' }}>
              <Typography sx={{color: '#000'}}>
                <IconButton onClick={() => onDelete(prop)}>
                  <DeleteOutlined/>
                </IconButton>
              </Typography>
            </Item>
          </Stack>
        ))}
      </div>
    </>
  );
}

export default ClassPropertyManager;