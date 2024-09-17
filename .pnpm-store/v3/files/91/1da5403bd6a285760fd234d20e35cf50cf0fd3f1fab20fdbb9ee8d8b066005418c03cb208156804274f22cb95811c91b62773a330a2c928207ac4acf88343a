"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentConfigClient = void 0;
const platform_1 = require("./platform");
const PATH = '/deployment-config';
class DeploymentConfigClient extends platform_1.PlatformApiClient {
    async get(deploymentConfigId) {
        return this.apiCall(async (api) => {
            return api.get(`${PATH}/${deploymentConfigId}`);
        });
    }
    async list() {
        return this.apiCall(async (api) => {
            return api.get(`${PATH}`);
        });
    }
    async create(payload) {
        return this.apiCall(async (api) => {
            return api.post(`${PATH}`, payload);
        });
    }
    async update(deploymentConfigId, payload) {
        return this.apiCall(async (api) => {
            return api.put(`${PATH}/${deploymentConfigId}`, payload);
        });
    }
    async remove(deploymentConfigId) {
        return this.apiCall(async (api) => {
            return api.delete(`${PATH}/${deploymentConfigId}`);
        });
    }
}
exports.DeploymentConfigClient = DeploymentConfigClient;
