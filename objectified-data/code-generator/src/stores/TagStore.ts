export class TagStore {
  private name: string;
  private description: string;

  constructor(private readonly segment: any) {
    this.name = null;
    this.description = null;
  }

  public getName = (): string => this.name;
  public getDescription = (): string => this.description;

  public setName = (name: string) => this.name = name;
  public setDescription = (description: string) => this.description = description;
}