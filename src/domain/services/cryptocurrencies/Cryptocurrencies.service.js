import {CacheCryptocurrenciesService} from "./CacheCryptocurrencies.service.js";
import {MongoCryptocurrenciesService} from "./MongoCryptocurrencies.service.js";

export class CryptocurrenciesService {
  readBySymbol(symbol) {
    if (typeof symbol !== "string") {
      throw Error("Symbol must be string");
    }
    const redisService = new CacheCryptocurrenciesService();
    const mongoService = new MongoCryptocurrenciesService();
    const result = {
      data: null,
      resolver: null,
    }
    return new Promise((resolve, reject) => {
      redisService.readBySymbol(symbol)
        .then((data) => {
          if (data && data.length > 0) {
            result.data = data;
            result.resolver = "redis";
            resolve(result);
          } else {
            return mongoService.readBySymbol(symbol);
          }
        })
        .then((data) => {
          result.data = data;
          result.resolver = "mongodb";
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }

  cacheSymbol(symbol, data) {
    const redisService = new CacheCryptocurrenciesService();
    redisService.cacheSymbol(symbol, data);
  }
}