"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const EtherscanVerifyContractRequest_1 = require("@nomiclabs/hardhat-etherscan/dist/src/etherscan/EtherscanVerifyContractRequest");
const EtherscanService_1 = require("@nomiclabs/hardhat-etherscan/dist/src/etherscan/EtherscanService");
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const build_info_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/build-info.json"));
const ERC1967Proxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json"));
const BeaconProxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol/BeaconProxy.json"));
const UpgradeableBeacon_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol/UpgradeableBeacon.json"));
const TransparentUpgradeableProxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol/TransparentUpgradeableProxy.json"));
const ProxyAdmin_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol/ProxyAdmin.json"));
const ethereumjs_util_1 = require("ethereumjs-util");
const debug_1 = __importDefault(require("./utils/debug"));
const etherscan_api_1 = require("./utils/etherscan-api");
/**
 * The proxy-related contracts and their corresponding events that may have been deployed the current version of this plugin.
 */
const verifiableContracts = {
    erc1967proxy: { artifact: ERC1967Proxy_json_1.default, event: 'Upgraded(address)' },
    beaconProxy: { artifact: BeaconProxy_json_1.default, event: 'BeaconUpgraded(address)' },
    upgradeableBeacon: { artifact: UpgradeableBeacon_json_1.default, event: 'OwnershipTransferred(address,address)' },
    transparentUpgradeableProxy: { artifact: TransparentUpgradeableProxy_json_1.default, event: 'AdminChanged(address,address)' },
    proxyAdmin: { artifact: ProxyAdmin_json_1.default, event: 'OwnershipTransferred(address,address)' },
};
/**
 * Overrides hardhat-etherscan's verify:verify subtask to fully verify a proxy or beacon.
 *
 * Verifies the contract at an address. If the address is an ERC-1967 compatible proxy, verifies the proxy and associated proxy contracts,
 * as well as the implementation. Otherwise, calls hardhat-etherscan's verify function directly.
 *
 * @param args Args to the hardhat-etherscan verify function
 * @param hre
 * @param runSuper The parent function which is expected to be hardhat-etherscan's verify function
 * @returns
 */
async function verify(args, hre, runSuper) {
    if (!runSuper.isDefined) {
        throw new upgrades_core_1.UpgradesError('The hardhat-etherscan plugin must be imported before the hardhat-upgrades plugin.', () => 'Import the plugins in the following order in hardhat.config.js:\n' +
            '  require("@nomiclabs/hardhat-etherscan");\n' +
            '  require("@openzeppelin/hardhat-upgrades");\n' +
            'Or if you are using TypeScript, import the plugins in the following order in hardhat.config.ts:\n' +
            '  import "@nomiclabs/hardhat-etherscan";\n' +
            '  import "@openzeppelin/hardhat-upgrades";\n');
    }
    const provider = hre.network.provider;
    const proxyAddress = args.address;
    const errorReport = {
        errors: [],
        severity: 'error',
    };
    let proxy = true;
    if (await (0, upgrades_core_1.isTransparentOrUUPSProxy)(provider, proxyAddress)) {
        await fullVerifyTransparentOrUUPS(hre, proxyAddress, hardhatVerify, errorReport);
    }
    else if (await (0, upgrades_core_1.isBeaconProxy)(provider, proxyAddress)) {
        await fullVerifyBeaconProxy(hre, proxyAddress, hardhatVerify, errorReport);
    }
    else if (await (0, upgrades_core_1.isBeacon)(provider, proxyAddress)) {
        proxy = false;
        const etherscanApi = await (0, etherscan_api_1.getEtherscanAPIConfig)(hre);
        await fullVerifyBeacon(hre, proxyAddress, hardhatVerify, etherscanApi, errorReport);
    }
    else {
        // Doesn't look like a proxy, so just verify directly
        return hardhatVerify(proxyAddress);
    }
    if (errorReport.errors.length > 0) {
        displayErrorReport(errorReport);
    }
    else {
        console.info(`\n${proxy ? 'Proxy' : 'Contract'} fully verified.`);
    }
    async function hardhatVerify(address) {
        return await runSuper({ ...args, address });
    }
}
exports.verify = verify;
/**
 * Throws or warns with a formatted summary of all of the verification errors that have been recorded.
 *
 * @param errorReport Accumulated verification errors
 * @throws UpgradesError if errorReport.severity is 'error'
 */
