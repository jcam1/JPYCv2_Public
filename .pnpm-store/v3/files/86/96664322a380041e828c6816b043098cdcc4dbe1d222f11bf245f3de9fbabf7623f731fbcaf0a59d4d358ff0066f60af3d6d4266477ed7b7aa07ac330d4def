"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployBeaconImpl = exports.deployProxyImpl = exports.deployUpgradeableImpl = exports.getDeployData = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("ethers/lib/utils");
const deploy_1 = require("./deploy");
const options_1 = require("./options");
const utils_2 = require("../platform/utils");
const validate_impl_1 = require("./validate-impl");
const validations_1 = require("./validations");
async function getDeployData(hre, ImplFactory, opts) {
    const { provider } = hre.network;
    const validations = await (0, validations_1.readValidations)(hre);
    const unlinkedBytecode = (0, upgrades_core_1.getUnlinkedBytecode)(validations, ImplFactory.bytecode);
    const encodedArgs = ImplFactory.interface.encodeDeploy(opts.constructorArgs);
    const version = (0, upgrades_core_1.getVersion)(unlinkedBytecode, ImplFactory.bytecode, encodedArgs);
    const layout = (0, upgrades_core_1.getStorageLayout)(validations, version);
    const fullOpts = (0, options_1.withDefaults)(opts);
    return { provider, validations, unlinkedBytecode, encodedArgs, version, layout, fullOpts };
}
exports.getDeployData = getDeployData;
async function deployUpgradeableImpl(hre, ImplFactory, opts, currentImplAddress) {
    const deployData = await getDeployData(hre, ImplFactory, opts);
    await (0, validate_impl_1.validateImpl)(deployData, opts, currentImplAddress);
    return await deployImpl(hre, deployData, ImplFactory, opts);
}
exports.deployUpgradeableImpl = deployUpgradeableImpl;
async function deployProxyImpl(hre, ImplFactory, opts, proxyAddress) {
    const deployData = await getDeployData(hre, ImplFactory, opts);
    await (0, validate_impl_1.validateProxyImpl)(deployData, opts, proxyAddress);
    if (opts.kind === undefined) {
        throw new Error('Broken invariant: Proxy kind is undefined');
    }
    return {
        ...(await deployImpl(hre, deployData, ImplFactory, opts)),
        kind: opts.kind,
    };
}
exports.deployProxyImpl = deployProxyImpl;
async function deployBeaconImpl(hre, ImplFactory, opts, beaconAddress) {
    const deployData = await getDeployData(hre, ImplFactory, opts);
    await (0, validate_impl_1.validateBeaconImpl)(deployData, opts, beaconAddress);
    return await deployImpl(hre, deployData, ImplFactory, opts);
}
exports.deployBeaconImpl = deployBeaconImpl;
async function deployImpl(hre, deployData, ImplFactory, opts) {
    const layout = deployData.layout;
    if (opts.useDeployedImplementation && opts.redeployImplementation !== undefined) {
        throw new upgrades_core_1.UpgradesError('The useDeployedImplementation and redeployImplementation options cannot both be set at the same time');
    }
    const merge = deployData.fullOpts.redeployImplementation === 'always';
    const deployment = await (0, upgrades_core_1.fetchOrDeployGetDeployment)(deployData.version, deployData.provider, async () => {
        const abi = ImplFactory.interface.format(utils_1.FormatTypes.minimal);
        const attemptDeploy = () => {
            if (deployData.fullOpts.useDeployedImplementation || deployData.fullOpts.redeployImplementation === 'never') {
                throw new upgrades_core_1.UpgradesError('The implementation contract was not previously deployed.', () => {
                    if (deployData.fullOpts.useDeployedImplementation) {
                        return 'The useDeployedImplementation option was set to true but the implementation contract was not previously deployed on this network.';
                    }
                    else {
                        return "The redeployImplementation option was set to 'never' but the implementation contract was not previously deployed on this network.";
                    }
                });
            }
            else {
                return (0, deploy_1.deploy)(hre, opts, ImplFactory, ...deployData.fullOpts.constructorArgs);
            }
        };
        const deployment = Object.assign({ abi }, await attemptDeploy());
        return { ...deployment, layout };
    }, opts, merge, remoteDeploymentId => (0, utils_2.getRemoteDeployment)(hre, remoteDeploymentId));
    let txResponse;
    if (opts.getTxResponse) {
        if ('deployTransaction' in deployment) {
            txResponse = deployment.deployTransaction;
        }
        else if (deployment.txHash !== undefined) {
            txResponse = await hre.ethers.provider.getTransaction(deployment.txHash);
        }
    }
    return { impl: deployment.address, txResponse };
}
//# sourceMappingURL=deploy-impl.js.map