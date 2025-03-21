// These are the table items that will be displayed in the DataListTable.
// Any items omitted from this list will not be shown, even if they're included in the dataset.
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
    name: 'description',
    description: 'Description',
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
  {
    name: 'updateDate',
    description: 'Updated',
    type: 'date-time',
  },
];

export const formItems: any[] = [
  {
    name: 'name',
    description: 'Data Type Name',
    required: true,
    pattern: '^[A-Za-z_][A-Za-z0-9_]*$',
    helperText: 'Value must start with a letter.',
  },
  {
    name: 'description',
    description: 'Description',
    required: true,
    multiline: true,
    maxRows: 4,
    pattern: '^[\x00-\x7F]+$',
    helperText: 'Value must contain printable ASCII characters.',
  },
];
