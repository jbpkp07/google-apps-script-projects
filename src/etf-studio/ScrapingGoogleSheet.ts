/// <reference path="./types.ts" />
/// <reference path="./consts.ts" />
/// <reference path="../common/Utils.ts" />
/// <reference path="../common/GoogleSheet.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ScrapingGoogleSheet extends GoogleSheet {
    constructor() {
        super(SCRAPING_SHEET_NAME);
    }

    public getScrapeResults(row: ETFScrapingTableRow): Either<number[]> {
        const { scrapeResultsRangeName } = row;

        return this.getRowValues(scrapeResultsRangeName, Utils.isNumber);
    }

    public isScrapingEnabled(event?: TimeDrivenEvent): boolean {
        const { isBoolean } = Utils;

        const wasTimeTriggered = !!event?.triggerUid;
        const isTimeTriggerEnabled = this.getCellValue(IS_SCRAPING_TIME_TRIGGER_ENABLED_CELL_NAME, isBoolean).unwrap();

        if (wasTimeTriggered && !isTimeTriggerEnabled) {
            return false;
        }

        return this.getCellValue(IS_SCRAPING_ENABLED_CELL_NAME, isBoolean).unwrap();
    }

    public isRowEnabled(row: ETFScrapingTableRow): boolean {
        const { isEnabledCellName } = row;

        return this.getCellValue(isEnabledCellName, Utils.isBoolean).unwrap();
    }

    public retryUpdateUrl(row: ETFScrapingTableRow): void {
        const { etfCellName } = row;

        const etf = this.getCellValue(etfCellName, Utils.isNonEmptyString).unwrap();

        Utils.alert(`${etf}: Retrying with new URL`);

        this.updateUrl(row);
    }

    public updateLastScrapedTime(): void {
        const currentTime = Utils.getCurrentTime();

        this.setCellValue(LAST_SCRAPED_TIME_CELL_NAME, currentTime).assertOK();
    }

    public updateUrl(row: ETFScrapingTableRow): void {
        const { slugCellName, urlCellName } = row;

        const domain = this.getCellValue(SCRAPING_DOMAIN_CELL_NAME, Utils.isNonEmptyString).unwrap();
        const slug = this.getCellValue(slugCellName, Utils.isNonEmptyString).unwrap();

        const url = Utils.createUrl(domain, slug);
        const uniqueUrl = Utils.createUniqueURL(url);

        this.setCellValue(urlCellName, uniqueUrl).assertOK();
    }
}
