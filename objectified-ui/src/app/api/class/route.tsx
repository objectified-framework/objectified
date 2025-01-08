import RouteHelper from "../../../../lib/RouteHelper";
import { getToken } from "next-auth/jwt";
import {JWT} from "../../../../lib/JWT";
import {
  ClientClassListClasses,
  ClientClassGetClassById,
} from '@objectified-framework/objectified-services/dist/generated/clients';

// /class:
// /class/{id}:
export async function GET(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const token = await getToken({ req: request });
  const jwt = JWT.encrypt(token);
  const headers: any = {
    'Authorization': `Bearer ${jwt}`,
  };

  if (!id) {
    const results = await ClientClassListClasses(headers)
      .then((x) => {
        console.log('[class::get] List classes', x);
        return x;
      }).catch((x) => {
        console.log('[class::get] List classes failed', x);
        return null;
      });

    return helper.createResponse(results);
  } else {
    const results = await ClientClassGetClassById(id, headers)
      .then((x) => {
        console.log(`[class::get] Get class ${id}`, x);
        return x;
      }).catch((x) => {
        console.log(`[class::get] Get class ${id} failed`, x);
        return null;
      });

    return helper.createResponse({ results });
  }
}

// /class:
export async function POST(request: any) {
  // const helper = new RouteHelper(request);
  // const { payload } = await helper.getPostPayload();
  // const token = await getToken({ req: request });
  // const jwt = JWT.encrypt(token);
  // const headers: any = {
  //   'Authorization': `Bearer ${jwt}`,
  // };
  //
  // if (!payload) {
  //   return helper.missingFieldResponse('payload');
  // }
  //
  // const results = await ClientFieldCreateField(payload, headers)
  //   .then((x) => {
  //     console.log(`[field::post] Post field`, x);
  //     return x.data;
  //   })
  //   .catch((x) => {
  //     console.log('[field::post] Post field failed', x);
  //     return null;
  //   });
  //
  // return helper.createResponse(results);
}

// /class/{id}:
export async function PUT(request: any) {
  // const helper = new RouteHelper(request);
  // const id = helper.getInputVariable('id');
  // const { payload } = await helper.getPostPayload();
  // const token = await getToken({ req: request });
  // const jwt = JWT.encrypt(token);
  // const headers: any = {
  //   'Authorization': `Bearer ${jwt}`,
  // };
  //
  // if (!payload) {
  //   return helper.missingFieldResponse('payload');
  // }
  //
  // const editPayload: any = {
  //   dataTypeId: payload.dataTypeId,
  //   name: payload.name,
  //   description: payload.description,
  //   defaultValue: payload.defaultValue,
  //   updateDate: new Date(),
  // };
  //
  // const results = await ClientFieldEditFieldById(id, editPayload, headers)
  //   .then((x) => {
  //     console.log('[field::put] Field edited', x);
  //     return true;
  //   })
  //   .catch((x) => {
  //     console.log('[field::put] Field edit failed', x);
  //     return false;
  //   });
  //
  // if (results === null) {
  //   return helper.unauthorizedResponse();
  // }
  //
  // return helper.createResponse(results);
}

// /class/{id}:
export async function DELETE(request: any) {
  // const helper = new RouteHelper(request);
  // const id = helper.getInputVariable('id');
  // const token = await getToken({ req: request });
  // const jwt = JWT.encrypt(token);
  // const headers: any = {
  //   'Authorization': `Bearer ${jwt}`,
  // };
  //
  // if (!id) {
  //   return helper.missingFieldResponse('id');
  // }
  //
  // const results = await ClientFieldDisableFieldById(id, headers)
  //   .then((x) => {
  //     console.log('[field::delete] Field disabled', x);
  //     return true;
  //   })
  //   .catch((x) => {
  //     console.log('[field::delete] Field disable failed', x);
  //     return false;
  //   });
  //
  // return helper.createResponse(results);
}
