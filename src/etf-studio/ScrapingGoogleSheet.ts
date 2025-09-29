/// <reference path="./consts.ts" />
/// <reference path="../common/GoogleSheet.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ScrapingGoogleSheet extends GoogleSheet {
    constructor() {
        super(SCRAPING_SHEET_NAME);
    }

    public getScrapeResults(row: ETFScrapingTableRow): Either<number[]> {
        const { scrapeResultsRangeName } = row;

        return super.getRowNumberArray(scrapeResultsRangeName);
    }

    public isScrapingEnabled(event?: TimeDrivenEvent): ThrowsOrReturns<boolean> {
        const wasTimeTriggered = !!event?.triggerUid;
        const isTimeTriggerEnabled = super.getCellBoolean(IS_SCRAPING_TIME_TRIGGER_ENABLED_CELL_NAME).unwrap();

        if (wasTimeTriggered && !isTimeTriggerEnabled) {
            return false;
        }

        return super.getCellBoolean(IS_SCRAPING_ENABLED_CELL_NAME).unwrap();
    }

    public isRowEnabled(row: ETFScrapingTableRow): ThrowsOrReturns<boolean> {
        const { isEnabledCellName } = row;

        return super.getCellBoolean(isEnabledCellName).unwrap();
    }

    public retryUpdateUrl(row: ETFScrapingTableRow): ThrowsOrReturns<void> {
        const { etfCellName } = row;

        const etf = super.getCellString(etfCellName).unwrap();

        Utils.alert(`${etf}: Retrying with new URL`);

        this.updateUrl(row);
    }

    public updateLastScrapedTime(): ThrowsOrReturns<void> {
        const currentTime = Utils.getCurrentTime();

        super.setCellValue(LAST_SCRAPED_TIME_CELL_NAME, currentTime).assertOK();
    }

    public updateUrl(row: ETFScrapingTableRow): ThrowsOrReturns<void> {
        const { slugCellName, urlCellName } = row;

        const domain = super.getCellString(SCRAPING_DOMAIN_CELL_NAME).unwrap();
        const slug = super.getCellString(slugCellName).unwrap();

        const url = Utils.createUrl(domain, slug);
        const uniqueUrl = Utils.createUniqueURL(url);

        super.setCellValue(urlCellName, uniqueUrl).assertOK();
    }
}
