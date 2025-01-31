'use client';

import {useState, useEffect} from "react";
import {listClasses,} from "@/app/services/class";
import {useSession} from 'next-auth/react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import Item from "@/app/components/common/Item";
import {
  Stack,
  Typography
} from '@mui/material';
import {listProperties} from "@/app/services/property";
import {listFields} from "@/app/services/field";

const ClassProperties = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataPayload, setDataPayload] = useState([]);
  const [properties, setProperties] = useState([]);
  const [fields, setFields] = useState([]);
  // @ts-ignore
  const sessionObject: any = session!.objectified;

  const refreshClasses = () => {
    setIsLoading(true);

    listClasses().then((x: any) => {
      setDataPayload(x);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const refreshProperties = () => {
    setIsLoading(true);

    listProperties().then((x) => {
      setProperties(x);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const refreshFields = () => {
    setIsLoading(true);

    listFields().then((x) => {
      setFields(x);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    refreshClasses();
    refreshProperties();
    refreshFields();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress/>
      </Box>
    );
  }

  return (
    <>
      {dataPayload.map((classEntry) => (
        <div style={{width: '100%', padding: '10px', paddingBottom: '0px'}}>
          <div style={{
            width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px',
            border: '1px solid #000'
          }}>
            <Stack direction={'row'}>
              <Item sx={{width: '100%', textAlign: 'left', backgroundColor: 'inherit', padding: '0px'}}>
                <Typography sx={{color: '#fff'}} variant={'h4'} fontWeight={'bold'}>{classEntry.name}</Typography>
              </Item>
            </Stack>
          </div>
        </div>
      ))}
    </>
  );
}

export default ClassProperties;
