///<reference path="../typings/tsd.d.ts"/>
///<reference path="../dist/definitions/tn.d.ts"/>

module  orderBook.spec {

    var chai = require('chai');
    var Promise = require("bluebird");
    var tn = require("../dist/tn");

    var expect = chai.expect;

    describe("orderBook-test", () => {

        var trr:tn.TraderNet;
        var opts:tn.ITraderNetOpts;

        beforeEach((done) => {

            opts = <any>{
                onOrderBook: () => {
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

                opts.onOrderBook = (bookOrders: Array<tn.IBookOrder>) => {
                    console.log(bookOrders);
                    trr.disconnect().then(done);
                };

                trr.notifyOrderBook(["SBER"]);
            });


        });
    });
}
