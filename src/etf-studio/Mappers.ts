/// <reference path="./consts.ts" />
/// <reference path="./ApiType.ts" />
/// <reference path="../common/Either.ts" />
/// <reference path="../common/Utils.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
abstract class Mappers {
    private static toTicker(symbol: Uppercase<string>): Either<Ticker> {
        const trimmed: string = Utils.trim(symbol, "!");

        return ApiType.isTicker(trimmed)
            ? Either.new(trimmed)
            : Either.error(`Not a valid ticker: symbol="${symbol}", trimmed="${trimmed}"`);
    }

    private static getCellNamesOf(row: Ticker) {
        return (col: keyof ETFData) => ETF_FETCHING_TABLE_CELL_NAMES[row][col];
    }

    static mapPricesToETFData(response: DaytimePricesResponse): ThrowsOrReturns<ETFData[]> {
        //
        const toETFData = (data: DaytimePricesData): ETFData => {
            const { name: symbol, price, change, volume } = data;

            const ticker = this.toTicker(symbol).unwrap();
            const getCellName = this.getCellNamesOf(ticker);

            return {
                price: {
                    value: price,
                    cellName: getCellName("price")
                },
                changePercent: {
                    value: change, // all of these properties can be missing during preMarket
                    cellName: getCellName("changePercent")
                },
                volume: {
                    value: volume,
                    cellName: getCellName("volume")
                }
            };
        };

        return response.data.map(toETFData);
    }

    static mapWatchListToETFData(response: WatchListResponse): ThrowsOrReturns<ETFData[]> {
        //
        const toETFData = (data: WatchListData): ETFData => {
            const { s: symbol, n: name, price, change, volume, low, high, high52, allTimeHigh } = data;

            const ticker = this.toTicker(symbol).unwrap();
            const getCellName = this.getCellNamesOf(ticker);

            return {
                name: {
                    value: name,
                    cellName: getCellName("name")
                },
                price: {
                    value: price,
                    cellName: getCellName("price")
                },
                changePercent: {
                    value: change ?? 0, // can be missing if day change was 0.00%
                    cellName: getCellName("changePercent")
                },
                volume: {
                    value: volume,
                    cellName: getCellName("volume")
                },
                dayLowPrice: {
                    value: low,
                    cellName: getCellName("dayLowPrice")
                },
                dayHighPrice: {
                    value: high,
                    cellName: getCellName("dayHighPrice")
                },
                high52Price: {
                    value: high52,
                    cellName: getCellName("high52Price")
                },
                allTimeHighPrice: {
                    value: allTimeHigh,
                    cellName: getCellName("allTimeHighPrice")
                }
            };
        };

        return response.data.map(toETFData);
    }
}
