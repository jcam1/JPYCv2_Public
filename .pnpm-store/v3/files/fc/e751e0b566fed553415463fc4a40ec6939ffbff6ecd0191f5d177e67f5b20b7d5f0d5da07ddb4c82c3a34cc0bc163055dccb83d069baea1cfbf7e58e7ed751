"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpgradeSafety = validateUpgradeSafety;
exports.findSpecifiedContracts = findSpecifiedContracts;
exports.withCliDefaults = withCliDefaults;
const path_1 = __importDefault(require("path"));
const __1 = require("../..");
const build_info_file_1 = require("./build-info-file");
const contract_report_1 = require("./contract-report");
const find_contract_1 = require("./find-contract");
const project_report_1 = require("./project-report");
const validations_1 = require("./validations");
/**
 * Validates the upgrade safety of all contracts in the build info dir's build info files.
 * Only contracts that are detected as upgradeable will be validated.
 *
 * @param buildInfoDir Path of build info directory, or undefined to use the default Hardhat or Foundry build-info dir.
 * @param contract The name or fully qualified name of the contract to validate. If not specified, all upgradeable contracts in the build info directory will be validated.
 * @param reference The name or fully qualified name of the reference contract to use for storage layout comparisons. Can only be used along with `contract`. If not specified, uses the `@custom:oz-upgrades-from` annotation in the contract that is being validated.
 * @param opts Validation options, or undefined to use the default validation options.
 * @param referenceBuildInfoDirs Optional paths of additional build info directories from previous versions of the project to use for storage layout comparisons. When using this option, refer to one of these directories using prefix `<dirName>:` before the contract name or fully qualified name in the `reference` param or `@custom:oz-upgrades-from` annotation, where `<dirName>` is the directory short name. Each directory short name must be unique, including compared to the main build info directory.
 * @param exclude Exclude validations for contracts in source file paths that match any of the given glob patterns.
 * @returns The project report.
 */
async function validateUpgradeSafety(buildInfoDir, contract, reference, opts = {}, referenceBuildInfoDirs, exclude) {
    const allOpts = withCliDefaults(opts);
    const buildInfoFiles = await (0, build_info_file_1.getBuildInfoFiles)(buildInfoDir);
    const sourceContracts = (0, validations_1.validateBuildInfoContracts)(buildInfoFiles);
    const buildInfoDictionary = {};
    buildInfoDictionary[''] = sourceContracts;
    if (buildInfoFiles.length > 0) {
        buildInfoDictionary[buildInfoFiles[0].dirShortName] = sourceContracts;
    }
    if (referenceBuildInfoDirs !== undefined) {
        for (const referenceBuildInfoDir of referenceBuildInfoDirs) {
            const key = path_1.default.basename(referenceBuildInfoDir);
            if (buildInfoDictionary[key] !== undefined) {
                throw new Error(`Reference build info directory short name '${key}' is not unique.`);
            }
            const referenceBuildInfoFiles = await (0, build_info_file_1.getBuildInfoFiles)(referenceBuildInfoDir);
            buildInfoDictionary[key] = (0, validations_1.validateBuildInfoContracts)(referenceBuildInfoFiles);
        }
    }
    const specifiedContracts = findSpecifiedContracts(buildInfoDictionary, allOpts, contract, reference);
    const contractReports = (0, contract_report_1.getContractReports)(buildInfoDictionary, allOpts, specifiedContracts, exclude);
    return (0, project_report_1.getProjectReport)(contractReports, specifiedContracts !== undefined);
}
function findSpecifiedContracts(buildInfoDictionary, opts, contractName, referenceName) {
    if (contractName !== undefined) {
        return {
            contract: (0, find_contract_1.findContract)(contractName, undefined, buildInfoDictionary, true), // only search main build info dir for the specified contract
            reference: referenceName !== undefined ? (0, find_contract_1.findContract)(referenceName, undefined, buildInfoDictionary) : undefined,
        };
    }
    else if (referenceName !== undefined) {
        throw new Error(`The reference option can only be specified when the contract option is also specified.`);
    }
    else if (opts.requireReference) {
        throw new Error(`The requireReference option can only be specified when the contract option is also specified.`);
    }
    else {
        return undefined;
    }
}
function withCliDefaults(opts) {
    if (opts.requireReference && opts.unsafeSkipStorageCheck) {
        throw new Error(`The requireReference and unsafeSkipStorageCheck options cannot be used at the same time.`);
    }
    return {
        ...(0, __1.withValidationDefaults)(opts),
        requireReference: opts.requireReference ?? false,
    };
}
//# sourceMappingURL=validate-upgrade-safety.js.map