import RouteHelper from "../../../../lib/RouteHelper";
import { getToken } from "next-auth/jwt";
import {JWT} from "../../../../lib/JWT";
import {
  ClientClassListClasses,
  ClientClassGetClassById,
  ClientClassCreateClass,
  ClientClassEditClassById,
  ClientClassDisableClassById,
} from '@objectified-framework/objectified-services/dist/generated/clients';

// /class:
// /class/{id}:
export async function GET(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const token = await getToken({ req: request });
  const headers: any = {
    'Authorization': `Bearer ${JWT.encrypt(token)}`,
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
  const helper = new RouteHelper(request);
  const { payload } = await helper.getPostPayload();
  const token = await getToken({ req: request });
  const headers: any = {
    'Authorization': `Bearer ${JWT.encrypt(token)}`,
  };

  if (!payload) {
    return helper.missingFieldResponse('payload');
  }

  const results = await ClientClassCreateClass(payload, headers)
    .then((x) => {
      console.log(`[class::post] Post class`, x);
      return x.data;
    })
    .catch((x) => {
      console.log('[class::post] Post class failed', x);
      return null;
    });

  return helper.createResponse(results);
}

// /class/{id}:
export async function PUT(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const { payload } = await helper.getPostPayload();
  const token = await getToken({ req: request });
  const headers: any = {
    'Authorization': `Bearer ${JWT.encrypt(token)}`,
  };

  if (!payload) {
    return helper.missingFieldResponse('payload');
  }

  if (!id) {
    return helper.missingFieldResponse('id');
  }

  const editPayload: any = {
    dataTypeId: payload.dataTypeId,
    name: payload.name,
    description: payload.description,
    defaultValue: payload.defaultValue,
  };

  const results = await ClientClassEditClassById(id, editPayload, headers)
    .then((x) => {
      console.log('[class::put] Class edited', x);
      return true;
    })
    .catch((x) => {
      console.log('[class::put] Class edit failed', x);
      return false;
    });

  if (results === null) {
    return helper.unauthorizedResponse();
  }

  return helper.createResponse(results);
}

// /class/{id}:
export async function DELETE(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const token = await getToken({ req: request });
  const headers: any = {
    'Authorization': `Bearer ${JWT.encrypt(token)}`,
  };

  if (!id) {
    return helper.missingFieldResponse('id');
  }

  const results = await ClientClassDisableClassById(id, headers)
    .then((x) => {
      console.log('[class::delete] Class disabled', x);
      return true;
    })
    .catch((x) => {
      console.log('[class::delete] Class disable failed', x);
      return false;
    });

  return helper.createResponse(results);
}
