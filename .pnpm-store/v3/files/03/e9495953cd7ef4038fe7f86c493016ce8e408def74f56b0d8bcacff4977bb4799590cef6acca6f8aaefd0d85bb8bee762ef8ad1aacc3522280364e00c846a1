"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const hardhat_1 = require("hardhat");
const validations_1 = require("./validations");
const contract_report_1 = require("./contract-report");
const validate_upgrade_safety_1 = require("./validate-upgrade-safety");
const test = ava_1.default;
const SOURCE_FILE = 'contracts/test/cli/Validate.sol';
test.before(async (t) => {
    const hardhatBuildInfo = await hardhat_1.artifacts.getBuildInfo(`${SOURCE_FILE}:Safe`);
    if (hardhatBuildInfo === undefined) {
        t.fail();
    }
    else {
        const buildInfoFile = {
            ...hardhatBuildInfo,
            dirShortName: 'build-info',
        };
        const sourceContracts = (0, validations_1.validateBuildInfoContracts)([buildInfoFile]);
        t.context.reports = (0, contract_report_1.getContractReports)({ '': sourceContracts }, (0, validate_upgrade_safety_1.withCliDefaults)({}));
    }
});
function getReport(t, contractName) {
    return t.context.reports.find(r => r.contract === `${SOURCE_FILE}:${contractName}`);
}
function assertReport(t, report, valid) {
    if (valid === undefined) {
        t.true(report === undefined);
    }
    else if (valid === true) {
        t.true(report !== undefined);
        t.true(report?.ok);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        t.regex(report.explain(), /✔/);
    }
    else if (valid === false) {
        t.true(report !== undefined);
        t.false(report?.ok);
        t.snapshot(report?.explain());
    }
}
function testValid(name, valid) {
    const expectationString = valid === undefined ? 'ignores' : valid ? 'accepts' : 'rejects';
    const testName = [expectationString, name].join(' ');
    test(testName, t => {
        const report = getReport(t, name);
        assertReport(t, report, valid);
    });
}
testValid('Safe', true);
testValid('MultipleUnsafe', false);
testValid('NonUpgradeable', undefined);
testValid('HasInitializer', true);
testValid('HasUpgradeTo', true);
testValid('HasUpgradeToConstructorUnsafe', false);
testValid('InheritsMultipleUnsafe', false);
testValid('UpgradesFromUUPS', false);
testValid('UpgradesFromTransparent', true);
testValid('UnsafeAndStorageLayoutErrors', false);
testValid('BecomesSafe', true);
testValid('BecomesBadLayout', false);
testValid('StillUnsafe', false);
testValid('AbstractUpgradeable', undefined);
testValid('InheritsAbstractUpgradeable', true);
//# sourceMappingURL=validations.test.js.map