function displayErrorReport(errorReport) {
    let summary = `\nVerification completed with the following ${errorReport.severity === 'error' ? 'errors' : 'warnings'}.`;
    for (let i = 0; i < errorReport.errors.length; i++) {
        const error = errorReport.errors[i];
        summary += `\n\n${errorReport.severity === 'error' ? 'Error' : 'Warning'} ${i + 1}: ${error}`;
    }
    if (errorReport.severity === 'error') {
        throw new upgrades_core_1.UpgradesError(summary);
    }
    else {
        console.warn(summary);
    }
}
/**
 * Log an error about the given contract's verification attempt, and save it so it can be summarized at the end.
 *
 * @param address The address that failed to verify
 * @param contractType The type or name of the contract
 * @param details The error details
 * @param errorReport Accumulated verification errors
 */
function recordVerificationError(address, contractType, details, errorReport) {
    const message = `Failed to verify ${contractType} contract at ${address}: ${details}`;
    recordError(message, errorReport);
}
function recordError(message, errorReport) {
    console.error(message);
    errorReport.errors.push(message);
}
/**
 * Indicates that the expected event topic was not found in the contract's logs according to the Etherscan API.
 */
class EventNotFound extends upgrades_core_1.UpgradesError {
}
/**
 * Indicates that the contract's bytecode does not match with the plugin's artifact.
 */
class BytecodeNotMatchArtifact extends Error {
    constructor(message, contractName) {
        super(message);
        this.contractName = contractName;
    }
}
/**
 * Fully verifies all contracts related to the given transparent or UUPS proxy address: implementation, admin (if any), and proxy.
 * Also links the proxy to the implementation ABI on Etherscan.
 *
 * This function will determine whether the address is a transparent or UUPS proxy based on whether its creation bytecode matches with
 * TransparentUpgradeableProxy or ERC1967Proxy.
 *
 * Note: this function does not use the admin slot to determine whether the proxy is transparent or UUPS, but will always verify
 * the admin address as long as the admin storage slot has an address.
 *
 * @param hre
 * @param proxyAddress The transparent or UUPS proxy address
 * @param hardhatVerify A function that invokes the hardhat-etherscan plugin's verify command
 * @param errorReport Accumulated verification errors
 */
async function fullVerifyTransparentOrUUPS(hre, proxyAddress, hardhatVerify, errorReport) {
    const provider = hre.network.provider;
    const implAddress = await (0, upgrades_core_1.getImplementationAddress)(provider, proxyAddress);
    await verifyImplementation(hardhatVerify, implAddress, errorReport);
    const etherscanApi = await (0, etherscan_api_1.getEtherscanAPIConfig)(hre);
    await verifyTransparentOrUUPS();
    await linkProxyWithImplementationAbi(etherscanApi, proxyAddress, implAddress, errorReport);
    // Either UUPS or Transparent proxy could have admin slot set, although typically this should only be for Transparent
    await verifyAdmin();
    async function verifyAdmin() {
        const adminAddress = await (0, upgrades_core_1.getAdminAddress)(provider, proxyAddress);
        if (!(0, upgrades_core_1.isEmptySlot)(adminAddress)) {
            console.log(`Verifying proxy admin: ${adminAddress}`);
            try {
                await verifyWithArtifactOrFallback(hre, hardhatVerify, etherscanApi, adminAddress, [verifiableContracts.proxyAdmin], errorReport, 
                // The user provided the proxy address to verify, whereas this function is only verifying the related proxy admin.
                // So even if this falls back and succeeds, we want to keep any errors that might have occurred while verifying the proxy itself.
                false);
            }
            catch (e) {
                if (e instanceof EventNotFound) {
                    console.log('Verification skipped for proxy admin - the admin address does not appear to contain a ProxyAdmin contract.');
                }
            }
        }
    }
    async function verifyTransparentOrUUPS() {
        console.log(`Verifying proxy: ${proxyAddress}`);
        await verifyWithArtifactOrFallback(hre, hardhatVerify, etherscanApi, proxyAddress, [verifiableContracts.transparentUpgradeableProxy, verifiableContracts.erc1967proxy], errorReport, true);
    }
}
/**
 * Fully verifies all contracts related to the given beacon proxy address: implementation, beacon, and beacon proxy.
 * Also links the proxy to the implementation ABI on Etherscan.
 *
 * @param hre
 * @param proxyAddress The beacon proxy address
 * @param hardhatVerify A function that invokes the hardhat-etherscan plugin's verify command
 * @param errorReport Accumulated verification errors
 */
