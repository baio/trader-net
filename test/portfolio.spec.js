
    var chai = require('chai');
    var Promise = require("bluebird");
    var tn = require("../dist");
    var expect = chai.expect;

    describe("portfolio-test", function () {

        var trr;
        var opts;

        beforeEach(function (done) {

            opts = {
                onPortfolio: function () {
                }
            };

            var auth = {
                apiKey: process.env.TRADERNET_API_KEY,
                securityKey: process.env.TRADERNET_SEC_KEY
            };

            trr = new tn.TraderNet(process.env.TRADERNET_URL, opts);
            trr.connect(auth).then(function () {
                done();
            });
        });


        describe("Results via option callbacks", function () {

            it("should have correct result for opts callback", function (done) {

                opts.onPortfolio = function (portfolio) {
                    console.log(portfolio);
                    trr.disconnect().then(done);
                };


                trr.notifyPortfolio();
            });

        });

        describe("Results via async", function () {

            it("should have correct results for async", function (done) {

                trr.notifyPortfolioAsync()
                    .then(function (res) {
                        console.log("quotes.spec.ts:47>>>", res);
                        return trr.disconnect();
                    }).then(done);

            });
        });
    });


