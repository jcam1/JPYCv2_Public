"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentClient = void 0;
const lodash_1 = require("lodash");
const platform_1 = require("./platform");
const PATH = '/deployments';
class DeploymentClient extends platform_1.PlatformApiClient {
    async getApprovalProcess(network) {
        return this.apiCall(async (api) => {
            return api.get(`${PATH}/config/${network}`);
        });
    }
    async deploy(payload) {
        if (lodash_1.isEmpty(payload.artifactUri) && lodash_1.isEmpty(payload.artifactPayload))
            throw new Error(`Missing artifact in deploy request. Either artifactPayload or artifactUri must be included in the request.`);
        return this.apiCall(async (api) => {
            return api.post(`${PATH}`, payload);
        });
    }
    async get(deploymentId) {
        return this.apiCall(async (api) => {
            return api.get(`${PATH}/${deploymentId}`);
        });
    }
    async list() {
        return this.apiCall(async (api) => {
            return api.get(`${PATH}`);
        });
    }
}
exports.DeploymentClient = DeploymentClient;
