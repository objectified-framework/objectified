import axios from 'axios';

export const putUser = (id: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios.put(`/api/user`, {
      id,
      data,
    }, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      return resolve(data);
    }).catch(e => reject(e));
  });
}

export const putPassword = (id: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios.put(`/api/user/password`, {
      id,
      data,
    }, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      return resolve(res.data);
    }).catch(e => reject(e));
  });
}