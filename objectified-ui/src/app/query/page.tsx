'use client';

import {useRouter} from "next/navigation";
import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import {Button, Stack, Typography} from "@mui/material";
import Item from "@/app/components/common/Item";
import {AddOutlined} from "@mui/icons-material";

const Query = () => {
  const router = useRouter();

  return (
    <>
      <div style={{width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px'}}>
        <Stack direction={'row'}>
          <Typography variant={'h4'} fontWeight={'bold'}>Query</Typography>
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

export default Query;
