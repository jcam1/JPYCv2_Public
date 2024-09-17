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
    const buildInfoCache = {};
    t.context.extractStorageLayout = async (contractFile, contractName, withLayout = true) => {
        const expectedContract = contractName ?? contractFile;
        const [file] = contractFile.split('_');
        const source = `contracts/test/${file}.sol`;
        const buildInfo = (buildInfoCache[source] ?? (buildInfoCache[source] = await hardhat_1.artifacts.getBuildInfo(`${source}:${expectedContract}`)));
        if (buildInfo === undefined) {
            throw new Error(`Build info for ${source} not found`);
        }
        const solcOutput = buildInfo.output;
        for (const def of (0, utils_1.findAll)('ContractDefinition', solcOutput.sources[source].ast)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const layout = solcOutput.contracts[source][def.name].storageLayout;
            if (def.name === expectedContract) {
                return (0, extract_1.extractStorageLayout)(def, dummyDecodeSrc, (0, utils_1.astDereferencer)(solcOutput), withLayout ? layout : undefined);
            }
        }
        throw new Error(`Contract ${expectedContract} not found in ${source}`);
    };
});
const dummyDecodeSrc = () => 'file.sol:1';
test('memory 0.5.16', async (t) => {
    const layout = await t.context.extractStorageLayout('Memory05');
    t.snapshot((0, stabilize_layout_1.stabilizeStorageLayout)(layout));
});
test('memory 0.8.9', async (t) => {
    const layout = await t.context.extractStorageLayout('Memory08');
    t.snapshot((0, stabilize_layout_1.stabilizeStorageLayout)(layout));
});
test('memory - upgrade from 0.5.16 to 0.8.9', async (t) => {
    const v1 = await t.context.extractStorageLayout('Memory05');
    const v2 = await t.context.extractStorageLayout('Memory08');
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.deepEqual(comparison, []);
});
test('memory - bad upgrade from 0.5.16 to 0.8.9', async (t) => {
    const v1 = await t.context.extractStorageLayout('Memory05');
    const v2 = await t.context.extractStorageLayout('Memory08', 'Memory08Bad');
    const comparison = (0, storage_1.getStorageUpgradeErrors)(v1, v2);
    t.like(comparison, {
        length: 2,
        0: {
            kind: 'typechange',
            change: {
                kind: 'mapping key',
            },
            original: { label: 'a' },
            updated: { label: 'a' },
        },
        1: {
            kind: 'typechange',
            change: {
                kind: 'mapping key',
            },
            original: { label: 'b' },
            updated: { label: 'b' },
        },
    });
});
//# sourceMappingURL=storage-memory-0.5.test.js.map