"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const hardhat_1 = require("hardhat");
const validate_1 = require("./validate");
const src_decoder_1 = require("./src-decoder");
const test = ava_1.default;
test.before(async (t) => {
    const contract = 'contracts/test/Namespaced.sol:Example';
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(contract);
    if (buildInfo === undefined) {
        throw new Error(`Build info not found for contract ${contract}`);
    }
    const solcOutput = buildInfo.output;
    const solcInput = buildInfo.input;
    const decodeSrc = (0, src_decoder_1.solcInputOutputDecoder)(solcInput, solcOutput);
    t.context.validate = solcVersion => (0, validate_1.validate)(solcOutput, decodeSrc, solcVersion, solcInput);
});
test('namespace with older solc version', async (t) => {
    const { validate } = t.context;
    const error = t.throws(() => validate('0.8.19'));
    t.assert(error?.message.includes(`contracts/test/Namespaced.sol: Namespace annotations require Solidity version >= 0.8.20, but 0.8.19 was used`), error?.message);
});
test('namespace with correct solc version', async (t) => {
    const { validate } = t.context;
    validate('0.8.20');
    t.pass();
});
test('namespace with newer solc version', async (t) => {
    const { validate } = t.context;
    validate('0.8.21');
    t.pass();
});
test('namespace with no solc version', async (t) => {
    const { validate } = t.context;
    const error = t.throws(() => validate(undefined));
    t.assert(error?.message.includes(`contracts/test/Namespaced.sol: Namespace annotations require Solidity version >= 0.8.20, but no solcVersion parameter was provided`), error?.message);
});
//# sourceMappingURL=storage-namespaced-solc-versions.test.js.map