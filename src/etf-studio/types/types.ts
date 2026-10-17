/* eslint-disable @typescript-eslint/no-unused-vars */

type Tickers = readonly ["SPY", "SPYM", "SPMO", "GARP", "FMTM", "AVLV", "AVUV", "VBIL"];
type Ticker = NonNullable<Tickers[number]>;

type TickerSymbols = readonly `!${Ticker}`[];
type TickerSymbol = NonNullable<TickerSymbols[number]>;
