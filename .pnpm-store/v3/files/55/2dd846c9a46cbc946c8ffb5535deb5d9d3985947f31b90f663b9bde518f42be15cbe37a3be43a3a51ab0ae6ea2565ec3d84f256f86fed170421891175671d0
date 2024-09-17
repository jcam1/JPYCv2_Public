"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetDefaultApprovalProcess = void 0;
const utils_1 = require("./utils");
function makeGetDefaultApprovalProcess(hre) {
    return async function getDefaultApprovalProcess() {
        const client = (0, utils_1.getPlatformClient)(hre);
        const network = await (0, utils_1.getNetwork)(hre);
        const response = await client.Upgrade.getApprovalProcess(network);
        if (response.network !== network) {
            // This should not happen
            throw new Error(`Returned an approval process for network ${response.network} which does not match current network ${network}`);
        }
        return {
            approvalProcessId: response.approvalProcessId,
            address: response.via,
        };
    };
}
exports.makeGetDefaultApprovalProcess = makeGetDefaultApprovalProcess;
//# sourceMappingURL=get-default-approval-process.js.map