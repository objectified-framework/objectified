import axios from 'axios';

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
