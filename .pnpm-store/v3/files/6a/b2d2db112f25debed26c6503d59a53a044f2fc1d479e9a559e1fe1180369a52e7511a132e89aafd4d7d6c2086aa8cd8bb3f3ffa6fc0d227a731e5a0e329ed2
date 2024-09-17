"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpgradeProxy = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("./utils");
const utils_2 = require("./platform/utils");
function makeUpgradeProxy(hre, platformModule) {
    return async function upgradeProxy(proxy, ImplFactory, opts = {}) {
        (0, utils_2.disablePlatform)(hre, platformModule, opts, upgradeProxy.name);
        const proxyAddress = (0, utils_1.getContractAddress)(proxy);
        const { impl: nextImpl } = await (0, utils_1.deployProxyImpl)(hre, ImplFactory, opts, proxyAddress);
        // upgrade kind is inferred above
        const upgradeTo = await getUpgrader(proxyAddress, ImplFactory.signer);
        const call = encodeCall(ImplFactory, opts.call);
        const upgradeTx = await upgradeTo(nextImpl, call);
        const inst = ImplFactory.attach(proxyAddress);
        // @ts-ignore Won't be readonly because inst was created through attach.
        inst.deployTransaction = upgradeTx;
        return inst;
    };
    async function getUpgrader(proxyAddress, signer) {
        const { provider } = hre.network;
        const adminAddress = await (0, upgrades_core_1.getAdminAddress)(provider, proxyAddress);
        const adminBytecode = await (0, upgrades_core_1.getCode)(provider, adminAddress);
        if ((0, upgrades_core_1.isEmptySlot)(adminAddress) || adminBytecode === '0x') {
            // No admin contract: use ITransparentUpgradeableProxyFactory to get proxiable interface
            const ITransparentUpgradeableProxyFactory = await (0, utils_1.getITransparentUpgradeableProxyFactory)(hre, signer);
            const proxy = ITransparentUpgradeableProxyFactory.attach(proxyAddress);
            return (nextImpl, call) => (call ? proxy.upgradeToAndCall(nextImpl, call) : proxy.upgradeTo(nextImpl));
        }
        else {
            // Admin contract: redirect upgrade call through it
            const manifest = await upgrades_core_1.Manifest.forNetwork(provider);
            const AdminFactory = await (0, utils_1.getProxyAdminFactory)(hre, signer);
            const admin = AdminFactory.attach(adminAddress);
            const manifestAdmin = await manifest.getAdmin();
            if (admin.address !== manifestAdmin?.address) {
                throw new Error('Proxy admin is not the one registered in the network manifest');
            }
            return (nextImpl, call) => call ? admin.upgradeAndCall(proxyAddress, nextImpl, call) : admin.upgrade(proxyAddress, nextImpl);
        }
    }
}
exports.makeUpgradeProxy = makeUpgradeProxy;
function encodeCall(factory, call) {
    if (!call) {
        return undefined;
    }
    if (typeof call === 'string') {
        call = { fn: call };
    }
    return factory.interface.encodeFunctionData(call.fn, call.args ?? []);
}
//# sourceMappingURL=upgrade-proxy.js.map