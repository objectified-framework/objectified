import {Components} from '../schema/Components';
import {Path} from './Path';
import {ServerStore} from '../stores/ServerStore';
import {TagStore} from '../stores/TagStore';
import {Info} from './Info';

export class ApiSpec {
  private components: Components;
  private paths: Path[];
  private servers: ServerStore[];
  private tags: TagStore[];
  private info: Info;

  constructor(private readonly segment: any) {
    this.components = new Components(segment);
    this.paths = [];
    this.servers = [];
    this.tags = [];

    const pathList = Object.keys(segment['paths']);

    console.log(`[ApiSpec] Processing ${pathList.length} paths`);

    // Parse the "path" section of the OpenAPI document
    for(const pathUrl of pathList) {
      const path = segment['paths'][pathUrl];
      const pathVerbs = Object.keys(segment['paths'][pathUrl]);

      for(const pathVerb of pathVerbs) {
        const pathWithVerb = path[pathVerb];

        this.paths.push(new Path(pathUrl, pathVerb, pathWithVerb));
      }
    }

    // Parse the "servers" section of the OpenAPI document
    for(const server of segment['servers'] ?? []) {
      this.servers.push(new ServerStore(server));
    }

    // Parse the "tags" section of the OpenAPI document
    for(const tag of segment['tags'] ?? []) {
      this.tags.push(new TagStore(tag));
    }

    if (segment['info']) {
      this.info = new Info(segment['info']);
    }

    throw new Error('Top level security not yet parsed');
  }

  public setComponents = (components: Components) => this.components = components;
  public setPaths = (paths: Path[]) => this.paths = paths;
  public setServer = (servers: ServerStore[]) => this.servers = servers;

  public getComponents = (): Components => this.components;
  public getPaths = (): Path[] => this.paths;
  public getServers = (): ServerStore[] => this.servers;
}
