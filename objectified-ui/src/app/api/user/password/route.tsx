import RouteHelper from "../../../../../lib/RouteHelper";
import { ClientUserPutUserPassword } from '@objectified-framework/objectified-services/dist/generated/clients';
import { UserPasswordDto } from '@objectified-framework/objectified-services/dist/generated/dto';
import {JWT} from "../../../../../lib/JWT";
import { getToken } from "next-auth/jwt";

export async function PUT(request: any) {
  const helper = new RouteHelper(request);
  const token = await getToken({ req: request });
  const headers: any = {
    'Authorization': `Bearer ${JWT.encrypt(token)}`,
  };

  try {
    const { data } = await helper.getPostPayload();

    if (!data) {
      return helper.missingFieldResponse('data');
    }

    const userPasswordDto: UserPasswordDto = {
      currentPassword: data.currentPassword,
      password1: data.password1,
      password2: data.password2,
    };

    const response = await ClientUserPutUserPassword(userPasswordDto, headers)
      .then((x) => x.data)
      .catch((x) => {
        console.log('Error', x);
        return x;
      });

    return helper.createResponse({ response });
  } catch (e) {
    return helper.createErrorResponse('Failed to save user', e);
  }
}
