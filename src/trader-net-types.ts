import ticketCodes = require("./enums/ticket-codes")
import orderCodes = require("./enums/order-codes");
import securityTypes = require("./enums/security-types");
import currencyCodes = require("./enums/currency-codes");

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
    expiration: orderCodes.OrderExpirationTypes
    rep: string//???
    fv: string
    stat_prev: number
    userOrderId: string
}

export interface ITraderNetAccount {
    ///????????? ????????
    availableAmount: number
    ///?????? ?????
    currency: currencyCodes.CurrencyCodes
    ///???? ?????? ?????
    currencyRate: number
    forecastIn: number
    forecastOut: number
}

export interface ITraderNetPosition {
    ///????? ??????
    security: ticketCodes.TicketCodes
    ///??? ?????? ???
    securityType: securityTypes.SecurityType
    ///??? ?????? ???
    securityKind: securityTypes.SecurityKind
    //?????????
    price: number
    ///??????????
    quantity: number
    ///??????
    currency: currencyCodes.CurrencyCodes
    ///???? ??????
    currencyRate: number
    ///???????????? ??????
    securityName: string
    ///?????????????? ???????????? ??????
    securityName2: string
    ///???? ????????
    openPrice : number
    ///???????? ????
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
    ///???? ????????? ???????? (?????, ???????????? ?????? ????????)
    key: string
    ///?????? ?????? ???????
    accounts: Array<ITraderNetAccount>
    ///?????? ??????? ???????
    positions: Array<ITraderNetPosition>
}

export interface ITraderNetOpts {
    onPortfolio?: (portfolio: ITraderNetPortfolio) => void
    onOrders?: (orders: any) => void
    onQuotes?: (quotes: Array<ITraderNetQuote>) => void
    /**
     * Listen quotes if async notify quotes, is supposed to be used
     */
    listenQuotes?: boolean
    listenOrders?: boolean
    listenPortfolio?: boolean
}

export interface ITraderNetAuthResult {
    login: string
    mode: string
    trade: boolean
}

export interface IPutOrderResult {
    orderId: number
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

    ///????? ??????
    security: ticketCodes.TicketCodes
    //???? ????????? ??????
    latestPrice : number
    /*
     n	?????????? ????? ?????????. ?????? ????? ????? ???? ?????????
     c	?????
     mrg	??????? ??????????????. ???? ?????? ???????????, ???????? ?????? 'M'
     ltr	????? ????????? ??????
     kind	??? ?????? (1 - Common ????????????, 2 - Pref ?????????????????, 3 - Percent ??????????, 4 - Discount ??????????, 5 - Delivery ???????????, 6 - Rated ?????????, 7 - Interval ????????????)
     type	??? ?????? (1 - ?????, 2 - ?????????, 3 - ????????)
     name	???????? ??????
     name2	????????? ???????? ??????
     bbp	?????? ???
     bbc	??????????? ????????? ??????? ???? ('' - ?? ?????????, 'D' - ????, 'U' - ?????)
     bbs	?????????? (????) ??????? ????
     bbf	?????(?) ??????? ????
     bap	?????? ???
     bac	??????????? ????????? ??????? ???? ('' - ?? ?????????, 'D' - ????, 'U' - ?????)
     bas	?????????? (????) ??????? ????
     baf	?????(?) ??????? ????
     pp	???? ??????????? ????????
     op	???? ???????? ? ??????? ???????? ??????
     ltp	???? ????????? ??????
     lts	?????????? (????) ????????? ??????
     ltt	????? ????????? ??????
     chg	????????? ???? ????????? ?????? ? ??????? ???????????? ???? ???????? ?????????? ???????? ??????
     pcp	????????? ? ????????? ???????????? ???? ???????? ?????????? ???????? ??????
     ltc	??????????? ????????? ???? ????????? ?????? ('' - ?? ??????????, 'D' - ????, 'U' - ?????)
     mintp	??????????? ???? ?????? ?? ????
     maxtp	???????????? ???? ?????? ?? ????
     vol	????? ?????? ?? ???? ? ??????
     vlt	????? ?????? ?? ???? ? ??????
     yld	?????????? ? ????????? (??? ?????????)
     acd	??????????? ???????? ????? (???)
     fv	???????
     mtd	???? ?????????
     cpn	????? ? ??????
     cpp	???????? ?????? (? ????)
     ncd	???? ?????????? ??????
     ncp	???? ?????????? ??????
     dpd	?? ???????
     dps	?? ???????
     trades	?????????? ??????
     min_step	??????????? ??? ????
     step_price	??? ????
     p5	???? 5 ???? ?????
     chg5	????????? ???? ?? 5 ????
     p22	???? 22 ??? ?????
     chg22	????????? ???? ?? 22 ???
     p110	???? 110 ???? ?????
     chg110	????????? ???? ?? 110 ????
     p220	???? 220 ???? ?????
     chg220	????????? ???? ?? 220 ????
     x_dsc1	???????
     x_dsc2	?? ????????????
     x_dsc3	?? ????????????
     x_descr	????????
     x_curr	??????
     x_short	????? ?? ??????? ??????
     x_lot	??????????? ???
     x_currVal	???? ?????? ?? ????????? ? ?????
     x_min	??????? ?? (??????)
     x_max	???????? ?? (??????)
     x_istrade	???? ?? ?? ?????? ??????
     */
}
