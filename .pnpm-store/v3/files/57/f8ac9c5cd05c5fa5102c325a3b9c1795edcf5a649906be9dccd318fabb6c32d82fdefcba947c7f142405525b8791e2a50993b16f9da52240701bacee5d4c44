import { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory, Contract } from 'ethers';
import { DeployContractOptions } from './utils';
export interface DeployContractFunction {
    (Contract: ContractFactory, args?: unknown[], opts?: DeployContractOptions): Promise<Contract>;
    (Contract: ContractFactory, opts?: DeployContractOptions): Promise<Contract>;
}
export declare function makeDeployContract(hre: HardhatRuntimeEnvironment, platformModule: boolean): DeployContractFunction;
//# sourceMappingURL=deploy-contract.d.ts.map