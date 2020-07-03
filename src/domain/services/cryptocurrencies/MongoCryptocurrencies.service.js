import CryptocurrencyMongodb from "../../repositories/mongodb/cryptocurrency.mongodb";

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
    if (typeof symbol !== "string") {
      throw Error("Symbol must be string");
    }
    const mongoRepo = new CryptocurrencyMongodb();
    return mongoRepo.connect()
      .then(() => mongoRepo.readBySymbolElapsedTime(symbol, this.config.minutesElapsedQuery * 60));
  }
}