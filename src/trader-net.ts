///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/socket.io-client/socket.io-client.d.ts"/>
///<reference path="../typings/bluebird/bluebird.d.ts"/>

var io = require('socket.io-client');
var Promise = require("bluebird");

import ticketCodes = require("./ticket-codes")
import tn = require("./trader-net-types");
import mapper = require("./trader-net-mapper");
import crypto = require("./trader-net-crypto");
import quotesResolverManager = require("./quotes-resolver-manager");
import utils = require("./utils");

interface ISocketPromisifyed extends SocketIOClient.Socket {
    onAsync<T>(event: string): Promise<T>
    emitAsync<T>(event: string, prm1?: any, prm2?: any): Promise<T>
}

interface TraderNetResolvers {
    portfolio: Promise.Resolver<tn.ITraderNetPortfolio>
    quotes: quotesResolverManager.QuotesResolver
    order: Promise.Resolver<tn.ITraderNetPutOrderData>
    disconnect: Promise.Resolver<any>
}

export class TraderNet {

    private ws: ISocketPromisifyed;
    private resolvers: TraderNetResolvers;

    constructor(private url:string, private opts: tn.ITraderNetOpts){
        this.resolvers = {
            portfolio: null,
            order: null,
            disconnect: null,
            quotes: new quotesResolverManager.QuotesResolver()
        };
    }

    connect(auth: tn.ITraderNetAuth): Promise<tn.ITraderNetAuthResult>{
        var _ws = io(this.url, {transports: [ 'websocket' ], forceNew : true});
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

                    this.resolvers.quotes.resolve(res);

                });
            }
            ws.on('disconnect', () => {
                if (this.resolvers.disconnect) {
                    this.resolvers.disconnect.resolve();
                    this.resolvers.disconnect = null;
                }
                this.ws = null;
            });
            return res;
        });
    }

    disconnect() : Promise<any>{

        if (!this.ws)
            return Promise.reject("Not connected");

        if (this.resolvers.disconnect)
            return Promise.reject("Already disconnecting");

        this.resolvers.disconnect = Promise.defer();
        var promise = this.resolvers.disconnect.promise;
        (<any>this.ws).disconnect();
        return promise;
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
        //TODO: since server have some race conditions, ensure some debounce before sending
        this.ws.emit('notifyQuotes', utils.getCodes(tickets));
    };

    notifyQuotesAsync = (tickets: Array<ticketCodes.TicketCodes|string>) : Promise<Array<tn.ITraderNetQuote>> => {
        var res = this.resolvers.quotes.push(tickets);
        this.notifyQuotes(tickets);
        return res;
    };

}

