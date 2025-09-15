/* eslint-disable @typescript-eslint/no-unused-vars */

namespace StockAnalysisApi {
    export type MarketPrice = {
        name: string; // `!${Ticker}` format
        price?: number;
        chg?: number; // price $ change
        change?: number; // price % change
        volume?: number;
    };

    export type MarketPriceData = {
        status: number;
        data: MarketPrice[];
    };

    export type PreMarketPrice = {
        name: string;
        premarketPrice?: number;
        premarketChange?: number;
        premarketChangePercent?: number;
    };

    export type PreMarketPriceData = {
        status: number;
        data: PreMarketPrice[];
    };

    export type PostMarketPrice = {
        name: string;
        postmarketPrice?: number;
        postmarketChange?: number;
        postmarketChangePercent?: number;
    };

    export type PostMarketPriceData = {
        status: number;
        data: PostMarketPrice[];
    };
}

type DayPrice = {
    ticker: string;
    price: number;
    changePercent: number;
};

type ETFScrapingTableRow = {
    etfCellName: string;
    isEnabledCellName: string;
    slugCellName: string;
    urlCellName: string;
    scrapeResultsRangeName: string;
};
