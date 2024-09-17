"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTrivia = isTrivia;
const kinds_1 = require("@nomicfoundation/slang/kinds");
const cst_1 = require("@nomicfoundation/slang/cst");
/**
 * Returns true if the node is a trivia terminal (whitespace or comment or NatSpec)
 *
 * CAUTION: This must be imported dynamically.
 * Only import this file if Slang is supported on the current platform, otherwise an error will be thrown on import.
 */
function isTrivia(node) {
    return node instanceof cst_1.TerminalNode && isTriviaKind(node.kind);
}
function isTriviaKind(kind) {
    return (kind === kinds_1.TerminalKind.EndOfLine ||
        kind === kinds_1.TerminalKind.MultiLineComment ||
        kind === kinds_1.TerminalKind.MultiLineNatSpecComment ||
        kind === kinds_1.TerminalKind.SingleLineComment ||
        kind === kinds_1.TerminalKind.SingleLineNatSpecComment ||
        kind === kinds_1.TerminalKind.Whitespace);
}
//# sourceMappingURL=trivia.js.map