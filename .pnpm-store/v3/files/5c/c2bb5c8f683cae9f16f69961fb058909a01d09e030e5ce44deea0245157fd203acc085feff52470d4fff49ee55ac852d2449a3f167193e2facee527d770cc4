"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("solidity-ast/utils");
const hardhat_1 = require("hardhat");
const extract_1 = require("./extract");
const compare_1 = require("./compare");
const layout_1 = require("./layout");
const test = ava_1.default;
const dummyDecodeSrc = () => 'file.sol:1';
const testContracts = [
    'contracts/test/Storage.sol:StorageUpgrade_Gap_V1',
    'contracts/test/Storage.sol:StorageUpgrade_Gap_V2_Ok',
    'contracts/test/Storage.sol:StorageUpgrade_Gap_V2_Bad1',
    'contracts/test/Storage.sol:StorageUpgrade_Gap_V2_Bad2',
    'contracts/test/Storage.sol:StorageUpgrade_Gap_V2_Bad3',
    'contracts/test/Storage.sol:StorageUpgrade_Gap_V2_Bad4',
    'contracts/test/Storage.sol:StorageUpgrade_Gap_V2_Bad5',
    'contracts/test/Storage.sol:StorageUpgrade_MultiConsumeGap_V1',
    'contracts/test/Storage.sol:StorageUpgrade_MultiConsumeGap_V2_Ok',
    'contracts/test/Storage.sol:StorageUpgrade_CustomGap_V1',
    'contracts/test/Storage.sol:StorageUpgrade_CustomGap_V2_Ok',
    'contracts/test/Storage.sol:StorageUpgrade_CustomGap_V2_Bad',
    'contracts/test/Storage.sol:StorageUpgrade_CustomGap_V2_Bad2',
    'contracts/test/Storage.sol:StorageUpgrade_CustomGap_V2_Ok_Switched_Gaps',
    'contracts/test/Storage.sol:StorageUpgrade_CustomGap_V2_Bad_Switched_Gaps',
    'contracts/test/Storage.sol:StorageUpgrade_CustomGap_V2_Bad_Changed_Gap_Name',
    'contracts/test/Storage.sol:StorageUpgrade_ConsumeAndAddGap_V1',
    'contracts/test/Storage.sol:StorageUpgrade_ConsumeAndAddGap_V2',
    'contracts/test/Storage.sol:StorageUpgrade_ConsumeAndAddGap_V3',
    'contracts/test/Storage.sol:StorageUpgrade_ConsumeAndAddGap_V3b',
    'contracts/test/Storage.sol:StorageUpgrade_ConsumeAndAddGap_Storage_V1',
    'contracts/test/Storage.sol:StorageUpgrade_ConsumeAndAddGap_Storage_V2',
];
test.before(async (t) => {
    const contracts = {};
    const deref = {};
    const storageLayout = {};
    for (const contract of testContracts) {
        const buildInfo = await hardhat_1.artifacts.getBuildInfo(contract);
        if (buildInfo === undefined) {
            throw new Error(`Build info not found for contract ${contract}`);
        }
        const solcOutput = buildInfo.output;
        for (const def of (0, utils_1.findAll)('ContractDefinition', solcOutput.sources['contracts/test/Storage.sol'].ast)) {
            contracts[def.name] = def;
            deref[def.name] = (0, utils_1.astDereferencer)(solcOutput);
            storageLayout[def.name] = solcOutput.contracts['contracts/test/Storage.sol'][def.name].storageLayout;
        }
    }
    t.context.extractStorageLayout = name => (0, extract_1.extractStorageLayout)(contracts[name], dummyDecodeSrc, deref[name], storageLayout[name]);
});
function getReport(original, updated) {
    const originalDetailed = (0, layout_1.getDetailedLayout)(original);
    const updatedDetailed = (0, layout_1.getDetailedLayout)(updated);
    const comparator = new compare_1.StorageLayoutComparator();
    return comparator.compareLayouts(originalDetailed, updatedDetailed);
}
test('shrinkgap', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Gap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Gap_V2_Ok');
    const report = getReport(v1, v2);
    t.true(report.ok);
    t.is(report.explain(), '');
});
test('finishgap', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_MultiConsumeGap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_MultiConsumeGap_V2_Ok');
    const report = getReport(v1, v2);
    t.true(report.ok);
    t.is(report.explain(), '');
});
test('insert var without shrink gap', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Gap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Gap_V2_Bad1');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('delete var and expand gap', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Gap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Gap_V2_Bad2');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('shrink gap without adding var', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Gap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Gap_V2_Bad3');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('insert var and shrink gap too much', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Gap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Gap_V2_Bad4');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('insert vars and shrink gap not enough', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Gap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Gap_V2_Bad5');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('insert vars without shrink gap (uint128)', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Uint128Gap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Uint128Gap_V2_Bad');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('custom gap - shrinkgap', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V2_Ok');
    const report = getReport(v1, v2);
    t.true(report.ok);
    t.is(report.explain(), '');
});
test('custom gap - insert var, did not shrink gaps', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V2_Bad');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('custom gap - insert var, shrank only first gap', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V2_Bad2');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('custom gap - switched gaps', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V2_Ok_Switched_Gaps');
    const report = getReport(v1, v2);
    t.true(report.ok);
    t.is(report.explain(), '');
});
test('custom gap - insert var, did not shrink gaps, switched gaps', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V2_Bad_Switched_Gaps');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('custom gap - insert var, did not shrink gaps, changed first gap name', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_CustomGap_V2_Bad_Changed_Gap_Name');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('consume entire gap and add new gap of different size', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_ConsumeAndAddGap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_ConsumeAndAddGap_V2');
    const v3 = t.context.extractStorageLayout('StorageUpgrade_ConsumeAndAddGap_V3');
    t.true(getReport(v1, v2).ok);
    t.true(getReport(v2, v3).ok);
    t.true(getReport(v1, v3).ok);
});
test('consume entire gap and add new gap of same size', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_ConsumeAndAddGap_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_ConsumeAndAddGap_V2');
    const v3b = t.context.extractStorageLayout('StorageUpgrade_ConsumeAndAddGap_V3b');
    t.true(getReport(v2, v3b).ok);
    t.true(getReport(v1, v3b).ok);
});
test('consume partial gap and add new gap, storage contract pattern', t => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_ConsumeAndAddGap_Storage_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_ConsumeAndAddGap_Storage_V2');
    t.true(getReport(v1, v2).ok);
});
//# sourceMappingURL=report-gap.test.js.map