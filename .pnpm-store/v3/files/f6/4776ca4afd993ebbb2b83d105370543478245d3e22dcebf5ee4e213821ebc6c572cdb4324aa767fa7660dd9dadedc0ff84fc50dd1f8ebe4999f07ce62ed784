"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAddress = parseAddress;
const ethereumjs_util_1 = require("ethereumjs-util");
/**
 * Parses an address from a hex string which may come from storage or a returned address via eth_call.
 *
 * @param addressString The address hex string.
 * @returns The parsed checksum address, or undefined if the input string is not an address.
 */
function parseAddress(addressString) {
    const buf = Buffer.from(addressString.replace(/^0x/, ''), 'hex');
    if (!buf.slice(0, 12).equals(Buffer.alloc(12, 0))) {
        return undefined;
    }
    const address = '0x' + buf.toString('hex', 12, 32); // grab the last 20 bytes
    return (0, ethereumjs_util_1.toChecksumAddress)(address);
}
//# sourceMappingURL=address.js.map