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
    onQuotes?: (quotes: Array<ITraderNetQuote>) => void
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

export interface ITraderNetPutOrderData {
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

export interface ITraderNetQuote {

    ///Тикер бумаги
    security: ticketCodes.TicketCodes
    //Цена последней сделки
    latestPrice : number
    /*
     n	Порядковый номер котировки. Каждый тикер имеет свою нумерацию
     c	Тикер
     mrg	Признак маржинальности. Если бумага маржинальна, содержит строку 'M'
     ltr	Биржа последней сделки
     kind	Вид бумаги (1 - Common Обыкновенные, 2 - Pref Привилегированные, 3 - Percent Процентные, 4 - Discount Дисконтные, 5 - Delivery Поставочный, 6 - Rated Расчетный, 7 - Interval Интервальный)
     type	Тип бумаги (1 - акции, 2 - облигации, 3 - фьючерсы)
     name	Название бумаги
     name2	Латинское название бумаги
     bbp	Лучший бид
     bbc	Обозначение изменения лучшего бида ('' - не изменился, 'D' - вниз, 'U' - вверх)
     bbs	Количество (сайз) лучшего бида
     bbf	Объем(?) лучшего бида
     bap	Лучший аск
     bac	Обозначение изменения лучшего аска ('' - не изменился, 'D' - вниз, 'U' - вверх)
     bas	Количество (сайз) лучшего аска
     baf	Объем(?) лучшего аска
     pp	Цена предыдущего закрытия
     op	Цена открытия в текущей торговой сессии
     ltp	Цена последней сделки
     lts	Количество (сайз) последней сделки
     ltt	Время последней сделки
     chg	Изменение цены последней сделки в пунктах относительно цены закрытия предыдущей торговой сессии
     pcp	Изменение в процентах относительно цены закрытия предыдущей торговой сессии
     ltc	Обозначение изменения цены последней сделки ('' - не изменилась, 'D' - вниз, 'U' - вверх)
     mintp	Минимальная цена сделки за день
     maxtp	Максимальная цена сделки за день
     vol	Объём торгов за день в штуках
     vlt	Объём торгов за день в валюте
     yld	Доходность к погашению (для облигаций)
     acd	Накопленный купонный доход (НКД)
     fv	Номинал
     mtd	Дата погашения
     cpn	Купон в валюте
     cpp	Купонный период (в днях)
     ncd	Дата следующего купона
     ncp	Дата последнего купона
     dpd	ГО покупки
     dps	ГО продажи
     trades	Количество сделок
     min_step	Минимальный шаг цены
     step_price	Шаг цены
     p5	Цена 5 дней назад
     chg5	Изменение цены за 5 дней
     p22	Цена 22 дня назад
     chg22	Изменение цены за 22 дня
     p110	Цена 110 дней назад
     chg110	Изменение цены за 110 дней
     p220	Цена 220 дней назад
     chg220	Изменение цены за 220 дней
     x_dsc1	Дисконт
     x_dsc2	не используется
     x_dsc3	не используется
     x_descr	Описание
     x_curr	Валюта
     x_short	Можно ли шортить бумагу
     x_lot	Минимальный лот
     x_currVal	Курс валюты по отношению к рублю
     x_min	Минимум за (период)
     x_max	Максимум за (период)
     x_istrade	Были ли по бумаге сделки
     */
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
        return <IOrder>{
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

    static  mapQuotes(serviceQuote: any) : ITraderNetQuote {
        return {
            security: <any>ticketCodes.TicketCodes[serviceQuote.c],
            latestPrice: serviceQuote.ltp,
            lot: serviceQuote.x_lot
        };
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
            var sig = (<any>crypto).sign(data, auth.securityKey);
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
                if (this.opts.onQuotes) {
                    ws.on('q', (quotes) => {
                        this.opts.onQuotes(quotes.q.map(TraderNet.mapQuotes));
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
    };

    notifyOrders = () => {
        this.ws.emit('notifyOrders');
    };

    notifyQuotes = (tickets: Array<ticketCodes.TicketCodes|string>) => {
        var ticketStrs = typeof tickets[0] != "string" ? tickets.map(m => ticketCodes.TicketCodes[<any>m]) : tickets;
        this.ws.emit('notifyQuotes', ticketStrs);
    };


}

