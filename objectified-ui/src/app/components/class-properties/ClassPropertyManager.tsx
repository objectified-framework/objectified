import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import Item from "@/app/components/common/Item";
import {
  Stack,
  Typography
} from '@mui/material';

export interface IClassPropertyManager {
  name: string;
  classId: string;
  properties: any[];
  fields: any[];
  classProperties: any[];
}

export const ClassPropertyManager = (props: IClassPropertyManager) => {
  return (
    <div style={{width: '100%', padding: '10px', paddingBottom: '0px'}}>
      <div style={{
        width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px',
        border: '1px solid #000'
      }}>
        <Stack direction={'row'}>
          <Item sx={{width: '100%', textAlign: 'left', backgroundColor: 'inherit', padding: '0px'}}>
            <Typography sx={{color: '#fff'}} variant={'h4'} fontWeight={'bold'}>{props.name}</Typography>
          </Item>
        </Stack>
      </div>
    </div>
  );
}

export default ClassPropertyManager;