import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import {useState, useEffect} from "react";
import Item from "@/app/components/common/Item";
import {
  Stack,
  Typography,
  Button,
  Dialog,
} from '@mui/material';
import {AddOutlined, RefreshOutlined} from '@mui/icons-material';
import AutoForm from "@/app/components/common/AutoForm";
import {errorDialog} from "@/app/components/common/ConfirmDialog";
import {listClasses} from "@/app/services/class";
import {listClassProperties} from "@/app/services/class-properties";
export interface IClassPropertyManager {
  name: string;
  classId: string;
  properties: any[];
  fields: any[];
}

export const formItems: any[] = [
  {
    name: 'propertyId',
    description: 'Property ID',
    required: true,
    type: 'autocomplete',
    dataset: [],
  },
];

export const ClassPropertyManager = (props: IClassPropertyManager) => {
  const [classProperties, setClassProperties] = useState([]);
  const [open, setOpen] = useState(false);

  const refreshClassProperties = () => {
    listClassProperties(props.classId)
      .then((x) => {
        console.log('ClassProperties', x);
      })
      .catch((x) => {
        console.log('Class properties failed.', x);
      });

    setClassProperties([]);
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

    // if (payload.name.charAt(0) === payload.name.charAt(0).toUpperCase() || payload.name.includes('-')) {
    //   errorDialog('Field names must be lowercase, pascalCase, or snake_case.');
    //   return;
    // }
    //
    // if (payload.id) {
    //   await putField(payload.id, payload)
    //     .then((x) => {
    //       refreshFields();
    //       setOpen(false);
    //     })
    //     .catch((x) => {
    //       errorDialog('Failed to update this data type - duplicate entry or other error.');
    //     });
    // } else {
    //   payload.ownerId = session.objectified.id;
    //
    //   await saveField(payload)
    //     .finally(() => {
    //       refreshFields();
    //       setOpen(false);
    //     });
    // }
  }

  useEffect(() => {
    refreshClassProperties();
  }, [props.properties, props.fields]);

  return (
    <>
      <Dialog fullWidth={'md'} open={open} onClose={handleClose}>
        <AutoForm header={'Class Property'}
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
          <Stack direction={'row'}>
            <Item sx={{width: '50%', textAlign: 'left', backgroundColor: 'inherit', padding: '0px'}}>
              <Typography sx={{color: '#fff'}} variant={'h4'} fontWeight={'bold'}>{props.name}</Typography>
            </Item>

            <Item sx={{width: '50%', textAlign: 'right', backgroundColor: 'inherit', padding: '0px'}}>
              <Button sx={{color: '#fff'}} onClick={() => refreshClassProperties()}>
                <RefreshOutlined/>
              </Button>

              <Button sx={{color: '#fff'}} onClick={() => onAdd()}>
                <AddOutlined/>
              </Button>
            </Item>
          </Stack>
        </div>

          {classProperties.length === 0 && (
            <Stack direction={'row'}>
              <Item sx={{width: '100%', textAlign: 'center', backgroundColor: '#ccc', border: '1px solid #000', borderTop: '0px' }}>
                <Typography sx={{color: '#000'}} fontWeight={'bold'}>
                  This class definition is empty.
                </Typography>
              </Item>
            </Stack>
          )}

          {classProperties.length > 0 && classProperties.map((prop: any) => (
            <>
            </>
          ))}
      </div>
    </>
  );
}

export default ClassPropertyManager;