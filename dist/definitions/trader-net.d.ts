/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/socket.io-client/socket.io-client.d.ts" />
/// <reference path="../typings/bluebird/bluebird.d.ts" />
import ticketCodes = require("./ticket-codes");
import orderCodes = require("./order-codes");
import securityTypes = require("./security-types");
import currencyCodes = require("./currency-codes");
export declare var TicketCodes: typeof ticketCodes.TicketCodes;
export declare var OrderActionTypes: typeof orderCodes.OrderActionTypes;
export declare var OrderExpirationTypes: typeof orderCodes.OrderExpirationTypes;
export declare var OrderStatusCodes: typeof orderCodes.OrderStatusCodes;
export declare var OrderTypes: typeof orderCodes.OrderTypes;
export declare var SecurityType: typeof securityTypes.SecurityType;
export declare var SecurityKind: typeof securityTypes.SecurityKind;
export declare var CurrencyCodes: typeof currencyCodes.CurrencyCodes;
export interface ITraderNetAuth {
    apiKey: string;
    securityKey: string;
}
export interface IPutOrderData {
    ticket: ticketCodes.TicketCodes;
    action: orderCodes.OrderActionTypes;
    orderType: orderCodes.OrderTypes;
    currency: currencyCodes.CurrencyCodes;
    quantity: number;
    limitPrice?: number;
    stopPrice?: number;
    allOrNothing?: boolean;
    expiration?: orderCodes.OrderExpirationTypes;
    groupPortfolio?: number;
    userOrderId?: number;
}
export interface IOrder {
    id: number;
    date: string;
    status: orderCodes.OrderStatusCodes;
    statusOriginal: orderCodes.OrderStatusCodes;
    statusDate: string;
    security: ticketCodes.TicketCodes;
    securityName: string;
    securityName2: string;
    oper: number;
    type: number;
    currency: currencyCodes.CurrencyCodes;
    price: number;
    stopPrice: number;
    quantity: number;
    allOrNothing: boolean;
    expiration: currencyCodes.ExpirationTypes;
    rep: string;
    fv: string;
    stat_prev: number;
    userOrderId: string;
}
export interface ITraderNetAccount {
    availableAmount: number;
    currency: currencyCodes.CurrencyCodes;
    currencyRate: number;
    forecastIn: number;
    forecastOut: number;
}
export interface ITraderNetPosition {
    security: ticketCodes.TicketCodes;
    securityType: securityTypes.SecurityType;
    securityKind: securityTypes.SecurityKind;
    price: number;
    quantity: number;
    currency: currencyCodes.CurrencyCodes;
    currencyRate: number;
    securityName: string;
    securityName2: string;
    openPrice: number;
    marketPrice: number;
}
export interface ITraderNetPortfolio {
    key: string;
    accounts: Array<ITraderNetAccount>;
    positions: Array<ITraderNetPosition>;
}
export interface ITraderNetOpts {
    onPortfolio?: (portfolio: ITraderNetPortfolio) => void;
    onOrders?: (orders: any) => void;
}
export interface ITraderNetAuthResult {
    login: string;
    mode: string;
    trade: boolean;
}
export interface IPutOrderResult {
    orderId: number;
}
export interface ITraderNetPutOrderData {
    instr_name: string;
    action_id: number;
    order_type_id: number;
    curr: string;
    limit_price: number;
    stop_price: number;
    qty: number;
    aon: number;
    expiration_id: number;
    submit_ch_c: number;
    message_id: number;
    replace_order_id: number;
    groupPortfolioName: number;
    userOrderId: number;
}
export declare class TraderNet {
    private url;
    private opts;
    private ws;
    constructor(url: string, opts: ITraderNetOpts);
    static formatPutOrder(data: IPutOrderData): ITraderNetPutOrderData;
    static mapPortfolio(servicePortfolio: any): ITraderNetPortfolio;
    static mapOrder(tnOrder: any): IOrder;
    static mapAccount(serviceAccount: any): ITraderNetAccount;
    static mapPosition(servicePos: any): ITraderNetPosition;
    connect(auth: ITraderNetAuth): Promise<ITraderNetAuthResult>;
    putOrder(data: IPutOrderData): Promise<IPutOrderResult>;
    notifyPortfolio: () => void;
    notifyOrders: () => void;
}
