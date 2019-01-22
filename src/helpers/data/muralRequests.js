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

export default {
  getMurals,
  firebaseUrl,
};
