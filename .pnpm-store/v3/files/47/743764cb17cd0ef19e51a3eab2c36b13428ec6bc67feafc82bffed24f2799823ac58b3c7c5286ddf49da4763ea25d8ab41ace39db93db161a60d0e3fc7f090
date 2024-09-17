"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("solidity-ast/utils");
const hardhat_1 = require("hardhat");
const storage_1 = require("./storage");
const extract_1 = require("./storage/extract");
const stabilize_layout_1 = require("./utils/stabilize-layout");
const test = ava_1.default;
test.before(async (t) => {
    const buildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/Namespaced.sol:Example');
    if (buildInfo === undefined) {
        throw new Error('Build info not found');
    }
    const solcOutput = buildInfo.output;
    const contracts = {};
    const storageLayouts = {};
    for (const def of (0, utils_1.findAll)('ContractDefinition', solcOutput.sources['contracts/test/Namespaced.sol'].ast)) {
        contracts[def.name] = def;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        storageLayouts[def.name] = solcOutput.contracts['contracts/test/Namespaced.sol'][def.name].storageLayout;
    }
    const deref = (0, utils_1.astDereferencer)(solcOutput);
    t.context.extractStorageLayout = name => (0, extract_1.extractStorageLayout)(contracts[name], dummyDecodeSrc, deref, storageLayouts[name]);
});
const dummyDecodeSrc = () => 'file.sol:1';
test('layout', t => {
    const layout = t.context.extractStorageLayout('Example');
    t.snapshot((0, stabilize_layout_1.stabilizeStorageLayout)(layout));
});
test('multiple namespaces', t => {
    const layout = t.context.extractStorageLayout('MultipleNamespaces');
    t.snapshot((0, stabilize_layout_1.stabilizeStorageLayout)(layout));
});
test('namespaced upgrade ok', t => {
    const v1 = t.context.extractStorageLayout('Example');
    const v2 = t.context.extractStorageLayout('ExampleV2_Ok');
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.deepEqual(comparison, []);
});
test('namespaced upgrade bad', t => {
    const v1 = t.context.extractStorageLayout('Example');
    const v2 = t.context.extractStorageLayout('ExampleV2_Bad');
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.like(comparison, {
        length: 1,
        0: {
            kind: 'delete',
            original: {
                contract: 'Example',
                label: 'x',
                type: {
                    id: 't_uint256',
                },
            },
        },
    });
});
test('recursive struct outer ok', t => {
    const v1 = t.context.extractStorageLayout('RecursiveStruct');
    const v2 = t.context.extractStorageLayout('RecursiveStructV2_Outer_Ok');
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.deepEqual(comparison, []);
});
test('recursive struct bad', t => {
    const v1 = t.context.extractStorageLayout('RecursiveStruct');
    const v2 = t.context.extractStorageLayout('RecursiveStructV2_Bad');
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.like(comparison, {
        length: 1,
        0: {
            kind: 'typechange',
            change: {
                kind: 'struct members',
                ops: {
                    length: 1,
                    0: { kind: 'append' },
                },
            },
            original: { label: 's' },
            updated: { label: 's' },
        },
    });
});
test('multiple namespaces and regular variables ok', t => {
    const v1 = t.context.extractStorageLayout('MultipleNamespacesAndRegularVariables');
    const v2 = t.context.extractStorageLayout('MultipleNamespacesAndRegularVariablesV2_Ok');
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.deepEqual(comparison, []);
});
test('multiple namespaces and regular variables bad', t => {
    const v1 = t.context.extractStorageLayout('MultipleNamespacesAndRegularVariables');
    const v2 = t.context.extractStorageLayout('MultipleNamespacesAndRegularVariablesV2_Bad');
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.like(comparison, {
        length: 5,
        0: {
            kind: 'insert',
            updated: {
                label: 'c',
            },
        },
        1: {
            kind: 'layoutchange',
            updated: {
                label: 'a', // layout available for regular variable outside of namespace
            },
        },
        2: {
            kind: 'layoutchange',
            updated: {
                label: 'b', // layout available for regular variable outside of namespace
            },
        },
        3: {
            kind: 'insert',
            updated: {
                label: 'c',
            },
        },
        4: {
            kind: 'insert',
            updated: {
                label: 'c',
            },
        },
    });
});
//# sourceMappingURL=storage-namespaced.test.js.map