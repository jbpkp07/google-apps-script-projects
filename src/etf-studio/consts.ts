/// <reference path="./types.ts" />

/* eslint-disable @typescript-eslint/no-unused-vars */

const SCRAPING_SHEET_NAME = "Scraping";
const FETCHING_SHEET_NAME = "Fetching";

const IS_SCRAPING_ENABLED_CELL_NAME = "B3";
const IS_SCRAPING_TIME_TRIGGER_ENABLED_CELL_NAME = "B4";

const SCRAPING_DOMAIN_CELL_NAME = "B7";
const LAST_SCRAPED_TIME_CELL_NAME = "B8";

const ETF_SCRAPING_TABLE_CELL_NAMES: ETFScrapingTableRow[] = [
    { etfCellName: "A16", isEnabledCellName: "B16", slugCellName: "C16", urlCellName: "G16", scrapeResultsRangeName: "O16:Q16" },
    { etfCellName: "A17", isEnabledCellName: "B17", slugCellName: "C17", urlCellName: "G17", scrapeResultsRangeName: "O17:Q17" },
    { etfCellName: "A18", isEnabledCellName: "B18", slugCellName: "C18", urlCellName: "G18", scrapeResultsRangeName: "O18:Q18" },
    { etfCellName: "A19", isEnabledCellName: "B19", slugCellName: "C19", urlCellName: "G19", scrapeResultsRangeName: "O19:Q19" },
    { etfCellName: "A20", isEnabledCellName: "B20", slugCellName: "C20", urlCellName: "G20", scrapeResultsRangeName: "O20:Q20" },
    { etfCellName: "A21", isEnabledCellName: "B21", slugCellName: "C21", urlCellName: "G21", scrapeResultsRangeName: "O21:Q21" },
    { etfCellName: "A22", isEnabledCellName: "B22", slugCellName: "C22", urlCellName: "G22", scrapeResultsRangeName: "O22:Q22" },
    { etfCellName: "A23", isEnabledCellName: "B23", slugCellName: "C23", urlCellName: "G23", scrapeResultsRangeName: "O23:Q23" },
    { etfCellName: "A24", isEnabledCellName: "B24", slugCellName: "C24", urlCellName: "G24", scrapeResultsRangeName: "O24:Q24" },
    { etfCellName: "A25", isEnabledCellName: "B25", slugCellName: "C25", urlCellName: "G25", scrapeResultsRangeName: "O25:Q25" },
    { etfCellName: "A26", isEnabledCellName: "B26", slugCellName: "C26", urlCellName: "G26", scrapeResultsRangeName: "O26:Q26" }
];
