import axios from 'axios';
import { SignupDto } from '@objectified-framework/objectified-services/dist/generated/dto';

export const saveSignup = (cls: SignupDto) => {
  return new Promise((resolve, reject) => {
    axios.post(`/api/signup`, {
      payload: cls,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res: any) => {
      if (res.data) {
        return resolve(res.data);
      }

      return resolve({});
    }).catch((e: any) => reject(e));
  });
}
