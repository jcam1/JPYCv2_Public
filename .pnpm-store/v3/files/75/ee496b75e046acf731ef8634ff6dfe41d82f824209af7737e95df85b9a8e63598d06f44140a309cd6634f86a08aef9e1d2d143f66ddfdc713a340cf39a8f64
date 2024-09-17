"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockExplorerApiKeyClient = void 0;
const platform_1 = require("./platform");
const PATH = '/block-explorer-api-key';
class BlockExplorerApiKeyClient extends platform_1.PlatformApiClient {
    async get(blockExplorerApiKeyId) {
        return this.apiCall(async (api) => {
            return api.get(`${PATH}/${blockExplorerApiKeyId}`);
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
    async update(blockExplorerApiKeyId, payload) {
        return this.apiCall(async (api) => {
            return api.put(`${PATH}/${blockExplorerApiKeyId}`, payload);
        });
    }
    async remove(blockExplorerApiKeyId) {
        return this.apiCall(async (api) => {
            return api.delete(`${PATH}/${blockExplorerApiKeyId}`);
        });
    }
}
exports.BlockExplorerApiKeyClient = BlockExplorerApiKeyClient;
