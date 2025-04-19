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
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import ProjectSelector from "@/app/components/common/ProjectSelector";
import * as React from 'react';

const SideBar = () => {
  const [selectedSection, setSelectedSection] = React.useState('classes');

  const handleChange = (e, newAlignment: string,) => {

  }

  return (
    <>
      <Box style={{ position: 'fixed', width: '300px', borderRight: '1px solid #ccc', height: 'calc(100% - 72px)',
        top: '72px', left: 0}}
        className={'bg-white'}>
        <Stack direction={'column'}>
          <Box style={{ width: '100%' }}>
            <ToggleButtonGroup value={selectedSection}
                               exclusive
                               onChange={handleChange}>
              <ToggleButton value={'classes'}>Classes</ToggleButton>
              <ToggleButton value={'properties'}>Properties</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default SideBar;
