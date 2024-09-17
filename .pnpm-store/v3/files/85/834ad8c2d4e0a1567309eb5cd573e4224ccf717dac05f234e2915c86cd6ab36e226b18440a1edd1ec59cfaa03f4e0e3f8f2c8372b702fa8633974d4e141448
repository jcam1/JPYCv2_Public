"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeployBeacon = void 0;
const utils_1 = require("./utils");
const utils_2 = require("./platform/utils");
function makeDeployBeacon(hre, platformModule) {
    return async function deployBeacon(ImplFactory, opts = {}) {
        (0, utils_2.disablePlatform)(hre, platformModule, opts, deployBeacon.name);
        const { impl } = await (0, utils_1.deployBeaconImpl)(hre, ImplFactory, opts);
        const UpgradeableBeaconFactory = await (0, utils_1.getUpgradeableBeaconFactory)(hre, ImplFactory.signer);
        const beaconDeployment = await (0, utils_1.deploy)(hre, opts, UpgradeableBeaconFactory, impl);
        const beaconContract = UpgradeableBeaconFactory.attach(beaconDeployment.address);
        // @ts-ignore Won't be readonly because beaconContract was created through attach.
        beaconContract.deployTransaction = beaconDeployment.deployTransaction;
        return beaconContract;
    };
}
exports.makeDeployBeacon = makeDeployBeacon;
//# sourceMappingURL=deploy-beacon.js.map