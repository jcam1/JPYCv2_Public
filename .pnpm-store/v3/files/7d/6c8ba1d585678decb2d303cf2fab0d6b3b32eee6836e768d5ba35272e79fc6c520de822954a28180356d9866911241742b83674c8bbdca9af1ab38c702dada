"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("solidity-ast/utils");
const hardhat_1 = require("hardhat");
const extract_1 = require("../storage/extract");
const compare_1 = require("./compare");
const layout_1 = require("./layout");
const test = ava_1.default;
const dummyDecodeSrc = () => 'file.sol:1';
test.before(async (t) => {
    const buildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/Storage.sol:Storage1');
    if (buildInfo === undefined) {
        throw new Error('Build info not found');
    }
    const solcOutput = buildInfo.output;
    const contracts = {};
    for (const def of (0, utils_1.findAll)('ContractDefinition', solcOutput.sources['contracts/test/Storage.sol'].ast)) {
        contracts[def.name] = def;
    }
    const deref = (0, utils_1.astDereferencer)(solcOutput);
    t.context.extractStorageLayout = name => (0, extract_1.extractStorageLayout)(contracts[name], dummyDecodeSrc, deref);
});
function getReport(original, updated) {
    const originalDetailed = (0, layout_1.getDetailedLayout)(original);
    const updatedDetailed = (0, layout_1.getDetailedLayout)(updated);
    const comparator = new compare_1.StorageLayoutComparator();
    return comparator.compareLayouts(originalDetailed, updatedDetailed);
}
test('structs', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Struct_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Struct_V2_Bad');
    const report = getReport(v1, v2);
    t.snapshot(report.explain());
});
test('enums', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Enum_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Enum_V2_Bad');
    const report = getReport(v1, v2);
    t.snapshot(report.explain());
});
test('obvious mismatch', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_ObviousMismatch_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_ObviousMismatch_V2_Bad');
    const report = getReport(v1, v2);
    t.snapshot(report.explain());
});
test('function visibility change', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_FunctionType_Visibility_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_FunctionType_Visibility_V2_Bad');
    const report = getReport(v1, v2);
    t.snapshot(report.explain());
});
test('array', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Array_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Array_V2_Bad');
    const report = getReport(v1, v2);
    t.snapshot(report.explain());
});
test('mapping', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Mapping_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Mapping_V2_Bad');
    const report = getReport(v1, v2);
    t.snapshot(report.explain());
});
test('mapping enum key', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_MappingEnumKey_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_MappingEnumKey_V2_Bad');
    const report = getReport(v1, v2);
    t.snapshot(report.explain());
});
test('rename', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Rename_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Rename_V2');
    const report = getReport(v1, v2);
    t.snapshot(report.explain());
});
test('replace', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Replace_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Replace_V2');
    const report = getReport(v1, v2);
    t.snapshot(report.explain());
});
//# sourceMappingURL=report.test.js.map