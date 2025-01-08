import axios from 'axios';

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
