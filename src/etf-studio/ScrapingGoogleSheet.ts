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

    private updateLastScrapedTime(): ThrowsOrReturns<void> {
        const currentTime = Utils.getCurrentTime();

        this.setCellValue(LAST_SCRAPED_TIME_CELL_NAME, currentTime).assertOK();
    }

    private updateUniqueUrl(row: ETFScrapingTableRow): ThrowsOrReturns<void> {
        const { url, uniqueUrlCellName } = row;

        const uniqueUrl = Utils.createUniqueURL(url);

        this.setCellValue(uniqueUrlCellName, uniqueUrl).assertOK();
    }

    public isScrapingEnabled(event?: TimeDrivenEvent): ThrowsOrReturns<boolean> {
        const wasMenuTriggered = !event?.triggerUid;

        return wasMenuTriggered && this.getCellBoolean(IS_SCRAPING_ENABLED_CELL_NAME).unwrap();
    }

    public populateScrapingUrls(): ThrowsOrReturns<void> {
        const rows = Object.entries(ETF_SCRAPING_TABLE_ROWS);

        // greedily update all etfs first for fast data population
        for (const [, row] of rows) {
            this.updateUniqueUrl(row);
        }

        // then check that the scraping was a success
        for (const [etf, row] of rows) {
            const scrapeResults = this.getScrapeResults(row);

            if (!scrapeResults.isOK()) {
                Utils.alert(`${etf}: Retrying with new URL`);

                this.updateUniqueUrl(row);
            }
        }

        this.updateLastScrapedTime();
    }
}
