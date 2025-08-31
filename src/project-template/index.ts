type TimeDrivenEvent = GoogleAppsScript.Events.TimeDriven;

function handler(event?: TimeDrivenEvent): void {
    console.log(event?.triggerUid ?? "project-template running...");
}

handler();
