import axios from 'axios';
import { DataTypeDto } from '@objectified-framework/objectified-services/dist/generated/dto';

export const listDataTypes = () => {
  return new Promise((resolve, reject) => {
    axios.get(`/api/data-type`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.data && res.data.response) {
        return resolve(res.data.response);
      }

      return resolve({});
    }).catch(e => reject(e));
  });
}

export const saveDataType = (dataType: DataTypeDto) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/data-type', {
      payload: dataType
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.data && res.data.response) {
        return resolve(res.data.response);
      }

      return resolve({});
    }).catch(e => reject(e));
  });
}

export const deleteDataType = (id: string) => {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/data-type?id=${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.data && res.data.response) {
        return resolve(res.data.response);
      }

      return resolve({});
    }).catch(e => reject(e));
  });
}
