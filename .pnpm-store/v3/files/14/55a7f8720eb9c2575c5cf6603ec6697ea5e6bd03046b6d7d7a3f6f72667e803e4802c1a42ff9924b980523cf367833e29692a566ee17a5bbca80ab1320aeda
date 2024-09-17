"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_report_1 = require("./project-report");
const validate_1 = require("../../validate");
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("solidity-ast/utils");
const hardhat_1 = require("hardhat");
const extract_1 = require("../../storage/extract");
const compare_1 = require("../../storage/compare");
const layout_1 = require("../../storage/layout");
const contract_report_1 = require("./contract-report");
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
function getLayoutReport(original, updated) {
    const originalDetailed = (0, layout_1.getDetailedLayout)(original);
    const updatedDetailed = (0, layout_1.getDetailedLayout)(updated);
    const comparator = new compare_1.StorageLayoutComparator();
    return comparator.compareLayouts(originalDetailed, updatedDetailed);
}
test('get project report - ok - no upgradeable', async (t) => {
    const report = (0, project_report_1.getProjectReport)([]);
    t.true(report.ok);
    t.is(report.numPassed, 0);
    t.is(report.numTotal, 0);
    t.is(report.explain(), 'No upgradeable contracts detected.');
});
test('get project report - ok - console', async (t) => {
    const report = (0, project_report_1.getProjectReport)([
        new contract_report_1.UpgradeableContractReport('mypath/MyContract.sol:MyContract1', undefined, new validate_1.UpgradeableContractErrorReport([]), undefined),
    ]);
    t.true(report.ok);
    t.is(report.numPassed, 1);
    t.is(report.numTotal, 1);
    t.regex(report.explain(), /SUCCESS \(1 upgradeable contract detected, 1 passed, 0 failed\)/);
});
test('get project report - errors - console', async (t) => {
    const v1 = t.context.extractStorageLayout('StorageUpgrade_Replace_V1');
    const v2 = t.context.extractStorageLayout('StorageUpgrade_Replace_V2');
    const layoutReport = getLayoutReport(v1, v2);
    const report = (0, project_report_1.getProjectReport)([
        new contract_report_1.UpgradeableContractReport('mypath/MyContract.sol:MyContract', undefined, new validate_1.UpgradeableContractErrorReport([
            {
                src: 'MyContract.sol:10',
                kind: 'missing-public-upgradeto',
            },
            {
                src: 'MyContract.sol:20',
                kind: 'delegatecall',
            },
        ]), undefined),
        new contract_report_1.UpgradeableContractReport('MyContract2', 'MyContract', new validate_1.UpgradeableContractErrorReport([]), layoutReport),
    ]);
    t.false(report.ok);
    t.is(report.numPassed, 0);
    t.is(report.numTotal, 2);
    t.snapshot(report.explain());
});
test('get project report - some passed', async (t) => {
    const report = (0, project_report_1.getProjectReport)([
        new contract_report_1.UpgradeableContractReport('mypath/MyContract.sol:MyContract1', undefined, new validate_1.UpgradeableContractErrorReport([
            {
                src: 'MyContract.sol:10',
                kind: 'missing-public-upgradeto',
            },
        ]), undefined),
        new contract_report_1.UpgradeableContractReport('mypath/MyContract.sol:MyContract2', undefined, new validate_1.UpgradeableContractErrorReport([]), undefined),
    ]);
    t.false(report.ok);
    t.is(report.numPassed, 1);
    t.is(report.numTotal, 2);
    t.snapshot(report.explain());
});
//# sourceMappingURL=project-report.test.js.map