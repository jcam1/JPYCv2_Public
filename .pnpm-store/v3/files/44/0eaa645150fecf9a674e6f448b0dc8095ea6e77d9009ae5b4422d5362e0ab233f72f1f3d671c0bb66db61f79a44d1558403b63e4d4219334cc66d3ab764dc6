"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const hardhat_1 = require("hardhat");
const version_1 = require("./version");
const contractBytecode = '01234567890abcdef';
(0, ava_1.default)('same code different formatting produces different metadata', async (t) => {
    async function getBytecodeByContractName(contractName) {
        const buildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/Version.sol:Greeter');
        if (buildInfo === undefined) {
            throw new Error('Build info not found');
        }
        const solcOutput = buildInfo.output;
        return solcOutput.contracts['contracts/test/Version.sol'][contractName].evm.bytecode.object;
    }
    const GreeterBytecode = await getBytecodeByContractName('Greeter');
    const GreeterDifferentFormattingBytecode = await getBytecodeByContractName('GreeterDifferentFormatting');
    t.not((0, version_1.hashBytecode)(GreeterBytecode), (0, version_1.hashBytecode)(GreeterDifferentFormattingBytecode));
    t.is((0, version_1.hashBytecodeWithoutMetadata)(GreeterBytecode), (0, version_1.hashBytecodeWithoutMetadata)(GreeterDifferentFormattingBytecode));
});
(0, ava_1.default)('removes metadata from Solidity 0.4 bytecode', t => {
    const swarmHash = '69b1869ae52f674ffccdd8f6d35de04d578a778e919a1b41b7a2177668e08e1a';
    const swarmHashWrapper = `65627a7a72305820${swarmHash}`;
    const metadata = `a1${swarmHashWrapper}0029`;
    const bytecode = `0x${contractBytecode}${metadata}`;
    t.is((0, version_1.hashBytecodeWithoutMetadata)(bytecode), (0, version_1.hashBytecode)(`0x${contractBytecode}`));
});
(0, ava_1.default)('removes metadata from Solidity ^0.5.9 bytecode', t => {
    // Solidity 0.5.9 includes solc version into the CBOR encoded metadata
    // https://github.com/ethereum/solidity/releases/tag/v0.5.9
    const swarmHash = '69b1869ae52f674ffccdd8f6d35de04d578a778e919a1b41b7a2177668e08e1a';
    const swarmHashWrapper = `65627a7a72305820${swarmHash}`;
    const solcVersionWrapper = '64736f6c6343000509';
    const metadata = `a2${swarmHashWrapper}${solcVersionWrapper}0032`;
    const bytecode = `0x${contractBytecode}${metadata}`;
    t.is((0, version_1.hashBytecodeWithoutMetadata)(bytecode), (0, version_1.hashBytecode)(`0x${contractBytecode}`));
});
(0, ava_1.default)('does not change the bytecode if metadata encoding is invalid', t => {
    const swarmHash = '69b1869ae52f674ffccdd8f6d35de04d578a778e919a1b41b7a2177668e08e1a';
    const invalidSwarmHashWrapper = `a165627a7a72305821${swarmHash}0029`;
    const bytecode = `0x${contractBytecode}${invalidSwarmHashWrapper}`;
    t.is((0, version_1.hashBytecodeWithoutMetadata)(bytecode), (0, version_1.hashBytecode)(bytecode));
});
(0, ava_1.default)('does not change the bytecode if metadata length is not reliable', t => {
    const swarmHash = '69b1869ae52f674ffccdd8f6d35de04d578a778e919a1b41b7a2177668e08e1a';
    const invalidSwarmHashWrapper = `a165627a7a72305821${swarmHash}9929`;
    const bytecode = `0x${contractBytecode}${invalidSwarmHashWrapper}`;
    t.is((0, version_1.hashBytecodeWithoutMetadata)(bytecode), (0, version_1.hashBytecode)(bytecode));
});
//# sourceMappingURL=version.test.js.map