"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("solidity-ast/utils");
const hardhat_1 = require("hardhat");
const extract_1 = require("./storage/extract");
const src_decoder_1 = require("./src-decoder");
const test = ava_1.default;
test.before(async (t) => {
    const origBuildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/NamespacedConflicts.sol:DuplicateNamespace');
    const namespacedBuildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/NamespacedConflictsLayout.sol:DuplicateNamespace');
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
    for (const def of (0, utils_1.findAll)('ContractDefinition', origSolcOutput.sources['contracts/test/NamespacedConflicts.sol'].ast)) {
        origContractDefs.push(def);
    }
    const namespacedContractDefs = [];
    for (const def of (0, utils_1.findAll)('ContractDefinition', namespacedSolcOutput.sources['contracts/test/NamespacedConflictsLayout.sol'].ast)) {
        namespacedContractDefs.push(def);
    }
    for (let i = 0; i < origContractDefs.length; i++) {
        const origContractDef = origContractDefs[i];
        const namespacedContractDef = namespacedContractDefs[i];
        origContracts[origContractDef.name] = origContractDef;
        namespacedContracts[namespacedContractDef.name] = namespacedContractDef;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        origStorageLayouts[origContractDef.name] =
            origSolcOutput.contracts['contracts/test/NamespacedConflicts.sol'][origContractDef.name].storageLayout;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        namespacedStorageLayouts[namespacedContractDef.name] =
            namespacedSolcOutput.contracts['contracts/test/NamespacedConflictsLayout.sol'][namespacedContractDef.name].storageLayout;
    }
    const origDeref = (0, utils_1.astDereferencer)(origSolcOutput);
    const namespacedDeref = (0, utils_1.astDereferencer)(namespacedSolcOutput);
    const decodeSrc = (0, src_decoder_1.solcInputOutputDecoder)(origBuildInfo.input, origSolcOutput);
    t.context.extractStorageLayout = name => (0, extract_1.extractStorageLayout)(origContracts[name], decodeSrc, origDeref, origStorageLayouts[name], {
        deref: namespacedDeref,
        contractDef: namespacedContracts[name],
        storageLayout: namespacedStorageLayouts[name],
    });
});
test('duplicate namespace', t => {
    const error = t.throws(() => t.context.extractStorageLayout('DuplicateNamespace'));
    t.snapshot(error?.message);
});
test('inherits duplicate', t => {
    const error = t.throws(() => t.context.extractStorageLayout('InheritsDuplicate'));
    t.snapshot(error?.message);
});
test('conflicts with parent', t => {
    const error = t.throws(() => t.context.extractStorageLayout('ConflictsWithParent'));
    t.snapshot(error?.message);
});
test('conflicts in both parents', t => {
    const error = t.throws(() => t.context.extractStorageLayout('ConflictsInBothParents'));
    t.snapshot(error?.message);
});
//# sourceMappingURL=storage-namespaced-conflicts-layout.test.js.map