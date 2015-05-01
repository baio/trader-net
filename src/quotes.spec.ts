///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>

/*
require('typescript-require');

import chai = require('chai');
var expect = chai.expect;
var Promise = require("bluebird");
var tn = require("../src/trader-net-types");
var trader = require("../src/trader-net");

describe("quotes-test", () => {


    var trr:trader.TraderNet;
    var opts:tn.ITraderNetOpts;

    beforeEach((done) => {

        opts = <any>{onQuotes : () => {}};

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
                //it should be called many times
                console.log(quotes);
            };

            setTimeout(() => {trr.disconnect().then(done)}, 1000);

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


        it("request two separate quotes", (done) => {
            Promise.all([trr.notifyQuotesAsync(["URKA"]), trr.notifyQuotesAsync(["SBER"])])
            .then((res) => {
                console.log("quotes.spec.ts:47>>>", res);
                return trr.disconnect();
            }).then(done);
        });


        it("request two separate quotes and check opts silence", (done) => {

            opts.onQuotes = (quotes:Array<tn.ITraderNetQuote>) => {
                //it should be called many times
                console.log("quotes.spec.ts:74>>>");
            };

            Promise.all([trr.notifyQuotesAsync(["URKA"]), trr.notifyQuotesAsync(["SBER"])])
                .then((res) => {
                    console.log("quotes.spec.ts:79>>>", res);
                    return trr.disconnect();
                }).then(done);

        });
    });

});
*/