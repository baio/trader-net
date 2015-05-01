/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

/// <reference path="../typings/node/node.d.ts" />
declare var crypto: any;
declare module tn.security {
    var sign: (data: any, apiSec: any) => any;
}

declare module tn {
    enum TicketCodes {
        ABRD = 0,
        AESL = 1,
        AFKS = 2,
        AFLT = 3,
        AGRO = 4,
        AKRN = 5,
        ALBK = 6,
        ALNU = 7,
        ALRS = 8,
        AMEZ = 9,
        APTK = 10,
        ARMD = 11,
        ARSA = 12,
        ASSB = 13,
        AVAN = 14,
        AVAZ = 15,
        AVAZP = 16,
        BANE = 17,
        BANEP = 18,
        BISV = 19,
        BISVP = 20,
        BLNG = 21,
        BRZL = 22,
        BSPB = 23,
        CHEP = 24,
        CHGZ = 25,
        CHKZ = 26,
        CHMF = 27,
        CHMK = 28,
        CHZN = 29,
        CLSB = 30,
        CLSBP = 31,
        CNTL = 32,
        CNTLP = 33,
        DALM = 34,
        DASB = 35,
        DGBZ = 36,
        DGBZP = 37,
        DIOD = 38,
        DIXY = 39,
        DVEC = 40,
        DZRD = 41,
        DZRDP = 42,
        ELTZ = 43,
        ENRU = 44,
        EONR = 45,
        ERCO = 46,
        FEES = 47,
        FESH = 48,
        FORTP = 49,
        GAZA = 50,
        GAZAP = 51,
        GAZC = 52,
        GAZP = 53,
        GAZS = 54,
        GAZT = 55,
        GCHE = 56,
        GMKN = 57,
        GRAZ = 58,
        GTLC = 59,
        GTPR = 60,
        GUMM = 61,
        HALS = 62,
        HIMC = 63,
        HIMCP = 64,
        HYDR = 65,
        IDVP = 66,
        IGST = 67,
        IGST03 = 68,
        IGSTP = 69,
        IRAO = 70,
        IRGZ = 71,
        IRKT = 72,
        ISKJ = 73,
        JNOS = 74,
        JNOSP = 75,
        KAZT = 76,
        KAZTP = 77,
        KBSB = 78,
        KBTK = 79,
        KCHE = 80,
        KCHEP = 81,
        KGKC = 82,
        KGKCP = 83,
        KLSB = 84,
        KMAZ = 85,
        KMEZ = 86,
        KMTZ = 87,
        KOGK = 88,
        KRKN = 89,
        KRKNP = 90,
        KRKO = 91,
        KRKOP = 92,
        KROT = 93,
        KROTP = 94,
        KRSB = 95,
        KRSBP = 96,
        KRSG = 97,
        KSGR = 98,
        KTSB = 99,
        KTSBP = 100,
        KUBE = 101,
        KUNF = 102,
        KUSTP = 103,
        KUZB = 104,
        KZBE = 105,
        KZMS = 106,
        KZOS = 107,
        KZOSP = 108,
        LIFE = 109,
        LKOH = 110,
        LNTA = 111,
        LNZL = 112,
        LNZLP = 113,
        LPSB = 114,
        LSNG = 115,
        LSNGP = 116,
        LSRG = 117,
        LVHK = 118,
        MAGE = 119,
        MAGEP = 120,
        MAGN = 121,
        MASZ = 122,
        MERF = 123,
        MFGS = 124,
        MFGSP = 125,
        MFON = 126,
        MGNT = 127,
        MGNZ = 128,
        MGTS = 129,
        MGTSP = 130,
        MISB = 131,
        MISBP = 132,
        MMBM = 133,
        MNFD = 134,
        MOBB = 135,
        MOEX = 136,
        MORI = 137,
        MOTZ = 138,
        MRKC = 139,
        MRKK = 140,
        MRKP = 141,
        MRKS = 142,
        MRKU = 143,
        MRKV = 144,
        MRKY = 145,
        MRKZ = 146,
        MRSB = 147,
        MSNG = 148,
        MSRS = 149,
        MSSB = 150,
        MSST = 151,
        MSTT = 152,
        MTLR = 153,
        MTLRP = 154,
        MTSS = 155,
        MUGS = 156,
        MUGSP = 157,
        MVID = 158,
        NAUK = 159,
        NBTR = 160,
        NFAZ = 161,
        NKNC = 162,
        NKNCP = 163,
        NKSH = 164,
        NLMK = 165,
        NMTP = 166,
        NNSB = 167,
        NNSBP = 168,
        NPOF = 169,
        NSVZ = 170,
        NVNG = 171,
        NVNGP = 172,
        NVTK = 173,
        ODVA = 174,
        OFCB = 175,
        OGKB = 176,
        OMSH = 177,
        OMZZP = 178,
        OPIN = 179,
        OSMP = 180,
        OTCP = 181,
        PAZA = 182,
        PETR = 183,
        PGIL = 184,
        PHOR = 185,
        PHST = 186,
        PIKK = 187,
        PLSM = 188,
        PLZL = 189,
        PMSB = 190,
        PMSBP = 191,
        POLY = 192,
        PRFN = 193,
        PRIM = 194,
        PRMB = 195,
        PRTK = 196,
        PSBR = 197,
        QIWI = 198,
        RASP = 199,
        RBCM = 200,
        RDRB = 201,
        REBR = 202,
        RGSS = 203,
        RKKE = 204,
        RLMN = 205,
        RLMNP = 206,
        RNAV = 207,
        RODNP = 208,
        ROLO = 209,
        ROSB = 210,
        ROSN = 211,
        ROST = 212,
        RSEA = 213,
        RSTI = 214,
        RSTIP = 215,
        RTGZ = 216,
        RTKM = 217,
        RTKMP = 218,
        RTSB = 219,
        RTSBP = 220,
        RUALR = 221,
        RUGR = 222,
        RUSI = 223,
        RUSP = 224,
        RZSB = 225,
        SAGO = 226,
        SAGOP = 227,
        SARE = 228,
        SAREP = 229,
        SBER = 230,
        SBERP = 231,
        SELG = 232,
        SELGP = 233,
        SELL = 234,
        SEMZ = 235,
        SIBN = 236,
        SKYC = 237,
        SNGS = 238,
        SNGSP = 239,
        STSB = 240,
        STSBP = 241,
        SVAV = 242,
        SXPNP = 243,
        SYNG = 244,
        SZPR = 245,
        TAER = 246,
        TANL = 247,
        TANLP = 248,
        TASB = 249,
        TASBP = 250,
        TATN = 251,
        TATNP = 252,
        TAVR = 253,
        TFKF = 254,
        TGKA = 255,
        TGKB = 256,
        TGKBP = 257,
        TGKD = 258,
        TGKDP = 259,
        TGKN = 260,
        TGKO = 261,
        TORS = 262,
        TORSP = 263,
        TRCN = 264,
        TRMK = 265,
        TRNFP = 266,
        TRUDP = 267,
        TTLK = 268,
        TUCH = 269,
        TUZA = 270,
        UAZA = 271,
        UCSS = 272,
        UKUZ = 273,
        UNAC = 274,
        UNKL = 275,
        URFD = 276,
        URKA = 277,
        URKZ = 278,
        USBN = 279,
        UTAR = 280,
        UTII = 281,
        VDSB = 282,
        VGSB = 283,
        VGSBP = 284,
        VJGZ = 285,
        VJGZP = 286,
        VLHZ = 287,
        VRAO = 288,
        VRAOP = 289,
        VRPH = 290,
        VRSB = 291,
        VRSBP = 292,
        VSMO = 293,
        VSYD = 294,
        VSYDP = 295,
        VTBR = 296,
        VTGK = 297,
        VTRS = 298,
        VZRZ = 299,
        VZRZP = 300,
        WTCM = 301,
        WTCMP = 302,
        YAKG = 303,
        YASH = 304,
        YKEN = 305,
        YKENP = 306,
        YNDX = 307,
        YRSB = 308,
        YRSBP = 309,
        YRSL = 310,
        ZHIV = 311,
        ZILL = 312,
        ZMZN = 313,
        ZMZNP = 314,
        ZVEZ = 315,
    }
}

