import type { Deployment, RemoteDeploymentId } from '@openzeppelin/upgrades-core';
import type { ethers, ContractFactory } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { PlatformDeployOptions, UpgradeOptions } from './options';
export interface DeployTransaction {
    deployTransaction: ethers.providers.TransactionResponse;
}
export declare function deploy(hre: HardhatRuntimeEnvironment, opts: UpgradeOptions & PlatformDeployOptions, factory: ContractFactory, ...args: unknown[]): Promise<Required<Deployment & DeployTransaction> & RemoteDeploymentId>;
//# sourceMappingURL=deploy.d.ts.map