/// <reference path="../common/types.ts" />
/// <reference path="./consts.ts" />
/// <reference path="../common/Utils.ts" />
/// <reference path="./ScrapingGoogleSheet.ts" />

function populateScrapingUrls(event?: TimeDrivenEvent): void {
    try {
        const sheet = new ScrapingGoogleSheet();

        if (!sheet.isScrapingEnabled(event)) {
            Utils.logToCloud("Scraping is disabled");

            return;
        }

        sheet.updateLastScrapedTime();

        for (const row of ETF_SCRAPING_TABLE_CELL_NAMES) {
            if (sheet.isRowEnabled(row)) {
                sheet.updateUrl(row);

                const scrapeResults = sheet.getScrapeResults(row);

                if (!scrapeResults.isOK()) {
                    sheet.retryUpdateUrl(row);
                }
            }
        }

        Utils.logToCloud("Success");
    } catch (error) {
        Utils.alert(error);
    }
}
