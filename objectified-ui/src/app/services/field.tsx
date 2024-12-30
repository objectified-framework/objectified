import axios from 'axios';

export const listFields = () => {
  return new Promise((resolve, reject) => {
    axios.get(`/api/field`, {
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
