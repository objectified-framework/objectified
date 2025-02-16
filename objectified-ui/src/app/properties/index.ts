// These are the table items that will be displayed in the DataListTable.
// Any items omitted from this list will not be shown, even if they're included in the dataset.
export const tableItems: any[] = [
  {
    name: 'id',
    description: 'ID',
    type: 'uuid',
  },
  {
    name: 'fieldId',
    description: 'Field',
  },
  {
    name: 'classId',
    description: '$REF',
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
    description: 'Created',
    type: 'date-time',
  },
];

export const formItems: any[] = [
  {
    name: 'fieldId',
    description: 'Field ID',
    type: 'autocomplete',
    dataset: [],
  },
  {
    name: 'classId',
    description: 'Class ID',
    type: 'autocomplete',
    dataset: [],
  },
  {
    name: 'name',
    description: 'Property Name',
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
    multiline: true,
    maxRows: 4,
  },
  {
    name: 'constraints',
    description: 'Constraints',
    multiline: true,
    maxRows: 4,
    type: 'object',
  },
];

