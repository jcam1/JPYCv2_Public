export * from './compat';
import { UpgradesError } from '../error';
import { StorageLayout } from './layout';
import { StorageOperation, StorageItem } from './compare';
import { LayoutCompatibilityReport } from './report';
import { ValidationOptions } from '../validate/overrides';
export declare function assertStorageUpgradeSafe(original: StorageLayout, updated: StorageLayout, unsafeAllowCustomTypes: boolean): void;
export declare function assertStorageUpgradeSafe(original: StorageLayout, updated: StorageLayout, opts: Required<ValidationOptions>): void;
export declare function getStorageUpgradeReport(original: StorageLayout, updated: StorageLayout, opts: Required<ValidationOptions>): LayoutCompatibilityReport;
export declare class StorageUpgradeErrors extends UpgradesError {
    readonly report: LayoutCompatibilityReport;
    constructor(report: LayoutCompatibilityReport);
}
export declare function getStorageUpgradeErrors(original: StorageLayout, updated: StorageLayout, opts?: ValidationOptions): StorageOperation<StorageItem>[];
//# sourceMappingURL=index.d.ts.map