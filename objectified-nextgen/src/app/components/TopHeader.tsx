'use client';

import { Box, Typography, Stack } from '@mui/material';
import ProjectSelector from "@/app/components/common/ProjectSelector";

const VERSION = "0.2.0";

const TopHeader = () => {
  return (
    <Box style={{ position: 'fixed', width: '100%', height: '32px', fontSize: 13, borderBottom: '1px solid #ccc', }}
         className={'bg-white text-black font-light'}>
      <Stack direction={'row'}>
        <Box component={'img'} src={'/Objectified-02.png'} style={{ height: 32 }}/>

        <Typography style={{ fontWeight: 200, fontSize: 14, padding: '5px' }}>
          ADE v{VERSION}
        </Typography>

        <Box style={{ padding: '4px' }}>
          <ProjectSelector onTenantChanged={() => {}}/>
        </Box>
      </Stack>
    </Box>
  )
}

export default TopHeader;