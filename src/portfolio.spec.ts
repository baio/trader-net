///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>

/*
require('typescript-require');

import chai = require('chai');
var expect = chai.expect;
var Promise = require("bluebird");
var tn = require("../dist/trader-net-types");
var trader = require("../dist/trader-net");

describe("portfolio-test", () => {

    var trr:trader.TraderNet;
    var opts:tn.ITraderNetOpts;

    beforeEach((done) => {

        opts = <any>{onPortfolio : () => {}};

        var auth:tn.ITraderNetAuth = {
            apiKey: process.env.TRADERNET_API_KEY,
            securityKey: process.env.TRADERNET_SEC_KEY
        };

        trr = new trader.TraderNet(process.env.TRADERNET_URL, opts);
        trr.connect(auth).then(() => {
            done();
        });
    });


    describe("Results via option callbacks", () => {

        it("should have correct result for opts callback", (done) => {

            opts.onPortfolio = (portfolio:tn.ITraderNetPortfolio) => {
                console.log(portfolio);
                trr.disconnect().then(done);
            };


            trr.notifyPortfolio();
        });

    });

    describe("Results via async", () => {

        it("should have correct results for async", (done) => {

            trr.notifyPortfolioAsync()
                .then((res) => {
                    console.log("quotes.spec.ts:47>>>", res);
                    return trr.disconnect();
                }).then(done);

        });
    });
});
*/
