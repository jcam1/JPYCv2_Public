import { UpgradeableContractReport } from './contract-report';
import { Report } from '../../standalone';
export declare class ProjectReport implements Report {
    readonly upgradeableContractReports: UpgradeableContractReport[];
    readonly specifiedContract?: boolean | undefined;
    constructor(upgradeableContractReports: UpgradeableContractReport[], specifiedContract?: boolean | undefined);
    get ok(): boolean;
    explain(color?: boolean): string;
    /**
     * Number of contracts that passed upgrade safety checks.
     */
    get numPassed(): number;
    /**
     * Total number of upgradeable contracts detected.
     */
    get numTotal(): number;
}
export declare function getProjectReport(upgradeableContractReports: UpgradeableContractReport[], specifiedContract?: boolean): ProjectReport;
//# sourceMappingURL=project-report.d.ts.map