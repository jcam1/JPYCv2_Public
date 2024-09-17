"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformDeploy = void 0;
const contract_names_1 = require("hardhat/utils/contract-names");
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const build_info_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/build-info.json"));
const ERC1967Proxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json"));
const BeaconProxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol/BeaconProxy.json"));
const UpgradeableBeacon_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol/UpgradeableBeacon.json"));
const TransparentUpgradeableProxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol/TransparentUpgradeableProxy.json"));
const ProxyAdmin_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol/ProxyAdmin.json"));
const utils_1 = require("./utils");
const debug_1 = __importDefault(require("../utils/debug"));
const deploy_impl_1 = require("../utils/deploy-impl");
const upgrades_core_2 = require("@openzeppelin/upgrades-core");
const deployableProxyContracts = [
    ERC1967Proxy_json_1.default,
    BeaconProxy_json_1.default,
    UpgradeableBeacon_json_1.default,
    TransparentUpgradeableProxy_json_1.default,
    ProxyAdmin_json_1.default,
];
async function platformDeploy(hre, factory, opts, ...args) {
    const client = (0, utils_1.getPlatformClient)(hre);
    const constructorArgs = [...args];
    const contractInfo = await getContractInfo(hre, factory, { constructorArgs, ...opts });
    const network = await (0, utils_1.getNetwork)(hre);
    (0, debug_1.default)(`Network ${network}`);
    const verifySourceCode = opts.verifySourceCode ?? true;
    (0, debug_1.default)(`Verify source code: ${verifySourceCode}`);
    let license = undefined;
    if (verifySourceCode) {
        license = getLicenseFromMetadata(contractInfo);
        (0, debug_1.default)(`License type: ${license}`);
    }
    if (opts.salt !== undefined) {
        (0, debug_1.default)(`Salt: ${opts.salt}`);
    }
    let deploymentResponse;
    try {
        deploymentResponse = await client.Deployment.deploy({
            contractName: contractInfo.contractName,
            contractPath: contractInfo.sourceName,
            network: network,
            artifactPayload: JSON.stringify(contractInfo.buildInfo),
            licenseType: license,
            constructorInputs: constructorArgs,
            verifySourceCode: verifySourceCode,
            relayerId: opts.relayerId,
            salt: opts.salt,
        });
    }
    catch (e) {
        if (e.response?.data?.message?.includes('licenseType should be equal to one of the allowed values')) {
            throw new upgrades_core_1.UpgradesError(`License type ${license} is not a valid SPDX license identifier for block explorer verification.`, () => 'Specify a valid SPDX-License-Identifier in your contract.');
        }
        else {
            throw e;
        }
    }
    const txResponse = await hre.ethers.provider.getTransaction(deploymentResponse.txHash);
    const checksumAddress = hre.ethers.utils.getAddress(deploymentResponse.address);
    return {
        address: checksumAddress,
        txHash: deploymentResponse.txHash,
        deployTransaction: txResponse,
        remoteDeploymentId: deploymentResponse.deploymentId,
    };
}
exports.platformDeploy = platformDeploy;
async function getContractInfo(hre, factory, opts) {
    let fullContractName;
    try {
        // Get fully qualified contract name from validations
        const deployData = await (0, deploy_impl_1.getDeployData)(hre, factory, opts);
        [fullContractName] = (0, upgrades_core_1.getContractNameAndRunValidation)(deployData.validations, deployData.version);
        (0, debug_1.default)(`Contract ${fullContractName}`);
    }
    catch (e) {
        if (e instanceof upgrades_core_2.ContractSourceNotFoundError) {
            // Proxy contracts would not be found in the validations, so try to get these from the plugin's precompiled artifacts.
            for (const artifact of deployableProxyContracts) {
                if (artifact.bytecode === factory.bytecode) {
                    const sourceName = artifact.sourceName;
                    const contractName = artifact.contractName;
                    const buildInfo = build_info_json_1.default;
                    (0, debug_1.default)(`Proxy contract ${sourceName}:${contractName}`);
                    return { sourceName, contractName, buildInfo };
                }
            }
        }
        // If nothing else worked, re-throw error about the contract not being found.
        throw e;
    }
    const { sourceName, contractName } = (0, contract_names_1.parseFullyQualifiedName)(fullContractName);
    // Get the build-info file corresponding to the fully qualified contract name
    const buildInfo = await hre.artifacts.getBuildInfo(fullContractName);
    if (buildInfo === undefined) {
        throw new upgrades_core_1.UpgradesError(`Could not get Hardhat compilation artifact for contract ${fullContractName}`, () => `Run \`npx hardhat compile\``);
    }
    return { sourceName, contractName, buildInfo };
}
/**
 * Get the license type from the contract metadata without validating its validity, except converts undefined or UNLICENSED to None.
 */
function getLicenseFromMetadata(contractInfo) {
    const compilerOutput = contractInfo.buildInfo.output.contracts[contractInfo.sourceName][contractInfo.contractName];
    const metadataString = compilerOutput.metadata;
    if (metadataString === undefined) {
        throw new upgrades_core_1.UpgradesError('License type could not be determined from contract metadata', () => 'Enable metadata output in your compiler settings.');
    }
    const metadata = JSON.parse(metadataString);
    const license = metadata.sources[contractInfo.sourceName].license;
    if (license === undefined || license === 'UNLICENSED') {
        // UNLICENSED means no license according to solidity docs
        return 'None';
    }
    else {
        return license;
    }
}
//# sourceMappingURL=deploy.js.map