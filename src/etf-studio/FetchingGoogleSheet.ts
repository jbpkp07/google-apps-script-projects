/// <reference path="./consts.ts" />
/// <reference path="../common/GoogleSheet.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class FetchingGoogleSheet extends GoogleSheet {
    constructor() {
        super(FETCHING_SHEET_NAME);
    }

    private trimExclam(str: string): string {
        return Utils.trim(str, "!");
    }

    private mapPricesToETFData(response: DaytimePricesResponse): ETFData[] {
        //
        const toETFData = (data: DaytimePricesData): ETFData => {
            const { name, price, change, volume } = data;

            return {
                ticker: this.trimExclam(name),
                dayPrice: price,
                dayChangePercent: change,
                dayVolume: volume
            };
        };

        return response.data.map(toETFData);
    }

    private mapWatchListToETFData(response: WatchListResponse): ETFData[] {
        //
        const toETFData = (data: WatchListData): ETFData => {
            const { s, n, price, change, volume, high52, high52ch } = data;

            return {
                ticker: this.trimExclam(s),
                name: n,
                dayPrice: price,
                dayChangePercent: change,
                dayVolume: volume,
                high52Price: high52,
                high52ChangePercent: high52ch
            };
        };

        return response.data.map(toETFData);
    }

    public fetchDaytimePrices(url: string): ThrowsOrReturns<ETFData[]> {
        const response = Utils.fetchDataOf(ApiType.DaytimePricesResponse())(url).unwrap();

        return this.mapPricesToETFData(response);
    }

    public fetchWatchListData(url: string): ThrowsOrReturns<ETFData[]> {
        const response = Utils.fetchDataOf(ApiType.WatchListResponse())(url).unwrap();

        return this.mapWatchListToETFData(response);
    }
}
