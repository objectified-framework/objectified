'use client';

import {useRouter} from "next/navigation";
import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import Item from "@/app/components/common/Item";
import {Button, Stack, Typography} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";

const DataTypes = () => {
  const router = useRouter();

  return (
    <>
      <div style={{width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px'}}>
        <Stack direction={'row'}>
          <Item sx={{width: '50%', textAlign: 'left', backgroundColor: 'inherit', padding: '0px'}}>
            <Typography sx={{ color: '#fff' }} variant={'h4'} fontWeight={'bold'}>Data Types</Typography>
          </Item>

          <Item sx={{width: '50%', textAlign: 'right', backgroundColor: 'inherit', padding: '0px'}}>
            <Button sx={{color: '#fff'}}>
              <AddOutlined/>
            </Button>
          </Item>
        </Stack>
      </div>
    </>
  );
}

export default DataTypes;
