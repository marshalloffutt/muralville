import axios from 'axios';
import apiKeys from '../apiKeys';

const bingApiKey = apiKeys.bingApiKeys.apiKey;
const endPoint = apiKeys.bingApiKeys.endPoint;

const getSuggestion = (query) => new Promise((resolve, reject) => {
  axios
    .get(`${endpoint}?q={query}`)
})