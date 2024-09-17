"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpgradeableContractReport = void 0;
exports.getContractReports = getContractReports;
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = __importDefault(require("../../utils/debug"));
const __1 = require("../..");
const upgradeability_assessment_1 = require("./upgradeability-assessment");
const indent_1 = require("../../utils/indent");
const minimatch_1 = require("minimatch");
const error_1 = require("./error");
const default_exclude_1 = require("./default-exclude");
/**
 * Report for an upgradeable contract.
 * Contains the standalone report, and if there is a reference contract, the reference contract name and storage layout report.
 */
class UpgradeableContractReport {
    constructor(contract, reference, standaloneReport, storageLayoutReport) {
        this.contract = contract;
        this.reference = reference;
        this.standaloneReport = standaloneReport;
        this.storageLayoutReport = storageLayoutReport;
        if (reference === contract) {
            throw new error_1.ValidateCommandError(`The contract ${contract} must not use itself as a reference for storage layout comparisons.`, () => `\
If this is the first version of your contract, do not specify a reference.
If this is a subsequent version, keep the previous version of the contract in another file and specify that as the reference, or specify a reference from another build info directory containing the previous version. If you do not have the previous version available, you can skip the storage layout check using the \`unsafeSkipStorageCheck\` option, which is a dangerous option meant to be used as a last resort.`);
        }
    }
    get ok() {
        return this.standaloneReport.ok && (this.storageLayoutReport === undefined || this.storageLayoutReport.ok);
    }
    /**
     * Explain any errors in the report.
     */
    explain(color = true) {
        const result = [];
        const chalk = new chalk_1.default.Instance({ level: color && chalk_1.default.supportsColor ? chalk_1.default.supportsColor.level : 0 });
        const icon = this.ok ? chalk.green('✔') : chalk.red('✘');
        if (this.reference === undefined) {
            result.push(` ${icon}  ${this.contract}`);
        }
        else {
            result.push(` ${icon}  ${this.contract} (upgrades from ${this.reference})`);
        }
        if (!this.standaloneReport.ok) {
            result.push((0, indent_1.indent)(this.standaloneReport.explain(color), 6));
        }
        if (this.storageLayoutReport !== undefined && !this.storageLayoutReport.ok) {
            result.push((0, indent_1.indent)(this.storageLayoutReport.explain(color), 6));
        }
        return result.join('\n\n');
    }
}
exports.UpgradeableContractReport = UpgradeableContractReport;
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
function getContractReports(buildInfoDictionary, opts, specifiedContracts, exclude) {
    const upgradeableContractReports = [];
    const contractsToReport = specifiedContracts !== undefined ? [specifiedContracts.contract] : buildInfoDictionary[''];
    for (const sourceContract of contractsToReport) {
        const upgradeabilityAssessment = (0, upgradeability_assessment_1.getUpgradeabilityAssessment)(sourceContract, buildInfoDictionary, specifiedContracts?.reference);
        if (opts.requireReference && upgradeabilityAssessment.referenceContract === undefined) {
            throw new Error(`The contract ${sourceContract.fullyQualifiedName} does not specify what contract it upgrades from. Add the \`@custom:oz-upgrades-from <REFERENCE_CONTRACT>\` annotation to the contract, or include the reference contract name when running the validate command or function.`);
        }
        else if (specifiedContracts !== undefined || upgradeabilityAssessment.upgradeable) {
            const reference = upgradeabilityAssessment.referenceContract;
            const kind = upgradeabilityAssessment.uups ? 'uups' : 'transparent';
            const report = getUpgradeableContractReport(sourceContract, reference, { ...opts, kind: kind }, exclude);
            if (report !== undefined) {
                upgradeableContractReports.push(report);
            }
            else if (specifiedContracts !== undefined) {
                // If there was no report for the specified contract, it was excluded or is abstract.
                const userAction = exclude !== undefined
                    ? `Ensure the contract is not abstract and is not excluded by the exclude option.`
                    : `Ensure the contract is not abstract.`;
                throw new error_1.ValidateCommandError(`No validation report found for contract ${specifiedContracts.contract.fullyQualifiedName}`, () => userAction);
            }
        }
    }
    return upgradeableContractReports;
}
/**
 * Gets a report for an upgradeable contract.
 * Returns undefined if the contract is excluded or is abstract.
 */
function getUpgradeableContractReport(contract, referenceContract, opts, exclude) {
    const excludeWithDefaults = default_exclude_1.defaultExclude.concat(exclude ?? []);
    if (excludeWithDefaults.some(glob => (0, minimatch_1.minimatch)(getPath(contract.fullyQualifiedName), glob))) {
        (0, debug_1.default)('Excluding contract: ' + contract.fullyQualifiedName);
        return undefined;
    }
    let version;
    try {
        version = (0, __1.getContractVersion)(contract.validationData, contract.fullyQualifiedName);
    }
    catch (e) {
        if (e.message.endsWith('is abstract')) {
            // Skip abstract upgradeable contracts - they will be validated as part of their caller contracts
            // for the functions that are in use.
            return undefined;
        }
        else {
            throw e;
        }
    }
    (0, debug_1.default)('Checking: ' + contract.fullyQualifiedName);
    const standaloneReport = getStandaloneReport(contract.validationData, version, opts, excludeWithDefaults);
    let reference;
    let storageLayoutReport;
    if (opts.unsafeSkipStorageCheck !== true && referenceContract !== undefined) {
        const layout = (0, __1.getStorageLayout)(contract.validationData, version);
        const referenceVersion = (0, __1.getContractVersion)(referenceContract.validationData, referenceContract.fullyQualifiedName);
        const referenceLayout = (0, __1.getStorageLayout)(referenceContract.validationData, referenceVersion);
        if (referenceContract.buildInfoDirShortName !== contract.buildInfoDirShortName) {
            reference = `${referenceContract.buildInfoDirShortName}:${referenceContract.fullyQualifiedName}`;
        }
        else {
            reference = referenceContract.fullyQualifiedName;
        }
        storageLayoutReport = (0, __1.getStorageUpgradeReport)(referenceLayout, layout, opts);
    }
    return new UpgradeableContractReport(contract.fullyQualifiedName, reference, standaloneReport, storageLayoutReport);
}
function getStandaloneReport(data, version, opts, excludeWithDefaults) {
    const allErrors = (0, __1.getErrors)(data, version, opts);
    const includeErrors = allErrors.filter(e => {
        const shouldExclude = excludeWithDefaults.some(glob => (0, minimatch_1.minimatch)(getPath(e.src), glob));
        if (shouldExclude) {
            (0, debug_1.default)('Excluding error: ' + e.src);
        }
        return !shouldExclude;
    });
    return new __1.UpgradeableContractErrorReport(includeErrors);
}
function getPath(srcOrFullyQualifiedName) {
    return srcOrFullyQualifiedName.split(':')[0];
}
//# sourceMappingURL=contract-report.js.map