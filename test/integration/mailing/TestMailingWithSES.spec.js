import chai from 'chai';
import {Mailing} from "../../../src/domain/mailing/mailing.js";

describe("Testing sending emails with Aws SES", function () {
  it("Must send it", function (done) {
    const sender = new Mailing();
    sender.sendmailWithPrices()
      .then((accepted) => {
        console.log(accepted);
        chai.expect(accepted).to.be.an("array");
        chai.expect(accepted.length).to.be.gte(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(1);
      })
  })
})