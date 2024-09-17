"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDefaults = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
function withDefaults(opts = {}) {
    return {
        constructorArgs: opts.constructorArgs ?? [],
        timeout: opts.timeout ?? 60e3,
        pollingInterval: opts.pollingInterval ?? 5e3,
        useDeployedImplementation: opts.useDeployedImplementation ?? false,
        redeployImplementation: opts.redeployImplementation ?? 'onchange',
        ...(0, upgrades_core_1.withValidationDefaults)(opts),
    };
}
exports.withDefaults = withDefaults;
//# sourceMappingURL=options.js.map