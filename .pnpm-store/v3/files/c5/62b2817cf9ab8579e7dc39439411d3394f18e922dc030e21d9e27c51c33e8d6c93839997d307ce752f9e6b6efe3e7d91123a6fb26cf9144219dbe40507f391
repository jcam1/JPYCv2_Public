"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeployProxyAdmin = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("./utils");
const utils_2 = require("./platform/utils");
function makeDeployProxyAdmin(hre, platformModule) {
    return async function deployProxyAdmin(signer, opts = {}) {
        (0, utils_2.disablePlatform)(hre, platformModule, opts, deployProxyAdmin.name);
        const { provider } = hre.network;
        const AdminFactory = await (0, utils_1.getProxyAdminFactory)(hre, signer);
        return await (0, upgrades_core_1.fetchOrDeployAdmin)(provider, () => (0, utils_1.deploy)(hre, opts, AdminFactory), opts);
    };
}
exports.makeDeployProxyAdmin = makeDeployProxyAdmin;
//# sourceMappingURL=deploy-proxy-admin.js.map