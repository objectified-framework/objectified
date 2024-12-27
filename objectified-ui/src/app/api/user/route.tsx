import RouteHelper from "../../../../lib/RouteHelper";
import { ClientUserPutUser } from '@objectified-framework/objectified-services/dist/generated/clients';
import { UserDto } from '@objectified-framework/objectified-services/dist/generated/dto';

export async function PUT(request: any) {
  const helper = new RouteHelper(request);

  try {
    const { id, data } = await helper.getPostPayload();

    if (!id || !data) {
      return helper.missingFieldResponse('id, data');
    }

    const userDto: UserDto = {
      id,
      data,
    };

    const response = await ClientUserPutUser(userDto)
      .then((x) => x.data)
      .catch((x) => {
        console.log('Error', x);
        return null;
      });

    return helper.createResponse({ response });
  } catch (e) {
    return helper.createErrorResponse('Failed to save user', e);
  }
}
