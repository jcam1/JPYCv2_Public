"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = void 0;
const debug_1 = __importDefault(require("./debug"));
const utils_1 = require("ethers/lib/utils");
const deploy_1 = require("../platform/deploy");
async function deploy(hre, opts, factory, ...args) {
    if (opts?.usePlatformDeploy) {
        return await (0, deploy_1.platformDeploy)(hre, factory, opts, ...args);
    }
    else {
        return await ethersDeploy(factory, ...args);
    }
}
exports.deploy = deploy;
async function ethersDeploy(factory, ...args) {
    const contractInstance = await factory.deploy(...args);
    const { deployTransaction } = contractInstance;
    const address = (0, utils_1.getContractAddress)({
        from: await factory.signer.getAddress(),
        nonce: deployTransaction.nonce,
    });
    if (address !== contractInstance.address) {
        (0, debug_1.default)(`overriding contract address from ${contractInstance.address} to ${address} for nonce ${deployTransaction.nonce}`);
    }
    const txHash = deployTransaction.hash;
    return { address, txHash, deployTransaction };
}
//# sourceMappingURL=deploy.js.map