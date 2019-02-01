import axios from 'axios';
import apiKeys from '../apiKeys';

const bingApiKey = apiKeys.bingApiKeys.apiKey;

const bingEndPoint = apiKeys.bingApiKeys.endPoint;

const getSuggestion = query => new Promise((resolve, reject) => {
  axios.get(`${bingEndPoint}?query=${query}&maxResults=5&inclenttype=Address,Business&userRegion=us&key=${bingApiKey}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((results) => {
      const suggestions = results.data.resourceSets[0].resources[0].value;
      const address = suggestions.map(suggestion => suggestion.address.formattedAddress);
      resolve(address);
    })
    .catch(err => reject(err));
});

export default {
  getSuggestion,
};
