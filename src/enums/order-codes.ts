module tn {
    export enum OrderStatusCodes
    {
        Received = 1, //Получен
        Cancel = 2, //Запрос на отмену
        Placed = 10, //Размещён
        Sent = 11, //Посланный
        PartialFill = 12, //Частично заполнен
        CancelSent = 13, //Отменить Отправленные
        PartialExecuted = 20, //Частично выполнен
        Executed = 21, //Выполнен
        PartialCanceled = 30,
        Cancelled = 31, //Отменён
        Rejected = 70, //Отказ
        Expired = 71, //Срок действия истёк
        PartialExpired = 72, //Срок действия истёк(частично выполнен
        MarketPlaceError = 73,
        SendError = 74,
        CancelError = 75
    }


    export enum OrderActionTypes {
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

    export enum OrderExpirationTypes {
        Day = 1, //current market session
        DayExt, //Day / Night or Night / Day
        GTC //Till cancel
    }

}