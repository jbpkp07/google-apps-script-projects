/* eslint-disable @typescript-eslint/no-unused-vars */

type TimeDrivenEvent = GoogleAppsScript.Events.TimeDriven;

type Sheet = GoogleAppsScript.Spreadsheet.Sheet;

type CellRange = GoogleAppsScript.Spreadsheet.Range;

type ThrowsOrReturns<T> = T;

type NotError<T> = T extends Error ? never : T;

type IsTypeOK<T> = (value: unknown) => value is NotError<T>;

type IsArrayOK<T> = (value: unknown) => value is NotError<T>[];

type IsStringOK = (value: unknown) => value is string;

type GetCellValue<T> = (cellName: string) => Either<T>;

type GetRowValues<T> = (rangeName: string) => Either<T[]>;

type FetchData<T> = (url: string) => Either<T>;

type BasicRecord = Record<string, unknown>;
