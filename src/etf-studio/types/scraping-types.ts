/* eslint-disable @typescript-eslint/no-unused-vars */

type ETFScrapingTableRow = Readonly<{
    url: Lowercase<string>;
    uniqueUrlCellName: Uppercase<string>;
    scrapeResultsRangeName: Uppercase<string>;
}>;

type ETFScrapingTableRows = Readonly<Record<Ticker, ETFScrapingTableRow>>;
