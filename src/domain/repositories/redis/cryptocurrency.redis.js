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

  /**
   * Makes the model static, mongoose fatal fails if
   *  it declares the same model more than one time.
   */
  getCryptoModel() {
    if (!CryptocurrencyMongodb.CryptocurrencyModel) {
      CryptocurrencyMongodb.CryptocurrencyModel = mongoose.model('Cryptocurrency', {
        symbol: String,
        price: Number,
        timestamp: String
      });
    }
    return CryptocurrencyMongodb.CryptocurrencyModel;
  }

  readBySymbol(symbol) {
    return new Promise((resolve, reject) => {
      this.client.lrange(symbol, 0,100,function (err, data) {
        if (err) reject(err);
        else resolve(data.map(elem=>JSON.parse(elem)));
      });
    });
  }

  writeOne(data) {
    return new Promise((resolve, reject) => {
      this.client.lpush(data.symbol, JSON.stringify(data), function (err) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
}