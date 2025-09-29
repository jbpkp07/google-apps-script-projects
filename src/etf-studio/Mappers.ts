/// <reference path="./consts.ts" />
/// <reference path="./ApiType.ts" />
/// <reference path="../common/Either.ts" />
/// <reference path="../common/Utils.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
abstract class Mappers {
    private static toTicker(symbol: string): Either<Ticker> {
        const trimmed: string = Utils.trim(symbol, "!");

        return ApiType.isTicker(trimmed)
            ? Either.new(trimmed)
            : Either.newError(`Not a valid ticker: symbol="${symbol}", trimmed="${trimmed}"`);
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
                    value: change,
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
            const { s: symbol, n: name, price, change, volume, high52, high52ch } = data;

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
                    value: change,
                    cellName: getCellName("changePercent")
                },
                volume: {
                    value: volume,
                    cellName: getCellName("volume")
                },
                high52Price: {
                    value: high52,
                    cellName: getCellName("high52Price")
                },
                high52ChangePercent: {
                    value: high52ch,
                    cellName: getCellName("high52ChangePercent")
                }
            };
        };

        return response.data.map(toETFData);
    }
}
