/// <reference path="./types.ts" />
/// <reference path="./consts.ts" />
/// <reference path="../common/Utils.ts" />
/// <reference path="../common/GoogleSheet.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ScrapingGoogleSheet extends GoogleSheet {
    constructor() {
        super(SCRAPING_SHEET_NAME);
    }

    public getScrapeResults(row: ETFTableRowNames): Either<number[]> {
        const { scrapeResultsRangeName } = row;

        return this.getRowValues(scrapeResultsRangeName, Utils.isNumber);
    }

    public isExecutionDisabled(event?: TimeDrivenEvent): boolean {
        const isTimeTriggerAllowed = this.getCellValue(IS_TIME_TRIGGER_ALLOWED_CELL_NAME, Utils.isBoolean).unwrap();
        const wasTimeTriggered = !!event?.triggerUid;

        return !isTimeTriggerAllowed && wasTimeTriggered;
    }

    public isRowActive(row: ETFTableRowNames): boolean {
        const { isActiveCellName } = row;

        return this.getCellValue(isActiveCellName, Utils.isBoolean).unwrap();
    }

    public retryUpdateUrl(row: ETFTableRowNames): void {
        const { etfCellName } = row;

        const etf = this.getCellValue(etfCellName, Utils.isNonEmptyString).unwrap();

        Utils.alert(`${etf}: Retrying with new URL`);

        this.updateUrl(row);
    }

    public updateLastScrapedTime(): void {
        const currentTime = Utils.getCurrentTime();

        this.setCellValue(LAST_SCRAPED_TIME_CELL_NAME, currentTime).assertOK();
    }

    public updateUrl(row: ETFTableRowNames): void {
        const { slugCellName, urlCellName } = row;

        const domain = this.getCellValue(DOMAIN_CELL_NAME, Utils.isNonEmptyString).unwrap();
        const slug = this.getCellValue(slugCellName, Utils.isNonEmptyString).unwrap();

        const url = Utils.createUrl(domain, slug);
        const uniqueUrl = Utils.createUniqueURL(url);

        this.setCellValue(urlCellName, uniqueUrl).assertOK();
    }
}
