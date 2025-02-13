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