async function fullVerifyBeaconProxy(hre, proxyAddress, hardhatVerify, errorReport) {
    const provider = hre.network.provider;
    const beaconAddress = await (0, upgrades_core_1.getBeaconAddress)(provider, proxyAddress);
    const implAddress = await (0, upgrades_core_1.getImplementationAddressFromBeacon)(provider, beaconAddress);
    const etherscanApi = await (0, etherscan_api_1.getEtherscanAPIConfig)(hre);
    await fullVerifyBeacon(hre, beaconAddress, hardhatVerify, etherscanApi, errorReport);
    await verifyBeaconProxy();
    await linkProxyWithImplementationAbi(etherscanApi, proxyAddress, implAddress, errorReport);
    async function verifyBeaconProxy() {
        console.log(`Verifying beacon proxy: ${proxyAddress}`);
        await verifyWithArtifactOrFallback(hre, hardhatVerify, etherscanApi, proxyAddress, [verifiableContracts.beaconProxy], errorReport, true);
    }
}
/**
 * Verifies all contracts resulting from a beacon deployment: implementation, beacon
 *
 * @param hre
 * @param beaconAddress The beacon address
 * @param hardhatVerify A function that invokes the hardhat-etherscan plugin's verify command
 * @param etherscanApi Configuration for the Etherscan API
 * @param errorReport Accumulated verification errors
 */
async function fullVerifyBeacon(hre, beaconAddress, hardhatVerify, etherscanApi, errorReport) {
    const provider = hre.network.provider;
    const implAddress = await (0, upgrades_core_1.getImplementationAddressFromBeacon)(provider, beaconAddress);
    await verifyImplementation(hardhatVerify, implAddress, errorReport);
    await verifyBeacon();
    async function verifyBeacon() {
        console.log(`Verifying beacon or beacon-like contract: ${beaconAddress}`);
        await verifyWithArtifactOrFallback(hre, hardhatVerify, etherscanApi, beaconAddress, [verifiableContracts.upgradeableBeacon], errorReport, true);
    }
}
/**
 * Runs hardhat-etherscan plugin's verify command on the given implementation address.
 *
 * @param hardhatVerify A function that invokes the hardhat-etherscan plugin's verify command
 * @param implAddress The implementation address
 * @param errorReport Accumulated verification errors
 */
async function verifyImplementation(hardhatVerify, implAddress, errorReport) {
    try {
        console.log(`Verifying implementation: ${implAddress}`);
        await hardhatVerify(implAddress);
    }
    catch (e) {
        if (e.message.toLowerCase().includes('already verified')) {
            console.log(`Implementation ${implAddress} already verified.`);
        }
        else {
            recordVerificationError(implAddress, 'implementation', e.message, errorReport);
        }
    }
}
/**
 * Looks for any of the possible events (in array order) at the specified address using Etherscan API,
 * and returns the corresponding VerifiableContractInfo and txHash for the first event found.
 *
 * @param etherscanApi The Etherscan API config
 * @param address The contract address for which to look for events
 * @param possibleContractInfo An array of possible contract artifacts to use for verification along
 *  with the corresponding creation event expected in the logs.
 * @returns the VerifiableContractInfo and txHash for the first event found
 * @throws {EventNotFound} if none of the events were found in the contract's logs according to Etherscan.
 */
async function searchEvent(etherscanApi, address, possibleContractInfo) {
    for (let i = 0; i < possibleContractInfo.length; i++) {
        const contractInfo = possibleContractInfo[i];
        const txHash = await getContractCreationTxHash(address, contractInfo.event, etherscanApi);
        if (txHash !== undefined) {
            return { contractInfo, txHash };
        }
    }
    const events = possibleContractInfo.map(contractInfo => {
        return contractInfo.event;
    });
    throw new EventNotFound(`Could not find an event with any of the following topics in the logs for address ${address}: ${events.join(', ')}`, () => 'If the proxy was recently deployed, the transaction may not be available on Etherscan yet. Try running the verify task again after waiting a few blocks.');
}
/**
 * Verifies a contract by matching with known artifacts.
 *
 * If a match was not found, falls back to verify directly using the regular hardhat verify task.
 *
 * If the fallback passes, logs as success.
 * If the fallback also fails, records errors for both the original and fallback attempts.
 *
 * @param hre
 * @param etherscanApi The Etherscan API config
 * @param address The contract address to verify
 * @param possibleContractInfo An array of possible contract artifacts to use for verification along
 *  with the corresponding creation event expected in the logs.
 * @param errorReport Accumulated verification errors
 * @param convertErrorsToWarningsOnFallbackSuccess If fallback verification occurred and succeeded, whether any
 *  previously accumulated errors should be converted into warnings in the final summary.
 * @throws {EventNotFound} if none of the events were found in the contract's logs according to Etherscan.
 */
