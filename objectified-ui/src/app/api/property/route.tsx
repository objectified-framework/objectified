import RouteHelper from "../../../../lib/RouteHelper";
import { getToken } from "next-auth/jwt";
import {JWT} from "../../../../lib/JWT";
import { ClientPropertyListProperties,
} from '@objectified-framework/objectified-services/dist/generated/clients';

export async function GET(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const token = await getToken({ req: request });
  const jwt = JWT.encrypt(token);
  const headers: any = {
    'Authorization': `Bearer ${jwt}`,
  };

  if (!id) {
    const results = await ClientPropertyListProperties(headers)
      .then((x) => {
        console.log('[property::get] List properties', x);
        return x;
      }).catch((x) => {
        console.log('[property::get] List properties failed', x);
        return null;
      });

    return helper.createResponse(results);
  // } else {
  //   const results = await ClientFieldGetFieldById(id, headers)
  //     .then((x) => {
  //       console.log(`[field::get] Get field ${id}`, x);
  //       return x;
  //     }).catch((x) => {
  //       console.log(`[field::get] Get field ${id} failed`, x);
  //       return null;
  //     });
  //
  //   return helper.createResponse({ results });
  }
}
