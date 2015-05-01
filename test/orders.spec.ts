///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>

///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/socket.io-client/socket.io-client.d.ts"/>
///<reference path="../typings/bluebird/bluebird.d.ts"/>
///<reference path="../dist/definitions/tn.d.ts"/>

import chai = require('chai');
import expect = chai.expect;
import Promise = require("bluebird");
var tn = require("../dist/tn");

describe("orders-test", () => {

    var trr:tn.TraderNet;
    var opts:tn.ITraderNetOpts;

    beforeEach((done) => {

        console.log("orders.spec.ts:26>>>");

        opts = <any>{onOrders : () => {}};

        var auth:tn.ITraderNetAuth = {
            apiKey: process.env.TRADERNET_API_KEY,
            securityKey: process.env.TRADERNET_SEC_KEY
        };

        trr = new tn.TraderNet(process.env.TRADERNET_URL, opts);


        trr.connect(auth).then((res) => {
            console.log("orders.spec.ts:34>>>", res);
            done();
        });
    });

    describe("Results via option callbacks", () => {

        it.only("should have correct result for opts callback", (done) => {


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
                return trr.disconnect();
            }).then(done);

        });
    });
});
