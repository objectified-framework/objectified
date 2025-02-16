import RouteHelper from "../../../../lib/RouteHelper";
import {JWT} from "../../../../lib/JWT";
import {
  ClientSignupSaveSignup,
} from '@objectified-framework/objectified-services/dist/generated/clients';

export async function POST(request: any) {
  const helper = new RouteHelper(request);
  const { payload } = await helper.getPostPayload();

  if (!payload) {
    return helper.missingFieldResponse('payload');
  }

  try {
    const results = await ClientSignupSaveSignup(payload)
      .then((x: any) => {
        console.log(`[signup::post] Post signup`, x);
        return true;
      })
      .catch((x: any) => {
        console.log('[signup::post] Post signup failed', x);
        return false;
      });

    return helper.createResponse(results);
  } catch(e: any) {
    console.log('[signup::post] Post signup failed', e);
    return helper.createResponse(false);
  }
}
