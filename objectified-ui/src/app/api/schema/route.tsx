import RouteHelper from "../../../../lib/RouteHelper";
import {JWT} from "../../../../lib/JWT";
import { getToken } from "next-auth/jwt";
import axios from 'axios';

const ClientGetClassSchemaById = async (id: string, headers?: any,) => {
  console.log(`[ClientGetClassSchemaById] Requesting /class/{id}/schema`);

  const requestUrl = process.env.SERVICE_URL ?? 'http://localhost:3001';
  const config = {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  };

  return axios.get(`${requestUrl}/class/${id}/schema`, config)
    .then((x) => x.data)
    .catch((x) => {
      console.error('Request failed', x);
      return Promise.reject(x);
    });
};

export async function GET(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const token = await getToken({ req: request });
  const headers: any = {
    'Authorization': `Bearer ${JWT.encrypt(token)}`,
  };

  if (!id) {
    return helper.missingFieldResponse('id');
  }

  const results = await ClientGetClassSchemaById(id, headers)
    .then((x) => {
      console.log(`[schema::get] Get class ${id}`, x);
      return x;
    }).catch((x) => {
      console.log(`[schema::get] Get class ${id} failed`, x);
      return null;
    });

  return helper.createResponse({ results });
}
