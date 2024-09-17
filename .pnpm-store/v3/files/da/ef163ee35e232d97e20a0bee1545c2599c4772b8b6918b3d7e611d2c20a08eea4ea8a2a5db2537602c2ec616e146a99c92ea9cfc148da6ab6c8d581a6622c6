"use strict";
// itemize returns a markdown-like list of the items
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemize = itemize;
exports.itemizeWith = itemizeWith;
// itemize['a\nb', 'c'] =
// - a
//   b
// - c
const indent_1 = require("./indent");
function itemize(...items) {
    return itemizeWith('-', ...items);
}
function itemizeWith(bullet, ...items) {
    return items.map(item => bullet + (0, indent_1.indent)(item, 2, 1)).join('\n');
}
//# sourceMappingURL=itemize.js.map