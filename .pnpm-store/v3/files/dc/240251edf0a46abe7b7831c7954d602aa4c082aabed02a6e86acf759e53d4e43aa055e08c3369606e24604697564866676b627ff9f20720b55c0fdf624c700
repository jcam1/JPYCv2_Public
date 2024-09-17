"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeployImplementation = void 0;
const deploy_impl_1 = require("./utils/deploy-impl");
const utils_1 = require("./platform/utils");
function makeDeployImplementation(hre, platformModule) {
    return async function deployImplementation(ImplFactory, opts = {}) {
        opts = (0, utils_1.enablePlatform)(hre, platformModule, opts);
        const deployedImpl = await (0, deploy_impl_1.deployUpgradeableImpl)(hre, ImplFactory, opts);
        if (opts.getTxResponse && deployedImpl.txResponse !== undefined) {
            return deployedImpl.txResponse;
        }
        else {
            return deployedImpl.impl;
        }
    };
}
exports.makeDeployImplementation = makeDeployImplementation;
//# sourceMappingURL=deploy-implementation.js.map