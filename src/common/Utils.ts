/// <reference path="./Type.ts" />
/// <reference path="./Either.ts" />

abstract class Utils {
    static alert = (anything: unknown): void => {
        const message = Utils.stringify(anything);
        const timeStampMessage = Utils.createTimeStampMessage(message);

        try {
            SpreadsheetApp.getUi().alert(timeStampMessage);
        } catch {
            console.log(timeStampMessage); // log to cloud
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

    static fetchData = (url: string): Either<unknown> => {
        try {
            const json: string = UrlFetchApp.fetch(url).getContentText();
            const data: unknown = JSON.parse(json);

            return Either.new(data);
        } catch (error) {
            return Either.fromError(error);
        }
    };

    static fetchDataOf = <T>(isTypeOK: IsTypeOK<T>): FetchData<T> => {
        //
        const fetchData = (url: string): Either<T> => {
            try {
                const json: string = UrlFetchApp.fetch(url).getContentText();
                const data: unknown = JSON.parse(json);

                return isTypeOK(data)
                    ? Either.new(data)
                    : Either.error(`Fetched bad data from ${url}; Data: ${Utils.stringify(data)}`);
            } catch (error) {
                return Either.fromError(error);
            }
        };

        return fetchData;
    };

    static getCurrentTime = (): string => {
        return new Date().toLocaleTimeString();
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

        const isSimple = Type.isError(anything) || !Type.isObject(anything);

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

/* eslint @typescript-eslint/member-ordering: ["warn", { default: { order: "natural" } }] */
