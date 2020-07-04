import chai from 'chai';
import CryptocurrencyRedis from "../../../src/domain/repositories/redis/cryptocurrency.redis.js";

describe("Testing mongodb connection", function () {
  it("Test if it inserts an element", function (done) {
    const CRedis = new CryptocurrencyRedis();
    CRedis.connect()
      .then(() => {
        return CRedis.write("BTC", [{
          symbol: "BTC",
          price: 100.00,
          timestamp: new Date().toISOString()
        }])
      })
      .then((data) => {
        chai.expect(data).not.to.be.empty;
        return CRedis.disconnect();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        chai.assert.fail(err);
        CRedis.disconnect();
        done(1);
      });
  });
});