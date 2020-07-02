export class GetCryptos {
  constructor(router, path) {
    this.router = router;
    this.path = path;
  }

  configure(method) {
    this.router[method](this.path, this.handler.bind(this));
  }

  handler(request, response) {
    const domainGetCryptosResolver = {name: 'GetCryptos'};
    response.send(domainGetCryptosResolver);
  }
}