import {Components} from '../schema/Components';

export class ApiSpec {
  private components: Components;
  // private paths: Paths;

  constructor(private readonly segment: any) {
    this.components = new Components(segment);
  }

  public setComponents = (components: Components) => this.components = components;

  public getComponents = (): Components => this.components;
}