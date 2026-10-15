/* eslint-disable @typescript-eslint/no-unused-vars */

const FETCHING_SHEET_NAME = "Fetching";

const IS_FETCHING_TIME_TRIGGER_ENABLED_CELL_NAME = "B3";
const LAST_FETCHED_TIME_CELL_NAME = "B4";

const TICKERS = ["SPY", "SPYM", "SPMO", "GARP", "FMTM", "XMMO", "AVLV", "AVUV", "VBIL"] as const satisfies Tickers;

const SYMBOLS = TICKERS.map((ticker) => `!${ticker}` as const) satisfies TickerSymbols;
const COLUMNS = ["price", "change", "volume", "low", "high", "high52", "allTimeHigh"] as const satisfies WatchListColumnNames;

const URL_SYMBOLS = SYMBOLS.join(",");
const URL_COLUMNS = COLUMNS.join(",");

const DAYTIME_PRICES_URL = `https://api.stockanalysis.com/api/quotes/prices?s=${URL_SYMBOLS}`;
const WATCHLIST_DATA_URL = `https://stockanalysis.com/_api/endpoints/watchlist?symbols=${URL_SYMBOLS}&columns=${URL_COLUMNS}`;

// prettier-ignore
const ETF_FETCHING_TABLE_CELL_NAMES = {
    SPY:  { name: "B28", price: "E28", changePercent: "F28", volume: "G28", dayLowPrice: "H28", dayHighPrice: "I28", high52Price: "J28", allTimeHighPrice: "K28" },
    SPYM: { name: "B29", price: "E29", changePercent: "F29", volume: "G29", dayLowPrice: "H29", dayHighPrice: "I29", high52Price: "J29", allTimeHighPrice: "K29" },
    SPMO: { name: "B30", price: "E30", changePercent: "F30", volume: "G30", dayLowPrice: "H30", dayHighPrice: "I30", high52Price: "J30", allTimeHighPrice: "K30" },
    GARP: { name: "B31", price: "E31", changePercent: "F31", volume: "G31", dayLowPrice: "H31", dayHighPrice: "I31", high52Price: "J31", allTimeHighPrice: "K31" },
    FMTM: { name: "B32", price: "E32", changePercent: "F32", volume: "G32", dayLowPrice: "H32", dayHighPrice: "I32", high52Price: "J32", allTimeHighPrice: "K32" },
    XMMO: { name: "B33", price: "E33", changePercent: "F33", volume: "G33", dayLowPrice: "H33", dayHighPrice: "I33", high52Price: "J33", allTimeHighPrice: "K33" },
    AVLV: { name: "B34", price: "E34", changePercent: "F34", volume: "G34", dayLowPrice: "H34", dayHighPrice: "I34", high52Price: "J34", allTimeHighPrice: "K34" },
    AVUV: { name: "B35", price: "E35", changePercent: "F35", volume: "G35", dayLowPrice: "H35", dayHighPrice: "I35", high52Price: "J35", allTimeHighPrice: "K35" },
    VBIL: { name: "B36", price: "E36", changePercent: "F36", volume: "G36", dayLowPrice: "H36", dayHighPrice: "I36", high52Price: "J36", allTimeHighPrice: "K36" }
} as const satisfies ETFFetchingTableCellNames;

const SCRAPING_DOMAIN = "https://stockanalysis.com";

const SCRAPING_SHEET_NAME = "Scraping";

const IS_SCRAPING_ENABLED_CELL_NAME = "B3";
const LAST_SCRAPED_TIME_CELL_NAME = "B4";

// prettier-ignore
const ETF_SCRAPING_TABLE_ROWS = {
    SPY:  { url: `${SCRAPING_DOMAIN}/etf/spy`,  uniqueUrlCellName: "F14", scrapeResultsRangeName: "M14:O14" },
    SPYM: { url: `${SCRAPING_DOMAIN}/etf/spym`, uniqueUrlCellName: "F15", scrapeResultsRangeName: "M15:O15" },
    SPMO: { url: `${SCRAPING_DOMAIN}/etf/spmo`, uniqueUrlCellName: "F16", scrapeResultsRangeName: "M16:O16" },
    GARP: { url: `${SCRAPING_DOMAIN}/etf/garp`, uniqueUrlCellName: "F17", scrapeResultsRangeName: "M17:O17" },
    FMTM: { url: `${SCRAPING_DOMAIN}/etf/fmtm`, uniqueUrlCellName: "F18", scrapeResultsRangeName: "M18:O18" },
    XMMO: { url: `${SCRAPING_DOMAIN}/etf/xmmo`, uniqueUrlCellName: "F19", scrapeResultsRangeName: "M19:O19" },
    AVLV: { url: `${SCRAPING_DOMAIN}/etf/avlv`, uniqueUrlCellName: "F20", scrapeResultsRangeName: "M20:O20" },
    AVUV: { url: `${SCRAPING_DOMAIN}/etf/avuv`, uniqueUrlCellName: "F21", scrapeResultsRangeName: "M21:O21" },
    VBIL: { url: `${SCRAPING_DOMAIN}/etf/vbil`, uniqueUrlCellName: "F22", scrapeResultsRangeName: "M22:O22" },
} as const satisfies ETFScrapingTableRows;
