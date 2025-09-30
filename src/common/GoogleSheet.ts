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

    private getRange(rangeName: string): CellRange {
        return this._sheet.getRange(rangeName);
    }

    private getCellValueOf<T>(isTypeOK: IsTypeOK<T>): GetCellValue<T> {
        //
        const getCellValue = (cellName: string): Either<T> => {
            try {
                const value: unknown = this.getRange(cellName).getValue();

                return isTypeOK(value)
                    ? Either.new(value)
                    : Either.newError(`Value at "${cellName}" is either missing or the wrong type`);
            } catch {
                return Either.newError(`Unable to get value at cell name: ${cellName}`);
            }
        };

        return getCellValue;
    }

    private getRowValuesOf<T>(isTypeOK: IsTypeOK<T[]>): GetRowValues<T> {
        //
        const getRowValues = (rangeName: string): Either<T[]> => {
            try {
                const values: unknown[] | undefined = this.getRange(rangeName).getValues()[0];

                return isTypeOK(values)
                    ? Either.new(values)
                    : Either.newError(`Row values at "${rangeName}" are either missing or the wrong type`);
            } catch {
                return Either.newError(`Unable to get row values for cell range: ${rangeName}`);
            }
        };

        return getRowValues;
    }

    public setCellValue(cellName: string, value: Literal): Either<undefined> {
        try {
            this.getRange(cellName).setValue(value);

            return Either.new();
        } catch {
            return Either.newError(`Unable to set value: ${String(value)} at cell name: ${cellName}`);
        }
    }

    public getCellBoolean = this.getCellValueOf(Type.boolean());

    public getCellString = this.getCellValueOf(Type.stringOfMinLength(1));

    public getRowNumberArray = this.getRowValuesOf(Type.numberArray());
}
