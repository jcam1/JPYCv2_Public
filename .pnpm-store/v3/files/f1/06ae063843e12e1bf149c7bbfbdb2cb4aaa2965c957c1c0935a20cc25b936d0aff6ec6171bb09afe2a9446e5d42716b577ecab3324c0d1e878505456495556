"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateLegacyProject = migrateLegacyProject;
exports.migrateManifestFiles = migrateManifestFiles;
exports.deleteLegacyFiles = deleteLegacyFiles;
exports.migrateManifestsData = migrateManifestsData;
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const compare_versions_1 = require("compare-versions");
const OPEN_ZEPPELIN_FOLDER = '.openzeppelin';
const EXPORT_FILE = 'openzeppelin-cli-export.json';
const PROJECT_FILE = path_1.default.join(OPEN_ZEPPELIN_FOLDER, 'project.json');
const SUCCESS_CHECK = chalk_1.default.green('✔') + ' ';
async function migrateLegacyProject() {
    const manifestFiles = await getManifestFiles();
    const networksExportData = await migrateManifestFiles(manifestFiles);
    const { compiler } = await getProjectFile();
    const exportData = {
        networks: networksExportData,
        compiler,
    };
    await writeJSONFile(EXPORT_FILE, exportData);
    console.log(SUCCESS_CHECK + `Migration data exported to ${EXPORT_FILE}`);
    await deleteLegacyFiles(manifestFiles);
    console.log("\nThese were your project's compiler options:");
    console.log(JSON.stringify(compiler, null, 2));
}
async function migrateManifestFiles(manifestFiles) {
    const migratableManifestFiles = manifestFiles.filter(manifest => !isDevelopmentNetwork(getNetworkName(manifest)));
    const migratableManifestsData = {};
    for (const migratableFile of migratableManifestFiles) {
        const network = getNetworkName(migratableFile);
        migratableManifestsData[network] = JSON.parse(await fs_1.promises.readFile(migratableFile, 'utf8'));
    }
    // we run the entire data migration before writing anything to disk
    const { newManifestsData, networksExportData } = migrateManifestsData(migratableManifestsData);
    for (const network in newManifestsData) {
        const newManifestData = newManifestsData[network];
        const newFilename = getNewManifestLocation(network);
        await writeJSONFile(newFilename, newManifestData);
        console.log(SUCCESS_CHECK + `Successfully migrated ${newFilename}`);
    }
    return networksExportData;
}
async function deleteLegacyFiles(manifestFiles) {
    const developmentManifests = manifestFiles.filter(manifestFile => isDevelopmentNetwork(getNetworkName(manifestFile)));
    for (const manifestFile of developmentManifests) {
        console.log(SUCCESS_CHECK + `Deleting unused development manifest ${manifestFile}`);
        await fs_1.promises.unlink(manifestFile);
    }
    console.log(SUCCESS_CHECK + `Deleting ${PROJECT_FILE}`);
    await fs_1.promises.unlink(PROJECT_FILE);
}
function migrateManifestsData(manifestsData) {
    const networksExportData = {};
    const newManifestsData = {};
    for (const network of Object.keys(manifestsData)) {
        const oldManifestData = manifestsData[network];
        const { manifestVersion, zosversion } = oldManifestData;
        const currentVersion = manifestVersion ?? zosversion;
        if (currentVersion === undefined) {
            throw new Error('Migration failed: manifest version too old. Update your OpenZeppelin CLI version.');
        }
        if ((0, compare_versions_1.compare)(currentVersion, '3.0', '>=')) {
            // no need to migrate
            continue;
        }
        if (currentVersion !== '2.2') {
            throw new Error(`Migration failed: expected manifest version 2.2, got ${currentVersion} instead. Update your OpenZeppelin CLI version.`);
        }
        newManifestsData[network] = updateManifestData(oldManifestData);
        networksExportData[network] = getExportData(oldManifestData);
    }
    return {
        newManifestsData,
        networksExportData,
    };
}
async function getManifestFiles() {
    const files = await fs_1.promises.readdir(OPEN_ZEPPELIN_FOLDER);
    return files.filter(isManifestFile).map(location => path_1.default.join(OPEN_ZEPPELIN_FOLDER, location));
}
async function getProjectFile() {
    return JSON.parse(await fs_1.promises.readFile(PROJECT_FILE, 'utf8'));
}
function isManifestFile(filename) {
    const network = getNetworkName(filename);
    return isPublicNetwork(network) || isDevelopmentNetwork(network) || isUnknownNetwork(network);
}
function getNetworkName(filename) {
    return path_1.default.basename(filename, '.json');
}
function isDevelopmentNetwork(network) {
    // 13+ digits      => ganache timestamp
    // 31337           => hardhat network
    return /^dev-(31337|\d{13,})$/.test(network);
}
function isUnknownNetwork(network) {
    return !isDevelopmentNetwork(network) && /^dev-\d+$/.test(network);
}
function isPublicNetwork(network) {
    return ['mainnet', 'rinkeby', 'ropsten', 'kovan', 'goerli'].includes(network);
}
function getNewManifestLocation(oldName) {
    const filename = isUnknownNetwork(oldName) ? oldName.replace('dev', 'unknown') : oldName;
    return path_1.default.join(OPEN_ZEPPELIN_FOLDER, `${filename}.json`);
}
async function writeJSONFile(location, data) {
    await fs_1.promises.writeFile(location, JSON.stringify(data, null, 2));
}
function getExportData(oldManifestData) {
    const networksExportData = Object.assign({}, oldManifestData);
    delete networksExportData.proxyAdmin;
    delete networksExportData.contracts;
    delete networksExportData.solidityLibs;
    delete networksExportData.manifestVersion;
    delete networksExportData.zosversion;
    delete networksExportData.version;
    delete networksExportData.frozen;
    return networksExportData;
}
function updateManifestData(oldManifestData) {
    const proxyAdmin = oldManifestData.proxyAdmin.address;
    if (proxyAdmin === undefined) {
        throw new Error('Legacy manifest does not have admin address');
    }
    if (Object.keys(oldManifestData.solidityLibs).length > 0) {
        throw new Error('Legacy manifest links to external libraries which are not yet supported');
    }
    return {
        manifestVersion: '3.2',
        impls: transformImplementations(oldManifestData.contracts),
        proxies: [...transformProxies(oldManifestData.proxies)],
        admin: {
            address: proxyAdmin,
        },
    };
}
function* transformProxies(proxies) {
    for (const contractName in proxies) {
        for (const proxy of proxies[contractName]) {
            switch (proxy.kind) {
                case 'Upgradeable':
                    if (proxy.address) {
                        yield {
                            address: proxy.address,
                            kind: 'transparent',
                        };
                    }
                    break;
                case 'Minimal':
                case 'NonProxy':
                    // not supported by the new plugin
                    break;
            }
        }
    }
}
function transformImplementations(contracts) {
    const impls = {};
    for (const contractName in contracts) {
        const contract = contracts[contractName];
        if (contract.deployedBytecodeHash === undefined) {
            continue;
        }
        else {
            impls[contract.deployedBytecodeHash] = transformImplementationItem(contract);
        }
    }
    return impls;
}
function transformImplementationItem(contract) {
    if (contract.address === undefined) {
        throw new Error('Could not find implementation address');
    }
    return {
        address: contract.address,
        layout: transformLayout(contract),
    };
}
function transformLayout(contract) {
    const { types, storage } = contract;
    if (types === undefined || storage === undefined) {
        throw new Error("Storage layout can't be undefined");
    }
    // We need to associate a made up astId to some types since the OpenZeppelin CLI used to drop them
    const astIds = Object.keys(types);
    const getAstId = (typeName) => {
        const astId = astIds.indexOf(typeName);
        if (astId === -1) {
            throw new Error(`Could not find type ${typeName}`);
        }
        return astId;
    };
    return {
        storage: storage.map((storageItem) => transformStorageItem(storageItem, getAstId)),
        types: transformTypes(types, getAstId),
    };
}
function transformStorageItem(storageItem, getAstId) {
    return {
        contract: storageItem.contract,
        label: storageItem.label,
        type: transformTypeName(storageItem.type, getAstId),
        // TODO reconstruct path and line if sourcecode is available
        src: storageItem.path,
    };
}
function transformTypes(oldTypes, getAstId) {
    const newTypes = {};
    for (const typeName in oldTypes) {
        newTypes[transformTypeName(typeName, getAstId)] = transformType(getTypeKind(typeName), oldTypes[typeName], getAstId);
    }
    return newTypes;
}
function transformType(typeKind, oldType, getAstId) {
    switch (typeKind) {
        case 'Struct':
            return {
                label: stripContractName(oldType.label),
                members: oldType.members.map(member => ({
                    label: stripContractName(member.label),
                    type: transformTypeName(member.type, getAstId),
                })),
            };
        case 'Enum':
            return {
                label: stripContractName(oldType.label),
                members: oldType.members,
            };
        default:
            return {
                label: stripContractName(oldType.label),
            };
    }
}
function transformTypeName(typeName, getAstId) {
    switch (getTypeKind(typeName)) {
        case 'Struct':
            return transformStructTypeName(typeName, getAstId);
        case 'Enum':
            return transformEnumTypeName(typeName, getAstId);
        case 'Mapping':
            return transformMappingTypeName(typeName, getAstId);
        case 'DynArray':
            return transformDynArrayTypeName(typeName, getAstId);
        case 'StaticArray':
            return transformStaticArrayTypeName(typeName, getAstId);
        case 'Elementary':
            return typeName;
        default:
            throw new Error(`Unknown type: ${typeName}`);
    }
}
function transformStructTypeName(typeName, getAstId) {
    const name = stripContractName(getArgument(typeName));
    const astId = getAstId(typeName);
    return `t_struct(${name})${astId}_storage`;
}
function transformEnumTypeName(typeName, getAstId) {
    const name = stripContractName(getArgument(typeName));
    const astId = getAstId(typeName);
    return `t_enum(${name})${astId}`;
}
function transformMappingTypeName(typeName, getAstId) {
    const valueType = transformTypeName(getArgument(typeName), getAstId);
    return `t_mapping(unknown,${valueType})`;
}
function transformDynArrayTypeName(typeName, getAstId) {
    const valueType = transformTypeName(getArgument(typeName), getAstId);
    return `t_array(${valueType})dyn_storage`;
}
function transformStaticArrayTypeName(typeName, getAstId) {
    // here we assume the regex has been already validated
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const size = typeName.match(/:(\d+)/)[1];
    const valueType = transformTypeName(getArgument(typeName), getAstId);
    return `t_array(${valueType})${size}_storage`;
}
function getArgument(typeName) {
    // here we assume the regex has been already validated
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return typeName.match(/<(.+)>/)[1];
}
function stripContractName(s) {
    // regex always matches
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return s.match(/(.+\.)?(.+)/)[2];
}
function getTypeKind(typeName) {
    if (/^t_struct<.+>/.test(typeName)) {
        return 'Struct';
    }
    else if (/^t_enum<.+>/.test(typeName)) {
        return 'Enum';
    }
    else if (/^t_mapping<.+>/.test(typeName)) {
        return 'Mapping';
    }
    else if (/^t_array:dyn<.+>/.test(typeName)) {
        return 'DynArray';
    }
    else if (/^t_array:\d+<.+>/.test(typeName)) {
        return 'StaticArray';
    }
    else {
        return 'Elementary';
    }
}
var ProxyType;
(function (ProxyType) {
    ProxyType["Upgradeable"] = "Upgradeable";
    ProxyType["Minimal"] = "Minimal";
    ProxyType["NonProxy"] = "NonProxy";
})(ProxyType || (ProxyType = {}));
//# sourceMappingURL=migrate-oz-cli-project.js.map