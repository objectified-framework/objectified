// These are the table items that will be displayed in the DataListTable.
// Any items omitted from this list will not be shown, even if they're included in the dataset.
export const tableItems: any[] = [
  {
    name: 'id',
    description: 'Property UUID',
    type: 'uuid',
  },
  {
    name: 'fieldId',
    description: 'Field UUID',
    type: 'uuid',
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
    name: 'required',
    description: 'Required',
    type: 'check',
  },
  {
    name: 'nullable',
    description: 'Nullable',
    type: 'check',
  },
  {
    name: 'isArray',
    description: 'Array',
    type: 'check',
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
    name: 'fieldId',
    description: 'Field ID',
    required: true,
    type: 'autocomplete',
    dataset: [],
  },
  {
    name: 'name',
    description: 'Data Type Name',
    required: true,
  },
  {
    name: 'description',
    description: 'Description',
    required: true,
  },
  {
    name: 'required',
    description: 'Value required',
    type: 'check',
  },
  {
    name: 'nullable',
    description: 'Value is nullable',
    type: 'check',
  },
  {
    name: 'isArray',
    description: 'Value contains array data',
    type: 'check',
  },
  {
    name: 'defaultValue',
    description: 'Default value',
  },
];

