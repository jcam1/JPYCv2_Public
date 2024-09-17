"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractInstance = void 0;
const assert_1 = __importDefault(require("assert"));
const utils_1 = require("../platform/utils");
/**
 * Gets a contract instance from a deployment, where the deployment may be remote.
 * If the deployment is remote, the instance have an overriden `deployed` method to wait for the remote deployment
 * and update its `deployTransaction` with the new transaction hash if it was detected to have changed.
 *
 * @param hre The Hardhat Runtime Environment
 * @param contract The contract factory
 * @param opts The deploy and platform options
 * @param deployment The deployment
 * @param deployTransaction The transaction that deployed the contract, if available
 * @returns The contract instance
 */
function getContractInstance(hre, contract, opts, deployment) {
    const instance = contract.attach(deployment.address);
    // @ts-ignore Won't be readonly because instance was created through attach.
    instance.deployTransaction = deployment.deployTransaction;
    if (opts.usePlatformDeploy && deployment.remoteDeploymentId !== undefined) {
        const origDeployed = instance.deployed.bind(instance);
        instance.deployed = async () => {
            (0, assert_1.default)(deployment.remoteDeploymentId !== undefined);
            const updatedTxHash = await (0, utils_1.waitForDeployment)(hre, opts, instance.address, deployment.remoteDeploymentId);
            if (updatedTxHash !== undefined && updatedTxHash !== deployment.txHash) {
                // @ts-ignore Won't be readonly because instance was created through attach.
                instance.deployTransaction = await hre.ethers.provider.getTransaction(updatedTxHash);
            }
            return await origDeployed();
        };
    }
    return instance;
}
exports.getContractInstance = getContractInstance;
//# sourceMappingURL=contract-instance.js.map