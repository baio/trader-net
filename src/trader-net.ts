///<reference path="./enums/ticket-codes"/>
///<reference path="./trader-net-types"/>
///<reference path="./trader-net-mapper"/>
///<reference path="./trader-net-crypto"/>
///<reference path="./trader-utils"/>

module tn {

    var io = require('socket.io-client');
    var Promise = require("bluebird");

    interface ISocketPromisifyed extends SocketIOClient.Socket {
        onAsync<T>(event:string): Promise<T>
        emitAsync<T>(event:string, prm1?:any, prm2?:any): Promise<T>
    }

    interface TraderNetResolvers {
        disconnect: Promise.Resolver<any>
    }

    export class TraderNet {

        private ws:ISocketPromisifyed;
        private resolvers:TraderNetResolvers;
        private auth:tn.ITraderNetAuth;

        constructor(private url:string, private opts:ITraderNetOpts) {
            this.resolvers = {
                disconnect: null
            };
        }

        connect(auth:ITraderNetAuth):Promise<ITraderNetAuthResult> {
            this.auth = auth;

            var _ws = io(this.url, {transports: ['websocket'], forceNew: true});
            var ws = <ISocketPromisifyed>Promise.promisifyAll(_ws);
            this.ws = ws;

            return ws.onAsync<ITraderNetAuthResult>("connect").then(() => {
                var data = {

                    apiKey: auth.apiKey,
                    cmd: 'getAuthInfo',
                    nonce: Date.now()
                };
                var sig = security.sign(data, auth.securityKey);
                return ws.emitAsync<tn.ITraderNetAuthResult>('auth', data, sig);
            }).then(res => {

                if (this.opts.onPortfolio) {
                    ws.on('portfolio', (portfolio) => {
                        this.opts.onPortfolio(mapPortfolio(portfolio[0].ps));
                    });
                }

                if (this.opts.onPortfolioOnce)
                    ws.once('portfolio', (portfolio) => {
                        this.opts.onPortfolioOnce(mapPortfolio(portfolio[0].ps));
                        this.disconnect();
                    });

                if (this.opts.onOrders)
                    ws.on('orders', (orders) => this.opts.onOrders(orders[0].orders.order.map(mapOrder)));

                if (this.opts.onOrdersOnce)
                    ws.once('orders', (orders) => {
                        this.opts.onOrdersOnce(orders[0].orders.order.map(mapOrder));
                        this.disconnect();
                    });

                if (this.opts.onQuotes)
                    ws.on('q', (quotes) => this.opts.onQuotes(quotes.q.map(mapQuotes)));

                if (this.opts.onQuotesOnce)
                    ws.once('q', (quotes) => {
                        this.opts.onQuotesOnce(quotes.q.map(mapQuotes));
                        this.disconnect();
                    });

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

        disconnect():Promise<any> {

            if (!this.ws)
                return Promise.reject("Not connected");

            if (this.resolvers.disconnect)
                return Promise.reject("Already disconnecting");

            this.resolvers.disconnect = Promise.defer();
            var promise = this.resolvers.disconnect.promise;
            (<any>this.ws).disconnect();
            return promise;
        }

        putOrder(data:tn.IPutOrderData):Promise<tn.IPutOrderResult> {
            var formatted = formatPutOrder(data);
            return this.ws.emitAsync<tn.IPutOrderResult>('putOrder', formatted);
        }

        notifyPortfolio = () => {
            this.ws.emit('notifyPortfolio');
        };

        notifyOrders = () => {
            this.ws.emit('notifyOrders');
        };

        notifyQuotes = (tickets:Array<TicketCodes|string>) => {
            //TODO: since server have some race conditions, ensure some debounce before sending
            this.ws.emit('notifyQuotes', getCodes(tickets));
        };

        createNewInstance(opts:tn.ITraderNetOpts):Promise<TraderNet> {
            var trr = new TraderNet(this.url, opts);
            return trr.connect(this.auth).then(() => trr);
        }

        notifyQuotesAsync = (tickets:Array<TicketCodes|string>):Promise<Array<tn.ITraderNetQuote>> => {
            var deferred = Promise.defer();
            var opts = {
                onQuotesOnce(quotes:Array<tn.ITraderNetQuote>) {
                    deferred.resolve(quotes);
                }
            };
            this.createNewInstance(opts).then((trr) => trr.notifyQuotes(tickets));
            return deferred.promise;
        };

        notifyOrdersAsync = ():Promise<Array<tn.IOrder>> => {
            var deferred = Promise.defer();
            var opts = {
                onOrdersOnce(orders:Array<tn.IOrder>) {
                    deferred.resolve(orders);
                }
            };
            this.createNewInstance(opts).then((trr) => trr.notifyOrders());
            return deferred.promise;
        };

        notifyPortfolioAsync = ():Promise<ITraderNetPortfolio> => {
            var deferred = Promise.defer();
            var opts = {
                onPortfolioOnce(portfolio:ITraderNetPortfolio) {
                    deferred.resolve(portfolio);
                }
            };
            this.createNewInstance(opts).then((trr) => trr.notifyPortfolio());
            return deferred.promise;
        };

    }
}

module.exports = tn;
