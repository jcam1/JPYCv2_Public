"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callOptionalSignature = callOptionalSignature;
const ethereumjs_util_1 = require("ethereumjs-util");
const provider_1 = require("./provider");
async function callOptionalSignature(provider, address, signature) {
    const data = '0x' + (0, ethereumjs_util_1.keccak256)(Buffer.from(signature)).toString('hex').slice(0, 8);
    try {
        return await (0, provider_1.call)(provider, address, data);
    }
    catch (e) {
        if (e.message.includes('function selector was not recognized') ||
            e.message.includes('invalid opcode') ||
            e.message.includes('revert') ||
            e.message.includes('execution error')) {
            return undefined;
        }
        else {
            throw e;
        }
    }
}
//# sourceMappingURL=call-optional-signature.js.map