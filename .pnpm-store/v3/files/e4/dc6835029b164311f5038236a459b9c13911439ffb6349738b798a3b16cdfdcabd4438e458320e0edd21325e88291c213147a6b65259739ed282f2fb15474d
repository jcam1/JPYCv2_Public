import { EthereumProvider } from './provider';
import { UpgradesError } from './error';
import { ManifestField } from './impl-store';
export interface Deployment {
    address: string;
    txHash?: string;
}
export interface RemoteDeploymentId {
    remoteDeploymentId?: string;
}
/**
 * Options for deploying an implementation contract, proxy admin contract, or remote deployment.
 */
export interface DeployOpts {
    /**
     * Timeout in milliseconds to wait for the transaction confirmation when deploying an implementation contract or proxy admin contract. Use `0` to wait indefinitely.
     */
    timeout?: number;
    /**
     * Polling interval in milliseconds between checks for the transaction confirmation when deploying an implementation contract or proxy admin contract.
     */
    pollingInterval?: number;
}
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
export declare function resumeOrDeploy<T extends Deployment, U extends T = T>(provider: EthereumProvider, cached: T | undefined, deploy: () => Promise<U>, type?: string, opts?: DeployOpts, deployment?: ManifestField<T>, merge?: boolean, getRemoteDeployment?: (remoteDeploymentId: string) => Promise<RemoteDeployment | undefined>): Promise<T | U>;
/**
 * A deployment that is performed remotely, which has a status and transaction hash.
 */
export interface RemoteDeployment {
    status: 'completed' | 'failed' | 'submitted';
    txHash: string;
}
export declare function waitAndValidateDeployment(provider: EthereumProvider, deployment: Deployment & RemoteDeploymentId, type?: string, opts?: DeployOpts, getRemoteDeployment?: (remoteDeploymentId: string) => Promise<RemoteDeployment | undefined>): Promise<void>;
export declare class TransactionMinedTimeout extends UpgradesError {
    readonly deployment: Deployment & RemoteDeploymentId;
    constructor(deployment: Deployment & RemoteDeploymentId, type?: string, configurableTimeout?: boolean);
}
export declare class InvalidDeployment extends Error {
    readonly deployment: Deployment;
    removed: boolean;
    constructor(deployment: Deployment);
    get message(): string;
}
/**
 * Checks if the deployment id is completed.
 *
 * @param address The expected address of the deployment.
 * @param remoteDeploymentId The deployment id.
 * @param remoteDeploymentResponse The remote deployment response corresponding to the given id.
 * @returns true if the deployment id is completed, false otherwise.
 * @throws {InvalidDeployment} if the deployment id failed.
 */
export declare function isDeploymentCompleted(address: string, remoteDeploymentId: string, remoteDeploymentResponse: RemoteDeployment | undefined): Promise<boolean>;
//# sourceMappingURL=deployment.d.ts.map