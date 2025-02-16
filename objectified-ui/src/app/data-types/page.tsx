'use client';

import {useState, useEffect} from "react";
import DataListTable from "@/app/components/common/DataListTable";
import {listDataTypes,} from "@/app/services/data-type";
import {tableItems} from "@/app/data-types/index";

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
      <div style={{width: '100%', padding: '10px'}}>
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
