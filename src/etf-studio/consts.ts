/* eslint-disable @typescript-eslint/no-unused-vars */

const DOMAIN = "https://stockanalysis.com";

const FETCHING_SHEET_NAME = "Fetching";

const IS_FETCHING_TIME_TRIGGER_ENABLED_CELL_NAME = "B3";
const LAST_FETCHED_TIME_CELL_NAME = "B4";

const TICKERS = ["QQQM", "SPMO", "SPYM", "MGV", "XMMO", "RWJ", "AVUV", "SPY", "AAPL", "AMZN"] as const satisfies Tickers;

const SYMBOLS = TICKERS.map((ticker) => `!${ticker}` as const) satisfies TickerSymbols;
const COLUMNS = ["price", "change", "volume", "low", "high", "high52", "allTimeHigh"] as const satisfies WatchListColumnNames;

const URL_SYMBOLS = SYMBOLS.join(",");
const URL_COLUMNS = COLUMNS.join(",");

const DAYTIME_PRICES_URL = `${DOMAIN}/api/quotes/prices?s=${URL_SYMBOLS}`;
const WATCH_LIST_DATA_URL = `${DOMAIN}/api/watchlist?symbols=${URL_SYMBOLS}&columns=${URL_COLUMNS}`;

// prettier-ignore
const ETF_FETCHING_TABLE_CELL_NAMES = {
    QQQM: { name: "B28", price: "E28", changePercent: "F28", volume: "G28", dayLowPrice: "H28", dayHighPrice: "I28", high52Price: "J28", allTimeHighPrice: "K28" },
    SPMO: { name: "B29", price: "E29", changePercent: "F29", volume: "G29", dayLowPrice: "H29", dayHighPrice: "I29", high52Price: "J29", allTimeHighPrice: "K29" },
    SPYM: { name: "B30", price: "E30", changePercent: "F30", volume: "G30", dayLowPrice: "H30", dayHighPrice: "I30", high52Price: "J30", allTimeHighPrice: "K30" },
    MGV:  { name: "B31", price: "E31", changePercent: "F31", volume: "G31", dayLowPrice: "H31", dayHighPrice: "I31", high52Price: "J31", allTimeHighPrice: "K31" },
    XMMO: { name: "B32", price: "E32", changePercent: "F32", volume: "G32", dayLowPrice: "H32", dayHighPrice: "I32", high52Price: "J32", allTimeHighPrice: "K32" },
    RWJ:  { name: "B33", price: "E33", changePercent: "F33", volume: "G33", dayLowPrice: "H33", dayHighPrice: "I33", high52Price: "J33", allTimeHighPrice: "K33" },
    AVUV: { name: "B34", price: "E34", changePercent: "F34", volume: "G34", dayLowPrice: "H34", dayHighPrice: "I34", high52Price: "J34", allTimeHighPrice: "K34" },
    SPY:  { name: "B35", price: "E35", changePercent: "F35", volume: "G35", dayLowPrice: "H35", dayHighPrice: "I35", high52Price: "J35", allTimeHighPrice: "K35" },
    AAPL: { name: "B36", price: "E36", changePercent: "F36", volume: "G36", dayLowPrice: "H36", dayHighPrice: "I36", high52Price: "J36", allTimeHighPrice: "K36" },
    AMZN: { name: "B37", price: "E37", changePercent: "F37", volume: "G37", dayLowPrice: "H37", dayHighPrice: "I37", high52Price: "J37", allTimeHighPrice: "K37" },
} as const satisfies ETFFetchingTableCellNames;

const SCRAPING_SHEET_NAME = "Scraping";

const IS_SCRAPING_ENABLED_CELL_NAME = "B3";
const LAST_SCRAPED_TIME_CELL_NAME = "B4";

// prettier-ignore
const ETF_SCRAPING_TABLE_ROWS = {
    QQQM: { url: `${DOMAIN}/etf/qqqm`,    uniqueUrlCellName: "F14", scrapeResultsRangeName: "M14:O14" },
    SPMO: { url: `${DOMAIN}/etf/spmo`,    uniqueUrlCellName: "F15", scrapeResultsRangeName: "M15:O15" },
    SPYM: { url: `${DOMAIN}/etf/spym`,    uniqueUrlCellName: "F16", scrapeResultsRangeName: "M16:O16" },
    MGV:  { url: `${DOMAIN}/etf/mgv`,     uniqueUrlCellName: "F17", scrapeResultsRangeName: "M17:O17" },
    XMMO: { url: `${DOMAIN}/etf/xmmo`,    uniqueUrlCellName: "F18", scrapeResultsRangeName: "M18:O18" },
    RWJ:  { url: `${DOMAIN}/etf/rwj`,     uniqueUrlCellName: "F19", scrapeResultsRangeName: "M19:O19" },
    AVUV: { url: `${DOMAIN}/etf/avuv`,    uniqueUrlCellName: "F20", scrapeResultsRangeName: "M20:O20" },
    SPY:  { url: `${DOMAIN}/etf/spy`,     uniqueUrlCellName: "F21", scrapeResultsRangeName: "M21:O21" },
    AAPL: { url: `${DOMAIN}/stocks/aapl`, uniqueUrlCellName: "F22", scrapeResultsRangeName: "M22:O22" },
    AMZN: { url: `${DOMAIN}/stocks/amzn`, uniqueUrlCellName: "F23", scrapeResultsRangeName: "M23:O23" },
} as const satisfies ETFScrapingTableRows;
