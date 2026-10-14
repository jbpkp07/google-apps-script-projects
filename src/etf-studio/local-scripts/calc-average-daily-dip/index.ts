import calcAverageDailyDip, { AverageType, DailyDipResult } from "./calcAverageDailyDip";
import fetchReverseChronologicalCandles, { isNumber } from "./fetchReverseChronologicalCandles";
import { Ticker } from "./fetchYahooQuote";

type PrettyDailyDipResult = {
    pct: string;
    daysAgo: number;
    weight?: string;
};

type AverageDailyDipFinalResult = {
    ticker: Ticker;
    averageDailyDipPct_20d: string;
    averageDailyDipPct_1yr: string;
    type: AverageType;
    dailyDips: PrettyDailyDipResult[];
    dipCount: number;
    lookbackWindow_20d: number;
    lookbackWindow_1yr: number;
    daysFilledPct_20d: string;
    daysFilledPct_1yr: string;
};

const TICKERS: Ticker[] = ["SPYM", "SPMO", "GARP", "FMTM", "XMMO", "AVLV", "AVUV"];

const ADD_MIN_DIP_PCT = 0.25;
const ADD_LOOKBACK_DAY_COUNT_1YR = 250; // 1 trading year (250 days)
const ADD_LOOKBACK_DAY_COUNT_20D = 20; //  1 trading month (20 days)

async function main() {
    console.log(`Pulling data for: ${TICKERS.join(", ")}\n`);

    const finalResults: AverageDailyDipFinalResult[] = [];

    for (const ticker of TICKERS) {
        const revChronCandles1Yr = await fetchReverseChronologicalCandles(ticker, ADD_LOOKBACK_DAY_COUNT_1YR);

        if (revChronCandles1Yr) {
            const revChronCandles20D = revChronCandles1Yr.slice(0, ADD_LOOKBACK_DAY_COUNT_20D);

            const result1Yr = calcAverageDailyDip({
                ticker,
                revChronCandles: revChronCandles1Yr,
                type: "simple",
                minDipPct: ADD_MIN_DIP_PCT
            });

            const result20D = calcAverageDailyDip({
                ticker,
                revChronCandles: revChronCandles20D,
                type: "tactical",
                minDipPct: result1Yr.averageDailyDipPct
            });

            finalResults.push({
                ticker: result20D.ticker,
                averageDailyDipPct_20d: toFixedPct(result20D.averageDailyDipPct),
                averageDailyDipPct_1yr: toFixedPct(result1Yr.averageDailyDipPct),
                type: result20D.type,
                dailyDips: result20D.dailyDips.map(toPrettyDailyDipResult),
                dipCount: result20D.dipCount,
                lookbackWindow_20d: result20D.lookbackWindow,
                lookbackWindow_1yr: result1Yr.lookbackWindow,
                daysFilledPct_20d: toFixedPct(result20D.daysFilledPct),
                daysFilledPct_1yr: toFixedPct(result1Yr.daysFilledPct)
            });
        } else {
            console.error(`[${ticker}] Main(): Failed to fetch candles`);
        }
    }

    console.dir(finalResults, { depth: null });
}

void main();

function toFixedPct(num: number): string {
    return num.toFixed(2) + "%";
}

function toPrettyDailyDipResult({ pct, daysAgo, weight }: DailyDipResult): PrettyDailyDipResult {
    const optionalWeight = isNumber(weight) ? { weight: weight.toFixed(2) } : {};

    return { pct: toFixedPct(pct), daysAgo, ...optionalWeight };
}
