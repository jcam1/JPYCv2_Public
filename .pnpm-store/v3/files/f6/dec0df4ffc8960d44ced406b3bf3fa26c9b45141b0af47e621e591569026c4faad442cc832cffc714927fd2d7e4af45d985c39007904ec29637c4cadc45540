"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abstractTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const chainConfig_js_1 = require("../../zksync/chainConfig.js");
const getEip712Domain_js_1 = require("../../zksync/utils/getEip712Domain.js");
exports.abstractTestnet = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 11_124,
    name: 'Abstract Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'ETH',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['https://api.testnet.abs.xyz'] },
    },
    blockExplorers: {
        default: {
            name: 'Abstract Block Explorer',
            url: 'https://explorer.testnet.abs.xyz',
        },
    },
    testnet: true,
    custom: {
        getEip712Domain(transaction) {
            const message = (0, getEip712Domain_js_1.transactionToMessage)(transaction);
            return {
                domain: {
                    name: 'Abstract',
                    version: '2',
                    chainId: transaction.chainId,
                },
                types: {
                    Transaction: [
                        { name: 'txType', type: 'uint256' },
                        { name: 'from', type: 'uint256' },
                        { name: 'to', type: 'uint256' },
                        { name: 'gasLimit', type: 'uint256' },
                        { name: 'gasPerPubdataByteLimit', type: 'uint256' },
                        { name: 'maxFeePerGas', type: 'uint256' },
                        { name: 'maxPriorityFeePerGas', type: 'uint256' },
                        { name: 'paymaster', type: 'uint256' },
                        { name: 'nonce', type: 'uint256' },
                        { name: 'value', type: 'uint256' },
                        { name: 'data', type: 'bytes' },
                        { name: 'factoryDeps', type: 'bytes32[]' },
                        { name: 'paymasterInput', type: 'bytes' },
                    ],
                },
                primaryType: 'Transaction',
                message: message,
            };
        },
    },
});
//# sourceMappingURL=abstractTestnet.js.map