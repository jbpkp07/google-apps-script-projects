/// <reference path="./types.ts" />
/// <reference path="./consts.ts" />
/// <reference path="../common/Type.ts" />
/// <reference path="./ApiType.ts" />
/// <reference path="../common/Utils.ts" />
/// <reference path="../common/Either.ts" />
/// <reference path="../common/GoogleSheet.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ScrapingGoogleSheet extends GoogleSheet {
    private getCellBoolean = this.getCellValueOf(Type.boolean());

    private getCellString = this.getCellValueOf(Type.stringOfMinLength(1));

    private getRowNumberArray = this.getRowValuesOf(Type.numberArray());

    constructor() {
        super(SCRAPING_SHEET_NAME);
    }

    public getScrapeResults(row: ETFScrapingTableRow): Either<number[]> {
        const { scrapeResultsRangeName } = row;

        return this.getRowNumberArray(scrapeResultsRangeName);
    }

    public isScrapingEnabled(event?: TimeDrivenEvent): boolean {
        const wasTimeTriggered = !!event?.triggerUid;
        const isTimeTriggerEnabled = this.getCellBoolean(IS_SCRAPING_TIME_TRIGGER_ENABLED_CELL_NAME).unwrap();

        if (wasTimeTriggered && !isTimeTriggerEnabled) {
            return false;
        }

        return this.getCellBoolean(IS_SCRAPING_ENABLED_CELL_NAME).unwrap();
    }

    public isRowEnabled(row: ETFScrapingTableRow): boolean {
        const { isEnabledCellName } = row;

        return this.getCellBoolean(isEnabledCellName).unwrap();
    }

    public retryUpdateUrl(row: ETFScrapingTableRow): void {
        const { etfCellName } = row;

        const etf = this.getCellString(etfCellName).unwrap();

        Utils.alert(`${etf}: Retrying with new URL`);

        this.updateUrl(row);
    }

    public updateLastScrapedTime(): void {
        const currentTime = Utils.getCurrentTime();

        this.setCellValue(LAST_SCRAPED_TIME_CELL_NAME, currentTime).assertOK();
    }

    public updateUrl(row: ETFScrapingTableRow): void {
        const { slugCellName, urlCellName } = row;

        const domain = this.getCellString(SCRAPING_DOMAIN_CELL_NAME).unwrap();
        const slug = this.getCellString(slugCellName).unwrap();

        const url = Utils.createUrl(domain, slug);
        const uniqueUrl = Utils.createUniqueURL(url);

        this.setCellValue(urlCellName, uniqueUrl).assertOK();
    }
}
