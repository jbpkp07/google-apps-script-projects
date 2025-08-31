/// <reference path="./types.ts" />

/* eslint-disable @typescript-eslint/no-unused-vars */

const SCRAPING_SHEET_NAME = "Scraping";
const DOMAIN_CELL_NAME = "B3";
const LAST_SCRAPED_TIME_CELL_NAME = "B4";
const ETF_TABLE_CELL_NAMES: ETFTableRowNames[] = [
    { etfCellName: "A12", isActiveCellName: "B12", slugCellName: "C12", urlCellName: "G12", scrapeResultsRangeName: "O12:Q12" },
    { etfCellName: "A13", isActiveCellName: "B13", slugCellName: "C13", urlCellName: "G13", scrapeResultsRangeName: "O13:Q13" },
    { etfCellName: "A14", isActiveCellName: "B14", slugCellName: "C14", urlCellName: "G14", scrapeResultsRangeName: "O14:Q14" },
    { etfCellName: "A15", isActiveCellName: "B15", slugCellName: "C15", urlCellName: "G15", scrapeResultsRangeName: "O15:Q15" },
    { etfCellName: "A16", isActiveCellName: "B16", slugCellName: "C16", urlCellName: "G16", scrapeResultsRangeName: "O16:Q16" },
    { etfCellName: "A17", isActiveCellName: "B17", slugCellName: "C17", urlCellName: "G17", scrapeResultsRangeName: "O17:Q17" },
    { etfCellName: "A18", isActiveCellName: "B18", slugCellName: "C18", urlCellName: "G18", scrapeResultsRangeName: "O18:Q18" },
    { etfCellName: "A19", isActiveCellName: "B19", slugCellName: "C19", urlCellName: "G19", scrapeResultsRangeName: "O19:Q19" },
    { etfCellName: "A20", isActiveCellName: "B20", slugCellName: "C20", urlCellName: "G20", scrapeResultsRangeName: "O20:Q20" },
    { etfCellName: "A21", isActiveCellName: "B21", slugCellName: "C21", urlCellName: "G21", scrapeResultsRangeName: "O21:Q21" },
    { etfCellName: "A22", isActiveCellName: "B22", slugCellName: "C22", urlCellName: "G22", scrapeResultsRangeName: "O22:Q22" }
];
const IS_TIME_TRIGGER_ALLOWED_CELL_NAME = "B25";
