export enum ActionTypes {
    Buy = 1,
    BuyOnMargin,
    Sell,
    SellShort
}

export enum OrderTypes {
    Market = 1,
    Limit,
    Stop,
    StopLimit
}

export enum CurrencyCodes {
    USD,
    EUR,
    RUR
}

export enum ExpirationTypes {
    Day = 1, //current market session
    DayExt, //Day / Night or Night / Day
    GTC //Till cancel
}
