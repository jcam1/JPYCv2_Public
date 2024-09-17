import { ValidateUpgradeSafetyOptions, UpgradeableContractErrorReport } from '../..';
import { Report } from '../../standalone';
import { LayoutCompatibilityReport } from '../../storage/report';
import { BuildInfoDictionary, SpecifiedContracts } from './validate-upgrade-safety';
/**
 * Report for an upgradeable contract.
 * Contains the standalone report, and if there is a reference contract, the reference contract name and storage layout report.
 */
export declare class UpgradeableContractReport implements Report {
    readonly contract: string;
    readonly reference: string | undefined;
    readonly standaloneReport: UpgradeableContractErrorReport;
    readonly storageLayoutReport: LayoutCompatibilityReport | undefined;
    constructor(contract: string, reference: string | undefined, standaloneReport: UpgradeableContractErrorReport, storageLayoutReport: LayoutCompatibilityReport | undefined);
    get ok(): boolean;
    /**
     * Explain any errors in the report.
     */
    explain(color?: boolean): string;
}
/**
 * Gets upgradeble contract reports for the upgradeable contracts in the set of source contracts at dictionary key ''.
 * Reference contracts can come from source contracts at the corresponding dictionary key.
 * Only contracts that are detected as upgradeable will be included in the reports.
 * Reports include upgradeable contracts regardless of whether they pass or fail upgrade safety checks.
 *
 * @param buildInfoDictionary Dictionary of build info directories and the source contracts they contain.
 * @param opts The validation options.
 * @param specifiedContracts If provided, only the specified contract (upgrading from its reference contract) will be reported.
 * @param exclude Exclude validations for contracts in source file paths that match any of the given glob patterns.
 * @returns The upgradeable contract reports.
 */
export declare function getContractReports(buildInfoDictionary: BuildInfoDictionary, opts: Required<ValidateUpgradeSafetyOptions>, specifiedContracts?: SpecifiedContracts, exclude?: string[]): UpgradeableContractReport[];
//# sourceMappingURL=contract-report.d.ts.map