import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getMurals = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/murals.json`)
    .then((res) => {
      const listings = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          listings.push(res.data[key]);
        });
      }
      resolve(listings);
    })
    .catch(err => reject(err));
});

const deleteMuralAxios = muralId => axios.delete(`${firebaseUrl}/murals/${muralId}.json`);

const addMuralAxios = newMural => axios.post(`${firebaseUrl}/murals.json`, newMural);

const editMuralAxios = (muralId, mural) => axios.put(`${firebaseUrl}/murals/${muralId}.json`, mural);

export default {
  getMurals,
  firebaseUrl,
  deleteMuralAxios,
  addMuralAxios,
  editMuralAxios,
};
