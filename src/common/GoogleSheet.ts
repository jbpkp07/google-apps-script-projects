/// <reference path="./types.ts" />
/// <reference path="./Either.ts" />

class GoogleSheet {
    private readonly _sheet: Sheet;

    constructor(sheetName: string) {
        this._sheet = this.getSheet(sheetName).unwrap();
    }

    private getSheet(sheetName: string): Either<Sheet> {
        try {
            const sheet = SpreadsheetApp.getActiveSpreadsheet()?.getSheetByName(sheetName);
            const value = sheet ?? new Error(`"${sheetName}" sheet not found`);

            return Either.new(value);
        } catch (error) {
            return Either.fromError(error);
        }
    }

    private getRange(rangeName: string): CellRange | null {
        return this._sheet.getRange(rangeName) ?? null;
    }

    public getCellValue<T>(cellName: string, isTypeOK: IsTypeOK<T>): Either<T> {
        const value: unknown = this.getRange(cellName)?.getValue();

        return isTypeOK(value)
            ? Either.new(value)
            : Either.newError(`Value at "${cellName}" is either missing or the wrong type`);
    }

    public getRowValues<T>(rangeName: string, isTypeOK: IsTypeOK<T[]>): Either<T[]> {
        const values: unknown[] | undefined = this.getRange(rangeName)?.getValues()[0];

        return isTypeOK(values)
            ? Either.new(values)
            : Either.newError(`Row values at "${rangeName}" are either missing or the wrong type`);
    }

    public setCellValue(cellName: string, value: string | number | boolean): Either<undefined> {
        const range: CellRange | undefined = this.getRange(cellName)?.setValue(value);

        return range?.getValue() === value
            ? Either.new(undefined)
            : Either.newError(`Failed setting value ("${String(value)}" type ${typeof value}) at cell "${cellName}"`);
    }
}
