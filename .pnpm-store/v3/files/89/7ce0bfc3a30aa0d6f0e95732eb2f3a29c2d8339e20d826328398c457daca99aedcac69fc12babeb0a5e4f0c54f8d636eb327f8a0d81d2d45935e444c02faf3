import { ValidationRunData } from './run';
type ValidationDataV1 = ValidationRunData;
type ValidationDataV2 = ValidationRunData[];
interface ValidationDataV3 {
    version: '3' | '3.1' | '3.2' | '3.3' | '3.4';
    log: ValidationRunData[];
}
export type ValidationDataCurrent = ValidationDataV3;
export type ValidationData = ValidationDataV1 | ValidationDataV2 | ValidationDataV3;
export declare function normalizeValidationData(data: ValidationData): ValidationDataCurrent;
export declare function isCurrentValidationData(data: ValidationData, exact?: boolean): data is ValidationDataCurrent;
export declare function concatRunData(newRunData: ValidationRunData, previousData?: ValidationDataCurrent): ValidationDataCurrent;
export {};
//# sourceMappingURL=data.d.ts.map