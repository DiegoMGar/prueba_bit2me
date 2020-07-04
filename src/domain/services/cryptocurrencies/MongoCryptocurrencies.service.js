import CryptocurrencyMongodb from '../../repositories/mongodb/cryptocurrency.mongodb.js';

export class MongoCryptocurrenciesService {

  constructor() {
    this.config = {
      minutesElapsedQuery: 100
    };
  }

  /**
   * Se devuelve lo almacenado en mongo, con un filtro de máximo 100 minutos.
   * @param {string} symbol
   */
  readBySymbol(symbol) {
    if (typeof symbol !== 'string') {
      throw Error('Symbol must be string');
    }
    const mongoRepo = new CryptocurrencyMongodb();
    return new Promise((resolve, reject) => {
      mongoRepo.connect()
        .then(() => {
          return mongoRepo.readBySymbolElapsedTime(symbol, this.config.minutesElapsedQuery * 60);
        })
        .then((data) => {
          resolve(data);
          mongoRepo.disconnect();
        })
        .catch((err) => reject(err));
    });
  }
}