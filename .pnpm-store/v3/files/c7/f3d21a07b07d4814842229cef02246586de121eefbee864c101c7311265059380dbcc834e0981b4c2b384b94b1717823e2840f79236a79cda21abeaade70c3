import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Contract, ContractFactory } from 'ethers';
import { DeployBeaconProxyOptions, ContractAddressOrInstance } from './utils';
export interface DeployBeaconProxyFunction {
    (beacon: ContractAddressOrInstance, attachTo: ContractFactory, args?: unknown[], opts?: DeployBeaconProxyOptions): Promise<Contract>;
    (beacon: ContractAddressOrInstance, attachTo: ContractFactory, opts?: DeployBeaconProxyOptions): Promise<Contract>;
}
export declare function makeDeployBeaconProxy(hre: HardhatRuntimeEnvironment, platformModule: boolean): DeployBeaconProxyFunction;
//# sourceMappingURL=deploy-beacon-proxy.d.ts.map