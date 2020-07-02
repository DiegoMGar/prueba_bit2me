import chai from 'chai';
import CryptocurrencyMongodb from "../../../src/domain/repositories/mongodb/cryptocurrency.mongodb.js";

describe("Testing mongodb connection", function () {
  it("Test read and exists at least one", function (done) {
    const CMongodb = new CryptocurrencyMongodb();
    CMongodb.connect()
      .then(() => {
        return CMongodb.readBySymbol("BTC")
      })
      .then((data) => {
        chai.expect(data).to.be.an("array");
        chai.expect(data.length).to.be.greaterThan(0);
        chai.expect(data[0].symbol).to.be.eq("BTC");
        return CMongodb.disconnect();
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