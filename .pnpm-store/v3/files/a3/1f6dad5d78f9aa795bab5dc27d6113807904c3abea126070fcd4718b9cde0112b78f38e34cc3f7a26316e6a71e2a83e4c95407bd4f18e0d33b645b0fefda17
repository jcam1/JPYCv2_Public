"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForDeployment = exports.getRemoteDeployment = exports.getPlatformClient = exports.disablePlatform = exports.enablePlatform = exports.getNetwork = exports.getPlatformApiKey = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const defender_base_client_1 = require("@openzeppelin/defender-base-client");
const platform_deploy_client_1 = require("@openzeppelin/platform-deploy-client");
const debug_1 = __importDefault(require("../utils/debug"));
const util_1 = require("util");
const sleep = (0, util_1.promisify)(setTimeout);
function getPlatformApiKey(hre) {
    const cfg = hre.config.platform;
    if (!cfg || !cfg.apiKey || !cfg.apiSecret) {
        const sampleConfig = JSON.stringify({ apiKey: 'YOUR_API_KEY', apiSecret: 'YOUR_API_SECRET' }, null, 2);
        throw new Error(`Missing OpenZeppelin Platform API key and secret in hardhat config. Add the following to your hardhat.config.js configuration:\nplatform: ${sampleConfig}\n`);
    }
    return cfg;
}
exports.getPlatformApiKey = getPlatformApiKey;
async function getNetwork(hre) {
    const { provider } = hre.network;
    const chainId = hre.network.config.chainId ?? (await (0, upgrades_core_1.getChainId)(provider));
    const network = (0, defender_base_client_1.fromChainId)(chainId);
    if (network === undefined) {
        throw new Error(`Network ${chainId} is not supported by the OpenZeppelin Platform`);
    }
    return network;
}
exports.getNetwork = getNetwork;
function enablePlatform(hre, platformModule, opts) {
    if ((hre.config.platform?.usePlatformDeploy || platformModule) && opts.usePlatformDeploy === undefined) {
        return {
            ...opts,
            usePlatformDeploy: true,
        };
    }
    else {
        return opts;
    }
}
exports.enablePlatform = enablePlatform;
/**
 * Disables Platform for a function that does not support it.
 * If opts.usePlatformDeploy or platformModule is true, throws an error.
 * If hre.config.platform.usePlatformDeploy is true, logs a debug message and passes (to allow fallback to Hardhat signer).
 *
 * @param hre The Hardhat runtime environment
 * @param platformModule Whether the function was called from the platform module
 * @param opts The options passed to the function
 * @param unsupportedFunction The name of the function that does not support Platform
 */
function disablePlatform(hre, platformModule, opts, unsupportedFunction) {
    if (opts.usePlatformDeploy) {
        throw new upgrades_core_1.UpgradesError(`The function ${unsupportedFunction} is not supported with the \`usePlatformDeploy\` option.`);
    }
    else if (platformModule) {
        throw new upgrades_core_1.UpgradesError(`The function ${unsupportedFunction} is not supported with the \`platform\` module.`, () => `Call the function as upgrades.${unsupportedFunction} to use the Hardhat signer.`);
    }
    else if (hre.config.platform?.usePlatformDeploy) {
        (0, debug_1.default)(`The function ${unsupportedFunction} is not supported with the \`platform.usePlatformDeploy\` configuration option. Using the Hardhat signer instead.`);
    }
}
exports.disablePlatform = disablePlatform;
function getPlatformClient(hre) {
    return (0, platform_deploy_client_1.PlatformClient)(getPlatformApiKey(hre));
}
exports.getPlatformClient = getPlatformClient;
/**
 * Gets the remote deployment response for the given id.
 *
 * @param hre The Hardhat runtime environment
 * @param remoteDeploymentId The deployment id.
 * @returns The remote deployment response, or undefined if the deployment is not found.
 * @throws Error if the deployment response could not be retrieved.
 */
async function getRemoteDeployment(hre, remoteDeploymentId) {
    const client = getPlatformClient(hre);
    try {
        return (await client.Deployment.get(remoteDeploymentId));
    }
    catch (e) {
        const message = e.response?.data?.message;
        if (message?.match(/deployment with id .* not found\./)) {
            return undefined;
        }
        throw e;
    }
}
exports.getRemoteDeployment = getRemoteDeployment;
/**
 * Waits indefinitely for the deployment until it is completed or failed.
 * Returns the last known transaction hash seen from the remote deployment, or undefined if the remote deployment was not retrieved.
 */
async function waitForDeployment(hre, opts, address, remoteDeploymentId) {
    const pollInterval = opts.pollingInterval ?? 5e3;
    let lastKnownTxHash;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (await (0, upgrades_core_1.hasCode)(hre.ethers.provider, address)) {
            (0, debug_1.default)('code in target address found', address);
            break;
        }
        const response = await getRemoteDeployment(hre, remoteDeploymentId);
        lastKnownTxHash = response?.txHash;
        const completed = await (0, upgrades_core_1.isDeploymentCompleted)(address, remoteDeploymentId, response);
        if (completed) {
            break;
        }
        else {
            await sleep(pollInterval);
        }
    }
    return lastKnownTxHash;
}
exports.waitForDeployment = waitForDeployment;
//# sourceMappingURL=utils.js.map