"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeployment = deleteDeployment;
exports.fetchOrDeploy = fetchOrDeploy;
exports.fetchOrDeployGetDeployment = fetchOrDeployGetDeployment;
exports.mergeAddresses = mergeAddresses;
exports.fetchOrDeployAdmin = fetchOrDeployAdmin;
const debug_1 = __importDefault(require("./utils/debug"));
const manifest_1 = require("./manifest");
const provider_1 = require("./provider");
const deployment_1 = require("./deployment");
const assert_1 = __importDefault(require("assert"));
/**
 * Fetches the deployment from the manifest, or deploys it if not found.
 *
 * @param lens the manifest lens
 * @param provider the Ethereum provider
 * @param deploy the deploy function
 * @param opts options containing the timeout and pollingInterval parameters. If undefined, assumes the timeout is not configurable and will not mention those parameters in the error message for TransactionMinedTimeout.
 * @param merge if true, adds a deployment to existing deployment by merging their addresses. Defaults to false.
 * @param getRemoteDeployment a function to get the remote deployment status by id. If the deployment id is not found, returns undefined.
 * @returns the deployment
 * @throws {InvalidDeployment} if the deployment is invalid
 * @throws {TransactionMinedTimeout} if the transaction was not confirmed within the timeout period
 */
async function fetchOrDeployGeneric(lens, provider, deploy, opts, merge, getRemoteDeployment) {
    const manifest = await manifest_1.Manifest.forNetwork(provider);
    try {
        const deployment = await manifest.lockedRun(async () => {
            (0, debug_1.default)('fetching deployment of', lens.description);
            const data = await manifest.read();
            const deployment = lens(data);
            if (merge && !deployment.merge) {
                throw new Error('fetchOrDeployGeneric was called with merge set to true but the deployment lens does not have a merge function');
            }
            const stored = deployment.get();
            const updated = await (0, deployment_1.resumeOrDeploy)(provider, stored, deploy, lens.type, opts, deployment, merge, getRemoteDeployment);
            if (updated !== stored) {
                if (merge && deployment.merge) {
                    await checkForAddressClash(provider, data, updated, true);
                    deployment.merge(updated);
                }
                else {
                    await checkForAddressClash(provider, data, updated, false);
                    deployment.set(updated);
                }
                await manifest.write(data);
            }
            return updated;
        });
        await (0, deployment_1.waitAndValidateDeployment)(provider, deployment, lens.type, opts, getRemoteDeployment);
        return deployment;
    }
    catch (e) {
        // If we run into a deployment error, we remove it from the manifest.
        if (e instanceof deployment_1.InvalidDeployment) {
            await manifest.lockedRun(async () => {
                (0, assert_1.default)(e instanceof deployment_1.InvalidDeployment); // Not sure why this is needed but otherwise doesn't type
                const data = await manifest.read();
                const deployment = lens(data);
                const stored = deployment.get();
                if (stored?.txHash === e.deployment.txHash) {
                    deployment.set(undefined);
                    await manifest.write(data);
                }
            });
            e.removed = true;
        }
        throw e;
    }
}
/**
 * Deletes the deployment by setting it to undefined.
 * Should only be used during a manifest run.
 */
function deleteDeployment(deployment) {
    deployment.set(undefined);
}
/**
 * Fetches the deployment address from the manifest, or deploys it if not found and returns the address.
 *
 * @param version the contract version
 * @param provider the Ethereum provider
 * @param deploy the deploy function
 * @param opts options containing the timeout and pollingInterval parameters. If undefined, assumes the timeout is not configurable and will not mention those parameters in the error message for TransactionMinedTimeout.
 * @param merge if true, adds a deployment to existing deployment by merging their addresses. Defaults to false.
 * @returns the deployment address
 * @throws {InvalidDeployment} if the deployment is invalid
 * @throws {TransactionMinedTimeout} if the transaction was not confirmed within the timeout period
 */
