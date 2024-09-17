import { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory } from 'ethers';
import { DeployTransaction, Platform } from '.';
import { Deployment, RemoteDeploymentId, DeployOpts } from '@openzeppelin/upgrades-core';
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
export declare function getContractInstance(hre: HardhatRuntimeEnvironment, contract: ContractFactory, opts: DeployOpts & Platform, deployment: Deployment & DeployTransaction & RemoteDeploymentId): import("ethers").Contract;
//# sourceMappingURL=contract-instance.d.ts.map