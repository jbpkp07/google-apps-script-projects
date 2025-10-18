/* eslint-disable @typescript-eslint/no-unused-vars */

type Tickers = readonly ["QQQM", "SPMO", "SPLG", "MGV", "XMMO", "RWJ", "AVUV"];

type Ticker = NonNullable<Tickers[number]>;

type Symbols = readonly `!${Ticker}`[];
