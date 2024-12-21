'use client';

import {useRouter} from "next/navigation";
import Item from "@/app/components/common/Item";
import {Button, Stack, Typography} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";

const Fields = () => {
  const router = useRouter();

  return (
    <>
      <div style={{width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px'}}>
        <Stack direction={'row'}>
          <Typography variant={'h4'} fontWeight={'bold'}>Fields</Typography>
          <Item sx={{width: '100%', textAlign: 'right', backgroundColor: 'inherit', padding: '0px'}}>
            <Button sx={{color: '#fff'}}>
              <AddOutlined/>
            </Button>
          </Item>
        </Stack>
      </div>
    </>
  );
}

export default Fields;
