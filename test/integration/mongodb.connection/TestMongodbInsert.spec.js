import chai from 'chai';
import CryptocurrencyMongodb from "../../../src/domain/repositories/mongodb/cryptocurrency.mongodb.js";

describe("Testing mongodb connection", function () {
  it("Test if it inserts an element", function (done) {
    const CMongodb = new CryptocurrencyMongodb();
    CMongodb.connect()
      .then(() => {
        return CMongodb.writeOne({
          symbol: "BTC",
          price: 100.00,
          timestamp: new Date().toISOString()
        })
      })
      .then((data) => {
        chai.expect(data).not.to.be.empty;
        chai.expect(data.symbol).to.be.eq("BTC");
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