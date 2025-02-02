import RouteHelper from "../../../../lib/RouteHelper";
import {JWT} from "../../../../lib/JWT";
import { getToken } from "next-auth/jwt";
import {
  ClientClassPropertyGetPropertiesForClass,
  ClientClassPropertyDeletePropertyFromClass,
  ClientClassPropertyAddPropertyToClass,
} from '@objectified-framework/objectified-services/dist/generated/clients';

export async function GET(request: any) {
  const helper = new RouteHelper(request);
  const classId = helper.getInputVariable('classId');
  const token = await getToken({ req: request });
  const headers: any = {
    'Authorization': `Bearer ${JWT.encrypt(token)}`,
  };

  if (!classId) {
    return helper.missingFieldResponse('classId');
  }

  const results = await ClientClassPropertyGetPropertiesForClass(classId, headers)
    .then((x: any) => {
      console.log('[class-properties::get] List class properties', x);
      return x;
    }).catch((x: any) => {
      console.log('[class-properties::get] List class properties failed', x);
      return null;
    });

  return helper.createResponse(results);
}

export async function PUT(request: any) {
  const helper = new RouteHelper(request);
  const classId = helper.getInputVariable('classId');
  const propertyId = helper.getInputVariable('propertyId');
  const { payload } = await helper.getPostPayload();
  const token = await getToken({ req: request });
  const headers: any = {
    'Authorization': `Bearer ${JWT.encrypt(token)}`,
  };

  if (!payload) {
    return helper.missingFieldResponse('payload');
  }

  if (!classId || !propertyId) {
    return helper.missingFieldResponse('classId, propertyId');
  }

  const results = await ClientClassPropertyAddPropertyToClass(classId, propertyId, headers)
    .then((x) => {
      console.log('[class-properties::put] Class property add', x);
      return true;
    })
    .catch((x) => {
      console.log('[class-properties::put] Class property add failed', x);
      return false;
    });

  if (results === null) {
    return helper.unauthorizedResponse();
  }

  return helper.createResponse(results);
}

export async function DELETE(request: any) {
  const helper = new RouteHelper(request);
  const classId = helper.getInputVariable('classId');
  const propertyId = helper.getInputVariable('propertyId');
  const token = await getToken({ req: request });
  const headers: any = {
    'Authorization': `Bearer ${JWT.encrypt(token)}`,
  };

  if (!classId || !propertyId) {
    return helper.missingFieldResponse('classId, propertyId');
  }

  const results = await ClientClassPropertyDeletePropertyFromClass(classId, propertyId, headers)
    .then((x) => {
      console.log('[class-properties::delete] Class property deleted', x);
      return true;
    })
    .catch((x) => {
      console.log('[class-properties::delete] Class property delete failed', x);
      return false;
    });

  return helper.createResponse(results);
}
