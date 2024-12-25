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
      return resolve(JSON.parse(res.data.response));
    }).catch(e => reject(e));
  });
}
