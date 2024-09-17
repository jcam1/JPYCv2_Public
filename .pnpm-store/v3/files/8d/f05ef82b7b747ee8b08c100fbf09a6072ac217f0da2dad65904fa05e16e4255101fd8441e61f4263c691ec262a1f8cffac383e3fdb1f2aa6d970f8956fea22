"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("solidity-ast/utils");
const hardhat_1 = require("hardhat");
const storage_1 = require("./storage");
const extract_1 = require("./storage/extract");
const src_decoder_1 = require("./src-decoder");
const test = ava_1.default;
test.before(async (t) => {
    const origBuildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/NamespacedUDVT.sol:NamespacedUDVT');
    const namespacedBuildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/NamespacedUDVTLayout.sol:NamespacedUDVT');
    if (origBuildInfo === undefined || namespacedBuildInfo === undefined) {
        throw new Error('Build info not found');
    }
    const origSolcOutput = origBuildInfo.output;
    const origContracts = {};
    const origStorageLayouts = {};
    const namespacedSolcOutput = namespacedBuildInfo.output;
    const namespacedContracts = {};
    const namespacedStorageLayouts = {};
    const origContractDefs = [];
    for (const def of (0, utils_1.findAll)('ContractDefinition', origSolcOutput.sources['contracts/test/NamespacedUDVT.sol'].ast)) {
        origContractDefs.push(def);
    }
    const namespacedContractDefs = [];
    for (const def of (0, utils_1.findAll)('ContractDefinition', namespacedSolcOutput.sources['contracts/test/NamespacedUDVTLayout.sol'].ast)) {
        namespacedContractDefs.push(def);
    }
    for (let i = 0; i < origContractDefs.length; i++) {
        const origContractDef = origContractDefs[i];
        const namespacedContractDef = namespacedContractDefs[i];
        origContracts[origContractDef.name] = origContractDef;
        namespacedContracts[namespacedContractDef.name] = namespacedContractDef;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        origStorageLayouts[origContractDef.name] =
            origSolcOutput.contracts['contracts/test/NamespacedUDVT.sol'][origContractDef.name].storageLayout;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        namespacedStorageLayouts[namespacedContractDef.name] =
            namespacedSolcOutput.contracts['contracts/test/NamespacedUDVTLayout.sol'][namespacedContractDef.name].storageLayout;
    }
    const origDeref = (0, utils_1.astDereferencer)(origSolcOutput);
    const namespacedDeref = (0, utils_1.astDereferencer)(namespacedSolcOutput);
    const decodeSrc = (0, src_decoder_1.solcInputOutputDecoder)(origBuildInfo.input, origSolcOutput);
    t.context.extractStorageLayout = (name, layoutInfo) => (0, extract_1.extractStorageLayout)(origContracts[name], decodeSrc, origDeref, origStorageLayouts[name], layoutInfo
        ? {
            deref: namespacedDeref,
            contractDef: namespacedContracts[name],
            storageLayout: namespacedStorageLayouts[name],
        }
        : undefined);
});
test('user defined value types - layout info', async (t) => {
    const v1 = t.context.extractStorageLayout('NamespacedUDVT', true);
    const v2 = t.context.extractStorageLayout('NamespacedUDVT_V2_Ok', true);
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.deepEqual(comparison, []);
});
test('user defined value types - no layout info', async (t) => {
    const v1 = t.context.extractStorageLayout('NamespacedUDVT', false);
    const v2 = t.context.extractStorageLayout('NamespacedUDVT_V2_Ok', false);
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.deepEqual(comparison, []);
});
test('user defined value types - layout info - bad underlying type', async (t) => {
    const v1 = t.context.extractStorageLayout('NamespacedUDVT', true);
    const v2 = t.context.extractStorageLayout('NamespacedUDVT_V2_Resize', true);
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.like(comparison, {
        length: 1,
        0: {
            kind: 'typechange',
            change: {
                kind: 'type resize',
            },
            original: { label: 'my_user_value' },
            updated: { label: 'my_user_value' },
        },
    });
});
test('user defined value types - no layout info - bad underlying type', async (t) => {
    const v1 = t.context.extractStorageLayout('NamespacedUDVT', false);
    const v2 = t.context.extractStorageLayout('NamespacedUDVT_V2_Resize', false);
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.like(comparison, {
        length: 1,
        0: {
            kind: 'typechange',
            change: {
                kind: 'unknown',
            },
            original: { label: 'my_user_value' },
            updated: { label: 'my_user_value' },
        },
    });
});
test('mapping with user defined value type key - ok', t => {
    const v1 = t.context.extractStorageLayout('NamespacedUDVT_MappingKey_V1', true);
    const v2 = t.context.extractStorageLayout('NamespacedUDVT_MappingKey_V2_Ok', true);
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.deepEqual(comparison, []);
});
test('mapping with user defined value type key - bad', t => {
    const v1 = t.context.extractStorageLayout('NamespacedUDVT_MappingKey_V1', true);
    const v2 = t.context.extractStorageLayout('NamespacedUDVT_MappingKey_V2_Bad', true);
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.like(comparison, {
        length: 2,
        0: {
            kind: 'typechange',
            change: {
                kind: 'mapping key',
            },
            original: { label: 'm1' },
            updated: { label: 'm1' },
        },
        1: {
            kind: 'typechange',
            change: {
                kind: 'mapping key',
            },
            original: { label: 'm2' },
            updated: { label: 'm2' },
        },
    });
});
//# sourceMappingURL=storage-namespaced-udvt.test.js.map