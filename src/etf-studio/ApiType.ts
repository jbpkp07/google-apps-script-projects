/// <reference path="./consts.ts" />
/// <reference path="../common/Type.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
abstract class ApiType {
    // nouns
    static price = () => ApiType.isPrice;

    static pricesResponse = () => ApiType.isPricesResponse;

    // questions
    static isPrice = (value: unknown): value is Price => {
        const { name, postmarketPrice, postmarketChange, postmarketChangePercent } = (value ?? {}) as Price;

        return (
            Type.isNonEmptyRecord(value) &&
            Type.isStringOfMinLength(1)(name) &&
            Type.isNumber(postmarketPrice) &&
            Type.isNumber(postmarketChange) &&
            Type.isNumber(postmarketChangePercent)
        );
    };

    static isPricesResponse = (value: unknown): value is PricesResponse => {
        const { status, data } = (value ?? {}) as PricesResponse;

        return (
            Type.isNonEmptyRecord(value) && // prettier-ignore
            Type.isNumber(status) &&
            Type.isArrayOf(ApiType.price())(data)
        );
    };
}
