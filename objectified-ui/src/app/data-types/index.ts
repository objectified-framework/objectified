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
    name: 'coreType',
    description: 'Core',
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
  },
  {
    name: 'data_type',
    description: 'Data Type',
    type: 'enum',
    options: [
      'STRING', 'BOOLEAN', 'NUMBER', 'INTEGER', 'NULL', 'ARRAY', 'OBJECT',
    ],
    required: true,
  },
  {
    name: 'data_format',
    description: 'Data Format',
  },
  {
    name: 'is_array',
    description: 'Is an Array of Data',
    type: 'check',
  },
  {
    name: 'max_length',
    description: 'Max input length',
  },
  {
    name: 'pattern',
    description: 'Regexp Pattern',
  },
  {
    name: 'enum_values',
    description: 'Enumeration Values',
    type: 'array',
  },
  {
    name: 'enum_descriptions',
    description: 'Enumeration Descriptions',
    type: 'array',
  },
  {
    name: 'examples',
    description: 'Examples',
    type: 'array',
  }
];
