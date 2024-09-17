"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const hardhat_1 = require("hardhat");
const utils_1 = require("solidity-ast/utils");
const function_1 = require("./function");
testContract('ContractFunctionSignatures');
testContract('LibraryFunctionSignatures');
function testContract(contractName) {
    (0, ava_1.default)(contractName, async (t) => {
        const fileName = 'contracts/test/FunctionSignatures.sol';
        const buildInfo = await hardhat_1.artifacts.getBuildInfo(`${fileName}:${contractName}`);
        if (buildInfo === undefined) {
            throw new Error('Build info not found');
        }
        const solcOutput = buildInfo.output;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const signatures = Object.keys(solcOutput.contracts[fileName][contractName].evm.methodIdentifiers);
        const functions = {};
        for (const def of (0, utils_1.findAll)('FunctionDefinition', solcOutput.sources[fileName].ast)) {
            functions[def.name] = def;
        }
        const deref = (0, utils_1.astDereferencer)(solcOutput);
        for (const signature of signatures) {
            const name = signature.replace(/\(.*/, '');
            t.is((0, function_1.getFunctionSignature)(functions[name], deref), signature);
        }
    });
}
//# sourceMappingURL=function.test.js.map