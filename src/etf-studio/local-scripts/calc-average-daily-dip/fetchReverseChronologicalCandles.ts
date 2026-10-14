import fetchYahooQuote, { Ticker, YahooQuote } from "./fetchYahooQuote";

export default fetchReverseChronologicalCandles;
export { Candle, isNumber };

type NumberOrNull = number | null;

type FetchedCandles = Promise<Candle[] | null>;

type RawCandle = {
    open: NumberOrNull;
    high: NumberOrNull;
    low: NumberOrNull;
    close: NumberOrNull;
    volume: NumberOrNull;
};

type Candle = RawCandle & {
    ticker: Ticker;
    prevClose: NumberOrNull;
};

const RAW_CANDLE_KEYS: Readonly<(keyof RawCandle)[]> = ["open", "high", "low", "close", "volume"];

async function fetchReverseChronologicalCandles(ticker: Ticker, lookbackDayCount: number): FetchedCandles {
    // add extra day, so that all desired lookback candles will have a 'prevClose' value
    const extraDayCount = lookbackDayCount + 1;

    const quote = await fetchYahooQuote(ticker, extraDayCount);

    if (!quote) {
        return null;
    }

    const chronCandles = toChronologicalCandles(ticker, quote);

    // remove the first chronological candle (no accurate 'prevClose' value), then...
    // reverse so that candles are ordered:  newest -> oldest (reverse chronological order)
    return chronCandles.slice(1).reverse();
}

function toChronologicalCandles(ticker: Ticker, quote: YahooQuote): Candle[] {
    const rawCandles = toRawCandles(quote);
    const repairedRawCandles = repairRawCandles(ticker, rawCandles);

    logNullCounts(ticker, repairedRawCandles);

    return toCandles(ticker, repairedRawCandles);
}

function toRawCandles(quote: YahooQuote): RawCandle[] {
    const { open, high, low, close, volume } = quote;

    const toNumberOrNull = (val: unknown) => (isNumber(val) ? val : null);

    const toRawCandle = (_val: unknown, i: number): RawCandle => ({
        open: toNumberOrNull(open[i]),
        high: toNumberOrNull(high[i]),
        low: toNumberOrNull(low[i]),
        close: toNumberOrNull(close[i]),
        volume: toNumberOrNull(volume[i])
    });

    return quote.open.map(toRawCandle);
}

function repairRawCandles(ticker: Ticker, rawCandles: RawCandle[]): RawCandle[] {
    //
    const toRepairedCandle = (rawCandle: RawCandle, i: number) => {
        const left = rawCandles[i - 1];
        const right = rawCandles[i + 1];

        const result = { ...rawCandle };
        const repairedKeys: string[] = [];
        const daysAgo = rawCandles.length - 1 - i;

        for (const key of RAW_CANDLE_KEYS) {
            const leftValue = left?.[key];
            const rightValue = right?.[key];

            // Case 1: Interpolate single missing day between valid neighbors
            if (!isNumber(result[key]) && isNumber(leftValue) && isNumber(rightValue)) {
                result[key] = (leftValue + rightValue) / 2;
                repairedKeys.push(key);

                continue;
            }

            // Case 2: Forward-fill last known good value for the most-recent day only
            if (!isNumber(result[key]) && isNumber(leftValue) && daysAgo === 0) {
                result[key] = leftValue;
                repairedKeys.push(key);
            }
        }

        if (repairedKeys.length > 0) {
            console.log(`[${ticker}]\t✅ Candle repaired:`, { daysAgo, keys: repairedKeys.join(",") });
        }

        return result;
    };

    return rawCandles.map(toRepairedCandle);
}

function logNullCounts(ticker: Ticker, candles: RawCandle[]): void {
    //
    const calcNullCount = (key: keyof RawCandle) => {
        const toCandleProp = (candle: RawCandle) => candle[key];

        return candles.map(toCandleProp).filter(isNull).length;
    };

    const nullCounts: Record<keyof RawCandle, number> = {
        open: calcNullCount("open"),
        high: calcNullCount("high"),
        low: calcNullCount("low"),
        close: calcNullCount("close"),
        volume: calcNullCount("volume")
    };

    const nullsFound = Object.values(nullCounts).some((count) => count > 0);

    if (nullsFound) {
        console.log(`[${ticker}]\t⚠️  Candle null values found (not repaired).\n\tTotals by key:`, nullCounts);
    }
}

function toCandles(ticker: Ticker, rawCandles: RawCandle[]): Candle[] {
    //
    const toCandle = (rawCandle: RawCandle, i: number) => {
        const prevCandle = rawCandles[i - 1]; // first prevCandle === undefined
        const prevClose = prevCandle?.close ?? null;

        return { ticker, ...rawCandle, prevClose };
    };

    return rawCandles.map(toCandle);
}

function isNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value);
}

function isNull(value: unknown): value is null {
    return value === null;
}
