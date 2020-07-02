import fetch from 'node-fetch';
import config from '../../config/coingmarketcap.config.js'


export class Cryptocurrency {
  constructor() {
    this.url = 'https://web-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?';
  }

  run(input) {
    console.log("Using Cryptocurrency");
    return true;
  }

  fetchCurrency(id) {
    const params = {
      id,
      convert: 'USD',
      format: 'chart_crypto_details',
    }
    let url = this.url;
    Object.keys(params).forEach(key => {
      url += `${key}=${params[key]}&`;
    });
    url = url.substring(0, url.length - 1);
    const options = {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': config.api_key,
        'Content-Type': 'application/json'
      }
    };
    return fetch(url, options)
      .then(response => {
        return response.json();
      });
  }
}
