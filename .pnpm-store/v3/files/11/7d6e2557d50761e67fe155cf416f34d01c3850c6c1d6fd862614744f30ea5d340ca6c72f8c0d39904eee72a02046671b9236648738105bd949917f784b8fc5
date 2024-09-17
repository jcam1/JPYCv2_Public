"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpgradeInterfaceVersion = getUpgradeInterfaceVersion;
const debug_1 = __importDefault(require("./utils/debug"));
const call_optional_signature_1 = require("./call-optional-signature");
async function getUpgradeInterfaceVersion(provider, address, log = debug_1.default) {
    const encodedVersion = await (0, call_optional_signature_1.callOptionalSignature)(provider, address, 'UPGRADE_INTERFACE_VERSION()');
    if (encodedVersion !== undefined) {
        // Encoded string
        const buf = Buffer.from(encodedVersion.replace(/^0x/, ''), 'hex');
        // The first 32 bytes represent the offset, which should be 32 for a string
        const offset = parseInt(buf.slice(0, 32).toString('hex'), 16);
        if (offset !== 32) {
            // Log as debug and return undefined if the interface version is not a string.
            // Do not throw an error because this could be caused by a fallback function.
            log(`Unexpected type for UPGRADE_INTERFACE_VERSION at address ${address}. Expected a string`);
            return undefined;
        }
        // The next 32 bytes represent the length of the string
        const length = parseInt(buf.slice(32, 64).toString('hex'), 16);
        // The rest is the string itself
        return buf.slice(64, 64 + length).toString('utf8');
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=upgrade-interface-version.js.map