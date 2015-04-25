///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/socket.io-client/socket.io-client.d.ts"/>
///<reference path="../typings/bluebird/bluebird.d.ts"/>

var io = require('socket.io-client');
var Promise = require("bluebird");
var util = require("util");

import tn = require("./trader-net-types");
import crypto = require("./trader-net-crypto");
import currencyCodes = require("./currency-codes");
import ticketCodes = require("./ticket-codes")
import orderCodes = require("./order-codes");

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

    static formatPutOrder(data: tn.IPutOrderData) : tn.ITraderNetPutOrderData {
        return {
            instr_name: ticketCodes.TicketCodes[data.ticket],
            action_id: data.action,
            order_type_id: data.orderType,
            curr: currencyCodes.CurrencyCodes[data.currency],
            limit_price: data.limitPrice,
            stop_price: data.stopPrice,
            qty: data.quantity,
            aon: data.allOrNothing ? 1 : 0,
            expiration_id: data.expiration,
            submit_ch_c: 1,
            message_id: 0,
            replace_order_id: 0,
            groupPortfolioName: data.groupPortfolio,
            userOrderId: data.userOrderId
        };
    }

    static  mapPortfolio(servicePortfolio: any) : tn.ITraderNetPortfolio {
        return {
            key: servicePortfolio.key,
            accounts: servicePortfolio.acc.map(TraderNet.mapAccount),
            positions: servicePortfolio.pos.map(TraderNet.mapPosition)
        }
    }

    static  mapOrder(tnOrder: any) : tn.IOrder {
        return <tn.IOrder>{
            id: tnOrder.id,
            date: tnOrder.date,
            status: tnOrder.stat,
            statusOriginal: tnOrder.stat_orig,
            statusDate: tnOrder.stat_d,
            security: <any>ticketCodes.TicketCodes[tnOrder.instr],
            securityName: tnOrder.name,
            securityName2: tnOrder.name2,
            oper: tnOrder.oper,
            type: tnOrder.type,
            currency: <any>currencyCodes.CurrencyCodes[tnOrder.cur],
            price: tnOrder.p,
            stopPrice: tnOrder.stop,
            quantity: tnOrder.q,
            allOrNothing: !!tnOrder.aon,
            expiration: <any>orderCodes.OrderExpirationTypes[tnOrder.exp],
            rep: tnOrder.rep,//???
            fv: tnOrder.fv,
            stat_prev: tnOrder.stat_prev,
            userOrderId: tnOrder.userOrderId
        }
    }

    static  mapAccount(serviceAccount: any) : tn.ITraderNetAccount {
        return {
            availableAmount: serviceAccount.s,
            currency: <any>currencyCodes.CurrencyCodes[serviceAccount.curr],
            currencyRate: serviceAccount.currval,
            forecastIn: serviceAccount.forecast_in,
            forecastOut: serviceAccount.forecast_out
        }
    }

    static  mapPosition(servicePos: any) : tn.ITraderNetPosition {
        return {
            security: <any>ticketCodes.TicketCodes[servicePos.i],
            securityType: servicePos.t,
            securityKind: servicePos.k,
            price: servicePos.s,
            quantity: servicePos.q,
            currency: <any>currencyCodes.CurrencyCodes[servicePos.curr],
            currencyRate: servicePos.currval,
            securityName: servicePos.name,
            securityName2: servicePos.name2,
            openPrice : servicePos.open_bal,
            marketPrice: servicePos.mkt_price
        }
    }

    static  mapQuotes(serviceQuote: any) : tn.ITraderNetQuote {
        return {
            security: <any>ticketCodes.TicketCodes[serviceQuote.c],
            latestPrice: serviceQuote.ltp,
            lot: serviceQuote.x_lot
        };
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
                    this.opts.onPortfolio(TraderNet.mapPortfolio(portfolio[0].ps));
                });
            }
            if (this.opts.onOrders) {
                ws.on('orders', (orders) => {
                    this.opts.onOrders(orders[0].orders.order.map(TraderNet.mapOrder));
                });
            }
            if (this.opts.onQuotes || this.opts.listenQuotes) {
                ws.on('q', (quotes) => {
                    var res = quotes.q.map(TraderNet.mapQuotes);
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
        var formatted = TraderNet.formatPutOrder(data);
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

