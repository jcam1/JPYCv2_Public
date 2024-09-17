"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_OK = exports.getEtherscanAPIConfig = exports.callEtherscanApi = void 0;
const resolveEtherscanApiKey_1 = require("@nomiclabs/hardhat-etherscan/dist/src/resolveEtherscanApiKey");
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const undici_1 = require("undici");
const debug_1 = __importDefault(require("./debug"));
/**
 * Call the configured Etherscan API with the given parameters.
 *
 * @param etherscanApi The Etherscan API config
 * @param params The API parameters to call with
 * @returns The Etherscan API response
 */
async function callEtherscanApi(etherscanApi, params) {
    const parameters = new URLSearchParams({ ...params, apikey: etherscanApi.key });
    const response = await (0, undici_1.request)(etherscanApi.endpoints.urls.apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: parameters.toString(),
    });
    if (!(response.statusCode >= 200 && response.statusCode <= 299)) {
        const responseBodyText = await response.body.text();
        throw new upgrades_core_1.UpgradesError(`Etherscan API call failed with status ${response.statusCode}, response: ${responseBodyText}`);
    }
    const responseBodyJson = await response.body.json();
    (0, debug_1.default)('Etherscan response', JSON.stringify(responseBodyJson));
    return responseBodyJson;
}
exports.callEtherscanApi = callEtherscanApi;
/**
 * Gets the Etherscan API parameters from Hardhat config.
 * Makes use of Hardhat Etherscan for handling cases when Etherscan API parameters are not present in config.
 */
async function getEtherscanAPIConfig(hre) {
    const endpoints = await hre.run('verify:get-etherscan-endpoint');
    const etherscanConfig = hre.config.etherscan;
    const key = (0, resolveEtherscanApiKey_1.resolveEtherscanApiKey)(etherscanConfig.apiKey, endpoints.network);
    return { key, endpoints };
}
exports.getEtherscanAPIConfig = getEtherscanAPIConfig;
exports.RESPONSE_OK = '1';
//# sourceMappingURL=etherscan-api.js.map