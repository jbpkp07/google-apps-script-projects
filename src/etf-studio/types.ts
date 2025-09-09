/* eslint-disable @typescript-eslint/no-unused-vars */

namespace StockAnalysisApi {
    export type Price = {
        name: string;
        postmarketPrice: number;
        postmarketChange: number;
        postmarketChangePercent: number;
    };

    export type PricesResponse = {
        status: number;
        data: Price[];
    };
}

type Price = StockAnalysisApi.Price;

type PricesResponse = StockAnalysisApi.PricesResponse;

type ETFScrapingTableRow = {
    etfCellName: string;
    isEnabledCellName: string;
    slugCellName: string;
    urlCellName: string;
    scrapeResultsRangeName: string;
};