async function fetchOrDeploy(version, provider, deploy, opts, merge) {
    return (await fetchOrDeployGeneric(implLens(version.linkedWithoutMetadata), provider, deploy, opts, merge)).address;
}
/**
 * Fetches the deployment from the manifest, or deploys it if not found and returns the deployment.
 *
 * @param version the contract version
 * @param provider the Ethereum provider
 * @param deploy the deploy function
 * @param opts options containing the timeout and pollingInterval parameters. If undefined, assumes the timeout is not configurable and will not mention those parameters in the error message for TransactionMinedTimeout.
 * @param merge if true, adds a deployment to existing deployment by merging their addresses. Defaults to false.
 * @param getRemoteDeployment a function to get the remote deployment status by id. If the deployment id is not found, returns undefined.
 * @returns the deployment
 * @throws {InvalidDeployment} if the deployment is invalid
 * @throws {TransactionMinedTimeout} if the transaction was not confirmed within the timeout period
 */
async function fetchOrDeployGetDeployment(version, provider, deploy, opts, merge, getRemoteDeployment) {
    return fetchOrDeployGeneric(implLens(version.linkedWithoutMetadata), provider, deploy, opts, merge, getRemoteDeployment);
}
const implLens = (versionWithoutMetadata) => lens(`implementation ${versionWithoutMetadata}`, 'implementation', data => ({
    get: () => data.impls[versionWithoutMetadata],
    set: (value) => (data.impls[versionWithoutMetadata] = value),
    merge: (value) => {
        const existing = data.impls[versionWithoutMetadata];
        if (existing !== undefined && value !== undefined) {
            const { address, allAddresses } = mergeAddresses(existing, value);
            data.impls[versionWithoutMetadata] = {
                ...existing,
                address,
                allAddresses,
                remoteDeploymentId: value.remoteDeploymentId,
            };
        }
        else {
            data.impls[versionWithoutMetadata] = value;
        }
    },
}));
/**
 * Merge the addresses in the deployments and returns them.
 *
 * @param existing existing deployment
 * @param value deployment to add
 */
function mergeAddresses(existing, value) {
    const merged = new Set();
    merged.add(existing.address);
    merged.add(value.address);
    existing.allAddresses?.forEach(item => merged.add(item));
    value.allAddresses?.forEach(item => merged.add(item));
    return { address: existing.address, allAddresses: Array.from(merged) };
}
async function fetchOrDeployAdmin(provider, deploy, opts) {
    return (await fetchOrDeployGeneric(adminLens, provider, deploy, opts)).address;
}
const adminLens = lens('proxy admin', 'proxy admin', data => ({
    get: () => data.admin,
    set: (value) => (data.admin = value),
}));
function lens(description, type, fn) {
    return Object.assign(fn, { description, type });
}
async function checkForAddressClash(provider, data, updated, merge) {
    let clash;
    const findClash = () => lookupDeployment(data, updated.address, !merge);
    if (await (0, provider_1.isDevelopmentNetwork)(provider)) {
        // Look for clashes so that we can delete deployments from older runs.
        // `merge` only checks primary addresses for clashes, since the address could already exist in an allAddresses field
        // but the updated and stored objects are different instances representing the same entry.
        clash = findClash();
        if (clash !== undefined) {
            (0, debug_1.default)('deleting a previous deployment at address', updated.address);
            clash.set(undefined);
        }
    }
    else if (!merge) {
        clash = findClash();
        if (clash !== undefined) {
            const existing = clash.get();
            // it's a clash if there is no deployment id or if deployment ids don't match
            if (existing !== undefined &&
                (existing.remoteDeploymentId === undefined || existing.remoteDeploymentId !== updated.remoteDeploymentId)) {
                throw new Error(`The deployment clashes with an existing one at ${updated.address}.\n\n` +
                    `Deployments: ${JSON.stringify({ existing, updated }, null, 2)}\n\n`);
            }
        }
    } // else, merge indicates that the user is force-importing or redeploying an implementation, so we simply allow merging the entries
}
function lookupDeployment(data, address, checkAllAddresses) {
    if (data.admin?.address === address) {
        return adminLens(data);
    }
    for (const versionWithoutMetadata in data.impls) {
        if (data.impls[versionWithoutMetadata]?.address === address ||
            (checkAllAddresses && data.impls[versionWithoutMetadata]?.allAddresses?.includes(address))) {
            return implLens(versionWithoutMetadata)(data);
        }
    }
}
//# sourceMappingURL=impl-store.js.map