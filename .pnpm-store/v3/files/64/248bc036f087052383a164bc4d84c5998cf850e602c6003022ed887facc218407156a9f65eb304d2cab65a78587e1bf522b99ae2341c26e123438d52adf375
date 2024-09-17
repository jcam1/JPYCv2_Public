"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBuildInfoContracts = validateBuildInfoContracts;
const __1 = require("../..");
const debug_1 = __importDefault(require("../../utils/debug"));
const utils_1 = require("solidity-ast/utils");
const contract_name_1 = require("../../utils/contract-name");
function validateBuildInfoContracts(buildInfoFiles) {
    const sourceContracts = [];
    for (const buildInfoFile of buildInfoFiles) {
        const validations = runValidations(buildInfoFile);
        addContractsFromBuildInfo(buildInfoFile, validations, sourceContracts);
    }
    return sourceContracts;
}
function runValidations(buildInfoFile) {
    const { input, output, solcVersion } = buildInfoFile;
    const decodeSrc = (0, __1.solcInputOutputDecoder)(input, output);
    const validation = (0, __1.validate)(output, decodeSrc, solcVersion, input);
    return validation;
}
function addContractsFromBuildInfo(buildInfoFile, validationData, sourceContracts) {
    for (const sourcePath in buildInfoFile.output.sources) {
        const ast = buildInfoFile.output.sources[sourcePath].ast;
        for (const contractDef of (0, utils_1.findAll)('ContractDefinition', ast)) {
            const fullyQualifiedName = (0, contract_name_1.getFullyQualifiedName)(sourcePath, contractDef.name);
            (0, debug_1.default)('Found: ' + fullyQualifiedName);
            sourceContracts.push({
                node: contractDef,
                name: contractDef.name,
                fullyQualifiedName,
                validationData: validationData,
                buildInfoDirShortName: buildInfoFile.dirShortName,
            });
        }
    }
}
//# sourceMappingURL=validations.js.map