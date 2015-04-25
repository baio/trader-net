///<reference path="../typings/bluebird/bluebird.d.ts"/>
var Promise = require("bluebird");

import ticketCodes = require("./ticket-codes")
import tn = require("./trader-net-types");
import utils = require("./utils")

interface IQuotesResolverItem {
    key: string
    resolver: Promise.Resolver<Array<tn.ITraderNetQuote>>
}

export class QuotesResolver {

    private resolvers: Array<IQuotesResolverItem> = [];

    constructor() {
    }

    push(tickets: Array<ticketCodes.TicketCodes|string>): Promise<Array<tn.ITraderNetQuote>> {
        var key = utils.getCodes(tickets).join();

        console.log("quotes-resolver-manager.ts:22>>>", key);
        var deferred = Promise.defer();
        this.resolvers.push({key: key, resolver: deferred});
        return deferred.promise;
    }

    resolve(quotes: Array<tn.ITraderNetQuote>) {
        var key = quotes.map(m => ticketCodes.TicketCodes[m.security]).sort().join();
        console.log("quotes-resolver-manager.ts:29>>>", key);
        this.resolvers.map(m => m).forEach((f, i) => {
            if (f.key == key) {
                f.resolver.resolve(quotes);
                this.resolvers.splice(i, 1);
            }
        });
    }
}

