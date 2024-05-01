import {PropertyStore} from './PropertyStore';
import {Schema} from '../schema/Schema';

export class ResponseStore {
  private description: string;
  private content: [string, Schema];

  constructor(private readonly responseCode: string, private readonly segment: any) {
    console.log(`[ResponseStore] responseCode=${responseCode} segment=${JSON.stringify(segment, null, 2)}`);

    throw new Error('ResponseStore not yet handled');
  }

  public getDescription = (): string => this.description;
  public getContent = (contentType: string): Schema => this.content[contentType];

  public getContentTypes = (): string[] => (this.content != null && Object.keys(this.content)) ?? [];

  public setDescription = (description: string) => this.description = description;
  public setContent = (contentType: string, store: Schema) => this.content[contentType] = store;
}