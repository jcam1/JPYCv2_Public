"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGap = isGap;
exports.endMatchesGap = endMatchesGap;
const compare_1 = require("./compare");
/**
 * Returns true if the field represents a storage gap.
 *
 * @param field the storage field
 * @returns true if field is a gap, otherwise false
 */
function isGap(field) {
    return field.type.head === 't_array' && (field.label === '__gap' || field.label.startsWith('__gap_'));
}
/**
 * Returns true if original storage field is a gap and the updated storage field
 * ends at the exact same position as the gap.
 *
 * @param original the original storage field
 * @param updated the updated storage field
 * @returns true if original is a gap and original and updated end at the same position, otherwise false
 */
function endMatchesGap(original, updated) {
    const originalEnd = (0, compare_1.storageFieldEnd)(original);
    const updatedEnd = (0, compare_1.storageFieldEnd)(updated);
    return isGap(original) && originalEnd !== undefined && updatedEnd !== undefined && originalEnd === updatedEnd;
}
//# sourceMappingURL=gap.js.map