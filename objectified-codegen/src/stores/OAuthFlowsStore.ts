export class OAuthFlowsStore {
  private authorizationUrl: string;
  private tokenUrl: string;
  private refreshUrl: string;
  private scopes: any;

  public constructor(private readonly flowType: string, private readonly segment: any) {
    const lowerFlowType = flowType.toLowerCase();

    switch(lowerFlowType) {
      case 'implicit':
        break;

      case 'authorizationcode':
        break;

      case 'password':
        break;

      case 'clientcredentials':
        break;

      default:
        throw new Error(`Flow type '${flowType}' unsupported in flows store`);
    }
  }
}