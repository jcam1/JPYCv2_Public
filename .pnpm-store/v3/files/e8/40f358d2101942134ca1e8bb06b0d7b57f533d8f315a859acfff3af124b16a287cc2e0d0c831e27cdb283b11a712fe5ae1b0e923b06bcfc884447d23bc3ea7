"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const util_1 = require("util");
const _1 = require(".");
const sinon_1 = __importDefault(require("sinon"));
const deployment_1 = require("./deployment");
const stub_provider_1 = require("./stub-provider");
const sleep = (0, util_1.promisify)(setTimeout);
ava_1.default.afterEach.always(() => {
    sinon_1.default.restore();
});
(0, ava_1.default)('deploys new contract', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    t.true(provider.isContract(deployment.address));
    t.is(provider.deployCount, 1);
});
(0, ava_1.default)('resumes existing deployment with txHash', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const first = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deployPending);
    const second = await (0, deployment_1.resumeOrDeploy)(provider, first, provider.deployPending);
    t.is(first, second);
    t.is(provider.deployCount, 1);
});
(0, ava_1.default)('resumes existing deployment without txHash', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const first = await provider.deploy();
    delete first.txHash;
    const second = await (0, deployment_1.resumeOrDeploy)(provider, first, provider.deployPending);
    t.is(first, second);
    t.is(provider.deployCount, 1);
});
(0, ava_1.default)('errors if tx is not found', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const fakeDeployment = {
        address: '0x1aec6468218510f19bb19f52c4767996895ce711',
        txHash: '0xc48e21ac9c051922f5ccf1b47b62000f567ef9bbc108d274848b44351a6872cb',
    };
    await t.throwsAsync((0, deployment_1.resumeOrDeploy)(provider, fakeDeployment, provider.deploy));
});
(0, ava_1.default)('redeploys if tx is not found on dev network', async (t) => {
    // 31337 = Hardhat Network chainId
    const provider = (0, stub_provider_1.stubProvider)(31337, 'HardhatNetwork/2.2.1/@ethereumjs/vm/5.3.2');
    const fakeDeployment = {
        address: '0x1aec6468218510f19bb19f52c4767996895ce711',
        txHash: '0xc48e21ac9c051922f5ccf1b47b62000f567ef9bbc108d274848b44351a6872cb',
    };
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, fakeDeployment, provider.deploy);
    t.true(provider.isContract(deployment.address));
    t.is(provider.deployCount, 1);
});
(0, ava_1.default)('validates a mined deployment with txHash', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    await (0, deployment_1.waitAndValidateDeployment)(provider, deployment);
    t.is(provider.getMethodCount('eth_getTransactionReceipt'), 1);
    t.is(provider.getMethodCount('eth_getCode'), 1);
});
(0, ava_1.default)('validates a mined deployment without txHash', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    delete deployment.txHash;
    await (0, deployment_1.waitAndValidateDeployment)(provider, deployment);
    t.is(provider.getMethodCount('eth_getTransactionReceipt'), 0);
    t.is(provider.getMethodCount('eth_getCode'), 1);
});
(0, ava_1.default)('waits for a deployment to mine', async (t) => {
    const timeout = Symbol('timeout');
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deployPending);
    const result = await Promise.race([(0, deployment_1.waitAndValidateDeployment)(provider, deployment), sleep(100).then(() => timeout)]);
    t.is(result, timeout);
    provider.mine();
    await (0, deployment_1.waitAndValidateDeployment)(provider, deployment);
});
(0, ava_1.default)('fails deployment fast if tx reverts', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    provider.failTx(deployment.txHash);
    await t.throwsAsync((0, deployment_1.waitAndValidateDeployment)(provider, deployment));
});
(0, ava_1.default)('waits for a deployment to return contract code', async (t) => {
    const timeout = Symbol('timeout');
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    provider.removeContract(deployment.address);
    const result = await Promise.race([(0, deployment_1.waitAndValidateDeployment)(provider, deployment), sleep(100).then(() => timeout)]);
    t.is(result, timeout);
    provider.addContract(deployment.address);
    await (0, deployment_1.waitAndValidateDeployment)(provider, deployment);
});
(0, ava_1.default)('tx mined timeout - no params', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    try {
        throw new _1.TransactionMinedTimeout(deployment);
    }
    catch (e) {
        const EXPECTED = /Timed out waiting for contract deployment to address \S+ with transaction \S+\n\nRun the function again to continue waiting for the transaction confirmation./;
        t.true(EXPECTED.test(e.message), e.message);
    }
});
(0, ava_1.default)('tx mined timeout - params', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    try {
        throw new _1.TransactionMinedTimeout(deployment, 'implementation', true);
    }
    catch (e) {
        const EXPECTED = /Timed out waiting for implementation contract deployment to address \S+ with transaction \S+\n\nRun the function again to continue waiting for the transaction confirmation. If the problem persists, adjust the polling parameters with the timeout and pollingInterval options./;
        t.true(EXPECTED.test(e.message), e.message);
    }
});
(0, ava_1.default)('platform - resumes existing deployment id and replaces tx hash', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const getDeploymentResponse = sinon_1.default.stub().returns({
        status: 'submitted',
        txHash: '0x2',
    });
    const first = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deployPending);
    first.txHash = '0x1';
    first.remoteDeploymentId = 'abc';
    const second = await (0, deployment_1.resumeOrDeploy)(provider, first, provider.deployPending, undefined, undefined, undefined, undefined, getDeploymentResponse);
    t.is(second.address, first.address);
    t.is(second.remoteDeploymentId, first.remoteDeploymentId);
    t.is(second.txHash, '0x2');
    t.is(provider.deployCount, 1);
});
(0, ava_1.default)('platform - resumes existing deployment id and uses tx hash', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const getDeploymentResponse = sinon_1.default.stub().throws();
    const first = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    // tx hash was mined
    first.remoteDeploymentId = 'abc';
    const second = await (0, deployment_1.resumeOrDeploy)(provider, first, provider.deployPending, undefined, undefined, undefined, undefined, getDeploymentResponse);
    t.is(second.address, first.address);
    t.is(second.txHash, first.txHash);
    t.is(second.remoteDeploymentId, first.remoteDeploymentId);
    t.is(provider.deployCount, 1);
    await (0, deployment_1.waitAndValidateDeployment)(provider, second);
    t.is(provider.getMethodCount('eth_getTransactionReceipt'), 1);
});
(0, ava_1.default)('platform - errors if tx and deployment id are not found', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const getDeploymentResponse = sinon_1.default.stub().returns(undefined);
    const fakeDeployment = {
        address: '0x1aec6468218510f19bb19f52c4767996895ce711',
        txHash: '0xc48e21ac9c051922f5ccf1b47b62000f567ef9bbc108d274848b44351a6872cb',
        remoteDeploymentId: 'abc',
    };
    await t.throwsAsync((0, deployment_1.resumeOrDeploy)(provider, fakeDeployment, provider.deploy, undefined, undefined, undefined, undefined, getDeploymentResponse));
    t.true(getDeploymentResponse.calledOnceWithExactly('abc'));
});
(0, ava_1.default)('platform - waits for a deployment to be completed', async (t) => {
    const timeout = Symbol('timeout');
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await provider.deployPending();
    deployment.remoteDeploymentId = 'abc';
    provider.removeContract(deployment.address);
    const getDeploymentResponse = sinon_1.default.stub();
    getDeploymentResponse.onCall(0).returns({
        status: 'submitted',
        txHash: deployment.txHash,
    });
    getDeploymentResponse.onCall(1).returns({
        status: 'completed',
        txHash: deployment.txHash,
    });
    // checks that status is completed but code not at address yet
    const result = await Promise.race([
        (0, deployment_1.waitAndValidateDeployment)(provider, deployment, undefined, { pollingInterval: 0 }, getDeploymentResponse),
        sleep(100).then(() => timeout),
    ]);
    t.is(result, timeout);
    t.is(getDeploymentResponse.callCount, 2);
    // code mined to address
    provider.addContract(deployment.address);
    provider.mine();
    // checks that the code is at address
    await (0, deployment_1.waitAndValidateDeployment)(provider, deployment, undefined, { pollingInterval: 0 }, getDeploymentResponse);
    t.is(getDeploymentResponse.callCount, 2);
});
(0, ava_1.default)('platform - fails deployment fast if deployment id failed', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const getDeploymentResponse = sinon_1.default.stub().returns({
        status: 'failed',
        txHash: '0x2',
    });
    const fakeDeployment = {
        address: '0x1aec6468218510f19bb19f52c4767996895ce711',
        txHash: '0xc48e21ac9c051922f5ccf1b47b62000f567ef9bbc108d274848b44351a6872cb',
        remoteDeploymentId: 'abc',
    };
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, fakeDeployment, provider.deployPending, undefined, undefined, undefined, undefined, getDeploymentResponse);
    t.true(getDeploymentResponse.calledOnceWithExactly('abc'));
    await t.throwsAsync((0, deployment_1.waitAndValidateDeployment)(provider, deployment, undefined, undefined, getDeploymentResponse));
});
(0, ava_1.default)('platform - deployment id timeout - no params', async (t) => {
    const fakeDeployment = {
        address: '0x1aec6468218510f19bb19f52c4767996895ce711',
        txHash: '0xc48e21ac9c051922f5ccf1b47b62000f567ef9bbc108d274848b44351a6872cb',
        remoteDeploymentId: 'abc',
    };
    try {
        throw new _1.TransactionMinedTimeout(fakeDeployment);
    }
    catch (e) {
        const EXPECTED = /Timed out waiting for contract deployment to address \S+ with deployment id abc\n\nRun the function again to continue waiting for the transaction confirmation./;
        t.true(EXPECTED.test(e.message), e.message);
    }
});
(0, ava_1.default)('platform - deployment id timeout - params', async (t) => {
    const fakeDeployment = {
        address: '0x1aec6468218510f19bb19f52c4767996895ce711',
        txHash: '0xc48e21ac9c051922f5ccf1b47b62000f567ef9bbc108d274848b44351a6872cb',
        remoteDeploymentId: 'abc',
    };
    try {
        throw new _1.TransactionMinedTimeout(fakeDeployment, 'implementation', true);
    }
    catch (e) {
        const EXPECTED = /Timed out waiting for implementation contract deployment to address \S+ with deployment id abc+\n\nRun the function again to continue waiting for the transaction confirmation. If the problem persists, adjust the polling parameters with the timeout and pollingInterval options./;
        t.true(EXPECTED.test(e.message), e.message);
    }
});
//# sourceMappingURL=deployment.test.js.map