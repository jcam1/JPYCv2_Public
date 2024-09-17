"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeValidateImplementation = void 0;
const validate_impl_1 = require("./utils/validate-impl");
const deploy_impl_1 = require("./utils/deploy-impl");
function makeValidateImplementation(hre) {
    return async function validateImplementation(ImplFactory, opts = {}) {
        const deployData = await (0, deploy_impl_1.getDeployData)(hre, ImplFactory, opts);
        await (0, validate_impl_1.validateImpl)(deployData, opts);
    };
}
exports.makeValidateImplementation = makeValidateImplementation;
//# sourceMappingURL=validate-implementation.js.map