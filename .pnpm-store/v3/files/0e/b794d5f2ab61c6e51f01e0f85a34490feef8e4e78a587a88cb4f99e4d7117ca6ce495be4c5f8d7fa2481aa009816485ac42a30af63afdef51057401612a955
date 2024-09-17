"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidBeacon = void 0;
exports.getImplementationAddressFromBeacon = getImplementationAddressFromBeacon;
exports.getImplementationAddressFromProxy = getImplementationAddressFromProxy;
const _1 = require(".");
const call_optional_signature_1 = require("./call-optional-signature");
const address_1 = require("./utils/address");
class InvalidBeacon extends _1.UpgradesError {
}
exports.InvalidBeacon = InvalidBeacon;
/**
 * Gets the implementation address from the beacon using its implementation() function.
 * @param provider
 * @param beaconAddress
 * @returns The implementation address.
 * @throws {InvalidBeacon} If the implementation() function could not be called or does not return an address.
 */
async function getImplementationAddressFromBeacon(provider, beaconAddress) {
    const impl = await (0, call_optional_signature_1.callOptionalSignature)(provider, beaconAddress, 'implementation()');
    let parsedImplAddress;
    if (impl !== undefined) {
        parsedImplAddress = (0, address_1.parseAddress)(impl);
    }
    if (parsedImplAddress === undefined) {
        throw new InvalidBeacon(`Contract at ${beaconAddress} doesn't look like a beacon`);
    }
    else {
        return parsedImplAddress;
    }
}
/**
 * Gets the implementation address from a UUPS/Transparent/Beacon proxy.
 *
 * @returns a Promise with the implementation address, or undefined if a UUPS/Transparent/Beacon proxy is not located at the address.
 */
async function getImplementationAddressFromProxy(provider, proxyAddress) {
    try {
        return await (0, _1.getImplementationAddress)(provider, proxyAddress);
    }
    catch (e) {
        if (e instanceof _1.EIP1967ImplementationNotFound) {
            try {
                const beaconAddress = await (0, _1.getBeaconAddress)(provider, proxyAddress);
                return await getImplementationAddressFromBeacon(provider, beaconAddress);
            }
            catch (e) {
                if (e instanceof _1.EIP1967BeaconNotFound) {
                    return undefined;
                }
                else {
                    throw e;
                }
            }
        }
        else {
            throw e;
        }
    }
}
//# sourceMappingURL=impl-address.js.map