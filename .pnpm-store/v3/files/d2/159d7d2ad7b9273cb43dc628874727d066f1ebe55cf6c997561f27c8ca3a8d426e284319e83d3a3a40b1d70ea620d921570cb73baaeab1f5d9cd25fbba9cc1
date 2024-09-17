"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDeployment = exports.TransactionMinedTimeout = void 0;
exports.resumeOrDeploy = resumeOrDeploy;
exports.waitAndValidateDeployment = waitAndValidateDeployment;
exports.isDeploymentCompleted = isDeploymentCompleted;
const util_1 = require("util");
const debug_1 = __importDefault(require("./utils/debug"));
const make_non_enumerable_1 = require("./utils/make-non-enumerable");
const provider_1 = require("./provider");
const error_1 = require("./error");
const impl_store_1 = require("./impl-store");
const sleep = (0, util_1.promisify)(setTimeout);
/**
 * Resumes a deployment or deploys a new one, based on whether the cached deployment should continue to be used and is valid
 * (has a valid txHash for the current network or has runtime bytecode).
 * If a cached deployment is not valid, deletes it if using a development network, otherwise throws an InvalidDeployment error.
 *
 * @param provider the Ethereum provider
 * @param cached the cached deployment
 * @param deploy the function to deploy a new deployment if needed
 * @param type the manifest lens type. If merge is true, used for the timeout message if a previous deployment is not
 *   confirmed within the timeout period. Otherwise not used.
 * @param opts polling timeout and interval options. If merge is true, used to check a previous deployment for confirmation.
 *   Otherwise not used.
 * @param deployment the manifest field for this deployment. Optional for backward compatibility.
 *   If not provided, invalid deployments will not be deleted in a dev network (which is not a problem if merge is false,
 *   since it will be overwritten with the new deployment).
 * @param merge whether the cached deployment is intended to be merged with the new deployment. Defaults to false.
 * @param getRemoteDeployment a function to get the remote deployment status by id. If the deployment id is not found, returns undefined.
 * @returns the cached deployment if it should be used, otherwise the new deployment from the deploy function
 * @throws {InvalidDeployment} if the cached deployment is invalid and we are not on a dev network
 */
