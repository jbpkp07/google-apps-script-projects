/// <reference path="./consts.ts" />
/// <reference path="../common/Utils.ts" />
/// <reference path="./FetchingGoogleSheet.ts" />
/// <reference path="./ScrapingGoogleSheet.ts" />

function fetchDaytimePrices(event?: TimeDrivenEvent): void {
    try {
        const sheet = new FetchingGoogleSheet();

        if (sheet.isFetchingEnabled(event)) {
            sheet.fetchDaytimePrices();
        }
    } catch (error) {
        Utils.alert(error);
    }
}

function fetchWatchListData(): void {
    try {
        const sheet = new FetchingGoogleSheet();

        sheet.fetchWatchListData();
    } catch (error) {
        Utils.alert(error);
    }
}

function populateScrapingUrls(event?: TimeDrivenEvent): void {
    try {
        const sheet = new ScrapingGoogleSheet();

        if (sheet.isScrapingEnabled(event)) {
            sheet.populateScrapingUrls();
        } else {
            Utils.alert("Scraping is disabled");
        }
    } catch (error) {
        Utils.alert(error);
    }
}
