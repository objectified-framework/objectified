// These are the table items that will be displayed in the DataListTable.
// Any items omitted from this list will not be shown, even if they're included in the dataset.
export const tableItems: any[] = [
  {
    name: 'id',
    description: 'Type UUID',
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
    description: 'Create Date',
    type: 'date-time',
  },
];

export const formItems: any[] = [
  {
    name: 'name',
    description: 'Data Type Name',
    required: true,
  },
  {
    name: 'description',
    description: 'Description',
    required: true,
    multiline: true,
    maxRows: 4,
  },
];