async function resumeOrDeploy(provider, cached, deploy, type, opts, deployment, merge, getRemoteDeployment) {
    const validated = await validateCached(cached, provider, type, opts, deployment, merge, getRemoteDeployment);
    if (validated === undefined || merge) {
        const deployment = await deploy();
        (0, debug_1.default)('initiated deployment', 'transaction hash:', deployment.txHash, 'merge:', merge);
        return deployment;
    }
    else {
        return validated;
    }
}
async function validateCached(cached, provider, type, opts, deployment, merge, getRemoteDeployment) {
    if (cached !== undefined) {
        try {
            return await validateStoredDeployment(cached, provider, type, opts, merge, getRemoteDeployment);
        }
        catch (e) {
            if (e instanceof InvalidDeployment && (await (0, provider_1.isDevelopmentNetwork)(provider))) {
                (0, debug_1.default)('ignoring invalid deployment in development network', e.deployment.address);
                if (deployment !== undefined) {
                    (0, impl_store_1.deleteDeployment)(deployment);
                }
                return undefined;
            }
            else {
                throw e;
            }
        }
    }
    else {
        return undefined;
    }
}
async function validateStoredDeployment(stored, provider, type, opts, merge, getRemoteDeployment) {
    const { txHash, remoteDeploymentId } = stored;
    let deployment = stored;
    if (txHash !== undefined) {
        // If there is a deployment with txHash stored, we look its transaction up. If the
        // transaction is found, the deployment is reused.
        (0, debug_1.default)('found previous deployment', txHash);
        const tx = await (0, provider_1.getTransactionByHash)(provider, txHash);
        let foundDeployment = undefined;
        if (tx !== null) {
            foundDeployment = txHash;
        }
        else if (remoteDeploymentId !== undefined && getRemoteDeployment !== undefined) {
            // If the transaction is not found, try checking the deployment id since the transaction may have been replaced
            const response = await getRemoteDeployment(remoteDeploymentId);
            if (response !== undefined) {
                foundDeployment = remoteDeploymentId;
                // update the stored tx hash
                deployment = { ...stored, txHash: response.txHash };
                (0, debug_1.default)('updating previous deployment to tx hash ', response.txHash);
            }
        }
        if (foundDeployment) {
            (0, debug_1.default)('resuming previous deployment', foundDeployment);
            if (merge) {
                // If merging, wait for the existing deployment to be mined
                waitAndValidateDeployment(provider, deployment, type, opts, getRemoteDeployment);
            }
        }
        else {
            // If the transaction is not found we throw an error, except if we're in
            // a development network then we simply silently redeploy.
            // This error should be caught by the caller to determine if we're in a dev network.
            throw new InvalidDeployment(deployment);
        }
    }
    else {
        const existingBytecode = await (0, provider_1.getCode)(provider, deployment.address);
        if ((0, provider_1.isEmpty)(existingBytecode)) {
            throw new InvalidDeployment(deployment);
        }
    }
    return deployment;
}
async function waitAndValidateDeployment(provider, deployment, type, opts, getRemoteDeployment) {
    const { txHash, address, remoteDeploymentId } = deployment;
    // Poll for 60 seconds with a 5 second poll interval by default.
    const pollTimeout = opts?.timeout ?? 60e3;
    const pollInterval = opts?.pollingInterval ?? 5e3;
    (0, debug_1.default)('polling timeout', pollTimeout, 'polling interval', pollInterval);
    let foundCode = false;
    if (remoteDeploymentId !== undefined && getRemoteDeployment !== undefined) {
        const startTime = Date.now();
        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (await (0, provider_1.hasCode)(provider, address)) {
                (0, debug_1.default)('code in target address found', address);
                foundCode = true;
                break;
            }
            const completed = await isDeploymentCompleted(address, remoteDeploymentId, await getRemoteDeployment(remoteDeploymentId));
            if (completed) {
                break;
            }
            else {
                await sleep(pollInterval);
            }
            if (pollTimeout != 0) {
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime >= pollTimeout) {
                    // A timeout is NOT an InvalidDeployment
                    throw new TransactionMinedTimeout(deployment, type, !!opts);
                }
            }
        }
    }
    else if (txHash !== undefined) {
        const startTime = Date.now();
        // eslint-disable-next-line no-constant-condition
        while (true) {
            (0, debug_1.default)('verifying deployment tx mined', txHash);
            const receipt = await (0, provider_1.getTransactionReceipt)(provider, txHash);
            if (receipt && (0, provider_1.isReceiptSuccessful)(receipt)) {
                (0, debug_1.default)('succeeded verifying deployment tx mined', txHash);
                break;
            }
            else if (receipt) {
                (0, debug_1.default)('tx was reverted', txHash);
                throw new InvalidDeployment(deployment);
            }
            else {
                (0, debug_1.default)('waiting for deployment tx mined', txHash);
                await sleep(pollInterval);
            }
            if (pollTimeout != 0) {
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime >= pollTimeout) {
                    // A timeout is NOT an InvalidDeployment
                    throw new TransactionMinedTimeout(deployment, type, !!opts);
                }
            }
        }
    }
    if (!foundCode) {
        (0, debug_1.default)('verifying code in target address', address);
        const startTime = Date.now();
        while (!(await (0, provider_1.hasCode)(provider, address))) {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime >= pollTimeout || txHash === undefined) {
                throw new InvalidDeployment(deployment);
            }
            await sleep(pollInterval);
        }
        (0, debug_1.default)('code in target address found', address);
    }
}
class TransactionMinedTimeout extends error_1.UpgradesError {
    constructor(deployment, type, configurableTimeout) {
        super(`Timed out waiting for ${type ? type + ' ' : ''}contract deployment to address ${deployment.address} with ${deployment.remoteDeploymentId
            ? `deployment id ${deployment.remoteDeploymentId}`
            : `transaction ${deployment.txHash}`}`, () => 'Run the function again to continue waiting for the transaction confirmation.' +
            (configurableTimeout
                ? ' If the problem persists, adjust the polling parameters with the timeout and pollingInterval options.'
                : ''));
        this.deployment = deployment;
    }
}
exports.TransactionMinedTimeout = TransactionMinedTimeout;
class InvalidDeployment extends Error {
    constructor(deployment) {
        super();
        this.deployment = deployment;
        this.removed = false;
        // This hides the properties from the error when it's printed.
        (0, make_non_enumerable_1.makeNonEnumerable)(this, 'removed');
        (0, make_non_enumerable_1.makeNonEnumerable)(this, 'deployment');
    }
    get message() {
        let msg = `No contract at address ${this.deployment.address}`;
        if (this.removed) {
            msg += ' (Removed from manifest)';
        }
        return msg;
    }
}
exports.InvalidDeployment = InvalidDeployment;
/**
 * Checks if the deployment id is completed.
 *
 * @param address The expected address of the deployment.
 * @param remoteDeploymentId The deployment id.
 * @param remoteDeploymentResponse The remote deployment response corresponding to the given id.
 * @returns true if the deployment id is completed, false otherwise.
 * @throws {InvalidDeployment} if the deployment id failed.
 */
async function isDeploymentCompleted(address, remoteDeploymentId, remoteDeploymentResponse) {
    (0, debug_1.default)('verifying deployment id', remoteDeploymentId);
    if (remoteDeploymentResponse === undefined) {
        throw new Error(`Could not find remote deployment with id ${remoteDeploymentId}`);
    }
    const status = remoteDeploymentResponse.status;
    if (status === 'completed') {
        (0, debug_1.default)('succeeded verifying deployment id completed', remoteDeploymentId);
        return true;
    }
    else if (status === 'failed') {
        (0, debug_1.default)(`deployment id ${remoteDeploymentId} failed with tx hash ${remoteDeploymentResponse.txHash}`);
        throw new InvalidDeployment({ address, txHash: remoteDeploymentResponse.txHash });
    }
    else if (status === 'submitted') {
        (0, debug_1.default)('waiting for deployment id to be completed', remoteDeploymentId);
        return false;
    }
    else {
        throw new Error(`Broken invariant: Unrecognized status ${status} for deployment id ${remoteDeploymentId}`);
    }
}
//# sourceMappingURL=deployment.js.map