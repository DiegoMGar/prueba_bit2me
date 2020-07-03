import mongoose from "mongoose";

export default class CryptocurrencyMongodb {
  constructor() {
    this.host = "mongodb://192.168.99.100:27017/coinmarketcap"
  }

  connect() {
    return mongoose.connect(this.host,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  }

  disconnect() {
    return mongoose.connection.close();
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
        volume_24h: Number,
        percent_change_1h: Number,
        percent_change_24h: Number,
        percent_change_7d: Number,
        market_cap: Number,
        last_updated: String
      });
    }
    return CryptocurrencyMongodb.CryptocurrencyModel;
  }

  /**
   * @param {object} query
   */
  find(query) {
    const Crypto = this.getCryptoModel();
    return Crypto.find(query);
  }

  /**
   * @param {string} symbol
   */
  readBySymbol(symbol) {
    return this.find({symbol});
  }

  /**
   * @param {string} symbol
   * @param {number} seconds
   */
  readBySymbolElapsedTime(symbol, seconds) {
    const now = new Date();
    now.setTime(now.getTime() - (seconds * 1000));
    console.log("Searching gte", now.toISOString());
    return this.find({symbol, last_updated: {$gte: now.toISOString()}});
  }

  writeOne(data) {
    const Crypto = this.getCryptoModel();
    const crypto = new Crypto(
      {
        symbol: data.symbol,
        price: data.price,
        volume_24h: data.volume,
        market_cap: data.market_cap,
        last_updated: data.last_updated
      });
    return crypto.save();
  }
}