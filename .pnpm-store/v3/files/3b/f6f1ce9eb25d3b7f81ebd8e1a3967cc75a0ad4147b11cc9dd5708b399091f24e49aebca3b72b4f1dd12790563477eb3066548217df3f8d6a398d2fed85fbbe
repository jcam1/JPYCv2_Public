"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const upgrade_interface_version_1 = require("./upgrade-interface-version");
const hash = '0x1234';
function makeProviderReturning(result) {
    return { send: (_method, _params) => Promise.resolve(result) };
}
function makeProviderError(msg) {
    return {
        send: (_method, _params) => {
            throw new Error(msg);
        },
    };
}
(0, ava_1.default)('getUpgradeInterfaceVersion returns version', async (t) => {
    // abi encoding of '5.0.0'
    const provider = makeProviderReturning('0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000005352e302e30000000000000000000000000000000000000000000000000000000');
    t.is(await (0, upgrade_interface_version_1.getUpgradeInterfaceVersion)(provider, hash), '5.0.0');
});
(0, ava_1.default)('getUpgradeInterfaceVersion throws unrelated error', async (t) => {
    const provider = makeProviderError('unrelated error');
    await t.throwsAsync(() => (0, upgrade_interface_version_1.getUpgradeInterfaceVersion)(provider, hash), { message: 'unrelated error' });
});
(0, ava_1.default)('getUpgradeInterfaceVersion returns undefined for invalid selector', async (t) => {
    const provider = makeProviderError(`Transaction reverted: function selector was not recognized and there's no fallback function`);
    t.is(await (0, upgrade_interface_version_1.getUpgradeInterfaceVersion)(provider, hash), undefined);
});
(0, ava_1.default)('getUpgradeInterfaceVersion returns undefined for non-string type', async (t) => {
    // abi encoding of boolean 'true'
    const provider = makeProviderReturning('0x0000000000000000000000000000000000000000000000000000000000000001');
    t.is(await (0, upgrade_interface_version_1.getUpgradeInterfaceVersion)(provider, hash), undefined);
});
//# sourceMappingURL=upgrade-interface-version.test.js.map