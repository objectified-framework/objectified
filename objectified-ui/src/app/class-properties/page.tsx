'use client';

import {useState, useEffect} from "react";
import {listClasses,} from "@/app/services/class";
import {useSession} from 'next-auth/react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Stack } from '@mui/material';
import {listProperties} from "@/app/services/property";
import {listFields} from "@/app/services/field";
import ClassPropertyManager from "@/app/components/class-properties/ClassPropertyManager";
import Item from "@/app/components/common/Item";

const ClassProperties = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataPayload, setDataPayload] = useState([]);
  const [properties, setProperties] = useState([]);
  const [fields, setFields] = useState([]);
  // @ts-ignore

  if (!session?.currentTenant) {
    return (
      <Stack direction={'column'}>
        <Item sx={{width: '100%', padding: '30px' }}>
          <Box sx={{ boxShadow: 4, padding: '20px', backgroundColor: '#f66', color: '#fff' }}>
            <b>You have not chosen a tenant.</b>
          </Box>
        </Item>
      </Stack>
    );
  }

  const refreshClasses = () => {
    setIsLoading(true);

    listClasses().then((x: any) => {
      setDataPayload(x.sort((a: any, b: any) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const refreshProperties = () => {
    setIsLoading(true);

    listProperties().then((x: any) => {
      setProperties(x.sort((a: any, b: any) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const refreshFields = () => {
    setIsLoading(true);

    listFields().then((x: any) => {
      setFields(x.sort((a: any, b: any) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
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

  if (dataPayload.length === 0) {
    return (
      <Stack direction={'column'}>
        <Item sx={{width: '100%', padding: '30px' }}>
          <Box sx={{ boxShadow: 4, padding: '20px', backgroundColor: '#f66', color: '#fff' }}>
            <b>You have not defined any classes.</b>
          </Box>
        </Item>
      </Stack>
    );
  }

  return (
    <>
      {dataPayload.map((classEntry: any, position: number) => (
        <ClassPropertyManager name={classEntry.name}
                              classId={classEntry.id}
                              properties={properties}
                              fields={fields}
                              key={`${classEntry.id}-${position}`}/>
      ))}
      <div style={{ padding: '6px' }}/>
    </>
  );
}

export default ClassProperties;
