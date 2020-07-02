import chai from 'chai';
import CryptocurrencyMongodb from "../../../src/domain/repositories/mongodb/cryptocurrency.mongodb.js";

describe("Testing mongodb connection", function () {
  it("Should not fail", function (done) {
    const CMongodb = new CryptocurrencyMongodb();
    CMongodb.connect()
      .then(() => {
        return CMongodb.disconnect();
      })
      .then(() => {
        done();
      })
      .catch(() => {
        chai.assert.fail('Failed connection');
        CMongodb.disconnect();
        done(1);
      });
  });
});