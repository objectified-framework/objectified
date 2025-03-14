import RouteHelper from "../../../../lib/RouteHelper";
import { getToken } from "next-auth/jwt";
import {JWT} from "../../../../lib/JWT";
import {
  ClientPropertyListProperties,
  ClientPropertyCreateProperty,
  ClientPropertyEditPropertyById,
  ClientPropertyDisablePropertyById,
} from '@objectified-framework/objectified-services/dist/generated/clients';

export async function GET(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const token = await getToken({ req: request });
  const headers: any = {
    'Authorization': `Bearer ${JWT.encrypt(token)}`,
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

  const results = await ClientPropertyCreateProperty(payload, headers)
    .then((x) => {
      console.log(`[property::post] Post field`, x);
      return x.data;
    })
    .catch((x) => {
      console.log('[property::post] Post field failed', x);
      return null;
    });

  return helper.createResponse(results);
}

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
    tenantId: payload.tenantId,
    fieldId: payload.fieldId,
    classId: payload.classId,
    name: payload.name,
    description: payload.description,
    required: payload.required ?? false,
    nullable: payload.nullable ?? false,
    isArray: payload.isArray ?? false,
    defaultValue: payload.defaultValue,
    constraints: payload.constraints ?? {},
  };

  const results = await ClientPropertyEditPropertyById(id, editPayload, headers)
    .then((x) => {
      console.log('[property::put] Property edited', x);
      return true;
    })
    .catch((x) => {
      console.log('[property::put] Property edit failed', x);
      return false;
    });

  if (results === null) {
    return helper.unauthorizedResponse();
  }

  return helper.createResponse(results);
}

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

  const results = await ClientPropertyDisablePropertyById(id, headers)
    .then((x) => {
      console.log('[property::delete] Property disabled', x);
      return true;
    })
    .catch((x) => {
      console.log('[property::delete] Property disable failed', x);
      return false;
    });

  return helper.createResponse(results);
}
