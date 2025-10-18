/* eslint-disable @typescript-eslint/no-unused-vars */

namespace StockAnalysis {
    export namespace RealTimePricesAPI {
        export type DaytimeData = {
            name: Uppercase<string>; // `!TICKER` format
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
        export type ColumnData = {
            price?: number;
            change?: number; // % change
            volume?: number;
            high52?: number;
            high52ch?: number; // % change
        };

        export type Data = {
            s: Uppercase<string>; // `!TICKER` format
            n: string;
        } & ColumnData;

        export type Response = {
            status: number;
            data: readonly Data[];
        };
    }
}

type DaytimePricesData = Readonly<StockAnalysis.RealTimePricesAPI.DaytimeData>;
type DaytimePricesResponse = Readonly<StockAnalysis.RealTimePricesAPI.DaytimeResponse>;

type WatchListColumnData = Readonly<StockAnalysis.WatchListAPI.ColumnData>;
type WatchListData = Readonly<StockAnalysis.WatchListAPI.Data>;
type WatchListResponse = Readonly<StockAnalysis.WatchListAPI.Response>;

type WatchListColumnNames = readonly (keyof WatchListColumnData)[];

type ETFData = Readonly<{
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

type ETFFetchingTableRow = Readonly<Record<keyof ETFData, Uppercase<string>>>;

type ETFFetchingTableCellNames = Readonly<Record<Ticker, ETFFetchingTableRow>>;
