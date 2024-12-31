import RouteHelper from "../../../../lib/RouteHelper";
import { getToken } from "next-auth/jwt";
import {JWT} from "../../../../lib/JWT";
import { ClientFieldListFields } from '@objectified-framework/objectified-services/dist/generated/clients';

// /field:
// /field/{id}:
export async function GET(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const token = await getToken({ req: request });
  const jwt = JWT.encrypt(token);
  const headers: any = {
    'Authorization': `Bearer ${jwt}`,
  };

  if (!id) {
    const results = await ClientFieldListFields(headers)
      .then((x) => {
        console.log('[field::get] List fields', x);
        return x.data;
      }).catch((x) => {
        console.log('[field::get] List fields failed', x);
        return null;
      });

    return helper.createResponse({ results });
  } else {

  }
}

// /field:
export async function POST(request: any) {
  const helper = new RouteHelper(request);
  const { payload } = await helper.getPostPayload();
  const token = await getToken({ req: request });
  const jwt = JWT.encrypt(token);
  const headers: any = {
    'Authorization': `Bearer ${jwt}`,
  };

  if (!payload) {
    return helper.missingFieldResponse('payload');
  }
}

// /field/{id}:
export async function PUT(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const { payload } = await helper.getPostPayload();
  const token = await getToken({ req: request });
  const jwt = JWT.encrypt(token);
  const headers: any = {
    'Authorization': `Bearer ${jwt}`,
  };

  if (!payload) {
    return helper.missingFieldResponse('payload');
  }
}

// /field/{id}:
export async function DELETE(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const token = await getToken({ req: request });
  const jwt = JWT.encrypt(token);
  const headers: any = {
    'Authorization': `Bearer ${jwt}`,
  };

}
