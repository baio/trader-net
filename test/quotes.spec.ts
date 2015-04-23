///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>

import chai = require('chai');
var expect = chai.expect;
import trader = require("../src/trader-net");


describe("quotes-test", () => {

    describe("Request quotes", () => {

        it("should have correct results", (done) => {

            var opts : trader.ITraderNetOpts = {
                onQuotes(quotes: Array<trader.ITraderNetQuote>) {
                    console.log(quotes);
                    done();
                }
            };

            console.log("quotes.spec.ts:21>>>", process.env.TRADERNET_URL);

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
    })
});
