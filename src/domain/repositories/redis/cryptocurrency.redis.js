import redis from 'redis';

export default class CryptocurrencyRedis {
  constructor() {
    this.options = {
      host: '192.168.99.100'
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client = redis.createClient(this.options);
      this.client.on("error", function (error) {
        reject(error);
      });
      this.client.on("ready", function () {
        resolve();
      });
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      this.client.quit();
      this.client.on("end", function () {
        resolve()
      });
    })
  }

  readBySymbol(symbol) {
    return new Promise((resolve, reject) => {
      this.client.lrange(symbol, 0, 100, function (err, data) {
        if (err) reject(err);
        else resolve(data.map(elem => JSON.parse(elem)));
      });
    });
  }

  writeOne(data) {
    return new Promise((resolve, reject) => {
      const client = this.client;
      client.lpush(data.symbol, JSON.stringify(data), function (err) {
        if (err) {
          reject(err);
        } else {
          client.expire(data.symbol, 60, function (err) {
            if (err) reject(err);
            else resolve(data);
          });
        }
      });
    });
  }
}