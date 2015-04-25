///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>

import chai = require('chai');
var expect = chai.expect;
import tn = require("../src/trader-net-types");
import trader = require("../src/trader-net");


describe("quotes-test", () => {

    describe("Request quotes", () => {

        it("should have correct results for opts callback", (done) => {

            var trr :trader.TraderNet;

            var opts : tn.ITraderNetOpts = {
                onQuotes(quotes: Array<tn.ITraderNetQuote>) {
                    console.log(quotes);
                    trr.disconnect().then(done);

                }

            };

            var auth : tn.ITraderNetAuth = {
                apiKey: process.env.TRADERNET_API_KEY,
                securityKey: process.env.TRADERNET_SEC_KEY
            };

            trr = new trader.TraderNet(process.env.TRADERNET_URL, opts);
            trr.connect(auth).then((res) => {
                console.log(res);
                trr.notifyQuotes(["SBER"]);
            });

        });

        it("should have correct results for async", (done) => {

            var auth : tn.ITraderNetAuth = {
                apiKey: process.env.TRADERNET_API_KEY,
                securityKey: process.env.TRADERNET_SEC_KEY
            };

            var opts : tn.ITraderNetOpts = {
                listenQuotes: true
            };

            var trr = new trader.TraderNet(process.env.TRADERNET_URL, opts);

            trr.connect(auth).then((res) => {
                console.log(res);
                return trr.notifyQuotesAsync(["SBER", "URKA"]);
            }).then((res) => {
                console.log("quotes.spec.ts:47>>>", res);
                return trr.disconnect();
            }).then(done);

        });


        it.skip("FAIL when there is no delay between two consiquent calls", (done) => {

            var auth : tn.ITraderNetAuth = {
                apiKey: process.env.TRADERNET_API_KEY,
                securityKey: process.env.TRADERNET_SEC_KEY
            };

            var opts : tn.ITraderNetOpts = {
                listenQuotes: true
            };

            var trr = new trader.TraderNet(process.env.TRADERNET_URL, opts);

            trr.connect(auth).then(() => {
                return Promise.all([trr.notifyQuotesAsync(["URKA"]), trr.notifyQuotesAsync(["SBER"])]);
            }).then((res) => {
                console.log("quotes.spec.ts:47>>>", res);
                return trr.disconnect();
            }).then(done);

        });


        it("WORK with a little delay between requests", (done) => {

            var auth : tn.ITraderNetAuth = {
                apiKey: process.env.TRADERNET_API_KEY,
                securityKey: process.env.TRADERNET_SEC_KEY
            };

            var opts : tn.ITraderNetOpts = {
                listenQuotes: true
            };

            var trr = new trader.TraderNet(process.env.TRADERNET_URL, opts);

            trr.connect(auth).then(() => {
                setTimeout((() => trr.notifyQuotesAsync(["URKA"])), 500);
                return Promise.all([trr.notifyQuotesAsync(["SBER"])]);
            }).then(() => {
                setTimeout((() => {trr.disconnect(); done();}), 500)
            });
        });

    })
});
