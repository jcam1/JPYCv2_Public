"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("solidity-ast/utils");
const hardhat_1 = require("hardhat");
const extract_1 = require("./storage/extract");
const stabilize_layout_1 = require("./utils/stabilize-layout");
const src_decoder_1 = require("./src-decoder");
const test = ava_1.default;
test.before(async (t) => {
    // Tests extracting the storage layout (to include slot and offset) using Namespaced.sol's Example as the original contract,
    // and NamespacedLayout.sol's Example as the modified contract with the storage layout.
    const origBuildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/Namespaced.sol:Example');
    const namespacedBuildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/NamespacedLayout.sol:Example');
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
    for (const def of (0, utils_1.findAll)('ContractDefinition', origSolcOutput.sources['contracts/test/Namespaced.sol'].ast)) {
        origContractDefs.push(def);
    }
    const namespacedContractDefs = [];
    for (const def of (0, utils_1.findAll)('ContractDefinition', namespacedSolcOutput.sources['contracts/test/NamespacedLayout.sol'].ast)) {
        namespacedContractDefs.push(def);
    }
    // Expects the first contract in Namespaced.sol and NamespacedLayout.sol to be 'Example'
    const origContractDef = origContractDefs[0];
    const namespacedContractDef = namespacedContractDefs[0];
    origContracts[origContractDef.name] = origContractDef;
    namespacedContracts[namespacedContractDef.name] = namespacedContractDef;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    origStorageLayouts[origContractDef.name] =
        origSolcOutput.contracts['contracts/test/Namespaced.sol'][origContractDef.name].storageLayout;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    namespacedStorageLayouts[namespacedContractDef.name] =
        namespacedSolcOutput.contracts['contracts/test/NamespacedLayout.sol'][namespacedContractDef.name].storageLayout;
    const origDeref = (0, utils_1.astDereferencer)(origSolcOutput);
    const namespacedDeref = (0, utils_1.astDereferencer)(namespacedSolcOutput);
    const decodeSrc = (0, src_decoder_1.solcInputOutputDecoder)(origBuildInfo.input, origSolcOutput);
    t.context.extractStorageLayout = name => (0, extract_1.extractStorageLayout)(origContracts[name], decodeSrc, origDeref, origStorageLayouts[name], {
        deref: namespacedDeref,
        contractDef: namespacedContracts[name],
        storageLayout: namespacedStorageLayouts[name],
    });
});
test('layout', t => {
    const layout = t.context.extractStorageLayout('Example');
    t.snapshot((0, stabilize_layout_1.stabilizeStorageLayout)(layout));
});
//# sourceMappingURL=storage-namespaced-layout.test.js.map