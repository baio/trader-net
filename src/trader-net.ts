///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/socket.io-client/socket.io-client.d.ts"/>
///<reference path="../typings/bluebird/bluebird.d.ts"/>

import ticketCodes = require("./ticket-codes")
import orderCodes = require("./order-codes");
import securityTypes = require("./security-types");
import currencyCodes = require("./currency-codes");

var crypto = require("./trader-net-crypto");
var io = require('socket.io-client')
var Promise = require("bluebird")
var util = require("util")

export var TicketCodes  = ticketCodes.TicketCodes;
export var OrderActionTypes = orderCodes.OrderActionTypes;
export var OrderExpirationTypes = orderCodes.OrderExpirationTypes;
export var OrderStatusCodes = orderCodes.OrderStatusCodes;
export var OrderTypes = orderCodes.OrderTypes;
export var SecurityType = securityTypes.SecurityType;
export var SecurityKind = securityTypes.SecurityKind;
export var CurrencyCodes = currencyCodes.CurrencyCodes;

export interface ITraderNetAuth {
    apiKey: string
    securityKey: string
}

export interface IPutOrderData {
    ticket: ticketCodes.TicketCodes
    action: orderCodes.OrderActionTypes
    orderType: orderCodes.OrderTypes
    currency: currencyCodes.CurrencyCodes
    quantity: number
    limitPrice?: number
    stopPrice?: number
    allOrNothing?: boolean
    expiration?: orderCodes.OrderExpirationTypes
    groupPortfolio?: number
    userOrderId?: number
}

export interface IOrder {
    id: number
    date: string
    status: orderCodes.OrderStatusCodes//???
    statusOriginal: orderCodes.OrderStatusCodes//???
    statusDate: string
    security: ticketCodes.TicketCodes
    securityName: string
    securityName2: string
    oper: number//???
    type: number//???
    currency: currencyCodes.CurrencyCodes
    price: number
    stopPrice: number
    quantity: number
    allOrNothing: boolean
    expiration: currencyCodes.ExpirationTypes
    rep: string//???
    fv: string
    stat_prev: number
    userOrderId: string
}

export interface ITraderNetAccount {
    ///Свободные средства
    availableAmount: number
    ///Валюта счёта
    currency: currencyCodes.CurrencyCodes
    ///Курс валюты счета
    currencyRate: number
    forecastIn: number
    forecastOut: number
}

export interface ITraderNetPosition {
    ///Тикер бумаги
    security: ticketCodes.TicketCodes
    ///Тип бумаги ???
    securityType: securityTypes.SecurityType
    ///Вид бумаги ???
    securityKind: securityTypes.SecurityKind
    //Стоимость
    price: number
    ///Количество
    quantity: number
    ///Валюта
    currency: currencyCodes.CurrencyCodes
    ///Курс валюты
    currencyRate: number
    ///Наименование бумаги
    securityName: string
    ///Альтернативное наименование бумаги
    securityName2: string
    ///Цена открытия
    openPrice : number
    ///Рыночная цена
    marketPrice: number
    /*
    //???
    vm: string
    //???
    go: number
    //???
    profit_close: number
    //???
    acc_pos_id: number
    //???
    trade: Array<{}>
    */
}

export interface ITraderNetPortfolio {
    ///Ключ сообщений портфеля (логин, предварённый знаком процента)
    key: string
    ///Массив счётов клиента
    accounts: Array<ITraderNetAccount>
    ///Массив позиций клиента
    positions: Array<ITraderNetPosition>
}

export interface ITraderNetOpts {
    onPortfolio?: (portfolio: ITraderNetPortfolio) => void
    onOrders?: (orders: any) => void
}

export interface ITraderNetAuthResult {
    login: string
    mode: string
    trade: boolean
}

export interface IPutOrderResult {
    orderId: number
}

interface ISocketPromisifyed extends SocketIOClient.Socket {
    onAsync<T>(event: string): Promise<T>
    emitAsync<T>(event: string, prm1?: any, prm2?: any): Promise<T>
}

interface ITraderNetPutOrderData {
    instr_name: string
    action_id: number
    order_type_id: number
    curr: string
    limit_price: number
    stop_price: number
    qty: number
    aon: number
    expiration_id: number
    submit_ch_c: number
    message_id: number
    replace_order_id: number
    groupPortfolioName: number
    userOrderId: number
}

export class TraderNet{

    private ws: ISocketPromisifyed;

    constructor(private url:string, private opts: ITraderNetOpts){
    }

    static formatPutOrder(data: IPutOrderData) : ITraderNetPutOrderData {
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

    static  mapPortfolio(servicePortfolio: any) : ITraderNetPortfolio {
        return {
            key: servicePortfolio.key,
            accounts: servicePortfolio.acc.map(TraderNet.mapAccount),
            positions: servicePortfolio.pos.map(TraderNet.mapPosition)
        }
    }

    static  mapOrder(tnOrder: any) : IOrder {
        return {
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

    static  mapAccount(serviceAccount: any) : ITraderNetAccount {
        return {
            availableAmount: serviceAccount.s,
            currency: <any>currencyCodes.CurrencyCodes[serviceAccount.curr],
            currencyRate: serviceAccount.currval,
            forecastIn: serviceAccount.forecast_in,
            forecastOut: serviceAccount.forecast_out
        }
    }

    static  mapPosition(servicePos: any) : ITraderNetPosition {
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

    connect(auth: ITraderNetAuth): Promise<ITraderNetAuthResult>{
        var _ws = io(this.url, {transports: [ 'websocket' ]});
        var ws = <ISocketPromisifyed>Promise.promisifyAll(_ws);
        this.ws = ws;

        return ws.onAsync<ITraderNetAuthResult>("connect").then(() => {
            var data = {
                apiKey: auth.apiKey,
                cmd: 'getAuthInfo',
                nonce: Date.now()
            };
            var sig = crypto.sign(data, auth.securityKey);
            return ws.emitAsync<ITraderNetAuthResult>('auth', data, sig);
        }).then(res => {
            if (this.opts) {
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
            }
            return res;
        });
    }

    putOrder(data: IPutOrderData): Promise<IPutOrderResult> {
        var formatted = TraderNet.formatPutOrder(data);
        return this.ws.emitAsync<IPutOrderResult>('putOrder', formatted);
    }

    notifyPortfolio = () => {
        this.ws.emit('notifyPortfolio');
    }

    notifyOrders = () => {

        this.ws.emit('notifyOrders');
    }
}

