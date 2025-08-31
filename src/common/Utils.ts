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

    static getCurrentTime = (): string => {
        return new Date().toLocaleTimeString();
    };

    static isBoolean = (value: unknown): value is boolean => {
        return typeof value === "boolean";
    };

    static isError = (value: unknown): value is Error => {
        return value instanceof Error;
    };

    static isNonEmptyString = (value: unknown): value is string => {
        return typeof value === "string" && value.length > 0;
    };

    static isNumber = (value: unknown): value is number => {
        return typeof value === "number";
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
