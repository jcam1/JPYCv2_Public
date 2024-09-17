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
const _1 = require(".");
const test = ava_1.default;
const dummyDecodeSrc = () => 'file.sol:1';
const testContracts = [
    'contracts/test/RenamedRetyped.sol:RenameV1',
    'contracts/test/RenamedRetyped.sol:RenameV2',
    'contracts/test/RenamedRetyped.sol:RetypeV1',
    'contracts/test/RenamedRetyped.sol:RetypeV2',
    'contracts/test/RenamedRetyped.sol:WronglyReportedRetypeV3',
    'contracts/test/RenamedRetyped.sol:MissmatchingTypeRetypeV4',
    'contracts/test/RenamedRetyped.sol:ConfusingRetypeV1',
    'contracts/test/RenamedRetyped.sol:ConfusingRetypeV2',
    'contracts/test/RenamedRetyped.sol:NonHardcodedRetypeV1',
    'contracts/test/RenamedRetyped.sol:NonHardcodedRetypeV2',
    'contracts/test/RenamedRetyped.sol:LayoutChangeV1',
    'contracts/test/RenamedRetyped.sol:LayoutChangeV2',
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
        for (const def of (0, utils_1.findAll)('ContractDefinition', solcOutput.sources['contracts/test/RenamedRetyped.sol'].ast)) {
            contracts[def.name] = def;
            deref[def.name] = (0, utils_1.astDereferencer)(solcOutput);
            storageLayout[def.name] = solcOutput.contracts['contracts/test/RenamedRetyped.sol'][def.name].storageLayout;
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
test('successful rename', t => {
    const v1 = t.context.extractStorageLayout('RenameV1');
    const v2 = t.context.extractStorageLayout('RenameV2');
    const report = getReport(v1, v2);
    t.true(report.ok);
    t.snapshot(report.explain());
});
test('successful retype', t => {
    const v1 = t.context.extractStorageLayout('RetypeV1');
    const v2 = t.context.extractStorageLayout('RetypeV2');
    const report = getReport(v1, v2);
    t.true(report.ok);
    t.snapshot(report.explain());
});
test('wrongly reported retype', t => {
    const v1 = t.context.extractStorageLayout('RetypeV1');
    const v2 = t.context.extractStorageLayout('WronglyReportedRetypeV3');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('rightly reported retype but incompatible new type', t => {
    const v1 = t.context.extractStorageLayout('RetypeV1');
    const v2 = t.context.extractStorageLayout('MissmatchingTypeRetypeV4');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('confusing bad retype', t => {
    const v1 = t.context.extractStorageLayout('ConfusingRetypeV1');
    const v2 = t.context.extractStorageLayout('ConfusingRetypeV2');
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
test('non-hardcoded retype', t => {
    const v1 = t.context.extractStorageLayout('NonHardcodedRetypeV1');
    const v2 = t.context.extractStorageLayout('NonHardcodedRetypeV2');
    const report = getReport(v1, v2);
    t.true(report.ok);
    t.snapshot(report.explain());
});
test('retype with layout change', t => {
    const v1 = t.context.extractStorageLayout('LayoutChangeV1');
    const v2 = t.context.extractStorageLayout('LayoutChangeV2');
    // ensure both variables' layout changes appear in the internal errors
    t.like((0, _1.getStorageUpgradeErrors)(v1, v2), {
        length: 2,
        0: {
            kind: 'layoutchange',
            original: { label: 'a' },
            updated: { label: 'a' },
        },
        1: {
            kind: 'layoutchange',
            original: { label: 'b' },
            updated: { label: 'b' },
        },
    });
    const report = getReport(v1, v2);
    t.false(report.ok);
    t.snapshot(report.explain());
});
//# sourceMappingURL=report-rename-retype.test.js.map