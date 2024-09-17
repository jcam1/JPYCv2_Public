"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const fs_1 = require("fs");
const rimraf_1 = require("rimraf");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const hardhat_1 = require("hardhat");
const validate_upgrade_safety_1 = require("./validate-upgrade-safety");
const find_contract_1 = require("./find-contract");
ava_1.default.before(async () => {
    process.chdir(await fs_1.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'upgrades-core-test-')));
});
ava_1.default.after(async () => {
    await (0, rimraf_1.rimraf)(process.cwd());
});
(0, ava_1.default)('validate upgrade safety', async (t) => {
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:Safe`);
    await fs_1.promises.mkdir('validate-upgrade-safety');
    await fs_1.promises.writeFile('validate-upgrade-safety/1.json', JSON.stringify(buildInfo));
    const report = await (0, validate_upgrade_safety_1.validateUpgradeSafety)('validate-upgrade-safety');
    t.false(report.ok);
    t.snapshot(report.explain());
});
(0, ava_1.default)('ambiguous upgrades-from', async (t) => {
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:Safe`);
    await fs_1.promises.mkdir('ambiguous-upgrades-from');
    await fs_1.promises.writeFile('ambiguous-upgrades-from/1.json', JSON.stringify(buildInfo));
    await fs_1.promises.writeFile('ambiguous-upgrades-from/2.json', JSON.stringify(buildInfo));
    const error = await t.throwsAsync((0, validate_upgrade_safety_1.validateUpgradeSafety)('ambiguous-upgrades-from'));
    t.true(error?.message.includes('Found multiple contracts with name'), error?.message);
});
(0, ava_1.default)('bad upgrade from 0.8.8 to 0.8.9', async (t) => {
    await fs_1.promises.mkdir('bad-upgrade');
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Storage088.sol:Storage088`);
    await fs_1.promises.writeFile('bad-upgrade/storage088.json', JSON.stringify(buildInfo));
    const buildInfo2 = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Storage089.sol:Storage089`);
    await fs_1.promises.writeFile('bad-upgrade/storage089.json', JSON.stringify(buildInfo2));
    const report = await (0, validate_upgrade_safety_1.validateUpgradeSafety)('bad-upgrade');
    t.false(report.ok);
    t.snapshot(report.explain());
});
(0, ava_1.default)('reference contract not found', async (t) => {
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Storage089.sol:Storage089`);
    await fs_1.promises.mkdir('ref-not-found');
    await fs_1.promises.writeFile('ref-not-found/storage089.json', JSON.stringify(buildInfo));
    const error = await t.throwsAsync((0, validate_upgrade_safety_1.validateUpgradeSafety)('ref-not-found'));
    t.true(error instanceof find_contract_1.ReferenceContractNotFound);
    t.is(error?.message, 'Could not find contract Storage088 referenced in contracts/test/cli/Storage089.sol:Storage089.');
});
(0, ava_1.default)('invalid annotation args - upgrades-from', async (t) => {
    const fullyQualifiedName = `contracts/test/cli/InvalidAnnotationArgsUpgradesFrom.sol:InvalidAnnotationArgsUpgradesFrom`;
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(fullyQualifiedName);
    await fs_1.promises.mkdir('invalid-annotation-args-upgrades-from');
    await fs_1.promises.writeFile('invalid-annotation-args-upgrades-from/1.json', JSON.stringify(buildInfo));
    const error = await t.throwsAsync((0, validate_upgrade_safety_1.validateUpgradeSafety)('invalid-annotation-args-upgrades-from'));
    t.true(error?.message.includes(`Invalid number of arguments for @custom:oz-upgrades-from annotation in contract ${fullyQualifiedName}.`));
    t.true(error?.message.includes('Found 0, expected 1'));
});
(0, ava_1.default)('invalid annotation args - upgrades', async (t) => {
    const fullyQualifiedName = `contracts/test/cli/InvalidAnnotationArgsUpgrades.sol:InvalidAnnotationArgsUpgrades`;
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(fullyQualifiedName);
    await fs_1.promises.mkdir('invalid-annotation-args-upgrades');
    await fs_1.promises.writeFile('invalid-annotation-args-upgrades/1.json', JSON.stringify(buildInfo));
    const error = await t.throwsAsync((0, validate_upgrade_safety_1.validateUpgradeSafety)('invalid-annotation-args-upgrades'));
    t.true(error?.message.includes(`Invalid number of arguments for @custom:oz-upgrades annotation in contract ${fullyQualifiedName}.`));
    t.true(error?.message.includes('Found 1, expected 0'));
});
(0, ava_1.default)('findSpecifiedContracts - requireReference option without contract', async (t) => {
    try {
        (0, validate_upgrade_safety_1.findSpecifiedContracts)({}, (0, validate_upgrade_safety_1.withCliDefaults)({ requireReference: true }));
    }
    catch (e) {
        t.true(e.message.includes('The requireReference option can only be specified when the contract option is also specified.'));
    }
});
//# sourceMappingURL=validate-upgrade-safety.test.js.map