/* Example in Node.js ES6 using request-promise */

import fetch from 'node-fetch';

let url = 'https://web-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?';
const params = {
  id: '1',
  convert: 'USD',
  format: 'chart_crypto_details',
}
Object.keys(params).forEach(key => {
  url += `${key}=${params[key]}&`;
});
url = url.substring(0, url.length-1);

const options = {
  method: 'GET',
  headers: {
    'X-CMC_PRO_API_KEY': 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Content-Type': 'application/json'
  }
};

fetch(url, options)
  .then(response => {
    return response.json();
  })
  .then((body) => {
    console.log("RESPONSE", body);
  })
  .catch((err) => {
    console.log('API call error:', err.message);
  });