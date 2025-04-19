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
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import * as React from 'react';
import SideBar from "@/app/components/SideBar";
import VersionSelector from "@/app/components/common/VersionSelector";

const ContentArea = () => {
  const [currentTab, setCurrentTab] = React.useState('1');

  const handleTabChanged = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Box style={{ position: 'fixed',
           width: '100%',
           borderRight: '1px solid #ccc',
           height: 'calc(100% - 32px)',
           top: '32px',
           left: 0 }}
         className={'bg-white'}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChanged} style={{ minHeight: 40, height: 40, borderBottom: '1px solid #ccc', paddingBottom: '2px' }}>
              <Tab disableRipple style={{ textTransform: 'none', padding: '8px', fontSize: '12px', fontWeight: 300, minHeight: 40, height: 40 }}
                   label={'Visual Editor'} value={'1'}/>
              <Tab disableRipple style={{ textTransform: 'none', padding: '8px', fontSize: '12px', fontWeight: 300, minHeight: 40, height: 40 }}
                   label={'API Editor'} value={'2'}/>
              <Tab disableRipple style={{ textTransform: 'none', padding: '8px', fontSize: '12px', fontWeight: 300, minHeight: 40, height: 40 }}
                   label={'Code Editor'} value={'3'}/>
              <Tab disableRipple style={{ textTransform: 'none', padding: '8px', fontSize: '12px', fontWeight: 300, minHeight: 40, height: 40 }}
                   label={'Documentation'} value={'4'}/>
            </TabList>
          </Box>

          <VersionSelector onVersionChanged={() => {}}/>
        </TabContext>

        {(currentTab === '1') && (
          <Box style={{ position: 'fixed',
            width: '100%',
            height: 'calc(100% - 72px)',
            top: '72px',
            left: '0',
            backgroundColor: '#3ff'
          }}>
            <SideBar/>
          </Box>
        )}

        {(currentTab === '2') && (
          <Box style={{ position: 'fixed',
            width: '100%',
            height: 'calc(100% - 72px)',
            top: '72px',
            left: '0',
            backgroundColor: '#f3f'
          }}>
          </Box>
        )}

        {(currentTab === '3') && (
          <Box style={{ position: 'fixed',
            width: '100%',
            height: 'calc(100% - 72px)',
            top: '72px',
            left: '0',
            backgroundColor: '#ff3'
          }}>
          </Box>
        )}

        {(currentTab === '4') && (
          <Box style={{ position: 'fixed',
            width: '100%',
            height: 'calc(100% - 72px)',
            top: '72px',
            left: '0',
            backgroundColor: '#aaf'
          }}>
          </Box>
        )}
      </Box>
    </>
  );
}

export default ContentArea;
