"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProxyKind = setProxyKind;
exports.processProxyKind = processProxyKind;
exports.detectProxyKind = detectProxyKind;
const validate_1 = require("./validate");
const manifest_1 = require("./manifest");
const eip_1967_type_1 = require("./eip-1967-type");
const usage_error_1 = require("./usage-error");
const _1 = require(".");
async function setProxyKind(provider, proxyAddress, opts) {
    const manifest = await manifest_1.Manifest.forNetwork(provider);
    const manifestDeployment = await manifest.getProxyFromAddress(proxyAddress).catch(e => {
        if (e instanceof manifest_1.DeploymentNotFound) {
            return undefined;
        }
        else {
            throw e;
        }
    });
    if (opts.kind === undefined) {
        opts.kind = manifestDeployment?.kind ?? 'transparent';
    }
    else if (manifestDeployment && opts.kind !== manifestDeployment.kind) {
        throw new Error(`Requested an upgrade of kind ${opts.kind} but proxy is ${manifestDeployment.kind}`);
    }
    return opts.kind;
}
/**
 * Processes opts.kind when deploying the implementation for a UUPS or Transparent proxy.
 *
 * @throws {BeaconProxyUnsupportedError} If this function is called for a Beacon proxy.
 */
async function processProxyKind(provider, proxyAddress, opts, data, version) {
    if (opts.kind === undefined) {
        if (proxyAddress !== undefined && (await (0, eip_1967_type_1.isBeaconProxy)(provider, proxyAddress))) {
            opts.kind = 'beacon';
        }
        else {
            opts.kind = (0, validate_1.inferProxyKind)(data, version);
        }
    }
    if (proxyAddress !== undefined) {
        await setProxyKind(provider, proxyAddress, opts);
    }
    if (opts.kind === 'beacon') {
        throw new usage_error_1.BeaconProxyUnsupportedError();
    }
}
/**
 * Detects the kind of proxy at an address by reading its ERC 1967 storage slots.
 *
 * @deprecated Not reliable since UUPS proxies can have admin storage slot set, which causes
 * this function to treat it as transparent.  Instead, if implementation contract signatures are
 * available, infer the proxy kind using `inferProxyKind` instead.
 *
 * @param provider the Ethereum provider
 * @param proxyAddress the proxy address
 * @returns the proxy kind
 * @throws {UpgradesError} if the contract at address does not look like an ERC 1967 proxy
 */
async function detectProxyKind(provider, proxyAddress) {
    let importKind;
    if (await (0, eip_1967_type_1.isTransparentProxy)(provider, proxyAddress)) {
        importKind = 'transparent';
    }
    else if (await (0, eip_1967_type_1.isTransparentOrUUPSProxy)(provider, proxyAddress)) {
        importKind = 'uups';
    }
    else if (await (0, eip_1967_type_1.isBeaconProxy)(provider, proxyAddress)) {
        importKind = 'beacon';
    }
    else {
        throw new _1.UpgradesError(`Contract at ${proxyAddress} doesn't look like an ERC 1967 proxy`);
    }
    return importKind;
}
//# sourceMappingURL=proxy-kind.js.map