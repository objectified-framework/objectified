import axios from 'axios';

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
