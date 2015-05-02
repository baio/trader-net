///<reference path="../typings/tsd.d.ts"/>
///<reference path="../dist/definitions/tn.d.ts"/>

module  ordersSpec {

    var chai = require('chai');
    var Promise = require("bluebird");
    var tn = require("../dist/tn");

    var expect = chai.expect;

    describe("orders-test", () => {

        var trr:tn.TraderNet;
        var opts:tn.ITraderNetOpts;

        beforeEach((done) => {

            opts = <any>{
                onOrders: () => {
                }
            };

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

            it("should have correct result for opts callback", (done) => {

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
}
