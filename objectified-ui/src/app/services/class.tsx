import axios from 'axios';
import { ClassDto } from '@objectified-framework/objectified-services/dist/generated/dto';

export const listClasses = () => {
  return new Promise((resolve, reject) => {
    axios.get('/api/class', {
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

export const saveClass = (cls: ClassDto) => {
  return new Promise((resolve, reject) => {
    axios.post(`/api/class`, {
      payload: cls,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log('[saveClass] response', res);

      if (res.data) {
        return resolve(res.data);
      }

      return resolve({});
    }).catch(e => reject(e));
  });
}

export const putClass = (cls: ClassDto) => {
  return new Promise((resolve, reject) => {
    axios.put(`/api/class?id=${cls.id}`, {
      payload: cls
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.data) {
        return resolve(res.data);
      }

      return reject('Duplicate entry');
    }).catch(e => reject(e));
  });
}
