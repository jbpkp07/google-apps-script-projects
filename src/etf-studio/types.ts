/* eslint-disable @typescript-eslint/no-unused-vars */

namespace StockAnalysis {
    export namespace RealTimePricesAPI {
        export type DaytimeData = {
            name: string; // `!${ticker}` format
            price?: number;
            chg?: number; // $ change
            change?: number; // % change
            volume?: number;
        };

        export type DaytimeResponse = {
            status: number;
            data: DaytimeData[];
        };
    }

    export namespace WatchListAPI {
        export type Data = {
            s: string; // `!${ticker}` format
            n: string;
            price?: number;
            change?: number; // % change
            volume?: number;
            high52?: number;
            high52ch?: number; // % change
            curr: {
                main: "USD";
                price: "USD";
                dividend: "USD";
            };
        };

        export type Response = {
            status: number;
            data: Data[];
        };
    }
}

type DaytimePricesData = StockAnalysis.RealTimePricesAPI.DaytimeData;
type DaytimePricesResponse = StockAnalysis.RealTimePricesAPI.DaytimeResponse;

type WatchListData = StockAnalysis.WatchListAPI.Data;
type WatchListResponse = StockAnalysis.WatchListAPI.Response;

type ETFData = {
    ticker: string;
    name?: string | undefined;
    price?: number | undefined;
    changePercent?: number | undefined;
    volume?: number | undefined;
    high52Price?: number | undefined;
    high52ChangePercent?: number | undefined;
};

type ETFFetchingTableRow = Record<keyof ETFData, string>[];

type ETFScrapingTableRow = {
    etfCellName: string;
    isEnabledCellName: string;
    slugCellName: string;
    urlCellName: string;
    scrapeResultsRangeName: string;
};
