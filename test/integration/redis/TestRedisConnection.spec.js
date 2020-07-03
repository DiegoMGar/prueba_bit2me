import chai from 'chai';
import CryptocurrencyRedis from "../../../src/domain/repositories/redis/cryptocurrency.redis.js";

describe("Testing redis connection", function () {
  it("Should not fail", function (done) {
    const CRedis = new CryptocurrencyRedis();
    CRedis.connect()
      .then(() => {
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