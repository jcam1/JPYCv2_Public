"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stubProvider = stubProvider;
const crypto_1 = __importDefault(require("crypto"));
const defaultClientVersion = 'unknown';
function genChainId() {
    return 100 + crypto_1.default.randomBytes(2).readUInt16BE(0);
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function stubProvider(chainId = genChainId(), clientVersion = defaultClientVersion) {
    const contracts = new Set();
    const pendingTxs = new Set();
    const failedTxs = new Set();
    const blocks = new Map();
    const txBlock = new Map();
    const methodCounters = new Map();
    function mine() {
        const blockHash = '0x' + crypto_1.default.randomBytes(32).toString('hex');
        blocks.set(blockHash, [...pendingTxs]);
        for (const tx of pendingTxs) {
            txBlock.set(tx, blockHash);
        }
        pendingTxs.clear();
    }
    async function deploy(immediate = true) {
        const address = '0x' + crypto_1.default.randomBytes(20).toString('hex');
        const txHash = '0x' + crypto_1.default.randomBytes(32).toString('hex');
        contracts.add(address);
        pendingTxs.add(txHash);
        if (immediate) {
            mine();
        }
        return {
            address,
            txHash,
            layout: {
                storage: [],
                types: {},
            },
        };
    }
    const deployPending = () => deploy(false);
    return {
        mine,
        deploy,
        deployPending,
        get deployCount() {
            return contracts.size;
        },
        isContract(address) {
            return contracts.has(address);
        },
        removeContract(address) {
            return contracts.delete(address);
        },
        addContract(address) {
            return contracts.add(address);
        },
        getMethodCount(method) {
            return methodCounters.get(method) ?? 0;
        },
        failTx(txHash) {
            return failedTxs.add(txHash);
        },
        async send(method, params) {
            methodCounters.set(method, 1 + (methodCounters.get(method) ?? 0));
            if (method === 'eth_chainId') {
                return '0x' + chainId.toString(16);
            }
            else if (method === 'eth_getCode') {
                const param = params?.[0];
                if (typeof param !== 'string') {
                    throw new Error('Param must be string');
                }
                if (contracts.has(param)) {
                    return '0x1234';
                }
                else {
                    return '0x';
                }
            }
            else if (method === 'eth_getTransactionByHash') {
                const param = params?.[0];
                if (typeof param !== 'string') {
                    throw new Error('Param must be string');
                }
                if (txBlock.has(param) || pendingTxs.has(param)) {
                    return {
                        blockHash: txBlock.get(param) || null,
                    };
                }
                else {
                    return null;
                }
            }
            else if (method === 'web3_clientVersion') {
                return clientVersion;
            }
            else if (method === 'eth_getTransactionReceipt') {
                const param = params?.[0];
                if (typeof param !== 'string') {
                    throw new Error('Param must be string');
                }
                if (txBlock.has(param)) {
                    return {
                        transactionHash: param,
                        blockHash: txBlock.get(param),
                        status: failedTxs.has(param) ? '0x0' : '0x1',
                    };
                }
                else {
                    return null;
                }
            }
            else {
                throw new Error(`Method ${method} not stubbed`);
            }
        },
    };
}
//# sourceMappingURL=stub-provider.js.map