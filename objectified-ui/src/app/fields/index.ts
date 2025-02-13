// These are the table items that will be displayed in the DataListTable.
// Any items omitted from this list will not be shown, even if they're included in the dataset.
import {listDataTypes} from "@/app/services/data-type";

export const tableItems: any[] = [
  {
    name: 'id',
    description: 'Field ID',
    type: 'uuid',
  },
  {
    name: 'dataTypeId',
    description: 'Type ID',
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
    name: 'dataFormat',
    description: 'Data Format',
  },
  {
    name: 'enabled',
    description: 'Enabled',
    type: 'check',
  },
  {
    name: 'createDate',
    description: 'Created',
    type: 'date-time',
  },
];

// Dataset for the selector must be changed programmatically, typically via a useState or useEffect.
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
    type: 'autocomplete',
    dataset: [],
  },
  {
    name: 'dataFormat',
    description: 'Data Format',
  },
  {
    name: 'pattern',
    description: 'Regexp Pattern',
  },
  {
    name: 'enumValues',
    description: 'Enumeration Values',
    type: 'array',
  },
  {
    name: 'enumDescriptions',
    description: 'Enumeration Descriptions',
    type: 'array',
  },
  {
    name: 'examples',
    description: 'Examples',
    type: 'array',
  }
];
