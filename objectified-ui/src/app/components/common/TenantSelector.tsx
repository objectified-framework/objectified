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

export interface ITenantSelector {
  onTenantChanged: (tenantId: string) => any;
}

export const TenantSelector = (props: ITenantSelector) => {
  const { data: session } = useSession();
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    setTenants(session.objectified.tenancy ?? []);
  }, [session]);

  if (tenants.length > 0) {
    return (
      <FormControl style={{ color: '#fff' }} size={'small'}>
        <InputLabel id={'tenant-selector'} style={{ color: '#fff' }}></InputLabel>
        <Select labelId={'tenant-selector'}
                label={''}
                style={{ textAlign: 'left', color: '#fff', border: '#1px solid #fff' }}
                name={'tenantSelector'}
                onChange={(e) => props.onTenantChanged(e.target.value)}
                fullWidth>
          {tenants.map((x) => (
            <MenuItem value={x.id}>{x.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else {
    return <LinearProgress />;
  }
}

export default TenantSelector;