declare module tn {
    enum OrderStatusCodes {
        Received = 1,
        Cancel = 2,
        Placed = 10,
        Sent = 11,
        PartialFill = 12,
        CancelSent = 13,
        PartialExecuted = 20,
        Executed = 21,
        PartialCanceled = 30,
        Cancelled = 31,
        Rejected = 70,
        Expired = 71,
        PartialExpired = 72,
        MarketPlaceError = 73,
        SendError = 74,
        CancelError = 75,
    }
    enum OrderActionTypes {
        Buy = 1,
        BuyOnMargin = 2,
        Sell = 3,
        SellShort = 4,
    }
    enum OrderTypes {
        Market = 1,
        Limit = 2,
        Stop = 3,
        StopLimit = 4,
    }
    enum OrderExpirationTypes {
        Day = 1,
        DayExt = 2,
        GTC = 3,
    }
}

declare module tn {
    enum SecurityType {
        Stock = 1,
        Bond = 2,
        Futures = 3,
        Option = 4,
        Indexes = 5,
        Money = 6,
        Night = 7,
    }
    enum SecurityKind {
        Common = 1,
        Pref = 2,
        Percent = 3,
        Discount = 4,
        Delivery = 5,
        Rated = 6,
        Interval = 7,
        Crypto = 8,
    }
}

