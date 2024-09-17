"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const hardhat_1 = require("hardhat");
const solidity_version_json_1 = __importDefault(require("./solidity-version.json"));
const standalone_1 = require("./standalone");
const test = ava_1.default;
test.before(async (t) => {
    const buildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/Standalone.sol:StandaloneV1');
    if (buildInfo === undefined) {
        throw new Error('Build info not found');
    }
    t.context.solcInput = buildInfo.input;
    t.context.solcOutput = buildInfo.output;
});
test('reports unsafe operation', t => {
    const impl = new standalone_1.UpgradeableContract('StandaloneV1', t.context.solcInput, t.context.solcOutput, {}, solidity_version_json_1.default);
    const report = impl.getErrorReport();
    t.false(report.ok);
    t.true(report.errors[0].kind === 'delegatecall');
});
test('reports unsafe operation - fully qualified name', t => {
    const impl = new standalone_1.UpgradeableContract('contracts/test/Standalone.sol:StandaloneV1', t.context.solcInput, t.context.solcOutput, {}, solidity_version_json_1.default);
    const report = impl.getErrorReport();
    t.false(report.ok);
    t.true(report.errors[0].kind === 'delegatecall');
});
test('reports storage upgrade errors', t => {
    const v1 = new standalone_1.UpgradeableContract('StandaloneV1', t.context.solcInput, t.context.solcOutput, {}, solidity_version_json_1.default);
    const v2Good = new standalone_1.UpgradeableContract('StandaloneV2Good', t.context.solcInput, t.context.solcOutput, {}, solidity_version_json_1.default);
    const goodReport = v1.getStorageUpgradeReport(v2Good);
    t.true(goodReport.ok);
    const v2Bad = new standalone_1.UpgradeableContract('StandaloneV2Bad', t.context.solcInput, t.context.solcOutput, {}, solidity_version_json_1.default);
    const badReport = v1.getStorageUpgradeReport(v2Bad);
    t.false(badReport.ok);
});
test('dont report renamed version update', t => {
    const v1 = new standalone_1.UpgradeableContract('StandaloneRenameV1', t.context.solcInput, t.context.solcOutput, {}, solidity_version_json_1.default);
    const v2 = new standalone_1.UpgradeableContract('StandaloneRenameV2', t.context.solcInput, t.context.solcOutput, {}, solidity_version_json_1.default);
    const goodReport = v1.getStorageUpgradeReport(v2);
    t.true(goodReport.ok);
    const v3 = new standalone_1.UpgradeableContract('StandaloneRenameV3', t.context.solcInput, t.context.solcOutput, {}, solidity_version_json_1.default);
    const goodReport2 = v2.getStorageUpgradeReport(v3);
    t.true(goodReport2.ok);
});
test('namespaced output', async (t) => {
    const buildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/Namespaced.sol:Example');
    if (buildInfo === undefined) {
        throw new Error('Build info not found');
    }
    const impl = new standalone_1.UpgradeableContract('Example', buildInfo.input, buildInfo.output, {}, '0.8.20');
    const report = impl.getErrorReport();
    t.true(report.ok);
});
test('namespaced output without version', async (t) => {
    const buildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/Namespaced.sol:Example');
    if (buildInfo === undefined) {
        throw new Error('Build info not found');
    }
    const error = t.throws(() => new standalone_1.UpgradeableContract('Example', buildInfo.input, buildInfo.output));
    t.assert(error?.message.includes(`contracts/test/Namespaced.sol: Namespace annotations require Solidity version >= 0.8.20, but no solcVersion parameter was provided`), error?.message);
});
//# sourceMappingURL=standalone.test.js.map