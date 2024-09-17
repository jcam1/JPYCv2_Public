"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeValidateUpgrade = void 0;
const ethers_1 = require("ethers");
const utils_1 = require("./utils");
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const validate_impl_1 = require("./utils/validate-impl");
const deploy_impl_1 = require("./utils/deploy-impl");
function makeValidateUpgrade(hre) {
    return async function validateUpgrade(referenceAddressOrImplFactory, newImplFactory, opts = {}) {
        if (referenceAddressOrImplFactory instanceof ethers_1.ContractFactory) {
            const origDeployData = await (0, deploy_impl_1.getDeployData)(hre, referenceAddressOrImplFactory, opts);
            if (opts.kind === undefined) {
                opts.kind = (0, upgrades_core_1.inferProxyKind)(origDeployData.validations, origDeployData.version);
            }
            const newDeployData = await (0, deploy_impl_1.getDeployData)(hre, newImplFactory, opts);
            (0, upgrades_core_1.assertUpgradeSafe)(newDeployData.validations, newDeployData.version, newDeployData.fullOpts);
            if (opts.unsafeSkipStorageCheck !== true) {
                (0, upgrades_core_1.assertStorageUpgradeSafe)(origDeployData.layout, newDeployData.layout, newDeployData.fullOpts);
            }
        }
        else {
            const referenceAddress = (0, utils_1.getContractAddress)(referenceAddressOrImplFactory);
            const { provider } = hre.network;
            const deployData = await (0, deploy_impl_1.getDeployData)(hre, newImplFactory, opts);
            if (await (0, upgrades_core_1.isTransparentOrUUPSProxy)(provider, referenceAddress)) {
                await (0, validate_impl_1.validateProxyImpl)(deployData, opts, referenceAddress);
            }
            else if (await (0, upgrades_core_1.isBeaconProxy)(provider, referenceAddress)) {
                const beaconAddress = await (0, upgrades_core_1.getBeaconAddress)(provider, referenceAddress);
                await (0, validate_impl_1.validateBeaconImpl)(deployData, opts, beaconAddress);
            }
            else if (await (0, upgrades_core_1.isBeacon)(provider, referenceAddress)) {
                await (0, validate_impl_1.validateBeaconImpl)(deployData, opts, referenceAddress);
            }
            else {
                if (opts.kind === undefined) {
                    throw new upgrades_core_1.ValidateUpdateRequiresKindError();
                }
                await (0, validate_impl_1.validateImpl)(deployData, opts, referenceAddress);
            }
        }
    };
}
exports.makeValidateUpgrade = makeValidateUpgrade;
//# sourceMappingURL=validate-upgrade.js.map