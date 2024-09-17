"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageUpgradeErrors = void 0;
exports.assertStorageUpgradeSafe = assertStorageUpgradeSafe;
exports.getStorageUpgradeReport = getStorageUpgradeReport;
exports.getStorageUpgradeErrors = getStorageUpgradeErrors;
__exportStar(require("./compat"), exports);
const error_1 = require("../error");
const layout_1 = require("./layout");
const compare_1 = require("./compare");
const overrides_1 = require("../validate/overrides");
const log_1 = require("../utils/log");
function assertStorageUpgradeSafe(original, updated, opts = false) {
    if (typeof opts === 'boolean') {
        const unsafeAllowCustomTypes = opts;
        opts = (0, overrides_1.withValidationDefaults)({ unsafeAllowCustomTypes });
    }
    const report = getStorageUpgradeReport(original, updated, opts);
    if (!report.pass) {
        throw new StorageUpgradeErrors(report);
    }
}
function getStorageUpgradeReport(original, updated, opts) {
    const originalDetailed = (0, layout_1.getDetailedLayout)(original);
    const updatedDetailed = (0, layout_1.getDetailedLayout)(updated);
    const originalDetailedNamespaces = getDetailedNamespacedLayout(original);
    const updatedDetailedNamespaces = getDetailedNamespacedLayout(updated);
    const comparator = new compare_1.StorageLayoutComparator(opts.unsafeAllowCustomTypes, opts.unsafeAllowRenames);
    const report = comparator.compareLayouts(originalDetailed, updatedDetailed, originalDetailedNamespaces, updatedDetailedNamespaces);
    if (comparator.hasAllowedUncheckedCustomTypes) {
        (0, log_1.logWarning)(`Potentially unsafe deployment`, [
            `You are using \`unsafeAllowCustomTypes\` to force approve structs or enums with missing data.`,
            `Make sure you have manually checked the storage layout for incompatibilities.`,
        ]);
    }
    else if (opts.unsafeAllowCustomTypes) {
        (0, log_1.logNote)(`\`unsafeAllowCustomTypes\` is no longer necessary. Structs are enums are automatically checked.\n`);
    }
    return report;
}
function getDetailedNamespacedLayout(layout) {
    const detailedNamespaces = {};
    if (layout.namespaces !== undefined) {
        for (const [storageLocation, namespacedLayout] of Object.entries(layout.namespaces)) {
            detailedNamespaces[storageLocation] = (0, layout_1.getDetailedLayout)({
                storage: namespacedLayout,
                types: layout.types,
            });
        }
    }
    return detailedNamespaces;
}
class StorageUpgradeErrors extends error_1.UpgradesError {
    constructor(report) {
        super(`New storage layout is incompatible`, () => report.explain());
        this.report = report;
    }
}
exports.StorageUpgradeErrors = StorageUpgradeErrors;
// Kept for backwards compatibility and to avoid rewriting tests
function getStorageUpgradeErrors(original, updated, opts = {}) {
    try {
        assertStorageUpgradeSafe(original, updated, (0, overrides_1.withValidationDefaults)(opts));
    }
    catch (e) {
        if (e instanceof StorageUpgradeErrors) {
            return e.report.ops;
        }
        else {
            throw e;
        }
    }
    return [];
}
//# sourceMappingURL=index.js.map