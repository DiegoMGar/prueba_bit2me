import CryptocurrencyRedis from '../../repositories/redis/cryptocurrency.redis.js';

export class CacheCryptocurrenciesService {
  /**
   * Se devuelve lo cacheado en redis, como el caché caduca a los 60 segundos,
   *  debe ser el que hace uso de esta herramienta el que controle si llamar a mongo.
   * @param {string} symbol
   */
  readBySymbol(symbol) {
    if (typeof symbol !== 'string') {
      throw Error('Symbol must be string');
    }
    const redisRepo = new CryptocurrencyRedis();
    return new Promise((resolve, reject) => {
      redisRepo.connect()
        .then(() => {
          return redisRepo.readBySymbol(symbol);
        })
        .then((data) => {
          resolve(data);
          redisRepo.disconnect();
        })
        .catch((err) => reject(err));
    });
  }

  cacheSymbol(symbol, data) {
    const redisRepo = new CryptocurrencyRedis();
    redisRepo.connect()
      .then(() => {
        return redisRepo.write(symbol, data);
      })
      .then(() => {
        console.log('Data successfuly cached');
        redisRepo.disconnect();
      })
      .catch((err) => {
        console.log('Error caching', err);
      });
  }
}