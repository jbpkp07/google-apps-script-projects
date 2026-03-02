/* eslint-disable @typescript-eslint/no-unused-vars */

type Tickers = readonly ["QQQM", "SPMO", "SPY", "SPYM", "AVLV", "MGV", "XMMO", "XSMO", "RWJ", "AVUV", "AMZN"];
type Ticker = NonNullable<Tickers[number]>;

type TickerSymbols = readonly `!${Ticker}`[];
type TickerSymbol = NonNullable<TickerSymbols[number]>;
