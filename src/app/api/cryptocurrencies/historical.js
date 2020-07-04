import {CryptocurrenciesService} from "../../../domain/services/cryptocurrencies/Cryptocurrencies.service.js";

export class Historical {
  constructor(router, path) {
    this.router = router;
    this.path = path;
  }

  configure(method) {
    this.router[method](this.path, this.handler.bind(this));
  }

  handler(request, response) {
    let symbol = request.params.symbol;
    if (!symbol) {
      response.status(400);
      response.send({msg: "Symbol needed"});
      return;
    }
    symbol = symbol.toUpperCase();
    const cryptoService = new CryptocurrenciesService();
    cryptoService.readBySymbol(symbol)
      .then((result) => {
        response.send(result);
        this.cachingTheResponse(symbol, result.data);
      })
      .catch((err) => {
        console.log(err);
        response.status(500);
        response.send({msg: err.message})
      })
  }

  cachingTheResponse(symbol, data) {
    const cryptoService = new CryptocurrenciesService();
    cryptoService.cacheSymbol(symbol, data);
  }
}