import RouteHelper from "../../../../lib/RouteHelper";
import { ClientDataTypeListDataTypes } from '@objectified-framework/objectified-services/dist/generated/clients';
import { DataTypeDto } from '@objectified-framework/objectified-services/dist/generated/dto';

export async function GET(request: any) {
  const helper = new RouteHelper(request);

  try {
    const response = await ClientDataTypeListDataTypes()
      .then((x) => x)
      .catch((x) => {
        console.log('Unable to get list of data types', x);
        return null;
      });

    if (response) {
      return helper.createResponse({ response });
    }

    return helper.createResponse({});
  } catch(e) {
    return helper.createErrorResponse('Failed to retrieve list of data types.', e);
  }
}
