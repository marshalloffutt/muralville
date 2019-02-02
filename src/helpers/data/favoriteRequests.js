import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllFavorites = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/favorites.json`)
    .then((res) => {
      const favorites = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          favorites.push(res.data[key]);
        });
      }
      resolve(favorites);
    })
    .catch(err => reject(err));
});

const addFavoriteAxios = favoriteId => axios.delete(`${firebaseUrl}/favorites/${favoriteId}.json`);

const deleteFavoriteAxios = newFavorite => axios.post(`${firebaseUrl}/favorites.json`, newFavorite);

export default {
  getAllFavorites,
  addFavoriteAxios,
  deleteFavoriteAxios,
};
