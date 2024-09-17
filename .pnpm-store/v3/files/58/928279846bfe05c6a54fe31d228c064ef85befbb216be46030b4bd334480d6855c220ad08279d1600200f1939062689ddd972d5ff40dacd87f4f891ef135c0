"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceContractNotFound = void 0;
exports.findContract = findContract;
const assert_1 = require("../../utils/assert");
const error_1 = require("./error");
class ReferenceContractNotFound extends Error {
    constructor(reference, origin, buildInfoDirs) {
        const msg = origin !== undefined
            ? `Could not find contract ${reference} referenced in ${origin}.`
            : `Could not find contract ${reference}.`;
        super(msg);
        this.reference = reference;
        this.origin = origin;
        this.buildInfoDirs = buildInfoDirs;
    }
}
exports.ReferenceContractNotFound = ReferenceContractNotFound;
function findContract(contractName, origin, buildInfoDictionary, onlyMainBuildInfoDir = false) {
    const foundContracts = [];
    if (onlyMainBuildInfoDir) {
        if (hasBuildInfoDirWithContractName(contractName) || hasBuildInfoDirWithFullyQualifiedName(contractName)) {
            throw new error_1.ValidateCommandError(`Contract ${contractName} must be specified without a build info directory name`, () => `Build info directory names can only be specified for reference contracts.`);
        }
        foundContracts.push(...buildInfoDictionary[''].filter(c => isMatchFound(contractName, c, '')));
    }
    else {
        for (const [dir, contracts] of Object.entries(buildInfoDictionary)) {
            foundContracts.push(...contracts.filter(c => isMatchFound(contractName, c, dir)));
        }
    }
    if (foundContracts.length > 1) {
        const msg = origin !== undefined
            ? `Found multiple contracts with name ${contractName} referenced in ${origin.fullyQualifiedName}.`
            : `Found multiple contracts with name ${contractName}.`;
        throw new error_1.ValidateCommandError(msg, () => `This may be caused by old copies of build info files. Clean and recompile your project, then run the command again with the updated files.`);
    }
    else if (foundContracts.length === 1) {
        return foundContracts[0];
    }
    else {
        throw new ReferenceContractNotFound(contractName, origin?.fullyQualifiedName, Object.keys(buildInfoDictionary));
    }
}
function isMatchFound(contractName, foundContract, buildInfoDirShortName) {
    let prefix = '';
    if (buildInfoDirShortName.length > 0) {
        (0, assert_1.assert)(foundContract.buildInfoDirShortName === buildInfoDirShortName);
        prefix = `${buildInfoDirShortName}:`;
    }
    return (`${prefix}${foundContract.fullyQualifiedName}` === contractName || `${prefix}${foundContract.name}` === contractName);
}
function hasBuildInfoDirWithContractName(contractName) {
    return contractName.split(':').length === 2 && !contractName.includes('.sol:');
}
function hasBuildInfoDirWithFullyQualifiedName(contractName) {
    const tokens = contractName.split(':');
    return tokens.length === 3 && tokens[1].endsWith('.sol');
}
//# sourceMappingURL=find-contract.js.map