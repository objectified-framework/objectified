'use client';

import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {listDataTypes,} from "@/app/services/data-type";
import {tableItems} from "@/app/data-types/index";
import HelpIcon from '@mui/icons-material/Help';
import {
  Typography, Button, Stack,
} from "@mui/material";

const DataTypes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataPayload, setDataPayload] = useState([]);

  const refreshDataTypes = () => {
    setIsLoading(true);

    listDataTypes().then((x: any) => {
      setDataPayload(x);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    refreshDataTypes();
  }, []);

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
                    onClick={() => window.open('https://docs.objectified.dev/docs/ui/data-types', '_none')}>
              <Typography className={'font-thin text-xs'} textTransform={'none'}>
                Help
              </Typography>
            </Button>
          </div>
        </Stack>
      </div>

      <div style={{width: '100%', padding: '0px'}}>
        <DataListTable header={'System Data Types'}
                       columns={tableItems}
                       dataset={dataPayload}
                       isLoading={isLoading}
                       isAddable={false}
                       onRefresh={() => refreshDataTypes()}
                       isEditable={(x) => false}
                       isDeletable={(x) => false}
        />
      </div>
    </>
  );
}

export default DataTypes;
