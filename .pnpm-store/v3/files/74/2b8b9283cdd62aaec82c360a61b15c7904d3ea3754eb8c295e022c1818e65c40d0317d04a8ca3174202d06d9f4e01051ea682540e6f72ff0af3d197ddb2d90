"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levenshtein = levenshtein;
function levenshtein(a, b, getChangeOp) {
    const matrix = buildMatrix(a, b, getChangeOp);
    return buildOps(matrix, a, b);
}
const CHANGE_COST = 3;
const INSERTION_COST = 2;
const DELETION_COST = 2;
function buildMatrix(a, b, getChangeOp) {
    // matrix[i][j] will contain the last operation that takes a.slice(0, i) to b.slice(0, j)
    // The list of operations can be recovered following the predecessors as in buildOps
    const matrix = new Array(a.length + 1);
    matrix[0] = new Array(b.length + 1);
    matrix[0][0] = { kind: 'nop', totalCost: 0 };
    // Populate first row
    for (let j = 1; j <= b.length; j++) {
        matrix[0][j] = insertion(0, j);
    }
    // Fill in the rest of the matrix
    for (let i = 1; i <= a.length; i++) {
        matrix[i] = new Array(b.length + 1);
        matrix[i][0] = deletion(i, 0);
        for (let j = 1; j <= b.length; j++) {
            matrix[i][j] = minBy([change(i, j), insertion(i, j), deletion(i, j)], e => e.totalCost);
        }
    }
    return matrix;
    // The different kinds of matrix entries are built by these helpers
    function insertion(i, j) {
        const updated = b[j - 1];
        const predecessor = matrix[i][j - 1];
        const predCost = predecessor.totalCost;
        if (j > a.length) {
            return { kind: 'append', totalCost: predCost, predecessor, updated };
        }
        else {
            return { kind: 'insert', totalCost: predCost + INSERTION_COST, predecessor, updated };
        }
    }
    function deletion(i, j) {
        const original = a[i - 1];
        const predecessor = matrix[i - 1][j];
        const predCost = predecessor.totalCost;
        return { kind: 'delete', totalCost: predCost + DELETION_COST, predecessor, original };
    }
    function change(i, j) {
        const original = a[i - 1];
        const updated = b[j - 1];
        const predecessor = matrix[i - 1][j - 1];
        const predCost = predecessor.totalCost;
        const change = getChangeOp(original, updated);
        if (change !== undefined) {
            return { kind: 'change', totalCost: predCost + (change.cost ?? CHANGE_COST), predecessor, change };
        }
        else {
            return { kind: 'nop', totalCost: predCost, predecessor };
        }
    }
}
function minBy(arr, value) {
    let min = arr[0];
    let minValue = value(min);
    for (const item of arr) {
        const itemValue = value(item);
        if (itemValue < minValue) {
            min = item;
            minValue = itemValue;
        }
    }
    return min;
}
function buildOps(matrix, a, b) {
    const ops = [];
    let entry = matrix[a.length][b.length];
    while (entry !== undefined) {
        if (entry.kind === 'change') {
            ops.unshift(entry.change);
        }
        else if (entry.kind !== 'nop') {
            ops.unshift(entry);
        }
        entry = entry.predecessor;
    }
    return ops;
}
//# sourceMappingURL=levenshtein.js.map