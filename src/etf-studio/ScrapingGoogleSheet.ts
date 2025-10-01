/// <reference path="./consts.ts" />
/// <reference path="../common/GoogleSheet.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ScrapingGoogleSheet extends GoogleSheet {
    constructor() {
        super(SCRAPING_SHEET_NAME);
    }

    private getScrapeResults(row: ETFScrapingTableRow): Either<number[]> {
        const { scrapeResultsRangeName } = row;

        return this.getRowNumberArray(scrapeResultsRangeName);
    }

    private isRowEnabled(row: ETFScrapingTableRow): ThrowsOrReturns<boolean> {
        const { isEnabledCellName } = row;

        return this.getCellBoolean(isEnabledCellName).unwrap();
    }

    private retryUpdateUrl(row: ETFScrapingTableRow): ThrowsOrReturns<void> {
        const { etfCellName } = row;

        const etf = this.getCellString(etfCellName).unwrap();

        Utils.alert(`${etf}: Retrying with new URL`);

        this.updateUrl(row);
    }

    private updateLastScrapedTime(): ThrowsOrReturns<void> {
        const currentTime = Utils.getCurrentTime();

        this.setCellValue(LAST_SCRAPED_TIME_CELL_NAME, currentTime).assertOK();
    }

    private updateUrl(row: ETFScrapingTableRow): ThrowsOrReturns<void> {
        const { slugCellName, urlCellName } = row;

        const domain = this.getCellString(SCRAPING_DOMAIN_CELL_NAME).unwrap();
        const slug = this.getCellString(slugCellName).unwrap();

        const url = Utils.createUrl(domain, slug);
        const uniqueUrl = Utils.createUniqueURL(url);

        this.setCellValue(urlCellName, uniqueUrl).assertOK();
    }

    public isScrapingEnabled(event?: TimeDrivenEvent): ThrowsOrReturns<boolean> {
        const wasTimeTriggered = !!event?.triggerUid;
        const isTimeTriggerEnabled = this.getCellBoolean(IS_SCRAPING_TIME_TRIGGER_ENABLED_CELL_NAME).unwrap();

        if (wasTimeTriggered && !isTimeTriggerEnabled) {
            return false;
        }

        return this.getCellBoolean(IS_SCRAPING_ENABLED_CELL_NAME).unwrap();
    }

    public populateScrapingUrls(): ThrowsOrReturns<void> {
        for (const row of ETF_SCRAPING_TABLE_CELL_NAMES) {
            if (this.isRowEnabled(row)) {
                this.updateUrl(row);

                const scrapeResults = this.getScrapeResults(row);

                if (!scrapeResults.isOK()) {
                    this.retryUpdateUrl(row);
                }
            }
        }

        this.updateLastScrapedTime();
    }
}
