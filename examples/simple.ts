import traderNet = require("../trader-net");
import traderUtils = require("../trader-utils");

var traderNetOpts: traderNet.ITraderNetOpts = {
    onPortfolio(portfolio: traderNet.ITraderNetPortfolio) {
        console.log(JSON.stringify(portfolio, null, 2));
    },
    onOrders(orders: traderNet.IOrder) {
        console.log(JSON.stringify(orders, null, 2));
    }
} ;

var trader = new traderNet.TraderNet(process.env.TN_URL, traderNetOpts);
trader.connect({apiKey: process.env.TN_API_KEY, securityKey: process.env.TN_SECURITY_KEY})
    .then((res) => {
        //buy SBER 10 by market price
        var order: traderNet.IPutOrderData = {
         ticket : traderNet.TicketCodes.SBER,
         action: traderNet.OrderActionTypes.Sell,
         orderType: traderNet.OrderTypes.Market,
         currency: traderNet.CurrencyCodes.RUR,
         quantity: 1 * traderUtils.TraderUtils.getSecurity(traderNet.TicketCodes.SBER).lotSize
         };

         return trader.putOrder(order);
    })
    .then((res) => {
        trader.notifyPortfolio();
        trader.notifyOrders();
    })
    .then((res) => {
        console.log("complete", res);
    }
).error((err) => {
        console.log("error here", err)
    });
