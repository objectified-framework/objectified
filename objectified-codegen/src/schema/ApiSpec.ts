import {Components} from '../schema/Components';
import {Path} from './Path';
import {ServerStore} from '../stores/ServerStore';

export class ApiSpec {
  private components: Components;
  private paths: Path[];
  private servers: ServerStore[];

  constructor(private readonly segment: any) {
    this.components = new Components(segment);
    this.paths = [];
    this.servers = [];

    const pathList = Object.keys(segment['paths']);

    console.log(`[ApiSpec] Processing ${pathList.length} paths`);

    for(const pathUrl of pathList) {
      const path = segment['paths'][pathUrl];
      const pathVerbs = Object.keys(segment['paths'][pathUrl]);

      for(const pathVerb of pathVerbs) {
        const pathWithVerb = path[pathVerb];

        this.paths.push(new Path(pathUrl, pathVerb, pathWithVerb));
      }
    }

    for(const server of segment['servers'] ?? []) {
      this.servers.push(new ServerStore(server));
    }

    throw new Error('Top level tags not yet parsed');
    throw new Error('Top level security not yet parsed');
    throw new Error('Top level info not yet parsed');
  }

  public setComponents = (components: Components) => this.components = components;
  public setPaths = (paths: Path[]) => this.paths = paths;
  public setServer = (servers: ServerStore[]) => this.servers = servers;

  public getComponents = (): Components => this.components;
  public getPaths = (): Path[] => this.paths;
  public getServers = (): ServerStore[] => this.servers;
}
