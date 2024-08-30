'use client';

import {useRouter} from "next/navigation";
import {Button, Stack, Typography} from "@mui/material";
import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import Item from "@/app/components/common/Item";
import {AddOutlined} from "@mui/icons-material";
import {useState} from "react";

const Namespaces = () => {
  const router = useRouter();
  const [namespaces, setNamespaces] = useState([]);

  return (
    <>
      <div style={{ width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px' }}>
        <Stack direction={'row'}>
          <Typography variant={'h4'} fontWeight={'bold'}>Namespaces</Typography>
          <Item sx={{ width: '100%', textAlign: 'right', backgroundColor: 'inherit', padding: '0px' }}>
            <Button sx={{ color: '#fff' }}>
              <AddOutlined/>
            </Button>
          </Item>
        </Stack>
      </div>

      <div style={{ width: '100%', padding: '20px' }}>

      </div>
    </>
  );
}

export default Namespaces;
