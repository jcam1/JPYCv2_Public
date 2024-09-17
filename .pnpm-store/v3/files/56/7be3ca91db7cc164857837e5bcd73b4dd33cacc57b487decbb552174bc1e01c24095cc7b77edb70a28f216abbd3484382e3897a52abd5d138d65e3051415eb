"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const hardhat_1 = require("hardhat");
const validate_1 = require("./validate");
const src_decoder_1 = require("./src-decoder");
(0, ava_1.default)('namespace outside contract', async (t) => {
    const contract = 'contracts/test/NamespacedOutsideContract.sol:Example';
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(contract);
    if (buildInfo === undefined) {
        throw new Error(`Build info not found for contract ${contract}`);
    }
    const solcOutput = buildInfo.output;
    const solcInput = buildInfo.input;
    const decodeSrc = (0, src_decoder_1.solcInputOutputDecoder)(solcInput, solcOutput);
    const error = t.throws(() => (0, validate_1.validate)(solcOutput, decodeSrc));
    t.assert(error?.message.includes('contracts/test/NamespacedOutsideContract.sol:7: Namespace struct MainStorage is defined outside of a contract'), error?.message);
});
//# sourceMappingURL=storage-namespaced-outside-contract.test.js.map