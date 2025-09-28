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
            data: readonly DaytimeData[];
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
            data: readonly Data[];
        };
    }
}

type DaytimePricesData = Readonly<StockAnalysis.RealTimePricesAPI.DaytimeData>;
type DaytimePricesResponse = Readonly<StockAnalysis.RealTimePricesAPI.DaytimeResponse>;

type WatchListData = Readonly<StockAnalysis.WatchListAPI.Data>;
type WatchListResponse = Readonly<StockAnalysis.WatchListAPI.Response>;

type Tickers = readonly ["QQQM", "SPMO", "SPY", "FDVV", "MGV", "XMMO", "SPMD", "RWK", "XSMO", "RWJ", "AVUV"];
type Ticker = Tickers[number];

type ETFData = Readonly<{
    ticker: {
        value: Ticker;
        cellName: string;
    };
    name?: {
        value?: string | undefined;
        cellName: string;
    };
    price?: {
        value?: number | undefined;
        cellName: string;
    };
    changePercent?: {
        value?: number | undefined;
        cellName: string;
    };
    volume?: {
        value?: number | undefined;
        cellName: string;
    };
    high52Price?: {
        value?: number | undefined;
        cellName: string;
    };
    high52ChangePercent?: {
        value?: number | undefined;
        cellName: string;
    };
}>;

type ETFFetchingTableRow = Readonly<Record<keyof ETFData, string>>;

type ETFFetchingTableCellNames = Readonly<Record<Ticker, ETFFetchingTableRow>>;
