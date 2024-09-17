"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIP1967BeaconNotFound = exports.EIP1967ImplementationNotFound = void 0;
exports.getAdminAddress = getAdminAddress;
exports.getImplementationAddress = getImplementationAddress;
exports.getBeaconAddress = getBeaconAddress;
exports.toFallbackEip1967Hash = toFallbackEip1967Hash;
exports.toEip1967Hash = toEip1967Hash;
exports.isEmptySlot = isEmptySlot;
const ethereumjs_util_1 = require("ethereumjs-util");
const error_1 = require("./error");
const provider_1 = require("./provider");
const address_1 = require("./utils/address");
class EIP1967ImplementationNotFound extends error_1.UpgradesError {
}
exports.EIP1967ImplementationNotFound = EIP1967ImplementationNotFound;
class EIP1967BeaconNotFound extends error_1.UpgradesError {
}
exports.EIP1967BeaconNotFound = EIP1967BeaconNotFound;
async function getAdminAddress(provider, address) {
    const storage = await getStorageFallback(provider, address, toEip1967Hash('eip1967.proxy.admin'), toFallbackEip1967Hash('org.zeppelinos.proxy.admin'));
    return parseAddressFromStorage(storage);
}
async function getImplementationAddress(provider, address) {
    const storage = await getStorageFallback(provider, address, toEip1967Hash('eip1967.proxy.implementation'), toFallbackEip1967Hash('org.zeppelinos.proxy.implementation'));
    if (isEmptySlot(storage)) {
        throw new EIP1967ImplementationNotFound(`Contract at ${address} doesn't look like an ERC 1967 proxy with a logic contract address`);
    }
    return parseAddressFromStorage(storage);
}
async function getBeaconAddress(provider, address) {
    const storage = await getStorageFallback(provider, address, toEip1967Hash('eip1967.proxy.beacon'));
    if (isEmptySlot(storage)) {
        throw new EIP1967BeaconNotFound(`Contract at ${address} doesn't look like an ERC 1967 beacon proxy`);
    }
    return parseAddressFromStorage(storage);
}
async function getStorageFallback(provider, address, ...slots) {
    let storage = '0x0000000000000000000000000000000000000000000000000000000000000000'; // default: empty slot
    for (const slot of slots) {
        storage = await (0, provider_1.getStorageAt)(provider, address, slot);
        if (!isEmptySlot(storage)) {
            break;
        }
    }
    return storage;
}
function toFallbackEip1967Hash(label) {
    return '0x' + (0, ethereumjs_util_1.keccak256)(Buffer.from(label)).toString('hex');
}
function toEip1967Hash(label) {
    const hash = (0, ethereumjs_util_1.keccak256)(Buffer.from(label));
    const bigNumber = BigInt('0x' + hash.toString('hex')) - 1n;
    return '0x' + bigNumber.toString(16);
}
function isEmptySlot(storage) {
    return BigInt(storage.replace(/^(0x)?/, '0x')) === 0n;
}
function parseAddressFromStorage(storage) {
    const address = (0, address_1.parseAddress)(storage);
    if (address === undefined) {
        throw new Error(`Value in storage is not an address (${storage})`);
    }
    return address;
}
//# sourceMappingURL=eip-1967.js.map