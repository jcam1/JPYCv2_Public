"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepEqual = deepEqual;
function deepEqual(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((v, i) => deepEqual(v, b[i]));
    }
    else {
        return a === b;
    }
}
//# sourceMappingURL=deep-array.js.map