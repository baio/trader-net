export declare enum OrderStatusCodes {
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
export declare enum OrderActionTypes {
    Buy = 1,
    BuyOnMargin = 2,
    Sell = 3,
    SellShort = 4,
}
export declare enum OrderTypes {
    Market = 1,
    Limit = 2,
    Stop = 3,
    StopLimit = 4,
}
export declare enum OrderExpirationTypes {
    Day = 1,
    DayExt = 2,
    GTC = 3,
}
