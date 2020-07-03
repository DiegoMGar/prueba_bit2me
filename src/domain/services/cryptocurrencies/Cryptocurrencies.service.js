export class CryptocurrenciesService {
  readBySymbol(symbol) {
    if (typeof symbol !== "string") {
      throw Error("Symbol must be string");
    }
  }
}