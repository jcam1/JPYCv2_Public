import { StorageLayout, ValidationDataCurrent, ValidationOptions, Version } from '@openzeppelin/upgrades-core';
import type { ContractFactory, ethers } from 'ethers';
import type { EthereumProvider, HardhatRuntimeEnvironment } from 'hardhat/types';
import { StandaloneOptions, UpgradeOptions } from './options';
export interface DeployedImpl {
    impl: string;
    txResponse?: ethers.providers.TransactionResponse;
}
export interface DeployedProxyImpl extends DeployedImpl {
    kind: NonNullable<ValidationOptions['kind']>;
}
export interface DeployData {
    provider: EthereumProvider;
    validations: ValidationDataCurrent;
    unlinkedBytecode: string;
    encodedArgs: string;
    version: Version;
    layout: StorageLayout;
    fullOpts: Required<UpgradeOptions>;
}
export declare function getDeployData(hre: HardhatRuntimeEnvironment, ImplFactory: ContractFactory, opts: UpgradeOptions): Promise<DeployData>;
export declare function deployUpgradeableImpl(hre: HardhatRuntimeEnvironment, ImplFactory: ContractFactory, opts: StandaloneOptions, currentImplAddress?: string): Promise<DeployedImpl>;
export declare function deployProxyImpl(hre: HardhatRuntimeEnvironment, ImplFactory: ContractFactory, opts: UpgradeOptions, proxyAddress?: string): Promise<DeployedProxyImpl>;
export declare function deployBeaconImpl(hre: HardhatRuntimeEnvironment, ImplFactory: ContractFactory, opts: UpgradeOptions, beaconAddress?: string): Promise<DeployedImpl>;
//# sourceMappingURL=deploy-impl.d.ts.map