/* eslint-disable @typescript-eslint/no-unused-vars */

const DOMAIN = "https://stockanalysis.com";

const FETCHING_SHEET_NAME = "Fetching";

const IS_FETCHING_TIME_TRIGGER_ENABLED_CELL_NAME = "B3";
const LAST_FETCHED_TIME_CELL_NAME = "B4";

const TICKERS = ["QQQM", "SPMO", "SPLG", "MGV", "XMMO", "RWJ", "AVUV", "SPY", "AAPL", "AMZN"] as const satisfies Tickers;

const SYMBOLS = TICKERS.map((ticker) => `!${ticker}` as const) satisfies TickerSymbols;
const COLUMNS = ["price", "change", "volume", "high52", "high52ch"] as const satisfies WatchListColumnNames;

const URL_SYMBOLS = SYMBOLS.join(",");
const URL_COLUMNS = COLUMNS.join(",");

const DAYTIME_PRICES_URL = `${DOMAIN}/api/quotes/prices?s=${URL_SYMBOLS}`;
const WATCH_LIST_DATA_URL = `${DOMAIN}/api/watchlist?symbols=${URL_SYMBOLS}&columns=${URL_COLUMNS}`;

// prettier-ignore
const ETF_FETCHING_TABLE_CELL_NAMES = {
    QQQM: { name: "B28", price: "E28", changePercent: "F28", volume: "G28", high52Price: "H28", high52ChangePercent: "I28" },
    SPMO: { name: "B29", price: "E29", changePercent: "F29", volume: "G29", high52Price: "H29", high52ChangePercent: "I29" },
    SPLG: { name: "B30", price: "E30", changePercent: "F30", volume: "G30", high52Price: "H30", high52ChangePercent: "I30" },
    MGV:  { name: "B31", price: "E31", changePercent: "F31", volume: "G31", high52Price: "H31", high52ChangePercent: "I31" },
    XMMO: { name: "B32", price: "E32", changePercent: "F32", volume: "G32", high52Price: "H32", high52ChangePercent: "I32" },
    RWJ:  { name: "B33", price: "E33", changePercent: "F33", volume: "G33", high52Price: "H33", high52ChangePercent: "I33" },
    AVUV: { name: "B34", price: "E34", changePercent: "F34", volume: "G34", high52Price: "H34", high52ChangePercent: "I34" },
    SPY:  { name: "B35", price: "E35", changePercent: "F35", volume: "G35", high52Price: "H35", high52ChangePercent: "I35" },
    AAPL: { name: "B36", price: "E36", changePercent: "F36", volume: "G36", high52Price: "H36", high52ChangePercent: "I36" },
    AMZN: { name: "B37", price: "E37", changePercent: "F37", volume: "G37", high52Price: "H37", high52ChangePercent: "I37" },
} as const satisfies ETFFetchingTableCellNames;

const SCRAPING_SHEET_NAME = "Scraping";

const IS_SCRAPING_ENABLED_CELL_NAME = "B3";
const LAST_SCRAPED_TIME_CELL_NAME = "B4";

// prettier-ignore
const ETF_SCRAPING_TABLE_ROWS = {
    QQQM: { url: `${DOMAIN}/etf/qqqm`,    uniqueUrlCellName: "F14", scrapeResultsRangeName: "M14:O14" },
    SPMO: { url: `${DOMAIN}/etf/spmo`,    uniqueUrlCellName: "F15", scrapeResultsRangeName: "M15:O15" },
    SPLG: { url: `${DOMAIN}/etf/splg`,    uniqueUrlCellName: "F16", scrapeResultsRangeName: "M16:O16" },
    MGV:  { url: `${DOMAIN}/etf/mgv`,     uniqueUrlCellName: "F17", scrapeResultsRangeName: "M17:O17" },
    XMMO: { url: `${DOMAIN}/etf/xmmo`,    uniqueUrlCellName: "F18", scrapeResultsRangeName: "M18:O18" },
    RWJ:  { url: `${DOMAIN}/etf/rwj`,     uniqueUrlCellName: "F19", scrapeResultsRangeName: "M19:O19" },
    AVUV: { url: `${DOMAIN}/etf/avuv`,    uniqueUrlCellName: "F20", scrapeResultsRangeName: "M20:O20" },
    SPY:  { url: `${DOMAIN}/etf/spy`,     uniqueUrlCellName: "F21", scrapeResultsRangeName: "M21:O21" },
    AAPL: { url: `${DOMAIN}/stocks/aapl`, uniqueUrlCellName: "F22", scrapeResultsRangeName: "M22:O22" },
    AMZN: { url: `${DOMAIN}/stocks/amzn`, uniqueUrlCellName: "F23", scrapeResultsRangeName: "M23:O23" },
} as const satisfies ETFScrapingTableRows;
