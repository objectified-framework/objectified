'use client';

import {
  Button,
  Checkbox,
  DialogTitle, FormControl, FormControlLabel, IconButton,
  InputLabel, MenuItem,
  Select,
  Stack,
  Box,
  TextField,
  LinearProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export interface IProjectSelector {
  onTenantChanged: (tenantId: string) => any;
}

const ProjectSelector = (props: IProjectSelector) => {
  const projects = [
    {
      id: '1',
      name: 'Default Project',
    },
    {
      id: '2',
      name: 'Objectified Project'
    },
    {
      id: '3',
      name: 'Cleanmail',
    }
  ];

  if (projects.length > 0) {
    return (
      <Stack direction={'row'}>
        <Box style={{ color: '#fff', paddingTop: '0px', width: '100%', }}
              className={'bg-white font-thin text-black'}>
          <FormControl style={{ width: '100%' }}>
            <Select labelId={'tenant-selector'}
                    label={''}
                    className={'font-thin text-black text-sm'}
                    name={'tenantSelector'}
                    // value={(session as any).currentTenant ?? ''}
                    value={projects[0].name}
                    onChange={(e: any) => props.onTenantChanged(e.target.value)}
                    sx={{
                      textAlign: 'left', width: '100%', height: '26px', borderRadius: 0,
                      color: 'black',
                      '& .MuiSvgIcon-root': {
                        color: '#555'
                      }
                    }}
                    fullWidth>
              {projects.map((x: any, counter: number) => (
                <MenuItem className={'font-thin text-sm'}
                          value={x.id}
                          key={`tenant-selector-${counter}`}>{x.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box style={{ padding: '0px', textAlign: 'right', paddingRight: '8px' }}
              className={'bg-white text-black'}>
          <IconButton style={{
            height: '26px', borderRadius: 0,
            paddingLeft: '4px', paddingRight: '4px' }}
                      className={'border-1 border-black'}
                      variant={'contained'}>
            <AddIcon style={{ width: '16px', height: '16px' }}/>
          </IconButton>
        </Box>
      </Stack>
    );
  } else {
    return <LinearProgress />;
  }
}

export default ProjectSelector;
