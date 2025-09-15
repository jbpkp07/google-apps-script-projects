/// <reference path="./consts.ts" />
/// <reference path="../common/Type.ts" />

type MarketPrice = StockAnalysisApi.MarketPrice;
type MarketPriceData = StockAnalysisApi.MarketPriceData;

type PreMarketPrice = StockAnalysisApi.PreMarketPrice;
type PreMarketPriceData = StockAnalysisApi.PreMarketPriceData;

type PostMarketPrice = StockAnalysisApi.PostMarketPrice;
type PostMarketPriceData = StockAnalysisApi.PostMarketPriceData;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
abstract class ApiType {
    // nouns
    static marketPrice = () => ApiType.isMarketPrice;

    static preMarketPrice = () => ApiType.isPreMarketPrice;

    static postMarketPrice = () => ApiType.isPostMarketPrice;

    // questions
    static isMarketPrice = (value: unknown): value is MarketPrice => {
        const maybe = value as MarketPrice;

        return (
            Type.isNonEmptyRecord(maybe) &&
            Type.isStringOfMinLength(1)(maybe.name) &&
            Type.isNumberOrUndefined(maybe.price) &&
            Type.isNumberOrUndefined(maybe.chg) &&
            Type.isNumberOrUndefined(maybe.change) &&
            Type.isNumberOrUndefined(maybe.volume)
        );
    };

    static isMarketPriceData = (value: unknown): value is MarketPriceData => {
        const maybe = value as MarketPriceData;

        // prettier-ignore
        return (
            Type.isNonEmptyRecord(maybe) &&
            Type.isNumber(maybe.status) &&
            Type.isArrayOf(ApiType.marketPrice())(maybe.data)
        );
    };

    static isPreMarketPrice = (value: unknown): value is PreMarketPrice => {
        const maybe = value as PreMarketPrice;

        return (
            Type.isNonEmptyRecord(maybe) &&
            Type.isStringOfMinLength(1)(maybe.name) &&
            Type.isNumberOrUndefined(maybe.premarketPrice) &&
            Type.isNumberOrUndefined(maybe.premarketChange) &&
            Type.isNumberOrUndefined(maybe.premarketChangePercent)
        );
    };

    static isPreMarketPriceData = (value: unknown): value is PreMarketPriceData => {
        const maybe = value as PreMarketPriceData;

        // prettier-ignore
        return (
            Type.isNonEmptyRecord(maybe) &&
            Type.isNumber(maybe.status) &&
            Type.isArrayOf(ApiType.preMarketPrice())(maybe.data)
        );
    };

    static isPostMarketPrice = (value: unknown): value is PostMarketPrice => {
        const maybe = value as PostMarketPrice;

        return (
            Type.isNonEmptyRecord(maybe) &&
            Type.isStringOfMinLength(1)(maybe.name) &&
            Type.isNumberOrUndefined(maybe.postmarketPrice) &&
            Type.isNumberOrUndefined(maybe.postmarketChange) &&
            Type.isNumberOrUndefined(maybe.postmarketChangePercent)
        );
    };

    static isPostMarketPriceData = (value: unknown): value is PostMarketPriceData => {
        const maybe = value as PostMarketPriceData;

        // prettier-ignore
        return (
            Type.isNonEmptyRecord(maybe) &&
            Type.isNumber(maybe.status) &&
            Type.isArrayOf(ApiType.postMarketPrice())(maybe.data)
        );
    };
}
