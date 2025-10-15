/// <reference path="./consts.ts" />
/// <reference path="./Mappers.ts" />
/// <reference path="../common/GoogleSheet.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class FetchingGoogleSheet extends GoogleSheet {
    constructor() {
        super(FETCHING_SHEET_NAME);
    }

    private updateLastFetchedTime(): ThrowsOrReturns<void> {
        const currentTime = Utils.getCurrentTime();

        this.setCellValue(LAST_FETCHED_TIME_CELL_NAME, currentTime).assertOK();
    }

    private updateSheet(fetchResults: ETFData[]): ThrowsOrReturns<void> {
        for (const etfData of fetchResults) {
            for (const { value, cellName } of Object.values(etfData)) {
                if (Type.isNonEmptyLiteral(value)) {
                    this.setCellValue(cellName, value).assertOK();
                }
            }
        }

        this.updateLastFetchedTime();
    }

    public fetchDaytimePrices(): ThrowsOrReturns<void> {
        const fetchData = Utils.fetchDataOf(ApiType.DaytimePricesResponse());

        const response = fetchData(DAYTIME_PRICES_URL).unwrap();

        const etfData = Mappers.mapPricesToETFData(response);

        this.updateSheet(etfData);
    }

    public fetchWatchListData(): ThrowsOrReturns<void> {
        const fetchData = Utils.fetchDataOf(ApiType.WatchListResponse());

        const response = fetchData(WATCH_LIST_DATA_URL).unwrap();

        const etfData = Mappers.mapWatchListToETFData(response);

        this.updateSheet(etfData);
    }

    public isFetchingEnabled(event?: TimeDrivenEvent): ThrowsOrReturns<boolean> {
        const wasMenuTriggered = !event?.triggerUid;

        return wasMenuTriggered || this.getCellBoolean(IS_FETCHING_TIME_TRIGGER_ENABLED_CELL_NAME).unwrap();
    }
}
