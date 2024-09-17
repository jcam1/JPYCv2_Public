import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Contract, Signer } from 'ethers';
export type ChangeAdminFunction = (proxyAddress: string, newAdmin: string, signer?: Signer) => Promise<void>;
export type TransferProxyAdminOwnershipFunction = (newOwner: string, signer?: Signer) => Promise<void>;
export type GetInstanceFunction = (signer?: Signer) => Promise<Contract>;
export declare function makeChangeProxyAdmin(hre: HardhatRuntimeEnvironment, platformModule: boolean): ChangeAdminFunction;
export declare function makeTransferProxyAdminOwnership(hre: HardhatRuntimeEnvironment, platformModule: boolean): TransferProxyAdminOwnershipFunction;
export declare function makeGetInstanceFunction(hre: HardhatRuntimeEnvironment): GetInstanceFunction;
export declare function getManifestAdmin(hre: HardhatRuntimeEnvironment, signer?: Signer): Promise<Contract>;
//# sourceMappingURL=admin.d.ts.map