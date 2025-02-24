// These are the table items that will be displayed in the DataListTable.
// Any items omitted from this list will not be shown, even if they're included in the dataset.
import {listDataTypes} from "@/app/services/data-type";

export const tableItems: any[] = [
  {
    name: 'id',
    description: 'ID',
    type: 'uuid',
  },
  {
    name: 'name',
    description: 'Name',
  },
  {
    name: 'dataTypeId',
    description: 'Type',
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
    helperText: 'Value must start with a letter.',
    pattern: '^[A-Za-z_][A-Za-z0-9_]*$',
  },
  {
    name: 'description',
    description: 'Description',
    required: true,
    helperText: 'Value must contain printable ASCII characters.',
    pattern: '^[\x00-\x7F]+$'
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
    helperText: 'Value must start with a letter.',
    pattern: '^[A-Za-z_][A-Za-z0-9_]*$',
  },
  {
    name: 'pattern',
    description: 'Regexp Pattern',
    helperText: 'Value must contain printable ASCII characters.',
    pattern: '^[\x00-\x7F]+$'
  },
  {
    name: 'enumValues',
    description: 'Enumeration Values',
    type: 'array',
    helperText: 'Value must start with a letter.',
    pattern: '^[A-Z_][A-Z0-9_]*$',
  },
  {
    name: 'enumDescriptions',
    description: 'Enumeration Descriptions',
    type: 'array',
    helperText: 'Value must contain printable ASCII characters.',
    pattern: '^[\x00-\x7F]+$'
  },
  {
    name: 'examples',
    description: 'Examples',
    type: 'array',
    helperText: 'Value must contain printable ASCII characters.',
    pattern: '^[\x00-\x7F]+$'
  }
];