async function verifyWithArtifactOrFallback(hre, hardhatVerify, etherscanApi, address, possibleContractInfo, errorReport, convertErrorsToWarningsOnFallbackSuccess) {
    try {
        await attemptVerifyWithCreationEvent(hre, etherscanApi, address, possibleContractInfo, errorReport);
        return true;
    }
    catch (origError) {
        if (origError instanceof BytecodeNotMatchArtifact || origError instanceof EventNotFound) {
            // Try falling back to regular hardhat verify in case the source code is available in the user's project.
            try {
                await hardhatVerify(address);
            }
            catch (fallbackError) {
                if (fallbackError.message.toLowerCase().includes('already verified')) {
                    console.log(`Contract at ${address} already verified.`);
                }
                else {
                    // Fallback failed, so record both the original error and the fallback attempt, then return
                    if (origError instanceof BytecodeNotMatchArtifact) {
                        recordVerificationError(address, origError.contractName, origError.message, errorReport);
                    }
                    else {
                        recordError(origError.message, errorReport);
                    }
                    recordError(`Failed to verify directly using hardhat verify: ${fallbackError.message}`, errorReport);
                    return;
                }
            }
            // Since the contract was able to be verified directly, we don't want the task to fail so we should convert earlier errors into warnings for other related contracts.
            // For example, the user provided constructor arguments for the verify command will apply to all calls of the regular hardhat verify,
            // so it is not possible to successfully verify both an impl and a proxy that uses the above fallback at the same time.
            if (convertErrorsToWarningsOnFallbackSuccess) {
                errorReport.severity = 'warn';
            }
        }
        else {
            throw origError;
        }
    }
}
/**
 * Attempts to verify a contract by looking up an event that should have been logged during contract construction,
 * finds the txHash for that, and infers the constructor args to use for verification.
 *
 * Iterates through each element of possibleContractInfo to look for that element's event, until an event is found.
 *
 * @param hre
 * @param etherscanApi The Etherscan API config
 * @param address The contract address to verify
 * @param possibleContractInfo An array of possible contract artifacts to use for verification along
 *  with the corresponding creation event expected in the logs.
 * @param errorReport Accumulated verification errors
 * @throws {EventNotFound} if none of the events were found in the contract's logs according to Etherscan.
 * @throws {BytecodeNotMatchArtifact} if the contract's bytecode does not match with the plugin's known artifact.
 */
async function attemptVerifyWithCreationEvent(hre, etherscanApi, address, possibleContractInfo, errorReport) {
    const { contractInfo, txHash } = await searchEvent(etherscanApi, address, possibleContractInfo);
    (0, debug_1.default)(`verifying contract ${contractInfo.artifact.contractName} at ${address}`);
    const tx = await (0, upgrades_core_1.getTransactionByHash)(hre.network.provider, txHash);
    if (tx === null) {
        // This should not happen since the txHash came from the logged event itself
        throw new upgrades_core_1.UpgradesError(`The transaction hash ${txHash} from the contract's logs was not found on the network`);
    }
    const constructorArguments = inferConstructorArgs(tx.input, contractInfo.artifact.bytecode);
    if (constructorArguments === undefined) {
        // The creation bytecode for the address does not match with the expected artifact.
        // This may be because a different version of the contract was deployed compared to what is in the plugins.
        throw new BytecodeNotMatchArtifact(`Bytecode does not match with the current version of ${contractInfo.artifact.contractName} in the Hardhat Upgrades plugin.`, contractInfo.artifact.contractName);
    }
    else {
        await verifyContractWithConstructorArgs(etherscanApi, address, contractInfo.artifact, constructorArguments, errorReport);
    }
}
/**
 * Verifies a contract using the given constructor args.
 *
 * @param etherscanApi The Etherscan API config
 * @param address The address of the contract to verify
 * @param artifact The contract artifact to use for verification.
 * @param constructorArguments The constructor arguments to use for verification.
 */
