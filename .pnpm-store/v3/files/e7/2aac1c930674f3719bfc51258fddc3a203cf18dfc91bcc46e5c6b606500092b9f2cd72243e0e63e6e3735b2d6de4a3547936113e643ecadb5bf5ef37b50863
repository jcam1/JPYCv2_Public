"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeployContract = void 0;
const utils_1 = require("./utils");
const deploy_impl_1 = require("./utils/deploy-impl");
const utils_2 = require("./platform/utils");
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const contract_instance_1 = require("./utils/contract-instance");
async function deployNonUpgradeableContract(hre, Contract, opts) {
    const deployData = await (0, deploy_impl_1.getDeployData)(hre, Contract, opts);
    if (!opts.unsafeAllowDeployContract) {
        assertNonUpgradeable(deployData);
    }
    const deployment = await (0, utils_1.deploy)(hre, opts, Contract, ...deployData.fullOpts.constructorArgs);
    return deployment;
}
function assertNonUpgradeable(deployData) {
    const [fullContractName, runValidation] = (0, upgrades_core_1.getContractNameAndRunValidation)(deployData.validations, deployData.version);
    const c = runValidation[fullContractName];
    if ((0, upgrades_core_1.inferInitializable)(c) || (0, upgrades_core_1.inferProxyKind)(deployData.validations, deployData.version) === 'uups') {
        throw new upgrades_core_1.UpgradesError(`The contract ${fullContractName} looks like an upgradeable contract.`, () => 'Upgradable contracts cannot be deployed using the deployContract function. Use deployProxy, deployBeacon, or deployImplementation.\n' +
            'If this is not intended to be an upgradeable contract, set the unsafeAllowDeployContract option to true and run the deployContract function again.');
    }
}
function makeDeployContract(hre, platformModule) {
    return async function deployContract(Contract, args = [], opts = {}) {
        if (!Array.isArray(args)) {
            opts = args;
            args = [];
        }
        opts = (0, utils_2.enablePlatform)(hre, platformModule, opts);
        if (!opts.usePlatformDeploy) {
            throw new Error(`The ${deployContract.name} function cannot have the \`usePlatformDeploy\` option disabled.`);
        }
        if (opts.constructorArgs !== undefined) {
            throw new Error(`The ${deployContract.name} function does not support the constructorArgs option. Pass in constructor arguments using the format: deployContract(MyContract, [ 'my arg' ]);`);
        }
        opts.constructorArgs = args;
        const deployment = await deployNonUpgradeableContract(hre, Contract, opts);
        return (0, contract_instance_1.getContractInstance)(hre, Contract, opts, deployment);
    };
}
exports.makeDeployContract = makeDeployContract;
//# sourceMappingURL=deploy-contract.js.map