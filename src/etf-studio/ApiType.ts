/// <reference path="./consts.ts" />
/// <reference path="../common/Type.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
abstract class ApiType {
    static isHttpStatusOK = (value: unknown): value is 200 => {
        return Type.isLiteralOf(200)(value);
    };

    static isTicker = (value: unknown): value is Ticker => {
        return Type.isStringOfMinLength(1)(value) && TICKERS.includes(value as Ticker);
    };

    static isSymbol = (value: unknown): value is TickerSymbol => {
        return Type.isStringOfMinLength(1)(value) && SYMBOLS.includes(value as TickerSymbol);
    };

    static isDaytimePricesData = (value: unknown): value is DaytimePricesData => {
        const maybe = value as DaytimePricesData;

        return (
            Type.isNonEmptyRecord(maybe) &&
            ApiType.isSymbol(maybe.name) &&
            Type.isNumberOrUndefined(maybe.price) &&
            Type.isNumberOrUndefined(maybe.chg) &&
            Type.isNumberOrUndefined(maybe.change) &&
            Type.isNumberOrUndefined(maybe.volume)
        );
    };

    static isDaytimePricesResponse = (value: unknown): value is DaytimePricesResponse => {
        const maybe = value as DaytimePricesResponse;

        return (
            Type.isNonEmptyRecord(maybe) &&
            ApiType.isHttpStatusOK(maybe.status) &&
            Type.isArrayOf(ApiType.DaytimePricesData())(maybe.data)
        );
    };

    static isWatchListData = (value: unknown): value is WatchListData => {
        const maybe = value as WatchListData;

        return (
            Type.isNonEmptyRecord(maybe) &&
            ApiType.isSymbol(maybe.s) &&
            Type.isStringOfMinLength(1)(maybe.n) &&
            Type.isNumberOrUndefined(maybe.price) &&
            Type.isNumberOrUndefined(maybe.change) &&
            Type.isNumberOrUndefined(maybe.volume) &&
            Type.isNumberOrUndefined(maybe.high52) &&
            Type.isNumberOrUndefined(maybe.high52ch)
        );
    };

    static isWatchListResponse = (value: unknown): value is WatchListResponse => {
        const maybe = value as WatchListResponse;

        return (
            Type.isNonEmptyRecord(maybe) &&
            ApiType.isHttpStatusOK(maybe.status) &&
            Type.isArrayOf(ApiType.WatchListData())(maybe.data)
        );
    };

    // nouns
    static DaytimePricesData = () => ApiType.isDaytimePricesData;

    static DaytimePricesResponse = () => ApiType.isDaytimePricesResponse;

    static WatchListData = () => ApiType.isWatchListData;

    static WatchListResponse = () => ApiType.isWatchListResponse;
}
