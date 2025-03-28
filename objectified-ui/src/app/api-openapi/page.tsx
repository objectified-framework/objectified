'use client';

import {
  Stack,
  Button,
  Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import HelpIcon from '@mui/icons-material/Help';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import DriveFileMoveRtlOutlinedIcon from '@mui/icons-material/DriveFileMoveRtlOutlined';

const OpenAPI = () => {
  return (
    <>
      <div style={{ width: '100%', height: '36px', borderBottom: '1px solid #ccc', padding: '4px' }}>
        <Stack direction={'row'}>
          <div style={{ width: '50%', textAlign: 'left', paddingLeft: '2px', }}>
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-slate-200'}
                    variant={'contained'} startIcon={<AddIcon/>}
                    onClick={() => {}}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Add
              </Typography>
            </Button>
            &nbsp;
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-green-300'}
                    variant={'contained'} startIcon={<RefreshIcon/>}
                    onClick={() => {}}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Refresh
              </Typography>
            </Button>
            &nbsp;|&nbsp;
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-slate-200'}
                    variant={'contained'} startIcon={<DriveFileMoveOutlinedIcon/>}
                    onClick={() => {}}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Import
              </Typography>
            </Button>
            &nbsp;
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-slate-200'}
                    variant={'contained'} startIcon={<DriveFileMoveRtlOutlinedIcon/>}
                    onClick={() => {}}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Export
              </Typography>
            </Button>
          </div>

          <div style={{ width: '50%', textAlign: 'right', paddingRight: '10px' }}>
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-slate-200'}
                    variant={'contained'} startIcon={<HelpIcon/>}
                    onClick={() => window.open('https://docs.objectified.dev/docs/', '_none')}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Help
              </Typography>
            </Button>
          </div>
        </Stack>
      </div>
    </>
  );
}

export default OpenAPI;