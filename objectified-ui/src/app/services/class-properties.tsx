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
