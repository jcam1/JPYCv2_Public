"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFullSolcOutput = void 0;
function isFullSolcOutput(output) {
    if (output?.contracts == undefined || output?.sources == undefined) {
        return false;
    }
    for (const file of Object.values(output.contracts)) {
        if (file == undefined) {
            return false;
        }
        for (const contract of Object.values(file)) {
            if (contract?.evm?.bytecode == undefined) {
                return false;
            }
        }
    }
    for (const file of Object.values(output.sources)) {
        if (file?.ast == undefined || file?.id == undefined) {
            return false;
        }
    }
    return true;
}
exports.isFullSolcOutput = isFullSolcOutput;
//# sourceMappingURL=is-full-solc-output.js.map