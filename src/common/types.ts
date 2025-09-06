/* eslint-disable @typescript-eslint/no-unused-vars */

type TimeDrivenEvent = GoogleAppsScript.Events.TimeDriven;

type Sheet = GoogleAppsScript.Spreadsheet.Sheet;

type CellRange = GoogleAppsScript.Spreadsheet.Range;

type NotError<T> = T extends Error ? never : T;

type IsTypeOK<T> = (value: unknown) => value is NotError<T>;

type BasicRecord = Record<string, unknown>;
