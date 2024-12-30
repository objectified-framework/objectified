import RouteHelper from "../../../../lib/RouteHelper";
import { getToken } from "next-auth/jwt";

// /field:
// /field/{id}:
export async function GET(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const token = await getToken({ req: request });

  console.log('JWT Token', token);

  if (!id) {

  } else {

  }
}

// /field:
export async function POST(request: any) {
  const helper = new RouteHelper(request);
  const { payload } = await helper.getPostPayload();
  const token = await getToken({ req: request });

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

  if (!payload) {
    return helper.missingFieldResponse('payload');
  }
}

// /field/{id}:
export async function DELETE(request: any) {
  const helper = new RouteHelper(request);
  const id = helper.getInputVariable('id');
  const token = await getToken({ req: request });

}
