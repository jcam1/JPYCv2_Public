"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManifestAdmin = exports.makeGetInstanceFunction = exports.makeTransferProxyAdminOwnership = exports.makeChangeProxyAdmin = void 0;
const chalk_1 = __importDefault(require("chalk"));
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("./utils");
const utils_2 = require("./platform/utils");
const SUCCESS_CHECK = chalk_1.default.green('✔') + ' ';
const FAILURE_CROSS = chalk_1.default.red('✘') + ' ';
function makeChangeProxyAdmin(hre, platformModule) {
    return async function changeProxyAdmin(proxyAddress, newAdmin, signer) {
        (0, utils_2.disablePlatform)(hre, platformModule, {}, changeProxyAdmin.name);
        const admin = await getManifestAdmin(hre, signer);
        const proxyAdminAddress = await (0, upgrades_core_1.getAdminAddress)(hre.network.provider, proxyAddress);
        if (admin.address !== proxyAdminAddress) {
            throw new Error('Proxy admin is not the one registered in the network manifest');
        }
        else if (admin.address !== newAdmin) {
            await admin.changeProxyAdmin(proxyAddress, newAdmin);
        }
    };
}
exports.makeChangeProxyAdmin = makeChangeProxyAdmin;
function makeTransferProxyAdminOwnership(hre, platformModule) {
    return async function transferProxyAdminOwnership(newOwner, signer) {
        (0, utils_2.disablePlatform)(hre, platformModule, {}, transferProxyAdminOwnership.name);
        const admin = await getManifestAdmin(hre, signer);
        await admin.transferOwnership(newOwner);
        const { provider } = hre.network;
        const manifest = await upgrades_core_1.Manifest.forNetwork(provider);
        const { proxies } = await manifest.read();
        for (const { address, kind } of proxies) {
            if (admin.address == (await (0, upgrades_core_1.getAdminAddress)(provider, address))) {
                console.log(SUCCESS_CHECK + `${address} (${kind}) proxy ownership transfered through admin proxy`);
            }
            else {
                console.log(FAILURE_CROSS + `${address} (${kind}) proxy ownership not affected by admin proxy`);
            }
        }
    };
}
exports.makeTransferProxyAdminOwnership = makeTransferProxyAdminOwnership;
function makeGetInstanceFunction(hre) {
    return async function getInstance(signer) {
        return await getManifestAdmin(hre, signer);
    };
}
exports.makeGetInstanceFunction = makeGetInstanceFunction;
async function getManifestAdmin(hre, signer) {
    const manifest = await upgrades_core_1.Manifest.forNetwork(hre.network.provider);
    const manifestAdmin = await manifest.getAdmin();
    const proxyAdminAddress = manifestAdmin?.address;
    if (proxyAdminAddress === undefined) {
        throw new Error('No ProxyAdmin was found in the network manifest');
    }
    const AdminFactory = await (0, utils_1.getProxyAdminFactory)(hre, signer);
    return AdminFactory.attach(proxyAdminAddress);
}
exports.getManifestAdmin = getManifestAdmin;
//# sourceMappingURL=admin.js.map