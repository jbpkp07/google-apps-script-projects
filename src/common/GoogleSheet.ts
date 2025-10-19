/// <reference path="./Type.ts" />
/// <reference path="./Either.ts" />
/// <reference path="./Utils.ts" />

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

    private getRange(rangeName: Uppercase<string>): CellRange {
        return this._sheet.getRange(rangeName);
    }

    private getCellValueOf<T>(isTypeOK: IsTypeOK<T>): GetCellValue<T> {
        //
        const getCellValue = (cellName: Uppercase<string>): Either<T> => {
            try {
                const value: unknown = this.getRange(cellName).getValue();

                return isTypeOK(value)
                    ? Either.new(value)
                    : Either.error(`Value at "${cellName}" is either missing or the wrong type`);
            } catch {
                return Either.error(`Unable to get value at cell name: ${cellName}`);
            }
        };

        return getCellValue;
    }

    private getRowValuesOf<T>(isTypeOK: IsTypeOK<T[]>): GetRowValues<T> {
        //
        const getRowValues = (rangeName: Uppercase<string>): Either<T[]> => {
            try {
                const values: unknown[] | undefined = this.getRange(rangeName).getValues()[0];

                return isTypeOK(values)
                    ? Either.new(values)
                    : Either.error(`Row values at "${rangeName}" are either missing or the wrong type`);
            } catch {
                return Either.error(`Unable to get row values for cell range: ${rangeName}`);
            }
        };

        return getRowValues;
    }

    public setCellValue(cellName: Uppercase<string>, value: Literal): Either<void> {
        try {
            this.getRange(cellName).setValue(value);

            return Either.void();
        } catch {
            return Either.error(`Unable to set value: ${String(value)} at cell name: ${cellName}`);
        }
    }

    public getCellBoolean = this.getCellValueOf(Type.boolean());

    public getCellString = this.getCellValueOf(Type.stringOfMinLength(1));

    public getRowNumberArray = this.getRowValuesOf(Type.numberArray());
}
