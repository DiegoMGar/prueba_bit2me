import chai from 'chai';
import CryptocurrencyMongodb from "../../../src/domain/repositories/mongodb/cryptocurrency.mongodb.js";

describe("Testing mongodb write elements", function () {
  it("Test if it inserts an element", function (done) {
    const CMongodb = new CryptocurrencyMongodb();
    CMongodb.connect()
      .then(() => {
        const date = new Date();
        date.setTime(1593793434409);
        return CMongodb.writeOne({
          symbol: "BTC",
          price: 8070.101533626269,
          volume_24h: 14405358766.777975,
          percent_change_1h: -0.35343827,
          percent_change_24h: -2.0649988,
          percent_change_7d: -2.37005254,
          market_cap: 148659687365.29547,
          last_updated: date.toISOString()
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
      .catch((err) => {
        chai.assert.fail(err);
        CMongodb.disconnect();
        done(1);
      });
  });
});