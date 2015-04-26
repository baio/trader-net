///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>

import chai = require('chai');
var expect = chai.expect;
var Promise = require("bluebird");
import tn = require("../src/trader-net-types");
import trader = require("../src/trader-net");

describe("orders-test", () => {

    var trr:trader.TraderNet;
    var opts:tn.ITraderNetOpts;

    beforeEach((done) => {

        opts = {listenOrders : true};

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

            console.log("orders.spec.ts:36>>>");


            opts.onOrders = (orders:Array<tn.IOrder>) => {
                console.log(orders);
                trr.disconnect().then(done);
            };

            trr.notifyOrders();
        });

    });

    describe("Results via async", () => {

        it("should have correct results for async", (done) => {

            trr.notifyOrdersAsync()
            .then((res) => {
                console.log("quotes.spec.ts:47>>>", res);
                return trr.disconnect();
            }).then(done);

        });
    });
});
