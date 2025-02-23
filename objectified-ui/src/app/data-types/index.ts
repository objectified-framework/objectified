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
    pattern: '^[A-Za-z_][A-Za-z0-9_]*$',
  },
  {
    name: 'description',
    description: 'Description',
    pattern: '^[\x00-\x7F]+$'
  },
  {
    name: 'dataType',
    description: 'Data type',
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
