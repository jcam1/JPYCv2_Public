"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTransparentOrUUPSProxy = isTransparentOrUUPSProxy;
exports.isTransparentProxy = isTransparentProxy;
exports.isBeaconProxy = isBeaconProxy;
const eip_1967_1 = require("./eip-1967");
async function isTransparentOrUUPSProxy(provider, address) {
    try {
        await (0, eip_1967_1.getImplementationAddress)(provider, address);
        // if an exception was not encountered above, then this address is a transparent/uups proxy
        return true;
    }
    catch (e) {
        if (e instanceof eip_1967_1.EIP1967ImplementationNotFound) {
            return false;
        }
        else {
            throw e;
        }
    }
}
async function isTransparentProxy(provider, address) {
    const adminAddress = await (0, eip_1967_1.getAdminAddress)(provider, address);
    return !(0, eip_1967_1.isEmptySlot)(adminAddress);
}
async function isBeaconProxy(provider, address) {
    try {
        await (0, eip_1967_1.getBeaconAddress)(provider, address);
        // if an exception was not encountered above, then this address is a beacon proxy
        return true;
    }
    catch (e) {
        if (e instanceof eip_1967_1.EIP1967BeaconNotFound) {
            return false;
        }
        else {
            throw e;
        }
    }
}
//# sourceMappingURL=eip-1967-type.js.map