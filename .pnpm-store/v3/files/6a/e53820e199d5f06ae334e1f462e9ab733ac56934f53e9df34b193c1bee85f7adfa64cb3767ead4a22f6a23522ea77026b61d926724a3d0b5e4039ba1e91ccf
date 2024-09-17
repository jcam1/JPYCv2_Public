import { ImplDeployment } from './manifest';
import { EthereumProvider } from './provider';
import { Deployment, RemoteDeployment } from './deployment';
import { Version } from './version';
import { DeployOpts } from '.';
export interface ManifestField<T> {
    get(): T | undefined;
    set(value: T | undefined): void;
    merge?(value: T | undefined): void;
}
/**
 * Deletes the deployment by setting it to undefined.
 * Should only be used during a manifest run.
 */
export declare function deleteDeployment(deployment: ManifestField<Deployment>): void;
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
export declare function fetchOrDeploy(version: Version, provider: EthereumProvider, deploy: () => Promise<ImplDeployment>, opts?: DeployOpts, merge?: boolean): Promise<string>;
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
export declare function fetchOrDeployGetDeployment<T extends ImplDeployment>(version: Version, provider: EthereumProvider, deploy: () => Promise<T>, opts?: DeployOpts, merge?: boolean, getRemoteDeployment?: (remoteDeploymentId: string) => Promise<RemoteDeployment | undefined>): Promise<T | Deployment>;
/**
 * Merge the addresses in the deployments and returns them.
 *
 * @param existing existing deployment
 * @param value deployment to add
 */
export declare function mergeAddresses(existing: ImplDeployment, value: ImplDeployment): {
    address: string;
    allAddresses: string[];
};
export declare function fetchOrDeployAdmin(provider: EthereumProvider, deploy: () => Promise<Deployment>, opts?: DeployOpts): Promise<string>;
//# sourceMappingURL=impl-store.d.ts.map