///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/socket.io-client/socket.io-client.d.ts"/>
///<reference path="../typings/bluebird/bluebird.d.ts"/>

var io = require('socket.io-client');
var Promise = require("bluebird");

import ticketCodes = require("./ticket-codes")
import tn = require("./trader-net-types");
import mapper = require("./trader-net-mapper");
import crypto = require("./trader-net-crypto");

interface ISocketPromisifyed extends SocketIOClient.Socket {
    onAsync<T>(event: string): Promise<T>
    emitAsync<T>(event: string, prm1?: any, prm2?: any): Promise<T>
}

export class TraderNet {

    private ws: ISocketPromisifyed;
    private resolvers : {
        portfolio: Promise.Resolver<tn.ITraderNetPortfolio>
        quotes: Promise.Resolver<Array<tn.ITraderNetQuote>>
        order: Promise.Resolver<tn.ITraderNetPutOrderData>
    } = {portfolio: null, quotes: null, order: null};

    constructor(private url:string, private opts: tn.ITraderNetOpts){
    }

    connect(auth: tn.ITraderNetAuth): Promise<tn.ITraderNetAuthResult>{
        var _ws = io(this.url, {transports: [ 'websocket' ]});
        var ws = <ISocketPromisifyed>Promise.promisifyAll(_ws);
        this.ws = ws;

        return ws.onAsync<tn.ITraderNetAuthResult>("connect").then(() => {
            var data = {
                apiKey: auth.apiKey,
                cmd: 'getAuthInfo',
                nonce: Date.now()
            };
            var sig = crypto.sign(data, auth.securityKey);
            return ws.emitAsync<tn.ITraderNetAuthResult>('auth', data, sig);
        }).then(res => {
            if (this.opts.onPortfolio) {
                ws.on('portfolio', (portfolio) => {
                    this.opts.onPortfolio(mapper.mapPortfolio(portfolio[0].ps));
                });
            }
            if (this.opts.onOrders) {
                ws.on('orders', (orders) => {
                    this.opts.onOrders(orders[0].orders.order.map(mapper.mapOrder));
                });
            }
            if (this.opts.onQuotes || this.opts.listenQuotes) {
                ws.on('q', (quotes) => {
                    var res = quotes.q.map(mapper.mapQuotes);
                    if (this.opts.onQuotes)
                        this.opts.onQuotes(res);
                    if (this.resolvers.quotes) {
                        this.resolvers.quotes.resolve(res);
                        this.resolvers.quotes = null;
                    }
                });
            }
            return res;
        });
    }

    putOrder(data: tn.IPutOrderData): Promise<tn.IPutOrderResult> {
        var formatted = mapper.formatPutOrder(data);
        return this.ws.emitAsync<tn.IPutOrderResult>('putOrder', formatted);
    }

    notifyPortfolio = () => {
        this.ws.emit('notifyPortfolio');
    };

    notifyOrders = () => {
        this.ws.emit('notifyOrders');
    };

    notifyQuotes = (tickets: Array<ticketCodes.TicketCodes|string>) => {
        var ticketStrs = typeof tickets[0] != "string" ? tickets.map(m => ticketCodes.TicketCodes[<any>m]) : tickets;
        this.ws.emit('notifyQuotes', ticketStrs);
    };

    notifyQuotesAsync = (tickets: Array<ticketCodes.TicketCodes|string>) => {
        if (this.resolvers.quotes)
            return Promise.reject("Only one async oper of each type is allowed");
        this.resolvers.quotes = Promise.defer();
        this.notifyQuotes(tickets);
        return this.resolvers.quotes.promise;
    };

}

