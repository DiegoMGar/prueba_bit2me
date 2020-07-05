import fetch from 'node-fetch';
import CryptocurrencyMongodb from "../repositories/mongodb/cryptocurrency.mongodb.js";


export class CryptocurrencyInterval {
  constructor(webSocketManager) {
    this.url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?';
    this.fetchIntervalSeconds = 60;
    this.webSocketManager = webSocketManager;
  }

  prepare() {
    this.fetchAndSave();
    setInterval(() => {
      this.fetchAndSave();
    }, this.fetchIntervalSeconds * 1000);
  }

  fetchAndSave() {
    this.fetchCurrency()
      .then(data => {
        console.log('Retrieved crypto', data.status.timestamp);
        const mongoRepo = new CryptocurrencyMongodb();
        mongoRepo.connect()
          .then(() => {
            const btc = {...data.data.BTC.quote.EUR};
            btc.symbol = 'BTC';
            const eth = {...data.data.ETH.quote.EUR};
            eth.symbol = 'ETH';
            return Promise.all([
              mongoRepo.writeOne(btc),
              mongoRepo.writeOne(eth)
            ])
          })
          .then((results) => {
            console.log('Prices written');
            console.log("Broadcasting");
            this.webSocketManager.broadcast(results);
          })
          .catch((err) => {
            console.log('Error writing new prices');
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchCurrency() {
    const params = {
      symbol: 'BTC,ETH',
      convert: 'EUR',
    }
    let url = this.url;
    Object.keys(params).forEach(key => {
      url += `${key}=${params[key]}&`;
    });
    url = url.substring(0, url.length - 1);
    const options = {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': process.env.BIT2ME_COINMARKETCAP_API_KEY,
        'Content-Type': 'application/json'
      }
    };
    return fetch(url, options)
      .then(response => {
        if (response.status.toString().startsWith('2')) return response.json();
        throw Error('Error retrieving prices from coinmarketcap: ' + response.status);
      });
  }
}
