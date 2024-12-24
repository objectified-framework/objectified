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
      console.log(res.data);
      return resolve(res.data);
    }).catch(e => reject(e));
  });
}
