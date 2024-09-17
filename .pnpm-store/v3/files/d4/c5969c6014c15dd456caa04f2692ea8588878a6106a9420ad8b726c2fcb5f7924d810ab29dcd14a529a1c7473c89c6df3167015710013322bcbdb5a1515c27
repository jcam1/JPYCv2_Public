"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpgradeClient = void 0;
const platform_1 = require("./platform");
const PATH = '/upgrades';
class UpgradeClient extends platform_1.PlatformApiClient {
    async getApprovalProcess(network) {
        return this.apiCall(async (api) => {
            return api.get(`${PATH}/config/${network}`);
        });
    }
    async upgrade(payload) {
        return this.apiCall(async (api) => {
            return api.post(`${PATH}`, payload);
        });
    }
}
exports.UpgradeClient = UpgradeClient;
