import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { RemoteDeployment, DeployOpts } from '@openzeppelin/upgrades-core';
import { Network } from '@openzeppelin/defender-base-client';
import { BlockExplorerApiKeyClient, DeploymentClient, DeploymentConfigClient, PlatformClient, UpgradeClient } from '@openzeppelin/platform-deploy-client';
import { HardhatPlatformConfig } from '../type-extensions';
import { Platform } from '../utils';
export declare function getPlatformApiKey(hre: HardhatRuntimeEnvironment): HardhatPlatformConfig;
export declare function getNetwork(hre: HardhatRuntimeEnvironment): Promise<Network>;
export declare function enablePlatform<T extends Platform>(hre: HardhatRuntimeEnvironment, platformModule: boolean, opts: T): T;
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
export declare function disablePlatform(hre: HardhatRuntimeEnvironment, platformModule: boolean, opts: Platform, unsupportedFunction: string): void;
interface PlatformClient {
    Deployment: DeploymentClient;
    DeploymentConfig: DeploymentConfigClient;
    BlockExplorerApiKey: BlockExplorerApiKeyClient;
    Upgrade: UpgradeClient;
}
export declare function getPlatformClient(hre: HardhatRuntimeEnvironment): PlatformClient;
/**
 * Gets the remote deployment response for the given id.
 *
 * @param hre The Hardhat runtime environment
 * @param remoteDeploymentId The deployment id.
 * @returns The remote deployment response, or undefined if the deployment is not found.
 * @throws Error if the deployment response could not be retrieved.
 */
export declare function getRemoteDeployment(hre: HardhatRuntimeEnvironment, remoteDeploymentId: string): Promise<RemoteDeployment | undefined>;
/**
 * Waits indefinitely for the deployment until it is completed or failed.
 * Returns the last known transaction hash seen from the remote deployment, or undefined if the remote deployment was not retrieved.
 */
export declare function waitForDeployment(hre: HardhatRuntimeEnvironment, opts: DeployOpts, address: string, remoteDeploymentId: string): Promise<string | undefined>;
export {};
//# sourceMappingURL=utils.d.ts.map