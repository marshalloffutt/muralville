import axios from 'axios';
import apiKeys from '../apiKeys';

const bingApiKey = apiKeys.bingApiKeys.apiKey;

const bingEndPoint = apiKeys.bingApiKeys.endPoint;

const getSuggestion = query => new Promise((resolve, reject) => {
  axios.get(`${bingEndPoint}?q=${query}&key=${bingApiKey}`)
    .then((resp) => {
      const results = resp.data.resourceSets[0].resources[0].value;
      const formattedAddress = results.map(result => result.address.formattedAddress);
      resolve([formattedAddress, results]);
    })
    .catch(error => reject(error));
});

export default {
  getSuggestion,
};
