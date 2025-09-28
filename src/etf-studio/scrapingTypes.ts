/* eslint-disable @typescript-eslint/no-unused-vars */

type ETFScrapingTableRow = Readonly<{
    etfCellName: string;
    isEnabledCellName: string;
    slugCellName: string;
    urlCellName: string;
    scrapeResultsRangeName: string;
}>;

type ETFScrapingTableCellNames = Readonly<ETFScrapingTableRow[]>;
