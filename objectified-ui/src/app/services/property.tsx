import axios from 'axios';
import { PropertyDto } from '@objectified-framework/objectified-services/dist/generated/dto';

export const listProperties = () => {
  return new Promise((resolve, reject) => {
    axios.get(`/api/property`, {
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

export const saveProperty = (property: PropertyDto) => {
  return new Promise((resolve, reject) => {
    axios.post(`/api/property`, {
      payload: property,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log('[saveProperty] response', res);

      if (res.data) {
        return resolve(res.data);
      }

      return resolve({});
    }).catch(e => reject(e));
  });
}

export const putProperty = (property: PropertyDto) => {
  return new Promise((resolve, reject) => {
    axios.put(`/api/property?id=${property.id}`, {
      payload: property,
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

export const deleteProperty = (id: string) => {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/property?id=${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log('[deleteProperty] response', res);

      if (res.data) {
        return resolve(res.data);
      }

      return resolve({});
    }).catch(e => reject(e));
  });
}
