"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logNote = logNote;
exports.logWarning = logWarning;
exports.silenceWarnings = silenceWarnings;
const chalk_1 = __importDefault(require("chalk"));
const indent_1 = require("./indent");
let silenced = false;
function log(prefix, title, lines) {
    if (silenced) {
        return;
    }
    const parts = [chalk_1.default.yellow.bold(prefix + ':') + ' ' + title + '\n'];
    if (lines.length > 0) {
        parts.push(lines.map(l => (0, indent_1.indent)(l, 4) + '\n').join(''));
    }
    console.error(parts.join('\n'));
}
function logNote(title, lines = []) {
    log('Note', title, lines);
}
function logWarning(title, lines = []) {
    log('Warning', title, lines);
}
function silenceWarnings() {
    logWarning(`All subsequent Upgrades warnings will be silenced.`, [
        `Make sure you have manually checked all uses of unsafe flags.`,
    ]);
    silenced = true;
}
//# sourceMappingURL=log.js.map