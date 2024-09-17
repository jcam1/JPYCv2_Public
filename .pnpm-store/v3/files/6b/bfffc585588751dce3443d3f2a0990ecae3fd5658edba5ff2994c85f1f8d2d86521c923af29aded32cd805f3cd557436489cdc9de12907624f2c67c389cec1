"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployImplForUpgrade = exports.makePrepareUpgrade = void 0;
const utils_1 = require("./utils");
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_2 = require("./platform/utils");
const deploy_impl_1 = require("./utils/deploy-impl");
function makePrepareUpgrade(hre, platformModule) {
    return async function prepareUpgrade(referenceAddressOrContract, ImplFactory, opts = {}) {
        opts = (0, utils_2.enablePlatform)(hre, platformModule, opts);
        const deployedImpl = await deployImplForUpgrade(hre, referenceAddressOrContract, ImplFactory, opts);
        if (opts.getTxResponse && deployedImpl.txResponse !== undefined) {
            return deployedImpl.txResponse;
        }
        else {
            return deployedImpl.impl;
        }
    };
}
exports.makePrepareUpgrade = makePrepareUpgrade;
async function deployImplForUpgrade(hre, referenceAddressOrContract, ImplFactory, opts = {}) {
    const referenceAddress = (0, utils_1.getContractAddress)(referenceAddressOrContract);
    const { provider } = hre.network;
    let deployedImpl;
    if (await (0, upgrades_core_1.isTransparentOrUUPSProxy)(provider, referenceAddress)) {
        deployedImpl = await (0, utils_1.deployProxyImpl)(hre, ImplFactory, opts, referenceAddress);
    }
    else if (await (0, upgrades_core_1.isBeaconProxy)(provider, referenceAddress)) {
        const beaconAddress = await (0, upgrades_core_1.getBeaconAddress)(provider, referenceAddress);
        deployedImpl = await (0, utils_1.deployBeaconImpl)(hre, ImplFactory, opts, beaconAddress);
    }
    else if (await (0, upgrades_core_1.isBeacon)(provider, referenceAddress)) {
        deployedImpl = await (0, utils_1.deployBeaconImpl)(hre, ImplFactory, opts, referenceAddress);
    }
    else {
        if (opts.kind === undefined) {
            throw new upgrades_core_1.PrepareUpgradeRequiresKindError();
        }
        deployedImpl = await (0, deploy_impl_1.deployUpgradeableImpl)(hre, ImplFactory, opts, referenceAddress);
    }
    return deployedImpl;
}
exports.deployImplForUpgrade = deployImplForUpgrade;
//# sourceMappingURL=prepare-upgrade.js.map