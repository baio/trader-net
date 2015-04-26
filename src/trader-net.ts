///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/socket.io-client/socket.io-client.d.ts"/>
///<reference path="../typings/bluebird/bluebird.d.ts"/>

var io = require('socket.io-client');
var Promise = require("bluebird");

import ticketCodes = require("./enums/ticket-codes")
import tn = require("./trader-net-types");
import mapper = require("./trader-net-mapper");
import crypto = require("./trader-net-crypto");
import quotesResolverManager = require("./resolver-managers/quotes-resolver-manager");
import resolverManager = require("./resolver-managers/resolver-manager");
import utils = require("./trader-utils");

interface ISocketPromisifyed extends SocketIOClient.Socket {
    onAsync<T>(event: string): Promise<T>
    emitAsync<T>(event: string, prm1?: any, prm2?: any): Promise<T>
}

interface TraderNetResolvers {
    portfolio: resolverManager.ResolverManager<tn.ITraderNetPortfolio>
    orders: resolverManager.ResolverManager<Array<tn.IOrder>>
    quotes: quotesResolverManager.QuotesResolver
    disconnect: Promise.Resolver<any>
}

export class TraderNet {

    private ws: ISocketPromisifyed;
    private resolvers: TraderNetResolvers;
    private auth: tn.ITraderNetAuth;

    constructor(private url:string, private opts: tn.ITraderNetOpts){
        this.resolvers = {
            portfolio: new resolverManager.ResolverManager<tn.ITraderNetPortfolio>(),
            orders: new resolverManager.ResolverManager<Array<tn.IOrder>>(),
            disconnect: null,
            quotes: new quotesResolverManager.QuotesResolver()
        };
    }

    connect(auth: tn.ITraderNetAuth): Promise<tn.ITraderNetAuthResult>{
        this.auth = auth;

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
            if (this.opts.onPortfolio || this.opts.listenPortfolio) {
                ws.on('portfolio', (portfolio) => {
                    var res = mapper.mapPortfolio(portfolio[0].ps);
                    if (this.opts.onPortfolio)
                        this.opts.onPortfolio(res);
                    this.resolvers.portfolio.resolve(res);
                });
            }
            if (this.opts.onOrders || this.opts.listenOrders) {
                ws.on('orders', (orders) => {
                    var res = orders[0].orders.order.map(mapper.mapOrder);
                    if (this.opts.onOrders)
                        this.opts.onOrders(res);
                    this.resolvers.orders.resolve(res);
                });
            }
            if (this.opts.onQuotes)
                ws.on('q', (quotes) => this.opts.onQuotes(quotes.q.map(mapper.mapQuotes)));

            if (this.opts.onQuotesOnce)
                ws.once('q', (quotes) => this.opts.onQuotesOnce(quotes.q.map(mapper.mapQuotes)));

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
        var deferred = Promise.defer();
        var trr: TraderNet;
        var opts = {
            onQuotesOnce(quotes: Array<tn.ITraderNetQuote>) {
                deferred.resolve(quotes);
                trr.disconnect();
            }
        };
        trr = new TraderNet(this.url, opts);
        trr.connect(this.auth).then(() => trr.notifyQuotes(tickets));
        return deferred.promise;
    };

    notifyOrdersAsync = () : Promise<Array<tn.IOrder>> => {
        var res = this.resolvers.orders.push();
        this.notifyOrders();
        return res;
    };

    notifyPortfolioAsync = () : Promise<tn.ITraderNetPortfolio> => {
        var res = this.resolvers.portfolio.push();
        this.notifyPortfolio();
        return res;
    };

}

