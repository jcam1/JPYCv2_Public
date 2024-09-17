"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProxyToManifest = addProxyToManifest;
const _1 = require(".");
async function addProxyToManifest(kind, address, manifest) {
    await manifest.addProxy({ kind, address });
    if (kind !== 'transparent' && (await manifest.getAdmin())) {
        (0, _1.logWarning)(`A proxy admin was previously deployed on this network`, [
            `This is not natively used with the current kind of proxy ('${kind}').`,
            `Changes to the admin will have no effect on this new proxy.`,
        ]);
    }
}
//# sourceMappingURL=add-proxy-to-manifest.js.map