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
        <Item style={{ backgroundColor: '#000', color: '#fff', paddingTop: '10px' }}>
          Tenant:
        </Item>

        <Item style={{ backgroundColor: '#000', color: '#fff', paddingTop: '0px' }}>
          <FormControl style={{ color: '#fff' }} size={'small'}>
            <InputLabel id={'tenant-selector'} style={{ color: '#fff' }}></InputLabel>
            <Select labelId={'tenant-selector'}
                    label={''}
                    // @ts-ignore
                    style={{ textAlign: 'left', color: '#fff', border: '#1px solid #fff', borderColor: '#fff' }}
                    name={'tenantSelector'}
                    value={(session as any).currentTenant ?? ''}
                    onChange={(e: any) => props.onTenantChanged(e.target.value)}
                    sx={{
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                    fullWidth>
              <MenuItem disabled value={''}>
                <em>Select Tenant</em>
              </MenuItem>
              {tenants.map((x: any, counter: number) => (
                <MenuItem value={x.id} key={`tenant-selector-${counter}`}>{x.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Item>
      </Stack>
    );
  } else {
    return <LinearProgress />;
  }
}

export default TenantSelector;
