"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpgradeableContract = void 0;
const src_decoder_1 = require("./src-decoder");
const validate_1 = require("./validate");
const storage_1 = require("./storage");
/**
 * @deprecated Use `validateUpgradeSafety` instead.
 */
class UpgradeableContract {
    constructor(name, solcInput, solcOutput, opts = {}, solcVersion) {
        this.name = name;
        const decodeSrc = (0, src_decoder_1.solcInputOutputDecoder)(solcInput, solcOutput);
        const validation = (0, validate_1.validate)(solcOutput, decodeSrc, solcVersion, solcInput);
        this.version = (0, validate_1.getContractVersion)(validation, name);
        this.errors = (0, validate_1.getErrors)(validation, this.version, (0, validate_1.withValidationDefaults)(opts));
        this.layout = (0, validate_1.getStorageLayout)(validation, this.version);
    }
    getErrorReport() {
        return new validate_1.UpgradeableContractErrorReport(this.errors);
    }
    getStorageUpgradeReport(newVersion, opts = {}) {
        return (0, storage_1.getStorageUpgradeReport)(this.layout, newVersion.layout, (0, validate_1.withValidationDefaults)(opts));
    }
}
exports.UpgradeableContract = UpgradeableContract;
//# sourceMappingURL=standalone.js.map