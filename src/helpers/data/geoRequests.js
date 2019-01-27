import { EsriProvider } from 'leaflet-geosearch';

const provider = new EsriProvider();

const getXandY = muralAddress => new Promise((resolve, reject) => {
  provider.search({ query: muralAddress })
    .then((results) => {
      const coordinates = results[0];
      resolve(coordinates);
    })
    .catch(err => reject(err));
});

export default {
  getXandY,
};