declare module tn {
    enum CurrencyCodes {
        USD = 0,
        EUR = 1,
        RUR = 2,
    }
}

declare module tn {
    interface ITraderNetAuth {
        apiKey: string;
        securityKey: string;
    }
    interface ITraderNetOpts {
        onPortfolio?: (portfolio: ITraderNetPortfolio) => void;
        onPortfolioOnce?: (portfolio: ITraderNetPortfolio) => void;
        onOrders?: (orders: Array<IOrder>) => void;
        onOrdersOnce?: (orders: Array<IOrder>) => void;
        onQuotes?: (quotes: Array<ITraderNetQuote>) => void;
        onQuotesOnce?: (quotes: Array<ITraderNetQuote>) => void;
    }
    interface IPutOrderData {
        ticket: TicketCodes;
        action: OrderActionTypes;
        orderType: OrderTypes;
        currency: CurrencyCodes;
        quantity: number;
        limitPrice?: number;
        stopPrice?: number;
        allOrNothing?: boolean;
        expiration?: OrderExpirationTypes;
        groupPortfolio?: number;
        userOrderId?: number;
    }
    interface IOrder {
        id: number;
        date: string;
        status: OrderStatusCodes;
        statusOriginal: OrderStatusCodes;
        statusDate: string;
        security: TicketCodes;
        securityName: string;
        securityName2: string;
        oper: number;
        type: number;
        currency: CurrencyCodes;
        price: number;
        stopPrice: number;
        quantity: number;
        allOrNothing: boolean;
        expiration: OrderExpirationTypes;
        rep: string;
        fv: string;
        stat_prev: number;
        userOrderId: string;
    }
    interface ITraderNetAccount {
        availableAmount: number;
        currency: CurrencyCodes;
        currencyRate: number;
        forecastIn: number;
        forecastOut: number;
    }
    interface ITraderNetPosition {
        security: TicketCodes;
        securityType: SecurityType;
        securityKind: SecurityKind;
        price: number;
        quantity: number;
        currency: CurrencyCodes;
        currencyRate: number;
        securityName: string;
        securityName2: string;
        openPrice: number;
        marketPrice: number;
    }
    interface ITraderNetPortfolio {
        key: string;
        accounts: Array<ITraderNetAccount>;
        positions: Array<ITraderNetPosition>;
    }
    interface ITraderNetAuthResult {
        login: string;
        mode: string;
        trade: boolean;
    }
    interface IPutOrderResult {
        orderId: number;
    }
    interface ITraderNetPutOrderData {
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
    interface ITraderNetQuote {
        security: TicketCodes;
        latestPrice: number;
    }
}

declare module tn {
    function formatPutOrder(data: IPutOrderData): tn.ITraderNetPutOrderData;
    function mapPortfolio(servicePortfolio: any): tn.ITraderNetPortfolio;
    function mapOrder(tnOrder: any): tn.IOrder;
    function mapQuotes(serviceQuote: any): tn.ITraderNetQuote;
}

/// <reference path="../typings/node/node.d.ts" />
declare module tn {
    interface ISecurity {
        ticket: TicketCodes;
        code: string;
        lotSize: number;
    }
    function getSecurity(code: TicketCodes): ISecurity;
    function getCodes(tickets: Array<TicketCodes | string>, sort?: boolean): Array<string>;
}

/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/socket.io-client/socket.io-client.d.ts" />
/// <reference path="../typings/bluebird/bluebird.d.ts" />
declare module tn {
    class TraderNet {
        private url;
        private opts;
        private ws;
        private resolvers;
        private auth;
        constructor(url: string, opts: ITraderNetOpts);
        connect(auth: ITraderNetAuth): Promise<ITraderNetAuthResult>;
        disconnect(): Promise<any>;
        putOrder(data: tn.IPutOrderData): Promise<tn.IPutOrderResult>;
        notifyPortfolio: () => void;
        notifyOrders: () => void;
        notifyQuotes: (tickets: (string | TicketCodes)[]) => void;
        createNewInstance(opts: tn.ITraderNetOpts): Promise<TraderNet>;
        notifyQuotesAsync: (tickets: (string | TicketCodes)[]) => Promise<ITraderNetQuote[]>;
        notifyOrdersAsync: () => Promise<IOrder[]>;
        notifyPortfolioAsync: () => Promise<ITraderNetPortfolio>;
    }
}
