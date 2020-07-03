export class Historical {
  constructor(router, path) {
    this.router = router;
    this.path = path;
  }

  configure(method) {
    this.router[method](this.path, this.handler.bind(this));
  }

  handler(request, response) {
    const symbol = request.params.symbol;
    if (!symbol) {
      response.status(400);
      response.send({msg: "Symbol needed"});
      return;
    }

  }
}