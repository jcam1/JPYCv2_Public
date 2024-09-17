import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ContractFactory } from 'ethers';
import { ContractAddressOrInstance } from './utils';
import { ValidationOptions } from '@openzeppelin/upgrades-core';
export interface ValidateUpgradeFunction {
    (origImplFactory: ContractFactory, newImplFactory: ContractFactory, opts?: ValidationOptions): Promise<void>;
    (proxyOrBeaconAddress: ContractAddressOrInstance, newImplFactory: ContractFactory, opts?: ValidationOptions): Promise<void>;
}
export declare function makeValidateUpgrade(hre: HardhatRuntimeEnvironment): ValidateUpgradeFunction;
//# sourceMappingURL=validate-upgrade.d.ts.map