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
import ClassPropertyManager from "@/app/components/class-properties/ClassPropertyManager";

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
      {dataPayload.map((classEntry: any) => (
        <ClassPropertyManager name={classEntry.name}
                              classId={classEntry.id}
                              properties={properties}
                              fields={fields}/>
      ))}
    </>
  );
}

export default ClassProperties;
