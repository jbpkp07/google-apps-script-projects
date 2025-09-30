/// <reference path="./Type.ts" />

class Either<T = undefined> {
    private readonly _value: Error | NotError<T>;

    constructor(value?: Error | NotError<T>) {
        this._value = value as Error | NotError<T>;
    }

    private static stringify(anything: unknown): string {
        if (anything instanceof Either) {
            return Either.stringify(anything.value());
        }

        const isSimple = Type.isError(anything) || !Type.isObject(anything);

        return isSimple ? String(anything) : JSON.stringify(anything);
    }

    static new<T = undefined>(value?: Error | NotError<T>): Either<T> {
        return new Either<T>(value);
    }

    static newError<T>(message?: string): Either<T> {
        const value = new Error(message);

        return new Either<T>(value);
    }

    static fromError<T>(error: unknown): Either<T> {
        return Type.isError(error) // prettier-ignore
            ? Either.new<T>(error)
            : Either.newError<T>(Either.stringify(error));
    }

    public value(): Error | NotError<T> {
        return this._value;
    }

    public unwrap(): ThrowsOrReturns<T> {
        if (Type.isError(this._value)) {
            throw this._value;
        }

        return this._value;
    }

    public isOK(): boolean {
        return !Type.isError(this._value);
    }

    public assertOK(): ThrowsOrReturns<void> {
        if (Type.isError(this._value)) {
            throw this._value;
        }
    }
}
