"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpgradeableBeaconFactory = exports.getBeaconProxyFactory = exports.getProxyAdminFactory = exports.getITransparentUpgradeableProxyFactory = exports.getTransparentUpgradeableProxyFactory = exports.getProxyFactory = void 0;
const ERC1967Proxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json"));
const BeaconProxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol/BeaconProxy.json"));
const UpgradeableBeacon_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol/UpgradeableBeacon.json"));
const TransparentUpgradeableProxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol/TransparentUpgradeableProxy.json"));
const ITransparentUpgradeableProxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol/ITransparentUpgradeableProxy.json"));
const ProxyAdmin_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol/ProxyAdmin.json"));
async function getProxyFactory(hre, signer) {
    return hre.ethers.getContractFactory(ERC1967Proxy_json_1.default.abi, ERC1967Proxy_json_1.default.bytecode, signer);
}
exports.getProxyFactory = getProxyFactory;
async function getTransparentUpgradeableProxyFactory(hre, signer) {
    return hre.ethers.getContractFactory(TransparentUpgradeableProxy_json_1.default.abi, TransparentUpgradeableProxy_json_1.default.bytecode, signer);
}
exports.getTransparentUpgradeableProxyFactory = getTransparentUpgradeableProxyFactory;
async function getITransparentUpgradeableProxyFactory(hre, signer) {
    return hre.ethers.getContractFactory(ITransparentUpgradeableProxy_json_1.default.abi, ITransparentUpgradeableProxy_json_1.default.bytecode, signer);
}
exports.getITransparentUpgradeableProxyFactory = getITransparentUpgradeableProxyFactory;
async function getProxyAdminFactory(hre, signer) {
    return hre.ethers.getContractFactory(ProxyAdmin_json_1.default.abi, ProxyAdmin_json_1.default.bytecode, signer);
}
exports.getProxyAdminFactory = getProxyAdminFactory;
async function getBeaconProxyFactory(hre, signer) {
    return hre.ethers.getContractFactory(BeaconProxy_json_1.default.abi, BeaconProxy_json_1.default.bytecode, signer);
}
exports.getBeaconProxyFactory = getBeaconProxyFactory;
async function getUpgradeableBeaconFactory(hre, signer) {
    return hre.ethers.getContractFactory(UpgradeableBeacon_json_1.default.abi, UpgradeableBeacon_json_1.default.bytecode, signer);
}
exports.getUpgradeableBeaconFactory = getUpgradeableBeaconFactory;
//# sourceMappingURL=factories.js.map