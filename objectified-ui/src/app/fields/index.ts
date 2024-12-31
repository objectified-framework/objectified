// These are the table items that will be displayed in the DataListTable.
// Any items omitted from this list will not be shown, even if they're included in the dataset.
import {listDataTypes} from "@/app/services/data-type";

export const tableItems: any[] = [
  {
    name: 'id',
    description: 'Type UUID',
    type: 'uuid',
  },
  {
    name: 'dataTypeId',
    description: 'Data Type ID',
  },
  {
    name: 'name',
    description: 'Name',
  },
  {
    name: 'description',
    description: 'Description',
  },
  {
    name: 'defaultValue',
    description: 'Default',
  },
  {
    name: 'enabled',
    description: 'Enabled',
    type: 'check',
  },
  {
    name: 'createDate',
    description: 'Create Date',
    type: 'date-time',
  },
];

export const formItems: any[] = [
  {
    name: 'name',
    description: 'Field Name',
    required: true,
  },
  {
    name: 'description',
    description: 'Description',
    required: true,
  },
  {
    name: 'dataTypeId',
    description: 'Data Type ID',
    required: true,
    type: 'select',
    dataset: [],
  },
  {
    name: 'defaultValue',
    description: 'Default Value',
  },
];
