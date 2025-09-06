/// <reference path="./Either.ts" />

/* eslint @typescript-eslint/member-ordering: ["warn", { default: { order: "natural-case-insensitive" } }] */

abstract class Utils {
    static alert = (anything: unknown): void => {
        const message = Utils.stringify(anything);
        const timeStampMessage = Utils.createTimeStampMessage(message);

        try {
            SpreadsheetApp.getUi().alert(timeStampMessage);
        } catch {
            console.log(timeStampMessage);
        }
    };

    static createTimeStampMessage = (message: string): string => {
        const timeStamp = Utils.getCurrentTime();

        return `[${timeStamp}] ${message}`;
    };

    static createUniqueURL = (url: string): string => {
        Utilities.sleep(1);

        const trimmedUrl = Utils.trim(url, "/");
        const uniqueNumber = Date.now().toString();

        if (trimmedUrl.endsWith("?")) {
            return trimmedUrl + "" + uniqueNumber;
        }

        if (trimmedUrl.includes("?")) {
            return trimmedUrl + "&" + uniqueNumber;
        }

        return trimmedUrl + "/?" + uniqueNumber;
    };

    static createUrl = (domain: string, slug: string): string => {
        return Utils.trim(domain, "/") + "/" + Utils.trim(slug, "/");
    };

    static fetch = <T>(url: string, isTypeOK: IsTypeOK<T>): Either<T> => {
        try {
            const response = UrlFetchApp.fetch(url).getContentText();
            const parsedResponse: unknown = JSON.parse(response);

            return isTypeOK(parsedResponse)
                ? Either.new(parsedResponse)
                : Either.newError(`Fetched wrong type from ${url}; Response: ${response}`);
        } catch (error) {
            return Either.fromError(error);
        }
    };

    static getCurrentTime = (): string => {
        return new Date().toLocaleTimeString();
    };

    static isArray = (value: unknown): value is unknown[] => {
        return Array.isArray(value);
    };

    static isArrayOf = <T>(isTypeOK: IsTypeOK<T>): IsTypeOK<T[]> => {
        //
        function isArrayOfType(values: unknown): values is NotError<T>[] {
            return Utils.isArray(values) && values.every(isTypeOK);
        }

        return isArrayOfType;
    };

    static isBoolean = (value: unknown): value is boolean => {
        return typeof value === "boolean";
    };

    static isError = (value: unknown): value is Error => {
        return value instanceof Error;
    };

    static isNonEmptyRecord = (value: unknown): value is BasicRecord => {
        return (
            Utils.isObject(value) &&
            !Utils.isArray(value) &&
            Object.keys(value).length > 0 &&
            Object.keys(value).every(Utils.isNonEmptyString)
        );
    };

    static isNonEmptyString = (value: unknown): value is string => {
        return typeof value === "string" && value.length > 0;
    };

    static isNumber = (value: unknown): value is number => {
        return typeof value === "number";
    };

    static isNumberArray = (values: unknown): values is number[] => {
        return Utils.isArray(values) && values.every(Utils.isNumber);
    };

    static isObject = (value: unknown): value is NonNullable<object> => {
        return typeof value === "object" && value !== null;
    };

    static isString = (value: unknown): value is string => {
        return typeof value === "string";
    };

    static logToCloud = (anything: unknown): void => {
        const message = Utils.stringify(anything);
        const timeStampMessage = Utils.createTimeStampMessage(message);

        console.log(timeStampMessage);
    };

    static stringify = (anything: unknown): string => {
        if (anything instanceof Either) {
            return Utils.stringify(anything.value());
        }

        const isSimple = Utils.isError(anything) || !Utils.isObject(anything);

        return isSimple ? String(anything) : JSON.stringify(anything);
    };

    static trim = (str: string, pattern: string): string => {
        if (str.startsWith(pattern)) {
            const start = pattern.length;

            return Utils.trim(str.substring(start), pattern);
        }

        if (str.endsWith(pattern)) {
            const end = str.length - pattern.length;

            return Utils.trim(str.substring(0, end), pattern);
        }

        return str;
    };
}

// type Price = {
//     name: string;
//     postmarketPrice: number;
//     // eslint-disable-next-line @typescript-eslint/member-ordering
//     postmarketChange: number;
//     postmarketChangePercent: number;
// };

// const isPrice = (price: unknown): price is Price => {
//     return (
//         Utils.isNonEmptyRecord(price) &&
//         Utils.isNonEmptyString(price.name) &&
//         Utils.isNumber(price.postmarketPrice) &&
//         Utils.isNumber(price.postmarketChange) &&
//         Utils.isNumber(price.postmarketChangePercent)
//     );
// };

// type PricesResponse = {
//     status: number;
//     // eslint-disable-next-line @typescript-eslint/member-ordering
//     data: Price[];
// };

// function isPricesResponse(response: unknown): response is PricesResponse {
//     return (
//         // prettier-ignore
//         Utils.isNonEmptyRecord(response) &&
//         Utils.isNumber(response.status) &&
//         Utils.isArrayOf(isPrice)(response.data)
//     );
// }
