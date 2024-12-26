import RouteHelper from "../../../../lib/RouteHelper";
import { ClientDataTypeListDataTypes, ClientDataTypeCreateDataType } from '@objectified-framework/objectified-services/dist/generated/clients';
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

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    const { payload } = await helper.getPostPayload();

    if (!payload) {
      return helper.missingFieldResponse('payload');
    }

    const dataTypeDto: DataTypeDto = {
      ...payload,
    };

    const response = await ClientDataTypeCreateDataType(dataTypeDto)
      .then((x) => x)
      .catch((x) => {
        console.log('Error', x);
        return null;
      });

    return helper.createResponse({ response });
  } catch (e) {
    return helper.createErrorResponse('Failed to save user', e);
  }
}
