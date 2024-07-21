export class NamespaceDao {

  //CREATE TABLE obj.namespace (
  //     id SERIAL NOT NULL PRIMARY KEY,
  //     creatorId INT NOT NULL REFERENCES obj.user(id),
  //     name VARCHAR(80) NOT NULL,
  //     description VARCHAR(4096) NOT NULL,
  //     status obj.namespace_status_enum NOT NULL DEFAULT 'enabled',
  //     create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
  // );
  //
  // CREATE TABLE obj.namespace_user (
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     user_id INT NOT NULL REFERENCES obj.user(id)
  // );
  //
  // CREATE TABLE obj.namespace_group (
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     group_id INT NOT NULL REFERENCES obj.group(id)
  // );
  //
  // CREATE TABLE obj.namespace_class (
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     class_id INT NOT NULL REFERENCES obj.class(id)
  // );
  //
  // CREATE TABLE obj.namespace_data_type (
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     data_type_id INT NOT NULL REFERENCES obj.data_type(id)
  // );
  //
  // CREATE TABLE obj.namespace_field (
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     field_id INT NOT NULL REFERENCES obj.field(id)
  // );
  //
  // CREATE TABLE obj.namespace_property (
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     property_id INT NOT NULL REFERENCES obj.property(id)
  // );
}