import { Candle, isNumber } from "./fetchReverseChronologicalCandles";
import { Ticker } from "./fetchYahooQuote";

export default calcAverageDailyDip;
export { AverageType, DailyDipResult };

type DailyDip = {
    pct: number;
    daysAgo: number;
};

type DailyDipResult = {
    pct: number;
    daysAgo: number;
    weight?: number;
};

type AverageType = "simple" | "tactical";

type Calculators = Record<AverageType, (dailyDips: DailyDip[]) => number>;

type CalcAverageDailyDipParams = {
    ticker: Ticker;
    revChronCandles: Candle[];
    type: AverageType;
    minDipPct: number;
};

type AverageDailyDipResultParams = {
    ticker: Ticker;
    averageDailyDipPct: number;
    type: AverageType;
    dailyDips: DailyDip[];
};

type AverageDailyDipResult = {
    ticker: Ticker;
    averageDailyDipPct: number;
    type: AverageType;
    dailyDips: DailyDipResult[];
    dipCount: number;
    lookbackWindow: number;
    daysFilledPct: number;
};

function calcAverageDailyDip(params: CalcAverageDailyDipParams): AverageDailyDipResult {
    const { ticker, revChronCandles, type, minDipPct } = params;

    const dailyDips = toDailyDips(revChronCandles, minDipPct);
    const averageDailyDipPct = calcAverageDailyDipByType(dailyDips, type, minDipPct);

    return prepareAverageDailyDipResult({ ticker, averageDailyDipPct, type, dailyDips });
}

function toDailyDips(revChronCandles: Candle[], minDipPct: number): DailyDip[] {
    //
    const toDailyDip = (candle: Candle, daysAgo: number): DailyDip => {
        const { prevClose, low } = candle;

        if (!isNumber(prevClose) || !isNumber(low) || prevClose <= 0 || low <= 0) {
            return { pct: minDipPct, daysAgo };
        }

        if (prevClose > low) {
            const pct = ((prevClose - low) / prevClose) * 100;

            return { pct, daysAgo };
        }

        return { pct: 0, daysAgo };
    };

    return revChronCandles.map(toDailyDip);
}

function calcAverageDailyDipByType(dailyDips: DailyDip[], type: AverageType, minDipPct: number): number {
    // prettier-ignore
    const calculators: Calculators = {
        "simple": calcSimpleAverage,
        "tactical": calcTacticalAverage
    };

    const average = calculators[type](dailyDips);

    return Math.max(average, minDipPct);
}

function calcSimpleAverage(dailyDips: DailyDip[]): number {
    let totalDipPct = 0;
    let totalDipCount = 0;

    for (const dip of dailyDips) {
        if (dip.pct > 0) {
            totalDipPct += dip.pct;
            totalDipCount += 1;
        }
    }

    return totalDipCount > 0 ? totalDipPct / totalDipCount : 0;
}

function calcTacticalAverage(dailyDips: DailyDip[], lookbackWindow = 20, topCount = 2): number {
    //
    const toWeightedDipPct = (dip: DailyDip) => calcTimeWeight(dip.daysAgo, lookbackWindow) * dip.pct;
    const desc = (a: number, b: number) => b - a;

    const windowDips = dailyDips.slice(0, lookbackWindow);
    const weightedDipPcts = windowDips.map(toWeightedDipPct);
    const topWeightedDipPcts = weightedDipPcts.sort(desc).slice(0, topCount);

    return calcAverage(topWeightedDipPcts);
}

function calcTimeWeight(daysAgo: number, lookbackWindow: number): number {
    const step = 1 / lookbackWindow;

    return Math.max(1 - daysAgo * step, 0.01);
}

function calcAverage(arr: number[]): number {
    const total = arr.reduce((sum, val) => sum + val, 0);
    const count = arr.length;

    return count > 0 ? total / count : 0;
}

function prepareAverageDailyDipResult(params: AverageDailyDipResultParams): AverageDailyDipResult {
    const { ticker, averageDailyDipPct, type, dailyDips } = params;
    const lookbackWindow = dailyDips.length;

    const toDailyDipResult = (dailyDip: DailyDip) => {
        return type === "simple" ? dailyDip : { ...dailyDip, weight: calcTimeWeight(dailyDip.daysAgo, lookbackWindow) };
    };

    const isPositiveDip = (dip: DailyDip) => dip.pct > 0;

    const wasFilled = (dip: DailyDip) => dip.pct >= averageDailyDipPct;

    const filledCount = dailyDips.filter(wasFilled).length;
    const daysFilledPct = (filledCount / lookbackWindow) * 100;

    return {
        ticker,
        averageDailyDipPct,
        type,
        dailyDips: dailyDips.map(toDailyDipResult),
        dipCount: dailyDips.filter(isPositiveDip).length,
        lookbackWindow,
        daysFilledPct
    };
}

// function calcTimeWeightedAverage(dailyDips: DailyDip[]): number {
//     let totalWeightedDipPct = 0;
//     let totalWeight = 0;

//     for (const dip of dailyDips) {
//         const weight = calcTimeWeight(dip.daysAgo, dailyDips.length);

//         totalWeightedDipPct += weight * dip.pct;
//         totalWeight += weight;
//     }

//     return totalWeight > 0 ? totalWeightedDipPct / totalWeight : 0;
// }
