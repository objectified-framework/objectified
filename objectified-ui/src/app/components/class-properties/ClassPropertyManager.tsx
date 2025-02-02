import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import {useState, useEffect} from "react";
import Item from "@/app/components/common/Item";
import {
  Stack,
  Typography,
  Button
} from '@mui/material';
import {AddOutlined, RefreshOutlined} from '@mui/icons-material';

export interface IClassPropertyManager {
  name: string;
  classId: string;
  properties: any[];
  fields: any[];
}

export const ClassPropertyManager = (props: IClassPropertyManager) => {
  const [classProperties, setClassProperties] = useState([]);

  const refreshClassProperties = () => {
    setClassProperties([]);
  }

  const onAdd = () => {

  }

  useEffect(() => {
    refreshClassProperties();
  }, [props.properties, props.fields]);

  return (
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
  );
}

export default ClassPropertyManager;