export enum SecurityType {
    Stock=1,// Акция Stock
    Bond=2,// Облигация Bond
    Futures=3,// Фьючерсы Futures
    Option=4,//  Опционы Option
    Indexes=5,// Индексы Indexes
    Money=6,// Деньги Money
    Night=7,// Ночные торги NightTrade
}

export enum SecurityKind {
    Common=1,// Обыкновенные
    Pref=2,// Привилегированные
    Percent=3,//  Процентные
    Discount=4,// Дисконтные
    Delivery=5,// Поставочный
    Rated=6, //Расчетный
    Interval=7,// Интервальный
    Crypto=8// Криптовалюта
}
