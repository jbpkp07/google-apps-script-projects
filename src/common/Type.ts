abstract class Type {
    // nouns
    static boolean = () => Type.isBoolean;

    static number = () => Type.isNumber;

    static numberArray = () => Type.isArrayOf(Type.number());

    static stringOfMinLength = (length: number) => Type.isStringOfMinLength(length);

    // questions
    static isArray = (value: unknown): value is unknown[] => {
        return Array.isArray(value);
    };

    static isArrayOf = <T>(isTypeOK: IsTypeOK<T>): IsArrayOK<T> => {
        //
        const isArray = (value: unknown): value is NotError<T>[] => {
            return Type.isArray(value) && value.every(isTypeOK);
        };

        return isArray;
    };

    static isBasicRecord = (value: unknown): value is NotError<BasicRecord> => {
        return (
            Type.isObject(value) &&
            !Type.isArray(value) &&
            !Type.isError(value) &&
            Object.keys(value).every(Type.isStringOfMinLength(1))
        );
    };

    static isBoolean = (value: unknown): value is boolean => {
        return typeof value === "boolean";
    };

    static isError = (value: unknown): value is Error => {
        return value instanceof Error;
    };

    static isNonEmptyRecord = (value: unknown): value is NotError<BasicRecord> => {
        return Type.isBasicRecord(value) && Object.keys(value).length > 0;
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

    static isStringOfMinLength = (length: number): IsStringOK => {
        //
        const isString = (value: unknown): value is string => {
            return Type.isString(value) && value.length >= length;
        };

        return isString;
    };
}
