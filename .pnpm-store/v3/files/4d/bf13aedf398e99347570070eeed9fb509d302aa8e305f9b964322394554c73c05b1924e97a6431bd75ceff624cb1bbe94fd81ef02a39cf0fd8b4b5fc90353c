"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertUpgradeSafe = assertUpgradeSafe;
exports.getContractVersion = getContractVersion;
exports.getContractNameAndRunValidation = getContractNameAndRunValidation;
exports.getStorageLayout = getStorageLayout;
exports.unfoldStorageLayout = unfoldStorageLayout;
exports.findVersionWithoutMetadataMatches = findVersionWithoutMetadataMatches;
exports.getUnlinkedBytecode = getUnlinkedBytecode;
exports.getErrors = getErrors;
exports.isUpgradeSafe = isUpgradeSafe;
exports.inferUUPS = inferUUPS;
exports.inferProxyKind = inferProxyKind;
exports.inferInitializable = inferInitializable;
const version_1 = require("../version");
const run_1 = require("./run");
const link_refs_1 = require("../link-refs");
const overrides_1 = require("./overrides");
const error_1 = require("./error");
const data_1 = require("./data");
const upgradeToSignature = 'upgradeTo(address)';
const upgradeToAndCallSignature = 'upgradeToAndCall(address,bytes)';
function assertUpgradeSafe(data, version, opts) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    const [fullContractName] = getContractNameAndRunValidation(dataV3, version);
    const errors = getErrors(dataV3, version, opts);
    if (errors.length > 0) {
        throw new error_1.ValidationErrors(fullContractName, errors);
    }
}
/**
 * Gets the contract version object from the given validation run data and contract name (either fully qualified or simple contract name).
 *
 * @param runData The validation run data
 * @param contractName Fully qualified or simple contract name
 * @returns contract version object
 * @throws {Error} if the given contract name is not found or is ambiguous
 */
function getContractVersion(runData, contractName) {
    let version = undefined;
    if (contractName.includes(':')) {
        version = runData[contractName].version;
    }
    else {
        const foundNames = Object.keys(runData).filter(element => element.endsWith(`:${contractName}`));
        if (foundNames.length > 1) {
            throw new Error(`Contract ${contractName} is ambiguous. Use one of the following:\n${foundNames.join('\n')}`);
        }
        else if (foundNames.length === 1) {
            version = runData[foundNames[0]].version;
        }
    }
    if (version === undefined) {
        throw new Error(`Contract ${contractName} is abstract`);
    }
    return version;
}
/**
 * Gets the fully qualified contract name and validation run data.
 *
 * @param data The validation data
 * @param version The contract Version
 * @returns fully qualified contract name and validation run data
 */
function getContractNameAndRunValidation(data, version) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    let runValidation;
    let fullContractName;
    for (const validation of dataV3.log) {
        fullContractName = Object.keys(validation).find(name => validation[name].version?.withMetadata === version.withMetadata);
        if (fullContractName !== undefined) {
            runValidation = validation;
            break;
        }
    }
    if (fullContractName === undefined || runValidation === undefined) {
        throw new error_1.ContractSourceNotFoundError();
    }
    return [fullContractName, runValidation];
}
function getStorageLayout(data, version) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    const [fullContractName, runValidation] = getContractNameAndRunValidation(dataV3, version);
    return unfoldStorageLayout(runValidation, fullContractName);
}
function unfoldStorageLayout(runData, fullContractName) {
    const c = runData[fullContractName];
    const { solcVersion } = c;
    if (c.layout.flat) {
        return {
            solcVersion,
            storage: c.layout.storage,
            types: c.layout.types,
            namespaces: c.layout.namespaces,
        };
    }
    else {
        // Namespaces are pre-flattened
        const layout = { solcVersion, storage: [], types: {}, namespaces: c.layout.namespaces };
        for (const name of [fullContractName].concat(c.inherit)) {
            layout.storage.unshift(...runData[name].layout.storage);
            Object.assign(layout.types, runData[name].layout.types);
        }
        return layout;
    }
}
function* findVersionWithoutMetadataMatches(data, versionWithoutMetadata) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    for (const validation of dataV3.log) {
        for (const contractName in validation) {
            if (validation[contractName].version?.withoutMetadata === versionWithoutMetadata) {
                yield [contractName, validation];
            }
        }
    }
}
function getUnlinkedBytecode(data, bytecode) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    for (const validation of dataV3.log) {
        const linkableContracts = Object.keys(validation).filter(name => validation[name].linkReferences.length > 0);
        for (const name of linkableContracts) {
            const { linkReferences } = validation[name];
            const unlinkedBytecode = (0, link_refs_1.unlinkBytecode)(bytecode, linkReferences);
            const version = (0, version_1.getVersion)(unlinkedBytecode);
            if (validation[name].version?.withMetadata === version.withMetadata) {
                return unlinkedBytecode;
            }
        }
    }
    return bytecode;
}
function getErrors(data, version, opts = {}) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    const [fullContractName, runValidation] = getContractNameAndRunValidation(dataV3, version);
    const c = runValidation[fullContractName];
    const errors = getAllErrors(runValidation, fullContractName);
    const selfAndInheritedMethods = getAllMethods(runValidation, fullContractName);
    if (!selfAndInheritedMethods.includes(upgradeToSignature) &&
        !selfAndInheritedMethods.includes(upgradeToAndCallSignature)) {
        errors.push({
            src: c.src,
            kind: 'missing-public-upgradeto',
        });
    }
    return (0, overrides_1.processExceptions)(fullContractName, errors, opts);
}
function getAllErrors(runValidation, fullContractName) {
    // add self's opcode errors only, since opcode errors already include parents
    const opcodeErrors = runValidation[fullContractName].errors.filter(error => (0, run_1.isOpcodeError)(error));
    // add other errors from self and inherited contracts
    const otherErrors = getUsedContracts(fullContractName, runValidation)
        .flatMap(name => runValidation[name].errors)
        .filter(error => !(0, run_1.isOpcodeError)(error));
    return [...opcodeErrors, ...otherErrors];
}
function getAllMethods(runValidation, fullContractName) {
    const c = runValidation[fullContractName];
    return c.methods.concat(...c.inherit.map(name => runValidation[name].methods));
}
function getUsedContracts(contractName, runValidation) {
    const c = runValidation[contractName];
    // Add current contract and all of its parents
    const res = new Set([contractName, ...c.inherit]);
    return Array.from(res);
}
function isUpgradeSafe(data, version) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    return getErrors(dataV3, version).length == 0;
}
function inferUUPS(runValidation, fullContractName) {
    const methods = getAllMethods(runValidation, fullContractName);
    return methods.includes(upgradeToSignature) || methods.includes(upgradeToAndCallSignature);
}
function inferProxyKind(data, version) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    const [fullContractName, runValidation] = getContractNameAndRunValidation(dataV3, version);
    if (inferUUPS(runValidation, fullContractName)) {
        return 'uups';
    }
    else {
        return 'transparent';
    }
}
/**
 * Whether the contract inherits any contract named "Initializable"
 * @param contractValidation The validation result for the contract
 * @return true if the contract inheritss any contract whose fully qualified name ends with ":Initializable"
 */
function inferInitializable(contractValidation) {
    return contractValidation.inherit.some(c => c.endsWith(':Initializable'));
}
//# sourceMappingURL=query.js.map