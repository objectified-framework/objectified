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
  Typography,
} from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

export interface IProjectSelector {
  onVersionChanged: (versionId: string) => any;
}

const VersionSelector = (props: IProjectSelector) => {
  return (
    <Button style={{ top: 38,
              right: 10,
              position: 'fixed',
              height: '28px',
              zIndex: 999,
              textTransform: 'none',
              paddingLeft: '8px',
              paddingRight: '6px',
            }}
            disableRipple
            variant={'outlined'}>
      <Stack direction={'row'}>
        <Box style={{ paddingTop: '0px', textAlign: 'left' }}
          className={'text-black'}>
          <LocalOfferOutlinedIcon style={{ height: 16, paddingRight: '6px' }}/> Version v1 <ExpandMoreIcon style={{ paddingLeft: '4px'}}/>
        </Box>

        <Box style={{ textAlign: 'right' }}
             className={'bg-white text-black'}>
        </Box>
      </Stack>
    </Button>
  );
}

export default VersionSelector;
