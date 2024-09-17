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
    'contracts/test/RetypeFromContract.sol:RetypeContractToUint160V1',
    'contracts/test/RetypeFromContract.sol:RetypeContractToUint160V2',
    'contracts/test/RetypeFromContract.sol:RetypeUint160ToContractV1',
    'contracts/test/RetypeFromContract.sol:RetypeUint160ToContractV2',
    'contracts/test/RetypeFromContract.sol:RetypeContractToUint160MappingV1',
    'contracts/test/RetypeFromContract.sol:RetypeContractToUint160MappingV2',
    'contracts/test/RetypeFromContract.sol:RetypeUint160ToContractMappingV1',
    'contracts/test/RetypeFromContract.sol:RetypeUint160ToContractMappingV2',
    'contracts/test/RetypeFromContract.sol:ImplicitRetypeV1',
    'contracts/test/RetypeFromContract.sol:ImplicitRetypeV2',
    'contracts/test/RetypeFromContract.sol:ImplicitRetypeMappingV1',
    'contracts/test/RetypeFromContract.sol:ImplicitRetypeMappingV2',
    'contracts/test/RetypeFromContract.sol:RetypeStructV1',
    'contracts/test/RetypeFromContract.sol:RetypeStructV2',
    'contracts/test/RetypeFromContract.sol:RetypeStructV2Bad',
    'contracts/test/RetypeFromContract.sol:RetypeEnumV1',
    'contracts/test/RetypeFromContract.sol:RetypeEnumV2',
    'contracts/test/RetypeFromContract.sol:RetypeEnumV2Bad',
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
        for (const def of (0, utils_1.findAll)('ContractDefinition', solcOutput.sources['contracts/test/RetypeFromContract.sol'].ast)) {
            contracts[def.name] = def;
            deref[def.name] = (0, utils_1.astDereferencer)(solcOutput);
            storageLayout[def.name] = solcOutput.contracts['contracts/test/RetypeFromContract.sol'][def.name].storageLayout;
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
test('retype contract to uint160', t => {
    const v1 = t.context.extractStorageLayout('RetypeContractToUint160V1');
    const v2 = t.context.extractStorageLayout('RetypeContractToUint160V2');
    const report = getReport(v1, v2);
    t.true(report.ok, report.explain());
});
test('retype uint160 to contract', t => {
    const v1 = t.context.extractStorageLayout('RetypeUint160ToContractV1');
    const v2 = t.context.extractStorageLayout('RetypeUint160ToContractV2');
    const report = getReport(v1, v2);
    t.true(report.ok, report.explain());
});
test('retype contract to uint160 mapping', t => {
    const v1 = t.context.extractStorageLayout('RetypeContractToUint160MappingV1');
    const v2 = t.context.extractStorageLayout('RetypeContractToUint160MappingV2');
    const report = getReport(v1, v2);
    t.true(report.ok, report.explain());
});
test('retype uint160 to contract mapping', t => {
    const v1 = t.context.extractStorageLayout('RetypeUint160ToContractMappingV1');
    const v2 = t.context.extractStorageLayout('RetypeUint160ToContractMappingV2');
    const report = getReport(v1, v2);
    t.true(report.ok, report.explain());
});
test('implicit retype', t => {
    const v1 = t.context.extractStorageLayout('ImplicitRetypeV1');
    const v2 = t.context.extractStorageLayout('ImplicitRetypeV2');
    const report = getReport(v1, v2);
    t.true(report.ok, report.explain());
});
test('implicit retype mapping', t => {
    const v1 = t.context.extractStorageLayout('ImplicitRetypeMappingV1');
    const v2 = t.context.extractStorageLayout('ImplicitRetypeMappingV2');
    const report = getReport(v1, v2);
    t.true(report.ok, report.explain());
});
test('strip contract substrings', t => {
    t.is((0, compare_1.stripContractSubstrings)(undefined), undefined);
    t.is((0, compare_1.stripContractSubstrings)('address'), 'address');
    t.is((0, compare_1.stripContractSubstrings)('CustomContract'), 'CustomContract');
    t.is((0, compare_1.stripContractSubstrings)('contract CustomContract'), 'CustomContract');
    t.is((0, compare_1.stripContractSubstrings)('mapping(uint8 => CustomContract)'), 'mapping(uint8 => CustomContract)');
    t.is((0, compare_1.stripContractSubstrings)('mapping(uint8 => contract CustomContract)'), 'mapping(uint8 => CustomContract)');
    t.is((0, compare_1.stripContractSubstrings)('mapping(contract CustomContract => uint8)'), 'mapping(CustomContract => uint8)');
    t.is((0, compare_1.stripContractSubstrings)('mapping(contract A => contract B)'), 'mapping(A => B)');
    t.is((0, compare_1.stripContractSubstrings)('mapping(Substringcontract => address)'), 'mapping(Substringcontract => address)');
    t.is((0, compare_1.stripContractSubstrings)('mapping(contract Substringcontract => address)'), 'mapping(Substringcontract => address)');
    t.is((0, compare_1.stripContractSubstrings)('Mystruct'), 'Mystruct');
    t.is((0, compare_1.stripContractSubstrings)('struct Mystruct'), 'Mystruct');
    t.is((0, compare_1.stripContractSubstrings)('Myenum'), 'Myenum');
    t.is((0, compare_1.stripContractSubstrings)('enum Myenum'), 'Myenum');
});
test('retype from struct', t => {
    const v1 = t.context.extractStorageLayout('RetypeStructV1');
    const v2 = t.context.extractStorageLayout('RetypeStructV2');
    const report = getReport(v1, v2);
    t.true(report.ok, report.explain());
});
test('bad retype from struct', t => {
    const v1 = t.context.extractStorageLayout('RetypeStructV1');
    const v2 = t.context.extractStorageLayout('RetypeStructV2Bad');
    t.like((0, _1.getStorageUpgradeErrors)(v1, v2), {
        length: 1,
        0: {
            kind: 'layoutchange',
            original: { label: 'x' },
            updated: { label: 'x' },
        },
    });
});
test('retype from enum', t => {
    const v1 = t.context.extractStorageLayout('RetypeEnumV1');
    const v2 = t.context.extractStorageLayout('RetypeEnumV2');
    const report = getReport(v1, v2);
    t.true(report.ok, report.explain());
});
test('bad retype from enum', t => {
    const v1 = t.context.extractStorageLayout('RetypeEnumV1');
    const v2 = t.context.extractStorageLayout('RetypeEnumV2Bad');
    t.like((0, _1.getStorageUpgradeErrors)(v1, v2), {
        length: 1,
        0: {
            kind: 'layoutchange',
            original: { label: 'x' },
            updated: { label: 'x' },
        },
    });
});
//# sourceMappingURL=report-retype-from-contract.test.js.map