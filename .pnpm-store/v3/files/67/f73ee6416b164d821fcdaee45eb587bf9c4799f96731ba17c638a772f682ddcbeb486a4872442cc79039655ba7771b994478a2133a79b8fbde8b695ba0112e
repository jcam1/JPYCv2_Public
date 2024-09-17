"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTypeIdentifier = decodeTypeIdentifier;
exports.normalizeTypeIdentifier = normalizeTypeIdentifier;
exports.stabilizeTypeIdentifier = stabilizeTypeIdentifier;
const assert_1 = __importDefault(require("assert"));
// Type Identifiers in the AST are for some reason encoded so that they don't
// contain parentheses or commas, which have been substituted as follows:
//    (  ->  $_
//    )  ->  _$
//    ,  ->  _$_
// This is particularly hard to decode because it is not a prefix-free code.
// Thus, the following regex has to perform a lookahead to make sure it gets
// the substitution right.
function decodeTypeIdentifier(typeIdentifier) {
    return typeIdentifier.replace(/(\$_|_\$_|_\$)(?=(\$_|_\$_|_\$)*([^_$]|$))/g, m => {
        switch (m) {
            case '$_':
                return '(';
            case '_$':
                return ')';
            case '_$_':
                return ',';
            default:
                throw new Error('Unreachable');
        }
    });
}
// Some Type Identifiers contain a _storage_ptr suffix, but the _ptr part
// appears in some places and not others. We remove it to get consistent type
// ids from the different places in the AST.
function normalizeTypeIdentifier(typeIdentifier) {
    return decodeTypeIdentifier(typeIdentifier).replace(/_storage_ptr\b/g, '_storage');
}
// Type Identifiers contain AST id numbers, which makes them sensitive to
// unrelated changes in the source code. This function stabilizes a type
// identifier by removing all AST ids.
function stabilizeTypeIdentifier(typeIdentifier) {
    let decoded = decodeTypeIdentifier(typeIdentifier);
    const re = /(t_struct|t_enum|t_contract|t_userDefinedValueType)\(/g;
    let match;
    while ((match = re.exec(decoded))) {
        let i;
        let d = 1;
        for (i = match.index + match[0].length; d !== 0; i++) {
            (0, assert_1.default)(i < decoded.length, 'index out of bounds');
            const c = decoded[i];
            if (c === '(') {
                d += 1;
            }
            else if (c === ')') {
                d -= 1;
            }
        }
        const re2 = /\d+_?/y;
        re2.lastIndex = i;
        decoded = decoded.replace(re2, '');
    }
    return decoded;
}
//# sourceMappingURL=type-id.js.map