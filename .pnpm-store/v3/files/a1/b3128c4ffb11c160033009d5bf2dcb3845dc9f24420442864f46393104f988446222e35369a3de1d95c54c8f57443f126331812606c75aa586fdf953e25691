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
const sinon_1 = __importDefault(require("sinon"));
const impl_store_1 = require("./impl-store");
const version_1 = require("./version");
const stub_provider_1 = require("./stub-provider");
ava_1.default.before(async () => {
    process.chdir(await fs_1.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'upgrades-core-test-')));
});
ava_1.default.after(async () => {
    await (0, rimraf_1.rimraf)(process.cwd());
});
const version1 = (0, version_1.getVersion)('01');
const version2 = (0, version_1.getVersion)('02', '02');
(0, ava_1.default)('deploys on cache miss', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    await (0, impl_store_1.fetchOrDeploy)(version1, provider, provider.deploy);
    t.is(provider.deployCount, 1);
});
(0, ava_1.default)('reuses on cache hit', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const cachedDeploy = () => (0, impl_store_1.fetchOrDeploy)(version1, provider, provider.deploy);
    const address1 = await cachedDeploy();
    const address2 = await cachedDeploy();
    t.is(provider.deployCount, 1);
    t.is(address2, address1);
});
(0, ava_1.default)('does not reuse unrelated version', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const address1 = await (0, impl_store_1.fetchOrDeploy)(version1, provider, provider.deploy);
    const address2 = await (0, impl_store_1.fetchOrDeploy)(version2, provider, provider.deploy);
    t.is(provider.deployCount, 2);
    t.not(address2, address1);
});
(0, ava_1.default)('cleans up invalid deployment', async (t) => {
    const chainId = 1234;
    const provider1 = (0, stub_provider_1.stubProvider)(chainId);
    // create a deployment on a network
    await (0, impl_store_1.fetchOrDeploy)(version1, provider1, provider1.deploy);
    // try to fetch it on a different network with same chainId
    const provider2 = (0, stub_provider_1.stubProvider)(chainId);
    await t.throwsAsync((0, impl_store_1.fetchOrDeploy)(version1, provider2, provider2.deploy));
    // the failed deployment has been cleaned up
    await (0, impl_store_1.fetchOrDeploy)(version1, provider2, provider2.deploy);
});
(0, ava_1.default)('merge addresses', async (t) => {
    const depl1 = { address: '0x1' };
    const depl2 = { address: '0x2' };
    const { address, allAddresses } = (0, impl_store_1.mergeAddresses)(depl1, depl2);
    t.is(address, '0x1');
    t.true(unorderedEqual(allAddresses, ['0x1', '0x2']), allAddresses.toString());
});
(0, ava_1.default)('merge multiple existing addresses', async (t) => {
    const depl1 = { address: '0x1', allAddresses: ['0x1a', '0x1b'] };
    const depl2 = { address: '0x2' };
    const { address, allAddresses } = (0, impl_store_1.mergeAddresses)(depl1, depl2);
    t.is(address, '0x1');
    t.true(unorderedEqual(allAddresses, ['0x1', '0x1a', '0x1b', '0x2']), allAddresses.toString());
});
(0, ava_1.default)('merge all addresses', async (t) => {
    const depl1 = { address: '0x1', allAddresses: ['0x1a', '0x1b'] };
    const depl2 = { address: '0x2', allAddresses: ['0x2a', '0x2b'] };
    const { address, allAddresses } = (0, impl_store_1.mergeAddresses)(depl1, depl2);
    t.is(address, '0x1');
    t.true(unorderedEqual(allAddresses, ['0x1', '0x1a', '0x1b', '0x2', '0x2a', '0x2b']), allAddresses.toString());
});
function unorderedEqual(arr1, arr2) {
    return arr1.every(i => arr2.includes(i)) && arr2.every(i => arr1.includes(i));
}
(0, ava_1.default)('defender - replace tx hash for deployment', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    // create a pending deployment with id
    const fakeDeploy = await provider.deployPending();
    provider.removeContract(fakeDeploy.address);
    async function fakeDeployWithId() {
        return {
            ...fakeDeploy,
            txHash: '0x1',
            remoteDeploymentId: 'abc',
        };
    }
    const getDeploymentResponse1 = sinon_1.default.stub().returns({
        status: 'submitted',
        txHash: '0x1',
    });
    // let it timeout
    await t.throwsAsync((0, impl_store_1.fetchOrDeployGetDeployment)(version1, provider, fakeDeployWithId, { timeout: 1, pollingInterval: 0 }, undefined, getDeploymentResponse1));
    // make the contract code exist
    provider.addContract(fakeDeploy.address);
    // simulate a changed tx hash
    const getDeploymentResponse2 = sinon_1.default.stub().returns({
        status: 'completed',
        txHash: '0x2',
    });
    const deployment = await (0, impl_store_1.fetchOrDeployGetDeployment)(version1, provider, fakeDeployWithId, { timeout: 1, pollingInterval: 0 }, undefined, getDeploymentResponse2);
    t.is(deployment.address, fakeDeploy.address);
    t.is(deployment.txHash, '0x2');
});
(0, ava_1.default)('defender - address clash', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    // create a pending deployment with id
    const fakeDeploy = await provider.deployPending();
    provider.removeContract(fakeDeploy.address);
    async function deployment1() {
        return {
            ...fakeDeploy,
            txHash: '0x1',
            remoteDeploymentId: 'abc',
        };
    }
    const mockPendingDeployment = sinon_1.default.stub().returns({
        status: 'submitted',
        txHash: '0x1',
    });
    // let it timeout
    await t.throwsAsync((0, impl_store_1.fetchOrDeployGetDeployment)(version1, provider, deployment1, { timeout: 1, pollingInterval: 0 }, undefined, mockPendingDeployment));
    // simulate a new deployment with the same address, but different tx hash and deployment id
    async function deployment2() {
        return {
            ...fakeDeploy,
            txHash: '0x2',
            remoteDeploymentId: 'def',
        };
    }
    // deploy with a different version hash
    const error = await t.throwsAsync((0, impl_store_1.fetchOrDeployGetDeployment)(version2, provider, deployment2, { timeout: 1, pollingInterval: 0 }, undefined, mockPendingDeployment));
    t.true(error?.message.startsWith(`The deployment clashes with an existing one at ${fakeDeploy.address}`), error?.message);
});
(0, ava_1.default)('defender - merge avoids address clash, replaces deployment id', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const MERGE = true;
    // create a pending deployment with id
    const fakeDeploy = await provider.deployPending();
    provider.removeContract(fakeDeploy.address);
    async function deployment1() {
        return {
            ...fakeDeploy,
            txHash: '0x1',
            remoteDeploymentId: 'abc',
        };
    }
    const getDeploymentResponse1 = sinon_1.default.stub().returns({
        status: 'submitted',
        txHash: '0x1',
    });
    // let it timeout
    await t.throwsAsync((0, impl_store_1.fetchOrDeployGetDeployment)(version1, provider, deployment1, { timeout: 1, pollingInterval: 0 }, MERGE, getDeploymentResponse1));
    // simulate a failed previous deployment
    const getDeploymentResponse2 = sinon_1.default.stub().returns({
        status: 'failed',
        txHash: '0x1',
    });
    // redeploy with a new deployment id
    async function deployment2() {
        return {
            ...fakeDeploy,
            txHash: '0x2',
            remoteDeploymentId: 'def',
        };
    }
    // make the contract code exist
    provider.addContract(fakeDeploy.address);
    const deployment = await (0, impl_store_1.fetchOrDeployGetDeployment)(version1, provider, deployment2, { timeout: 1, pollingInterval: 0 }, MERGE, getDeploymentResponse2);
    t.is(deployment.address, fakeDeploy.address);
    t.is(deployment.txHash, '0x2');
    t.is(deployment.remoteDeploymentId, 'def');
});
//# sourceMappingURL=impl-store.test.js.map