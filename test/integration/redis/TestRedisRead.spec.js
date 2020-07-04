import chai from 'chai';
import CryptocurrencyRedis from "../../../src/domain/repositories/redis/cryptocurrency.redis.js";

describe("Testing mongodb connection", function () {
  it("Test read and exists at least one", function (done) {
    const CRedis = new CryptocurrencyRedis();
    CRedis.connect()
      .then(() => {
        return CRedis.readBySymbol("BTC")
      })
      .then((data) => {
        console.log(data)
        chai.expect(data).to.be.an("array");
        chai.expect(data.length).to.be.greaterThan(0);
        chai.expect(data[0].symbol).to.be.eq("BTC");
        return CRedis.disconnect();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        chai.assert.fail(err);
        done(1);
      })
  });
});