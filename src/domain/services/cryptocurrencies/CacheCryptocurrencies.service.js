import CryptocurrencyRedis from "../../repositories/redis/cryptocurrency.redis.js";

export class CacheCryptocurrenciesService {
  /**
   * Se devuelve lo cacheado en redis, como el caché caduca a los 60 segundos,
   *  debe ser el que hace uso de esta herramienta el que controle si llamar a mongo.
   * @param {string} symbol
   */
  readBySymbol(symbol) {
    if (typeof symbol !== "string") {
      throw Error("Symbol must be string");
    }
    const redisRepo = new CryptocurrencyRedis();
    return redisRepo.connect()
      .then(() => redisRepo.readBySymbol(symbol));
  }
}