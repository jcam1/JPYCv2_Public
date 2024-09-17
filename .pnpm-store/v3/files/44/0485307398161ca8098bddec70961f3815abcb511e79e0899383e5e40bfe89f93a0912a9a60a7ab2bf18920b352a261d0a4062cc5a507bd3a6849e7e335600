"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProposeUpgrade = void 0;
require("@openzeppelin/hardhat-upgrades/dist/type-extensions");
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("ethers/lib/utils");
const utils_2 = require("./utils");
const prepare_upgrade_1 = require("../prepare-upgrade");
function makeProposeUpgrade(hre, platformModule) {
    return async function proposeUpgrade(proxyAddress, contractNameOrImplFactory, opts = {}) {
        opts = (0, utils_2.enablePlatform)(hre, platformModule, opts);
        const client = (0, utils_2.getPlatformClient)(hre);
        const network = await (0, utils_2.getNetwork)(hre);
        if (await (0, upgrades_core_1.isBeaconProxy)(hre.network.provider, proxyAddress)) {
            throw new Error(`Beacon proxy is not currently supported with platform.proposeUpgrade()`);
        }
        else {
            // try getting the implementation address so that it will give an error if it's not a transparent/uups proxy
            await (0, upgrades_core_1.getImplementationAddress)(hre.network.provider, proxyAddress);
        }
        let proxyAdmin = undefined;
        if (await (0, upgrades_core_1.isTransparentProxy)(hre.network.provider, proxyAddress)) {
            // use the erc1967 admin address as the proxy admin
            proxyAdmin = await (0, upgrades_core_1.getAdminAddress)(hre.network.provider, proxyAddress);
        }
        const implFactory = typeof contractNameOrImplFactory === 'string'
            ? await hre.ethers.getContractFactory(contractNameOrImplFactory)
            : contractNameOrImplFactory;
        const abi = implFactory.interface.format(utils_1.FormatTypes.json);
        const deployedImpl = await (0, prepare_upgrade_1.deployImplForUpgrade)(hre, proxyAddress, implFactory, {
            getTxResponse: true,
            ...opts,
        });
        const txResponse = deployedImpl.txResponse;
        const newImplementation = deployedImpl.impl;
        const upgradeProposalResponse = await client.Upgrade.upgrade({
            proxyAddress: proxyAddress,
            proxyAdminAddress: proxyAdmin,
            newImplementationABI: abi,
            newImplementationAddress: newImplementation,
            network: network,
            approvalProcessId: opts.approvalProcessId,
        });
        return {
            proposalId: upgradeProposalResponse.proposalId,
            url: upgradeProposalResponse.externalUrl,
            txResponse,
        };
    };
}
exports.makeProposeUpgrade = makeProposeUpgrade;
//# sourceMappingURL=propose-upgrade.js.map