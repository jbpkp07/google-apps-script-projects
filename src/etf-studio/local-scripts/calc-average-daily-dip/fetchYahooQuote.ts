export default fetchYahooQuote;
export { Ticker, YahooQuote };

type Ticker = "SPYM" | "SPMO" | "GARP" | "FMTM" | "XMMO" | "AVLV" | "AVUV";

type FetchedYahooQuote = Promise<YahooQuote | null>;
type FetchedYahooResponse = Promise<YahooChartResponse | null>;

type YahooChartResponse = {
    chart: {
        result: YahooChartResult[] | null;
        error: { code: string; description: string } | null; // null object when no error
    };
};

type YahooChartResult = {
    meta: {
        symbol: Ticker;
        dataGranularity: "1d"; // other strings are possible, but this is what is used
        range: "251d"; // other strings are possible, but this is what is used
    };
    timestamp: number[];
    indicators: {
        quote: YahooQuote[];
        adjclose: { adjclose: unknown[] }[];
    };
};

type YahooQuote = {
    open: unknown[]; // Should be 'number | null'
    high: unknown[];
    low: unknown[];
    close: unknown[];
    volume: unknown[];
};

async function fetchYahooQuote(ticker: Ticker, lookbackDayCount: number): FetchedYahooQuote {
    const response = await fetchYahooChartResponse(ticker, lookbackDayCount);

    const quote: unknown = response?.chart?.result?.[0]?.indicators?.quote?.[0];

    if (!isYahooQuote(quote)) {
        console.error(`[${ticker}] Yahoo Response Quote does NOT match expected type 'YahooQuote'`, quote);

        return null;
    }

    const ohlcv = [quote.open, quote.high, quote.low, quote.close, quote.volume];
    const ohlcvLengths = ohlcv.map((arr) => arr.length);

    if (!allEqual(ohlcvLengths)) {
        console.error(`[${ticker}] Bad Yahoo Quote data; Parallel quote arrays have different lengths`);

        return null;
    }

    const commonLength = ohlcvLengths[0];

    if (commonLength !== lookbackDayCount) {
        console.error(
            `[${ticker}] Bad Yahoo Quote data;`,
            `Common parallel quote array length (${String(commonLength)}) !== lookbackDayCount (${lookbackDayCount})\n`,
            `Note: This can happen if the lookback window extends past the fund's inception date.`
        );

        return null;
    }

    return quote;
}

async function fetchYahooChartResponse(ticker: Ticker, lookbackDayCount: number): FetchedYahooResponse {
    const range = `${lookbackDayCount}d`;
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=${range}`;

    try {
        const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });

        if (!response.ok) {
            console.error(`[${ticker}] Fetch failed: ${response.statusText}`);

            return null;
        }

        const json = (await response.json()) as YahooChartResponse;

        if (json?.chart?.error !== null) {
            console.error(`[${ticker}] Fetch failed: ${String(json?.chart?.error)}`);

            return null;
        }

        return json;
    } catch (error) {
        console.error(`[${ticker}] Execution error:`, error);

        return null;
    }
}

function allEqual<T>(arr: T[]): boolean {
    if (arr.length === 0) {
        return true;
    }

    const commonVal = arr[0] as T;

    return arr.every((val) => val === commonVal);
}

function isYahooQuote(value: unknown): value is YahooQuote {
    const maybeQuote = value as YahooQuote;

    return (
        isRecord(maybeQuote) &&
        isArray(maybeQuote.open) &&
        isArray(maybeQuote.high) &&
        isArray(maybeQuote.low) &&
        isArray(maybeQuote.close) &&
        isArray(maybeQuote.volume)
    );
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return Object.prototype.toString.call(value) === "[object Object]";
}

function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

// eslint-disable-next-line
const _justForTypeConfirmation: YahooChartResponse = {
    chart: {
        result: [
            {
                meta: {
                    symbol: "SPYM",
                    dataGranularity: "1d",
                    range: "251d"
                },
                timestamp: [
                    1775050200, 1775136600, 1775482200, 1775568600, 1775655000, 1775741400, 1775827800, 1776087000,
                    1776173400, 1776259800, 1776346200, 1776432600
                ],
                indicators: {
                    quote: [
                        {
                            high: [
                                658.52001953125, 658.200012207031, 659.719970703125, 659.609985351563, 677.080017089844,
                                681.159973144531, 682.030029296875, 686.299987792969, 694.580017089844,
                                700.280029296875, 702.780029296875, 712.390014648438
                            ],
                            low: [
                                653, 645.109985351563, 655.52001953125, 651.059997558594, 671.460021972656,
                                673.77001953125, 678.450012207031, 676.580017089844, 687.659973144531, 694.200012207031,
                                698.530029296875, 705.760009765625
                            ],
                            volume: [
                                97841500, 68358700, 39105800, 69980400, 93606100, 57134400, 42253500, 54185800,
                                63480500, 58240400, 49972400, 70538900
                            ],
                            close: [
                                655.239990234375, 655.830017089844, 658.929992675781, 659.219970703125,
                                676.010009765625, 679.909973144531, 679.460021972656, 686.099975585938,
                                694.460021972656, 699.940002441406, 701.659973144531, 710.140014648438
                            ],
                            open: [
                                653.900024414063, 646.419982910156, 655.859985351563, 656.650024414063,
                                676.390014648438, 674.840026855469, 681.320007324219, 677.409973144531,
                                687.690002441406, 695.260009765625, 701.059997558594, 706.140014648438
                            ]
                        }
                    ],
                    adjclose: [
                        {
                            adjclose: [
                                655.239990234375, 655.830017089844, 658.929992675781, 659.219970703125,
                                676.010009765625, 679.909973144531, 679.460021972656, 686.099975585938,
                                694.460021972656, 699.940002441406, 701.659973144531, 710.140014648438
                            ]
                        }
                    ]
                }
            }
        ],
        error: null
    }
};