async function verifyContractWithConstructorArgs(etherscanApi, address, artifact, constructorArguments, errorReport) {
    (0, debug_1.default)(`verifying contract ${address} with constructor args ${constructorArguments}`);
    const params = {
        apiKey: etherscanApi.key,
        contractAddress: address,
        sourceCode: JSON.stringify(build_info_json_1.default.input),
        sourceName: artifact.sourceName,
        contractName: artifact.contractName,
        compilerVersion: `v${build_info_json_1.default.solcLongVersion}`,
        constructorArguments: constructorArguments,
    };
    const request = (0, EtherscanVerifyContractRequest_1.toVerifyRequest)(params);
    try {
        const response = await (0, EtherscanService_1.verifyContract)(etherscanApi.endpoints.urls.apiURL, request);
        const statusRequest = (0, EtherscanVerifyContractRequest_1.toCheckStatusRequest)({
            apiKey: etherscanApi.key,
            guid: response.message,
        });
        const status = await (0, EtherscanService_1.getVerificationStatus)(etherscanApi.endpoints.urls.apiURL, statusRequest);
        if (status.isVerificationSuccess()) {
            console.log(`Successfully verified contract ${artifact.contractName} at ${address}.`);
        }
        else {
            recordVerificationError(address, artifact.contractName, status.message, errorReport);
        }
    }
    catch (e) {
        if (e.message.toLowerCase().includes('already verified')) {
            console.log(`Contract at ${address} already verified.`);
        }
        else {
            recordVerificationError(address, artifact.contractName, e.message, errorReport);
        }
    }
}
/**
 * Gets the txhash that created the contract at the given address, by calling the
 * Etherscan API to look for an event that should have been emitted during construction.
 *
 * @param address The address to get the creation txhash for.
 * @param topic The event topic string that should have been logged.
 * @param etherscanApi The Etherscan API config
 * @returns The txhash corresponding to the logged event, or undefined if not found or if
 *   the address is not a contract.
 * @throws {UpgradesError} if the Etherscan API returned with not OK status
 */
async function getContractCreationTxHash(address, topic, etherscanApi) {
    const params = {
        module: 'logs',
        action: 'getLogs',
        fromBlock: '0',
        toBlock: 'latest',
        address: address,
        topic0: '0x' + (0, ethereumjs_util_1.keccak256)(Buffer.from(topic)).toString('hex'),
    };
    const responseBody = await (0, etherscan_api_1.callEtherscanApi)(etherscanApi, params);
    if (responseBody.status === etherscan_api_1.RESPONSE_OK) {
        const result = responseBody.result;
        return result[0].transactionHash; // get the txhash from the first instance of this event
    }
    else if (responseBody.message === 'No records found' || responseBody.message === 'No logs found') {
        (0, debug_1.default)(`no result found for event topic ${topic} at address ${address}`);
        return undefined;
    }
    else {
        throw new upgrades_core_1.UpgradesError(`Failed to get logs for contract at address ${address}.`, () => `Etherscan returned with message: ${responseBody.message}, reason: ${responseBody.result}`);
    }
}
/**
 * Calls the Etherscan API to link a proxy with its implementation ABI.
 *
 * @param etherscanApi The Etherscan API config
 * @param proxyAddress The proxy address
 * @param implAddress The implementation address
 */
async function linkProxyWithImplementationAbi(etherscanApi, proxyAddress, implAddress, errorReport) {
    console.log(`Linking proxy ${proxyAddress} with implementation`);
    const params = {
        module: 'contract',
        action: 'verifyproxycontract',
        address: proxyAddress,
        expectedimplementation: implAddress,
    };
    let responseBody = await (0, etherscan_api_1.callEtherscanApi)(etherscanApi, params);
    if (responseBody.status === etherscan_api_1.RESPONSE_OK) {
        // initial call was OK, but need to send a status request using the returned guid to get the actual verification status
        const guid = responseBody.result;
        responseBody = await checkProxyVerificationStatus(etherscanApi, guid);
        while (responseBody.result === 'Pending in queue') {
            await delay(3000);
            responseBody = await checkProxyVerificationStatus(etherscanApi, guid);
        }
    }
    if (responseBody.status === etherscan_api_1.RESPONSE_OK) {
        console.log('Successfully linked proxy to implementation.');
    }
    else {
        recordError(`Failed to link proxy ${proxyAddress} with its implementation. Reason: ${responseBody.result}`, errorReport);
    }
    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
async function checkProxyVerificationStatus(etherscanApi, guid) {
    const checkProxyVerificationParams = {
        module: 'contract',
        action: 'checkproxyverification',
        apikey: etherscanApi.key,
        guid: guid,
    };
    return await (0, etherscan_api_1.callEtherscanApi)(etherscanApi, checkProxyVerificationParams);
}
/**
 * Gets the constructor args from the given transaction input and creation code.
 *
 * @param txInput The transaction input that was used to deploy the contract.
 * @param creationCode The contract creation code.
 * @returns the encoded constructor args, or undefined if txInput does not start with the creationCode.
 */
function inferConstructorArgs(txInput, creationCode) {
    if (txInput.startsWith(creationCode)) {
        return txInput.substring(creationCode.length);
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=verify-proxy.js.map