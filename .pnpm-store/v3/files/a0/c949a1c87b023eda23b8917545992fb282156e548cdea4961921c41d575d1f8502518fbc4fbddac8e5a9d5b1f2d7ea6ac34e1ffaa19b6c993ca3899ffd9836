import { SolcOutput, SolcInput } from './solc-api';
import { UpgradeableContractErrorReport, ValidationOptions } from './validate';
import { StorageLayout } from './storage';
import { Version } from './version';
import { ValidationError } from './validate/run';
export interface Report {
    ok: boolean;
    explain(color?: boolean): string;
}
/**
 * @deprecated Use `validateUpgradeSafety` instead.
 */
export declare class UpgradeableContract {
    readonly name: string;
    readonly version: Version;
    readonly errors: ValidationError[];
    readonly layout: StorageLayout;
    constructor(name: string, solcInput: SolcInput, solcOutput: SolcOutput, opts?: ValidationOptions, solcVersion?: string);
    getErrorReport(): UpgradeableContractErrorReport;
    getStorageUpgradeReport(newVersion: UpgradeableContract, opts?: ValidationOptions): import("./storage/report").LayoutCompatibilityReport;
}
//# sourceMappingURL=standalone.d.ts.map