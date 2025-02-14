import axios from 'axios';

export const listClassProperties = (classId: string) => {
  return new Promise((resolve, reject) => {
    axios.get(`/api/class-properties?classId=${classId}`, {
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

export const putClassProperties = (classId: string, payload: any) => {
  return new Promise((resolve, reject) => {
    axios.put(`/api/class-properties?classId=${classId}`, {
      payload
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

export const deleteClassProperties = (classId: string, propertyId: string) => {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/class-properties?classId=${classId}&propertyId=${propertyId}`, {
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
