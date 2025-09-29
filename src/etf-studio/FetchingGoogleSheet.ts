/// <reference path="./consts.ts" />
/// <reference path="./Mappers.ts" />
/// <reference path="../common/GoogleSheet.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class FetchingGoogleSheet extends GoogleSheet {
    constructor() {
        super(FETCHING_SHEET_NAME);
    }

    private updateSheet(fetchResults: ETFData[]): ThrowsOrReturns<void> {
        for (const etfData of fetchResults) {
            for (const { value, cellName } of Object.values(etfData)) {
                if (Type.isNonEmptyLiteral(value)) {
                    super.setCellValue(cellName, value).assertOK();
                }
            }
        }
    }

    public fetchDaytimePrices(): ThrowsOrReturns<void> {
        const url = super.getCellString(DAYTIME_PRICES_URL_CELL_NAME).unwrap();

        const response = Utils.fetchDataOf(ApiType.DaytimePricesResponse())(url).unwrap();

        const etfData = Mappers.mapPricesToETFData(response);

        this.updateSheet(etfData);
    }

    public fetchWatchListData(): ThrowsOrReturns<void> {
        const url = super.getCellString(WATCH_LIST_URL_CELL_NAME).unwrap();

        const response = Utils.fetchDataOf(ApiType.WatchListResponse())(url).unwrap();

        const etfData = Mappers.mapWatchListToETFData(response);

        this.updateSheet(etfData);
    }

    public isFetchingEnabled(event?: TimeDrivenEvent): ThrowsOrReturns<boolean> {
        const wasTimeTriggered = !!event?.triggerUid;
        const isTimeTriggerEnabled = super.getCellBoolean(IS_FETCHING_TIME_TRIGGER_ENABLED_CELL_NAME).unwrap();

        if (wasTimeTriggered && !isTimeTriggerEnabled) {
            return false;
        }

        return super.getCellBoolean(IS_FETCHING_ENABLED_CELL_NAME).unwrap();
    }

    public updateLastFetchedTime(): ThrowsOrReturns<void> {
        const currentTime = Utils.getCurrentTime();

        super.setCellValue(LAST_FETCHED_TIME_CELL_NAME, currentTime).assertOK();
    }
}
