import { PropertyDto } from '@objectified/objectified-api/dist/generated/dto';

export class PropertyDao {
  constructor(private pg: any) { }

  async getById(id: bigint): Promise<PropertyDto> {
    return null;
  }

  async getByName(name: string, namespaceId: bigint): Promise<PropertyDto> {
    return null;
  }

  async getByFieldId(fieldId: bigint): Promise<PropertyDto[]> {
    return [];
  }

  async getPropertiesForObject(objectId: bigint): Promise<PropertyDto[]> {
    return [];
  }

  // CREATE TABLE obj.property (
  //     id SERIAL NOT NULL PRIMARY KEY,
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     field_id INT NOT NULL REFERENCES obj.field(id),
  //     name VARCHAR(80) NOT NULL,
  //     description VARCHAR(4096) NOT NULL,
  //     required BOOLEAN NOT NULL DEFAULT false,
  //     nullable BOOLEAN NOT NULL DEFAULT false,
  //     is_array BOOLEAN NOT NULL DEFAULT false,
  //     default_value VARCHAR(4096) DEFAULT NULL,
  //     status obj.property_status NOT NULL DEFAULT 'enabled',
  //     indexed BOOLEAN NOT NULL DEFAULT false,
  //     create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  //     update_date TIMESTAMP WITHOUT TIME ZONE,
  //     disable_date TIMESTAMP WITHOUT TIME ZONE
  // );
  //
  // CREATE TABLE obj.object_property (
  //     object_id INT NOT NULL REFERENCES obj.property(id),
  //     property_id INT NOT NULL REFERENCES obj.property(id)
  // );
}