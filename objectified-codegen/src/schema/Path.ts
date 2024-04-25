export class Path {
  private operation: string;
  private pathUrl: string;
  private tags: string[];
  private summary: string;
  private operationId: string;
  private description: string;
  // private security: SecurityStore[];
  // private requestBody: RequestBodyStore;
  // private responses: ResponseStore[];

  constructor(pathUrl: string, operation: string, private readonly segment: any) {
    this.operation = operation;
    this.pathUrl = pathUrl;

    if (!segment['tags']) {
      throw new Error(`Verb '${operation}' contains no associated Tags`);
    }

    if (!segment['responses']) {
      throw new Error(`Verb '${operation}' contains no defined responses`);
    }

    if (!segment['operationId']) {
      throw new Error(`Verb '${operation}' missing operationId`);
    }

    console.log(`[Path]: url=${pathUrl} operation=${operation}`);

    this.tags = segment['tags'];
    this.summary = segment['summary'] ?? null;
    this.operationId = segment['operationId'];
    this.description = segment['description'] ?? null;
  }
}