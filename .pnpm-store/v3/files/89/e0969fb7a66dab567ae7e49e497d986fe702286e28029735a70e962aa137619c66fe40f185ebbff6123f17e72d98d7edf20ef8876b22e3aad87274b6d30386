"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkNames = void 0;
exports.getNetworkId = getNetworkId;
exports.getChainId = getChainId;
exports.getClientVersion = getClientVersion;
exports.getHardhatMetadata = getHardhatMetadata;
exports.getAnvilMetadata = getAnvilMetadata;
exports.getStorageAt = getStorageAt;
exports.getCode = getCode;
exports.call = call;
exports.hasCode = hasCode;
exports.isEmpty = isEmpty;
exports.getTransactionByHash = getTransactionByHash;
exports.getTransactionReceipt = getTransactionReceipt;
exports.isDevelopmentNetwork = isDevelopmentNetwork;
exports.isReceiptSuccessful = isReceiptSuccessful;
async function getNetworkId(provider) {
    return provider.send('net_version', []);
}
async function getChainId(provider) {
    const id = await provider.send('eth_chainId', []);
    return parseInt(id.replace(/^0x/, ''), 16);
}
async function getClientVersion(provider) {
    return provider.send('web3_clientVersion', []);
}
/**
 * Gets Hardhat metadata when used with Hardhat 2.12.3 or later.
 * The underlying provider will throw an error if this RPC method is not available.
 */
async function getHardhatMetadata(provider) {
    return provider.send('hardhat_metadata', []);
}
/**
 * Anvil could have anvil_metadata, for which hardhat_metadata is an alias.
 */
async function getAnvilMetadata(provider) {
    return provider.send('anvil_metadata', []);
}
async function getStorageAt(provider, address, position, block = 'latest') {
    const storage = await provider.send('eth_getStorageAt', [address, position, block]);
    const padded = storage.replace(/^0x/, '').padStart(64, '0');
    return '0x' + padded;
}
async function getCode(provider, address, block = 'latest') {
    return provider.send('eth_getCode', [address, block]);
}
async function call(provider, address, data, block = 'latest') {
    return provider.send('eth_call', [
        {
            to: address,
            data: data,
        },
        block,
    ]);
}
async function hasCode(provider, address, block) {
    const code = await getCode(provider, address, block);
    return !isEmpty(code);
}
function isEmpty(code) {
    return code.replace(/^0x/, '') === '';
}
async function getTransactionByHash(provider, txHash) {
    return provider.send('eth_getTransactionByHash', [txHash]);
}
async function getTransactionReceipt(provider, txHash) {
    const receipt = await provider.send('eth_getTransactionReceipt', [txHash]);
    if (receipt?.status) {
        receipt.status = receipt.status.match(/^0x0+$/) ? '0x0' : receipt.status.replace(/^0x0+/, '0x');
    }
    return receipt;
}
exports.networkNames = Object.freeze({
    1: 'mainnet',
    2: 'morden',
    3: 'ropsten',
    4: 'rinkeby',
    5: 'goerli',
    10: 'optimism',
    42: 'kovan',
    56: 'bsc',
    97: 'bsc-testnet',
    137: 'polygon',
    420: 'optimism-goerli',
    8453: 'base',
    17000: 'holesky',
    42161: 'arbitrum-one',
    42170: 'arbitrum-nova',
    421613: 'arbitrum-goerli',
    43113: 'avalanche-fuji',
    43114: 'avalanche',
    42220: 'celo',
    44787: 'celo-alfajores',
    80001: 'polygon-mumbai',
    84532: 'base-sepolia',
    11155111: 'sepolia',
    11155420: 'op-sepolia',
});
async function isDevelopmentNetwork(provider) {
    const chainId = await getChainId(provider);
    //  1337 => ganache and geth --dev
    // 31337 => hardhat network
    if (chainId === 1337 || chainId === 31337) {
        return true;
    }
    else {
        const clientVersion = await getClientVersion(provider);
        const [name] = clientVersion.split('/', 1);
        return name === 'HardhatNetwork' || name === 'EthereumJS TestRPC' || name === 'anvil';
    }
}
function isReceiptSuccessful(receipt) {
    return receipt.status === '0x1';
}
//# sourceMappingURL=provider.js.map