"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = getVersion;
exports.hashBytecode = hashBytecode;
exports.hashBytecodeWithoutMetadata = hashBytecodeWithoutMetadata;
const ethereumjs_util_1 = require("ethereumjs-util");
const cbor_1 = __importDefault(require("cbor"));
function getVersion(bytecode, linkedBytecode, constructorArgs = '') {
    if (bytecode !== '') {
        return {
            withMetadata: hashBytecode(bytecode),
            withoutMetadata: hashBytecodeWithoutMetadata(bytecode),
            linkedWithoutMetadata: hashBytecodeWithoutMetadata(linkedBytecode ?? bytecode, constructorArgs),
        };
    }
    else {
        throw new Error('Abstract contract not allowed here');
    }
}
function hashBytecode(bytecode, constructorArgs = '') {
    bytecode = bytecode
        .replace(/__\$([0-9a-fA-F]{34})\$__/g, (_, placeholder) => `000${placeholder}000`)
        .replace(/__\w{36}__/g, placeholder => (0, ethereumjs_util_1.keccak256)(Buffer.from(placeholder)).toString('hex', 0, 20));
    // Fail if bytecode is still not valid hex after transformations above.
    // Buffer.from silently truncates at the first non-hex character.
    // NOTE: Some bytecode seems to have odd length, so we cannot do ([0-9a-fA-F]{2})*
    if (!/^(0x)?[0-9a-fA-F]*$/.test(bytecode)) {
        throw new Error('Bytecode is not a valid hex string');
    }
    if (!/^(0x)?[0-9a-fA-F]*$/.test(constructorArgs)) {
        throw new Error('Constructor arguments are not a valid hex string');
    }
    const buf = Buffer.concat([
        Buffer.from(bytecode.replace(/^0x/, ''), 'hex'),
        Buffer.from(constructorArgs.replace(/^0x/, ''), 'hex'),
    ]);
    return (0, ethereumjs_util_1.keccak256)(buf).toString('hex');
}
function hashBytecodeWithoutMetadata(bytecode, constructorArgs = '') {
    return hashBytecode(trimBytecodeMetadata(bytecode), constructorArgs);
}
function trimBytecodeMetadata(bytecode) {
    // Bail on empty bytecode
    if (bytecode.length <= 4) {
        return bytecode;
    }
    // Gather length of CBOR metadata from the end of the file
    const rawLength = bytecode.slice(bytecode.length - 4);
    const metadataLength = parseInt(rawLength, 16) * 2;
    // Bail on unreasonable values for length
    if (metadataLength > bytecode.length - 4) {
        return bytecode;
    }
    // Gather what we assume is the CBOR encoded metadata, and try to parse it
    const metadataStart = bytecode.length - metadataLength - 4;
    const metadata = bytecode.slice(metadataStart, bytecode.length - 4);
    // Parse it to see if it is indeed valid metadata
    try {
        cbor_1.default.decode(Buffer.from(metadata, 'hex'));
    }
    catch (err) {
        // to do: log lack metadata to the user
        return bytecode;
    }
    // Return bytecode without it
    return bytecode.slice(0, metadataStart);
}
//# sourceMappingURL=version.js.map