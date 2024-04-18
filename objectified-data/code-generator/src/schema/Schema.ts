import {PropertyStore} from '../stores/PropertyStore';

export class Schema {
  private name: string;
  private type: string;
  private description: string;
  private required: string[];
  private properties: PropertyStore[];

  constructor(private readonly segment: any) {
    console.log(`[Schema] Segment: ${JSON.stringify(segment, null, 2)}`);
  }

  public setName = (name: string) => this.name = name;
  public setType = (type: string) => this.type = type;
  public setDescription = (description: string) => this.description = description;
  public setRequired = (required: string[]) => this.required = required;
  public setProperties = (properties: PropertyStore[]) => this.properties = properties;

  public getName = (): string => this.name;
  public getType = (): string => this.type;
  public getDescription = (): string => this.description;
  public getRequired = (): string[] => this.required;
  public getProperties = (): PropertyStore[] => this.properties;

  public isObject = (): boolean => this.type != null && this.type.toLowerCase() === 'object';

  public addRequired = (required: string) => this.required.push(required);
  public addProperty = (property: PropertyStore) => this.properties.push(property);
}