"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialOwnerUnsupportedKindError = exports.PrepareUpgradeRequiresKindError = exports.ValidateUpdateRequiresKindError = exports.NoContractImportError = exports.ForceImportUnsupportedError = exports.PrepareUpgradeUnsupportedError = exports.LoadProxyUnsupportedError = exports.DeployBeaconProxyImplUnknownError = exports.DeployBeaconProxyUnsupportedError = exports.DeployBeaconProxyKindError = exports.BeaconProxyUnsupportedError = void 0;
exports.assertNotProxy = assertNotProxy;
const _1 = require(".");
class BeaconProxyUnsupportedError extends _1.UpgradesError {
    constructor() {
        super('Beacon proxies are not supported with the current function.', () => 'Use deployBeacon(), deployBeaconProxy(), or upgradeBeacon() instead.');
    }
}
exports.BeaconProxyUnsupportedError = BeaconProxyUnsupportedError;
class DeployBeaconProxyKindError extends _1.UpgradesError {
    constructor(kind) {
        super(`Unsupported proxy kind '${kind}'`, () => `deployBeaconProxy() is only supported with proxy kind undefined or 'beacon'`);
    }
}
exports.DeployBeaconProxyKindError = DeployBeaconProxyKindError;
class DeployBeaconProxyUnsupportedError extends _1.UpgradesError {
    constructor(beaconAddress) {
        super(`Contract at ${beaconAddress} doesn't look like a beacon`, () => 'Deploy a beacon using deployBeacon().');
    }
}
exports.DeployBeaconProxyUnsupportedError = DeployBeaconProxyUnsupportedError;
class DeployBeaconProxyImplUnknownError extends _1.UpgradesError {
    constructor(implAddress) {
        super(`Beacon's current implementation at ${implAddress} is unknown`, () => `Call deployBeaconProxy() with the implementation option providing the beacon's current implementation.`);
    }
}
exports.DeployBeaconProxyImplUnknownError = DeployBeaconProxyImplUnknownError;
class LoadProxyUnsupportedError extends _1.UpgradesError {
    constructor(proxyAddress) {
        super(`Contract at ${proxyAddress} doesn't look like a supported proxy`, () => 'Only transparent, UUPS, or beacon proxies can be loaded with the loadProxy() function.');
    }
}
exports.LoadProxyUnsupportedError = LoadProxyUnsupportedError;
/**
 * @deprecated No longer used since prepareUpgrade() supports using an implementation contract as the reference address.
 */
class PrepareUpgradeUnsupportedError extends _1.UpgradesError {
    constructor(proxyOrBeaconAddress) {
        super(`Contract at address ${proxyOrBeaconAddress} doesn't look like a supported proxy or beacon`, () => `Only transparent, UUPS, or beacon proxies or beacons can be used with the prepareUpgrade() function.`);
    }
}
exports.PrepareUpgradeUnsupportedError = PrepareUpgradeUnsupportedError;
/**
 * @deprecated No longer used since forceImport() supports importing any contract.
 */
class ForceImportUnsupportedError extends _1.UpgradesError {
    constructor(proxyOrBeaconAddress) {
        super(`Contract at address ${proxyOrBeaconAddress} doesn't look like a supported proxy or beacon`, () => `Only transparent, UUPS, or beacon proxies or beacons can be used with the forceImport() function.`);
    }
}
exports.ForceImportUnsupportedError = ForceImportUnsupportedError;
class NoContractImportError extends _1.UpgradesError {
    constructor(address) {
        super(`No contract at address ${address}`, () => `The address could not be imported because no contract was found at the address.`);
    }
}
exports.NoContractImportError = NoContractImportError;
class ValidateUpdateRequiresKindError extends _1.UpgradesError {
    constructor() {
        super('The `kind` option must be provided', () => 'When validating an upgrade from an implementation address, pass in the `kind` option for the kind of proxy that you are using.');
    }
}
exports.ValidateUpdateRequiresKindError = ValidateUpdateRequiresKindError;
class PrepareUpgradeRequiresKindError extends _1.UpgradesError {
    constructor() {
        super('The `kind` option must be provided', () => 'When preparing an upgrade from an implementation address, pass in the `kind` option for the kind of proxy that you are using.');
    }
}
exports.PrepareUpgradeRequiresKindError = PrepareUpgradeRequiresKindError;
class InitialOwnerUnsupportedKindError extends _1.UpgradesError {
    constructor(kind) {
        super(`The \`initialOwner\` option is not supported for this kind of proxy ('${kind}')`, () => `Set the initial owner as part of your contract's initializer arguments instead.`);
    }
}
exports.InitialOwnerUnsupportedKindError = InitialOwnerUnsupportedKindError;
async function assertNotProxy(provider, address) {
    if (await (0, _1.isTransparentOrUUPSProxy)(provider, address)) {
        throw new _1.UpgradesError('Address is a transparent or UUPS proxy which cannot be upgraded using upgradeBeacon().', () => 'Use upgradeProxy() instead.');
    }
    else if (await (0, _1.isBeaconProxy)(provider, address)) {
        const beaconAddress = await (0, _1.getBeaconAddress)(provider, address);
        throw new _1.UpgradesError('Address is a beacon proxy which cannot be upgraded directly.', () => `upgradeBeacon() must be called with a beacon address, not a beacon proxy address. Call upgradeBeacon() on the beacon address ${beaconAddress} instead.`);
    }
}
//# sourceMappingURL=usage-error.js.map