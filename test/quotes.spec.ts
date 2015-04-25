///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>

import chai = require('chai');
var expect = chai.expect;
var Promise = require("bluebird");
import tn = require("../src/trader-net-types");
import trader = require("../src/trader-net");


describe("quotes-test", () => {

    var trr:trader.TraderNet;
    var opts:tn.ITraderNetOpts;

    beforeEach((done) => {

        console.log("portfolio.spec.ts:17>>>");

        opts = {listenQuotes : true};

        var auth:tn.ITraderNetAuth = {
            apiKey: process.env.TRADERNET_API_KEY,
            securityKey: process.env.TRADERNET_SEC_KEY
        };

        trr = new trader.TraderNet(process.env.TRADERNET_URL, opts);
        trr.connect(auth).then(() => {
            done();
        });
    });

    describe("get result via opts callback", () => {

        it("should have correct results for opts callback", (done) => {

            opts.onQuotes = (quotes:Array<tn.ITraderNetQuote>) => {
                console.log(quotes);
                trr.disconnect().then(done);
            };

            trr.notifyQuotes(["SBER"]);
        });
    });

    describe("get result via async", () => {

        it("should have correct results for async", (done) => {

            trr.notifyQuotesAsync(["SBER", "URKA"])
            .then((res) => {
                console.log("quotes.spec.ts:47>>>", res);
                return trr.disconnect();
            }).then(done);
        });


        it.skip("FAIL when there is no delay between two consequent calls", (done) => {

            Promise.all([trr.notifyQuotesAsync(["URKA"]), trr.notifyQuotesAsync(["SBER"])])
            .then((res) => {
                console.log("quotes.spec.ts:47>>>", res);
                return trr.disconnect();
            }).then(done);
        });

        it("WORK with a little delay between requests", (done) => {

            Promise.all([trr.notifyQuotesAsync(["SBER"]), Promise.delay(500).then(() => trr.notifyQuotesAsync(["URKA"]))])
            .then((res) => {
                console.log("quotes.spec.ts:47>>>", res);
                return trr.disconnect();
            }).then(done);

        });
    });

});
