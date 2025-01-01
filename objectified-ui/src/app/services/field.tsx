import axios from 'axios';
import { FieldDto } from '@objectified-framework/objectified-services/dist/generated/dto';

export const listFields = () => {
  return new Promise((resolve, reject) => {
    axios.get(`/api/field`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.data) {
        return resolve(res.data);
      }

      return resolve({});
    }).catch(e => reject(e));
  });
}

export const saveField = (field: FieldDto) => {
  return new Promise((resolve, reject) => {
    axios.post(`/api/field`, {
      payload: field,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log('[saveField] response', res);

      if (res.data) {
        return resolve(res.data);
      }

      return resolve({});
    }).catch(e => reject(e));
  });
}
