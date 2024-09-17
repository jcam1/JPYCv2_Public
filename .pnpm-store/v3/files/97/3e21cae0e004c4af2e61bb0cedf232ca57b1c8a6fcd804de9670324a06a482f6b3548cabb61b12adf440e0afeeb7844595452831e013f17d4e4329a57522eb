import { EthereumProvider, UpgradesError } from '.';
export declare class BeaconProxyUnsupportedError extends UpgradesError {
    constructor();
}
export declare class DeployBeaconProxyKindError extends UpgradesError {
    constructor(kind: string);
}
export declare class DeployBeaconProxyUnsupportedError extends UpgradesError {
    constructor(beaconAddress: string);
}
export declare class DeployBeaconProxyImplUnknownError extends UpgradesError {
    constructor(implAddress: string);
}
export declare class LoadProxyUnsupportedError extends UpgradesError {
    constructor(proxyAddress: string);
}
/**
 * @deprecated No longer used since prepareUpgrade() supports using an implementation contract as the reference address.
 */
export declare class PrepareUpgradeUnsupportedError extends UpgradesError {
    constructor(proxyOrBeaconAddress: string);
}
/**
 * @deprecated No longer used since forceImport() supports importing any contract.
 */
export declare class ForceImportUnsupportedError extends UpgradesError {
    constructor(proxyOrBeaconAddress: string);
}
export declare class NoContractImportError extends UpgradesError {
    constructor(address: string);
}
export declare class ValidateUpdateRequiresKindError extends UpgradesError {
    constructor();
}
export declare class PrepareUpgradeRequiresKindError extends UpgradesError {
    constructor();
}
export declare class InitialOwnerUnsupportedKindError extends UpgradesError {
    constructor(kind: string);
}
export declare function assertNotProxy(provider: EthereumProvider, address: string): Promise<void>;
//# sourceMappingURL=usage-error.d.ts.map