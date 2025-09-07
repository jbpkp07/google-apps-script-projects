abstract class Type {
    static boolean = () => Type.isBoolean;

    static nonEmptyString = () => Type.isNonEmptyString;

    static numberArray = () => Type.isArrayOf(Type.isNumber);

    static isArray = (value: unknown): value is unknown[] => {
        return Array.isArray(value);
    };

    static isArrayOf = <T>(isTypeOK: IsTypeOK<T>): IsTypeOK<T[]> => {
        //
        const isArray = (values: unknown): values is NotError<T>[] => {
            return Type.isArray(values) && values.every(isTypeOK);
        };

        return isArray;
    };

    static isBoolean = (value: unknown): value is boolean => {
        return typeof value === "boolean";
    };

    static isError = (value: unknown): value is Error => {
        return value instanceof Error;
    };

    static isNonEmptyRecord = (value: unknown): value is BasicRecord => {
        return (
            Type.isObject(value) &&
            !Type.isArray(value) &&
            Object.keys(value).length > 0 &&
            Object.keys(value).every(Type.isNonEmptyString)
        );
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
}
