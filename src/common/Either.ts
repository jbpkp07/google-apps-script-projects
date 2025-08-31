/// <reference path="./types.ts" />
/// <reference path="./Utils.ts" />

class Either<T> {
    private readonly _value: Error | NotError<T>;

    constructor(value: Error | NotError<T>) {
        this._value = value;
    }

    static new<T>(value: Error | NotError<T>): Either<T> {
        return new Either<T>(value);
    }

    static newError<T>(message?: string): Either<T> {
        const value = new Error(message);

        return new Either<T>(value);
    }

    public value(): Error | NotError<T> {
        return this._value;
    }

    public unwrap(): NotError<T> {
        if (Utils.isError(this._value)) {
            throw this._value;
        }

        return this._value;
    }

    public isOK(): boolean {
        return !Utils.isError(this._value);
    }

    public assertOK(): void {
        if (Utils.isError(this._value)) {
            throw this._value;
        }
    }
}
