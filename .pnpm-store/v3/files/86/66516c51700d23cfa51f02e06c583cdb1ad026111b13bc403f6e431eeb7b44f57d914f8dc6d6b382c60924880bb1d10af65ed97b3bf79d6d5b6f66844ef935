"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBeacon = isBeacon;
const impl_address_1 = require("./impl-address");
/**
 * Checks if the address looks like a beacon.
 *
 * @returns true if the address has an implementation() function that returns an address, false otherwise.
 */
async function isBeacon(provider, beaconAddress) {
    try {
        await (0, impl_address_1.getImplementationAddressFromBeacon)(provider, beaconAddress);
        return true;
    }
    catch (e) {
        if (e instanceof impl_address_1.InvalidBeacon) {
            return false;
        }
        else {
            throw e;
        }
    }
}
//# sourceMappingURL=beacon.js.map