import RouteHelper from "../../../../lib/RouteHelper";
import { ClientDataTypeListDataTypes,
  ClientDataTypeCreateDataType,
  ClientDataTypeGetDataTypeById,
  ClientDataTypeDisableDataType } from '@objectified-framework/objectified-services/dist/generated/clients';
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
    return helper.createErrorResponse('Failed to save data type', e);
  }
}

export async function DELETE(request: any) {
  const helper = new RouteHelper(request);

  try {
    const dataTypeId = helper.getInputVariable('id');

    if (!dataTypeId) {
      return helper.missingFieldResponse('id');
    }

    const originalObject = await ClientDataTypeGetDataTypeById(dataTypeId)
      .then((x) => x)
      .catch((x) => null);

    if (!originalObject) {
      console.log(`Original object not found by ID ${dataTypeId}`);
      return helper.createResponse('Data type not found', 404);
    }

    if (originalObject.coreType) {
      console.log(`Data Type ID ${dataTypeId} is a core type and cannot be disabled`);
      return helper.unauthorizedResponse();
    }

    if (!originalObject.enabled) {
      console.log(`Data Type ID ${dataTypeId} already disabled`);
      return helper.createResponse('Data type already deleted', 201);
    }

    return await ClientDataTypeDisableDataType(dataTypeId)
      .then((x) => {
        console.log(`Data type by ID ${dataTypeId} disabled.`, x);
        return helper.createResponse('Data type disabled', 201);
      })
      .catch((x) => {
        console.log(`Unable to disable data type by ID ${dataTypeId}`, x);
        return helper.unauthorizedResponse();
      });
  } catch (e) {
    return helper.createErrorResponse('Failed to delete data type', e);
  }
}
