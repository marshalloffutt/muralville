import axios from 'axios';
import { EsriProvider } from 'leaflet-geosearch';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const provider = new EsriProvider();

const getMurals = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/murals.json`)
    .then((res) => {
      let murals = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          murals.push(res.data[key]);
        });
        let counter = 0;
        murals.forEach((indivMural) => {
          provider.search({ query: indivMural.address })
            .then((stuff) => {
              const { x, y } = stuff[0];
              counter += 1;
              murals = murals.map(mural => Object.assign({ ...mural, x, y }));
              if (counter === murals.length - 1) {
                resolve(murals);
              }
            });
        });
      }
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
