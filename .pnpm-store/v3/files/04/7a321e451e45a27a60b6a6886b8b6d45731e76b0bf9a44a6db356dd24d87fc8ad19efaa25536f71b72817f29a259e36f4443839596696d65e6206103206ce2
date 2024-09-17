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
    const buildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/NamespacedConflicts.sol:DuplicateNamespace');
    if (buildInfo === undefined) {
        throw new Error('Build info not found');
    }
    const solcOutput = buildInfo.output;
    const contracts = {};
    const storageLayouts = {};
    for (const def of (0, utils_1.findAll)('ContractDefinition', solcOutput.sources['contracts/test/NamespacedConflicts.sol'].ast)) {
        contracts[def.name] = def;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        storageLayouts[def.name] = solcOutput.contracts['contracts/test/NamespacedConflicts.sol'][def.name].storageLayout;
    }
    const deref = (0, utils_1.astDereferencer)(solcOutput);
    const decodeSrc = (0, src_decoder_1.solcInputOutputDecoder)(buildInfo.input, solcOutput);
    t.context.extractStorageLayout = name => (0, extract_1.extractStorageLayout)(contracts[name], decodeSrc, deref, storageLayouts[name]);
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
//# sourceMappingURL=storage-namespaced-conflicts.test.js.map