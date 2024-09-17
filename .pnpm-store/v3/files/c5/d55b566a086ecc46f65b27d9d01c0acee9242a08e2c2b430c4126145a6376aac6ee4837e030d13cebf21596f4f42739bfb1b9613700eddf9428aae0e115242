import '@nomiclabs/hardhat-ethers';
import './type-extensions';
import { silenceWarnings } from '@openzeppelin/upgrades-core';
import type { DeployFunction } from './deploy-proxy';
import type { PrepareUpgradeFunction } from './prepare-upgrade';
import type { UpgradeFunction } from './upgrade-proxy';
import type { DeployBeaconFunction } from './deploy-beacon';
import type { DeployBeaconProxyFunction } from './deploy-beacon-proxy';
import type { UpgradeBeaconFunction } from './upgrade-beacon';
import type { ForceImportFunction } from './force-import';
import type { ChangeAdminFunction, TransferProxyAdminOwnershipFunction, GetInstanceFunction } from './admin';
import type { ValidateImplementationFunction } from './validate-implementation';
import type { ValidateUpgradeFunction } from './validate-upgrade';
import type { DeployImplementationFunction } from './deploy-implementation';
import { DeployAdminFunction } from './deploy-proxy-admin';
import type { DeployContractFunction } from './deploy-contract';
import type { ProposeUpgradeFunction } from './platform/propose-upgrade';
import type { GetDefaultApprovalProcessFunction } from './platform/get-default-approval-process';
export interface HardhatUpgrades {
    deployProxy: DeployFunction;
    upgradeProxy: UpgradeFunction;
    validateImplementation: ValidateImplementationFunction;
    validateUpgrade: ValidateUpgradeFunction;
    deployImplementation: DeployImplementationFunction;
    prepareUpgrade: PrepareUpgradeFunction;
    deployBeacon: DeployBeaconFunction;
    deployBeaconProxy: DeployBeaconProxyFunction;
    upgradeBeacon: UpgradeBeaconFunction;
    deployProxyAdmin: DeployAdminFunction;
    forceImport: ForceImportFunction;
    silenceWarnings: typeof silenceWarnings;
    admin: {
        getInstance: GetInstanceFunction;
        changeProxyAdmin: ChangeAdminFunction;
        transferProxyAdminOwnership: TransferProxyAdminOwnershipFunction;
    };
    erc1967: {
        getAdminAddress: (proxyAdress: string) => Promise<string>;
        getImplementationAddress: (proxyAdress: string) => Promise<string>;
        getBeaconAddress: (proxyAdress: string) => Promise<string>;
    };
    beacon: {
        getImplementationAddress: (beaconAddress: string) => Promise<string>;
    };
}
export interface PlatformHardhatUpgrades extends HardhatUpgrades {
    deployContract: DeployContractFunction;
    proposeUpgrade: ProposeUpgradeFunction;
    getDefaultApprovalProcess: GetDefaultApprovalProcessFunction;
}
export { UpgradeOptions } from './utils/options';
//# sourceMappingURL=index.d.ts.map