"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformApiClient = void 0;
const defender_base_client_1 = require("@openzeppelin/defender-base-client");
class PlatformApiClient extends defender_base_client_1.BaseApiClient {
    getPoolId() {
        return process.env.PLATFORM_POOL_ID || 'us-west-2_94f3puJWv';
    }
    getPoolClientId() {
        return process.env.PLATFORM_POOL_CLIENT_ID || '40e58hbc7pktmnp9i26hh5nsav';
    }
    getApiUrl() {
        return process.env.PLATFORM_API_URL || 'https://defender-api.openzeppelin.com/deployment/';
    }
}
exports.PlatformApiClient = PlatformApiClient;
