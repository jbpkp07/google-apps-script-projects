/* eslint-disable @typescript-eslint/no-unused-vars */

type ETFScrapingTableRow = Readonly<{
    etfCellName: Uppercase<string>;
    isEnabledCellName: Uppercase<string>;
    slugCellName: Uppercase<string>;
    urlCellName: Uppercase<string>;
    scrapeResultsRangeName: Uppercase<string>;
}>;

type ETFScrapingTableCellNames = Readonly<ETFScrapingTableRow[]>;
