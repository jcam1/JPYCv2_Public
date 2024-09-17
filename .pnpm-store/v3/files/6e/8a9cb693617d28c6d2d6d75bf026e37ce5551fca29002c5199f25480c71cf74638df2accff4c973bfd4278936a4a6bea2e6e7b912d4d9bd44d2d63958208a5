"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformClient = void 0;
const block_explorer_api_key_1 = require("./block-explorer-api-key");
const deployment_1 = require("./deployment");
const deployment_config_1 = require("./deployment-config");
const upgrade_1 = require("./upgrade");
function PlatformClient(params) {
    return {
        Deployment: new deployment_1.DeploymentClient(params),
        Upgrade: new upgrade_1.UpgradeClient(params),
        DeploymentConfig: new deployment_config_1.DeploymentConfigClient(params),
        BlockExplorerApiKey: new block_explorer_api_key_1.BlockExplorerApiKeyClient(params),
    };
}
exports.PlatformClient = PlatformClient;
