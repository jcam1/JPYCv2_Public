import '@openzeppelin/hardhat-upgrades/dist/type-extensions';
import { ContractFactory, ethers } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { PlatformDeployOptions, UpgradeOptions } from '../utils';
export interface UpgradeProposalResponse {
    proposalId: string;
    url?: string;
    txResponse?: ethers.providers.TransactionResponse;
}
export type ProposeUpgradeFunction = (proxyAddress: string, contractNameOrImplFactory: string | ContractFactory, opts?: ProposalOptions) => Promise<UpgradeProposalResponse>;
export interface ProposalOptions extends UpgradeOptions, PlatformDeployOptions {
    approvalProcessId?: string;
}
export declare function makeProposeUpgrade(hre: HardhatRuntimeEnvironment, platformModule: boolean): ProposeUpgradeFunction;
//# sourceMappingURL=propose-upgrade.d.ts.map