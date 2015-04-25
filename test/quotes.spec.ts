///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>

import chai = require('chai');
var expect = chai.expect;
import trader = require("../src/trader-net");

describe("quotes-test", () => {

    describe("Request quotes", () => {

        it("should have correct results for opts callback", (done) => {

            var opts : trader.ITraderNetOpts = {
                onQuotes(quotes: Array<trader.ITraderNetQuote>) {
                    console.log(quotes);
                    done();
                }
            };

            var auth : trader.ITraderNetAuth = {
                apiKey: process.env.TRADERNET_API_KEY,
                securityKey: process.env.TRADERNET_SEC_KEY
            };

            var trr = new trader.TraderNet(process.env.TRADERNET_URL, opts);
            trr.connect(auth).then((res) => {
                console.log(res);
                trr.notifyQuotes(["SBER"]);
            });

        });

        it("should have correct results for async", (done) => {

            var auth : trader.ITraderNetAuth = {
                apiKey: process.env.TRADERNET_API_KEY,
                securityKey: process.env.TRADERNET_SEC_KEY
            };

            var opts : trader.ITraderNetOpts = {
                listenQuotes: true
            };

            var trr = new trader.TraderNet(process.env.TRADERNET_URL, opts);
            trr.connect(auth).then((res) => {
                console.log(res);
                return trr.notifyQuotesAsync(["SBER"]);
            }).then((res) => {
                console.log("quotes.spec.ts:47>>>", res);
                done();
            });

        });

    })
});
