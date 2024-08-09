const DEFAULT_OPTIONS = {
  expiresIn: '30d',
}

export const signJwtAccessToken = (payload: any, options: any = DEFAULT_OPTIONS) => {
  // TODO Sign the JWT Token using the server
  // const secretKey = process.env.JWT_SECRET_KEY;
  // const token = jwt.sign(payload, secretKey!, options);
  // return token;
}

export const verifyJwt = (token: any) => {
  // TODO Verify the JWT Token using the server
  // try {
  //   const secretKey = process.env.JWT_SECRET_KEY;
  //   const decoded = jwt.verify(token, secretKey!);
  //   return decoded;
  // } catch(e) {
  //   return null;
  // }
}