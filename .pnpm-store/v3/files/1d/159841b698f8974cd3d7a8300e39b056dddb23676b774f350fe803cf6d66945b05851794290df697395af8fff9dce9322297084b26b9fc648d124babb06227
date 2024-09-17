"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateDeployImpl = exports.simulateDeployAdmin = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("ethers/lib/utils");
const deploy_impl_1 = require("./deploy-impl");
// To import an already deployed contract we want to reuse fetchOrDeploy for its ability to validate
// a deployment and record it in the network file. We are able to do this by "simulating" a deployment:
// for the "deploy" part we pass a function that simply returns the contract to be imported, rather than
// actually deploying something.
async function simulateDeployAdmin(hre, ProxyAdminFactory, opts, adminAddress) {
    const { deployData, simulateDeploy } = await getSimulatedData(hre, ProxyAdminFactory, opts, adminAddress);
    const manifestAdminAddress = await (0, upgrades_core_1.fetchOrDeployAdmin)(deployData.provider, simulateDeploy, opts);
    if (adminAddress !== manifestAdminAddress) {
        (0, upgrades_core_1.logWarning)(`Imported proxy with admin at '${adminAddress}' which differs from previously deployed admin '${manifestAdminAddress}'`, [
            `The imported proxy admin is different from the proxy admin that was previously deployed on this network. This proxy will not be upgradable directly by the plugin.`,
            `To upgrade this proxy, use the prepareUpgrade or defender.proposeUpgrade function and then upgrade it using the admin at '${adminAddress}'.`,
        ]);
    }
}
exports.simulateDeployAdmin = simulateDeployAdmin;
async function simulateDeployImpl(hre, ImplFactory, opts, implAddress) {
    const { deployData, simulateDeploy } = await getSimulatedData(hre, ImplFactory, opts, implAddress);
    await (0, upgrades_core_1.fetchOrDeploy)(deployData.version, deployData.provider, simulateDeploy, opts, true);
}
exports.simulateDeployImpl = simulateDeployImpl;
/**
 * Gets data for a simulated deployment of the given contract to the given address.
 */
async function getSimulatedData(hre, ImplFactory, opts, implAddress) {
    const deployData = await (0, deploy_impl_1.getDeployData)(hre, ImplFactory, opts);
    const simulateDeploy = async () => {
        return {
            abi: ImplFactory.interface.format(utils_1.FormatTypes.minimal),
            layout: deployData.layout,
            address: implAddress,
        };
    };
    return { deployData, simulateDeploy };
}
//# sourceMappingURL=simulate-deploy.js.map