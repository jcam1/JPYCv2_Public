"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const assert_1 = __importDefault(require("assert"));
const hardhat_1 = require("hardhat");
const src_decoder_1 = require("./src-decoder");
const run_1 = require("./validate/run");
const query_1 = require("./validate/query");
const data_1 = require("./validate/data");
const manifest_storage_layout_1 = require("./manifest-storage-layout");
const test = ava_1.default;
test.before(async (t) => {
    const buildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/ManifestMigrate.sol:ManifestMigrateUnique');
    (0, assert_1.default)(buildInfo !== undefined, 'Build info not found');
    const decodeSrc = (0, src_decoder_1.solcInputOutputDecoder)(buildInfo.input, buildInfo.output);
    t.context.validationRun = (0, run_1.validate)(buildInfo.output, decodeSrc);
    t.context.validationData = (0, data_1.normalizeValidationData)([t.context.validationRun]);
});
test('getStorageLayoutForAddress - update layout', async (t) => {
    const { version } = t.context.validationRun['contracts/test/ManifestMigrate.sol:ManifestMigrateUnique'];
    (0, assert_1.default)(version !== undefined);
    const updatedLayout = (0, query_1.getStorageLayout)(t.context.validationData, version);
    const outdatedLayout = removeStorageLayoutMembers(updatedLayout);
    const address = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
    const manifest = mockManifest({
        manifestVersion: '3.2',
        impls: {
            [version.withoutMetadata]: {
                address,
                txHash: '0x6580b51f3edcacacf30d7b4140e4022b65d2a5ba7cbe7e4d91397f4c3b5e8a6b',
                layout: outdatedLayout,
            },
        },
        proxies: [],
    });
    const layout = await (0, manifest_storage_layout_1.getStorageLayoutForAddress)(manifest, t.context.validationData, address);
    t.deepEqual(layout, updatedLayout);
    t.like(manifest.data, {
        impls: {
            [version.withoutMetadata]: {
                address,
                txHash: '0x6580b51f3edcacacf30d7b4140e4022b65d2a5ba7cbe7e4d91397f4c3b5e8a6b',
                layout: updatedLayout,
            },
        },
        proxies: [],
    });
});
test('getUpdatedLayout - unique layout match', async (t) => {
    const { version } = t.context.validationRun['contracts/test/ManifestMigrate.sol:ManifestMigrateUnique'];
    (0, assert_1.default)(version !== undefined);
    const targetLayout = (0, query_1.getStorageLayout)(t.context.validationData, version);
    const outdatedLayout = removeStorageLayoutMembers(targetLayout);
    const updatedLayout = (0, manifest_storage_layout_1.getUpdatedStorageLayout)(t.context.validationData, version.withoutMetadata, outdatedLayout);
    t.deepEqual(updatedLayout, targetLayout);
});
test('getUpdatedLayout - multiple unambiguous layout matches', async (t) => {
    const { version: version1 } = t.context.validationRun['contracts/test/ManifestMigrate.sol:ManifestMigrateUnambiguous1'];
    const { version: version2 } = t.context.validationRun['contracts/test/ManifestMigrate.sol:ManifestMigrateUnambiguous2'];
    (0, assert_1.default)(version1 !== undefined && version2 !== undefined);
    t.is(version1.withoutMetadata, version2.withoutMetadata, 'version is meant to be ambiguous');
    t.not(version1.withMetadata, version2.withMetadata, 'version with metadata should be different');
    const targetLayout = (0, query_1.getStorageLayout)(t.context.validationData, version1);
    const outdatedLayout = removeStorageLayoutMembers(targetLayout);
    const updatedLayout = (0, manifest_storage_layout_1.getUpdatedStorageLayout)(t.context.validationData, version1.withoutMetadata, outdatedLayout);
    t.deepEqual(updatedLayout, targetLayout);
});
test('getUpdatedLayout - multiple ambiguous layout matches', async (t) => {
    const { version: version1 } = t.context.validationRun['contracts/test/ManifestMigrate.sol:ManifestMigrateAmbiguous1'];
    const { version: version2 } = t.context.validationRun['contracts/test/ManifestMigrate.sol:ManifestMigrateAmbiguous2'];
    (0, assert_1.default)(version1 !== undefined && version2 !== undefined);
    t.is(version1.withoutMetadata, version2.withoutMetadata, 'version is meant to be ambiguous');
    t.not(version1.withMetadata, version2.withMetadata, 'version with metadata should be different');
    const targetLayout = (0, query_1.getStorageLayout)(t.context.validationData, version1);
    const outdatedLayout = removeStorageLayoutMembers(targetLayout);
    const updatedLayout = (0, manifest_storage_layout_1.getUpdatedStorageLayout)(t.context.validationData, version1.withoutMetadata, outdatedLayout);
    t.is(updatedLayout, undefined);
});
function mockManifest(data) {
    const manifest = {
        data,
        async read() {
            return this.data;
        },
        async write(data) {
            this.data = data;
        },
        async lockedRun(cb) {
            return cb();
        },
    };
    return manifest;
}
// Simulate a layout from a version without struct/enum members
function removeStorageLayoutMembers(layout) {
    const res = { ...layout, types: { ...layout.types } };
    for (const id in res.types) {
        res.types[id] = { ...layout.types[id], members: undefined };
    }
    return res;
}
//# sourceMappingURL=manifest-storage-layout.test.js.map