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
  },
  {
    name: 'dataType',
    description: 'Data Type',
    type: 'enum',
    options: [
      'STRING', 'BOOLEAN', 'NUMBER', 'INTEGER', 'NULL', 'ARRAY', 'OBJECT',
    ],
    required: true,
  },
  {
    name: 'dataFormat',
    description: 'Data Format',
  },
  {
    name: 'isArray',
    description: 'Is an Array of Data',
    type: 'check',
  },
  {
    name: 'maxLength',
    description: 'Max input length',
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
