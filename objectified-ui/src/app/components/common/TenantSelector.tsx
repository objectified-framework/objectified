import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {
  Button,
  Checkbox,
  DialogTitle, FormControl, FormControlLabel, IconButton,
  InputLabel, MenuItem,
  Select,
  Stack,
  TextField,
  LinearProgress,
} from '@mui/material';
import Item from "@/app/components/common/Item";
import SettingsIcon from '@mui/icons-material/Settings';

export interface ITenantSelector {
  onTenantChanged: (tenantId: string) => any;
}

export const TenantSelector = (props: ITenantSelector) => {
  const { data: session } = useSession();
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    if (session) {
      setTenants((session as any).objectified.tenancy ?? []);
    }
  }, [session]);

  if (tenants.length > 0) {
    return (
      <Stack direction={'row'}>
        <Item style={{ color: '#fff', paddingTop: '0px', width: '100%', }}
              className={'bg-slate-300 text-black'}>
          <FormControl style={{ width: '100%' }}
                       className={'bg-white'}
                       size={'small'}>
            <Select labelId={'tenant-selector'}
                    label={''}
                    // @ts-ignore
                    className={'font-thin text-black text-sm'}
                    name={'tenantSelector'}
                    value={(session as any).currentTenant ?? ''}
                    onChange={(e: any) => props.onTenantChanged(e.target.value)}
                    sx={{
                      textAlign: 'left', width: '100%', height: '26px', borderRadius: 0,
                      color: 'white',
                      '& .MuiSvgIcon-root': {
                        color: '#555'
                      }
                    }}
                    fullWidth>
              {tenants.map((x: any, counter: number) => (
                <MenuItem className={'font-thin text-xs'}
                          value={x.id}
                          key={`tenant-selector-${counter}`}>{x.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Item>

        <Item style={{ padding: '0px', textAlign: 'right', paddingRight: '8px' }}
              className={'bg-slate-300 text-black'}>
          <IconButton style={{
                    height: '26px', borderRadius: 0,
                    paddingLeft: '4px', paddingRight: '4px' }}
                      className={'bg-slate-100'}
                  variant={'contained'}>
            <SettingsIcon style={{ width: '16px', height: '16px' }}/>
          </IconButton>
        </Item>
      </Stack>
    );
  } else {
    return <LinearProgress />;
  }
}

export default TenantSelector;
