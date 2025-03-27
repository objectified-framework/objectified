'use client';

import {useState, useEffect} from "react";
import {listClasses,} from "@/app/services/class";
import {useSession} from 'next-auth/react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Stack, Button, Typography } from '@mui/material';
import {listProperties} from "@/app/services/property";
import {listFields} from "@/app/services/field";
import ClassPropertyManager from "@/app/components/class-properties/ClassPropertyManager";
import HelpIcon from '@mui/icons-material/Help';
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
      <>
        <div style={{ width: '100%', height: '36px', borderBottom: '1px solid #ccc', padding: '4px' }}>
          <Stack direction={'row'}>
            <div style={{ width: '50%', textAlign: 'left', }}>
            </div>

            <div style={{ width: '50%', textAlign: 'right', paddingRight: '10px' }}>
              <Button style={{
                height: '24px', borderRadius: 2,
                color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                      className={'bg-slate-200'}
                      variant={'contained'} startIcon={<HelpIcon/>}
                      onClick={() => window.open('https://docs.objectified.dev/docs/ui/class-properties', '_none')}>
                <Typography className={'font-thin text-xs'} textTransform={'none'}>
                  Help
                </Typography>
              </Button>
            </div>
          </Stack>
        </div>

        <Stack direction={'column'}>
          <Item sx={{width: '100%', padding: '30px' }}>
            <Box sx={{ boxShadow: 4, padding: '20px', backgroundColor: '#f66', color: '#fff' }}>
              <b>You have not defined any classes.</b>
            </Box>
          </Item>
        </Stack>
      </>
    );
  }

  return (
    <>
      <div style={{ width: '100%', height: '36px', borderBottom: '1px solid #ccc', padding: '4px' }}>
        <Stack direction={'row'}>
          <div style={{ width: '50%', textAlign: 'left', }}>
          </div>

          <div style={{ width: '50%', textAlign: 'right', paddingRight: '10px' }}>
            <Button style={{
              height: '24px', borderRadius: 2,
              color: 'black', border: '1px solid #ccc', paddingLeft: '6px', paddingRight: '6px' }}
                    className={'bg-slate-200'}
                    variant={'contained'} startIcon={<HelpIcon/>}
                    onClick={() => window.open('https://docs.objectified.dev/docs/ui/class-properties', '_none')}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Help
              </Typography>
            </Button>
          </div>
        </Stack>
      </div>

      {dataPayload.map((classEntry: any, position: number) => (
        <>
          {position > 0 && (
            <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}></div>
          )}

          <ClassPropertyManager name={classEntry.name}
                                classId={classEntry.id}
                                properties={properties}
                                fields={fields}
                                key={`${classEntry.id}-${position}`}/>
        </>
      ))}
      <div style={{ padding: '6px' }}/>
    </>
  );
}

export default ClassProperties;
