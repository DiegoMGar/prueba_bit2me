import mongoose from "mongoose";

export default class CryptocurrencyMongodb {
  constructor() {
    this.host = "mongodb://192.168.99.100:27017/cryptocurrencies"
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
        timestamp: String
      });
    }
    return CryptocurrencyMongodb.CryptocurrencyModel;
  }

  readBySymbol(symbol) {
    const Crypto = this.getCryptoModel();
    return Crypto.find({symbol});
  }

  writeOne(data) {
    const Crypto = this.getCryptoModel();
    const crypto = new Crypto({
      symbol: data.symbol,
      price: data.price,
      timestamp: data.timestamp,
    });
    return crypto.save();
  }
}